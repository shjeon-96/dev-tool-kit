/**
 * 주간 트렌드 리포트 생성기
 * Reddit + GitHub 데이터를 결합하여 종합 리포트 생성
 */

import { collectRedditTrends } from "./reddit-collector";
import {
  collectGitHubTrending,
  collectMultiLanguageTrending,
  filterDeveloperTools,
} from "./github-collector";
import type { WeeklyTrendReport, RedditPost, TrendingRepo } from "./types";
import { createLogger } from "@/shared/lib/logger";

const logger = createLogger("trend-report");

// ============================================
// 유틸리티 함수
// ============================================

/**
 * 현재 주차 문자열 반환 (ISO 8601 형식)
 * 예: "2025-W52"
 */
export function getWeekString(date: Date = new Date()): string {
  const year = date.getFullYear();
  const startOfYear = new Date(year, 0, 1);
  const days = Math.floor(
    (date.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000),
  );
  const weekNum = Math.ceil((days + startOfYear.getDay() + 1) / 7);
  return `${year}-W${weekNum.toString().padStart(2, "0")}`;
}

/**
 * 주차 문자열에서 날짜 범위 계산
 */
export function getWeekDateRange(weekString: string): {
  start: Date;
  end: Date;
} {
  const [yearStr, weekStr] = weekString.split("-W");
  const year = parseInt(yearStr, 10);
  const week = parseInt(weekStr, 10);

  // 해당 년도의 첫 번째 목요일을 기준으로 계산
  const jan1 = new Date(year, 0, 1);
  const dayOffset = (4 - jan1.getDay() + 7) % 7;
  const firstThursday = new Date(year, 0, 1 + dayOffset);

  const start = new Date(firstThursday);
  start.setDate(firstThursday.getDate() + (week - 1) * 7 - 3); // 월요일

  const end = new Date(start);
  end.setDate(start.getDate() + 6); // 일요일

  return { start, end };
}

/**
 * 최근 N주의 주차 문자열 배열 반환
 */
export function getLastNWeeks(n: number): string[] {
  const weeks: string[] = [];
  const today = new Date();

  for (let i = 0; i < n; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i * 7);
    weeks.push(getWeekString(date));
  }

  return weeks;
}

// ============================================
// 토픽 추출
// ============================================

/**
 * 포스트에서 떠오르는 토픽 추출
 */
export function extractEmergingTopics(posts: RedditPost[]): string[] {
  const wordFrequency: Record<string, number> = {};

  // 불용어 (일반 + HTML/URL 관련)
  const stopWords = new Set([
    // 일반 불용어
    "the",
    "and",
    "for",
    "with",
    "this",
    "that",
    "from",
    "your",
    "have",
    "are",
    "was",
    "were",
    "been",
    "being",
    "will",
    "would",
    "could",
    "should",
    "just",
    "about",
    "into",
    "what",
    "when",
    "where",
    "which",
    "while",
    "who",
    "how",
    "why",
    "all",
    "each",
    "every",
    "both",
    "few",
    "more",
    "most",
    "other",
    "some",
    "such",
    "than",
    "too",
    "very",
    "can",
    "not",
    "now",
    "only",
    "own",
    "same",
    "then",
    "there",
    "these",
    "they",
    "here",
    "like",
    "use",
    "using",
    "used",
    "make",
    "made",
    "get",
    "got",
    "also",
    "does",
    "dont",
    "want",
    "know",
    "think",
    "really",
    "much",
    "need",
    "even",
    "well",
    "back",
    "still",
    "good",
    "going",
    "something",
    "things",
    "thing",
    "work",
    "working",
    "works",
    "look",
    "looking",
    "first",
    "time",
    "long",
    "best",
    "better",
    "over",
    "after",
    "before",
    "been",
    // HTML/URL 관련 불용어
    "href",
    "http",
    "https",
    "www",
    "com",
    "org",
    "net",
    "html",
    "class",
    "style",
    "span",
    "div",
    "table",
    "tbody",
    "thead",
    "tr",
    "td",
    "th",
    "img",
    "src",
    "alt",
    "title",
    "width",
    "height",
    "border",
    "cellpadding",
    "cellspacing",
    // Reddit 마크업 관련
    "sc_off",
    "sc_on",
    "submitted",
    "reddit",
    "subreddit",
    "comments",
    "comment",
    "post",
    "posts",
    "upvote",
    "upvotes",
    "downvote",
    "vote",
    "votes",
    "edit",
    "edited",
    "deleted",
    "removed",
    "nbsp",
    "amp",
    "quot",
    "apos",
    "mdash",
    "ndash",
    "hellip",
    "cdata",
  ]);

  posts.forEach((post) => {
    const words = `${post.title} ${post.content}`
      .toLowerCase()
      .split(/\W+/)
      .filter(
        (word) =>
          word.length > 3 &&
          !stopWords.has(word) &&
          !/^\d+$/.test(word) &&
          // URL 패턴 필터링
          !/^(https?|www|ftp)$/i.test(word) &&
          // 해시코드/ID 패턴 필터링
          !/^[a-f0-9]{6,}$/i.test(word),
      );

    words.forEach((word) => {
      wordFrequency[word] = (wordFrequency[word] || 0) + 1;
    });
  });

  // 빈도순 정렬 후 상위 15개
  return Object.entries(wordFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)
    .map(([word]) => word);
}

