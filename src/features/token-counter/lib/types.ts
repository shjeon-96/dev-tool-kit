/**
 * Token Counter Types
 */

export type AIModel =
  // OpenAI GPT Series
  | "gpt-4o"
  | "gpt-4o-mini"
  | "gpt-4-turbo"
  | "gpt-4"
  | "gpt-3.5-turbo"
  // OpenAI O Series (Reasoning)
  | "o1"
  | "o1-mini"
  | "o1-pro"
  | "o3-mini"
  // Anthropic Claude 4
  | "claude-opus-4"
  | "claude-sonnet-4"
  // Anthropic Claude 3.5
  | "claude-3.5-sonnet"
  | "claude-3.5-haiku"
  // Anthropic Claude 3
  | "claude-3-opus"
  | "claude-3-sonnet"
  | "claude-3-haiku";

export type ModelProvider = "openai" | "anthropic";

export interface ModelInfo {
  id: AIModel;
  name: string;
  provider: ModelProvider;
  contextWindow: number;
  inputPrice: number; // per 1M tokens
  outputPrice: number; // per 1M tokens
  description: string;
}

export interface TokenCount {
  tokens: number;
  characters: number;
  words: number;
  lines: number;
}

export interface CostEstimate {
  inputCost: number;
  outputCost: number;
  totalCost: number;
  outputTokensEstimate: number;
}

export interface TokenCountResult {
  count: TokenCount;
  model: AIModel;
  costEstimate: CostEstimate;
  percentOfContext: number;
}
