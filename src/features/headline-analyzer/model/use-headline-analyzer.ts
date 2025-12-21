"use client";

import { useState, useMemo, useCallback } from "react";
import { analyzeHeadline } from "../lib/analyzer";
import type { HeadlineAnalysis } from "../lib/types";

export interface UseHeadlineAnalyzerReturn {
  /** Current headline input */
  headline: string;
  /** Set headline */
  setHeadline: (value: string) => void;
  /** Analysis result */
  analysis: HeadlineAnalysis;
  /** Clear headline */
  clear: () => void;
  /** Example headlines for testing */
  examples: string[];
  /** Load example headline */
  loadExample: (index: number) => void;
}

const EXAMPLE_HEADLINES = [
  "10 Proven Ways to Boost Your Productivity Today",
  "How to Learn Programming in 30 Days (Complete Guide)",
  "The Ultimate Guide to React Hooks for Beginners",
  "Why Most Developers Fail and How to Avoid Their Mistakes",
  "Breaking: New JavaScript Framework Changes Everything",
  "5 Free Tools Every Developer Should Know About",
];

export function useHeadlineAnalyzer(): UseHeadlineAnalyzerReturn {
  const [headline, setHeadline] = useState("");

  const analysis = useMemo(() => {
    return analyzeHeadline(headline);
  }, [headline]);

  const clear = useCallback(() => {
    setHeadline("");
  }, []);

  const loadExample = useCallback((index: number) => {
    if (index >= 0 && index < EXAMPLE_HEADLINES.length) {
      setHeadline(EXAMPLE_HEADLINES[index]);
    }
  }, []);

  return {
    headline,
    setHeadline,
    analysis,
    clear,
    examples: EXAMPLE_HEADLINES,
    loadExample,
  };
}
