"use client";

import { useState, useCallback } from "react";
import imageCompression from "browser-image-compression";

export type OutputFormat = "image/png" | "image/jpeg" | "image/webp";
export type ResizeMode = "pixel" | "percent";

export interface ImageInfo {
  file: File;
  width: number;
  height: number;
  preview: string;
}

export interface ResizeOptions {
  width: number;
  height: number;
  mode: ResizeMode;
  format: OutputFormat;
  quality: number;
  maintainAspectRatio: boolean;
}

export function useImageResizer() {
  const [originalImage, setOriginalImage] = useState<ImageInfo | null>(null);
  const [resizedImage, setResizedImage] = useState<string | null>(null);
  const [resizedFile, setResizedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [options, setOptions] = useState<ResizeOptions>({
    width: 800,
    height: 600,
    mode: "pixel",
    format: "image/png",
    quality: 0.9,
    maintainAspectRatio: true,
  });

  const loadImage = useCallback((file: File): Promise<ImageInfo> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          resolve({
            file,
            width: img.width,
            height: img.height,
            preview: e.target?.result as string,
          });
        };
        img.onerror = () => reject(new Error("Failed to load image"));
        img.src = e.target?.result as string;
      };
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });
  }, []);

  const handleFileSelect = useCallback(
    async (file: File) => {
      try {
        setError(null);
        setResizedImage(null);
        setResizedFile(null);

        const imageInfo = await loadImage(file);
        setOriginalImage(imageInfo);

        // Set initial dimensions
        setOptions((prev) => ({
          ...prev,
          width: imageInfo.width,
          height: imageInfo.height,
        }));
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load image");
      }
    },
    [loadImage]
  );

  const calculateDimensions = useCallback(
    (
      originalWidth: number,
      originalHeight: number,
      targetWidth: number,
      targetHeight: number,
      mode: ResizeMode,
      maintainAspectRatio: boolean
    ) => {
      let newWidth = targetWidth;
      let newHeight = targetHeight;

      if (mode === "percent") {
        newWidth = Math.round((originalWidth * targetWidth) / 100);
        newHeight = Math.round((originalHeight * targetHeight) / 100);
      }

      if (maintainAspectRatio && mode === "pixel") {
        const aspectRatio = originalWidth / originalHeight;
        if (newWidth / newHeight > aspectRatio) {
          newWidth = Math.round(newHeight * aspectRatio);
        } else {
          newHeight = Math.round(newWidth / aspectRatio);
        }
      }

      return { width: newWidth, height: newHeight };
    },
    []
  );

  const resizeImage = useCallback(async () => {
    if (!originalImage) return;

    setIsProcessing(true);
    setError(null);

    try {
      const { width, height } = calculateDimensions(
        originalImage.width,
        originalImage.height,
        options.width,
        options.height,
        options.mode,
        options.maintainAspectRatio
      );

      // Create canvas for resizing
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Failed to get canvas context");

      const img = new Image();
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = originalImage.preview;
      });

      ctx.drawImage(img, 0, 0, width, height);

      // Convert to blob
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (blob) => {
            if (blob) resolve(blob);
            else reject(new Error("Failed to create blob"));
          },
          options.format,
          options.quality
        );
      });

      // Compress if needed (for JPEG/WebP)
      let finalBlob = blob;
      if (options.format !== "image/png" && blob.size > 1024 * 1024) {
        const compressed = await imageCompression(
          new File([blob], "image", { type: options.format }),
          {
            maxSizeMB: 1,
            useWebWorker: true,
          }
        );
        finalBlob = compressed;
      }

      const extension = options.format.split("/")[1];
      const newFile = new File(
        [finalBlob],
        `resized.${extension}`,
        { type: options.format }
      );

      const previewUrl = URL.createObjectURL(finalBlob);
      setResizedImage(previewUrl);
      setResizedFile(newFile);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to resize image");
    } finally {
      setIsProcessing(false);
    }
  }, [originalImage, options, calculateDimensions]);

  const downloadImage = useCallback(() => {
    if (!resizedFile || !resizedImage) return;

    const link = document.createElement("a");
    link.href = resizedImage;
    link.download = resizedFile.name;
    link.click();
  }, [resizedFile, resizedImage]);

  const handleClear = useCallback(() => {
    if (originalImage?.preview) {
      URL.revokeObjectURL(originalImage.preview);
    }
    if (resizedImage) {
      URL.revokeObjectURL(resizedImage);
    }
    setOriginalImage(null);
    setResizedImage(null);
    setResizedFile(null);
    setError(null);
  }, [originalImage?.preview, resizedImage]);

  const updateOptions = useCallback((updates: Partial<ResizeOptions>) => {
    setOptions((prev) => ({ ...prev, ...updates }));
  }, []);

  return {
    originalImage,
    resizedImage,
    resizedFile,
    isProcessing,
    error,
    options,
    handleFileSelect,
    resizeImage,
    downloadImage,
    handleClear,
    updateOptions,
  };
}
