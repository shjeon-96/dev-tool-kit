/**
 * AI Model Pricing Data (as of 2024)
 * Prices are per 1M tokens
 */

import { AIModel, ModelInfo } from "./types";

export const MODEL_INFO: Record<AIModel, ModelInfo> = {
  // OpenAI Models
  "gpt-4o": {
    id: "gpt-4o",
    name: "GPT-4o",
    provider: "openai",
    contextWindow: 128000,
    inputPrice: 2.5,
    outputPrice: 10.0,
    description: "Most capable multimodal model",
  },
  "gpt-4o-mini": {
    id: "gpt-4o-mini",
    name: "GPT-4o mini",
    provider: "openai",
    contextWindow: 128000,
    inputPrice: 0.15,
    outputPrice: 0.6,
    description: "Fast and affordable",
  },
  "gpt-4-turbo": {
    id: "gpt-4-turbo",
    name: "GPT-4 Turbo",
    provider: "openai",
    contextWindow: 128000,
    inputPrice: 10.0,
    outputPrice: 30.0,
    description: "High intelligence model",
  },
  "gpt-4": {
    id: "gpt-4",
    name: "GPT-4",
    provider: "openai",
    contextWindow: 8192,
    inputPrice: 30.0,
    outputPrice: 60.0,
    description: "Original GPT-4",
  },
  "gpt-3.5-turbo": {
    id: "gpt-3.5-turbo",
    name: "GPT-3.5 Turbo",
    provider: "openai",
    contextWindow: 16385,
    inputPrice: 0.5,
    outputPrice: 1.5,
    description: "Fast and cost-effective",
  },
  o1: {
    id: "o1",
    name: "o1",
    provider: "openai",
    contextWindow: 200000,
    inputPrice: 15.0,
    outputPrice: 60.0,
    description: "Reasoning model for complex tasks",
  },
  "o1-mini": {
    id: "o1-mini",
    name: "o1-mini",
    provider: "openai",
    contextWindow: 128000,
    inputPrice: 3.0,
    outputPrice: 12.0,
    description: "Fast reasoning model",
  },
  "o1-pro": {
    id: "o1-pro",
    name: "o1 Pro",
    provider: "openai",
    contextWindow: 200000,
    inputPrice: 150.0,
    outputPrice: 600.0,
    description: "Most capable reasoning model",
  },

  // Anthropic Models
  "claude-3.5-sonnet": {
    id: "claude-3.5-sonnet",
    name: "Claude 3.5 Sonnet",
    provider: "anthropic",
    contextWindow: 200000,
    inputPrice: 3.0,
    outputPrice: 15.0,
    description: "Best balance of speed and intelligence",
  },
  "claude-3.5-haiku": {
    id: "claude-3.5-haiku",
    name: "Claude 3.5 Haiku",
    provider: "anthropic",
    contextWindow: 200000,
    inputPrice: 0.8,
    outputPrice: 4.0,
    description: "Fast and affordable",
  },
  "claude-3-opus": {
    id: "claude-3-opus",
    name: "Claude 3 Opus",
    provider: "anthropic",
    contextWindow: 200000,
    inputPrice: 15.0,
    outputPrice: 75.0,
    description: "Most capable Claude model",
  },
  "claude-3-sonnet": {
    id: "claude-3-sonnet",
    name: "Claude 3 Sonnet",
    provider: "anthropic",
    contextWindow: 200000,
    inputPrice: 3.0,
    outputPrice: 15.0,
    description: "Balanced performance",
  },
  "claude-3-haiku": {
    id: "claude-3-haiku",
    name: "Claude 3 Haiku",
    provider: "anthropic",
    contextWindow: 200000,
    inputPrice: 0.25,
    outputPrice: 1.25,
    description: "Fastest Claude model",
  },
};

export const OPENAI_MODELS: AIModel[] = [
  "gpt-4o",
  "gpt-4o-mini",
  "gpt-4-turbo",
  "gpt-4",
  "gpt-3.5-turbo",
  "o1",
  "o1-mini",
  "o1-pro",
];

export const ANTHROPIC_MODELS: AIModel[] = [
  "claude-3.5-sonnet",
  "claude-3.5-haiku",
  "claude-3-opus",
  "claude-3-sonnet",
  "claude-3-haiku",
];

export const ALL_MODELS: AIModel[] = [...OPENAI_MODELS, ...ANTHROPIC_MODELS];

/**
 * Get model info by ID
 */
export function getModelInfo(model: AIModel): ModelInfo {
  return MODEL_INFO[model];
}

/**
 * Get models by provider
 */
export function getModelsByProvider(
  provider: "openai" | "anthropic",
): AIModel[] {
  return provider === "openai" ? OPENAI_MODELS : ANTHROPIC_MODELS;
}
