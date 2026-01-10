// ============================================
// Trend Detector Types
// ============================================

import type { TrendSource, ArticleCategory, Region } from "@/entities/trend";

/**
 * Raw trend data from sources
 */
export interface RawTrend {
  keyword: string;
  volume: number;
  source: TrendSource;
  region: Region;
  category?: ArticleCategory;
  relatedKeywords?: string[];
  metadata?: Record<string, unknown>;
}

/**
 * Processed trend with priority score
 */
export interface ProcessedTrend extends RawTrend {
  priorityScore: number;
  competitionScore: number;
  detectedAt: Date;
}

/**
 * Trend collector result
 */
export interface CollectorResult {
  success: boolean;
  trends: RawTrend[];
  error?: string;
  source: TrendSource;
  collectedAt: Date;
}

/**
 * Collector options
 */
export interface CollectorOptions {
  region?: Region;
  category?: ArticleCategory;
  limit?: number;
  minVolume?: number;
}

/**
 * Google Trends specific options
 */
export interface GoogleTrendsOptions extends CollectorOptions {
  timeRange?: "now 1-H" | "now 4-H" | "now 1-d" | "now 7-d";
}

/**
 * Reddit specific options
 */
export interface RedditOptions extends CollectorOptions {
  subreddits?: string[];
  sortBy?: "hot" | "top" | "rising";
  timeFilter?: "hour" | "day" | "week";
}

/**
 * News RSS specific options
 */
export interface NewsRssOptions extends CollectorOptions {
  feeds?: string[];
  maxAge?: number; // Hours
}

/**
 * Priority calculation weights
 */
export interface PriorityWeights {
  volume: number; // Weight for search volume (0-1)
  freshness: number; // Weight for recency (0-1)
  competition: number; // Weight for competition (0-1)
}

/**
 * Default priority weights
 */
export const DEFAULT_PRIORITY_WEIGHTS: PriorityWeights = {
  volume: 0.4,
  freshness: 0.3,
  competition: 0.3,
};

/**
 * Category keywords for auto-categorization
 */
export const CATEGORY_KEYWORDS: Record<ArticleCategory, string[]> = {
  tech: [
    "ai",
    "artificial intelligence",
    "software",
    "app",
    "tech",
    "programming",
    "coding",
    "developer",
    "cloud",
    "data",
    "machine learning",
    "startup",
    "cybersecurity",
    "blockchain",
    "crypto",
    "smartphone",
    "gadget",
  ],
  business: [
    "stock",
    "market",
    "economy",
    "finance",
    "investment",
    "business",
    "company",
    "startup",
    "entrepreneur",
    "revenue",
    "profit",
    "merger",
    "acquisition",
  ],
  lifestyle: [
    "health",
    "fitness",
    "travel",
    "food",
    "recipe",
    "fashion",
    "beauty",
    "home",
    "diy",
    "wellness",
    "meditation",
    "yoga",
  ],
  entertainment: [
    "movie",
    "music",
    "celebrity",
    "game",
    "gaming",
    "tv",
    "series",
    "streaming",
    "concert",
    "album",
    "actor",
    "singer",
  ],
  trending: ["viral", "trending", "popular", "breaking", "hot"],
  news: [
    "news",
    "politics",
    "government",
    "election",
    "policy",
    "world",
    "international",
    "crisis",
    "disaster",
  ],
};
