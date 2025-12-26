/**
 * Token counting utilities
 * Uses gpt-tokenizer for accurate OpenAI token counts
 * Approximates Claude tokens (similar to GPT-4)
 */

import { encode } from "gpt-tokenizer";
import { AIModel, TokenCount, CostEstimate, TokenCountResult } from "./types";
import { MODEL_INFO } from "./pricing";

/**
 * Count tokens for a given text using the appropriate tokenizer
 */
export function countTokens(text: string, model: AIModel): number {
  if (!text) return 0;

  const provider = MODEL_INFO[model].provider;

  if (provider === "openai") {
    // Use GPT tokenizer for OpenAI models
    return encode(text).length;
  } else {
    // Anthropic uses a similar tokenizer to GPT-4
    // Claude typically has ~10-15% fewer tokens than GPT-4 for the same text
    const gptTokens = encode(text).length;
    return Math.round(gptTokens * 0.9);
  }
}

/**
 * Get basic text statistics
 */
export function getTextStats(text: string): Omit<TokenCount, "tokens"> {
  if (!text) {
    return { characters: 0, words: 0, lines: 0 };
  }

  const characters = text.length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const lines = text.split(/\r\n|\r|\n/).length;

  return { characters, words, lines };
}

/**
 * Calculate cost estimate based on token count
 */
export function calculateCost(
  inputTokens: number,
  outputRatio: number,
  model: AIModel,
): CostEstimate {
  const modelInfo = MODEL_INFO[model];
  const outputTokensEstimate = Math.round(inputTokens * outputRatio);

  const inputCost = (inputTokens / 1_000_000) * modelInfo.inputPrice;
  const outputCost = (outputTokensEstimate / 1_000_000) * modelInfo.outputPrice;
  const totalCost = inputCost + outputCost;

  return {
    inputCost,
    outputCost,
    totalCost,
    outputTokensEstimate,
  };
}

/**
 * Get complete token count result
 */
export function analyzeText(
  text: string,
  model: AIModel,
  outputRatio: number = 1.0,
): TokenCountResult {
  const tokens = countTokens(text, model);
  const stats = getTextStats(text);
  const costEstimate = calculateCost(tokens, outputRatio, model);
  const modelInfo = MODEL_INFO[model];
  const percentOfContext = (tokens / modelInfo.contextWindow) * 100;

  return {
    count: {
      tokens,
      ...stats,
    },
    model,
    costEstimate,
    percentOfContext,
  };
}

/**
 * Format currency for display
 */
export function formatCurrency(value: number): string {
  if (value < 0.0001) return "$0.0000";
  if (value < 0.01) return `$${value.toFixed(4)}`;
  if (value < 1) return `$${value.toFixed(3)}`;
  return `$${value.toFixed(2)}`;
}

/**
 * Format number with commas
 */
export function formatNumber(value: number): string {
  return value.toLocaleString();
}

/**
 * Get token-to-word ratio (approximate)
 */
export function getTokenWordRatio(tokens: number, words: number): number {
  if (words === 0) return 0;
  return tokens / words;
}

/**
 * Estimate reading time in minutes
 */
export function estimateReadingTime(words: number, wpm: number = 200): number {
  return Math.ceil(words / wpm);
}
