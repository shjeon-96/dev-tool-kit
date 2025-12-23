/**
 * 데이터 파이프라인 타입 정의
 */

// ============================================
// Reddit 관련 타입
// ============================================

export interface RedditPost {
  id: string;
  title: string;
  link: string;
  pubDate: string;
  author: string;
  content: string;
  subreddit: string;
  score?: number;
}

export interface SubredditConfig {
  url: string;
  relevantKeywords: string[];
}

// ============================================
// GitHub 관련 타입
// ============================================

export interface TrendingRepo {
  name: string;
  fullName: string;
  description: string;
  url: string;
  stars: number;
  forks: number;
  language: string;
  todayStars: number;
  builtBy?: GitHubUser[];
}

export interface GitHubUser {
  username: string;
  url: string;
  avatar: string;
}

export type TrendingPeriod = "daily" | "weekly" | "monthly";

// ============================================
// 트렌드 리포트 타입
// ============================================

export interface WeeklyTrendReport {
  week: string;
  generatedAt: string;
  githubTrending: {
    overall: TrendingRepo[];
    byLanguage: Record<string, TrendingRepo[]>;
    developerTools: TrendingRepo[];
  };
  redditDiscussions: {
    topPosts: RedditPost[];
    emergingTopics: string[];
  };
}

// ============================================
// npm 패키지 관련 타입
// ============================================

export interface NpmPackageInfo {
  name: string;
  description: string;
  version: string;
  downloads: {
    weekly: number;
    monthly: number;
  };
  repository?: string;
  homepage?: string;
  keywords?: string[];
}

// ============================================
// 수집 결과 타입
// ============================================

export interface CollectionResult<T> {
  success: boolean;
  data: T[];
  errors: string[];
  collectedAt: string;
  source: string;
}

// ============================================
// 저장소 관련 타입
// ============================================

export interface StorageMetadata {
  version: string;
  lastUpdated: string;
  recordCount: number;
}
