/**
 * 데이터 파이프라인 모듈
 * 외부 데이터 수집 및 트렌드 리포트 생성
 */

// 타입
export * from "./types";

// 에러 핸들링
export {
  fetchWithRetry,
  withErrorRecovery,
  safeJsonParse,
  lenientJsonParse,
  sleep,
} from "./error-handling";

// Reddit 수집기
export {
  collectRedditTrends,
  collectFromSpecificSubreddits,
  searchReddit,
} from "./reddit-collector";

// GitHub 수집기 (비공식 API)
export {
  collectGitHubTrending,
  collectMultiLanguageTrending,
  filterDeveloperTools,
  getTopByStars,
  getTopByTodayStars,
  filterByKeywords,
} from "./github-collector";

// GitHub GraphQL API (공식)
export {
  collectFromGitHubGraphQL,
  collectMultiLanguageFromGraphQL,
  filterDeveloperToolsByTopics,
  checkGitHubGraphQLHealth,
} from "./github-graphql";

// Fallback 오케스트레이터
export {
  collectWithFallback,
  getPipelineStatus,
  getSourceStatuses,
  checkAllSources,
  type FallbackConfig,
  type SourceStatus,
  type PipelineStatus,
} from "./fallback-orchestrator";

// 트렌드 리포트
export {
  generateWeeklyTrendReport,
  generateReportForWeek,
  summarizeReport,
  getWeekString,
  getWeekDateRange,
  getLastNWeeks,
  extractEmergingTopics,
} from "./trend-report";

// 저장소
export {
  saveTrendReport,
  getTrendReport,
  getLatestTrendReport,
  listTrendReports,
  getRecentReports,
  getStorageMetadata,
  deleteTrendReport,
  cleanupOldReports,
  reportExists,
  // 일반 캐시 저장소
  saveToStorage,
  loadFromStorage,
  deleteFromStorage,
} from "./storage";
