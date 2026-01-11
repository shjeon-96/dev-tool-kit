// ============================================
// AI Content Generator with RAG (Web Search)
// ============================================

import Anthropic from "@anthropic-ai/sdk";
import type {
  Trend,
  GeneratedContent,
  ContentGenerationRequest,
  ContentGenerationResult,
} from "@/entities/trend";
import {
  ARTICLE_SYSTEM_PROMPT,
  generateArticlePrompt,
  type ArticleGenerationContext,
} from "./prompts/article";
import { generateSlug, calculateReadingTime } from "@/lib/trend-detector";
import {
  searchTrendContext,
  formatContextForPrompt,
  isTavilyConfigured,
} from "@/lib/web-search";

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Claude Haiku model for cost-effective generation
const MODEL = "claude-3-haiku-20240307";

// Pricing (per million tokens)
const PRICING = {
  input: 0.25, // $0.25 per 1M input tokens
  output: 1.25, // $1.25 per 1M output tokens
};

/**
 * Generate article content from a trend with RAG
 */
export async function generateArticleContent(
  request: ContentGenerationRequest,
): Promise<ContentGenerationResult> {
  const { trend, style = "news" } = request;

  try {
    // Build generation context with date information
    const generationContext: ArticleGenerationContext = {
      generatedAt: new Date(),
      trendDetectedAt: trend.detected_at
        ? new Date(trend.detected_at)
        : undefined,
    };

    // Perform web search for latest information (if Tavily is configured)
    if (isTavilyConfigured()) {
      try {
        const searchResult = await searchTrendContext(
          trend.keyword,
          trend.related_keywords || [],
        );

        if (searchResult.context.length > 0) {
          generationContext.searchContext =
            formatContextForPrompt(searchResult);
        }
      } catch (searchError) {
        // Log but continue without web search - fallback to model knowledge
        console.warn("[ContentGenerator] Web search failed:", searchError);
      }
    }
    // Note: If Tavily is not configured, falls back to model knowledge only

    // Generate the prompt with context
    const prompt = generateArticlePrompt(
      trend.keyword,
      trend.category || "trending",
      trend.related_keywords || [],
      style,
      generationContext,
    );

    // Call Claude API
    const response = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 4096,
      system: ARTICLE_SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    // Extract text content
    const textContent = response.content.find((c) => c.type === "text");
    if (!textContent || textContent.type !== "text") {
      throw new Error("No text content in response");
    }

    // Parse JSON response
    const content = parseJsonResponse(textContent.text);

    // Calculate cost
    const inputTokens = response.usage.input_tokens;
    const outputTokens = response.usage.output_tokens;
    const costUsd =
      (inputTokens * PRICING.input + outputTokens * PRICING.output) / 1_000_000;

    return {
      success: true,
      content,
      tokensUsed: {
        input: inputTokens,
        output: outputTokens,
      },
      costUsd,
    };
  } catch (error) {
    console.error("[ContentGenerator] Error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Escape control characters inside JSON string values
 * Handles newlines, tabs, and other control chars that break JSON.parse
 */
function escapeControlCharsInJsonStrings(jsonStr: string): string {
  let result = "";
  let inString = false;
  let i = 0;

  while (i < jsonStr.length) {
    const char = jsonStr[i];

    if (char === '"' && (i === 0 || jsonStr[i - 1] !== "\\")) {
      // Toggle string state (but check for escaped quotes)
      // Count preceding backslashes to determine if quote is escaped
      let backslashCount = 0;
      let j = i - 1;
      while (j >= 0 && jsonStr[j] === "\\") {
        backslashCount++;
        j--;
      }
      // Quote is escaped only if odd number of backslashes
      if (backslashCount % 2 === 0) {
        inString = !inString;
      }
      result += char;
    } else if (inString) {
      // Inside a string - escape control characters
      if (char === "\n") {
        result += "\\n";
      } else if (char === "\r") {
        result += "\\r";
      } else if (char === "\t") {
        result += "\\t";
      } else if (char.charCodeAt(0) < 32) {
        // Other control characters
        result += "\\u" + char.charCodeAt(0).toString(16).padStart(4, "0");
      } else {
        result += char;
      }
    } else {
      result += char;
    }
    i++;
  }

  return result;
}

/**
 * Parse JSON from AI response
 */
function parseJsonResponse(text: string): GeneratedContent {
  // Try to extract JSON from the response
  let jsonStr = text.trim();

  // Remove markdown code blocks if present
  if (jsonStr.startsWith("```json")) {
    jsonStr = jsonStr.slice(7);
  } else if (jsonStr.startsWith("```")) {
    jsonStr = jsonStr.slice(3);
  }
  if (jsonStr.endsWith("```")) {
    jsonStr = jsonStr.slice(0, -3);
  }

  jsonStr = jsonStr.trim();

  // Fix unescaped control characters inside JSON string values
  // Process character by character to properly escape newlines, tabs, etc.
  jsonStr = escapeControlCharsInJsonStrings(jsonStr);

  try {
    const parsed = JSON.parse(jsonStr);

    // Validate required fields
    const required = ["title_ko", "title_en", "content_ko", "content_en"];
    for (const field of required) {
      if (!parsed[field]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    return {
      title_ko: parsed.title_ko,
      title_en: parsed.title_en,
      excerpt_ko: parsed.excerpt_ko || "",
      excerpt_en: parsed.excerpt_en || "",
      content_ko: parsed.content_ko,
      content_en: parsed.content_en,
      tags: parsed.tags || [],
      seo_keywords: parsed.seo_keywords || [],
      // SEO-enhanced fields (2025)
      faqs: Array.isArray(parsed.faqs) ? parsed.faqs : undefined,
      key_takeaways_ko: Array.isArray(parsed.key_takeaways_ko)
        ? parsed.key_takeaways_ko
        : undefined,
      key_takeaways_en: Array.isArray(parsed.key_takeaways_en)
        ? parsed.key_takeaways_en
        : undefined,
    };
  } catch (error) {
    console.error("[ContentGenerator] JSON parse error:", error);
    console.error("[ContentGenerator] Raw response:", text.slice(0, 500));
    throw new Error("Failed to parse AI response as JSON");
  }
}

/**
 * Generate article from trend and prepare for database
 */
export async function generateArticleFromTrend(
  trend: Trend,
  style: "news" | "howto" | "listicle" | "analysis" = "news",
): Promise<{
  article: Partial<import("@/entities/trend").Article>;
  cost: number;
} | null> {
  const result = await generateArticleContent({
    trend,
    style,
  });

  if (!result.success || !result.content) {
    console.error(
      "[ContentGenerator] Failed to generate content:",
      result.error,
    );
    return null;
  }

  const { content, costUsd = 0 } = result;

  // Calculate word counts
  const wordCountKo = content.content_ko.split(/\s+/).length;
  const wordCountEn = content.content_en.split(/\s+/).length;
  const readingTime = calculateReadingTime(Math.max(wordCountKo, wordCountEn));

  // Generate slug
  const slug = generateSlug(content.title_en);

  return {
    article: {
      trend_id: trend.id,
      slug,
      title_ko: content.title_ko,
      title_en: content.title_en,
      excerpt_ko: content.excerpt_ko,
      excerpt_en: content.excerpt_en,
      content_ko: content.content_ko,
      content_en: content.content_en,
      category: trend.category || "trending",
      tags: content.tags,
      seo_keywords: content.seo_keywords,
      // SEO-enhanced fields (2025)
      faqs: content.faqs || null,
      key_takeaways_ko: content.key_takeaways_ko || null,
      key_takeaways_en: content.key_takeaways_en || null,
      reading_time_minutes: readingTime,
      word_count_ko: wordCountKo,
      word_count_en: wordCountEn,
      ai_model: MODEL,
      generation_cost_usd: costUsd,
      status: "draft",
    },
    cost: costUsd,
  };
}

/**
 * Batch generate articles from multiple trends
 */
export async function batchGenerateArticles(
  trends: Trend[],
  options: {
    maxArticles?: number;
    style?: "news" | "howto" | "listicle" | "analysis";
    delayMs?: number;
  } = {},
): Promise<{
  articles: Array<Partial<import("@/entities/trend").Article>>;
  totalCost: number;
  errors: string[];
}> {
  const { maxArticles = 5, style = "news", delayMs = 1000 } = options;

  const articles: Array<Partial<import("@/entities/trend").Article>> = [];
  const errors: string[] = [];
  let totalCost = 0;

  // Limit to max articles
  const trendsToProcess = trends.slice(0, maxArticles);

  for (const trend of trendsToProcess) {
    try {
      const result = await generateArticleFromTrend(trend, style);

      if (result) {
        articles.push(result.article);
        totalCost += result.cost;
      } else {
        errors.push(`Failed to generate article for: ${trend.keyword}`);
      }

      // Delay between API calls to avoid rate limiting
      if (delayMs > 0) {
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    } catch (error) {
      errors.push(
        `Error generating article for ${trend.keyword}: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  return {
    articles,
    totalCost,
    errors,
  };
}

/**
 * Estimate cost for generating articles
 */
export function estimateCost(articleCount: number): {
  estimatedTokens: { input: number; output: number };
  estimatedCost: number;
} {
  // Average tokens per article (estimated)
  const avgInputTokens = 1500; // Prompt + context
  const avgOutputTokens = 3000; // Generated content

  const totalInput = avgInputTokens * articleCount;
  const totalOutput = avgOutputTokens * articleCount;

  const cost =
    (totalInput * PRICING.input + totalOutput * PRICING.output) / 1_000_000;

  return {
    estimatedTokens: {
      input: totalInput,
      output: totalOutput,
    },
    estimatedCost: cost,
  };
}

// Export prompts for customization
export {
  ARTICLE_SYSTEM_PROMPT,
  generateArticlePrompt,
} from "./prompts/article";
