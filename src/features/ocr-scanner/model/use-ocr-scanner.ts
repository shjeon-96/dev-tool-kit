"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import type { OCRLanguage, OCRProgress, OCRResult } from "../lib/types";
import {
  extractText,
  isSupportedImageType,
  createImagePreview,
  revokeImagePreview,
} from "../lib/ocr";

export function useOcrScanner() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [language, setLanguage] = useState<OCRLanguage>("eng");
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState<OCRProgress | null>(null);
  const [result, setResult] = useState<OCRResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const previewUrlRef = useRef<string | null>(null);

  // Cleanup preview URL on unmount
  useEffect(() => {
    return () => {
      if (previewUrlRef.current) {
        revokeImagePreview(previewUrlRef.current);
      }
    };
  }, []);

  const setImage = useCallback((file: File | null) => {
    // Cleanup previous preview
    if (previewUrlRef.current) {
      revokeImagePreview(previewUrlRef.current);
      previewUrlRef.current = null;
    }

    if (file) {
      if (!isSupportedImageType(file)) {
        setError(
          "Unsupported image format. Please use PNG, JPEG, WebP, BMP, or GIF.",
        );
        return;
      }

      const previewUrl = createImagePreview(file);
      previewUrlRef.current = previewUrl;
      setImagePreview(previewUrl);
      setImageFile(file);
      setError(null);
      setResult(null);
    } else {
      setImageFile(null);
      setImagePreview(null);
      setError(null);
      setResult(null);
    }
  }, []);

  const clearImage = useCallback(() => {
    setImage(null);
    setProgress(null);
  }, [setImage]);

  const handleExtract = useCallback(async () => {
    if (!imageFile) {
      setError("Please select an image first");
      return;
    }

    setIsProcessing(true);
    setProgress({ status: "Starting...", progress: 0 });
    setError(null);
    setResult(null);

    try {
      const processResult = await extractText(imageFile, language, setProgress);

      if (processResult.success && processResult.data) {
        setResult(processResult.data);
      } else {
        setError(processResult.error || "Failed to extract text");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred",
      );
    } finally {
      setIsProcessing(false);
      setProgress(null);
    }
  }, [imageFile, language]);

  const copyToClipboard = useCallback(async () => {
    if (!result?.text) return false;

    try {
      await navigator.clipboard.writeText(result.text);
      return true;
    } catch {
      return false;
    }
  }, [result]);

  const downloadAsText = useCallback(() => {
    if (!result?.text) return;

    const blob = new Blob([result.text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = imageFile
      ? `${imageFile.name.replace(/\.[^/.]+$/, "")}_ocr.txt`
      : "ocr_result.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [result, imageFile]);

  return {
    // State
    imageFile,
    imagePreview,
    language,
    isProcessing,
    progress,
    result,
    error,

    // Actions
    setImage,
    setLanguage,
    clearImage,
    handleExtract,
    copyToClipboard,
    downloadAsText,
  };
}
