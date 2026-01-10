// ============================================
// Reddit Trends Collector
// ============================================

import type { RawTrend, CollectorResult, RedditOptions } from "../types";
import { categorizeKeyword } from "../utils";

// Default subreddits for trend detection
const DEFAULT_SUBREDDITS = [
  "technology",
  "programming",
  "webdev",
  "news",
  "worldnews",
  "business",
  "finance",
  "entertainment",
  "movies",
  "gaming",
  "science",
  "futurology",
];

// Reddit API base URL
const REDDIT_API_BASE = "https://www.reddit.com";

/**
 * Collect trending topics from Reddit
 */
export async function collectRedditTrends(
  options: RedditOptions = {},
): Promise<CollectorResult> {
  const {
    subreddits = DEFAULT_SUBREDDITS,
    sortBy = "hot",
    timeFilter = "day",
    limit = 10,
    minVolume = 100, // Minimum upvotes
  } = options;

  try {
    const allTrends: RawTrend[] = [];

    // Collect from each subreddit
    for (const subreddit of subreddits) {
      try {
        const posts = await fetchSubredditPosts(subreddit, sortBy, timeFilter, limit);
        const trends = posts
          .filter((post) => post.score >= minVolume)
          .map((post) => postToTrend(post, subreddit));
        allTrends.push(...trends);
      } catch (error) {
        console.warn(`Failed to fetch from r/${subreddit}:`, error);
      }
    }

    // Deduplicate by similar keywords
    const deduplicatedTrends = deduplicateTrends(allTrends);

    return {
      success: true,
      trends: deduplicatedTrends,
      source: "reddit",
      collectedAt: new Date(),
    };
  } catch (error) {
    console.error("Reddit collection error:", error);
    return {
      success: false,
      trends: [],
      error: error instanceof Error ? error.message : "Unknown error",
      source: "reddit",
      collectedAt: new Date(),
    };
  }
}

/**
 * Fetch posts from a subreddit
 */
async function fetchSubredditPosts(
  subreddit: string,
  sortBy: "hot" | "top" | "rising",
  timeFilter: "hour" | "day" | "week",
  limit: number,
): Promise<RedditPost[]> {
  const url = `${REDDIT_API_BASE}/r/${subreddit}/${sortBy}.json?limit=${limit}&t=${timeFilter}`;

  const response = await fetch(url, {
    headers: {
      "User-Agent": "TrendBlog/1.0",
    },
  });

  if (!response.ok) {
    throw new Error(`Reddit API error: ${response.status}`);
  }

  const data = await response.json();

  return data.data.children.map((child: RedditApiChild) => ({
    title: child.data.title,
    score: child.data.score,
    numComments: child.data.num_comments,
    subreddit: child.data.subreddit,
    permalink: child.data.permalink,
    created: child.data.created_utc,
    url: child.data.url,
    selftext: child.data.selftext,
    flair: child.data.link_flair_text,
  }));
}

/**
 * Convert Reddit post to RawTrend
 */
function postToTrend(post: RedditPost, subreddit: string): RawTrend {
  // Extract main topic from title
  const keyword = extractKeyword(post.title);

  // Map subreddit to category
  const category = mapSubredditToCategory(subreddit);

  return {
    keyword,
    volume: post.score,
    source: "reddit",
    region: "global",
    category,
    relatedKeywords: extractRelatedKeywords(post.title),
    metadata: {
      originalTitle: post.title,
      subreddit: post.subreddit,
      numComments: post.numComments,
      permalink: `https://reddit.com${post.permalink}`,
      flair: post.flair,
    },
  };
}

/**
 * Extract main keyword from post title
 */
function extractKeyword(title: string): string {
  // Remove common prefixes/suffixes
  let cleaned = title
    .replace(/^\[.*?\]\s*/g, "") // Remove [tags]
    .replace(/\s*\|.*$/g, "") // Remove | suffixes
    .replace(/\s*-\s*[^-]*$/g, "") // Remove - suffixes
    .trim();

  // If title is too long, take first meaningful part
  if (cleaned.length > 60) {
    const firstSentence = cleaned.split(/[.!?]/)[0];
    cleaned = firstSentence.length > 20 ? firstSentence : cleaned.slice(0, 60);
  }

  return cleaned;
}

/**
 * Extract related keywords from title
 */
function extractRelatedKeywords(title: string): string[] {
  // Simple keyword extraction
  const words = title
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(/\s+/)
    .filter(
      (word) =>
        word.length > 3 &&
        !STOP_WORDS.has(word),
    );

  return [...new Set(words)].slice(0, 5);
}

/**
 * Map subreddit to article category
 */
function mapSubredditToCategory(subreddit: string): ReturnType<typeof categorizeKeyword> {
  const categoryMap: Record<string, ReturnType<typeof categorizeKeyword>> = {
    technology: "tech",
    programming: "tech",
    webdev: "tech",
    futurology: "tech",
    science: "tech",
    news: "news",
    worldnews: "news",
    business: "business",
    finance: "business",
    investing: "business",
    entertainment: "entertainment",
    movies: "entertainment",
    gaming: "entertainment",
    music: "entertainment",
  };

  return categoryMap[subreddit.toLowerCase()] || categorizeKeyword(subreddit);
}

/**
 * Deduplicate trends by similar keywords
 */
function deduplicateTrends(trends: RawTrend[]): RawTrend[] {
  const seen = new Map<string, RawTrend>();

  for (const trend of trends) {
    const normalizedKey = trend.keyword.toLowerCase().replace(/\s+/g, " ");
    const existing = seen.get(normalizedKey);

    if (!existing || trend.volume > existing.volume) {
      seen.set(normalizedKey, trend);
    }
  }

  return Array.from(seen.values());
}

// Stop words to filter out
const STOP_WORDS = new Set([
  "the",
  "a",
  "an",
  "and",
  "or",
  "but",
  "in",
  "on",
  "at",
  "to",
  "for",
  "of",
  "with",
  "by",
  "from",
  "is",
  "are",
  "was",
  "were",
  "be",
  "been",
  "being",
  "have",
  "has",
  "had",
  "do",
  "does",
  "did",
  "will",
  "would",
  "could",
  "should",
  "may",
  "might",
  "must",
  "this",
  "that",
  "these",
  "those",
  "what",
  "which",
  "who",
  "whom",
  "how",
  "when",
  "where",
  "why",
]);

/**
 * Reddit post structure
 */
interface RedditPost {
  title: string;
  score: number;
  numComments: number;
  subreddit: string;
  permalink: string;
  created: number;
  url: string;
  selftext: string;
  flair: string | null;
}

/**
 * Reddit API response structure
 */
interface RedditApiChild {
  data: {
    title: string;
    score: number;
    num_comments: number;
    subreddit: string;
    permalink: string;
    created_utc: number;
    url: string;
    selftext: string;
    link_flair_text: string | null;
  };
}