// ============================================
// 리포트 생성
// ============================================

/**
 * 주간 트렌드 리포트 생성
 */
export async function generateWeeklyTrendReport(): Promise<WeeklyTrendReport> {
  logger.info("주간 트렌드 리포트 생성 시작");

  const week = getWeekString();
  const languages = ["javascript", "typescript", "python", "go", "rust"];

  // 1. GitHub Trending 수집
  logger.info("GitHub Trending 수집 중");
  const [overallResult, byLanguageData] = await Promise.all([
    collectGitHubTrending(undefined, "weekly"),
    collectMultiLanguageTrending(languages, "weekly"),
  ]);

  // 2. Reddit 트렌드 수집
  logger.info("Reddit 트렌드 수집 중");
  const redditResult = await collectRedditTrends();

  // 3. 데이터 가공
  const developerTools = filterDeveloperTools(overallResult.data);
  const emergingTopics = extractEmergingTopics(redditResult.data);

  const report: WeeklyTrendReport = {
    week,
    generatedAt: new Date().toISOString(),
    githubTrending: {
      overall: overallResult.data.slice(0, 25),
      byLanguage: Object.fromEntries(
        Object.entries(byLanguageData).map(([lang, repos]) => [
          lang,
          repos.slice(0, 15),
        ]),
      ),
      developerTools: developerTools.slice(0, 10),
    },
    redditDiscussions: {
      topPosts: redditResult.data.slice(0, 20),
      emergingTopics,
    },
  };

  logger.info("리포트 생성 완료", {
    week,
    githubRepos: report.githubTrending.overall.length,
    developerTools: report.githubTrending.developerTools.length,
    redditPosts: report.redditDiscussions.topPosts.length,
    topics: report.redditDiscussions.emergingTopics.length,
  });

  return report;
}

/**
 * 특정 주차의 리포트 생성 (과거 데이터용 - 제한적)
 */
export async function generateReportForWeek(
  weekString: string,
): Promise<WeeklyTrendReport | null> {
  // 과거 데이터는 실시간 수집이 어려우므로
  // 캐시된 데이터가 있으면 반환, 없으면 null
  console.warn(`[Report] 과거 주차(${weekString}) 리포트는 캐시 데이터만 지원`);
  return null;
}

// ============================================
// 리포트 요약
// ============================================

export interface ReportSummary {
  week: string;
  topRepo: TrendingRepo | null;
  topTool: TrendingRepo | null;
  hotTopics: string[];
  languageHighlights: Record<string, string>;
}

/**
 * 리포트 요약 생성
 */
export function summarizeReport(report: WeeklyTrendReport): ReportSummary {
  const topRepo =
    report.githubTrending.overall.length > 0
      ? report.githubTrending.overall[0]
      : null;

  const topTool =
    report.githubTrending.developerTools.length > 0
      ? report.githubTrending.developerTools[0]
      : null;

  const languageHighlights: Record<string, string> = {};
  for (const [lang, repos] of Object.entries(
    report.githubTrending.byLanguage,
  )) {
    if (repos.length > 0) {
      languageHighlights[lang] = repos[0].fullName;
    }
  }

  return {
    week: report.week,
    topRepo,
    topTool,
    hotTopics: report.redditDiscussions.emergingTopics.slice(0, 5),
    languageHighlights,
  };
}
