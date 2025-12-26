import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { ExternalLink, Code } from "lucide-react";
import { Button } from "@/shared/ui";
import { EncodeDecodeTool } from "@/features/encode-decode-type";
import {
  getAllEncodeDecodeTypeSlugs,
  getEncodeDecodeTypeBySlug,
  getRelatedEncodeDecodeTypes,
} from "@/entities/encode-decode-type";
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
  const slugs = getAllEncodeDecodeTypeSlugs();
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, type: slug })),
  );
}

// 메타데이터 생성
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, type: typeSlug } = await params;
  const encType = getEncodeDecodeTypeBySlug(typeSlug);

  if (!encType) {
    return { title: "Encoder Not Found" };
  }

  const title =
    locale === "ko"
      ? `${encType.name} 인코더 - 온라인 ${encType.name} 인코딩`
      : locale === "ja"
        ? `${encType.name}エンコーダー - オンライン${encType.name}エンコード`
        : `${encType.name} Encoder - Online ${encType.name} Encoding`;

  const description =
    encType.description[locale as keyof typeof encType.description] ||
    encType.description.en;
  const keywords =
    encType.keywords[locale as keyof typeof encType.keywords] ||
    encType.keywords.en;

  const ogImageUrl = `/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`;

  return {
    title,
    description,
    keywords: [...keywords, "encoder", "online", "free"],
    openGraph: {
      title,
      description,
      type: "website",
      url: `${SITE_CONFIG.url}/${locale}/encode/${typeSlug}`,
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: `${SITE_CONFIG.url}/${locale}/encode/${typeSlug}`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [
          l,
          `${SITE_CONFIG.url}/${l}/encode/${typeSlug}`,
        ]),
      ),
    },
  };
}

export default async function EncodePage({ params }: PageProps) {
  const { locale, type: typeSlug } = await params;
  setRequestLocale(locale);

  const encType = getEncodeDecodeTypeBySlug(typeSlug);

  if (!encType) {
    notFound();
  }

  const title =
    locale === "ko"
      ? `${encType.name} 인코더`
      : locale === "ja"
        ? `${encType.name}エンコーダー`
        : `${encType.name} Encoder`;

  const description =
    encType.description[locale as keyof typeof encType.description] ||
    encType.description.en;

  const relatedTypes = getRelatedEncodeDecodeTypes(typeSlug, 6);

  const breadcrumbItems = [
    {
      name: locale === "ko" ? "홈" : locale === "ja" ? "ホーム" : "Home",
      url: SITE_CONFIG.url,
    },
    {
      name:
        locale === "ko"
          ? "인코더"
          : locale === "ja"
            ? "エンコーダー"
            : "Encoders",
      url: `${SITE_CONFIG.url}/${locale}/tools`,
    },
    {
      name: title,
      url: `${SITE_CONFIG.url}/${locale}/encode/${typeSlug}`,
    },
  ];

  const faqs =
    locale === "ko"
      ? [
          {
            q: `${encType.name} 인코딩이란 무엇인가요?`,
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
              q: `${encType.name}エンコードとは何ですか？`,
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
              q: `What is ${encType.name} encoding?`,
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
        url={`${SITE_CONFIG.url}/${locale}/encode/${typeSlug}`}
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
          <span className="text-foreground">{title}</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Code className="h-6 w-6 text-primary" />
            <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
          </div>
          <p className="text-muted-foreground">{description}</p>

          {/* Quick Links */}
          <div className="flex flex-wrap gap-2 mt-4">
            <Link href={`/${locale}/decode/${typeSlug}`}>
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4 mr-1" />
                {locale === "ko"
                  ? `${encType.name} 디코더`
                  : locale === "ja"
                    ? `${encType.name}デコーダー`
                    : `${encType.name} Decoder`}
              </Button>
            </Link>
          </div>
        </div>

        {/* Tool */}
        <div className="rounded-lg border p-6 mb-8">
          <EncodeDecodeTool
            type={encType}
            locale={locale}
            initialMode="encode"
          />
        </div>

        {/* SEO Content */}
        <section className="space-y-6 border-t pt-8">
          {/* Use Cases */}
          {encType.useCases && (
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
                  encType.useCases[locale as keyof typeof encType.useCases] ||
                  encType.useCases.en
                ).map((useCase, index) => (
                  <li key={index}>{useCase}</li>
                ))}
              </ul>
            </div>
          )}

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
                  ? "실시간 변환 - 입력하는 동안 자동 인코딩"
                  : locale === "ja"
                    ? "リアルタイム変換 - 入力中に自動エンコード"
                    : "Real-time conversion - encodes as you type"}
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

          {/* Related Tools */}
          {relatedTypes.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-3">
                {locale === "ko"
                  ? "관련 인코더"
                  : locale === "ja"
                    ? "関連エンコーダー"
                    : "Related Encoders"}
              </h2>
              <div className="flex flex-wrap gap-2">
                {relatedTypes.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/${locale}/encode/${related.slug}`}
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
