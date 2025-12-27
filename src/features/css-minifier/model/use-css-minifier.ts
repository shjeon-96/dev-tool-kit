"use client";

import { useState, useCallback } from "react";
import { useToolHistory } from "@/shared/lib";
import { useQuota } from "@/features/quota";
import {
  minifyCss,
  beautifyCss,
  type MinifyOptions,
  type MinifyResult,
} from "../lib/minifier";

export type CssMode = "minify" | "beautify";

export function useCssMinifier() {
  const { trackUsage } = useQuota("css-minifier");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<MinifyResult["stats"] | null>(null);
  const [options, setOptions] = useState<MinifyOptions>({
    removeComments: true,
    removeWhitespace: true,
    removeEmptyRules: true,
    mergeSelectors: false,
    shortenColors: true,
    shortenZeros: true,
  });

  const { history, addToHistory, clearHistory, hasHistory } =
    useToolHistory("css-minifier");

  const handleProcess = useCallback(
    (mode: CssMode) => {
      if (!input.trim()) {
        setError("Please enter CSS to process");
        setOutput("");
        setStats(null);
        return;
      }

      let result: MinifyResult;

      if (mode === "minify") {
        result = minifyCss(input, options);
      } else {
        result = beautifyCss(input);
      }

      if (result.success) {
        setOutput(result.output);
        setError(null);
        setStats(result.stats || null);
        addToHistory(input, result.output);
        trackUsage();
      } else {
        setError(result.error || "Processing failed");
        setOutput("");
        setStats(null);
      }
    },
    [input, options, addToHistory, trackUsage],
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
    setStats(null);
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
      setStats(null);
    },
    [],
  );

  const updateOption = useCallback(
    <K extends keyof MinifyOptions>(key: K, value: MinifyOptions[K]) => {
      setOptions((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  return {
    input,
    output,
    error,
    stats,
    options,
    setInput,
    updateOption,
    handleProcess,
    handleCopy,
    handleClear,
    handlePaste,
    history,
    hasHistory,
    clearHistory,
    loadFromHistory,
  };
}
