"use client";

import { useState, useCallback } from "react";
import { format } from "sql-formatter";
import { useQuota } from "@/shared/lib/quota";

export type SqlDialect = "sql" | "mysql" | "postgresql" | "sqlite" | "mariadb";

export interface FormatOptions {
  dialect: SqlDialect;
  tabWidth: number;
  uppercase: boolean;
  linesBetweenQueries: number;
}

export function useSqlFormatter() {
  const { trackUsage } = useQuota("sql-formatter");

  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [options, setOptions] = useState<FormatOptions>({
    dialect: "sql",
    tabWidth: 2,
    uppercase: true,
    linesBetweenQueries: 2,
  });

  const handleFormat = useCallback(() => {
    if (!input.trim()) {
      setOutput("");
      setError(null);
      return;
    }

    try {
      const formatted = format(input, {
        language: options.dialect,
        tabWidth: options.tabWidth,
        keywordCase: options.uppercase ? "upper" : "lower",
        linesBetweenQueries: options.linesBetweenQueries,
      });
      setOutput(formatted);
      setError(null);
      trackUsage();
    } catch (e) {
      setError(e instanceof Error ? e.message : "SQL 포맷팅에 실패했습니다");
      setOutput("");
    }
  }, [input, options, trackUsage]);

  const handleMinify = useCallback(() => {
    if (!input.trim()) {
      setOutput("");
      setError(null);
      return;
    }

    try {
      // Simple minification: remove extra whitespace and newlines
      const minified = input
        .replace(/\s+/g, " ")
        .replace(/\s*([,;()])\s*/g, "$1")
        .trim();
      setOutput(minified);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "SQL 압축에 실패했습니다");
      setOutput("");
    }
  }, [input]);

  const updateOptions = useCallback((updates: Partial<FormatOptions>) => {
    setOptions((prev) => ({ ...prev, ...updates }));
  }, []);

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  }, []);

  const handleClear = useCallback(() => {
    setInput("");
    setOutput("");
    setError(null);
  }, []);

  const handlePaste = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInput(text);
    } catch {
      // Ignore paste errors
    }
  }, []);

  return {
    input,
    output,
    error,
    options,
    setInput,
    handleFormat,
    handleMinify,
    updateOptions,
    copyToClipboard,
    handleClear,
    handlePaste,
  };
}
