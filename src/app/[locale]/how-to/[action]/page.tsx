import { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ExternalLink } from "lucide-react";
import { Button, Card, CardContent, CardHeader, CardTitle } from "@/shared/ui";
import { howToGuides, type HowToActionSlug } from "@/entities/how-to";
import { SITE_CONFIG } from "@/shared/config";
import { routing } from "@/i18n/routing";

interface PageProps {
  params: Promise<{
    locale: string;
    action: string;
  }>;
}

// Helper functions
function getAllHowToSlugs(): HowToActionSlug[] {
  return Object.keys(howToGuides) as HowToActionSlug[];
}

function getHowToBySlug(
  slug: string,
): (typeof howToGuides)[HowToActionSlug] | undefined {
  return howToGuides[slug as HowToActionSlug];
}

type LocaleKey = "en" | "ko" | "ja";
function getSafeLocaleKey(locale: string): LocaleKey {
  if (locale === "ko" || locale === "ja") return locale;
  return "en";
}

// 정적 파라미터 생성
export async function generateStaticParams() {
  const actions = getAllHowToSlugs();
  return routing.locales.flatMap((locale) =>
    actions.map((action) => ({ locale, action })),
  );
}

// 메타데이터 생성
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, action } = await params;
  const guide = getHowToBySlug(action);

  if (!guide) {
    return { title: "Guide Not Found" };
  }

  const localeKey = getSafeLocaleKey(locale);
  const title = guide.title[localeKey];
  const description = guide.description[localeKey];

  return {
    title,
    description,
    keywords: guide.keywords,
    openGraph: {
      title,
      description,
      type: "article",
      url: `${SITE_CONFIG.url}/${locale}/how-to/${action}`,
      images: [
        {
          url: `${SITE_CONFIG.url}/api/og/${guide.relatedTool}?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`,
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
    },
    alternates: {
      canonical: `${SITE_CONFIG.url}/${locale}/how-to/${action}`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [
          l,
          `${SITE_CONFIG.url}/${l}/how-to/${action}`,
        ]),
      ),
    },
  };
}

export default async function HowToPage({ params }: PageProps) {
  const { locale, action } = await params;
  setRequestLocale(locale);

  const guide = getHowToBySlug(action);

  if (!guide) {
    notFound();
  }

  const localeKey = getSafeLocaleKey(locale);
  const title = guide.title[localeKey];
  const description = guide.description[localeKey];
  const steps = guide.steps[localeKey];

  // 같은 카테고리의 관련 가이드
  const relatedGuides = getAllHowToSlugs()
    .filter((slug) => {
      if (slug === action) return false;
      const g = getHowToBySlug(slug);
      return g?.category === guide.category;
    })
    .slice(0, 4);

  const i18n = {
    breadcrumbHome:
      locale === "ko" ? "홈" : locale === "ja" ? "ホーム" : "Home",
    breadcrumbGuides:
      locale === "ko" ? "가이드" : locale === "ja" ? "ガイド" : "How-To Guides",
    tryTool:
      locale === "ko"
        ? "도구 사용해보기"
        : locale === "ja"
          ? "ツールを試す"
          : "Try This Tool",
    stepByStep:
      locale === "ko"
        ? "단계별 가이드"
        : locale === "ja"
          ? "ステップバイステップガイド"
          : "Step-by-Step Guide",
    stepPrefix:
      locale === "ko" ? "단계" : locale === "ja" ? "ステップ" : "Step",
    features:
      locale === "ko"
        ? "주요 특징"
        : locale === "ja"
          ? "主な特徴"
          : "Key Features",
    feature1:
      locale === "ko"
        ? "100% 브라우저 처리 - 데이터가 서버로 전송되지 않음"
        : locale === "ja"
          ? "100%ブラウザ処理 - データはサーバーに送信されません"
          : "100% browser-based - your data never leaves your device",
    feature2:
      locale === "ko"
        ? "실시간 처리 - 즉시 결과 확인"
        : locale === "ja"
          ? "リアルタイム処理 - 即座に結果を確認"
          : "Real-time processing - see results instantly",
    feature3:
      locale === "ko"
        ? "무료 & 무제한 - 회원가입 불필요"
        : locale === "ja"
          ? "無料＆無制限 - 登録不要"
          : "Free & unlimited - no signup required",
    relatedGuides:
      locale === "ko"
        ? "관련 가이드"
        : locale === "ja"
          ? "関連ガイド"
          : "Related Guides",
  };

  // JSON-LD HowTo Schema
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: title,
    description,
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: `${i18n.stepPrefix} ${index + 1}`,
      text: step,
    })),
    tool: {
      "@type": "HowToTool",
      name: "Web Toolkit",
      url: `${SITE_CONFIG.url}/${locale}/tools/${guide.relatedTool}`,
    },
  };

  return (
    <div className="container max-w-4xl mx-auto py-6">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href={`/${locale}`} className="hover:text-foreground">
          {i18n.breadcrumbHome}
        </Link>
        <span>/</span>
        <Link href={`/${locale}/how-to`} className="hover:text-foreground">
          {i18n.breadcrumbGuides}
        </Link>
        <span>/</span>
        <span className="text-foreground truncate">{title}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-3">{title}</h1>
        <p className="text-muted-foreground text-lg">{description}</p>

        {/* CTA Button */}
        <div className="mt-4">
          <Link href={`/${locale}/tools/${guide.relatedTool}`}>
            <Button>
              {i18n.tryTool}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Step-by-Step Guide */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl">{i18n.stepByStep}</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-4">
            {steps.map((step, index) => (
              <li key={index} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                  {index + 1}
                </div>
                <div className="flex-1 pt-1">
                  <p className="text-foreground">{step}</p>
                </div>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      {/* Key Features */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl">{i18n.features}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {[i18n.feature1, i18n.feature2, i18n.feature3].map(
              (feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ),
            )}
          </ul>
        </CardContent>
      </Card>

      {/* Try Tool CTA */}
      <div className="bg-muted/50 rounded-lg p-6 mb-8 text-center">
        <h2 className="text-xl font-semibold mb-2">
          {locale === "ko"
            ? "지금 바로 시작하세요"
            : locale === "ja"
              ? "今すぐ始めましょう"
              : "Get Started Now"}
        </h2>
        <p className="text-muted-foreground mb-4">
          {locale === "ko"
            ? "회원가입 없이 무료로 사용할 수 있습니다"
            : locale === "ja"
              ? "登録なしで無料でご利用いただけます"
              : "No signup required - start using for free"}
        </p>
        <Link href={`/${locale}/tools/${guide.relatedTool}`}>
          <Button size="lg">
            <ExternalLink className="h-4 w-4 mr-2" />
            {i18n.tryTool}
          </Button>
        </Link>
      </div>

      {/* Related Guides */}
      {relatedGuides.length > 0 && (
        <section className="border-t pt-8">
          <h2 className="text-xl font-semibold mb-4">{i18n.relatedGuides}</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {relatedGuides.map((slug) => {
              const related = getHowToBySlug(slug);
              if (!related) return null;
              const relatedLocaleKey = getSafeLocaleKey(locale);
              return (
                <Link
                  key={slug}
                  href={`/${locale}/how-to/${slug}`}
                  className="block p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <h3 className="font-medium text-foreground">
                    {related.title[relatedLocaleKey]}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {related.description[relatedLocaleKey]}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
