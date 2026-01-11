import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { getPublishedArticles, type Article } from "@/entities/trend";
import { SITE_CONFIG } from "@/shared/config";
import { AD_SLOTS } from "@/shared/config/ad-slots";
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Newspaper,
} from "lucide-react";
import { AdUnit } from "@/widgets/ad-unit";
import { routing } from "@/i18n/routing";

interface Props {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const isKorean = locale === "ko";

  const title = isKorean
    ? `모든 기사 - ${SITE_CONFIG.title}`
    : `All Articles - ${SITE_CONFIG.title}`;
  const description = isKorean
    ? "최신 트렌드와 뉴스를 한눈에 확인하세요"
    : "Browse all trending articles and news in one place";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/${locale}/articles`,
      type: "website",
    },
    alternates: {
      canonical: `/${locale}/articles`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `/${l}/articles`]),
      ),
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

// Category labels for display
const CATEGORY_LABELS: Record<string, { en: string; ko: string }> = {
  tech: { en: "Tech", ko: "테크" },
  business: { en: "Business", ko: "비즈니스" },
  lifestyle: { en: "Lifestyle", ko: "라이프" },
  entertainment: { en: "Entertainment", ko: "엔터" },
  trending: { en: "Trending", ko: "트렌딩" },
  news: { en: "News", ko: "뉴스" },
};

export default async function ArticlesPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { page } = await searchParams;

  setRequestLocale(locale);

  const isKorean = locale === "ko";
  const currentPage = parseInt(page || "1", 10);
  const pageSize = 13; // 1 featured + 12 grid
  const offset = (currentPage - 1) * pageSize;

  // Fetch all published articles
  const { articles, total } = await getPublishedArticles({
    limit: pageSize,
    offset,
  });

  const totalPages = Math.ceil(total / pageSize);

  // Split articles: first one is featured, rest go in grid
  const featuredArticle = currentPage === 1 ? articles[0] : null;
  const gridArticles = currentPage === 1 ? articles.slice(1) : articles;

  return (
    <div className="space-y-12 paper-texture">
      {/* Page Hero Header */}
      <section className="-mx-6 -mt-6 px-6 pt-10 pb-12 bg-gradient-to-br from-accent/10 via-accent/5 to-transparent">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link
              href={`/${locale}`}
              className="hover:text-foreground transition-colors"
            >
              {isKorean ? "홈" : "Home"}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-accent">
              {isKorean ? "모든 기사" : "All Articles"}
            </span>
          </nav>

          {/* Title and description */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Newspaper className="h-10 w-10 text-accent" />
              <h1 className="text-4xl md:text-5xl font-bold">
                {isKorean ? "모든 기사" : "All Articles"}
              </h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl">
              {isKorean
                ? "매일 업데이트되는 트렌드, 뉴스, 인사이트를 확인하세요"
                : "Discover daily updated trends, news, and insights"}
            </p>
            <div className="flex items-center gap-4 pt-2">
              <span className="text-sm text-muted-foreground">
                {isKorean
                  ? `총 ${total}개의 기사`
                  : `${total} article${total !== 1 ? "s" : ""}`}
              </span>
              {currentPage > 1 && (
                <span className="text-sm text-muted-foreground">
                  • {isKorean ? `${currentPage}페이지` : `Page ${currentPage}`}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article (first page only) */}
      {featuredArticle && (
        <section className="max-w-6xl mx-auto">
          <Link
            href={`/${locale}/${featuredArticle.category}/${featuredArticle.slug}`}
            className="group block"
          >
            <article className="article-card p-8 md:p-10 featured-gradient">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-1 space-y-4">
                  {/* Meta */}
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="category-pill">
                      {CATEGORY_LABELS[featuredArticle.category || "news"]?.[
                        isKorean ? "ko" : "en"
                      ] || featuredArticle.category}
                    </span>
                    <span className="reading-badge">
                      <Clock className="h-3.5 w-3.5" />
                      {featuredArticle.reading_time_minutes}{" "}
                      {isKorean ? "분" : "min"}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl md:text-3xl font-bold leading-tight group-hover:text-accent transition-colors">
                    {getLocalizedContent(featuredArticle, "title", locale)}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-muted-foreground line-clamp-3">
                    {getLocalizedContent(featuredArticle, "excerpt", locale)}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-accent font-medium pt-2 group-hover:gap-4 transition-all">
                    {isKorean ? "읽기" : "Read Article"}
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>

                {/* Date badge */}
                {featuredArticle.published_at && (
                  <div className="md:text-right">
                    <time className="text-sm text-muted-foreground">
                      {new Date(
                        featuredArticle.published_at,
                      ).toLocaleDateString(locale, {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </time>
                  </div>
                )}
              </div>
            </article>
          </Link>
        </section>
      )}

      {/* Ad Unit */}
      <div className="max-w-6xl mx-auto">
        <AdUnit
          slot={AD_SLOTS.CONTENT_TOP}
          format="horizontal"
          className="ad-native"
        />
      </div>

      {/* Articles Grid */}
      {gridArticles.length > 0 ? (
        <section className="max-w-6xl mx-auto">
          <div className="masonry-grid">
            {gridArticles.map((article, index) => {
              // Vary card sizes for visual interest
              const isLarge = index % 5 === 0;

              return (
                <Link
                  key={article.id}
                  href={`/${locale}/${article.category}/${article.slug}`}
                  className="group block"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <article
                    className={`article-card animate-fade-in-up opacity-0 ${isLarge ? "p-6" : "p-5"}`}
                  >
                    {/* Category & Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      <span className="px-2 py-0.5 rounded text-xs bg-accent/10 text-accent font-medium">
                        {CATEGORY_LABELS[article.category || "news"]?.[
                          isKorean ? "ko" : "en"
                        ] || article.category}
                      </span>
                      {article.tags &&
                        article.tags.slice(0, 1).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded text-xs bg-secondary text-secondary-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                    </div>

                    {/* Title */}
                    <h3
                      className={`font-bold leading-snug group-hover:text-accent transition-colors mb-3 ${isLarge ? "text-xl" : "text-lg"} ${isLarge ? "line-clamp-3" : "line-clamp-2"}`}
                    >
                      {getLocalizedContent(article, "title", locale)}
                    </h3>

                    {/* Excerpt for larger cards */}
                    {isLarge && (
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                        {getLocalizedContent(article, "excerpt", locale)}
                      </p>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border/50">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {article.reading_time_minutes} {isKorean ? "분" : "min"}
                      </span>
                      {article.published_at && (
                        <time>
                          {new Date(article.published_at).toLocaleDateString(
                            locale,
                            {
                              month: "short",
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

          {/* Middle Ad - after articles */}
          {gridArticles.length >= 6 && (
            <div className="mt-8">
              <AdUnit
                slot={AD_SLOTS.ARTICLE_MIDDLE}
                format="rectangle"
                className="mx-auto max-w-md"
              />
            </div>
          )}
        </section>
      ) : (
        <section className="max-w-2xl mx-auto">
          <div className="text-center py-16 rounded-2xl border bg-card">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-bold mb-2">
              {isKorean ? "아직 기사가 없습니다" : "No articles yet"}
            </h2>
            <p className="text-muted-foreground mb-6">
              {isKorean
                ? "곧 새로운 콘텐츠가 추가됩니다"
                : "New content coming soon"}
            </p>
            <Link
              href={`/${locale}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              {isKorean ? "홈으로 돌아가기" : "Back to Home"}
            </Link>
          </div>
        </section>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center gap-4">
            {/* Previous */}
            {currentPage > 1 ? (
              <Link
                href={`/${locale}/articles?page=${currentPage - 1}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border bg-card font-medium hover:bg-secondary transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
                {isKorean ? "이전" : "Previous"}
              </Link>
            ) : (
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border bg-muted/50 text-muted-foreground cursor-not-allowed">
                <ChevronLeft className="h-4 w-4" />
                {isKorean ? "이전" : "Previous"}
              </span>
            )}

            {/* Page indicator */}
            <div className="flex items-center gap-2">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <Link
                    key={pageNum}
                    href={`/${locale}/articles?page=${pageNum}`}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                      pageNum === currentPage
                        ? "bg-foreground text-background"
                        : "border hover:bg-secondary"
                    }`}
                  >
                    {pageNum}
                  </Link>
                );
              })}
            </div>

            {/* Next */}
            {currentPage < totalPages ? (
              <Link
                href={`/${locale}/articles?page=${currentPage + 1}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border bg-card font-medium hover:bg-secondary transition-colors"
              >
                {isKorean ? "다음" : "Next"}
                <ChevronRight className="h-4 w-4" />
              </Link>
            ) : (
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border bg-muted/50 text-muted-foreground cursor-not-allowed">
                {isKorean ? "다음" : "Next"}
                <ChevronRight className="h-4 w-4" />
              </span>
            )}
          </div>
        </nav>
      )}

      {/* Bottom Ad */}
      <div className="max-w-6xl mx-auto">
        <AdUnit slot={AD_SLOTS.PAGE_BOTTOM} format="horizontal" />
      </div>
    </div>
  );
}
