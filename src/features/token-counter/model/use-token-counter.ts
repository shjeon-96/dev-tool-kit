"use client";

import { useState, useMemo, useCallback } from "react";
import { AIModel, TokenCountResult } from "../lib/types";
import { MODEL_INFO, ALL_MODELS } from "../lib/pricing";
import { analyzeText } from "../lib/tokenizer";

export interface UseTokenCounterReturn {
  // State
  text: string;
  model: AIModel;
  outputRatio: number;
  result: TokenCountResult | null;

  // Actions
  setText: (text: string) => void;
  setModel: (model: AIModel) => void;
  setOutputRatio: (ratio: number) => void;
  clearText: () => void;

  // Computed
  modelInfo: (typeof MODEL_INFO)[AIModel];
  allModels: AIModel[];
  isOverLimit: boolean;
}

export function useTokenCounter(): UseTokenCounterReturn {
  const [text, setText] = useState("");
  const [model, setModel] = useState<AIModel>("gpt-4o");
  const [outputRatio, setOutputRatio] = useState(1.0);

  const result = useMemo(() => {
    if (!text) return null;
    return analyzeText(text, model, outputRatio);
  }, [text, model, outputRatio]);

  const modelInfo = MODEL_INFO[model];

  const isOverLimit = useMemo(() => {
    if (!result) return false;
    return result.count.tokens > modelInfo.contextWindow;
  }, [result, modelInfo.contextWindow]);

  const clearText = useCallback(() => {
    setText("");
  }, []);

  return {
    text,
    model,
    outputRatio,
    result,
    setText,
    setModel,
    setOutputRatio,
    clearText,
    modelInfo,
    allModels: ALL_MODELS,
    isOverLimit,
  };
}
