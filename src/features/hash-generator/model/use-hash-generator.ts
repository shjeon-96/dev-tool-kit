"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import CryptoJS from "crypto-js";
import { useToolHistory } from "@/shared/lib";

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

  const {
    history,
    addToHistory,
    clearHistory,
    hasHistory,
  } = useToolHistory("hash-generator");

  // 히스토리 저장 트리거 추적
  const lastSavedInput = useRef<string>("");

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

        // 히스토리에 저장 (중복 방지)
        if (textInput !== lastSavedInput.current && textInput.length > 0) {
          const sha256Hash = CryptoJS.SHA256(textInput).toString();
          const truncatedInput = textInput.length > 50 ? textInput.substring(0, 50) + "..." : textInput;
          addToHistory(truncatedInput, sha256Hash);
          lastSavedInput.current = textInput;
        }
      } else {
        setHashes([]);
      }
    }, 500); // debounce 시간을 500ms로 늘려서 빈번한 저장 방지

    return () => clearTimeout(timer);
  }, [textInput, inputMode, generateHashes, addToHistory]);

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

  const loadFromHistory = useCallback(
    (historyInput: string, historyOutput: string) => {
      setTextInput(historyInput.replace("...", ""));
      // 저장된 SHA-256 해시로 표시 (전체 해시를 다시 생성)
      setHashes([{ algorithm: "sha256", hash: historyOutput }]);
      setError(null);
      setInputMode("text");
    },
    []
  );

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
    // 히스토리 관련
    history,
    hasHistory,
    clearHistory,
    loadFromHistory,
  };
}
