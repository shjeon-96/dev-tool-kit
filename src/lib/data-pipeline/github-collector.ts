/**
 * GitHub Trending 데이터 수집기
 * GitHub 트렌딩 리포지토리 정보를 수집
 */

import { fetchWithRetry, safeJsonParse, sleep } from "./error-handling";
import type { TrendingRepo, TrendingPeriod, CollectionResult } from "./types";

// ============================================
// 설정
// ============================================

// GitHub Trending 비공식 API (gitterapp.com)
const GITHUB_TRENDING_API = "https://api.gitterapp.com";

// 대체 API (OSS Insight)
const FALLBACK_API = "https://api.ossinsight.io/v1/trends/repos";

const USER_AGENT = "WebToolkit-TrendBot/1.0 (https://web-toolkit.app)";

// 개발자 도구 관련 키워드
const TOOL_KEYWORDS = [
  "tool",
  "cli",
  "utility",
  "converter",
  "formatter",
  "generator",
  "validator",
  "encoder",
  "decoder",
  "parser",
  "linter",
  "analyzer",
  "builder",
  "bundler",
  "compiler",
  "debugger",
  "profiler",
  "monitor",
  "dashboard",
];

// ============================================
// API 응답 파싱
// ============================================

interface GitterApiRepo {
  author: string;
  name: string;
  avatar: string;
  url: string;
  description: string;
  language: string;
  languageColor: string;
  stars: number;
  forks: number;
  currentPeriodStars: number;
  builtBy: Array<{
    username: string;
    href: string;
    avatar: string;
  }>;
}

function parseGitterResponse(data: GitterApiRepo[]): TrendingRepo[] {
  return data.map((repo) => ({
    name: repo.name,
    fullName: `${repo.author}/${repo.name}`,
    description: repo.description || "",
    url: repo.url,
    stars: repo.stars,
    forks: repo.forks,
    language: repo.language || "Unknown",
    todayStars: repo.currentPeriodStars || 0,
    builtBy: repo.builtBy?.map((user) => ({
      username: user.username,
      url: user.href,
      avatar: user.avatar,
    })),
  }));
}

// ============================================
// GitHub Trending 페이지 직접 스크래핑 (백업)
// ============================================

async function scrapeGitHubTrending(
  language?: string,
  since: TrendingPeriod = "daily",
): Promise<TrendingRepo[]> {
  let url = `https://github.com/trending`;
  if (language) {
    url += `/${encodeURIComponent(language)}`;
  }
  url += `?since=${since}`;

  try {
    const response = await fetchWithRetry(url, {
      headers: {
        "User-Agent": USER_AGENT,
        Accept: "text/html",
      },
    });

    if (!response.ok) {
      console.error(`[GitHub] 스크래핑 실패: HTTP ${response.status}`);
      return [];
    }

    const html = await response.text();
    return parseGitHubTrendingHtml(html);
  } catch (error) {
    console.error("[GitHub] 스크래핑 에러:", (error as Error).message);
    return [];
  }
}

function parseGitHubTrendingHtml(html: string): TrendingRepo[] {
  const repos: TrendingRepo[] = [];

  // article.Box-row 패턴으로 각 리포지토리 추출
  const articleRegex = /<article class="Box-row">([\s\S]*?)<\/article>/g;
  let match;

  while ((match = articleRegex.exec(html)) !== null) {
    const articleHtml = match[1];

    // 리포지토리 이름 추출 (h2 내의 첫 번째 링크)
    const repoMatch = articleHtml.match(
      /<h2[^>]*>[\s\S]*?<a[^>]*href="\/([^"]+)"[^>]*>/,
    );
    if (!repoMatch) continue;

    const fullName = repoMatch[1].replace(/\/$/, "").trim();
    const parts = fullName.split("/");
    if (parts.length !== 2) continue;
    const [author, name] = parts;

    // 설명 추출
    const descMatch = articleHtml.match(
      /<p class="[^"]*col-9[^"]*">([\s\S]*?)<\/p>/,
    );
    const description = descMatch
      ? descMatch[1]
          .trim()
          .replace(/<[^>]*>/g, "")
          .replace(/\s+/g, " ")
          .trim()
      : "";

    // 언어 추출
    const langMatch = articleHtml.match(
      /itemprop="programmingLanguage">([^<]+)</,
    );
    const language = langMatch ? langMatch[1].trim() : "Unknown";

    // 스타/포크 수 추출 - SVG 아이콘 옆의 숫자 찾기
    // GitHub는 octicon-star 클래스와 함께 숫자를 표시
    const starsMatch = articleHtml.match(
      /href="\/[^"]+\/stargazers"[^>]*>\s*(?:<svg[^>]*>[\s\S]*?<\/svg>)?\s*([\d,]+)/,
    );
    const stars = starsMatch
      ? parseInt(starsMatch[1].replace(/,/g, ""), 10)
      : 0;

    // 포크 수 추출
    const forksMatch = articleHtml.match(
      /href="\/[^"]+\/forks[^"]*"[^>]*>\s*(?:<svg[^>]*>[\s\S]*?<\/svg>)?\s*([\d,]+)/,
    );
    const forks = forksMatch
      ? parseInt(forksMatch[1].replace(/,/g, ""), 10)
      : 0;

    // 오늘/이번주 스타 추출 (다양한 패턴 대응)
    const todayMatch = articleHtml.match(
      /([\d,]+)\s+stars?\s+(?:today|this\s+week)/i,
    );
    const todayStars = todayMatch
      ? parseInt(todayMatch[1].replace(/,/g, ""), 10)
      : 0;

    repos.push({
      name: name.trim(),
      fullName: fullName.trim(),
      description,
      url: `https://github.com/${fullName}`,
      stars,
      forks,
      language,
      todayStars,
    });
  }

  return repos;
}

