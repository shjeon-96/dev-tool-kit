// Web Search Service using Tavily API
// Provides real-time web search for RAG-based content generation

import { tavily } from "@tavily/core";
import type {
  SearchContextResult,
  ContextItem,
  WebSearchOptions,
  SearchResult,
} from "./types";

// Tavily API key from environment
const TAVILY_API_KEY = process.env.TAVILY_API_KEY;

// Default search options optimized for content generation
const DEFAULT_OPTIONS: WebSearchOptions = {
  maxResults: 5,
  maxTokens: 3000,
  searchDepth: "advanced",
  topic: "news",
};

/**
 * Check if Tavily is configured
 */
export function isTavilyConfigured(): boolean {
  return Boolean(TAVILY_API_KEY);
}

/**
 * Create Tavily client instance
 */
function getClient() {
  if (!TAVILY_API_KEY) {
    throw new Error("TAVILY_API_KEY environment variable is not set");
  }
  return tavily({ apiKey: TAVILY_API_KEY });
}

/**
 * Search for latest information about a topic
 * Returns formatted context for RAG
 * Uses search() API and processes results (searchContext deprecated)
 */
export async function searchForContext(
  query: string,
  options: WebSearchOptions = {},
): Promise<SearchContextResult> {
  const client = getClient();
  const mergedOptions = { ...DEFAULT_OPTIONS, ...options };

  try {
    // Use search() API directly (searchContext is deprecated)
    const response = await client.search(query, {
      searchDepth: mergedOptions.searchDepth,
      maxResults: mergedOptions.maxResults,
      includeDomains: mergedOptions.includeDomains,
      excludeDomains: mergedOptions.excludeDomains,
    });

    // Transform search results to context items
    const contextItems: ContextItem[] = response.results.map((result) => ({
      url: result.url,
      title: result.title,
      content: result.content,
      publishedDate: result.publishedDate,
    }));

    return {
      query,
      context: contextItems,
      searchedAt: new Date(),
      totalTokens: mergedOptions.maxTokens,
    };
  } catch (error) {
    console.error("[WebSearch] Failed to search:", error);
    // Return empty context on error - allows fallback to model knowledge
    return {
      query,
      context: [],
      searchedAt: new Date(),
    };
  }
}

/**
 * Search with full results including titles and scores
 */
export async function searchWithDetails(
  query: string,
  options: WebSearchOptions = {},
): Promise<SearchResult[]> {
  const client = getClient();
  const mergedOptions = { ...DEFAULT_OPTIONS, ...options };

  try {
    const response = await client.search(query, {
      searchDepth: mergedOptions.searchDepth,
      maxResults: mergedOptions.maxResults,
      includeDomains: mergedOptions.includeDomains,
      excludeDomains: mergedOptions.excludeDomains,
    });

    return response.results.map((result) => ({
      url: result.url,
      title: result.title,
      content: result.content,
      score: result.score,
      publishedDate: result.publishedDate,
    }));
  } catch (error) {
    console.error("[WebSearch] Failed to search with details:", error);
    return [];
  }
}

/**
 * Format search context for AI prompt
 * Creates a structured text block with sources
 */
export function formatContextForPrompt(result: SearchContextResult): string {
  if (!result.context || result.context.length === 0) {
    return "";
  }

  const lines: string[] = [
    `## Latest Web Search Results (searched: ${result.searchedAt.toISOString()})`,
    `Query: "${result.query}"`,
    "",
    "### Sources:",
  ];

  result.context.forEach((item, index) => {
    const dateInfo = item.publishedDate ? ` (${item.publishedDate})` : "";
    lines.push(`[${index + 1}] **${item.title}**${dateInfo}`);
    lines.push(`    URL: ${item.url}`);
    lines.push(`    ${item.content}`);
    lines.push("");
  });

  lines.push("---");
  lines.push(
    "Use the above search results to ensure your content is based on the latest information.",
  );

  return lines.join("\n");
}

/**
 * Search for trend-related latest news and information
 * Optimized for blog article generation
 */
export async function searchTrendContext(
  keyword: string,
  relatedKeywords: string[] = [],
): Promise<SearchContextResult> {
  // Build comprehensive search query
  const queryParts = [keyword];

  // Add top 2 related keywords for broader context
  if (relatedKeywords.length > 0) {
    queryParts.push(...relatedKeywords.slice(0, 2));
  }

  // Add "latest" and current year for recency
  const currentYear = new Date().getFullYear();
  const query = `${queryParts.join(" ")} latest ${currentYear}`;

  return searchForContext(query, {
    maxResults: 5,
    maxTokens: 4000,
    searchDepth: "advanced",
    topic: "news",
    // Exclude unreliable sources
    excludeDomains: ["pinterest.com", "quora.com"],
  });
}

// Re-export types
export type {
  SearchContextResult,
  ContextItem,
  WebSearchOptions,
  SearchResult,
} from "./types";
