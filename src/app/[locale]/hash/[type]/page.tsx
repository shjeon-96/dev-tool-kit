import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { ExternalLink, Shield, AlertTriangle } from "lucide-react";
import { Button } from "@/shared/ui";
import { HashTypeTool } from "@/features/hash-type";
import {
  getAllHashTypeSlugs,
  getHashTypeBySlug,
  getRelatedHashTypes,
} from "@/entities/hash-type";
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

// 정적 파라미터 생성 - 모든 해시 타입 페이지 사전 생성
export async function generateStaticParams() {
  const slugs = getAllHashTypeSlugs();
  const locales = ["en", "ko", "ja"];

  return locales.flatMap((locale) =>
    slugs.map((slug) => ({
      locale,
      type: slug,
    })),
  );
}

// 메타데이터 생성 - SEO 최적화
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, type: typeSlug } = await params;
  const hashType = getHashTypeBySlug(typeSlug);

  if (!hashType) {
    return {
      title: "Hash Type Not Found",
    };
  }

  const title =
    hashType.title[locale as keyof typeof hashType.title] || hashType.title.en;
  const description =
    hashType.description[locale as keyof typeof hashType.description] ||
    hashType.description.en;
  const keywords =
    hashType.keywords[locale as keyof typeof hashType.keywords] ||
    hashType.keywords.en;

  const ogImageUrl = `/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`;

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: "website",
      url: `${SITE_CONFIG.url}/${locale}/hash/${typeSlug}`,
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
      canonical: `${SITE_CONFIG.url}/${locale}/hash/${typeSlug}`,
      languages: {
        en: `${SITE_CONFIG.url}/en/hash/${typeSlug}`,
        ko: `${SITE_CONFIG.url}/ko/hash/${typeSlug}`,
        ja: `${SITE_CONFIG.url}/ja/hash/${typeSlug}`,
      },
    },
  };
}

