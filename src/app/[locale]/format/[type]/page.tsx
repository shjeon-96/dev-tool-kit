import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { FileCode2, ExternalLink } from "lucide-react";
import { Button } from "@/shared/ui";
import { FormatTypeTool } from "@/features/format-type";
import {
  getAllFormatTypeSlugs,
  getFormatTypeBySlug,
  getRelatedFormatTypes,
} from "@/entities/format-type";
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
  const slugs = getAllFormatTypeSlugs();
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
  const formatType = getFormatTypeBySlug(typeSlug);

  if (!formatType) {
    return { title: "Formatter Not Found" };
  }

  const title =
    formatType.title[locale as keyof typeof formatType.title] ||
    formatType.title.en;

  const description =
    formatType.description[locale as keyof typeof formatType.description] ||
    formatType.description.en;

  const keywords =
    formatType.keywords[locale as keyof typeof formatType.keywords] ||
    formatType.keywords.en;

  const ogImageUrl = `/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`;

  return {
    title,
    description,
    keywords: [...keywords, "formatter", "online", "free"],
    openGraph: {
      title,
      description,
      type: "website",
      url: `${SITE_CONFIG.url}/${locale}/format/${typeSlug}`,
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: `${SITE_CONFIG.url}/${locale}/format/${typeSlug}`,
      languages: {
        en: `${SITE_CONFIG.url}/en/format/${typeSlug}`,
        ko: `${SITE_CONFIG.url}/ko/format/${typeSlug}`,
        ja: `${SITE_CONFIG.url}/ja/format/${typeSlug}`,
      },
    },
  };
}

export default async function FormatPage({ params }: PageProps) {
  const { locale, type: typeSlug } = await params;
  setRequestLocale(locale);

  const formatType = getFormatTypeBySlug(typeSlug);

  if (!formatType) {
    notFound();
  }

  const title =
    formatType.title[locale as keyof typeof formatType.title] ||
    formatType.title.en;

  const description =
    formatType.description[locale as keyof typeof formatType.description] ||
    formatType.description.en;

  const relatedTypes = getRelatedFormatTypes(typeSlug, 6);

  const breadcrumbItems = [
    {
      name: locale === "ko" ? "홈" : locale === "ja" ? "ホーム" : "Home",
      url: SITE_CONFIG.url,
    },
    {
      name:
        locale === "ko"
          ? "포맷터"
          : locale === "ja"
            ? "フォーマッター"
            : "Formatters",
      url: `${SITE_CONFIG.url}/${locale}/tools`,
    },
    {
      name: formatType.name,
      url: `${SITE_CONFIG.url}/${locale}/format/${typeSlug}`,
    },
  ];

  const faqs =
    locale === "ko"
      ? [
          {
            q: `${formatType.name} 포맷팅이란 무엇인가요?`,
            a: description,
          },
          {
            q: "무료로 사용할 수 있나요?",
            a: "네, 완전히 무료입니다. 회원가입 없이 무제한으로 사용할 수 있습니다.",
          },
          {
            q: "데이터가 안전한가요?",
            a: "모든 처리는 브라우저에서 로컬로 이루어집니다. 데이터가 서버로 전송되지 않습니다.",
          },
        ]
      : locale === "ja"
        ? [
            {
              q: `${formatType.name}フォーマットとは何ですか？`,
              a: description,
            },
            {
              q: "無料で使用できますか？",
              a: "はい、完全に無料です。登録なしで無制限に使用できます。",
            },
            {
              q: "データは安全ですか？",
              a: "すべての処理はブラウザでローカルに行われます。データはサーバーに送信されません。",
            },
          ]
        : [
            {
              q: `What is ${formatType.name} formatting?`,
              a: description,
            },
            {
              q: "Is this tool free?",
              a: "Yes, it's completely free. No signup required and unlimited usage.",
            },
            {
              q: "Is my data safe?",
              a: "All processing happens locally in your browser. Your data never leaves your device.",
            },
          ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <SoftwareApplicationJsonLd
        name={title}
        description={description}
        url={`${SITE_CONFIG.url}/${locale}/format/${typeSlug}`}
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
          <span className="text-foreground">{formatType.name}</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <FileCode2 className="h-6 w-6 text-primary" />
            <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
          </div>
          <p className="text-muted-foreground">{description}</p>

          {/* Quick Links to Related Tools */}
          <div className="flex flex-wrap gap-2 mt-4">
            <Link href={`/${locale}/tools/json-formatter`}>
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4 mr-1" />
                {locale === "ko"
                  ? "JSON 포맷터"
                  : locale === "ja"
                    ? "JSONフォーマッター"
                    : "JSON Formatter"}
              </Button>
            </Link>
          </div>
        </div>

        {/* Tool */}
        <div className="rounded-lg border p-6 mb-8">
          <FormatTypeTool type={formatType} locale={locale} />
        </div>

        {/* SEO Content */}
        <section className="space-y-6 border-t pt-8">
          {/* Use Cases */}
          {formatType.useCases && (
            <div>
              <h2 className="text-xl font-semibold mb-3">
                {locale === "ko"
                  ? "사용 사례"
                  : locale === "ja"
                    ? "使用例"
                    : "Use Cases"}
              </h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                {(
                  formatType.useCases[
                    locale as keyof typeof formatType.useCases
                  ] || formatType.useCases.en
                ).map((useCase, index) => (
                  <li key={index}>{useCase}</li>
                ))}
              </ul>
            </div>
          )}

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
                  {formatType.fileExtension}
                </p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <span className="text-muted-foreground">MIME Type</span>
                <p className="font-mono font-medium">{formatType.mimeType}</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <span className="text-muted-foreground">
                  {locale === "ko"
                    ? "카테고리"
                    : locale === "ja"
                      ? "カテゴリ"
                      : "Category"}
                </span>
                <p className="font-medium capitalize">{formatType.category}</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <span className="text-muted-foreground">
                  {locale === "ko"
                    ? "주석 지원"
                    : locale === "ja"
                      ? "コメント対応"
                      : "Comments"}
                </span>
                <p className="font-medium">
                  {formatType.supportsComments
                    ? locale === "ko"
                      ? "예"
                      : locale === "ja"
                        ? "はい"
                        : "Yes"
                    : locale === "ko"
                      ? "아니오"
                      : locale === "ja"
                        ? "いいえ"
                        : "No"}
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
                  ? "실시간 변환 - 입력하는 동안 자동 포맷팅"
                  : locale === "ja"
                    ? "リアルタイム変換 - 入力中に自動フォーマット"
                    : "Real-time conversion - formats as you type"}
              </li>
              <li>
                {locale === "ko"
                  ? "들여쓰기 설정 - 2, 4, 8 스페이스 선택 가능"
                  : locale === "ja"
                    ? "インデント設定 - 2、4、8スペースから選択可能"
                    : "Indent settings - choose between 2, 4, or 8 spaces"}
              </li>
              <li>
                {locale === "ko"
                  ? "정렬/압축 모드 - 원하는 출력 형식 선택"
                  : locale === "ja"
                    ? "整形/最小化モード - 希望の出力形式を選択"
                    : "Beautify/Minify mode - choose your desired output format"}
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
                  ? "관련 포맷터"
                  : locale === "ja"
                    ? "関連フォーマッター"
                    : "Related Formatters"}
              </h2>
              <div className="flex flex-wrap gap-2">
                {relatedTypes.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/${locale}/format/${related.slug}`}
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
