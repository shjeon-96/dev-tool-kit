"use client";

import { useState, useCallback } from "react";
import { useQuota } from "@/features/quota";

export type ConversionMode = "encode" | "decode";

export function useBase64() {
  const { trackUsage } = useQuota("base64-converter");

  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<ConversionMode>("encode");
  const [error, setError] = useState<string | null>(null);

  const encode = useCallback((text: string): string => {
    try {
      // Handle Unicode characters properly
      const bytes = new TextEncoder().encode(text);
      const binString = Array.from(bytes, (byte) =>
        String.fromCodePoint(byte),
      ).join("");
      return btoa(binString);
    } catch {
      throw new Error("Encoding failed");
    }
  }, []);

  const decode = useCallback((base64: string): string => {
    try {
      const binString = atob(base64);
      const bytes = Uint8Array.from(binString, (m) => m.codePointAt(0)!);
      return new TextDecoder().decode(bytes);
    } catch {
      throw new Error("Invalid Base64 string");
    }
  }, []);

  const handleConvert = useCallback(() => {
    if (!input.trim()) {
      setError("텍스트를 입력해주세요");
      setOutput("");
      return;
    }

    try {
      const result = mode === "encode" ? encode(input) : decode(input);
      setOutput(result);
      setError(null);
      trackUsage();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Conversion failed");
      setOutput("");
    }
  }, [input, mode, encode, decode, trackUsage]);

  const handleInputChange = useCallback((value: string) => {
    setInput(value);
    setError(null);
  }, []);

  const handleModeChange = useCallback(
    (newMode: ConversionMode) => {
      setMode(newMode);
      // Swap input and output when changing mode
      setInput(output);
      setOutput(input);
      setError(null);
    },
    [input, output],
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
      setError("Failed to paste from clipboard");
    }
  }, []);

  const handleFileUpload = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // Remove data URL prefix
      const base64 = result.split(",")[1];
      setOutput(base64);
      setError(null);
    };
    reader.onerror = () => {
      setError("Failed to read file");
    };
    reader.readAsDataURL(file);
  }, []);

  return {
    input,
    output,
    mode,
    error,
    handleInputChange,
    handleModeChange,
    handleConvert,
    handleCopy,
    handleClear,
    handlePaste,
    handleFileUpload,
  };
}
