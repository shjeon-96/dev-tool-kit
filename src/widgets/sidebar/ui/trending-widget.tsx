import Link from "next/link";
import { TrendingUp, ArrowRight, Clock } from "lucide-react";
import { getTrendingArticles, type Article } from "@/entities/trend";

interface TrendingWidgetProps {
  locale: string;
  limit?: number;
  excludeId?: string;
}

// Category accent colors
const CATEGORY_ACCENTS: Record<string, string> = {
  tech: "text-blue-600 dark:text-blue-400",
  business: "text-emerald-600 dark:text-emerald-400",
  lifestyle: "text-pink-600 dark:text-pink-400",
  entertainment: "text-purple-600 dark:text-purple-400",
  trending: "text-orange-600 dark:text-orange-400",
  news: "text-slate-600 dark:text-slate-400",
};

// Helper to get localized content
function getLocalizedTitle(article: Article, locale: string): string {
  if (locale === "ko") {
    return article.title_ko || article.title_en || "";
  }
  return article.title_en || article.title_ko || "";
}

/**
 * TrendingWidget - Displays trending articles for sidebar
 * Server component that fetches trending articles
 */
export async function TrendingWidget({
  locale,
  limit = 5,
  excludeId,
}: TrendingWidgetProps) {
  const articles = await getTrendingArticles(limit + 1);

  // Filter out excluded article if provided
  const filteredArticles = excludeId
    ? articles.filter((a) => a.id !== excludeId).slice(0, limit)
    : articles.slice(0, limit);

  if (filteredArticles.length === 0) {
    return null;
  }

  const isKorean = locale === "ko";

  return (
    <div className="p-4 rounded-xl border bg-card">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center">
          <TrendingUp className="w-4 h-4 text-orange-600 dark:text-orange-400" />
        </div>
        <h3 className="font-semibold text-sm">
          {isKorean ? "인기 기사" : "Trending Now"}
        </h3>
      </div>

      {/* Article List */}
      <div className="space-y-3">
        {filteredArticles.map((article, index) => {
          const accentColor =
            CATEGORY_ACCENTS[article.category] || CATEGORY_ACCENTS.news;

          return (
            <Link
              key={article.id}
              href={`/${locale}/${article.category}/${article.slug}`}
              className="group block"
            >
              <article className="flex gap-3 p-2 -mx-2 rounded-lg hover:bg-secondary/50 transition-colors">
                {/* Rank Number */}
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-foreground/5 text-muted-foreground flex items-center justify-center text-xs font-semibold">
                  {index + 1}
                </span>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {/* Category */}
                  <span
                    className={`text-[10px] font-semibold uppercase tracking-wider ${accentColor}`}
                  >
                    {article.category}
                  </span>

                  {/* Title */}
                  <h4 className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors mt-0.5">
                    {getLocalizedTitle(article, locale)}
                  </h4>

                  {/* Meta */}
                  <div className="flex items-center gap-2 mt-1 text-[10px] text-muted-foreground">
                    <span className="flex items-center gap-0.5">
                      <Clock className="w-3 h-3" />
                      {article.reading_time_minutes} {isKorean ? "분" : "min"}
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          );
        })}
      </div>

      {/* View All Link */}
      <Link
        href={`/${locale}/trending`}
        className="flex items-center justify-center gap-1 mt-4 pt-3 border-t text-sm text-muted-foreground hover:text-foreground transition-colors group"
      >
        {isKorean ? "전체 보기" : "View All"}
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
      </Link>
    </div>
  );
}
