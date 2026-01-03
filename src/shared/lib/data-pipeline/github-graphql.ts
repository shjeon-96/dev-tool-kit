/**
 * GitHub GraphQL API (공식 API)
 *
 * Week 3-4: API 의존성 리스크 대응 - 공식 API 연동
 * 비공식 API (gitterapp.com) 대비 안정성 향상
 */

import { fetchWithRetry } from "./error-handling";
import type { TrendingRepo, CollectionResult } from "./types";
import { createLogger } from "@/shared/lib/logger";

const logger = createLogger("github-graphql");

// ============================================
// 설정
// ============================================

const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";
const USER_AGENT = "WebToolkit-TrendBot/1.0 (https://web-toolkit.app)";

// ============================================
// GraphQL 타입 정의
// ============================================

interface GraphQLResponse {
  data?: {
    search?: {
      repositoryCount: number;
      pageInfo: {
        hasNextPage: boolean;
        endCursor: string | null;
      };
      nodes: GraphQLRepo[];
    };
  };
  errors?: Array<{
    message: string;
    type?: string;
    path?: string[];
  }>;
}

interface GraphQLRepo {
  name: string;
  nameWithOwner: string;
  description: string | null;
  url: string;
  stargazerCount: number;
  forkCount: number;
  primaryLanguage: {
    name: string;
    color: string;
  } | null;
  createdAt: string;
  updatedAt: string;
  pushedAt: string;
  isArchived: boolean;
  isFork: boolean;
  licenseInfo: {
    spdxId: string;
  } | null;
  repositoryTopics: {
    nodes: Array<{
      topic: {
        name: string;
      };
    }>;
  };
}

// ============================================
// GraphQL 쿼리
// ============================================

/**
 * 최근 생성된 인기 리포지토리 검색 쿼리
 */
function buildTrendingQuery(dateFilter: string, language?: string): string {
  const languageFilter = language ? ` language:${language}` : "";

  return `
    query TrendingRepos($cursor: String) {
      search(
        query: "created:>${dateFilter} stars:>50${languageFilter}"
        type: REPOSITORY
        first: 50
        after: $cursor
      ) {
        repositoryCount
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          ... on Repository {
            name
            nameWithOwner
            description
            url
            stargazerCount
            forkCount
            primaryLanguage {
              name
              color
            }
            createdAt
            updatedAt
            pushedAt
            isArchived
            isFork
            licenseInfo {
              spdxId
            }
            repositoryTopics(first: 10) {
              nodes {
                topic {
                  name
                }
              }
            }
          }
        }
      }
    }
  `;
}

/**
 * 스타 기준 인기 리포지토리 검색 쿼리 (최근 업데이트 기준)
 */
function buildPopularQuery(dateFilter: string, language?: string): string {
  const languageFilter = language ? ` language:${language}` : "";

  return `
    query PopularRepos($cursor: String) {
      search(
        query: "pushed:>${dateFilter} stars:>1000${languageFilter}"
        type: REPOSITORY
        first: 50
        after: $cursor
      ) {
        repositoryCount
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          ... on Repository {
            name
            nameWithOwner
            description
            url
            stargazerCount
            forkCount
            primaryLanguage {
              name
              color
            }
            createdAt
            updatedAt
            pushedAt
            isArchived
            isFork
            licenseInfo {
              spdxId
            }
            repositoryTopics(first: 10) {
              nodes {
                topic {
                  name
                }
              }
            }
          }
        }
      }
    }
  `;
}

// ============================================
// API 호출
// ============================================

/**
 * GitHub GraphQL API 호출
 */
async function executeGraphQL(
  query: string,
  variables: Record<string, unknown> = {},
): Promise<GraphQLResponse> {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    throw new Error(
      "GITHUB_TOKEN 환경 변수가 설정되지 않았습니다. " +
        "GitHub Personal Access Token을 .env.local에 추가하세요.",
    );
  }

  const response = await fetchWithRetry(GITHUB_GRAPHQL_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": USER_AGENT,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `GitHub GraphQL API 에러: ${response.status} - ${errorText}`,
    );
  }

  const data: GraphQLResponse = await response.json();

  if (data.errors && data.errors.length > 0) {
    const errorMessages = data.errors.map((e) => e.message).join(", ");
    throw new Error(`GraphQL 에러: ${errorMessages}`);
  }

  return data;
}

// ============================================
// 데이터 변환
// ============================================

/**
 * GraphQL 응답을 TrendingRepo 형식으로 변환
 */
function transformToTrendingRepo(repo: GraphQLRepo): TrendingRepo {
  return {
    name: repo.name,
    fullName: repo.nameWithOwner,
    description: repo.description || "",
    url: repo.url,
    stars: repo.stargazerCount,
    forks: repo.forkCount,
    language: repo.primaryLanguage?.name || "Unknown",
    todayStars: 0, // GraphQL API는 일일 스타 증가량을 제공하지 않음
    topics: repo.repositoryTopics.nodes.map((n) => n.topic.name),
    license: repo.licenseInfo?.spdxId,
    isArchived: repo.isArchived,
    isFork: repo.isFork,
    createdAt: repo.createdAt,
    updatedAt: repo.updatedAt,
    pushedAt: repo.pushedAt,
  };
}

