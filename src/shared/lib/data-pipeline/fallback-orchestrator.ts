/**
 * 다중 소스 Fallback 아키텍처
 *
 * Week 3-4: API 의존성 리스크 대응
 * 우선순위: GraphQL(공식) → REST(비공식) → 스크래핑 → 정적 데이터
 */

import {
  collectFromGitHubGraphQL,
  checkGitHubGraphQLHealth,
  type TrendingPeriodGraphQL,
} from "./github-graphql";
import { collectGitHubTrending } from "./github-collector";
import { loadFromStorage, saveToStorage } from "./storage";
import type { TrendingRepo, CollectionResult } from "./types";

// ============================================
// 설정
// ============================================

export interface FallbackConfig {
  /** 캐시 유효 시간 (밀리초) */
  cacheTtl: number;
  /** 최소 리포지토리 수 (이 이하면 다음 소스로 폴백) */
  minRepoCount: number;
  /** 정적 데이터 사용 여부 */
  useStaticFallback: boolean;
}

const DEFAULT_CONFIG: FallbackConfig = {
  cacheTtl: 6 * 60 * 60 * 1000, // 6시간
  minRepoCount: 10,
  useStaticFallback: true,
};

// ============================================
// 데이터 소스 상태
// ============================================

export interface SourceStatus {
  name: string;
  available: boolean;
  lastSuccess?: string;
  lastError?: string;
  latency?: number;
}

export interface PipelineStatus {
  lastRun: string;
  sources: SourceStatus[];
  activeSource: string;
  dataFreshness: string;
  usingFallback: boolean;
  alertLevel: "green" | "yellow" | "red";
}

// 소스 상태 저장 (메모리 캐시)
const sourceStatusCache: Map<string, SourceStatus> = new Map();

// ============================================
// 정적 Fallback 데이터
// ============================================

/**
 * 절대 실패하지 않는 evergreen 인기 리포지토리
 */
const EVERGREEN_POPULAR_REPOS: TrendingRepo[] = [
  {
    name: "freeCodeCamp",
    fullName: "freeCodeCamp/freeCodeCamp",
    description: "freeCodeCamp.org's open-source codebase and curriculum",
    url: "https://github.com/freeCodeCamp/freeCodeCamp",
    stars: 385000,
    forks: 35000,
    language: "TypeScript",
    todayStars: 0,
    topics: ["education", "javascript", "curriculum"],
  },
  {
    name: "react",
    fullName: "facebook/react",
    description:
      "A declarative, efficient, and flexible JavaScript library for building user interfaces",
    url: "https://github.com/facebook/react",
    stars: 220000,
    forks: 45000,
    language: "JavaScript",
    todayStars: 0,
    topics: ["react", "javascript", "frontend", "ui"],
  },
  {
    name: "vue",
    fullName: "vuejs/vue",
    description: "A progressive framework for building user interfaces",
    url: "https://github.com/vuejs/vue",
    stars: 207000,
    forks: 34000,
    language: "TypeScript",
    todayStars: 0,
    topics: ["vue", "javascript", "frontend"],
  },
  {
    name: "tensorflow",
    fullName: "tensorflow/tensorflow",
    description: "An Open Source Machine Learning Framework for Everyone",
    url: "https://github.com/tensorflow/tensorflow",
    stars: 182000,
    forks: 74000,
    language: "C++",
    todayStars: 0,
    topics: ["machine-learning", "deep-learning", "tensorflow"],
  },
  {
    name: "vscode",
    fullName: "microsoft/vscode",
    description: "Visual Studio Code - Code editing. Redefined.",
    url: "https://github.com/microsoft/vscode",
    stars: 158000,
    forks: 28000,
    language: "TypeScript",
    todayStars: 0,
    topics: ["editor", "typescript", "electron", "developer-tools"],
  },
  {
    name: "next.js",
    fullName: "vercel/next.js",
    description: "The React Framework for Production",
    url: "https://github.com/vercel/next.js",
    stars: 120000,
    forks: 26000,
    language: "JavaScript",
    todayStars: 0,
    topics: ["react", "nextjs", "javascript", "ssr"],
  },
  {
    name: "typescript",
    fullName: "microsoft/TypeScript",
    description:
      "TypeScript is a superset of JavaScript that compiles to clean JavaScript output",
    url: "https://github.com/microsoft/TypeScript",
    stars: 97000,
    forks: 12000,
    language: "TypeScript",
    todayStars: 0,
    topics: ["typescript", "javascript", "compiler"],
  },
  {
    name: "node",
    fullName: "nodejs/node",
    description: "Node.js JavaScript runtime",
    url: "https://github.com/nodejs/node",
    stars: 102000,
    forks: 28000,
    language: "JavaScript",
    todayStars: 0,
    topics: ["nodejs", "javascript", "runtime"],
  },
  {
    name: "deno",
    fullName: "denoland/deno",
    description: "A modern runtime for JavaScript and TypeScript",
    url: "https://github.com/denoland/deno",
    stars: 93000,
    forks: 5000,
    language: "Rust",
    todayStars: 0,
    topics: ["deno", "javascript", "typescript", "runtime"],
  },
  {
    name: "rust",
    fullName: "rust-lang/rust",
    description: "Empowering everyone to build reliable and efficient software",
    url: "https://github.com/rust-lang/rust",
    stars: 92000,
    forks: 12000,
    language: "Rust",
    todayStars: 0,
    topics: ["rust", "compiler", "systems-programming"],
  },
  {
    name: "go",
    fullName: "golang/go",
    description: "The Go programming language",
    url: "https://github.com/golang/go",
    stars: 118000,
    forks: 17000,
    language: "Go",
    todayStars: 0,
    topics: ["go", "programming-language"],
  },
  {
    name: "tailwindcss",
    fullName: "tailwindlabs/tailwindcss",
    description: "A utility-first CSS framework for rapid UI development",
    url: "https://github.com/tailwindlabs/tailwindcss",
    stars: 77000,
    forks: 4000,
    language: "CSS",
    todayStars: 0,
    topics: ["css", "tailwindcss", "utility-first"],
  },
];

