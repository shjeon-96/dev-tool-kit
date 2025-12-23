import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { ExternalLink, FileCode } from "lucide-react";
import { Button } from "@/shared/ui";
import { EncodeDecodeTool } from "@/features/encode-decode-type";
import {
  getAllEncodeDecodeTypeSlugs,
  getEncodeDecodeTypeBySlug,
  getRelatedEncodeDecodeTypes,
} from "@/entities/encode-decode-type";
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
  const slugs = getAllEncodeDecodeTypeSlugs();
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
  const decType = getEncodeDecodeTypeBySlug(typeSlug);

  if (!decType) {
    return { title: "Decoder Not Found" };
  }

  const title =
    locale === "ko"
      ? `${decType.name} 디코더 - 온라인 ${decType.name} 디코딩`
      : locale === "ja"
        ? `${decType.name}デコーダー - オンライン${decType.name}デコード`
        : `${decType.name} Decoder - Online ${decType.name} Decoding`;

  const description =
    locale === "ko"
      ? `${decType.name}으로 인코딩된 데이터를 원본으로 디코딩합니다. 무료 온라인 ${decType.name} 디코더.`
      : locale === "ja"
        ? `${decType.name}でエンコードされたデータを元に戻します。無料オンライン${decType.name}デコーダー。`
        : `Decode ${decType.name} encoded data back to original. Free online ${decType.name} decoder.`;

  const keywords =
    decType.keywords[locale as keyof typeof decType.keywords] ||
    decType.keywords.en;

  const ogImageUrl = `/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`;

  return {
    title,
    description,
    keywords: [...keywords, "decoder", "online", "free"],
    openGraph: {
      title,
      description,
      type: "website",
      url: `${SITE_CONFIG.url}/${locale}/decode/${typeSlug}`,
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: `${SITE_CONFIG.url}/${locale}/decode/${typeSlug}`,
      languages: {
        en: `${SITE_CONFIG.url}/en/decode/${typeSlug}`,
        ko: `${SITE_CONFIG.url}/ko/decode/${typeSlug}`,
        ja: `${SITE_CONFIG.url}/ja/decode/${typeSlug}`,
      },
    },
  };
}

export default async function DecodePage({ params }: PageProps) {
  const { locale, type: typeSlug } = await params;
  setRequestLocale(locale);

  const decType = getEncodeDecodeTypeBySlug(typeSlug);

  if (!decType) {
    notFound();
  }

  const title =
    locale === "ko"
      ? `${decType.name} 디코더`
      : locale === "ja"
        ? `${decType.name}デコーダー`
        : `${decType.name} Decoder`;

  const description =
    locale === "ko"
      ? `${decType.name}으로 인코딩된 데이터를 원본으로 디코딩합니다.`
      : locale === "ja"
        ? `${decType.name}でエンコードされたデータを元に戻します。`
        : `Decode ${decType.name} encoded data back to original.`;

  const relatedTypes = getRelatedEncodeDecodeTypes(typeSlug, 6);

  const breadcrumbItems = [
    {
      name: locale === "ko" ? "홈" : locale === "ja" ? "ホーム" : "Home",
      url: SITE_CONFIG.url,
    },
    {
      name:
        locale === "ko"
          ? "디코더"
          : locale === "ja"
            ? "デコーダー"
            : "Decoders",
      url: `${SITE_CONFIG.url}/${locale}/tools`,
    },
    {
      name: title,
      url: `${SITE_CONFIG.url}/${locale}/decode/${typeSlug}`,
    },
  ];

  const faqs =
    locale === "ko"
      ? [
          {
            q: `${decType.name} 디코딩이란 무엇인가요?`,
            a: `${decType.name}으로 인코딩된 데이터를 원래의 형태로 변환하는 과정입니다.`,
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
              q: `${decType.name}デコードとは何ですか？`,
              a: `${decType.name}でエンコードされたデータを元の形式に変換するプロセスです。`,
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
              q: `What is ${decType.name} decoding?`,
              a: `The process of converting ${decType.name} encoded data back to its original form.`,
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
        url={`${SITE_CONFIG.url}/${locale}/decode/${typeSlug}`}
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
            <FileCode className="h-6 w-6 text-primary" />
            <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
          </div>
          <p className="text-muted-foreground">{description}</p>

          {/* Quick Links */}
          <div className="flex flex-wrap gap-2 mt-4">
            <Link href={`/${locale}/encode/${typeSlug}`}>
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4 mr-1" />
                {locale === "ko"
                  ? `${decType.name} 인코더`
                  : locale === "ja"
                    ? `${decType.name}エンコーダー`
                    : `${decType.name} Encoder`}
              </Button>
            </Link>
          </div>
        </div>

        {/* Tool */}
        <div className="rounded-lg border p-6 mb-8">
          <EncodeDecodeTool
            type={decType}
            locale={locale}
            initialMode="decode"
          />
        </div>

        {/* SEO Content */}
        <section className="space-y-6 border-t pt-8">
          {/* Use Cases */}
          {decType.useCases && (
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
                  decType.useCases[locale as keyof typeof decType.useCases] ||
                  decType.useCases.en
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
                  ? "실시간 변환 - 입력하는 동안 자동 디코딩"
                  : locale === "ja"
                    ? "リアルタイム変換 - 入力中に自動デコード"
                    : "Real-time conversion - decodes as you type"}
              </li>
              <li>
                {locale === "ko"
                  ? "에러 감지 - 잘못된 입력 시 명확한 오류 메시지"
                  : locale === "ja"
                    ? "エラー検出 - 不正な入力時に明確なエラーメッセージ"
                    : "Error detection - clear error messages for invalid input"}
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
                  ? "관련 디코더"
                  : locale === "ja"
                    ? "関連デコーダー"
                    : "Related Decoders"}
              </h2>
              <div className="flex flex-wrap gap-2">
                {relatedTypes.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/${locale}/decode/${related.slug}`}
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
