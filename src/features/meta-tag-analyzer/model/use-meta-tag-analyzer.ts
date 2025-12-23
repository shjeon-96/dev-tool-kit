"use client";

import { useState, useCallback } from "react";
import type { AnalysisResult } from "../lib/types";
import { SAMPLE_HTML } from "../lib/types";
import { analyzeHtml } from "../lib/analyzer";

export function useMetaTagAnalyzer() {
  const [html, setHtml] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyze = useCallback(() => {
    if (!html.trim()) {
      setError("HTML을 입력해주세요");
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const analysisResult = analyzeHtml(html);
      setResult(analysisResult);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "분석 중 오류가 발생했습니다",
      );
      setResult(null);
    } finally {
      setIsAnalyzing(false);
    }
  }, [html]);

  const loadSample = useCallback(() => {
    setHtml(SAMPLE_HTML);
    setError(null);
    setResult(null);
  }, []);

  const clear = useCallback(() => {
    setHtml("");
    setResult(null);
    setError(null);
  }, []);

  return {
    html,
    setHtml,
    result,
    isAnalyzing,
    error,
    analyze,
    loadSample,
    clear,
  };
}
