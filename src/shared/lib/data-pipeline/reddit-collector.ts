/**
 * Reddit RSS 데이터 수집기
 * 개발자 관련 서브레딧에서 트렌드 데이터를 수집
 */

import { fetchWithRetry, sleep } from "./error-handling";
import type { RedditPost, SubredditConfig, CollectionResult } from "./types";
import { createLogger } from "@/shared/lib/logger";

const logger = createLogger("reddit-collector");

// ============================================
// 설정
// ============================================

const SUBREDDIT_CONFIGS: Record<string, SubredditConfig> = {
  programming: {
    url: "https://www.reddit.com/r/programming/top.rss?t=week&limit=50",
    relevantKeywords: [
      "json",
      "api",
      "convert",
      "format",
      "encode",
      "decode",
      "tool",
      "utility",
      "developer",
      "productivity",
      "cli",
      "library",
      "framework",
    ],
  },
  webdev: {
    url: "https://www.reddit.com/r/webdev/top.rss?t=week&limit=50",
    relevantKeywords: [
      "tool",
      "utility",
      "developer",
      "productivity",
      "javascript",
      "typescript",
      "react",
      "nextjs",
      "frontend",
      "backend",
    ],
  },
  javascript: {
    url: "https://www.reddit.com/r/javascript/top.rss?t=week&limit=50",
    relevantKeywords: [
      "json",
      "typescript",
      "npm",
      "package",
      "library",
      "tool",
      "utility",
      "node",
      "react",
      "vue",
    ],
  },
  typescript: {
    url: "https://www.reddit.com/r/typescript/top.rss?t=week&limit=50",
    relevantKeywords: [
      "type",
      "utility",
      "tool",
      "library",
      "framework",
      "compiler",
      "config",
    ],
  },
  node: {
    url: "https://www.reddit.com/r/node/top.rss?t=week&limit=50",
    relevantKeywords: [
      "npm",
      "package",
      "cli",
      "tool",
      "utility",
      "api",
      "server",
      "express",
      "fastify",
    ],
  },
  learnprogramming: {
    url: "https://www.reddit.com/r/learnprogramming/top.rss?t=week&limit=50",
    relevantKeywords: [
      "beginner",
      "learn",
      "tutorial",
      "help",
      "question",
      "resource",
      "tool",
    ],
  },
};

// Reddit RSS User-Agent (봇 차단 방지)
const USER_AGENT = "WebToolkit-TrendBot/1.0 (https://web-toolkit.app)";

// ============================================
// RSS 파싱 유틸리티
// ============================================

interface RssItem {
  title: string;
  link: string;
  pubDate: string;
  author: string;
  content: string;
  id: string;
}

/**
 * RSS XML을 파싱하여 아이템 배열 반환
 */
function parseRssXml(xml: string): RssItem[] {
  const items: RssItem[] = [];

  // 간단한 XML 파싱 (정규식 기반)
  const itemRegex = /<entry>([\s\S]*?)<\/entry>/g;
  let match;

  while ((match = itemRegex.exec(xml)) !== null) {
    const itemXml = match[1];

    const title = extractTag(itemXml, "title") || "";
    const link = extractLink(itemXml) || "";
    const pubDate = extractTag(itemXml, "updated") || "";
    const author = extractAuthor(itemXml) || "unknown";
    const content = extractTag(itemXml, "content") || "";
    const id = extractTag(itemXml, "id") || link;

    items.push({
      title: decodeHtmlEntities(title),
      link,
      pubDate,
      author,
      // 먼저 HTML entity 디코딩 → 그 다음 HTML 태그 제거
      content: stripHtml(decodeHtmlEntities(content)),
      id,
    });
  }

  return items;
}

