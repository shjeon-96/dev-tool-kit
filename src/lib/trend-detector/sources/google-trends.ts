// ============================================
// Google Trends Collector
// ============================================

import type { RawTrend, CollectorResult, GoogleTrendsOptions } from "../types";
import { categorizeKeyword } from "../utils";

// Use require for google-trends-api as it doesn't have ES modules
// eslint-disable-next-line @typescript-eslint/no-require-imports
const googleTrends = require("google-trends-api");

/**
 * Collect trending topics from Google Trends
 * Uses the google-trends-api package for reliable data fetching
 */
export async function collectGoogleTrends(
  options: GoogleTrendsOptions = {},
): Promise<CollectorResult> {
  const { region = "global", limit = 20 } = options;

  try {
    // Map region to Google Trends geo code
    const geo = mapRegionToGeo(region);

    // Fetch daily trends
    const rawData = await googleTrends.dailyTrends({
      geo: geo || "US", // Default to US if no geo specified
      hl: region === "kr" ? "ko" : "en",
    });

    const parsedData = JSON.parse(rawData);
    const trendingSearchesDays = parsedData.default?.trendingSearchesDays || [];

    // Extract trends from all days
    const allTrends: RawTrend[] = [];

    for (const day of trendingSearchesDays) {
      const trendingSearches = day.trendingSearches || [];

      for (const search of trendingSearches) {
        const title = search.title?.query || "";
        const formattedTraffic = search.formattedTraffic || "0";
        const volume = parseTrafficVolume(formattedTraffic);

        // Extract related queries from articles
        const relatedKeywords: string[] = [];
        if (search.relatedQueries) {
          search.relatedQueries.forEach((rq: { query: string }) => {
            if (rq.query) relatedKeywords.push(rq.query);
          });
        }

        // Extract articles info
        const articles: Array<{ title: string; url: string }> = [];
        if (search.articles) {
          search.articles.forEach((article: { title: string; url: string }) => {
            if (article.title && article.url) {
              articles.push({ title: article.title, url: article.url });
            }
          });
        }

        allTrends.push({
          keyword: title,
          volume,
          source: "google_trends" as const,
          region,
          category: categorizeKeyword(title),
          relatedKeywords,
          metadata: {
            formattedTraffic,
            image: search.image?.imageUrl,
            articles,
          },
        });
      }
    }

    // Limit results
    const limitedTrends = allTrends.slice(0, limit);

    return {
      success: true,
      trends: limitedTrends,
      source: "google_trends",
      collectedAt: new Date(),
    };
  } catch (error) {
    console.error("Google Trends collection error:", error);
    return {
      success: false,
      trends: [],
      error: error instanceof Error ? error.message : "Unknown error",
      source: "google_trends",
      collectedAt: new Date(),
    };
  }
}

/**
 * Parse traffic volume from formatted string (e.g., "50K+", "1M+")
 */
function parseTrafficVolume(formatted: string): number {
  if (!formatted) return 0;

  const cleanStr = formatted.replace(/[+,]/g, "").trim();
  const multipliers: Record<string, number> = {
    K: 1000,
    M: 1000000,
    B: 1000000000,
  };

  const match = cleanStr.match(/^(\d+(?:\.\d+)?)\s*([KMB])?$/i);
  if (!match) return 0;

  const num = parseFloat(match[1]);
  const suffix = match[2]?.toUpperCase();

  return suffix ? num * (multipliers[suffix] || 1) : num;
}

/**
 * Map region code to Google Trends geo code
 */
function mapRegionToGeo(region: string): string {
  const geoMap: Record<string, string> = {
    kr: "KR",
    us: "US",
    jp: "JP",
    global: "",
  };
  return geoMap[region] || "";
}

/**
 * Get real-time search trends
 * Returns trending stories from the last 24 hours
 */
export async function getRealTimeSearchTrends(
  geo: string = "US",
): Promise<CollectorResult> {
  try {
    const rawData = await googleTrends.realTimeTrends({
      geo: geo || "US",
      hl: geo === "KR" ? "ko" : "en",
      category: "all", // all categories
    });

    const parsedData = JSON.parse(rawData);
    const storySummaries = parsedData.storySummaries?.trendingStories || [];

    const rawTrends: RawTrend[] = storySummaries.map(
      (story: {
        title: string;
        entityNames?: string[];
        articles?: Array<{ articleTitle: string; url: string }>;
        image?: { imageUrl: string };
      }) => ({
        keyword: story.title || "",
        volume: 10000, // Real-time trends don't have volume, use default
        source: "google_trends" as const,
        region: geo.toLowerCase() || "global",
        category: categorizeKeyword(story.title || ""),
        relatedKeywords: story.entityNames || [],
        metadata: {
          formattedTraffic: "Trending Now",
          image: story.image?.imageUrl,
          articles: story.articles?.map(
            (a: { articleTitle: string; url: string }) => ({
              title: a.articleTitle,
              url: a.url,
            }),
          ),
        },
      }),
    );

    return {
      success: true,
      trends: rawTrends,
      source: "google_trends",
      collectedAt: new Date(),
    };
  } catch (error) {
    console.error("Real-time trends collection error:", error);
    // Fallback to daily trends if real-time fails
    return collectGoogleTrends({ region: geo.toLowerCase() || "global" });
  }
}
