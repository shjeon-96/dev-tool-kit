"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useToolHistory } from "@/shared/lib";
import { convertCase, caseOptions, type CaseType } from "../lib/converter";

export function useTextCaseConverter() {
  const [input, setInput] = useState("");
  const [outputs, setOutputs] = useState<Record<CaseType, string>>(
    {} as Record<CaseType, string>,
  );
  const [selectedCase, setSelectedCase] = useState<CaseType>("camel");
  const [error, setError] = useState<string | null>(null);
  const prevInputRef = useRef(input);

  const { history, addToHistory, clearHistory, hasHistory } = useToolHistory(
    "text-case-converter",
  );

  // Convert on input change
  useEffect(() => {
    if (prevInputRef.current === input) return;
    prevInputRef.current = input;

    // Use queueMicrotask to avoid synchronous setState warning
    queueMicrotask(() => {
      if (!input.trim()) {
        setOutputs({} as Record<CaseType, string>);
        setError(null);
        return;
      }

      const newOutputs: Record<CaseType, string> = {} as Record<
        CaseType,
        string
      >;
      let hasError = false;

      for (const option of caseOptions) {
        const result = convertCase(input, option.type);
        if (result.success) {
          newOutputs[option.type] = result.output;
        } else {
          hasError = true;
          setError(result.error || "Conversion failed");
          break;
        }
      }

      if (!hasError) {
        setOutputs(newOutputs);
        setError(null);
      }
    });
  }, [input]);

  const handleCopy = useCallback(
    async (caseType?: CaseType) => {
      const textToCopy = caseType ? outputs[caseType] : outputs[selectedCase];
      if (!textToCopy) return false;
      try {
        await navigator.clipboard.writeText(textToCopy);
        if (input && textToCopy) {
          addToHistory(input, textToCopy);
        }
        return true;
      } catch {
        return false;
      }
    },
    [outputs, selectedCase, input, addToHistory],
  );

  const handleClear = useCallback(() => {
    setInput("");
    setOutputs({} as Record<CaseType, string>);
    setError(null);
  }, []);

  const handlePaste = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInput(text);
      setError(null);
    } catch {
      setError("Failed to paste from clipboard");
    }
  }, []);

  const loadFromHistory = useCallback((historyInput: string) => {
    setInput(historyInput);
    setError(null);
  }, []);

  return {
    input,
    outputs,
    selectedCase,
    error,
    setInput,
    setSelectedCase,
    handleCopy,
    handleClear,
    handlePaste,
    history,
    hasHistory,
    clearHistory,
    loadFromHistory,
  };
}
