import { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { ArrowRight, CheckCircle, Target, Zap } from "lucide-react";
import { Button, Card, CardContent, CardHeader, CardTitle } from "@/shared/ui";
import {
  forUseCases,
  getAllForSlugs,
  getForBySlug,
  type ForUseCaseSlug,
} from "@/entities/for";
import { SITE_CONFIG } from "@/shared/config";
import { routing } from "@/i18n/routing";

interface PageProps {
  params: Promise<{ locale: string; usecase: string }>;
}

type LocaleKey = "en" | "ko" | "ja";
function getSafeLocaleKey(locale: string): LocaleKey {
  if (locale === "ko" || locale === "ja") return locale;
  return "en";
}

export async function generateStaticParams() {
  const usecases = getAllForSlugs();
  return routing.locales.flatMap((locale) =>
    usecases.map((usecase) => ({ locale, usecase })),
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, usecase } = await params;
  const forData = getForBySlug(usecase);

  if (!forData) return { title: "Use Case Not Found" };

  const localeKey = getSafeLocaleKey(locale);
  const title = forData.title[localeKey];
  const description = forData.description[localeKey];

  return {
    title,
    description,
    keywords: forData.keywords,
    openGraph: {
      title,
      description,
      type: "article",
      url: `${SITE_CONFIG.url}/${locale}/for/${usecase}`,
    },
    alternates: {
      canonical: `${SITE_CONFIG.url}/${locale}/for/${usecase}`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [
          l,
          `${SITE_CONFIG.url}/${l}/for/${usecase}`,
        ]),
      ),
    },
  };
}

export default async function ForUseCasePage({ params }: PageProps) {
  const { locale, usecase } = await params;
  setRequestLocale(locale);

  const forData = getForBySlug(usecase);
  if (!forData) notFound();

  const localeKey = getSafeLocaleKey(locale);
  const title = forData.title[localeKey];
  const description = forData.description[localeKey];
  const benefits = forData.benefits[localeKey];

  const relatedUseCases = getAllForSlugs()
    .filter(
      (slug) =>
        slug !== usecase && getForBySlug(slug)?.category === forData.category,
    )
    .slice(0, 4);

  const i18n = {
    home: localeKey === "ko" ? "홈" : localeKey === "ja" ? "ホーム" : "Home",
    forUseCases:
      localeKey === "ko"
        ? "사용 사례"
        : localeKey === "ja"
          ? "ユースケース"
          : "Use Cases",
    tryTool:
      localeKey === "ko"
        ? "지금 사용하기"
        : localeKey === "ja"
          ? "今すぐ使う"
          : "Try Now",
    whyUse:
      localeKey === "ko"
        ? "왜 사용해야 하나요?"
        : localeKey === "ja"
          ? "なぜ使うべきか"
          : "Why Use This?",
    benefits:
      localeKey === "ko"
        ? "주요 이점"
        : localeKey === "ja"
          ? "主な利点"
          : "Key Benefits",
    related:
      localeKey === "ko"
        ? "관련 사용 사례"
        : localeKey === "ja"
          ? "関連ユースケース"
          : "Related Use Cases",
    perfectFor:
      localeKey === "ko"
        ? "다음과 같은 경우에 적합합니다"
        : localeKey === "ja"
          ? "こんな場合に最適"
          : "Perfect for",
  };

  // JSON-LD Schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    author: { "@type": "Organization", name: "Web Toolkit" },
    publisher: {
      "@type": "Organization",
      name: "Web Toolkit",
      url: SITE_CONFIG.url,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_CONFIG.url}/${locale}/for/${usecase}`,
    },
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: forData.tool,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <div className="container max-w-4xl mx-auto py-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href={`/${locale}`} className="hover:text-foreground">
          {i18n.home}
        </Link>
        <span>/</span>
        <Link href={`/${locale}/for`} className="hover:text-foreground">
          {i18n.forUseCases}
        </Link>
        <span>/</span>
        <span className="text-foreground truncate">
          {forData.tool} for {forData.useCase}
        </span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-primary/10">
            <Target className="h-6 w-6 text-primary" />
          </div>
          <div>
            <span className="text-sm text-muted-foreground">
              {forData.tool}
            </span>
            <span className="mx-2 text-muted-foreground">→</span>
            <span className="text-sm font-medium text-primary">
              {forData.useCase}
            </span>
          </div>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold mb-3">{title}</h1>
        <p className="text-muted-foreground text-lg">{description}</p>
        <div className="mt-4">
          <Link href={`/${locale}/tools/${forData.relatedTool}`}>
            <Button size="lg">
              <Zap className="h-4 w-4 mr-2" />
              {i18n.tryTool}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Benefits Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-success" />
            {i18n.benefits}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="mt-1 h-5 w-5 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-3 w-3 text-success" />
                </div>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Why Use Section */}
      <Card className="mb-8 bg-muted/50">
        <CardHeader>
          <CardTitle className="text-xl">{i18n.whyUse}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">{i18n.perfectFor}:</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {benefits.slice(0, 4).map((benefit, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <ArrowRight className="h-4 w-4 text-primary flex-shrink-0" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Related Use Cases */}
      {relatedUseCases.length > 0 && (
        <section className="border-t pt-8">
          <h2 className="text-xl font-semibold mb-4">{i18n.related}</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {relatedUseCases.map((slug) => {
              const related = getForBySlug(slug);
              if (!related) return null;
              return (
                <Link
                  key={slug}
                  href={`/${locale}/for/${slug}`}
                  className="block p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium text-primary">
                      {related.tool}
                    </span>
                    <span className="text-xs text-muted-foreground">for</span>
                    <span className="text-sm font-medium">
                      {related.useCase}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {related.description[localeKey]}
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
