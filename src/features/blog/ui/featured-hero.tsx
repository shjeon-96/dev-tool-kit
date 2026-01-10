import Link from "next/link";
import { Clock, ArrowRight, Sparkles } from "lucide-react";

export interface FeaturedHeroProps {
  slug: string;
  category: string;
  title: string;
  excerpt?: string;
  readingTime: number;
  publishedAt?: string;
  locale: string;
}

export function FeaturedHero({
  slug,
  category,
  title,
  excerpt,
  readingTime,
  publishedAt,
  locale,
}: FeaturedHeroProps) {
  const isKorean = locale === "ko";

  return (
    <section className="hero-editorial -mx-6 -mt-6 px-6 pt-12 pb-16">
      <div className="max-w-6xl mx-auto">
        {/* Section Label */}
        <div className="flex items-center gap-3 mb-8">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
          <span className="section-label flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-accent" />
            {isKorean ? "오늘의 하이라이트" : "Today's Highlight"}
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>

        <Link
          href={`/${locale}/${category}/${slug}`}
          className="group block"
        >
          <article className="relative p-8 md:p-12 rounded-2xl border featured-gradient overflow-hidden">
            {/* Decorative corner accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-bl-[100px]" />

            <div className="relative space-y-6">
              {/* Meta */}
              <div className="flex items-center gap-4 flex-wrap">
                <span className="category-pill">
                  {category}
                </span>
                <span className="reading-badge">
                  <Clock className="h-3.5 w-3.5" />
                  {readingTime} {isKorean ? "분" : "min"}
                </span>
                {publishedAt && (
                  <time className="text-xs text-muted-foreground">
                    {new Date(publishedAt).toLocaleDateString(locale, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>
                )}
              </div>

              {/* Title with animated underline */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-balance">
                <span className="hero-title">
                  {title}
                </span>
              </h1>

              {/* Excerpt */}
              {excerpt && (
                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
                  {excerpt}
                </p>
              )}

              {/* CTA */}
              <div className="flex items-center gap-2 text-accent font-semibold pt-4 group-hover:gap-4 transition-all duration-300">
                {isKorean ? "전체 기사 읽기" : "Read Full Article"}
                <ArrowRight className="h-5 w-5" />
              </div>
            </div>
          </article>
        </Link>
      </div>
    </section>
  );
}

// Empty state when no featured article
export function FeaturedHeroEmpty({ locale }: { locale: string }) {
  const isKorean = locale === "ko";

  return (
    <section className="hero-editorial -mx-6 -mt-6 px-6 pt-12 pb-16">
      <div className="max-w-6xl mx-auto text-center py-20">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance mb-6">
          {isKorean ? "최신 트렌드 & 인사이트" : "Latest Trends & Insights"}
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {isKorean
            ? "매일 업데이트되는 트렌딩 뉴스와 유용한 정보를 확인하세요"
            : "Stay updated with daily trending news and useful information"}
        </p>
      </div>
    </section>
  );
}
