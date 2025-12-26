/**
 * 내부 링크 최적화 모듈
 * User Journey 기반 내부 링크 그래프 및 추천 시스템
 */

export {
  USER_JOURNEY_GRAPH,
  getRelatedByCategory,
  getFrequentFromHistory,
  getWeightedRecommendations,
  getToolTitle,
  getToolCategory,
  isValidToolSlug,
  getInboundLinks,
  calculateToolImportance,
  type LinkWeight,
} from "@/widgets/smart-internal-links/lib/journey-graph";
