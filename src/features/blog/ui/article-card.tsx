import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";

export interface ArticleCardProps {
  id: string;
  slug: string;
  category: string;
  title: string;
  excerpt?: string;
  readingTime: number;
  publishedAt?: string;
  tags?: string[];
  locale: string;
  variant?: "default" | "large" | "compact";
  showExcerpt?: boolean;
  showTags?: boolean;
  showReadMore?: boolean;
  className?: string;
  style?: React.CSSProperties;
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

export function ArticleCard({
  slug,
  category,
  title,
  excerpt,
  readingTime,
  publishedAt,
  tags,
  locale,
  variant = "default",
  showExcerpt = false,
  showTags = false,
  showReadMore = false,
  className = "",
  style,
}: ArticleCardProps) {
  const isKorean = locale === "ko";
  const isLarge = variant === "large";
  const isCompact = variant === "compact";
  const accentColor = CATEGORY_ACCENTS[category] || CATEGORY_ACCENTS.news;

  return (
    <Link
      href={`/${locale}/${category}/${slug}`}
      className={`group block ${className}`}
      style={style}
    >
      <article
        className={`article-card h-full flex flex-col animate-fade-in-up opacity-0 ${
          isLarge ? "p-6 md:p-8" : isCompact ? "p-4" : "p-5"
        }`}
      >
        {/* Tags */}
        {showTags && tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded text-xs bg-secondary text-secondary-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Category & Time */}
        <div className="flex items-center gap-2 text-xs mb-3">
          <span className={`font-semibold uppercase tracking-wider ${accentColor}`}>
            {category}
          </span>
          <span className="text-muted-foreground/50">•</span>
          <span className="text-muted-foreground flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {readingTime} {isKorean ? "분" : "min"}
          </span>
        </div>

        {/* Title */}
        <h3
          className={`font-bold leading-snug group-hover:text-accent transition-colors ${
            isLarge
              ? "text-xl md:text-2xl mb-4 line-clamp-3"
              : isCompact
                ? "text-base mb-2 line-clamp-2"
                : "text-lg mb-2 line-clamp-2"
          }`}
        >
          {title}
        </h3>

        {/* Excerpt */}
        {showExcerpt && excerpt && (
          <p
            className={`text-muted-foreground flex-1 ${
              isLarge ? "text-base line-clamp-3 mb-4" : "text-sm line-clamp-2 mb-3"
            }`}
          >
            {excerpt}
          </p>
        )}

        {/* Footer */}
        <div className="mt-auto pt-3 border-t border-border/50 flex items-center justify-between">
          {publishedAt && (
            <time className="text-xs text-muted-foreground">
              {new Date(publishedAt).toLocaleDateString(locale, {
                month: isLarge ? "long" : "short",
                day: "numeric",
                ...(isLarge && { year: "numeric" }),
              })}
            </time>
          )}

          {showReadMore && (
            <div className="flex items-center gap-1 text-accent text-sm font-medium group-hover:gap-2 transition-all">
              {isKorean ? "읽기" : "Read"}
              <ArrowRight className="h-3.5 w-3.5" />
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
