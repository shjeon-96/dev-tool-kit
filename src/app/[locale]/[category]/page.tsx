import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";
import {
  getArticlesByCategory,
  type Article,
  type ArticleCategory,
} from "@/entities/trend";
import { SITE_CONFIG } from "@/shared/config";
import { AD_SLOTS } from "@/shared/config/ad-slots";
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { AdUnit } from "@/widgets/ad-unit";
import { routing } from "@/i18n/routing";

// Valid categories
const VALID_CATEGORIES: ArticleCategory[] = [
  "tech",
  "business",
  "lifestyle",
  "entertainment",
  "trending",
  "news",
];

// Category visual styling (labels come from i18n)
const CATEGORY_STYLES: Record<
  ArticleCategory,
  { gradient: string; accent: string }
> = {
  tech: {
    gradient: "from-blue-500/10 via-cyan-500/5 to-transparent",
    accent: "text-blue-600 dark:text-blue-400",
  },
  business: {
    gradient: "from-emerald-500/10 via-green-500/5 to-transparent",
    accent: "text-emerald-600 dark:text-emerald-400",
  },
  lifestyle: {
    gradient: "from-pink-500/10 via-rose-500/5 to-transparent",
    accent: "text-pink-600 dark:text-pink-400",
  },
  entertainment: {
    gradient: "from-purple-500/10 via-violet-500/5 to-transparent",
    accent: "text-purple-600 dark:text-purple-400",
  },
  trending: {
    gradient: "from-orange-500/10 via-amber-500/5 to-transparent",
    accent: "text-orange-600 dark:text-orange-400",
  },
  news: {
    gradient: "from-slate-500/10 via-gray-500/5 to-transparent",
    accent: "text-slate-600 dark:text-slate-400",
  },
};

interface Props {
  params: Promise<{ locale: string; category: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    VALID_CATEGORIES.map((category) => ({
      locale,
      category,
    })),
  );
}

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const { locale, category } = await params;
  const { page } = await searchParams;

  if (!VALID_CATEGORIES.includes(category as ArticleCategory)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "category" });
  const isKorean = locale === "ko";

  // Calculate pagination info for SEO
  const currentPage = parseInt(page || "1", 10);
  const pageSize = 13;
  const { total } = await getArticlesByCategory(category as ArticleCategory, {
    limit: 1,
    offset: 0,
  });
  const totalPages = Math.ceil(total / pageSize);

  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;

  const categoryTitle = t(`${category}.title`);
  const categoryDesc = t(`${category}.description`);

  const title = isKorean
    ? `${categoryTitle}${currentPage > 1 ? ` - ${currentPage}페이지` : ""} - ${SITE_CONFIG.title}`
    : `${categoryTitle}${currentPage > 1 ? ` - Page ${currentPage}` : ""} - ${SITE_CONFIG.title}`;
  const description = categoryDesc;

  // Build canonical URL (page 1 has no query param)
  const canonicalPath =
    currentPage > 1
      ? `/${locale}/${category}?page=${currentPage}`
      : `/${locale}/${category}`;

  // Build prev/next URLs for pagination SEO
  const prevUrl = prevPage
    ? prevPage > 1
      ? `${SITE_CONFIG.url}/${locale}/${category}?page=${prevPage}`
      : `${SITE_CONFIG.url}/${locale}/${category}`
    : null;
  const nextUrl = nextPage
    ? `${SITE_CONFIG.url}/${locale}/${category}?page=${nextPage}`
    : null;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: canonicalPath,
      type: "website",
    },
    alternates: {
      canonical: canonicalPath,
      languages: Object.fromEntries(
        routing.locales.map((l) => [
          l,
          currentPage > 1
            ? `/${l}/${category}?page=${currentPage}`
            : `/${l}/${category}`,
        ]),
      ),
    },
    // Pagination SEO: rel="prev" and rel="next"
    other: {
      ...(prevUrl && { "link-prev": prevUrl }),
      ...(nextUrl && { "link-next": nextUrl }),
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

export default async function CategoryPage({ params, searchParams }: Props) {
  const { locale, category } = await params;
  const { page } = await searchParams;

  // Validate category
  if (!VALID_CATEGORIES.includes(category as ArticleCategory)) {
    notFound();
  }

  setRequestLocale(locale);

  const t = await getTranslations("category");
  const tNav = await getTranslations("navigation");
  const tBlog = await getTranslations("blog");
  const isKorean = locale === "ko";
  const currentPage = parseInt(page || "1", 10);
  const pageSize = 13; // 1 featured + 12 grid
  const offset = (currentPage - 1) * pageSize;

  // Fetch articles for this category
  const { articles, total } = await getArticlesByCategory(
    category as ArticleCategory,
    {
      limit: pageSize,
      offset,
    },
  );

  const totalPages = Math.ceil(total / pageSize);
  const styles = CATEGORY_STYLES[category as ArticleCategory];
  const categoryTitle = t(`${category}.title`);
  const categoryDesc = t(`${category}.description`);

  // Split articles: first one is featured, rest go in grid
  const featuredArticle = currentPage === 1 ? articles[0] : null;
  const gridArticles = currentPage === 1 ? articles.slice(1) : articles;

  return (
    <div className="space-y-12 paper-texture">
      {/* Category Hero Header */}
      <section
        className={`-mx-6 -mt-6 px-6 pt-10 pb-12 bg-gradient-to-br ${styles.gradient}`}
      >
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link
              href={`/${locale}`}
              className="hover:text-foreground transition-colors"
            >
              {tNav("home")}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className={styles.accent}>{categoryTitle}</span>
          </nav>

          {/* Title and description */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">{categoryTitle}</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              {categoryDesc}
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
            href={`/${locale}/${category}/${featuredArticle.slug}`}
            className="group block"
          >
            <article className="article-card p-8 md:p-10 featured-gradient">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-1 space-y-4">
                  {/* Meta */}
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="px-3 py-1 rounded-full bg-foreground/10 text-sm font-medium">
                      {tBlog("featured")}
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

      {/* Articles Grid - Masonry Style */}
      {gridArticles.length > 0 ? (
        <section className="max-w-6xl mx-auto">
          <div className="masonry-grid">
            {gridArticles.map((article, index) => {
              // Vary card sizes for visual interest
              const isLarge = index % 5 === 0;

              return (
                <Link
                  key={article.id}
                  href={`/${locale}/${category}/${article.slug}`}
                  className="group block"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <article
                    className={`article-card animate-fade-in-up opacity-0 ${isLarge ? "p-6" : "p-5"}`}
                  >
                    {/* Tags */}
                    {article.tags && article.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {article.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded text-xs bg-secondary text-secondary-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

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
              {isKorean
                ? "이 카테고리에 아직 글이 없습니다"
                : "No articles yet"}
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
                href={`/${locale}/${category}?page=${currentPage - 1}`}
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
                    href={`/${locale}/${category}?page=${pageNum}`}
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
                href={`/${locale}/${category}?page=${currentPage + 1}`}
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
