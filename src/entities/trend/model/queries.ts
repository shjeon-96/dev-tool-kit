// Article Query Functions
// Server-side queries for fetching articles from Supabase

import { getUntypedServiceClient } from "@/shared/lib/supabase/server";
import type { Article, ArticleCategory } from "./types";

/**
 * Get published articles with pagination
 */
export async function getPublishedArticles(
  options: {
    limit?: number;
    offset?: number;
    locale?: "ko" | "en";
  } = {},
): Promise<{ articles: Article[]; total: number }> {
  const { limit = 10, offset = 0 } = options;
  const supabase = getUntypedServiceClient();

  if (!supabase) {
    return { articles: [], total: 0 };
  }

  const { data, error, count } = await supabase
    .from("articles")
    .select("*", { count: "exact" })
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error("[Queries] getPublishedArticles error:", error);
    return { articles: [], total: 0 };
  }

  return {
    articles: data || [],
    total: count || 0,
  };
}

/**
 * Get trending articles (most viewed in last 7 days)
 * Falls back to most recent if analytics table is not available
 */
export async function getTrendingArticles(
  limit: number = 5,
): Promise<Article[]> {
  const supabase = getUntypedServiceClient();

  if (!supabase) {
    return [];
  }

  // First try to get articles with analytics
  const { data: analyticsData, error: analyticsError } = await supabase
    .from("articles")
    .select(
      `
      *,
      article_analytics!left (
        view_count
      )
    `,
    )
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(limit);

  // If analytics join works, sort by views
  if (!analyticsError && analyticsData) {
    const articlesWithAnalytics = analyticsData.map((article) => ({
      ...article,
      _viewCount: article.article_analytics?.[0]?.view_count || 0,
    }));

    // Sort by view count descending
    articlesWithAnalytics.sort((a, b) => b._viewCount - a._viewCount);

    // Remove internal fields before returning
    return articlesWithAnalytics.map((item) => {
      const { _viewCount, article_analytics, ...article } = item;
      void _viewCount; // Intentionally unused
      void article_analytics; // Intentionally unused
      return article as Article;
    });
  }

  // Fallback: just get most recent published articles

  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("[Queries] getTrendingArticles error:", error);
    return [];
  }

  return data || [];
}

/**
 * Get article by slug
 */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const supabase = getUntypedServiceClient();

  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error) {
    console.error("[Queries] getArticleBySlug error:", error);
    return null;
  }

  return data;
}

/**
 * Get articles by category
 */
export async function getArticlesByCategory(
  category: ArticleCategory,
  options: {
    limit?: number;
    offset?: number;
  } = {},
): Promise<{ articles: Article[]; total: number }> {
  const { limit = 10, offset = 0 } = options;
  const supabase = getUntypedServiceClient();

  if (!supabase) {
    return { articles: [], total: 0 };
  }

  const { data, error, count } = await supabase
    .from("articles")
    .select("*", { count: "exact" })
    .eq("status", "published")
    .eq("category", category)
    .order("published_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error("[Queries] getArticlesByCategory error:", error);
    return { articles: [], total: 0 };
  }

  return {
    articles: data || [],
    total: count || 0,
  };
}

/**
 * Get related articles based on tags, category, and topic cluster
 * Enhanced with cluster priority for better internal linking
 */
export async function getRelatedArticles(
  articleId: string,
  options: {
    limit?: number;
    tags?: string[];
    category?: ArticleCategory;
    topicClusterId?: string | null;
    prioritizeClusters?: boolean;
  } = {},
): Promise<Article[]> {
  const {
    limit = 4,
    tags = [],
    category,
    topicClusterId,
    prioritizeClusters = false,
  } = options;
  const supabase = getUntypedServiceClient();

  if (!supabase) {
    return [];
  }

  // If prioritizing clusters and we have a cluster ID, get cluster articles first
  if (prioritizeClusters && topicClusterId) {
    const clusterArticles = await getClusterArticles(topicClusterId, {
      limit,
      excludeArticleId: articleId,
    });

    // If we have enough cluster articles, return them
    if (clusterArticles.length >= limit) {
      return clusterArticles.slice(0, limit);
    }

    // Otherwise, supplement with tag/category-based articles
    const remainingLimit = limit - clusterArticles.length;
    const clusterIds = clusterArticles.map((a) => a.id);

    let query = supabase
      .from("articles")
      .select("*")
      .eq("status", "published")
      .neq("id", articleId);

    // Exclude already fetched cluster articles
    if (clusterIds.length > 0) {
      query = query.not("id", "in", `(${clusterIds.join(",")})`);
    }

    if (category) {
      query = query.eq("category", category);
    }

    if (tags.length > 0) {
      query = query.overlaps("tags", tags);
    }

    const { data, error } = await query
      .order("published_at", { ascending: false })
      .limit(remainingLimit);

    if (error) {
      console.error("[Queries] getRelatedArticles supplement error:", error);
      return clusterArticles;
    }

    return [...clusterArticles, ...(data || [])];
  }

  // Standard related articles query (no cluster priority)
  let query = supabase
    .from("articles")
    .select("*")
    .eq("status", "published")
    .neq("id", articleId);

  if (category) {
    query = query.eq("category", category);
  }

  if (tags.length > 0) {
    query = query.overlaps("tags", tags);
  }

  const { data, error } = await query
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("[Queries] getRelatedArticles error:", error);
    return [];
  }

  return data || [];
}

