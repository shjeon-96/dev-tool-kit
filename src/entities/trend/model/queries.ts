// Article Query Functions
// Server-side queries for fetching articles from Supabase

import { createClient } from "@supabase/supabase-js";
import type { Article, ArticleCategory } from "./types";

// Create Supabase client for server-side queries
// Returns null if env vars are not available (e.g., during CI build)
function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return null;
  }

  return createClient(supabaseUrl, supabaseKey);
}

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
  const supabase = getSupabaseClient();

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
  const supabase = getSupabaseClient();

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
  const supabase = getSupabaseClient();

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
  const supabase = getSupabaseClient();

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
 * Get related articles based on tags and category
 */
export async function getRelatedArticles(
  articleId: string,
  options: {
    limit?: number;
    tags?: string[];
    category?: ArticleCategory;
  } = {},
): Promise<Article[]> {
  const { limit = 4, tags = [], category } = options;
  const supabase = getSupabaseClient();

  if (!supabase) {
    return [];
  }

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
  const supabase = getSupabaseClient();

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
  const supabase = getSupabaseClient();

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
  const supabase = getSupabaseClient();

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
  const supabase = getSupabaseClient();

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
