import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import {
  getPublishedArticles,
  getTrendingArticles,
  type Article,
} from "@/entities/trend";
import { SITE_CONFIG } from "@/shared/config";
import { AD_SLOTS } from "@/shared/config/ad-slots";
import { ArrowRight, Clock, Sparkles } from "lucide-react";
import { AdUnit } from "@/widgets/ad-unit";
import { routing } from "@/i18n/routing";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const isKorean = locale === "ko";
  const title = isKorean
    ? `${SITE_CONFIG.title} - 트렌딩 뉴스 & 인사이트`
    : `${SITE_CONFIG.title} - Trending News & Insights`;
  const description = isKorean
    ? "최신 트렌드와 유용한 정보를 빠르게 전달합니다"
    : "Your source for trending topics and useful insights";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/${locale}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(routing.locales.map((l) => [l, `/${l}`])),
    },
  };
}

// Helper function to get localized content
function getLocalizedContent(
  article: Article,
  field: "title" | "excerpt" | "content",
  locale: string,
) {
  if (locale === "ko") {
    return article[`${field}_ko`] || article[`${field}_en`];
  }
  return article[`${field}_en`] || article[`${field}_ko`];
}

// Category data with colors
const CATEGORIES = [
  {
    key: "tech",
    labelEn: "Tech",
    labelKo: "테크",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    key: "business",
    labelEn: "Business",
    labelKo: "비즈니스",
    gradient: "from-emerald-500/20 to-green-500/20",
  },
  {
    key: "lifestyle",
    labelEn: "Lifestyle",
    labelKo: "라이프",
    gradient: "from-pink-500/20 to-rose-500/20",
  },
  {
    key: "entertainment",
    labelEn: "Entertainment",
    labelKo: "엔터",
    gradient: "from-purple-500/20 to-violet-500/20",
  },
  {
    key: "trending",
    labelEn: "Trending",
    labelKo: "트렌딩",
    gradient: "from-orange-500/20 to-amber-500/20",
  },
  {
    key: "news",
    labelEn: "News",
    labelKo: "뉴스",
    gradient: "from-slate-500/20 to-gray-500/20",
  },
];

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const isKorean = locale === "ko";

  // Fetch articles from Supabase
  const [{ articles: latestArticles }, trendingArticles] = await Promise.all([
    getPublishedArticles({ limit: 12 }),
    getTrendingArticles(6),
  ]);

  // Featured article (first trending or first latest)
  const featuredArticle = trendingArticles[0] || latestArticles[0];
  const remainingTrending = trendingArticles.slice(1, 5);
  const gridArticles = latestArticles.slice(0, 6);

  return (
    <div className="space-y-16 paper-texture">
      {/* Hero Section - Editorial Magazine Style */}
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

          {featuredArticle ? (
            <Link
              href={`/${locale}/${featuredArticle.category}/${featuredArticle.slug}`}
              className="group block"
            >
              <article className="relative p-8 md:p-12 rounded-2xl border featured-gradient overflow-hidden">
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-bl-[100px]" />

                <div className="relative space-y-6">
                  {/* Meta */}
                  <div className="flex items-center gap-4 flex-wrap">
                    <span className="category-pill">
                      {featuredArticle.category}
                    </span>
                    <span className="reading-badge">
                      <Clock className="h-3.5 w-3.5" />
                      {featuredArticle.reading_time_minutes}{" "}
                      {isKorean ? "분" : "min"}
                    </span>
                    {featuredArticle.published_at && (
                      <time className="text-xs text-muted-foreground">
                        {new Date(
                          featuredArticle.published_at,
                        ).toLocaleDateString(locale, {
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
                      {getLocalizedContent(featuredArticle, "title", locale)}
                    </span>
                  </h1>

                  {/* Excerpt */}
                  <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
                    {getLocalizedContent(featuredArticle, "excerpt", locale)}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-accent font-semibold pt-4 group-hover:gap-4 transition-all duration-300">
                    {isKorean ? "전체 기사 읽기" : "Read Full Article"}
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </div>
              </article>
            </Link>
          ) : (
            <div className="text-center py-20">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance mb-6">
                {isKorean
                  ? "최신 트렌드 & 인사이트"
                  : "Latest Trends & Insights"}
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {isKorean
                  ? "매일 업데이트되는 트렌딩 뉴스와 유용한 정보를 확인하세요"
                  : "Stay updated with daily trending news and useful information"}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Trending Section - Editorial Numbered List */}
      {remainingTrending.length > 0 && (
        <section className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-1 h-8 bg-accent rounded-full" />
              <h2 className="text-2xl font-bold">
                {isKorean ? "인기 급상승" : "Trending Now"}
              </h2>
              <span className="pulse-subtle inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent/10 text-accent text-xs font-semibold">
                LIVE
              </span>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {remainingTrending.map((article, index) => (
              <Link
                key={article.id}
                href={`/${locale}/${article.category}/${article.slug}`}
                className="group"
              >
                <article className="article-card p-5 flex gap-4">
                  {/* Trending Number */}
                  <div className="trending-number flex-shrink-0">
                    {index + 2}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-muted-foreground uppercase tracking-wider">
                        {article.category}
                      </span>
                      <span className="text-muted-foreground/50">•</span>
                      <span className="text-muted-foreground">
                        {article.reading_time_minutes} {isKorean ? "분" : "min"}
                      </span>
                    </div>
                    <h3 className="font-semibold text-lg leading-snug line-clamp-2 group-hover:text-accent transition-colors">
                      {getLocalizedContent(article, "title", locale)}
                    </h3>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Ad Unit - Native Style */}
      <div className="max-w-6xl mx-auto">
        <AdUnit
          slot={AD_SLOTS.CONTENT_TOP}
          format="horizontal"
          className="ad-native"
        />
      </div>

      {/* Latest Articles - Bento Grid */}
      <section className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-1 h-8 bg-foreground rounded-full" />
            <h2 className="text-2xl font-bold">
              {isKorean ? "최신 기사" : "Latest Articles"}
            </h2>
          </div>
          <Link
            href={`/${locale}/articles`}
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-accent transition-colors"
          >
            {isKorean ? "모든 기사" : "View All"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {gridArticles.length > 0 ? (
          <div className="bento-grid">
            {gridArticles.map((article, index) => {
              // Bento layout: first item large, rest alternating sizes
              const sizeClass =
                index === 0
                  ? "bento-item-large"
                  : index < 3
                    ? "bento-item-small"
                    : "bento-item-medium";

              const isLarge = index === 0;

              return (
                <Link
                  key={article.id}
                  href={`/${locale}/${article.category}/${article.slug}`}
                  className={`group ${sizeClass}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <article
                    className={`article-card h-full ${isLarge ? "p-8" : "p-5"} flex flex-col animate-fade-in-up opacity-0`}
                  >
                    {/* Category & Time */}
                    <div className="flex items-center gap-2 text-xs mb-3">
                      <span className="px-2 py-1 rounded bg-secondary text-secondary-foreground uppercase tracking-wider font-medium">
                        {article.category}
                      </span>
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {article.reading_time_minutes} {isKorean ? "분" : "min"}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      className={`font-bold leading-snug group-hover:text-accent transition-colors ${isLarge ? "text-2xl md:text-3xl mb-4" : "text-lg mb-2"} ${isLarge ? "line-clamp-3" : "line-clamp-2"}`}
                    >
                      {getLocalizedContent(article, "title", locale)}
                    </h3>

                    {/* Excerpt - only for large items */}
                    {isLarge && (
                      <p className="text-muted-foreground line-clamp-3 mb-4 flex-1">
                        {getLocalizedContent(article, "excerpt", locale)}
                      </p>
                    )}

                    {/* Date */}
                    <div className="mt-auto pt-3 border-t border-border/50">
                      {article.published_at && (
                        <time className="text-xs text-muted-foreground">
                          {new Date(article.published_at).toLocaleDateString(
                            locale,
                            {
                              month: "long",
                              day: "numeric",
                            },
                          )}
                        </time>
                      )}
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 rounded-2xl border bg-card">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-2">
              {isKorean
                ? "곧 새로운 콘텐츠가 추가됩니다"
                : "New Content Coming Soon"}
            </h3>
            <p className="text-muted-foreground">
              {isKorean
                ? "흥미로운 기사들이 준비 중입니다"
                : "Exciting articles are being prepared"}
            </p>
          </div>
        )}
      </section>

      {/* Middle Ad */}
      <div className="max-w-md mx-auto">
        <AdUnit slot={AD_SLOTS.ARTICLE_MIDDLE} format="rectangle" />
      </div>

      {/* Categories - Editorial Navigation */}
      <section className="max-w-6xl mx-auto">
        <div className="divider-editorial mb-10">
          <span className="section-label px-4">
            {isKorean ? "카테고리 탐색" : "Browse by Category"}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {CATEGORIES.map((category, index) => (
            <Link
              key={category.key}
              href={`/${locale}/${category.key}`}
              className="group"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div
                className={`relative p-6 rounded-xl border bg-gradient-to-br ${category.gradient} overflow-hidden transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-lg group-hover:border-accent/50 animate-fade-in-up opacity-0`}
              >
                {/* Decorative element */}
                <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full bg-foreground/5" />

                <span className="relative font-semibold text-sm">
                  {isKorean ? category.labelKo : category.labelEn}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter CTA - Editorial Style */}
      <section className="max-w-4xl mx-auto">
        <div className="relative p-10 md:p-14 rounded-2xl border bg-card overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 mesh-gradient opacity-50" />

          <div className="relative text-center space-y-6">
            <span className="section-label">
              {isKorean ? "새 소식 받기" : "Stay Updated"}
            </span>

            <h2 className="text-3xl md:text-4xl font-bold text-balance">
              {isKorean ? "트렌드를 놓치지 마세요" : "Never Miss a Trend"}
            </h2>

            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              {isKorean
                ? "매일 새로운 인사이트와 트렌딩 토픽을 확인하세요"
                : "Discover fresh insights and trending topics every day"}
            </p>

            <Link
              href={`/${locale}/articles`}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-foreground text-background font-semibold hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover:gap-4"
            >
              {isKorean ? "모든 기사 보기" : "Explore All Articles"}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom Ad */}
      <div className="max-w-6xl mx-auto">
        <AdUnit slot={AD_SLOTS.PAGE_BOTTOM} format="horizontal" />
      </div>
    </div>
  );
}
