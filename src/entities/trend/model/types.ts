// ============================================
// Trend Blog Types
// ============================================

/**
 * Trend source types
 */
export type TrendSource =
  | "google_trends"
  | "reddit"
  | "news_rss"
  | "twitter"
  | "manual";

/**
 * Article category types
 */
export type ArticleCategory =
  | "tech"
  | "business"
  | "lifestyle"
  | "entertainment"
  | "trending"
  | "news";

/**
 * Article status types
 */
export type ArticleStatus =
  | "draft"
  | "review"
  | "scheduled"
  | "published"
  | "archived";

/**
 * Publish queue status types
 */
export type PublishStatus =
  | "pending"
  | "processing"
  | "completed"
  | "failed"
  | "cancelled";

/**
 * Region types
 */
export type Region = "kr" | "us" | "global" | string;

// ============================================
// Shared Types
// ============================================

/**
 * FAQ item for article (SEO rich snippets)
 */
export interface ArticleFAQ {
  question_ko: string;
  question_en: string;
  answer_ko: string;
  answer_en: string;
}

// Re-export from shared (for backwards compatibility)
export type { MediaProvider, MediaItem } from "@/shared/types/media";

// ============================================
// Database Types
// ============================================

/**
 * Trend entity from database
 */
export interface Trend {
  id: string;
  source: TrendSource;
  keyword: string;
  volume: number;
  competition_score: number;
  priority_score: number;
  region: Region;
  category: ArticleCategory | null;
  detected_at: string;
  processed: boolean;
  processed_at: string | null;
  metadata: Record<string, unknown>;
  related_keywords: string[];
  created_at: string;
  updated_at: string;
}

/**
 * Article entity from database
 */
export interface Article {
  id: string;
  trend_id: string | null;
  slug: string;

  // Author (E-E-A-T)
  author_id: string | null;

  // Korean content
  title_ko: string;
  excerpt_ko: string | null;
  content_ko: string;

  // English content
  title_en: string;
  excerpt_en: string | null;
  content_en: string;

  // Categorization
  category: ArticleCategory;
  tags: string[];

  // SEO
  seo_keywords: string[];
  meta_title_ko: string | null;
  meta_title_en: string | null;
  meta_description_ko: string | null;
  meta_description_en: string | null;

  // SEO-enhanced fields (2025)
  faqs: ArticleFAQ[] | null;
  key_takeaways_ko: string[] | null;
  key_takeaways_en: string[] | null;

  // Metrics
  reading_time_minutes: number;
  word_count_ko: number;
  word_count_en: number;

  // Generation metadata
  ai_model: string;
  generation_prompt_hash: string | null;
  generation_cost_usd: number;

  // Status
  status: ArticleStatus;

  // Scheduling
  scheduled_at: string | null;
  published_at: string | null;

  // Topic Cluster (SEO - Topical Authority)
  parent_article_id: string | null;
  topic_cluster_id: string | null;
  is_pillar_page: boolean;
  cluster_order: number;

  // Timestamps
  created_at: string;
  updated_at: string;
}

/**
 * Publish queue entry from database
 */
export interface PublishQueueEntry {
  id: string;
  article_id: string;
  priority: number;
  scheduled_time: string;
  status: PublishStatus;
  retry_count: number;
  max_retries: number;
  last_error: string | null;
  started_at: string | null;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * Article analytics from database
 */
export interface ArticleAnalytics {
  id: string;
  article_id: string;
  page_views: number;
  unique_visitors: number;
  avg_time_on_page: number;
  bounce_rate: number;
  social_shares: number;
  comments_count: number;
  date: string;
  created_at: string;
  updated_at: string;
}

// ============================================
// Input Types (for creating/updating)
// ============================================

/**
 * Input for creating a new trend
 */
export interface CreateTrendInput {
  source: TrendSource;
  keyword: string;
  volume?: number;
  competition_score?: number;
  region?: Region;
  category?: ArticleCategory;
  metadata?: Record<string, unknown>;
  related_keywords?: string[];
}

/**
 * Input for creating a new article
 */
export interface CreateArticleInput {
  trend_id?: string;
  author_id?: string;
  slug: string;
  title_ko: string;
  title_en: string;
  content_ko: string;
  content_en: string;
  excerpt_ko?: string;
  excerpt_en?: string;
  category: ArticleCategory;
  tags?: string[];
  seo_keywords?: string[];
  reading_time_minutes?: number;
  ai_model?: string;
  generation_cost_usd?: number;
  status?: ArticleStatus;
  scheduled_at?: string;
  // Topic Cluster
  parent_article_id?: string;
  topic_cluster_id?: string;
  is_pillar_page?: boolean;
  cluster_order?: number;
}

/**
 * Input for scheduling an article
 */
export interface ScheduleArticleInput {
  article_id: string;
  scheduled_time: string;
  priority?: number;
}

// ============================================
// API Response Types
// ============================================

/**
 * Paginated response
 */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

/**
 * Trend with calculated priority
 */
export interface TrendWithPriority extends Trend {
  calculated_priority: number;
}

/**
 * Article with analytics summary
 */
export interface ArticleWithAnalytics extends Article {
  total_views: number;
  total_shares: number;
}

// ============================================
// Content Generation Types
// ============================================

/**
 * Generated article content from AI
 */
export interface GeneratedContent {
  title_ko: string;
  title_en: string;
  excerpt_ko: string;
  excerpt_en: string;
  content_ko: string;
  content_en: string;
  tags: string[];
  seo_keywords: string[];
  // New SEO-enhanced fields
  faqs?: ArticleFAQ[];
  key_takeaways_ko?: string[];
  key_takeaways_en?: string[];
}

/**
 * Content generation request
 */
export interface ContentGenerationRequest {
  trend: Trend;
  style?: "news" | "howto" | "listicle" | "analysis" | "comparison";
  targetWordCount?: number;
  includeImages?: boolean;
}

/**
 * Content generation result
 */
export interface ContentGenerationResult {
  success: boolean;
  content?: GeneratedContent;
  error?: string;
  tokensUsed?: {
    input: number;
    output: number;
  };
  costUsd?: number;
}
