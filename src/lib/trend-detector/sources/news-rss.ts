// ============================================
// News RSS Feed Collector
// ============================================

import type { RawTrend, CollectorResult, NewsRssOptions } from "../types";
import { categorizeKeyword } from "../utils";

// Default news RSS feeds
const DEFAULT_NEWS_FEEDS = [
  // Tech News
  { url: "https://techcrunch.com/feed/", category: "tech" as const },
  { url: "https://www.theverge.com/rss/index.xml", category: "tech" as const },
  { url: "https://feeds.arstechnica.com/arstechnica/technology-lab", category: "tech" as const },

  // General News
  { url: "https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml", category: "tech" as const },
  { url: "https://feeds.bbci.co.uk/news/technology/rss.xml", category: "tech" as const },

  // Business
  { url: "https://feeds.bloomberg.com/markets/news.rss", category: "business" as const },

  // Korean News
  { url: "https://www.yonhapnewstv.co.kr/category/news/economy/feed/", category: "business" as const },
];

/**
 * Collect trending topics from News RSS feeds
 */
export async function collectNewsRss(
  options: NewsRssOptions = {},
): Promise<CollectorResult> {
  const {
    feeds = DEFAULT_NEWS_FEEDS.map((f) => f.url),
    maxAge = 24, // Hours
    limit = 50,
  } = options;

  try {
    const allTrends: RawTrend[] = [];
    const cutoffTime = Date.now() - maxAge * 60 * 60 * 1000;

    // Collect from each feed
    for (const feedUrl of feeds) {
      try {
        const feedConfig = DEFAULT_NEWS_FEEDS.find((f) => f.url === feedUrl);
        const items = await fetchRssFeed(feedUrl);

        for (const item of items) {
          // Skip old items
          if (item.pubDate && new Date(item.pubDate).getTime() < cutoffTime) {
            continue;
          }

          const trend = rssItemToTrend(item, feedConfig?.category);
          if (trend) {
            allTrends.push(trend);
          }
        }
      } catch (error) {
        console.warn(`Failed to fetch RSS feed ${feedUrl}:`, error);
      }
    }

    // Deduplicate and limit
    const deduplicatedTrends = deduplicateTrends(allTrends).slice(0, limit);

    return {
      success: true,
      trends: deduplicatedTrends,
      source: "news_rss",
      collectedAt: new Date(),
    };
  } catch (error) {
    console.error("News RSS collection error:", error);
    return {
      success: false,
      trends: [],
      error: error instanceof Error ? error.message : "Unknown error",
      source: "news_rss",
      collectedAt: new Date(),
    };
  }
}

/**
 * Fetch and parse RSS feed
 */
async function fetchRssFeed(url: string): Promise<RssItem[]> {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "TrendBlog/1.0",
      Accept: "application/rss+xml, application/xml, text/xml",
    },
  });

  if (!response.ok) {
    throw new Error(`RSS fetch error: ${response.status}`);
  }

  const text = await response.text();
  return parseRssFeed(text);
}

/**
 * Parse RSS/Atom feed XML
 */
function parseRssFeed(xml: string): RssItem[] {
  const items: RssItem[] = [];

  // Try RSS 2.0 format
  const rssItemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;

  while ((match = rssItemRegex.exec(xml)) !== null) {
    const itemXml = match[1];
    const item = parseRssItem(itemXml);
    if (item) {
      items.push(item);
    }
  }

  // Try Atom format if no RSS items found
  if (items.length === 0) {
    const atomEntryRegex = /<entry>([\s\S]*?)<\/entry>/g;
    while ((match = atomEntryRegex.exec(xml)) !== null) {
      const entryXml = match[1];
      const item = parseAtomEntry(entryXml);
      if (item) {
        items.push(item);
      }
    }
  }

  return items;
}

/**
 * Parse RSS 2.0 item
 */
function parseRssItem(xml: string): RssItem | null {
  const title = extractTagContent(xml, "title");
  if (!title) return null;

  return {
    title: decodeHtmlEntities(title),
    link: extractTagContent(xml, "link") || undefined,
    description: extractTagContent(xml, "description")
      ? decodeHtmlEntities(extractTagContent(xml, "description")!)
      : undefined,
    pubDate: extractTagContent(xml, "pubDate") || undefined,
    category: extractTagContent(xml, "category") || undefined,
  };
}

/**
 * Parse Atom entry
 */
function parseAtomEntry(xml: string): RssItem | null {
  const title = extractTagContent(xml, "title");
  if (!title) return null;

  const linkMatch = xml.match(/<link[^>]*href=["']([^"']*)["'][^>]*>/);
  const link = linkMatch?.[1];

  return {
    title: decodeHtmlEntities(title),
    link,
    description: extractTagContent(xml, "summary") || extractTagContent(xml, "content") || undefined,
    pubDate: extractTagContent(xml, "published") || extractTagContent(xml, "updated") || undefined,
    category: extractTagContent(xml, "category") || undefined,
  };
}

/**
 * Extract content from XML tag
 */
function extractTagContent(xml: string, tag: string): string | null {
  // Handle CDATA
  const cdataRegex = new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`, "i");
  const cdataMatch = xml.match(cdataRegex);
  if (cdataMatch) return cdataMatch[1].trim();

  // Handle regular content
  const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i");
  const match = xml.match(regex);
  return match ? match[1].trim() : null;
}

/**
 * Decode HTML entities
 */
function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/<[^>]*>/g, "");
}

/**
 * Convert RSS item to RawTrend
 */
function rssItemToTrend(
  item: RssItem,
  defaultCategory?: ReturnType<typeof categorizeKeyword>,
): RawTrend | null {
  if (!item.title || item.title.length < 10) {
    return null;
  }

  const volume = calculateNewsVolume(item);

  return {
    keyword: item.title,
    volume,
    source: "news_rss",
    region: "global",
    category: defaultCategory || categorizeKeyword(item.title),
    relatedKeywords: extractKeywordsFromText(item.description || ""),
    metadata: {
      link: item.link,
      description: item.description?.slice(0, 200),
      pubDate: item.pubDate,
      originalCategory: item.category,
    },
  };
}

/**
 * Calculate pseudo-volume for news items
 */
function calculateNewsVolume(item: RssItem): number {
  let volume = 1000;

  if (item.pubDate) {
    const age = Date.now() - new Date(item.pubDate).getTime();
    const hoursOld = age / (1000 * 60 * 60);
    if (hoursOld < 1) volume += 500;
    else if (hoursOld < 6) volume += 300;
    else if (hoursOld < 12) volume += 100;
  }

  const urgentKeywords = ["breaking", "just in", "urgent", "developing", "exclusive"];
  if (urgentKeywords.some((kw) => item.title.toLowerCase().includes(kw))) {
    volume += 300;
  }

  return volume;
}

/**
 * Extract keywords from text
 */
function extractKeywordsFromText(text: string): string[] {
  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(/\s+/)
    .filter((word) => word.length > 4);

  return [...new Set(words)].slice(0, 5);
}

/**
 * Deduplicate trends by similar titles
 */
function deduplicateTrends(trends: RawTrend[]): RawTrend[] {
  const seen = new Map<string, RawTrend>();

  for (const trend of trends) {
    const key = trend.keyword
      .toLowerCase()
      .split(/\s+/)
      .slice(0, 5)
      .join(" ");

    const existing = seen.get(key);
    if (!existing || trend.volume > existing.volume) {
      seen.set(key, trend);
    }
  }

  return Array.from(seen.values());
}

interface RssItem {
  title: string;
  link?: string;
  description?: string;
  pubDate?: string;
  category?: string;
}
