"use client";

import { useState, useCallback, useMemo } from "react";
import he from "he";

export type EntityMode = "named" | "numeric" | "decimal";

export function useHtmlEntity() {
  const [input, setInput] = useState("<div class=\"test\">Hello & World</div>");
  const [mode, setMode] = useState<EntityMode>("named");
  const [isEncoding, setIsEncoding] = useState(true);

  const output = useMemo(() => {
    if (!input.trim()) return "";

    try {
      if (isEncoding) {
        return he.encode(input, {
          useNamedReferences: mode === "named",
          decimal: mode === "decimal",
        });
      } else {
        return he.decode(input);
      }
    } catch (e) {
      return `오류: ${e instanceof Error ? e.message : "변환 실패"}`;
    }
  }, [input, mode, isEncoding]);

  const handleSwap = useCallback(() => {
    setInput(output);
    setIsEncoding(!isEncoding);
  }, [output, isEncoding]);

  const handleClear = useCallback(() => {
    setInput("");
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
    input,
    setInput,
    mode,
    setMode,
    isEncoding,
    setIsEncoding,
    output,
    handleSwap,
    handleClear,
    copyToClipboard,
  };
}
