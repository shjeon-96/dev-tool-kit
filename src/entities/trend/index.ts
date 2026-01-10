export type {
  // Enum types
  TrendSource,
  ArticleCategory,
  ArticleStatus,
  PublishStatus,
  Region,
  MediaProvider,
  // Shared types
  ArticleFAQ,
  MediaItem,
  // Database types
  Trend,
  Article,
  PublishQueueEntry,
  ArticleAnalytics,
  // Input types
  CreateTrendInput,
  CreateArticleInput,
  ScheduleArticleInput,
  // Response types
  PaginatedResponse,
  TrendWithPriority,
  ArticleWithAnalytics,
  // Content generation types
  GeneratedContent,
  ContentGenerationRequest,
  ContentGenerationResult,
} from "./model/types";

export {
  getPublishedArticles,
  getTrendingArticles,
  getArticleBySlug,
  getArticlesByCategory,
  getRelatedArticles,
  searchArticles,
  getAllArticleSlugs,
  getCategoryStats,
  incrementArticleView,
} from "./model/queries";
