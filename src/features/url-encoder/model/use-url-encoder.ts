"use client";

import { useState, useCallback, useMemo } from "react";

export type EncodingMode = "encodeURIComponent" | "encodeURI";

export function useUrlEncoder() {
  const [input, setInput] = useState("Hello World! 안녕하세요 🌍");
  const [mode, setMode] = useState<EncodingMode>("encodeURIComponent");
  const [isEncoding, setIsEncoding] = useState(true);

  const output = useMemo(() => {
    if (!input.trim()) return "";

    try {
      if (isEncoding) {
        return mode === "encodeURIComponent"
          ? encodeURIComponent(input)
          : encodeURI(input);
      } else {
        return mode === "encodeURIComponent"
          ? decodeURIComponent(input)
          : decodeURI(input);
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
