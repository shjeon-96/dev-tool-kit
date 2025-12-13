"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useToolHistory, useUrlState } from "@/shared/lib";
import {
  computeHash,
  computeAllHashes,
  compareHashes,
  type HashAlgorithm,
  type HashResult,
} from "../lib/hash";

// Re-export types for external use
export type { HashAlgorithm, HashResult };

export type InputMode = "text" | "file";

interface HashGeneratorState {
  input: string;
  mode: InputMode;
}

export function useHashGenerator() {
  // URL State for sharing
  const {
    state: urlState,
    setState: setUrlState,
    getShareUrl,
    hasUrlState,
    clearUrl,
  } = useUrlState<HashGeneratorState>({
    key: "hash",
    defaultValue: { input: "", mode: "text" },
  });

  const [inputMode, setInputMode] = useState<InputMode>(urlState.mode);
  const [textInput, setTextInputInternal] = useState(urlState.input);
  const [file, setFile] = useState<File | null>(null);
  const [hashes, setHashes] = useState<HashResult[]>([]);
  const [compareHashInput, setCompareHashInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { history, addToHistory, clearHistory, hasHistory } =
    useToolHistory("hash-generator");

  // 히스토리 저장 트리거 추적
  const lastSavedInput = useRef<string>("");

  // Sync input with URL state changes (e.g., browser back/forward)
  // This is a valid pattern for external state synchronization
  const prevUrlStateRef = useRef({
    input: urlState.input,
    mode: urlState.mode,
  });
  useEffect(() => {
    if (
      prevUrlStateRef.current.input !== urlState.input ||
      prevUrlStateRef.current.mode !== urlState.mode
    ) {
      prevUrlStateRef.current = { input: urlState.input, mode: urlState.mode };
      // Use queueMicrotask to avoid synchronous setState warning
      queueMicrotask(() => {
        setTextInputInternal(urlState.input);
        setInputMode(urlState.mode);
      });
    }
  }, [urlState.input, urlState.mode]);

  // Update URL state when text input changes
  const setTextInput = useCallback(
    (value: string) => {
      setTextInputInternal(value);
      setUrlState({ input: value, mode: inputMode });
    },
    [inputMode, setUrlState],
  );

  const generateHashes = useCallback((input: string) => {
    const results = computeAllHashes(input);
    setHashes(results);
  }, []);

  // Generate hashes for text input (with debounce)
  useEffect(() => {
    if (inputMode !== "text") return;

    const timer = setTimeout(() => {
      if (textInput.trim()) {
        generateHashes(textInput);
        setError(null);

        // 히스토리에 저장 (중복 방지)
        if (textInput !== lastSavedInput.current && textInput.length > 0) {
          const sha256Hash = computeHash(textInput, "sha256");
          const truncatedInput =
            textInput.length > 50
              ? textInput.substring(0, 50) + "..."
              : textInput;
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
  const processFile = useCallback((selectedFile: File) => {
    setIsProcessing(true);
    setError(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;

      // Generate hashes from the raw content using pure function
      const results = computeAllHashes(content);
      setHashes(results);
      setIsProcessing(false);
    };
    reader.onerror = () => {
      setError("파일을 읽는데 실패했습니다");
      setIsProcessing(false);
    };
    reader.readAsBinaryString(selectedFile);
  }, []);

  // Trigger file processing when file changes
  useEffect(() => {
    if (inputMode !== "file" || !file) return;
    // Use requestAnimationFrame to avoid synchronous setState in effect
    requestAnimationFrame(() => {
      processFile(file);
    });
  }, [file, inputMode, processFile]);

  const handleFileSelect = useCallback((selectedFile: File) => {
    setFile(selectedFile);
    setHashes([]);
  }, []);

  const handleModeChange = useCallback(
    (mode: InputMode) => {
      setInputMode(mode);
      setHashes([]);
      setError(null);
      if (mode === "text") {
        setFile(null);
      } else {
        setTextInputInternal("");
      }
      setUrlState({ input: "", mode });
    },
    [setUrlState],
  );

  const compareWithHash = useCallback((): boolean | null => {
    return compareHashes(hashes, compareHashInput);
  }, [compareHashInput, hashes]);

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  }, []);

  const handleClear = useCallback(() => {
    setTextInputInternal("");
    setFile(null);
    setHashes([]);
    setCompareHashInput("");
    setError(null);
    clearUrl();
  }, [clearUrl]);

  const loadFromHistory = useCallback(
    (historyInput: string, historyOutput: string) => {
      const cleanInput = historyInput.replace("...", "");
      setTextInputInternal(cleanInput);
      setUrlState({ input: cleanInput, mode: "text" });
      // 저장된 SHA-256 해시로 표시 (전체 해시를 다시 생성)
      setHashes([{ algorithm: "sha256", hash: historyOutput }]);
      setError(null);
      setInputMode("text");
    },
    [setUrlState],
  );

  return {
    inputMode,
    textInput,
    file,
    hashes,
    compareHash: compareHashInput,
    isProcessing,
    error,
    setTextInput,
    setCompareHash: setCompareHashInput,
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
    // URL 공유 관련
    getShareUrl,
    hasUrlState,
  };
}