// ============================================
// 수집 함수
// ============================================

export type TrendingPeriodGraphQL = "daily" | "weekly" | "monthly";

/**
 * GitHub GraphQL API를 통한 트렌딩 리포지토리 수집
 */
export async function collectFromGitHubGraphQL(
  language?: string,
  period: TrendingPeriodGraphQL = "weekly",
): Promise<CollectionResult<TrendingRepo>> {
  logger.info("수집 시작", { language: language || "all", period });

  // 날짜 필터 계산
  const now = new Date();
  const daysBack = period === "daily" ? 1 : period === "weekly" ? 7 : 30;
  now.setDate(now.getDate() - daysBack);
  const dateFilter = now.toISOString().split("T")[0];

  try {
    // 1. 최근 생성된 인기 리포지토리
    const trendingQuery = buildTrendingQuery(dateFilter, language);
    const trendingResponse = await executeGraphQL(trendingQuery);

    const trendingRepos =
      trendingResponse.data?.search?.nodes
        .filter(
          (repo): repo is GraphQLRepo =>
            repo !== null && !repo.isArchived && !repo.isFork,
        )
        .map(transformToTrendingRepo) || [];

    // 2. 최근 업데이트된 인기 리포지토리 (보완)
    const popularQuery = buildPopularQuery(dateFilter, language);
    const popularResponse = await executeGraphQL(popularQuery);

    const popularRepos =
      popularResponse.data?.search?.nodes
        .filter(
          (repo): repo is GraphQLRepo =>
            repo !== null && !repo.isArchived && !repo.isFork,
        )
        .map(transformToTrendingRepo) || [];

    // 중복 제거 및 병합
    const seenFullNames = new Set<string>();
    const mergedRepos: TrendingRepo[] = [];

    for (const repo of [...trendingRepos, ...popularRepos]) {
      if (!seenFullNames.has(repo.fullName)) {
        seenFullNames.add(repo.fullName);
        mergedRepos.push(repo);
      }
    }

    // 스타 수 기준 정렬
    mergedRepos.sort((a, b) => b.stars - a.stars);

    logger.info("수집 성공", { count: mergedRepos.length });

    return {
      success: true,
      data: mergedRepos,
      errors: [],
      collectedAt: new Date().toISOString(),
      source: "github-graphql",
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`[GitHub GraphQL] 수집 실패:`, errorMessage);

    return {
      success: false,
      data: [],
      errors: [errorMessage],
      collectedAt: new Date().toISOString(),
      source: "github-graphql",
    };
  }
}

/**
 * 여러 언어의 트렌딩 데이터 수집
 */
export async function collectMultiLanguageFromGraphQL(
  languages: string[],
  period: TrendingPeriodGraphQL = "weekly",
): Promise<Record<string, TrendingRepo[]>> {
  const result: Record<string, TrendingRepo[]> = {};

  for (const language of languages) {
    const collectionResult = await collectFromGitHubGraphQL(language, period);
    result[language] = collectionResult.data;

    // Rate limiting: GitHub API는 분당 30 요청 제한
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  return result;
}

/**
 * 개발자 도구 카테고리 필터링 (토픽 기반)
 */
export function filterDeveloperToolsByTopics(
  repos: TrendingRepo[],
): TrendingRepo[] {
  const toolTopics = [
    "cli",
    "tool",
    "utility",
    "developer-tools",
    "devtools",
    "command-line",
    "terminal",
    "productivity",
    "automation",
    "build-tool",
    "linter",
    "formatter",
    "converter",
    "generator",
    "parser",
    "compiler",
  ];

  return repos.filter((repo) => {
    const repoTopics =
      (repo as TrendingRepo & { topics?: string[] }).topics || [];
    const searchText = `${repo.name} ${repo.description}`.toLowerCase();

    // 토픽 일치 또는 설명에 키워드 포함
    return (
      repoTopics.some((t) => toolTopics.includes(t.toLowerCase())) ||
      toolTopics.some((keyword) => searchText.includes(keyword))
    );
  });
}

/**
 * API 상태 확인 (헬스 체크)
 */
export async function checkGitHubGraphQLHealth(): Promise<{
  available: boolean;
  rateLimit?: {
    remaining: number;
    resetAt: string;
  };
  error?: string;
}> {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return {
      available: false,
      error: "GITHUB_TOKEN not configured",
    };
  }

  try {
    const query = `
      query {
        rateLimit {
          remaining
          resetAt
        }
      }
    `;

    const response = await executeGraphQL(query);

    if (response.data) {
      return {
        available: true,
        rateLimit: {
          remaining: (
            response.data as {
              rateLimit: { remaining: number; resetAt: string };
            }
          ).rateLimit.remaining,
          resetAt: (
            response.data as {
              rateLimit: { remaining: number; resetAt: string };
            }
          ).rateLimit.resetAt,
        },
      };
    }

    return { available: false, error: "Unknown error" };
  } catch (error) {
    return {
      available: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
