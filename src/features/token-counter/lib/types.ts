/**
 * Token Counter Types
 */

export type AIModel =
  | "gpt-4o"
  | "gpt-4o-mini"
  | "gpt-4-turbo"
  | "gpt-4"
  | "gpt-3.5-turbo"
  | "claude-3.5-sonnet"
  | "claude-3.5-haiku"
  | "claude-3-opus"
  | "claude-3-sonnet"
  | "claude-3-haiku"
  | "o1"
  | "o1-mini"
  | "o1-pro";

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