/**
 * Get articles in the same topic cluster
 * Used for pillar page navigation and internal linking
 */
export async function getClusterArticles(
  topicClusterId: string,
  options: {
    limit?: number;
    excludeArticleId?: string;
    includePillar?: boolean;
  } = {},
): Promise<Article[]> {
  const { limit = 10, excludeArticleId, includePillar = false } = options;
  const supabase = getUntypedServiceClient();

  if (!supabase) {
    return [];
  }

  let query = supabase
    .from("articles")
    .select("*")
    .eq("status", "published")
    .eq("topic_cluster_id", topicClusterId);

  if (excludeArticleId) {
    query = query.neq("id", excludeArticleId);
  }

  if (!includePillar) {
    query = query.eq("is_pillar_page", false);
  }

  const { data, error } = await query
    .order("cluster_order", { ascending: true })
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("[Queries] getClusterArticles error:", error);
    return [];
  }

  return data || [];
}

/**
 * Get pillar article for a topic cluster
 */
export async function getPillarArticle(
  topicClusterId: string,
): Promise<Article | null> {
  const supabase = getUntypedServiceClient();

  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("status", "published")
    .eq("topic_cluster_id", topicClusterId)
    .eq("is_pillar_page", true)
    .single();

  if (error) {
    // Not found is not an error
    if (error.code !== "PGRST116") {
      console.error("[Queries] getPillarArticle error:", error);
    }
    return null;
  }

  return data;
}

/**
 * Get all pillar pages (for navigation/sitemap)
 */
export async function getPillarArticles(
  options: {
    limit?: number;
    category?: ArticleCategory;
  } = {},
): Promise<Article[]> {
  const { limit = 20, category } = options;
  const supabase = getUntypedServiceClient();

  if (!supabase) {
    return [];
  }

  let query = supabase
    .from("articles")
    .select("*")
    .eq("status", "published")
    .eq("is_pillar_page", true);

  if (category) {
    query = query.eq("category", category);
  }

  const { data, error } = await query
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("[Queries] getPillarArticles error:", error);
    return [];
  }

  return data || [];
}

/**
 * Search articles by keyword
 */
export async function searchArticles(
  keyword: string,
  options: {
    limit?: number;
    offset?: number;
    locale?: "ko" | "en";
  } = {},
): Promise<{ articles: Article[]; total: number }> {
  const { limit = 10, offset = 0, locale = "en" } = options;
  const supabase = getUntypedServiceClient();

  if (!supabase) {
    return { articles: [], total: 0 };
  }

  const titleColumn = locale === "ko" ? "title_ko" : "title_en";
  const contentColumn = locale === "ko" ? "content_ko" : "content_en";

  const { data, error, count } = await supabase
    .from("articles")
    .select("*", { count: "exact" })
    .eq("status", "published")
    .or(`${titleColumn}.ilike.%${keyword}%,${contentColumn}.ilike.%${keyword}%`)
    .order("published_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error("[Queries] searchArticles error:", error);
    return { articles: [], total: 0 };
  }

  return {
    articles: data || [],
    total: count || 0,
  };
}

/**
 * Get all published article slugs (for sitemap)
 */
export async function getAllArticleSlugs(): Promise<
  { slug: string; category: string; updated_at: string }[]
> {
  const supabase = getUntypedServiceClient();

  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("articles")
    .select("slug, category, updated_at")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("[Queries] getAllArticleSlugs error:", error);
    return [];
  }

  return data || [];
}

/**
 * Get article categories with counts
 */
export async function getCategoryStats(): Promise<
  { category: string; count: number }[]
> {
  const supabase = getUntypedServiceClient();

  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("articles")
    .select("category")
    .eq("status", "published");

  if (error) {
    console.error("[Queries] getCategoryStats error:", error);
    return [];
  }

  // Count by category
  const counts = (data || []).reduce(
    (acc, article) => {
      const cat = article.category || "uncategorized";
      acc[cat] = (acc[cat] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  return Object.entries(counts).map(([category, count]) => ({
    category,
    count,
  }));
}

/**
 * Increment article view count
 */
export async function incrementArticleView(articleId: string): Promise<void> {
  const supabase = getUntypedServiceClient();

  if (!supabase) {
    return;
  }

  const { error } = await supabase.rpc("increment_article_views", {
    p_article_id: articleId,
  });

  if (error) {
    console.error("[Queries] incrementArticleView error:", error);
  }
}