export default async function HashTypePage({ params }: PageProps) {
  const { locale, type: typeSlug } = await params;
  setRequestLocale(locale);

  const hashType = getHashTypeBySlug(typeSlug);

  if (!hashType) {
    notFound();
  }

  const title =
    hashType.title[locale as keyof typeof hashType.title] || hashType.title.en;
  const description =
    hashType.description[locale as keyof typeof hashType.description] ||
    hashType.description.en;

  const relatedTypes = getRelatedHashTypes(typeSlug, 6);

  const breadcrumbItems = [
    {
      name: locale === "ko" ? "홈" : locale === "ja" ? "ホーム" : "Home",
      url: SITE_CONFIG.url,
    },
    {
      name:
        locale === "ko"
          ? "해시 도구"
          : locale === "ja"
            ? "ハッシュツール"
            : "Hash Tools",
      url: `${SITE_CONFIG.url}/${locale}/tools/hash-generator`,
    },
    {
      name: hashType.algorithm,
      url: `${SITE_CONFIG.url}/${locale}/hash/${typeSlug}`,
    },
  ];

  // FAQ 생성
  const faqs =
    locale === "ko"
      ? [
          {
            q: `${hashType.algorithm} 해시란 무엇인가요?`,
            a: description,
          },
          {
            q: `${hashType.algorithm}은 안전한가요?`,
            a: hashType.isSecure
              ? `네, ${hashType.algorithm}은 현재 암호화 용도로 안전하게 사용할 수 있습니다.`
              : `${hashType.algorithm}은 보안 목적으로는 권장되지 않습니다. 체크섬이나 비보안 용도로만 사용하세요.`,
          },
          {
            q: "무료로 사용할 수 있나요?",
            a: "네, 완전히 무료입니다. 회원가입 없이 무제한으로 사용할 수 있습니다.",
          },
        ]
      : locale === "ja"
        ? [
            {
              q: `${hashType.algorithm}ハッシュとは何ですか？`,
              a: description,
            },
            {
              q: `${hashType.algorithm}は安全ですか？`,
              a: hashType.isSecure
                ? `はい、${hashType.algorithm}は現在、暗号用途で安全に使用できます。`
                : `${hashType.algorithm}はセキュリティ目的では推奨されません。チェックサムや非セキュリティ用途にのみ使用してください。`,
            },
            {
              q: "無料で使用できますか？",
              a: "はい、完全に無料です。登録なしで無制限に使用できます。",
            },
          ]
        : [
            {
              q: `What is ${hashType.algorithm} hash?`,
              a: description,
            },
            {
              q: `Is ${hashType.algorithm} secure?`,
              a: hashType.isSecure
                ? `Yes, ${hashType.algorithm} is currently secure for cryptographic purposes.`
                : `${hashType.algorithm} is not recommended for security purposes. Use it only for checksums or non-security applications.`,
            },
            {
              q: "Is this tool free to use?",
              a: "Yes, it's completely free. No signup required and unlimited usage.",
            },
          ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <SoftwareApplicationJsonLd
        name={title}
        description={description}
        url={`${SITE_CONFIG.url}/${locale}/hash/${typeSlug}`}
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
          <span className="text-foreground">{hashType.algorithm}</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
            {hashType.isSecure ? (
              <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            )}
          </div>
          <p className="text-muted-foreground">{description}</p>

          {/* Quick Links */}
          <div className="flex flex-wrap gap-2 mt-4">
            <Link href={`/${locale}/tools/hash-generator`}>
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4 mr-1" />
                {locale === "ko"
                  ? "모든 해시 도구"
                  : locale === "ja"
                    ? "すべてのハッシュツール"
                    : "All Hash Tools"}
              </Button>
            </Link>
          </div>
        </div>

        {/* Hash Tool */}
        <div className="rounded-lg border p-6 mb-8">
          <HashTypeTool hashType={hashType} locale={locale} />
        </div>

        {/* SEO Content */}
        <section className="space-y-6 border-t pt-8">
          {/* Use Cases */}
          {hashType.useCases && (
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
                  hashType.useCases[locale as keyof typeof hashType.useCases] ||
                  hashType.useCases.en
                ).map((useCase, index) => (
                  <li key={index}>{useCase}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Technical Details */}
          <div>
            <h2 className="text-xl font-semibold mb-3">
              {locale === "ko"
                ? "기술 사양"
                : locale === "ja"
                  ? "技術仕様"
                  : "Technical Specifications"}
            </h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-muted/50 rounded p-3">
                <div className="text-muted-foreground mb-1">
                  {locale === "ko"
                    ? "알고리즘"
                    : locale === "ja"
                      ? "アルゴリズム"
                      : "Algorithm"}
                </div>
                <div className="font-mono font-medium">
                  {hashType.algorithm}
                </div>
              </div>
              {hashType.outputLength && (
                <div className="bg-muted/50 rounded p-3">
                  <div className="text-muted-foreground mb-1">
                    {locale === "ko"
                      ? "출력 길이"
                      : locale === "ja"
                        ? "出力長"
                        : "Output Length"}
                  </div>
                  <div className="font-mono font-medium">
                    {hashType.outputLength} bits ({hashType.outputLength / 4}{" "}
                    hex chars)
                  </div>
                </div>
              )}
              <div className="bg-muted/50 rounded p-3">
                <div className="text-muted-foreground mb-1">
                  {locale === "ko"
                    ? "보안 상태"
                    : locale === "ja"
                      ? "セキュリティ状態"
                      : "Security Status"}
                </div>
                <div
                  className={`font-medium ${hashType.isSecure ? "text-green-600 dark:text-green-400" : "text-amber-600 dark:text-amber-400"}`}
                >
                  {hashType.isSecure
                    ? locale === "ko"
                      ? "안전"
                      : locale === "ja"
                        ? "安全"
                        : "Secure"
                    : locale === "ko"
                      ? "비권장"
                      : locale === "ja"
                        ? "非推奨"
                        : "Not Recommended"}
                </div>
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
                  ? "무료 & 무제한 - 회원가입 없이 무제한 사용"
                  : locale === "ja"
                    ? "無料＆無制限 - 登録なしで無制限に使用可能"
                    : "Free & unlimited - no signup required"}
              </li>
              <li>
                {locale === "ko"
                  ? "실시간 계산 - 입력하는 동안 자동 계산"
                  : locale === "ja"
                    ? "リアルタイム計算 - 入力中に自動計算"
                    : "Real-time computation - calculates as you type"}
              </li>
              <li>
                {locale === "ko"
                  ? "원클릭 복사 - 결과를 클립보드에 즉시 복사"
                  : locale === "ja"
                    ? "ワンクリックコピー - 結果をクリップボードに即座にコピー"
                    : "One-click copy - instantly copy results to clipboard"}
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

          {/* Related Hash Tools */}
          {relatedTypes.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-3">
                {locale === "ko"
                  ? "관련 해시 도구"
                  : locale === "ja"
                    ? "関連ハッシュツール"
                    : "Related Hash Tools"}
              </h2>
              <div className="flex flex-wrap gap-2">
                {relatedTypes.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/${locale}/hash/${related.slug}`}
                  >
                    <Button variant="outline" size="sm">
                      {related.algorithm}
                      {related.isSecure ? (
                        <Shield className="h-3 w-3 ml-1 text-green-600" />
                      ) : (
                        <AlertTriangle className="h-3 w-3 ml-1 text-amber-500" />
                      )}
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
