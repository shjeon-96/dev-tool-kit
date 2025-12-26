import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { Minimize2, Zap, Lock, Gauge } from "lucide-react";
import { Button } from "@/shared/ui";
import { MinifyTypeTool } from "@/features/minify-type";
import {
  getAllMinifyTypeSlugs,
  getMinifyTypeBySlug,
  getRelatedMinifyTypes,
} from "@/entities/minify-type";
import type { LocaleKey } from "@/entities/minify-type";
import { SITE_CONFIG } from "@/shared/config";
import { routing } from "@/i18n/routing";
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
  const slugs = getAllMinifyTypeSlugs();
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, type: slug })),
  );
}

// 메타데이터 생성
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, type: typeSlug } = await params;
  const minifyType = getMinifyTypeBySlug(typeSlug);

  if (!minifyType) {
    return { title: "Minifier Not Found" };
  }

  const localeKey = locale as LocaleKey;
  const content = minifyType.content[localeKey] || minifyType.content.en;

  const ogImageUrl = `/api/og?title=${encodeURIComponent(content.metaTitle)}&description=${encodeURIComponent(content.metaDescription)}`;

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    keywords: [...content.keywords, "minifier", "compress", "online", "free"],
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      type: "website",
      url: `${SITE_CONFIG.url}/${locale}/minify/${typeSlug}`,
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
      canonical: `${SITE_CONFIG.url}/${locale}/minify/${typeSlug}`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [
          l,
          `${SITE_CONFIG.url}/${l}/minify/${typeSlug}`,
        ]),
      ),
    },
  };
}

export default async function MinifyPage({ params }: PageProps) {
  const { locale, type: typeSlug } = await params;
  setRequestLocale(locale);

  const minifyType = getMinifyTypeBySlug(typeSlug);

  if (!minifyType) {
    notFound();
  }

  const localeKey = locale as LocaleKey;
  const content = minifyType.content[localeKey] || minifyType.content.en;

  const relatedTypes = getRelatedMinifyTypes(
    typeSlug as Parameters<typeof getRelatedMinifyTypes>[0],
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
          ? "압축 도구"
          : locale === "ja"
            ? "圧縮ツール"
            : "Minifiers",
      url: `${SITE_CONFIG.url}/${locale}/tools`,
    },
    {
      name: content.title,
      url: `${SITE_CONFIG.url}/${locale}/minify/${typeSlug}`,
    },
  ];

  const faqs =
    locale === "ko"
      ? [
          {
            q: `${minifyType.name} 압축이란 무엇인가요?`,
            a: content.description,
          },
          {
            q: "파일 크기가 얼마나 줄어드나요?",
            a: "일반적으로 20-60%의 파일 크기 감소를 기대할 수 있습니다. 원본 코드의 포맷팅 상태에 따라 달라집니다.",
          },
          {
            q: "압축 후 코드가 제대로 작동하나요?",
            a: "네, 압축은 공백과 주석만 제거하며 코드 로직은 변경되지 않습니다.",
          },
        ]
      : locale === "ja"
        ? [
            {
              q: `${minifyType.name}の圧縮とは何ですか？`,
              a: content.description,
            },
            {
              q: "ファイルサイズはどれくらい削減されますか？",
              a: "通常20-60%のファイルサイズ削減が期待できます。元のコードのフォーマット状態により異なります。",
            },
            {
              q: "圧縮後のコードは正常に動作しますか？",
              a: "はい、圧縮は空白とコメントのみを削除し、コードロジックは変更されません。",
            },
          ]
        : [
            {
              q: `What is ${minifyType.name} minification?`,
              a: content.description,
            },
            {
              q: "How much file size reduction can I expect?",
              a: "Typically 20-60% file size reduction, depending on the original code formatting.",
            },
            {
              q: "Will my code still work after minification?",
              a: "Yes, minification only removes whitespace and comments, the code logic remains unchanged.",
            },
          ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <SoftwareApplicationJsonLd
        name={content.title}
        description={content.description}
        url={`${SITE_CONFIG.url}/${locale}/minify/${typeSlug}`}
        applicationCategory="UtilitiesApplication"
      />
      <FaqJsonLd faqs={faqs} />

      <div className="container max-w-4xl mx-auto py-6">
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
            <Minimize2 className="h-6 w-6 text-primary" />
            <h1 className="text-2xl md:text-3xl font-bold">{content.title}</h1>
          </div>
          <p className="text-muted-foreground">{content.description}</p>
        </div>

        {/* Tool */}
        <div className="rounded-lg border p-6 mb-8">
          <MinifyTypeTool type={minifyType} locale={locale} />
        </div>

        {/* SEO Content */}
        <section className="space-y-6 border-t pt-8">
          {/* Benefits */}
          <div>
            <h2 className="text-xl font-semibold mb-3">
              {locale === "ko"
                ? "장점"
                : locale === "ja"
                  ? "メリット"
                  : "Benefits"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {content.benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg"
                >
                  {index === 0 ? (
                    <Zap className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  ) : index === 1 ? (
                    <Gauge className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  ) : (
                    <Lock className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  )}
                  <span className="text-sm">{benefit}</span>
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
                  {minifyType.fileExtension}
                </p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <span className="text-muted-foreground">MIME Type</span>
                <p className="font-mono font-medium">{minifyType.mimeType}</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <span className="text-muted-foreground">
                  {locale === "ko"
                    ? "카테고리"
                    : locale === "ja"
                      ? "カテゴリ"
                      : "Category"}
                </span>
                <p className="font-medium capitalize">{minifyType.category}</p>
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

          {/* Features */}
          <div>
            <h2 className="text-xl font-semibold mb-3">
              {locale === "ko" ? "특징" : locale === "ja" ? "特徴" : "Features"}
            </h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>
                {locale === "ko"
                  ? "100% 클라이언트 사이드 - 데이터가 서버로 전송되지 않습니다"
                  : locale === "ja"
                    ? "100%クライアントサイド - データはサーバーに送信されません"
                    : "100% client-side - your data never leaves your browser"}
              </li>
              <li>
                {locale === "ko"
                  ? "즉시 압축 - 버튼 클릭 한 번으로 완료"
                  : locale === "ja"
                    ? "即座に圧縮 - ワンクリックで完了"
                    : "Instant minification - one click to compress"}
              </li>
              <li>
                {locale === "ko"
                  ? "압축 통계 - 원본 대비 절감량 확인"
                  : locale === "ja"
                    ? "圧縮統計 - オリジナルとの比較で削減量を確認"
                    : "Compression stats - see savings compared to original"}
              </li>
              <li>
                {locale === "ko"
                  ? "무제한 사용 - 파일 크기 제한 없음"
                  : locale === "ja"
                    ? "無制限使用 - ファイルサイズ制限なし"
                    : "Unlimited usage - no file size limits"}
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
                  ? "관련 압축 도구"
                  : locale === "ja"
                    ? "関連圧縮ツール"
                    : "Related Minifiers"}
              </h2>
              <div className="flex flex-wrap gap-2">
                {relatedTypes.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/${locale}/minify/${related.slug}`}
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
