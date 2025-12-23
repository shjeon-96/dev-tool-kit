"use client";

import { useState, useCallback } from "react";
import type { EncodeDecodeType } from "@/entities/encode-decode-type";

export interface UseEncodeDecodeResult {
  input: string;
  setInput: (value: string) => void;
  output: string;
  mode: "encode" | "decode";
  setMode: (mode: "encode" | "decode") => void;
  process: () => void;
  clear: () => void;
  swap: () => void;
  isProcessing: boolean;
  error: string | null;
}

/**
 * Base64 인코딩/디코딩
 */
function processBase64(input: string, isEncode: boolean): string {
  if (isEncode) {
    return btoa(unescape(encodeURIComponent(input)));
  } else {
    return decodeURIComponent(escape(atob(input)));
  }
}

/**
 * Base64URL 인코딩/디코딩
 */
function processBase64Url(input: string, isEncode: boolean): string {
  if (isEncode) {
    return btoa(unescape(encodeURIComponent(input)))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  } else {
    let base64 = input.replace(/-/g, "+").replace(/_/g, "/");
    while (base64.length % 4) {
      base64 += "=";
    }
    return decodeURIComponent(escape(atob(base64)));
  }
}

/**
 * URL 인코딩/디코딩
 */
function processUrl(input: string, isEncode: boolean): string {
  if (isEncode) {
    return encodeURIComponent(input);
  } else {
    return decodeURIComponent(input);
  }
}

/**
 * HTML 엔티티 인코딩/디코딩
 */
function processHtml(input: string, isEncode: boolean): string {
  if (isEncode) {
    return input
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  } else {
    return input
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&#x27;/g, "'")
      .replace(/&#x2F;/g, "/");
  }
}

/**
 * 유니코드 이스케이프 인코딩/디코딩
 */
function processUnicodeEscape(input: string, isEncode: boolean): string {
  if (isEncode) {
    return input
      .split("")
      .map((char) => {
        const code = char.charCodeAt(0);
        if (code > 127) {
          return "\\u" + code.toString(16).padStart(4, "0");
        }
        return char;
      })
      .join("");
  } else {
    return input.replace(/\\u([0-9a-fA-F]{4})/g, (_, code) =>
      String.fromCharCode(parseInt(code, 16)),
    );
  }
}

/**
 * Hex 인코딩/디코딩
 */
function processHex(input: string, isEncode: boolean): string {
  if (isEncode) {
    return Array.from(input)
      .map((char) => char.charCodeAt(0).toString(16).padStart(2, "0"))
      .join(" ");
  } else {
    const hexArray = input.replace(/\s/g, "").match(/.{1,2}/g) || [];
    return hexArray
      .map((hex) => String.fromCharCode(parseInt(hex, 16)))
      .join("");
  }
}

/**
 * Binary 인코딩/디코딩
 */
function processBinary(input: string, isEncode: boolean): string {
  if (isEncode) {
    return Array.from(input)
      .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
      .join(" ");
  } else {
    const binaryArray = input.split(/\s+/).filter(Boolean);
    return binaryArray
      .map((bin) => String.fromCharCode(parseInt(bin, 2)))
      .join("");
  }
}

/**
 * ASCII 인코딩/디코딩
 */
function processAscii(input: string, isEncode: boolean): string {
  if (isEncode) {
    return Array.from(input)
      .map((char) => char.charCodeAt(0))
      .join(" ");
  } else {
    const codes = input.split(/\s+/).filter(Boolean);
    return codes
      .map((code) => String.fromCharCode(parseInt(code, 10)))
      .join("");
  }
}

/**
 * ROT13 인코딩/디코딩 (대칭적)
 */
function processRot13(input: string): string {
  return input.replace(/[a-zA-Z]/g, (char) => {
    const code = char.charCodeAt(0);
    const base = code < 97 ? 65 : 97;
    return String.fromCharCode(((code - base + 13) % 26) + base);
  });
}

/**
 * Morse Code 인코딩/디코딩
 */
const MORSE_CODE: Record<string, string> = {
  A: ".-",
  B: "-...",
  C: "-.-.",
  D: "-..",
  E: ".",
  F: "..-.",
  G: "--.",
  H: "....",
  I: "..",
  J: ".---",
  K: "-.-",
  L: ".-..",
  M: "--",
  N: "-.",
  O: "---",
  P: ".--.",
  Q: "--.-",
  R: ".-.",
  S: "...",
  T: "-",
  U: "..-",
  V: "...-",
  W: ".--",
  X: "-..-",
  Y: "-.--",
  Z: "--..",
  "0": "-----",
  "1": ".----",
  "2": "..---",
  "3": "...--",
  "4": "....-",
  "5": ".....",
  "6": "-....",
  "7": "--...",
  "8": "---..",
  "9": "----.",
  " ": "/",
  ".": ".-.-.-",
  ",": "--..--",
  "?": "..--..",
  "'": ".----.",
  "!": "-.-.--",
  "/": "-..-.",
};
const MORSE_REVERSE = Object.fromEntries(
  Object.entries(MORSE_CODE).map(([k, v]) => [v, k]),
);

function processMorse(input: string, isEncode: boolean): string {
  if (isEncode) {
    return input
      .toUpperCase()
      .split("")
      .map((char) => MORSE_CODE[char] || char)
      .join(" ");
  } else {
    return input
      .split(" ")
      .map((code) => MORSE_REVERSE[code] || code)
      .join("");
  }
}

/**
 * JSON Escape 인코딩/디코딩
 */
function processJsonEscape(input: string, isEncode: boolean): string {
  if (isEncode) {
    return JSON.stringify(input).slice(1, -1);
  } else {
    try {
      return JSON.parse(`"${input}"`);
    } catch {
      return input;
    }
  }
}

/**
 * 타입별 처리 함수 매핑
 */
function processEncoding(
  input: string,
  slug: string,
  isEncode: boolean,
): string {
  switch (slug) {
    case "base64":
      return processBase64(input, isEncode);
    case "base64url":
      return processBase64Url(input, isEncode);
    case "url":
    case "uri-component":
      return processUrl(input, isEncode);
    case "html":
      return processHtml(input, isEncode);
    case "unicode-escape":
      return processUnicodeEscape(input, isEncode);
    case "hex":
      return processHex(input, isEncode);
    case "binary":
      return processBinary(input, isEncode);
    case "ascii":
      return processAscii(input, isEncode);
    case "rot13":
      return processRot13(input);
    case "morse":
      return processMorse(input, isEncode);
    case "json-escape":
      return processJsonEscape(input, isEncode);
    default:
      return input;
  }
}

export function useEncodeDecode(type: EncodeDecodeType): UseEncodeDecodeResult {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const process = useCallback(() => {
    if (!input.trim()) {
      setOutput("");
      setError(null);
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const result = processEncoding(input, type.slug, mode === "encode");
      setOutput(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Processing failed");
      setOutput("");
    } finally {
      setIsProcessing(false);
    }
  }, [input, type.slug, mode]);

  const clear = useCallback(() => {
    setInput("");
    setOutput("");
    setError(null);
  }, []);

  const swap = useCallback(() => {
    setInput(output);
    setOutput(input);
    setMode((prev) => (prev === "encode" ? "decode" : "encode"));
  }, [input, output]);

  return {
    input,
    setInput,
    output,
    mode,
    setMode,
    process,
    clear,
    swap,
    isProcessing,
    error,
  };
}
