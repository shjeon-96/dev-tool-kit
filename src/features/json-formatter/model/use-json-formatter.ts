"use client";

import { useState, useCallback } from "react";
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
      } else {
        setError(result.error || "오류가 발생했습니다");
        setOutput("");
      }
    },
    [input, indent]
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
  };
}