// ============================================
// 캐시 관리
// ============================================

const CACHE_KEY = "trending-repos-cache";

interface CacheData {
  data: TrendingRepo[];
  timestamp: string;
  source: string;
}

async function getFromCache(config: FallbackConfig): Promise<CacheData | null> {
  try {
    const stored = await loadFromStorage<CacheData>(CACHE_KEY);
    if (!stored) return null;

    const age = Date.now() - new Date(stored.timestamp).getTime();
    if (age > config.cacheTtl) {
      console.log("[Fallback] 캐시 만료됨");
      return null;
    }

    console.log(
      `[Fallback] 캐시 적중: ${stored.data.length}개 리포지토리 (소스: ${stored.source})`,
    );
    return stored;
  } catch {
    return null;
  }
}

async function saveToCache(
  data: TrendingRepo[],
  source: string,
): Promise<void> {
  const cacheData: CacheData = {
    data,
    timestamp: new Date().toISOString(),
    source,
  };

  await saveToStorage(CACHE_KEY, cacheData);
  console.log(
    `[Fallback] 캐시 저장: ${data.length}개 리포지토리 (소스: ${source})`,
  );
}

// ============================================
// 소스 상태 관리
// ============================================

function updateSourceStatus(
  name: string,
  available: boolean,
  error?: string,
  latency?: number,
): void {
  const status: SourceStatus = {
    name,
    available,
    lastSuccess: available ? new Date().toISOString() : undefined,
    lastError: error,
    latency,
  };
  sourceStatusCache.set(name, status);
}

export function getSourceStatuses(): SourceStatus[] {
  return [
    sourceStatusCache.get("github-graphql") || {
      name: "github-graphql",
      available: false,
    },
    sourceStatusCache.get("github-api") || {
      name: "github-api",
      available: false,
    },
    sourceStatusCache.get("github-scrape") || {
      name: "github-scrape",
      available: false,
    },
    sourceStatusCache.get("static-fallback") || {
      name: "static-fallback",
      available: true,
    },
  ];
}

// ============================================
// Fallback 오케스트레이터
// ============================================

/**
 * 다중 소스 Fallback을 통한 트렌딩 리포지토리 수집
 *
 * 우선순위:
 * 1. 캐시 (유효한 경우)
 * 2. GitHub GraphQL API (공식)
 * 3. GitHub REST API (비공식 - gitterapp.com)
 * 4. GitHub 직접 스크래핑
 * 5. 정적 Fallback 데이터
 */
