// ============================================
// Trend Detector Utilities
// ============================================

import type { ArticleCategory, Region } from "@/entities/trend";
import {
  CATEGORY_KEYWORDS,
  DEFAULT_PRIORITY_WEIGHTS,
  HIGH_VALUE_KEYWORDS,
  type PriorityWeights,
  type RawTrend,
  type ProcessedTrend,
} from "./types";

/**
 * Categorize a keyword based on content
 */
export function categorizeKeyword(keyword: string): ArticleCategory {
  const lowerKeyword = keyword.toLowerCase();

  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some((kw) => lowerKeyword.includes(kw))) {
      return category as ArticleCategory;
    }
  }

  // Default to trending if no match
  return "trending";
}

/**
 * Calculate high-value keyword multiplier for RPM optimization
 * Matches keywords with high CPC to boost priority score
 */
export function calculateHighValueMultiplier(keyword: string): number {
  const lowerKeyword = keyword.toLowerCase();
  let maxMultiplier = 1.0;

  for (const [highValueKeyword, multiplier] of Object.entries(
    HIGH_VALUE_KEYWORDS,
  )) {
    if (lowerKeyword.includes(highValueKeyword)) {
      maxMultiplier = Math.max(maxMultiplier, multiplier);
    }
  }

  return maxMultiplier;
}

/**
 * Calculate priority score for a trend
 * Applies high-value keyword multiplier for RPM optimization
 */
export function calculatePriorityScore(
  trend: RawTrend,
  detectedAt: Date,
  weights: PriorityWeights = DEFAULT_PRIORITY_WEIGHTS,
): number {
  // Volume score (0-40 points)
  const volumeScore = Math.min(trend.volume / 1000, 40) * weights.volume;

  // Freshness score (0-30 points)
  const hoursOld = (Date.now() - detectedAt.getTime()) / (1000 * 60 * 60);
  const freshnessScore = Math.max(30 - hoursOld * 2, 0) * weights.freshness;

  // Competition score (0-30 points) - lower is better
  // Default competition to 0.5 if not provided
  const competition = 0.5;
  const competitionScore = (30 - competition * 30) * weights.competition;

  const baseScore = volumeScore + freshnessScore + competitionScore;

  // Apply high-value keyword multiplier for RPM optimization
  const highValueMultiplier = calculateHighValueMultiplier(trend.keyword);

  return baseScore * highValueMultiplier;
}

/**
 * Process raw trends with priority scores
 */
export function processTrends(trends: RawTrend[]): ProcessedTrend[] {
  const now = new Date();

  return trends.map((trend) => ({
    ...trend,
    priorityScore: calculatePriorityScore(trend, now),
    competitionScore: 0.5, // Default competition
    detectedAt: now,
  }));
}

/**
 * Filter duplicate trends
 */
export function filterDuplicates(trends: RawTrend[]): RawTrend[] {
  const seen = new Set<string>();
  const result: RawTrend[] = [];

  for (const trend of trends) {
    // Normalize keyword for comparison
    const normalized = normalizeKeyword(trend.keyword);

    if (!seen.has(normalized)) {
      seen.add(normalized);
      result.push(trend);
    }
  }

  return result;
}

/**
 * Normalize keyword for comparison
 */
export function normalizeKeyword(keyword: string): string {
  return keyword
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Sort trends by priority score
 */
export function sortByPriority(trends: ProcessedTrend[]): ProcessedTrend[] {
  return [...trends].sort((a, b) => b.priorityScore - a.priorityScore);
}

/**
 * Filter trends by category
 */
export function filterByCategory(
  trends: RawTrend[],
  categories: ArticleCategory[],
): RawTrend[] {
  return trends.filter(
    (trend) => trend.category && categories.includes(trend.category),
  );
}

/**
 * Filter trends by region
 */
export function filterByRegion(
  trends: RawTrend[],
  regions: Region[],
): RawTrend[] {
  return trends.filter((trend) => regions.includes(trend.region));
}

/**
 * Get top N trends by priority
 */
export function getTopTrends(
  trends: ProcessedTrend[],
  limit: number,
): ProcessedTrend[] {
  return sortByPriority(trends).slice(0, limit);
}

/**
 * Generate slug from keyword
 */
export function generateSlug(keyword: string): string {
  return keyword
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 60)
    .replace(/-$/, "");
}

/**
 * Check if a trend is fresh (within hours)
 */
export function isFresh(detectedAt: Date, maxHours: number = 24): boolean {
  const age = Date.now() - detectedAt.getTime();
  return age < maxHours * 60 * 60 * 1000;
}

/**
 * Merge trends from multiple sources
 */
export function mergeTrends(...trendArrays: RawTrend[][]): RawTrend[] {
  const merged = trendArrays.flat();
  return filterDuplicates(merged);
}

/**
 * Calculate estimated reading time from word count
 */
export function calculateReadingTime(wordCount: number): number {
  const wordsPerMinute = 200;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

/**
 * Extract main entity from keyword (for AI processing)
 */
export function extractMainEntity(keyword: string): string {
  // Remove common prefixes/suffixes
  return keyword
    .replace(/^(the|a|an)\s+/i, "")
    .replace(/\s+(news|update|latest|breaking)$/i, "")
    .trim();
}
