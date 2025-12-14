"use client";

import { useState, useCallback, useEffect } from "react";
import {
  callAI,
  AI_PROVIDERS,
  validateApiKey,
  type AIProvider,
} from "../lib/providers";
import {
  buildPrompt,
  detectContext,
  type ExplainContext,
} from "../lib/prompts";

const STORAGE_KEY = "ai-explain-config";

interface AIConfig {
  provider: AIProvider;
  model: string;
  apiKey: string;
}

interface UseAIExplainOptions {
  defaultContext?: ExplainContext;
}

export function useAIExplain(options: UseAIExplainOptions = {}) {
  const { defaultContext } = options;

  const [config, setConfig] = useState<AIConfig | null>(null);
  const [isConfigured, setIsConfigured] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  // Load config from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as AIConfig;
        if (parsed.apiKey && parsed.provider && parsed.model) {
          setConfig(parsed);
          setIsConfigured(true);
        }
      } catch {
        // Invalid stored config
      }
    }
  }, []);

  const saveConfig = useCallback((newConfig: AIConfig) => {
    // Validate API key format
    if (!validateApiKey(newConfig.provider, newConfig.apiKey)) {
      setError("Invalid API key format for this provider");
      return false;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newConfig));
    setConfig(newConfig);
    setIsConfigured(true);
    setError(null);
    return true;
  }, []);

  const clearConfig = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setConfig(null);
    setIsConfigured(false);
  }, []);

  const explain = useCallback(
    async (input: string, context?: ExplainContext) => {
      if (!config) {
        setError("Please configure your AI provider first");
        return null;
      }

      if (!input.trim()) {
        setError("Please provide input to explain");
        return null;
      }

      setIsLoading(true);
      setError(null);
      setResult(null);

      try {
        const detectedContext =
          context || defaultContext || detectContext(input);
        const prompt = buildPrompt(input, detectedContext);

        const response = await callAI({
          provider: config.provider,
          model: config.model,
          apiKey: config.apiKey,
          systemPrompt: prompt.system,
          userPrompt: prompt.user,
        });

        setResult(response);
        return response;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to get explanation";
        setError(message);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [config, defaultContext],
  );

  const detectInputContext = useCallback((input: string) => {
    return detectContext(input);
  }, []);

  return {
    // Config
    config,
    isConfigured,
    saveConfig,
    clearConfig,
    providers: AI_PROVIDERS,

    // Explain
    explain,
    isLoading,
    error,
    result,

    // Utils
    detectInputContext,
  };
}
