"use client";

import { useState, useCallback } from "react";
import { useToolHistory } from "@/shared/lib";
import { jsonToTypescript, type ConvertOptions } from "../lib/converter";

export function useJsonToTypescript() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [options, setOptions] = useState<ConvertOptions>({
    rootName: "Root",
    useInterface: true,
    optionalProperties: false,
    addExport: true,
  });

  const { history, addToHistory, clearHistory, hasHistory } =
    useToolHistory("json-to-typescript");

  const handleConvert = useCallback(() => {
    if (!input.trim()) {
      setError("Please enter JSON to convert");
      setOutput("");
      return;
    }

    const result = jsonToTypescript(input, options);

    if (result.success) {
      setOutput(result.output);
      setError(null);
      addToHistory(input, result.output);
    } else {
      setError(result.error || "Conversion failed");
      setOutput("");
    }
  }, [input, options, addToHistory]);

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
      setError("Failed to paste from clipboard");
    }
  }, []);

  const loadFromHistory = useCallback(
    (historyInput: string, historyOutput: string) => {
      setInput(historyInput);
      setOutput(historyOutput);
      setError(null);
    },
    [],
  );

  const updateOption = useCallback(
    <K extends keyof ConvertOptions>(key: K, value: ConvertOptions[K]) => {
      setOptions((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  return {
    input,
    output,
    error,
    options,
    setInput,
    updateOption,
    handleConvert,
    handleCopy,
    handleClear,
    handlePaste,
    history,
    hasHistory,
    clearHistory,
    loadFromHistory,
  };
}