export async function collectWithFallback(
  language?: string,
  period: TrendingPeriodGraphQL = "weekly",
  config: Partial<FallbackConfig> = {},
): Promise<CollectionResult<TrendingRepo>> {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };
  console.log(`[Fallback] 수집 시작: ${language || "all"}, ${period}`);

  // 1. 캐시 확인
  const cached = await getFromCache(finalConfig);
  if (cached && cached.data.length >= finalConfig.minRepoCount) {
    return {
      success: true,
      data: cached.data,
      errors: [],
      collectedAt: cached.timestamp,
      source: `cache:${cached.source}`,
    };
  }

  // 2. GitHub GraphQL API (공식)
  console.log("[Fallback] GitHub GraphQL API 시도...");
  const startGraphQL = Date.now();
  const graphqlResult = await collectFromGitHubGraphQL(language, period);

  if (
    graphqlResult.success &&
    graphqlResult.data.length >= finalConfig.minRepoCount
  ) {
    updateSourceStatus(
      "github-graphql",
      true,
      undefined,
      Date.now() - startGraphQL,
    );
    await saveToCache(graphqlResult.data, "github-graphql");
    return graphqlResult;
  }

  updateSourceStatus("github-graphql", false, graphqlResult.errors[0]);
  console.log("[Fallback] GraphQL 실패, REST API로 폴백...");

  // 3. GitHub REST API (비공식)
  const startRest = Date.now();
  const restResult = await collectGitHubTrending(
    language,
    period as "daily" | "weekly" | "monthly",
  );

  if (
    restResult.success &&
    restResult.data.length >= finalConfig.minRepoCount
  ) {
    updateSourceStatus(
      restResult.source,
      true,
      undefined,
      Date.now() - startRest,
    );
    await saveToCache(restResult.data, restResult.source);
    return restResult;
  }

  updateSourceStatus("github-api", false, restResult.errors[0]);
  console.log("[Fallback] REST API 실패, 정적 데이터로 폴백...");

  // 4. 정적 Fallback 데이터
  if (finalConfig.useStaticFallback) {
    updateSourceStatus("static-fallback", true);

    // 언어 필터링
    let filteredRepos = EVERGREEN_POPULAR_REPOS;
    if (language) {
      filteredRepos = EVERGREEN_POPULAR_REPOS.filter(
        (repo) => repo.language.toLowerCase() === language.toLowerCase(),
      );
      // 필터링 결과가 없으면 전체 반환
      if (filteredRepos.length === 0) {
        filteredRepos = EVERGREEN_POPULAR_REPOS;
      }
    }

    console.log(
      `[Fallback] 정적 데이터 사용: ${filteredRepos.length}개 리포지토리`,
    );

    return {
      success: true,
      data: filteredRepos,
      errors: ["Using static fallback data"],
      collectedAt: new Date().toISOString(),
      source: "static-fallback",
    };
  }

  // 5. 모든 소스 실패
  return {
    success: false,
    data: [],
    errors: ["All data sources failed"],
    collectedAt: new Date().toISOString(),
    source: "none",
  };
}

/**
 * 파이프라인 상태 조회
 */
export async function getPipelineStatus(): Promise<PipelineStatus> {
  const sources = getSourceStatuses();
  const graphqlHealth = await checkGitHubGraphQLHealth();

  // GraphQL 상태 업데이트
  if (graphqlHealth.available) {
    updateSourceStatus("github-graphql", true);
  }

  // 활성 소스 결정
  let activeSource = "none";
  let alertLevel: PipelineStatus["alertLevel"] = "red";

  if (sources.find((s) => s.name === "github-graphql")?.available) {
    activeSource = "github-graphql";
    alertLevel = "green";
  } else if (sources.find((s) => s.name === "github-api")?.available) {
    activeSource = "github-api";
    alertLevel = "yellow";
  } else if (sources.find((s) => s.name === "github-scrape")?.available) {
    activeSource = "github-scrape";
    alertLevel = "yellow";
  } else if (sources.find((s) => s.name === "static-fallback")?.available) {
    activeSource = "static-fallback";
    alertLevel = "yellow";
  }

  // 캐시 상태 확인
  const cached = await getFromCache(DEFAULT_CONFIG);
  const dataFreshness = cached
    ? new Date(cached.timestamp).toISOString()
    : "No cached data";

  return {
    lastRun: new Date().toISOString(),
    sources,
    activeSource,
    dataFreshness,
    usingFallback: activeSource !== "github-graphql",
    alertLevel,
  };
}

/**
 * 전체 소스 상태 확인 (헬스 체크)
 */
export async function checkAllSources(): Promise<{
  graphql: boolean;
  rest: boolean;
  static: boolean;
}> {
  const graphqlHealth = await checkGitHubGraphQLHealth();

  // REST API 테스트 (간단한 요청)
  let restAvailable = false;
  try {
    const restResult = await collectGitHubTrending(undefined, "daily");
    restAvailable = restResult.success && restResult.data.length > 0;
  } catch {
    restAvailable = false;
  }

  return {
    graphql: graphqlHealth.available,
    rest: restAvailable,
    static: true, // 항상 사용 가능
  };
}
