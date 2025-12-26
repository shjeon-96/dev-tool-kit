import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { Scale } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui";
import {
  vsComparisons,
  getAllVsSlugs,
  getVsBySlug,
  type VsCategory,
} from "@/entities/vs";
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
    en: "Technology Comparisons - VS Guides for Developers",
    ko: "기술 비교 - 개발자를 위한 VS 가이드",
    ja: "技術比較 - 開発者向けVSガイド",
  };

  const descriptions = {
    en: "Compare popular technologies, formats, and tools. JSON vs YAML, PNG vs WebP, REST vs GraphQL and more.",
    ko: "인기 있는 기술, 포맷, 도구를 비교합니다. JSON vs YAML, PNG vs WebP, REST vs GraphQL 등.",
    ja: "人気のある技術、形式、ツールを比較します。JSON vs YAML、PNG vs WebP、REST vs GraphQLなど。",
  };

  return {
    title: titles[localeKey],
    description: descriptions[localeKey],
    openGraph: {
      title: titles[localeKey],
      description: descriptions[localeKey],
      url: `${SITE_CONFIG.url}/${locale}/vs`,
    },
    alternates: {
      canonical: `${SITE_CONFIG.url}/${locale}/vs`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `${SITE_CONFIG.url}/${l}/vs`]),
      ),
    },
  };
}

const categoryLabels: Record<
  VsCategory,
  { en: string; ko: string; ja: string }
> = {
  "data-format": { en: "Data Formats", ko: "데이터 포맷", ja: "データ形式" },
  encoding: { en: "Encoding", ko: "인코딩", ja: "エンコード" },
  hash: {
    en: "Hash Algorithms",
    ko: "해시 알고리즘",
    ja: "ハッシュアルゴリズム",
  },
  image: { en: "Image Formats", ko: "이미지 포맷", ja: "画像形式" },
  code: { en: "Code & Tools", ko: "코드 & 도구", ja: "コード & ツール" },
};

const categoryOrder: VsCategory[] = [
  "data-format",
  "encoding",
  "hash",
  "image",
  "code",
];

export default async function VsIndexPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const localeKey = getSafeLocaleKey(locale);

  const i18n = {
    title:
      localeKey === "ko"
        ? "기술 비교"
        : localeKey === "ja"
          ? "技術比較"
          : "Technology Comparisons",
    subtitle:
      localeKey === "ko"
        ? "인기 있는 기술과 도구를 비교하여 최적의 선택을 하세요"
        : localeKey === "ja"
          ? "人気のある技術とツールを比較して最適な選択をしましょう"
          : "Compare popular technologies and tools to make the best choice",
    count:
      localeKey === "ko"
        ? "개의 비교"
        : localeKey === "ja"
          ? "件の比較"
          : " comparisons",
  };

  const comparisonsByCategory = categoryOrder
    .map((category) => {
      const comparisons = getAllVsSlugs()
        .filter((slug) => getVsBySlug(slug)?.category === category)
        .map((slug) => ({ slug, data: getVsBySlug(slug)! }))
        .sort((a, b) => b.data.searchVolume - a.data.searchVolume);
      return { category, comparisons };
    })
    .filter((group) => group.comparisons.length > 0);

  const totalComparisons = getAllVsSlugs().length;

  return (
    <div className="container max-w-6xl mx-auto py-6">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <Scale className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">{i18n.title}</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          {i18n.subtitle}
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          {totalComparisons}
          {i18n.count}
        </p>
      </div>

      {/* Categories */}
      <div className="space-y-8">
        {comparisonsByCategory.map(({ category, comparisons }) => (
          <Card key={category}>
            <CardHeader>
              <CardTitle className="text-xl">
                {categoryLabels[category][localeKey]}
                <span className="ml-2 text-sm font-normal text-muted-foreground">
                  ({comparisons.length})
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {comparisons.map(({ slug, data }) => (
                  <Link
                    key={slug}
                    href={`/${locale}/vs/${slug}`}
                    className="block p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-primary">
                        {data.item1}
                      </span>
                      <span className="text-xs text-muted-foreground">vs</span>
                      <span className="text-sm font-medium">{data.item2}</span>
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
