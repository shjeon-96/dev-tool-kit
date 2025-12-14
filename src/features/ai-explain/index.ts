export { AIExplainButton } from "./ui/ai-explain-button";
export { AIConfigDialog } from "./ui/ai-config-dialog";
export { useAIExplain } from "./model/use-ai-explain";
export {
  AI_PROVIDERS,
  validateApiKey,
  callAI,
  type AIProvider,
  type AIProviderConfig,
  type AIRequestParams,
} from "./lib/providers";
export {
  EXPLAIN_PROMPTS,
  detectContext,
  buildPrompt,
  type ExplainContext,
  type PromptTemplate,
} from "./lib/prompts";
