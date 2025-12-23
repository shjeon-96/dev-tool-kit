"use client";

import { useState, useCallback } from "react";
import type { MinifyType } from "@/entities/minify-type";

interface UseMinifyTypeReturn {
  input: string;
  setInput: (value: string) => void;
  output: string;
  minify: () => void;
  clear: () => void;
  isProcessing: boolean;
  error: string | null;
  stats: {
    originalSize: number;
    minifiedSize: number;
    savings: number;
    savingsPercent: number;
  } | null;
}

export function useMinifyType(minifyType: MinifyType): UseMinifyTypeReturn {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<UseMinifyTypeReturn["stats"]>(null);

  const minifyJson = useCallback((text: string): string => {
    const parsed = JSON.parse(text);
    return JSON.stringify(parsed);
  }, []);

  const minifyJavaScript = useCallback((text: string): string => {
    // Basic JS minification: remove comments and extra whitespace
    let result = text;

    // Remove single-line comments (but not URLs with //)
    result = result.replace(/(?<![:"'])\/\/.*$/gm, "");

    // Remove multi-line comments
    result = result.replace(/\/\*[\s\S]*?\*\//g, "");

    // Remove extra whitespace
    result = result
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .join(" ");

    // Normalize spaces around operators
    result = result
      .replace(/\s+/g, " ")
      .replace(/\s*([{}();,:])\s*/g, "$1")
      .replace(/\s*([+\-*/%=<>!&|])\s*/g, "$1")
      .trim();

    return result;
  }, []);

  const minifyCss = useCallback((text: string): string => {
    let result = text;

    // Remove comments
    result = result.replace(/\/\*[\s\S]*?\*\//g, "");

    // Remove extra whitespace
    result = result
      .replace(/\s+/g, " ")
      .replace(/\s*{\s*/g, "{")
      .replace(/\s*}\s*/g, "}")
      .replace(/\s*;\s*/g, ";")
      .replace(/\s*:\s*/g, ":")
      .replace(/\s*,\s*/g, ",")
      .trim();

    // Remove last semicolon before }
    result = result.replace(/;}/g, "}");

    return result;
  }, []);

  const minifyHtml = useCallback((text: string): string => {
    let result = text;

    // Remove HTML comments
    result = result.replace(/<!--[\s\S]*?-->/g, "");

    // Remove extra whitespace between tags
    result = result.replace(/>\s+</g, "><");

    // Normalize whitespace
    result = result.replace(/\s+/g, " ").trim();

    return result;
  }, []);

  const minifyXml = useCallback((text: string): string => {
    let result = text;

    // Remove XML comments
    result = result.replace(/<!--[\s\S]*?-->/g, "");

    // Remove extra whitespace between tags
    result = result.replace(/>\s+</g, "><");

    // Normalize whitespace
    result = result.replace(/\s+/g, " ").trim();

    return result;
  }, []);

  const minifySvg = useCallback((text: string): string => {
    let result = text;

    // Remove comments
    result = result.replace(/<!--[\s\S]*?-->/g, "");

    // Remove unnecessary whitespace
    result = result.replace(/>\s+</g, "><");

    // Remove metadata and editor-specific elements
    result = result.replace(/<metadata[\s\S]*?<\/metadata>/gi, "");
    result = result.replace(/<sodipodi:[\s\S]*?\/>/gi, "");
    result = result.replace(/<inkscape:[\s\S]*?\/>/gi, "");

    // Normalize whitespace
    result = result.replace(/\s+/g, " ").trim();

    return result;
  }, []);

  const minifySql = useCallback((text: string): string => {
    let result = text;

    // Remove single-line comments
    result = result.replace(/--.*$/gm, "");

    // Remove multi-line comments
    result = result.replace(/\/\*[\s\S]*?\*\//g, "");

    // Normalize whitespace to single spaces
    result = result.replace(/\s+/g, " ").trim();

    return result;
  }, []);

  const minify = useCallback(() => {
    if (!input.trim()) {
      setOutput("");
      setError(null);
      setStats(null);
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      let result: string;

      switch (minifyType.slug) {
        case "json":
          result = minifyJson(input);
          break;
        case "javascript":
          result = minifyJavaScript(input);
          break;
        case "css":
          result = minifyCss(input);
          break;
        case "html":
          result = minifyHtml(input);
          break;
        case "xml":
          result = minifyXml(input);
          break;
        case "svg":
          result = minifySvg(input);
          break;
        case "sql":
          result = minifySql(input);
          break;
        default:
          // Generic minification
          result = input.replace(/\s+/g, " ").trim();
      }

      setOutput(result);

      // Calculate stats
      const originalSize = new Blob([input]).size;
      const minifiedSize = new Blob([result]).size;
      const savings = originalSize - minifiedSize;
      const savingsPercent =
        originalSize > 0 ? (savings / originalSize) * 100 : 0;

      setStats({
        originalSize,
        minifiedSize,
        savings,
        savingsPercent,
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while minifying",
      );
      setOutput("");
      setStats(null);
    } finally {
      setIsProcessing(false);
    }
  }, [
    input,
    minifyType.slug,
    minifyJson,
    minifyJavaScript,
    minifyCss,
    minifyHtml,
    minifyXml,
    minifySvg,
    minifySql,
  ]);

  const clear = useCallback(() => {
    setInput("");
    setOutput("");
    setError(null);
    setStats(null);
  }, []);

  return {
    input,
    setInput,
    output,
    minify,
    clear,
    isProcessing,
    error,
    stats,
  };
}
