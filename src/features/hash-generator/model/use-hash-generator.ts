"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useToolHistory, useUrlState } from "@/shared/lib";
import { useQuota } from "@/shared/lib/quota";
import {
  computeHashWasm,
  computeAllHashesWasm,
  computeAllFileHashesWasm,
  compareHashes,
  type HashAlgorithm,
  type HashResult,
} from "../lib/hash-wasm";

// Re-export types for external use
export type { HashAlgorithm, HashResult };

export type InputMode = "text" | "file";

interface HashGeneratorState {
  input: string;
  mode: InputMode;
}

export function useHashGenerator() {
  const { trackUsage } = useQuota("hash-generator");

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
  const [progress, setProgress] = useState(0);
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

  const generateHashes = useCallback(
    async (input: string) => {
      try {
        const results = await computeAllHashesWasm(input);
        setHashes(results);
        trackUsage();
      } catch (err) {
        setError("해시 생성 중 오류가 발생했습니다");
        console.error("Hash generation error:", err);
      }
    },
    [trackUsage],
  );

  // Generate hashes for text input (with debounce)
  useEffect(() => {
    if (inputMode !== "text") return;

    const timer = setTimeout(() => {
      if (textInput.trim()) {
        setError(null);
        void (async () => {
          await generateHashes(textInput);

          // 히스토리에 저장 (중복 방지)
          if (textInput !== lastSavedInput.current && textInput.length > 0) {
            try {
              const sha256Hash = await computeHashWasm(textInput, "sha256");
              const truncatedInput =
                textInput.length > 50
                  ? textInput.substring(0, 50) + "..."
                  : textInput;
              addToHistory(truncatedInput, sha256Hash);
              lastSavedInput.current = textInput;
            } catch {
              // History save error - silent fail
            }
          }
        })();
      } else {
        setHashes([]);
      }
    }, 500); // debounce 시간을 500ms로 늘려서 빈번한 저장 방지

    return () => clearTimeout(timer);
  }, [textInput, inputMode, generateHashes, addToHistory]);

  // Process file when selected (chunked streaming for large files)
  const processFile = useCallback(
    async (selectedFile: File) => {
      setIsProcessing(true);
      setProgress(0);
      setError(null);

      try {
        // Use Wasm-based chunked streaming for efficient large file processing
        const results = await computeAllFileHashesWasm(selectedFile, (prog) => {
          setProgress(prog);
        });
        setHashes(results);
        trackUsage();
      } catch (err) {
        setError("파일 해시 생성 중 오류가 발생했습니다");
        console.error("File hash error:", err);
      } finally {
        setIsProcessing(false);
        setProgress(0);
      }
    },
    [trackUsage],
  );

  // Trigger file processing when file changes
  useEffect(() => {
    if (inputMode !== "file" || !file) return;
    // Use void to handle the async function
    void processFile(file);
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
    progress,
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
