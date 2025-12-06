"use client";

import { useState, useCallback, useMemo } from "react";

export type DiffViewMode = "split" | "inline";
export type EditorLanguage = "plaintext" | "javascript" | "typescript" | "json" | "html" | "css" | "python" | "sql" | "markdown";

export interface DiffStats {
  additions: number;
  deletions: number;
  changes: number;
}

const sampleOriginal = `function greet(name) {
  console.log("Hello, " + name);
  return true;
}

const message = "Welcome";
greet(message);`;

const sampleModified = `function greet(name, greeting = "Hello") {
  console.log(greeting + ", " + name + "!");
  return { success: true, name };
}

const message = "Welcome";
const result = greet(message, "Hi");
console.log(result);`;

export function useDiffChecker() {
  const [original, setOriginal] = useState(sampleOriginal);
  const [modified, setModified] = useState(sampleModified);
  const [viewMode, setViewMode] = useState<DiffViewMode>("split");
  const [language, setLanguage] = useState<EditorLanguage>("javascript");

  const diffStats = useMemo((): DiffStats => {
    const originalLines = original.split("\n");
    const modifiedLines = modified.split("\n");

    const originalSet = new Set(originalLines);
    const modifiedSet = new Set(modifiedLines);

    let additions = 0;
    let deletions = 0;

    modifiedLines.forEach((line) => {
      if (!originalSet.has(line)) additions++;
    });

    originalLines.forEach((line) => {
      if (!modifiedSet.has(line)) deletions++;
    });

    return {
      additions,
      deletions,
      changes: additions + deletions,
    };
  }, [original, modified]);

  const handleSwap = useCallback(() => {
    const temp = original;
    setOriginal(modified);
    setModified(temp);
  }, [original, modified]);

  const handleClear = useCallback(() => {
    setOriginal("");
    setModified("");
  }, []);

  const handleReset = useCallback(() => {
    setOriginal(sampleOriginal);
    setModified(sampleModified);
  }, []);

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  }, []);

  return {
    original,
    setOriginal,
    modified,
    setModified,
    viewMode,
    setViewMode,
    language,
    setLanguage,
    diffStats,
    handleSwap,
    handleClear,
    handleReset,
    copyToClipboard,
  };
}
