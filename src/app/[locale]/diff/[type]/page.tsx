import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { GitCompare, Eye, Zap, Lock } from "lucide-react";
import { Button } from "@/shared/ui";
import { DiffTypeTool } from "@/features/diff-type";
import {
  getAllDiffTypeSlugs,
  getDiffTypeBySlug,
  getRelatedDiffTypes,
} from "@/entities/diff-type";
import type { LocaleKey } from "@/entities/diff-type";
import { SITE_CONFIG } from "@/shared/config";
import {
  BreadcrumbJsonLd,
  SoftwareApplicationJsonLd,
  FaqJsonLd,
} from "@/shared/ui";

interface PageProps {
  params: Promise<{
    locale: string;
    type: string;
  }>;
}

// 정적 파라미터 생성
export async function generateStaticParams() {
  const slugs = getAllDiffTypeSlugs();
  const locales = ["en", "ko", "ja"];

  return locales.flatMap((locale) =>
    slugs.map((slug) => ({
      locale,
      type: slug,
    })),
  );
}

// 메타데이터 생성
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, type: typeSlug } = await params;
  const diffType = getDiffTypeBySlug(typeSlug);

  if (!diffType) {
    return { title: "Diff Tool Not Found" };
  }

  const localeKey = locale as LocaleKey;
  const content = diffType.content[localeKey] || diffType.content.en;

  const ogImageUrl = `/api/og?title=${encodeURIComponent(content.metaTitle)}&description=${encodeURIComponent(content.metaDescription)}`;

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    keywords: [...content.keywords, "diff", "compare", "online", "free"],
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      type: "website",
      url: `${SITE_CONFIG.url}/${locale}/diff/${typeSlug}`,
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
      canonical: `${SITE_CONFIG.url}/${locale}/diff/${typeSlug}`,
      languages: {
        en: `${SITE_CONFIG.url}/en/diff/${typeSlug}`,
        ko: `${SITE_CONFIG.url}/ko/diff/${typeSlug}`,
        ja: `${SITE_CONFIG.url}/ja/diff/${typeSlug}`,
      },
    },
  };
}

