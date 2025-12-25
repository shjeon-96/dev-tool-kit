import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Suspense } from "react";
import {
  tools,
  type ToolSlug,
  RelatedToolsSSR,
  ToolFeatureCards,
} from "@/entities/tool";
import {
  BreadcrumbJsonLd,
  FaqJsonLd,
  SoftwareApplicationJsonLd,
  AdUnit,
  SmartInternalLinks,
  ToolVisitRecorder,
} from "@/shared/ui";
import { SITE_CONFIG, AD_SLOTS } from "@/shared/config";
import { ToolRenderer } from "./tool-renderer";
import { ToolSeoSection } from "./tool-seo-section";
import { ToolHeaderActions } from "./tool-header-actions";
import { EmbedWrapper } from "./embed-wrapper";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  const toolSlugs = Object.keys(tools);
  return toolSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const tool = tools[slug as ToolSlug];

  if (!tool) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "tools" });

  const title = t(`${slug as ToolSlug}.title`);
  const description = t(`${slug as ToolSlug}.description`);

  // Generate keywords based on title and common variations
  const keywords = [
    title,
    t(`${slug as ToolSlug}.title`).toLowerCase(),
    "developer tools",
    "web toolkit",
    "online tool",
    "free",
    "privacy focused",
    "offline capable",
  ];

  // 도구별 특화 동적 OG 이미지 URL 사용
  const ogImageUrl = `/api/og/${slug}?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`;

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: `/${locale}/tools/${slug}`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: `/${locale}/tools/${slug}`,
      languages: {
        en: `/en/tools/${slug}`,
        ko: `/ko/tools/${slug}`,
        ja: `/ja/tools/${slug}`,
      },
    },
  };
}

export default async function ToolPage({ params }: Props) {
  const { locale, slug } = await params;
  const tool = tools[slug as ToolSlug];

  if (!tool) {
    notFound();
  }

  setRequestLocale(locale);

  const t = await getTranslations("tools");
  const tSeo = await getTranslations("seo");
  const tBreadcrumb = await getTranslations("seo.breadcrumb");

  const title = t(`${slug as ToolSlug}.title`);
  const description = t(`${slug as ToolSlug}.description`);

  const breadcrumbItems = [
    { name: tBreadcrumb("home"), url: SITE_CONFIG.url },
    { name: tBreadcrumb("tools"), url: `${SITE_CONFIG.url}/${locale}/tools` },
    {
      name: title,
      url: `${SITE_CONFIG.url}/${locale}/tools/${slug}`,
    },
  ];

  // Get FAQ & Features from translations if available
  let faqItems: { q: string; a: string }[] = [];
  let featureList: string[] = [];

  try {
    const rawContent = tSeo.raw(slug as string);
    if (rawContent && typeof rawContent === "object") {
      const content = rawContent as Record<string, unknown>;
      if (Array.isArray(content.faq)) {
        faqItems = content.faq as { q: string; a: string }[];
      }
      if (Array.isArray(content.features)) {
        featureList = content.features as string[];
      }
    }
  } catch {
    // Content not available for this tool
  }

  const toolUrl = `${SITE_CONFIG.url}/${locale}/tools/${slug}`;

  // 도구 렌더러 (embed 모드에서 단독 사용)
  const toolRenderer = <ToolRenderer slug={slug as ToolSlug} />;

  return (
    <Suspense
      fallback={<div className="rounded-lg border p-6">{toolRenderer}</div>}
    >
      <EmbedWrapper toolContent={toolRenderer}>
        {/* 일반 모드: 전체 페이지 콘텐츠 */}
        <>
          <BreadcrumbJsonLd items={breadcrumbItems} />
          <SoftwareApplicationJsonLd
            name={title}
            description={description}
            url={toolUrl}
            applicationCategory="DeveloperApplication"
            featureList={featureList}
          />
          {faqItems.length > 0 && <FaqJsonLd faqs={faqItems} />}

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                  <tool.icon className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
                  <p className="text-muted-foreground">{description}</p>
                </div>
              </div>
              <ToolHeaderActions slug={slug as ToolSlug} />
            </div>

            <div className="rounded-lg border p-6">{toolRenderer}</div>

            {/* 광고: 도구 결과 하단 (골든존) */}
            <AdUnit
              slot={AD_SLOTS.TOOL_RESULT}
              format="horizontal"
              className="my-6"
            />

            {/* Visual Feature Cards */}
            {featureList.length > 0 && (
              <ToolFeatureCards features={featureList} />
            )}

            <ToolSeoSection slug={slug as ToolSlug} locale={locale} />

            {/* 광고: 콘텐츠 하단 */}
            <AdUnit
              slot={AD_SLOTS.CONTENT_BOTTOM}
              format="rectangle"
              className="my-6"
            />

            {/* SSR 관련 도구 링크 - 크롤러 친화적 */}
            <RelatedToolsSSR currentTool={slug as ToolSlug} locale={locale} />

            {/* 클라이언트 사이드 스마트 링크 - 사용자 경험 향상 */}
            <SmartInternalLinks currentTool={slug as ToolSlug} />
            <ToolVisitRecorder slug={slug as ToolSlug} />
          </div>
        </>
      </EmbedWrapper>
    </Suspense>
  );
}
