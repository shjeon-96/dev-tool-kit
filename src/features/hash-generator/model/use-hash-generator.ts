"use client";

import { useState, useCallback, useEffect } from "react";
import CryptoJS from "crypto-js";

export type HashAlgorithm = "md5" | "sha1" | "sha256" | "sha512";

export interface HashResult {
  algorithm: HashAlgorithm;
  hash: string;
}

export type InputMode = "text" | "file";

export function useHashGenerator() {
  const [inputMode, setInputMode] = useState<InputMode>("text");
  const [textInput, setTextInput] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [hashes, setHashes] = useState<HashResult[]>([]);
  const [compareHash, setCompareHash] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const algorithms: HashAlgorithm[] = ["md5", "sha1", "sha256", "sha512"];

  const computeHash = useCallback((input: string, algorithm: HashAlgorithm): string => {
    switch (algorithm) {
      case "md5":
        return CryptoJS.MD5(input).toString();
      case "sha1":
        return CryptoJS.SHA1(input).toString();
      case "sha256":
        return CryptoJS.SHA256(input).toString();
      case "sha512":
        return CryptoJS.SHA512(input).toString();
      default:
        return "";
    }
  }, []);

  const generateHashes = useCallback(
    (input: string) => {
      const results: HashResult[] = algorithms.map((algorithm) => ({
        algorithm,
        hash: computeHash(input, algorithm),
      }));
      setHashes(results);
    },
    [computeHash]
  );

  // Generate hashes for text input (with debounce)
  useEffect(() => {
    if (inputMode !== "text") return;

    const timer = setTimeout(() => {
      if (textInput.trim()) {
        generateHashes(textInput);
        setError(null);
      } else {
        setHashes([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [textInput, inputMode, generateHashes]);

  // Process file when selected
  useEffect(() => {
    if (inputMode !== "file" || !file) return;

    setIsProcessing(true);
    setError(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      // For binary files, use base64 encoding
      const wordArray = CryptoJS.enc.Latin1.parse(content);
      const base64 = CryptoJS.enc.Base64.stringify(wordArray);
      setFileContent(base64);

      // Generate hashes from the raw content
      const results: HashResult[] = algorithms.map((algorithm) => ({
        algorithm,
        hash: computeHash(content, algorithm),
      }));
      setHashes(results);
      setIsProcessing(false);
    };
    reader.onerror = () => {
      setError("파일을 읽는데 실패했습니다");
      setIsProcessing(false);
    };
    reader.readAsBinaryString(file);
  }, [file, inputMode, computeHash]);

  const handleFileSelect = useCallback((selectedFile: File) => {
    setFile(selectedFile);
    setFileContent(null);
    setHashes([]);
  }, []);

  const handleModeChange = useCallback((mode: InputMode) => {
    setInputMode(mode);
    setHashes([]);
    setError(null);
    if (mode === "text") {
      setFile(null);
      setFileContent(null);
    } else {
      setTextInput("");
    }
  }, []);

  const compareWithHash = useCallback((): boolean | null => {
    if (!compareHash.trim() || hashes.length === 0) return null;

    const normalizedCompare = compareHash.toLowerCase().trim();
    return hashes.some((h) => h.hash.toLowerCase() === normalizedCompare);
  }, [compareHash, hashes]);

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  }, []);

  const handleClear = useCallback(() => {
    setTextInput("");
    setFile(null);
    setFileContent(null);
    setHashes([]);
    setCompareHash("");
    setError(null);
  }, []);

  return {
    inputMode,
    textInput,
    file,
    hashes,
    compareHash,
    isProcessing,
    error,
    setTextInput,
    setCompareHash,
    handleFileSelect,
    handleModeChange,
    compareWithHash,
    copyToClipboard,
    handleClear,
  };
}
