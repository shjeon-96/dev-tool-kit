import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import {
  getArticleBySlug,
  getRelatedArticles,
  getAllArticleSlugs,
  type Article,
  type ArticleCategory,
  type ArticleFAQ,
} from "@/entities/trend";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/shared/ui";
import { SITE_CONFIG } from "@/shared/config";
import { AD_SLOTS } from "@/shared/config/ad-slots";
import {
  Clock,
  ArrowLeft,
  Calendar,
  ChevronRight,
  ArrowRight,
  Sparkles,
  HelpCircle,
  CheckCircle,
} from "lucide-react";
import { AdUnit } from "@/widgets/ad-unit";
import { routing } from "@/i18n/routing";
import { ArticleContent } from "./article-content";
import { ShareButton } from "./share-button";

// Category styling for hero sections
const CATEGORY_STYLES: Record<string, { gradient: string; accent: string }> = {
  tech: {
    gradient: "from-blue-500/15 via-cyan-500/10 to-transparent",
    accent: "text-blue-600 dark:text-blue-400",
  },
  business: {
    gradient: "from-emerald-500/15 via-green-500/10 to-transparent",
    accent: "text-emerald-600 dark:text-emerald-400",
  },
  lifestyle: {
    gradient: "from-pink-500/15 via-rose-500/10 to-transparent",
    accent: "text-pink-600 dark:text-pink-400",
  },
  entertainment: {
    gradient: "from-purple-500/15 via-violet-500/10 to-transparent",
    accent: "text-purple-600 dark:text-purple-400",
  },
  trending: {
    gradient: "from-orange-500/15 via-amber-500/10 to-transparent",
    accent: "text-orange-600 dark:text-orange-400",
  },
  news: {
    gradient: "from-slate-500/15 via-gray-500/10 to-transparent",
    accent: "text-slate-600 dark:text-slate-400",
  },
};

interface Props {
  params: Promise<{ locale: string; category: string; slug: string }>;
}

// Generate static params for all articles
export async function generateStaticParams() {
  // Skip during CI build when Supabase env vars are not available
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return [];
  }

  const articles = await getAllArticleSlugs();

  return routing.locales.flatMap((locale) =>
    articles.map((article) => ({
      locale,
      category: article.category,
      slug: article.slug,
    })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;

  const article = await getArticleBySlug(slug);
  if (!article) {
    return {};
  }

  const isKorean = locale === "ko";
  const title = isKorean ? article.title_ko : article.title_en;
  const description = isKorean
    ? article.excerpt_ko || article.meta_description_ko
    : article.excerpt_en || article.meta_description_en;

  return {
    title: `${title} - ${SITE_CONFIG.title}`,
    description: description || "",
    keywords: article.seo_keywords?.join(", "),
    openGraph: {
      title,
      description: description || "",
      url: `/${locale}/${article.category}/${slug}`,
      type: "article",
      publishedTime: article.published_at || undefined,
      tags: article.tags,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: description || "",
    },
    alternates: {
      canonical: `/${locale}/${article.category}/${slug}`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `/${l}/${article.category}/${slug}`]),
      ),
    },
  };
}

// Helper function to get localized content
function getLocalizedContent(
  article: Article,
  field: "title" | "excerpt" | "content",
  locale: string,
): string {
  if (locale === "ko") {
    return article[`${field}_ko`] || article[`${field}_en`] || "";
  }
  return article[`${field}_en`] || article[`${field}_ko`] || "";
}

// Helper function to get localized FAQs
function getLocalizedFaqs(
  faqs: ArticleFAQ[] | null,
  locale: string,
): { q: string; a: string }[] {
  if (!faqs || faqs.length === 0) return [];
  return faqs.map((faq) => ({
    q: locale === "ko" ? faq.question_ko : faq.question_en,
    a: locale === "ko" ? faq.answer_ko : faq.answer_en,
  }));
}

// Helper function to get localized key takeaways
function getLocalizedTakeaways(article: Article, locale: string): string[] {
  if (locale === "ko") {
    return article.key_takeaways_ko || article.key_takeaways_en || [];
  }
  return article.key_takeaways_en || article.key_takeaways_ko || [];
}

// Category labels
const CATEGORY_LABELS: Record<string, { en: string; ko: string }> = {
  tech: { en: "Technology", ko: "테크놀로지" },
  business: { en: "Business", ko: "비즈니스" },
  lifestyle: { en: "Lifestyle", ko: "라이프스타일" },
  entertainment: { en: "Entertainment", ko: "엔터테인먼트" },
  trending: { en: "Trending", ko: "트렌딩" },
  news: { en: "News", ko: "뉴스" },
};

