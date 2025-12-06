"use client";

import { useState, useCallback } from "react";
import { useToolHistory } from "@/shared/lib";
import {
  formatJson,
  minifyJson,
  validateJson,
  type FormatResult,
} from "../lib/formatter";

export type FormatMode = "beautify" | "minify" | "validate";

export function useJsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [indent, setIndent] = useState(2);

  const {
    history,
    addToHistory,
    clearHistory,
    hasHistory,
  } = useToolHistory("json-formatter");

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
      } else {
        setError(result.error || "오류가 발생했습니다");
        setOutput("");
      }
    },
    [input, indent, addToHistory]
  );

  const handleCopy = useCallback(async () => {
    if (!output) return false;
    try {
      await navigator.clipboard.writeText(output);
      return true;
    } catch {
      return false;
    }
  }, [output]);

  const handleClear = useCallback(() => {
    setInput("");
    setOutput("");
    setError(null);
  }, []);

  const handlePaste = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInput(text);
      setError(null);
    } catch {
      setError("클립보드에서 붙여넣기 실패");
    }
  }, []);

  const loadFromHistory = useCallback(
    (historyInput: string, historyOutput: string) => {
      setInput(historyInput);
      setOutput(historyOutput);
      setError(null);
    },
    []
  );

  return {
    input,
    output,
    error,
    indent,
    setInput,
    setIndent,
    handleFormat,
    handleCopy,
    handleClear,
    handlePaste,
    // 히스토리 관련
    history,
    hasHistory,
    clearHistory,
    loadFromHistory,
  };
}