function extractTag(xml: string, tagName: string): string | null {
  const regex = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)</${tagName}>`, "i");
  const match = xml.match(regex);
  return match ? match[1].trim() : null;
}

function extractLink(xml: string): string | null {
  // <link href="..." /> 형태
  const hrefMatch = xml.match(/<link[^>]*href="([^"]+)"[^>]*\/>/);
  if (hrefMatch) return hrefMatch[1];

  // <link>...</link> 형태
  return extractTag(xml, "link");
}

function extractAuthor(xml: string): string | null {
  const authorBlock = xml.match(/<author>([\s\S]*?)<\/author>/);
  if (authorBlock) {
    const name = extractTag(authorBlock[1], "name");
    if (name) return name.replace(/^\/u\//, "");
  }
  return null;
}

function stripHtml(html: string): string {
  return (
    html
      // CDATA 섹션 제거
      .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/gi, "$1")
      // HTML 주석 제거 (SC_OFF, SC_ON 등)
      .replace(/<!--[\s\S]*?-->/g, "")
      // script, style 태그와 내용 제거
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      // 모든 HTML 태그 제거
      .replace(/<[^>]*>/g, " ")
      // 연속 공백 정리
      .replace(/\s+/g, " ")
      .trim()
  );
}

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, "/")
    .replace(/&nbsp;/g, " ")
    .replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–")
    .replace(/&hellip;/g, "...")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code, 10)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, code) =>
      String.fromCharCode(parseInt(code, 16)),
    );
}

// ============================================
// 수집 함수
// ============================================

/**
 * 단일 서브레딧에서 RSS 데이터 수집
 */
async function collectFromSubreddit(
  subreddit: string,
  config: SubredditConfig,
): Promise<RedditPost[]> {
  try {
    const response = await fetchWithRetry(config.url, {
      headers: {
        "User-Agent": USER_AGENT,
        Accept: "application/rss+xml, application/xml, text/xml",
      },
    });

    if (!response.ok) {
      console.error(`[Reddit] ${subreddit} 수집 실패: HTTP ${response.status}`);
      return [];
    }

    const xml = await response.text();
    const items = parseRssXml(xml);

    // 관련 키워드 필터링
    const relevantPosts = items
      .filter((item) => {
        const searchText = `${item.title} ${item.content}`.toLowerCase();
        return config.relevantKeywords.some((keyword) =>
          searchText.includes(keyword.toLowerCase()),
        );
      })
      .slice(0, 15) // 서브레딧당 최대 15개
      .map((item) => ({
        id: item.id,
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
        author: item.author,
        content: item.content.slice(0, 500), // 내용 500자 제한
        subreddit,
      }));

    logger.debug("서브레딧 수집", {
      subreddit,
      total: items.length,
      relevant: relevantPosts.length,
    });
    return relevantPosts;
  } catch (error) {
    logger.warn("서브레딧 수집 에러", {
      subreddit,
      error: error instanceof Error ? error.message : "Unknown error",
    });
    return [];
  }
}

/**
 * 모든 설정된 서브레딧에서 데이터 수집
 */
export async function collectRedditTrends(): Promise<
  CollectionResult<RedditPost>
> {
  const allPosts: RedditPost[] = [];
  const errors: string[] = [];

  logger.info("트렌드 수집 시작");

  for (const [subreddit, config] of Object.entries(SUBREDDIT_CONFIGS)) {
    try {
      const posts = await collectFromSubreddit(subreddit, config);
      allPosts.push(...posts);

      // Rate limiting: 서브레딧 간 2초 대기
      await sleep(2000);
    } catch (error) {
      const errorMsg = `${subreddit}: ${error instanceof Error ? error.message : "Unknown error"}`;
      errors.push(errorMsg);
      logger.error("서브레딧 수집 실패", { subreddit, error: errorMsg });
    }
  }

  // 중복 제거 (같은 링크)
  const uniquePosts = allPosts.filter(
    (post, index, self) =>
      index === self.findIndex((p) => p.link === post.link),
  );

  // 날짜순 정렬 (최신순)
  uniquePosts.sort(
    (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime(),
  );

  logger.info("수집 완료", { count: uniquePosts.length });

  return {
    success: errors.length === 0,
    data: uniquePosts,
    errors,
    collectedAt: new Date().toISOString(),
    source: "reddit",
  };
}

/**
 * 특정 서브레딧만 수집
 */
export async function collectFromSpecificSubreddits(
  subreddits: string[],
): Promise<CollectionResult<RedditPost>> {
  const allPosts: RedditPost[] = [];
  const errors: string[] = [];

  for (const subreddit of subreddits) {
    const config = SUBREDDIT_CONFIGS[subreddit];
    if (!config) {
      errors.push(`${subreddit}: 설정되지 않은 서브레딧`);
      continue;
    }

    try {
      const posts = await collectFromSubreddit(subreddit, config);
      allPosts.push(...posts);
      await sleep(2000);
    } catch (error) {
      errors.push(`${subreddit}: ${(error as Error).message}`);
    }
  }

  return {
    success: errors.length === 0,
    data: allPosts,
    errors,
    collectedAt: new Date().toISOString(),
    source: "reddit",
  };
}

/**
 * 키워드로 Reddit 검색 (특정 서브레딧 내)
 */
export async function searchReddit(
  subreddit: string,
  keyword: string,
  limit = 25,
): Promise<CollectionResult<RedditPost>> {
  const url = `https://www.reddit.com/r/${subreddit}/search.rss?q=${encodeURIComponent(keyword)}&sort=relevance&t=month&limit=${limit}`;

  try {
    const response = await fetchWithRetry(url, {
      headers: {
        "User-Agent": USER_AGENT,
        Accept: "application/rss+xml, application/xml, text/xml",
      },
    });

    if (!response.ok) {
      return {
        success: false,
        data: [],
        errors: [`HTTP ${response.status}`],
        collectedAt: new Date().toISOString(),
        source: "reddit-search",
      };
    }

    const xml = await response.text();
    const items = parseRssXml(xml);

    const posts: RedditPost[] = items.map((item) => ({
      id: item.id,
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
      author: item.author,
      content: item.content.slice(0, 500),
      subreddit,
    }));

    return {
      success: true,
      data: posts,
      errors: [],
      collectedAt: new Date().toISOString(),
      source: "reddit-search",
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      errors: [(error as Error).message],
      collectedAt: new Date().toISOString(),
      source: "reddit-search",
    };
  }
}
