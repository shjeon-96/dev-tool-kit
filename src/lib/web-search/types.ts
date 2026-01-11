// Web Search Types for RAG-based content generation

/**
 * Search result item from web search
 */
export interface SearchResult {
  url: string;
  title: string;
  content: string;
  score?: number;
  publishedDate?: string;
}

/**
 * Context item for RAG
 */
export interface ContextItem {
  url: string;
  title: string;
  content: string;
  publishedDate?: string;
}

/**
 * Web search options
 */
export interface WebSearchOptions {
  maxResults?: number;
  maxTokens?: number;
  searchDepth?: "basic" | "advanced";
  includeDomains?: string[];
  excludeDomains?: string[];
  topic?: "general" | "news";
}

/**
 * Search context result for content generation
 */
export interface SearchContextResult {
  query: string;
  context: ContextItem[];
  searchedAt: Date;
  totalTokens?: number;
}