export default async function ArticlePage({ params }: Props) {
  const { locale, category, slug } = await params;
  setRequestLocale(locale);

  const article = await getArticleBySlug(slug);

  if (!article || article.category !== category) {
    notFound();
  }

  const isKorean = locale === "ko";

  // Fetch related articles
  const relatedArticles = await getRelatedArticles(article.id, {
    limit: 4,
    tags: article.tags,
    category: article.category as ArticleCategory,
  });

  const title = getLocalizedContent(article, "title", locale);
  const excerpt = getLocalizedContent(article, "excerpt", locale);
  const content = getLocalizedContent(article, "content", locale);
  const categoryStyle = CATEGORY_STYLES[category] || CATEGORY_STYLES.news;
  const categoryLabel = CATEGORY_LABELS[category] || CATEGORY_LABELS.news;

  // SEO-enhanced content
  const faqs = getLocalizedFaqs(article.faqs, locale);
  const keyTakeaways = getLocalizedTakeaways(article, locale);

  // Breadcrumb items for schema
  const breadcrumbItems = [
    { name: isKorean ? "홈" : "Home", url: `${SITE_CONFIG.url}/${locale}` },
    {
      name: isKorean ? categoryLabel.ko : categoryLabel.en,
      url: `${SITE_CONFIG.url}/${locale}/${category}`,
    },
    { name: title, url: `${SITE_CONFIG.url}/${locale}/${category}/${slug}` },
  ];

  return (
    <div className="paper-texture">
      {/* Article Hero - Full Width Immersive Header */}
      <header
        className={`-mx-6 -mt-6 px-6 pt-8 pb-12 bg-gradient-to-br ${categoryStyle.gradient}`}
      >
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link
              href={`/${locale}`}
              className="hover:text-foreground transition-colors"
            >
              {isKorean ? "홈" : "Home"}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link
              href={`/${locale}/${category}`}
              className={`hover:text-foreground transition-colors ${categoryStyle.accent}`}
            >
              {isKorean ? categoryLabel.ko : categoryLabel.en}
            </Link>
          </nav>

          {/* Meta Row */}
          <div className="flex items-center gap-4 flex-wrap mb-6">
            <span className="category-pill">
              {isKorean ? categoryLabel.ko : categoryLabel.en}
            </span>
            <span className="reading-badge">
              <Clock className="h-3.5 w-3.5" />
              {article.reading_time_minutes} {isKorean ? "분" : "min read"}
            </span>
            {article.published_at && (
              <time className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(article.published_at).toLocaleDateString(locale, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            )}
          </div>

          {/* Title - Editorial Serif Style */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold leading-tight text-balance mb-6">
            {title}
          </h1>

          {/* Excerpt / Lead */}
          {excerpt && (
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
              {excerpt}
            </p>
          )}

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap mt-6 pt-6 border-t border-border/50">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-foreground/5 text-muted-foreground hover:bg-foreground/10 transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Top Ad - Native Style */}
      <div className="max-w-4xl mx-auto mt-10">
        <AdUnit
          slot={AD_SLOTS.CONTENT_TOP}
          format="horizontal"
          className="ad-native"
        />
      </div>

      {/* Article Body */}
      <article className="max-w-3xl mx-auto mt-12">
        <ArticleContent content={content} />
      </article>

      {/* Article Footer */}
      <footer className="max-w-4xl mx-auto mt-16 space-y-12">
        {/* Share & Navigation Row */}
        <div className="flex items-center justify-between flex-wrap gap-4 pt-8 border-t border-border">
          <Link
            href={`/${locale}/${category}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border bg-card font-medium hover:bg-secondary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {isKorean ? "목록으로" : "Back to List"}
          </Link>

          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">
              {isKorean ? "공유하기" : "Share"}
            </span>
            <ShareButton title={title} label={isKorean ? "공유" : "Share"} />
          </div>
        </div>

        {/* Related Articles - Editorial Grid */}
        {relatedArticles.length > 0 && (
          <section className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-1 h-8 bg-accent rounded-full" />
              <h2 className="text-2xl font-bold">
                {isKorean ? "관련 기사" : "Related Articles"}
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {relatedArticles.map((related, index) => {
                const relatedStyle =
                  CATEGORY_STYLES[related.category] || CATEGORY_STYLES.news;

                return (
                  <Link
                    key={related.id}
                    href={`/${locale}/${related.category}/${related.slug}`}
                    className="group block"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <article className="article-card p-5 h-full flex flex-col animate-fade-in-up opacity-0">
                      {/* Category & Time */}
                      <div className="flex items-center gap-2 text-xs mb-3">
                        <span
                          className={`font-semibold uppercase tracking-wider ${relatedStyle.accent}`}
                        >
                          {related.category}
                        </span>
                        <span className="text-muted-foreground/50">•</span>
                        <span className="text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {related.reading_time_minutes}{" "}
                          {isKorean ? "분" : "min"}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-semibold text-lg leading-snug line-clamp-2 group-hover:text-accent transition-colors mb-2">
                        {getLocalizedContent(related, "title", locale)}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-sm text-muted-foreground line-clamp-2 flex-1">
                        {getLocalizedContent(related, "excerpt", locale)}
                      </p>

                      {/* Read more */}
                      <div className="flex items-center gap-1 text-accent text-sm font-medium mt-4 group-hover:gap-2 transition-all">
                        {isKorean ? "읽기" : "Read"}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Key Takeaways Section */}
        {keyTakeaways.length > 0 && (
          <section className="p-6 md:p-8 rounded-2xl border bg-gradient-to-br from-emerald-50/50 to-teal-50/50 dark:from-emerald-950/20 dark:to-teal-950/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h2 className="text-xl font-bold">
                {isKorean ? "핵심 요약" : "Key Takeaways"}
              </h2>
            </div>
            <ul className="space-y-3">
              {keyTakeaways.map((takeaway, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 flex items-center justify-center text-sm font-semibold">
                    {index + 1}
                  </span>
                  <span className="text-foreground/80">{takeaway}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* FAQ Section - SEO Rich Snippets */}
        {faqs.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-xl font-bold">
                {isKorean ? "자주 묻는 질문" : "Frequently Asked Questions"}
              </h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details
                  key={index}
                  className="group p-4 rounded-xl border bg-card hover:bg-secondary/50 transition-colors"
                >
                  <summary className="flex items-center justify-between cursor-pointer list-none font-medium">
                    <span className="pr-4">{faq.q}</span>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-open:rotate-90 transition-transform" />
                  </summary>
                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Newsletter CTA */}
        <section className="relative p-8 md:p-10 rounded-2xl border bg-card overflow-hidden">
          <div className="absolute inset-0 mesh-gradient opacity-30" />

          <div className="relative flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-8 h-8 text-accent" />
            </div>

            <div className="flex-1 space-y-2">
              <h3 className="text-xl font-bold">
                {isKorean
                  ? "더 많은 인사이트를 원하세요?"
                  : "Want more insights?"}
              </h3>
              <p className="text-muted-foreground">
                {isKorean
                  ? "최신 트렌드와 분석 기사를 확인하세요"
                  : "Check out our latest trends and analysis articles"}
              </p>
            </div>

            <Link
              href={`/${locale}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background font-semibold hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover:gap-4"
            >
              {isKorean ? "홈으로" : "Explore"}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* Bottom Ad */}
        <AdUnit slot={AD_SLOTS.PAGE_BOTTOM} format="horizontal" />
      </footer>

      {/* JSON-LD Schemas for SEO */}

      {/* NewsArticle Schema - Enhanced */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            headline: title,
            description: excerpt,
            image: `${SITE_CONFIG.url}/api/og?title=${encodeURIComponent(title)}`,
            datePublished: article.published_at,
            dateModified: article.updated_at,
            wordCount:
              locale === "ko" ? article.word_count_ko : article.word_count_en,
            author: {
              "@type": "Organization",
              name: SITE_CONFIG.title,
              url: SITE_CONFIG.url,
              logo: {
                "@type": "ImageObject",
                url: `${SITE_CONFIG.url}/icon.svg`,
              },
            },
            publisher: {
              "@type": "Organization",
              name: SITE_CONFIG.title,
              url: SITE_CONFIG.url,
              logo: {
                "@type": "ImageObject",
                url: `${SITE_CONFIG.url}/icon.svg`,
              },
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `${SITE_CONFIG.url}/${locale}/${category}/${slug}`,
            },
            keywords: article.seo_keywords?.join(", "),
            articleSection: isKorean ? categoryLabel.ko : categoryLabel.en,
            inLanguage: locale === "ko" ? "ko-KR" : "en-US",
            speakable: {
              "@type": "SpeakableSpecification",
              cssSelector: ["article h1", "article p:first-of-type"],
            },
          }),
        }}
      />

      {/* BreadcrumbList Schema */}
      <BreadcrumbJsonLd items={breadcrumbItems} />

      {/* FAQPage Schema - for rich snippets */}
      {faqs.length > 0 && <FaqJsonLd faqs={faqs} />}
    </div>
  );
}