export default async function DiffPage({ params }: PageProps) {
  const { locale, type: typeSlug } = await params;
  setRequestLocale(locale);

  const diffType = getDiffTypeBySlug(typeSlug);

  if (!diffType) {
    notFound();
  }

  const localeKey = locale as LocaleKey;
  const content = diffType.content[localeKey] || diffType.content.en;

  const relatedTypes = getRelatedDiffTypes(
    typeSlug as Parameters<typeof getRelatedDiffTypes>[0],
    6,
  );

  const breadcrumbItems = [
    {
      name: locale === "ko" ? "홈" : locale === "ja" ? "ホーム" : "Home",
      url: SITE_CONFIG.url,
    },
    {
      name:
        locale === "ko"
          ? "비교 도구"
          : locale === "ja"
            ? "比較ツール"
            : "Diff Tools",
      url: `${SITE_CONFIG.url}/${locale}/tools`,
    },
    {
      name: content.title,
      url: `${SITE_CONFIG.url}/${locale}/diff/${typeSlug}`,
    },
  ];

  const faqs =
    locale === "ko"
      ? [
          {
            q: `${diffType.name} 비교란 무엇인가요?`,
            a: content.description,
          },
          {
            q: "어떤 차이를 감지할 수 있나요?",
            a: "추가된 줄, 삭제된 줄, 변경되지 않은 줄을 감지합니다. 줄 번호와 함께 색상으로 구분하여 표시합니다.",
          },
          {
            q: "데이터가 안전한가요?",
            a: "모든 비교는 브라우저에서 로컬로 처리됩니다. 데이터가 서버로 전송되지 않습니다.",
          },
        ]
      : locale === "ja"
        ? [
            {
              q: `${diffType.name}の比較とは何ですか？`,
              a: content.description,
            },
            {
              q: "どのような違いを検出できますか？",
              a: "追加された行、削除された行、変更されていない行を検出します。行番号とともに色で区別して表示します。",
            },
            {
              q: "データは安全ですか？",
              a: "すべての比較はブラウザでローカルに処理されます。データはサーバーに送信されません。",
            },
          ]
        : [
            {
              q: `What is ${diffType.name} diff?`,
              a: content.description,
            },
            {
              q: "What differences can it detect?",
              a: "It detects added lines, removed lines, and unchanged lines. Displayed with line numbers and color-coded for easy identification.",
            },
            {
              q: "Is my data safe?",
              a: "All comparison happens locally in your browser. Your data never leaves your device.",
            },
          ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <SoftwareApplicationJsonLd
        name={content.title}
        description={content.description}
        url={`${SITE_CONFIG.url}/${locale}/diff/${typeSlug}`}
        applicationCategory="UtilitiesApplication"
      />
      <FaqJsonLd faqs={faqs} />

      <div className="container max-w-5xl mx-auto py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href={`/${locale}`} className="hover:text-foreground">
            {locale === "ko" ? "홈" : locale === "ja" ? "ホーム" : "Home"}
          </Link>
          <span>/</span>
          <Link href={`/${locale}/tools`} className="hover:text-foreground">
            {locale === "ko" ? "도구" : locale === "ja" ? "ツール" : "Tools"}
          </Link>
          <span>/</span>
          <span className="text-foreground">{content.title}</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <GitCompare className="h-6 w-6 text-primary" />
            <h1 className="text-2xl md:text-3xl font-bold">{content.title}</h1>
          </div>
          <p className="text-muted-foreground">{content.description}</p>
        </div>

        {/* Tool */}
        <div className="rounded-lg border p-6 mb-8">
          <DiffTypeTool type={diffType} locale={locale} />
        </div>

        {/* SEO Content */}
        <section className="space-y-6 border-t pt-8">
          {/* Features */}
          <div>
            <h2 className="text-xl font-semibold mb-3">
              {locale === "ko" ? "기능" : locale === "ja" ? "機能" : "Features"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {content.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg"
                >
                  {index === 0 ? (
                    <Eye className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  ) : index === 1 ? (
                    <Zap className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  ) : (
                    <Lock className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  )}
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Use Cases */}
          <div>
            <h2 className="text-xl font-semibold mb-3">
              {locale === "ko"
                ? "사용 사례"
                : locale === "ja"
                  ? "使用例"
                  : "Use Cases"}
            </h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              {content.useCases.map((useCase, index) => (
                <li key={index}>{useCase}</li>
              ))}
            </ul>
          </div>

          {/* Technical Specs */}
          <div>
            <h2 className="text-xl font-semibold mb-3">
              {locale === "ko"
                ? "기술 사양"
                : locale === "ja"
                  ? "技術仕様"
                  : "Technical Specifications"}
            </h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-3 bg-muted rounded-lg">
                <span className="text-muted-foreground">
                  {locale === "ko"
                    ? "파일 확장자"
                    : locale === "ja"
                      ? "ファイル拡張子"
                      : "File Extension"}
                </span>
                <p className="font-mono font-medium">
                  {diffType.fileExtension}
                </p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <span className="text-muted-foreground">
                  {locale === "ko"
                    ? "카테고리"
                    : locale === "ja"
                      ? "カテゴリ"
                      : "Category"}
                </span>
                <p className="font-medium capitalize">{diffType.category}</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <span className="text-muted-foreground">
                  {locale === "ko"
                    ? "알고리즘"
                    : locale === "ja"
                      ? "アルゴリズム"
                      : "Algorithm"}
                </span>
                <p className="font-medium">LCS (Longest Common Subsequence)</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <span className="text-muted-foreground">
                  {locale === "ko"
                    ? "처리 방식"
                    : locale === "ja"
                      ? "処理方式"
                      : "Processing"}
                </span>
                <p className="font-medium">
                  {locale === "ko"
                    ? "클라이언트 사이드"
                    : locale === "ja"
                      ? "クライアントサイド"
                      : "Client-side"}
                </p>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div>
            <h2 className="text-xl font-semibold mb-3">
              {locale === "ko"
                ? "작동 방식"
                : locale === "ja"
                  ? "動作方法"
                  : "How It Works"}
            </h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>
                {locale === "ko"
                  ? "두 텍스트를 줄 단위로 비교합니다"
                  : locale === "ja"
                    ? "2つのテキストを行単位で比較します"
                    : "Compares two texts line by line"}
              </li>
              <li>
                {locale === "ko"
                  ? "LCS 알고리즘을 사용하여 최적의 차이를 찾습니다"
                  : locale === "ja"
                    ? "LCSアルゴリズムを使用して最適な差分を見つけます"
                    : "Uses LCS algorithm to find optimal differences"}
              </li>
              <li>
                {locale === "ko"
                  ? "추가, 삭제, 변경되지 않은 줄을 색상으로 구분합니다"
                  : locale === "ja"
                    ? "追加、削除、変更なしの行を色で区別します"
                    : "Color-codes added, removed, and unchanged lines"}
              </li>
              <li>
                {locale === "ko"
                  ? "줄 번호를 표시하여 정확한 위치를 알려줍니다"
                  : locale === "ja"
                    ? "行番号を表示して正確な位置を示します"
                    : "Shows line numbers for precise location"}
              </li>
            </ul>
          </div>

          {/* FAQ */}
          <div>
            <h2 className="text-xl font-semibold mb-3">
              {locale === "ko"
                ? "자주 묻는 질문"
                : locale === "ja"
                  ? "よくある質問"
                  : "FAQ"}
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index}>
                  <h3 className="font-medium mb-1">{faq.q}</h3>
                  <p className="text-muted-foreground text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Related Tools */}
          {relatedTypes.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-3">
                {locale === "ko"
                  ? "관련 비교 도구"
                  : locale === "ja"
                    ? "関連比較ツール"
                    : "Related Diff Tools"}
              </h2>
              <div className="flex flex-wrap gap-2">
                {relatedTypes.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/${locale}/diff/${related.slug}`}
                  >
                    <Button variant="outline" size="sm">
                      {related.name}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
