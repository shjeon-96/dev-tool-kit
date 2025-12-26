/**
 * pSEO Page Factory
 *
 * pSEO 페이지를 생성하는 팩토리 함수
 * generateStaticParams, generateMetadata, Page 컴포넌트를 한 번에 생성
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { routing } from "@/i18n/routing";
import { SITE_CONFIG } from "@/shared/config";
import { getSafeLocaleKey } from "@/shared/lib/i18n";
import {
  BreadcrumbJsonLd,
  SoftwareApplicationJsonLd,
  FaqJsonLd,
} from "@/shared/ui";
import { BreadcrumbNav, FAQSectionSEO, RelatedTools } from "@/shared/ui/seo";
import type {
  PSEOPageProps,
  PSEOPageConfig,
  PSEOPageFactory,
  PSEORegistryItem,
  PSEOContent,
} from "./types";
import {
  getLocalizedText,
  createBreadcrumbItems,
  createOGImageUrl,
  createAlternateLanguages,
} from "./helpers";

/**
 * pSEO 페이지 팩토리
 *
 * @template TSlug - 슬러그 타입
 * @template TItem - 레지스트리 아이템 타입
 * @param config - pSEO 페이지 설정
 * @returns generateStaticParams, generateMetadata, Page 컴포넌트
 *
 * @example
 * ```typescript
 * const { generateStaticParams, generateMetadata, Page } = createPSEOPage({
 *   routePrefix: "minify",
 *   paramKey: "type",
 *   getAllSlugs,
 *   getBySlug,
 *   getRelated,
 *   // ...
 * });
 *
 * export { generateStaticParams, generateMetadata };
 * export default Page;
 * ```
 */
export function createPSEOPage<
  TSlug extends string,
  TContent extends PSEOContent,
  TItem extends PSEORegistryItem<TSlug, TContent>,
>(config: PSEOPageConfig<TSlug, TItem>): PSEOPageFactory {
  const {
    routePrefix,
    paramKey,
    getAllSlugs,
    getBySlug,
    getRelated,
    applicationCategory,
    additionalKeywords = [],
    texts,
    Icon,
    ToolComponent,
    renderCustomSections,
    generateFAQs,
  } = config;

  // generateStaticParams
  async function generateStaticParams() {
    const slugs = getAllSlugs();
    return routing.locales.flatMap((locale) =>
      slugs.map((slug) => ({
        locale,
        [paramKey]: slug,
      })),
    );
  }

  // generateMetadata
  async function generateMetadata({
    params,
  }: PSEOPageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const locale = resolvedParams.locale;
    const slug = resolvedParams[paramKey] as string | undefined;

    if (!slug) {
      return { title: texts.notFoundTitle };
    }

    const item = getBySlug(slug);

    if (!item) {
      return { title: texts.notFoundTitle };
    }

    const localeKey = getSafeLocaleKey(locale);
    const content = item.content[localeKey] || item.content.en;

    const ogImageUrl = createOGImageUrl(
      content.metaTitle,
      content.metaDescription,
    );

    return {
      title: content.metaTitle,
      description: content.metaDescription,
      keywords: [...content.keywords, ...additionalKeywords],
      openGraph: {
        title: content.metaTitle,
        description: content.metaDescription,
        type: "website",
        url: `${SITE_CONFIG.url}/${locale}/${routePrefix}/${slug}`,
        images: [
          { url: ogImageUrl, width: 1200, height: 630, alt: content.title },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: content.metaTitle,
        description: content.metaDescription,
        images: [ogImageUrl],
      },
      alternates: {
        canonical: `${SITE_CONFIG.url}/${locale}/${routePrefix}/${slug}`,
        languages: createAlternateLanguages(routing.locales, routePrefix, slug),
      },
    };
  }

  // Page Component
  async function Page({ params }: PSEOPageProps) {
    const resolvedParams = await params;
    const locale = resolvedParams.locale;
    const slug = resolvedParams[paramKey] as string | undefined;

    if (!slug) {
      notFound();
    }

    setRequestLocale(locale);

    const item = getBySlug(slug);

    if (!item) {
      notFound();
    }

    const localeKey = getSafeLocaleKey(locale);
    const content = item.content[localeKey] || item.content.en;

    const relatedItems = getRelated(slug as TSlug, 6);
    const categoryName = getLocalizedText(texts.categoryName, locale);
    const relatedTitle = getLocalizedText(texts.relatedTitle, locale);

    const breadcrumbItems = createBreadcrumbItems(
      locale,
      categoryName,
      content.title,
      routePrefix,
      slug,
    );

    const faqs = generateFAQs(item, locale);

    return (
      <>
        <BreadcrumbJsonLd items={breadcrumbItems} />
        <SoftwareApplicationJsonLd
          name={content.title}
          description={content.description}
          url={`${SITE_CONFIG.url}/${locale}/${routePrefix}/${slug}`}
          applicationCategory={applicationCategory}
        />
        <FaqJsonLd faqs={faqs} />

        <div className="container max-w-4xl mx-auto py-6">
          {/* Breadcrumb */}
          <BreadcrumbNav locale={locale} items={[{ label: content.title }]} />

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Icon className="h-6 w-6 text-primary" />
              <h1 className="text-2xl md:text-3xl font-bold">
                {content.title}
              </h1>
            </div>
            <p className="text-muted-foreground">{content.description}</p>
          </div>

          {/* Tool */}
          <div className="rounded-lg border p-6 mb-8">
            <ToolComponent item={item} locale={locale} />
          </div>

          {/* SEO Content */}
          <section className="space-y-6 border-t pt-8">
            {/* Custom Sections (if provided) */}
            {renderCustomSections?.(item, locale)}

            {/* FAQ */}
            <FAQSectionSEO locale={locale} faqs={faqs} />

            {/* Related Tools */}
            <RelatedTools
              locale={locale}
              title={relatedTitle}
              routePrefix={routePrefix}
              items={relatedItems}
            />
          </section>
        </div>
      </>
    );
  }

  return {
    generateStaticParams,
    generateMetadata,
    Page,
  };
}
