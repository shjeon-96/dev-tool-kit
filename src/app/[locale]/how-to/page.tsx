import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui";
import {
  howToGuides,
  type HowToActionSlug,
  type HowToCategory,
} from "@/entities/how-to";
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

  const titles = {
    en: "How-To Guides - Step by Step Developer Tutorials",
    ko: "사용 가이드 - 단계별 개발자 튜토리얼",
    ja: "使い方ガイド - ステップバイステップの開発者チュートリアル",
  };

  const descriptions = {
    en: "Learn how to use developer tools with our comprehensive step-by-step guides. Convert JSON, encode data, generate hashes, and more.",
    ko: "종합적인 단계별 가이드로 개발자 도구 사용법을 배우세요. JSON 변환, 데이터 인코딩, 해시 생성 등을 다룹니다.",
    ja: "包括的なステップバイステップガイドで開発者ツールの使い方を学びましょう。JSON変換、データエンコード、ハッシュ生成など。",
  };

  const localeKey = getSafeLocaleKey(locale);
  const title = titles[localeKey];
  const description = descriptions[localeKey];

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `${SITE_CONFIG.url}/${locale}/how-to`,
    },
    alternates: {
      canonical: `${SITE_CONFIG.url}/${locale}/how-to`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `${SITE_CONFIG.url}/${l}/how-to`]),
      ),
    },
  };
}

const categoryLabels: Record<
  HowToCategory,
  { en: string; ko: string; ja: string }
> = {
  json: { en: "JSON & Data", ko: "JSON & 데이터", ja: "JSON & データ" },
  encoding: {
    en: "Encoding & Decoding",
    ko: "인코딩 & 디코딩",
    ja: "エンコード & デコード",
  },
  security: {
    en: "Hash & Security",
    ko: "해시 & 보안",
    ja: "ハッシュ & セキュリティ",
  },
  image: { en: "Image Processing", ko: "이미지 처리", ja: "画像処理" },
  code: {
    en: "Code & Formatting",
    ko: "코드 & 포맷팅",
    ja: "コード & フォーマット",
  },
  seo: { en: "SEO & Web", ko: "SEO & 웹", ja: "SEO & ウェブ" },
  utility: { en: "Utilities", ko: "유틸리티", ja: "ユーティリティ" },
};

const categoryOrder: HowToCategory[] = [
  "json",
  "encoding",
  "security",
  "image",
  "code",
  "seo",
  "utility",
];

export default async function HowToIndexPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const localeKey = getSafeLocaleKey(locale);

  const i18n = {
    title:
      localeKey === "ko"
        ? "사용 가이드"
        : localeKey === "ja"
          ? "使い方ガイド"
          : "How-To Guides",
    subtitle:
      localeKey === "ko"
        ? "단계별 가이드로 개발자 도구를 쉽게 사용하세요"
        : localeKey === "ja"
          ? "ステップバイステップガイドで開発者ツールを簡単に使いましょう"
          : "Learn to use developer tools with step-by-step guides",
    guideCount:
      localeKey === "ko"
        ? "개의 가이드"
        : localeKey === "ja"
          ? "件のガイド"
          : " guides",
  };

  // 카테고리별 그룹화
  const guidesByCategory = categoryOrder
    .map((category) => {
      const guides = (
        Object.entries(howToGuides) as [
          HowToActionSlug,
          (typeof howToGuides)[HowToActionSlug],
        ][]
      )
        .filter(([, guide]) => guide.category === category)
        .sort((a, b) => b[1].searchVolume - a[1].searchVolume);
      return { category, guides };
    })
    .filter((group) => group.guides.length > 0);

  const totalGuides = Object.keys(howToGuides).length;

  return (
    <div className="container max-w-6xl mx-auto py-6">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <BookOpen className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">{i18n.title}</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          {i18n.subtitle}
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          {totalGuides}
          {i18n.guideCount}
        </p>
      </div>

      {/* Categories */}
      <div className="space-y-8">
        {guidesByCategory.map(({ category, guides }) => (
          <Card key={category}>
            <CardHeader>
              <CardTitle className="text-xl">
                {categoryLabels[category][localeKey]}
                <span className="ml-2 text-sm font-normal text-muted-foreground">
                  ({guides.length})
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {guides.map(([slug, guide]) => (
                  <Link
                    key={slug}
                    href={`/${locale}/how-to/${slug}`}
                    className="block p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <h3 className="font-medium text-foreground text-sm">
                      {guide.title[localeKey]}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {guide.description[localeKey]}
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