// ============================================
// 수집 함수
// ============================================

/**
 * GitHub Trending 데이터 수집 (API 우선, 실패 시 스크래핑)
 */
export async function collectGitHubTrending(
  language?: string,
  since: TrendingPeriod = "daily",
): Promise<CollectionResult<TrendingRepo>> {
  console.log(`[GitHub] Trending 수집 시작: ${language || "all"}, ${since}`);

  // 1차: Gitter API 시도
  try {
    const params = new URLSearchParams();
    if (language) params.set("language", language);
    params.set("since", since);

    const response = await fetchWithRetry(
      `${GITHUB_TRENDING_API}/repositories?${params}`,
      {
        headers: {
          "User-Agent": USER_AGENT,
          Accept: "application/json",
        },
      },
    );

    if (response.ok) {
      const text = await response.text();
      const parsed = safeJsonParse<GitterApiRepo[]>(text);

      if (parsed.success && parsed.data && parsed.data.length > 0) {
        const repos = parseGitterResponse(parsed.data);
        console.log(`[GitHub] API 수집 성공: ${repos.length}개 리포지토리`);

        return {
          success: true,
          data: repos,
          errors: [],
          collectedAt: new Date().toISOString(),
          source: "github-api",
        };
      }
    }
  } catch (error) {
    console.warn(
      "[GitHub] API 실패, 스크래핑으로 대체:",
      (error as Error).message,
    );
  }

  // 2차: 직접 스크래핑
  try {
    const repos = await scrapeGitHubTrending(language, since);

    if (repos.length > 0) {
      console.log(`[GitHub] 스크래핑 성공: ${repos.length}개 리포지토리`);

      return {
        success: true,
        data: repos,
        errors: [],
        collectedAt: new Date().toISOString(),
        source: "github-scrape",
      };
    }

    return {
      success: false,
      data: [],
      errors: ["API와 스크래핑 모두 실패"],
      collectedAt: new Date().toISOString(),
      source: "github",
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      errors: [(error as Error).message],
      collectedAt: new Date().toISOString(),
      source: "github",
    };
  }
}

/**
 * 여러 언어의 트렌딩 데이터 수집
 */
export async function collectMultiLanguageTrending(
  languages: string[],
  since: TrendingPeriod = "weekly",
): Promise<Record<string, TrendingRepo[]>> {
  const result: Record<string, TrendingRepo[]> = {};

  for (const language of languages) {
    const collectionResult = await collectGitHubTrending(language, since);
    result[language] = collectionResult.data;

    // Rate limiting: 언어 간 1.5초 대기
    await sleep(1500);
  }

  return result;
}

/**
 * 개발자 도구 카테고리 필터링
 */
export function filterDeveloperTools(repos: TrendingRepo[]): TrendingRepo[] {
  return repos.filter((repo) => {
    const searchText = `${repo.name} ${repo.description}`.toLowerCase();
    return TOOL_KEYWORDS.some((keyword) => searchText.includes(keyword));
  });
}

/**
 * 스타 수 기준 상위 N개 추출
 */
export function getTopByStars(
  repos: TrendingRepo[],
  limit = 10,
): TrendingRepo[] {
  return [...repos].sort((a, b) => b.stars - a.stars).slice(0, limit);
}

/**
 * 오늘 스타 증가 기준 상위 N개 추출
 */
export function getTopByTodayStars(
  repos: TrendingRepo[],
  limit = 10,
): TrendingRepo[] {
  return [...repos].sort((a, b) => b.todayStars - a.todayStars).slice(0, limit);
}

/**
 * 특정 키워드가 포함된 리포지토리 필터링
 */
export function filterByKeywords(
  repos: TrendingRepo[],
  keywords: string[],
): TrendingRepo[] {
  const lowerKeywords = keywords.map((k) => k.toLowerCase());

  return repos.filter((repo) => {
    const searchText = `${repo.name} ${repo.description}`.toLowerCase();
    return lowerKeywords.some((keyword) => searchText.includes(keyword));
  });
}
