"use client";

import { useState, useCallback, useMemo } from "react";

export type NumberBase = 2 | 8 | 10 | 16;

export interface BaseValues {
  binary: string;
  octal: string;
  decimal: string;
  hexadecimal: string;
}

export function useBaseConverter() {
  const [input, setInput] = useState("");
  const [sourceBase, setSourceBase] = useState<NumberBase>(10);
  const [error, setError] = useState<string | null>(null);

  const validateInput = useCallback((value: string, base: NumberBase): boolean => {
    if (!value.trim()) return true;

    const patterns: Record<NumberBase, RegExp> = {
      2: /^[01]+$/,
      8: /^[0-7]+$/,
      10: /^-?[0-9]+$/,
      16: /^[0-9a-fA-F]+$/,
    };

    return patterns[base].test(value);
  }, []);

  const convertedValues = useMemo((): BaseValues | null => {
    if (!input.trim()) {
      setError(null);
      return null;
    }

    if (!validateInput(input, sourceBase)) {
      setError(`유효하지 않은 ${sourceBase}진수 입력입니다`);
      return null;
    }

    try {
      setError(null);

      // Use BigInt for large numbers
      let decimalValue: bigint;

      if (sourceBase === 10) {
        decimalValue = BigInt(input);
      } else {
        decimalValue = BigInt(parseInt(input, sourceBase));
      }

      // Handle negative numbers for display
      const isNegative = decimalValue < 0n;
      const absValue = isNegative ? -decimalValue : decimalValue;

      return {
        binary: (isNegative ? "-" : "") + absValue.toString(2),
        octal: (isNegative ? "-" : "") + absValue.toString(8),
        decimal: decimalValue.toString(10),
        hexadecimal: ((isNegative ? "-" : "") + absValue.toString(16)).toUpperCase(),
      };
    } catch {
      setError("변환에 실패했습니다");
      return null;
    }
  }, [input, sourceBase, validateInput]);

  const handleInputChange = useCallback(
    (value: string, base: NumberBase) => {
      setInput(value);
      setSourceBase(base);
    },
    []
  );

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
    setError(null);
  }, []);

  return {
    input,
    sourceBase,
    convertedValues,
    error,
    handleInputChange,
    copyToClipboard,
    handleClear,
  };
}
