// ============================================
// Trend Detector - Unified Collector
// ============================================

import type { TrendSource } from "@/entities/trend";
import type {
  RawTrend,
  ProcessedTrend,
  CollectorResult,
  CollectorOptions,
} from "./types";
import { collectGoogleTrends } from "./sources/google-trends";
import { collectRedditTrends } from "./sources/reddit";
import { collectNewsRss } from "./sources/news-rss";
import {
  processTrends,
  filterDuplicates,
  sortByPriority,
  getTopTrends,
} from "./utils";

// Re-export types
export type {
  RawTrend,
  ProcessedTrend,
  CollectorResult,
  CollectorOptions,
} from "./types";

// Re-export utilities
export {
  categorizeKeyword,
  calculatePriorityScore,
  processTrends,
  filterDuplicates,
  sortByPriority,
  getTopTrends,
  generateSlug,
  calculateReadingTime,
} from "./utils";

/**
 * Unified trend collector configuration
 */
export interface TrendCollectorConfig {
  sources?: TrendSource[];
  options?: CollectorOptions;
  maxTrendsPerSource?: number;
}

/**
 * Default configuration
 */
const DEFAULT_CONFIG: Required<TrendCollectorConfig> = {
  sources: ["google_trends", "reddit", "news_rss"],
  options: {
    region: "global",
    limit: 20,
    minVolume: 100,
  },
  maxTrendsPerSource: 20,
};

/**
 * Collect trends from all configured sources
 */
export async function collectAllTrends(
  config: TrendCollectorConfig = {},
): Promise<{
  trends: ProcessedTrend[];
  results: CollectorResult[];
  errors: string[];
}> {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };
  const { sources, options, maxTrendsPerSource } = finalConfig;

  const results: CollectorResult[] = [];
  const errors: string[] = [];
  const allTrends: RawTrend[] = [];

  // Collect from each source in parallel
  const collectors: Promise<CollectorResult>[] = [];

  for (const source of sources) {
    switch (source) {
      case "google_trends":
        collectors.push(
          collectGoogleTrends({ ...options, limit: maxTrendsPerSource }),
        );
        break;
      case "reddit":
        collectors.push(
          collectRedditTrends({ ...options, limit: maxTrendsPerSource }),
        );
        break;
      case "news_rss":
        collectors.push(
          collectNewsRss({ ...options, limit: maxTrendsPerSource }),
        );
        break;
      default:
        console.warn(`Unknown source: ${source}`);
    }
  }

  // Wait for all collectors
  const collectorResults = await Promise.allSettled(collectors);

  for (const result of collectorResults) {
    if (result.status === "fulfilled") {
      results.push(result.value);
      if (result.value.success) {
        allTrends.push(...result.value.trends);
      } else if (result.value.error) {
        errors.push(`${result.value.source}: ${result.value.error}`);
      }
    } else {
      errors.push(`Collector failed: ${result.reason}`);
    }
  }

  // Process and deduplicate trends
  const uniqueTrends = filterDuplicates(allTrends);
  const processedTrends = processTrends(uniqueTrends);
  const sortedTrends = sortByPriority(processedTrends);

  return {
    trends: sortedTrends,
    results,
    errors,
  };
}

/**
 * Collect trends from a single source
 */
export async function collectFromSource(
  source: TrendSource,
  options: CollectorOptions = {},
): Promise<CollectorResult> {
  switch (source) {
    case "google_trends":
      return collectGoogleTrends(options);
    case "reddit":
      return collectRedditTrends(options);
    case "news_rss":
      return collectNewsRss(options);
    default:
      return {
        success: false,
        trends: [],
        error: `Unknown source: ${source}`,
        source,
        collectedAt: new Date(),
      };
  }
}

/**
 * Get top trending topics across all sources
 */
export async function getTopTrendingTopics(
  limit: number = 10,
  config: TrendCollectorConfig = {},
): Promise<ProcessedTrend[]> {
  const { trends } = await collectAllTrends(config);
  return getTopTrends(trends, limit);
}

/**
 * Merge and process trends from multiple collector results
 */
export function mergeCollectorResults(
  results: CollectorResult[],
): ProcessedTrend[] {
  const allTrends = results.filter((r) => r.success).flatMap((r) => r.trends);

  const uniqueTrends = filterDuplicates(allTrends);
  return processTrends(uniqueTrends);
}

// Export source collectors for direct use
export { collectGoogleTrends } from "./sources/google-trends";
export { collectRedditTrends } from "./sources/reddit";
export { collectNewsRss } from "./sources/news-rss";
