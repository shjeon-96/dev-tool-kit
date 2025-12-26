import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { Target, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui";
import { getAllForSlugs, getForBySlug, type ForCategory } from "@/entities/for";
import { SITE_CONFIG } from "@/shared/config";
import { routing } from "@/i18n/routing";

interface PageProps {
  params: Promise<{ locale: string }>;
}

type LocaleKey = "en" | "ko" | "ja";
function getSafeLocaleKey(locale: string): LocaleKey {
  if (locale === "ko" || locale === "ja") return locale;
  return "en";
}

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const localeKey = getSafeLocaleKey(locale);

  const titles = {
    en: "Tools for Specific Use Cases - Developer Guides",
    ko: "특정 사용 사례를 위한 도구 - 개발자 가이드",
    ja: "特定ユースケース向けツール - 開発者ガイド",
  };

  const descriptions = {
    en: "Find the perfect developer tool for your specific use case. JSON formatter for API, image converter for web, and more.",
    ko: "특정 사용 사례에 맞는 완벽한 개발자 도구를 찾으세요. API용 JSON 포매터, 웹용 이미지 변환기 등.",
    ja: "特定のユースケースに最適な開発者ツールを見つけましょう。API用JSONフォーマッター、Web用画像コンバーターなど。",
  };

  return {
    title: titles[localeKey],
    description: descriptions[localeKey],
    openGraph: {
      title: titles[localeKey],
      description: descriptions[localeKey],
      url: `${SITE_CONFIG.url}/${locale}/for`,
    },
    alternates: {
      canonical: `${SITE_CONFIG.url}/${locale}/for`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `${SITE_CONFIG.url}/${l}/for`]),
      ),
    },
  };
}

const categoryLabels: Record<
  ForCategory,
  { en: string; ko: string; ja: string }
> = {
  developer: {
    en: "Developer Workflow",
    ko: "개발자 워크플로우",
    ja: "開発者ワークフロー",
  },
  web: { en: "Web Development", ko: "웹 개발", ja: "Web開発" },
  api: { en: "API & Integration", ko: "API & 통합", ja: "API & 統合" },
  data: { en: "Data Processing", ko: "데이터 처리", ja: "データ処理" },
  security: {
    en: "Security & Auth",
    ko: "보안 & 인증",
    ja: "セキュリティ & 認証",
  },
};

const categoryOrder: ForCategory[] = [
  "developer",
  "web",
  "api",
  "data",
  "security",
];

export default async function ForIndexPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const localeKey = getSafeLocaleKey(locale);

  const i18n = {
    title:
      localeKey === "ko"
        ? "사용 사례별 도구"
        : localeKey === "ja"
          ? "ユースケース別ツール"
          : "Tools by Use Case",
    subtitle:
      localeKey === "ko"
        ? "특정 목적에 맞는 완벽한 도구를 찾으세요"
        : localeKey === "ja"
          ? "特定の目的に最適なツールを見つけましょう"
          : "Find the perfect tool for your specific purpose",
    count:
      localeKey === "ko"
        ? "개의 사용 사례"
        : localeKey === "ja"
          ? "件のユースケース"
          : " use cases",
  };

  const useCasesByCategory = categoryOrder
    .map((category) => {
      const useCases = getAllForSlugs()
        .filter((slug) => getForBySlug(slug)?.category === category)
        .map((slug) => ({ slug, data: getForBySlug(slug)! }))
        .sort((a, b) => b.data.searchVolume - a.data.searchVolume);
      return { category, useCases };
    })
    .filter((group) => group.useCases.length > 0);

  const totalUseCases = getAllForSlugs().length;

  return (
    <div className="container max-w-6xl mx-auto py-6">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <Target className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">{i18n.title}</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          {i18n.subtitle}
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          {totalUseCases}
          {i18n.count}
        </p>
      </div>

      {/* Categories */}
      <div className="space-y-8">
        {useCasesByCategory.map(({ category, useCases }) => (
          <Card key={category}>
            <CardHeader>
              <CardTitle className="text-xl">
                {categoryLabels[category][localeKey]}
                <span className="ml-2 text-sm font-normal text-muted-foreground">
                  ({useCases.length})
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {useCases.map(({ slug, data }) => (
                  <Link
                    key={slug}
                    href={`/${locale}/for/${slug}`}
                    className="group block p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-primary">
                        {data.tool}
                      </span>
                      <ArrowRight className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors" />
                      <span className="text-sm font-medium">
                        {data.useCase}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {data.description[localeKey]}
                    </p>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
