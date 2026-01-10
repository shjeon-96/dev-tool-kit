import Link from "next/link";

export interface TrendingCardProps {
  slug: string;
  category: string;
  title: string;
  readingTime: number;
  locale: string;
  rank: number;
  className?: string;
}

export function TrendingCard({
  slug,
  category,
  title,
  readingTime,
  locale,
  rank,
  className = "",
}: TrendingCardProps) {
  const isKorean = locale === "ko";

  return (
    <Link
      href={`/${locale}/${category}/${slug}`}
      className={`group ${className}`}
    >
      <article className="article-card p-5 flex gap-4">
        {/* Trending Number */}
        <div className="trending-number flex-shrink-0">
          {rank}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-muted-foreground uppercase tracking-wider">
              {category}
            </span>
            <span className="text-muted-foreground/50">•</span>
            <span className="text-muted-foreground">
              {readingTime} {isKorean ? "분" : "min"}
            </span>
          </div>
          <h3 className="font-semibold text-lg leading-snug line-clamp-2 group-hover:text-accent transition-colors">
            {title}
          </h3>
        </div>
      </article>
    </Link>
  );
}
