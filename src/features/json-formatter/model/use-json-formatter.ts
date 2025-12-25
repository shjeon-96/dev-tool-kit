"use client";

import { useState, useCallback, useEffect } from "react";
import { useToolHistory, useUrlState } from "@/shared/lib";
import { useQuota } from "@/shared/lib/quota";
import {
  formatJson,
  minifyJson,
  validateJson,
  type FormatResult,
} from "../lib/formatter";

export type FormatMode = "beautify" | "minify" | "validate";

interface JsonFormatterState {
  input: string;
  indent: number;
}

export function useJsonFormatter() {
  const { trackUsage } = useQuota("json-formatter");

  // URL State for sharing
  const {
    state: urlState,
    setState: setUrlState,
    getShareUrl,
    hasUrlState,
    clearUrl,
  } = useUrlState<JsonFormatterState>({
    key: "json",
    defaultValue: { input: "", indent: 2 },
  });

  const [input, setInputInternal] = useState(urlState.input);
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [indent, setIndentInternal] = useState(urlState.indent);

  // Sync input with URL state changes (e.g., browser back/forward)
  // Only update if values actually differ to prevent infinite loops
  useEffect(() => {
    // Compare values before setting to avoid unnecessary updates
    // This prevents potential infinite loops when URL state changes
    const inputChanged = urlState.input !== input;
    const indentChanged = urlState.indent !== indent;

    if (inputChanged || indentChanged) {
      // Use queueMicrotask to avoid synchronous setState warning
      queueMicrotask(() => {
        if (inputChanged) {
          setInputInternal(urlState.input);
        }
        if (indentChanged) {
          setIndentInternal(urlState.indent);
        }
      });
    }
  }, [urlState.input, urlState.indent, input, indent]);

  // Update URL state when input changes (debounced)
  const setInput = useCallback(
    (value: string) => {
      setInputInternal(value);
      setUrlState({ input: value, indent });
    },
    [indent, setUrlState],
  );

  const setIndent = useCallback(
    (value: number) => {
      setIndentInternal(value);
      setUrlState({ input, indent: value });
    },
    [input, setUrlState],
  );

  const { history, addToHistory, clearHistory, hasHistory } =
    useToolHistory("json-formatter");

  const handleFormat = useCallback(
    (mode: FormatMode) => {
      if (!input.trim()) {
        setError("JSON을 입력해주세요");
        setOutput("");
        return;
      }

      let result: FormatResult;

      switch (mode) {
        case "beautify":
          result = formatJson(input, indent);
          break;
        case "minify":
          result = minifyJson(input);
          break;
        case "validate":
          result = validateJson(input);
          break;
        default:
          result = formatJson(input, indent);
      }

      if (result.success) {
        setOutput(result.output);
        setError(null);
        // 히스토리에 저장
        addToHistory(input, result.output);
        // 사용량 추적
        trackUsage();
      } else {
        setError(result.error || "오류가 발생했습니다");
        setOutput("");
      }
    },
    [input, indent, addToHistory, trackUsage],
  );

  const handleClear = useCallback(() => {
    setInputInternal("");
    setOutput("");
    setError(null);
    clearUrl();
  }, [clearUrl]);

  const handlePaste = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInput(text);
      setError(null);
    } catch {
      setError("클립보드에서 붙여넣기 실패");
    }
  }, [setInput]);

  const loadFromHistory = useCallback(
    (historyInput: string, historyOutput: string) => {
      setInput(historyInput);
      setOutput(historyOutput);
      setError(null);
    },
    [setInput],
  );

  return {
    input,
    output,
    error,
    indent,
    setInput,
    setIndent,
    handleFormat,
    handleClear,
    handlePaste,
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
