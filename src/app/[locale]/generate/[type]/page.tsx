import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { Sparkles, ExternalLink } from "lucide-react";
import { Button } from "@/shared/ui";
import { GenerateTypeTool } from "@/features/generate-type";
import {
  getAllGenerateTypeSlugs,
  getGenerateTypeBySlug,
  getRelatedGenerateTypes,
} from "@/entities/generate-type";
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
  const slugs = getAllGenerateTypeSlugs();
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
  const genType = getGenerateTypeBySlug(typeSlug);

  if (!genType) {
    return { title: "Generator Not Found" };
  }

  const title =
    genType.title[locale as keyof typeof genType.title] || genType.title.en;

  const description =
    genType.description[locale as keyof typeof genType.description] ||
    genType.description.en;

  const keywords =
    genType.keywords[locale as keyof typeof genType.keywords] ||
    genType.keywords.en;

  const ogImageUrl = `/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`;

  return {
    title,
    description,
    keywords: [...keywords, "generator", "online", "free"],
    openGraph: {
      title,
      description,
      type: "website",
      url: `${SITE_CONFIG.url}/${locale}/generate/${typeSlug}`,
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: `${SITE_CONFIG.url}/${locale}/generate/${typeSlug}`,
      languages: {
        en: `${SITE_CONFIG.url}/en/generate/${typeSlug}`,
        ko: `${SITE_CONFIG.url}/ko/generate/${typeSlug}`,
        ja: `${SITE_CONFIG.url}/ja/generate/${typeSlug}`,
      },
    },
  };
}

export default async function GeneratePage({ params }: PageProps) {
  const { locale, type: typeSlug } = await params;
  setRequestLocale(locale);

  const genType = getGenerateTypeBySlug(typeSlug);

  if (!genType) {
    notFound();
  }

  const title =
    genType.title[locale as keyof typeof genType.title] || genType.title.en;

  const description =
    genType.description[locale as keyof typeof genType.description] ||
    genType.description.en;

  const relatedTypes = getRelatedGenerateTypes(typeSlug, 6);

  const breadcrumbItems = [
    {
      name: locale === "ko" ? "홈" : locale === "ja" ? "ホーム" : "Home",
      url: SITE_CONFIG.url,
    },
    {
      name:
        locale === "ko"
          ? "생성기"
          : locale === "ja"
            ? "ジェネレーター"
            : "Generators",
      url: `${SITE_CONFIG.url}/${locale}/tools`,
    },
    {
      name: genType.name,
      url: `${SITE_CONFIG.url}/${locale}/generate/${typeSlug}`,
    },
  ];

  const faqs =
    locale === "ko"
      ? [
          {
            q: `${genType.name} 생성기란 무엇인가요?`,
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
              q: `${genType.name}ジェネレーターとは何ですか？`,
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
              q: `What is a ${genType.name} Generator?`,
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
        url={`${SITE_CONFIG.url}/${locale}/generate/${typeSlug}`}
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
          <span className="text-foreground">{genType.name}</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
          </div>
          <p className="text-muted-foreground">{description}</p>

          {/* Quick Links to Related Main Tools */}
          <div className="flex flex-wrap gap-2 mt-4">
            {typeSlug === "uuid" && (
              <Link href={`/${locale}/tools/uuid-generator`}>
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4 mr-1" />
                  {locale === "ko"
                    ? "UUID 생성기"
                    : locale === "ja"
                      ? "UUIDジェネレーター"
                      : "UUID Generator"}
                </Button>
              </Link>
            )}
            {typeSlug === "password" && (
              <Link href={`/${locale}/tools/password-generator`}>
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4 mr-1" />
                  {locale === "ko"
                    ? "비밀번호 생성기"
                    : locale === "ja"
                      ? "パスワードジェネレーター"
                      : "Password Generator"}
                </Button>
              </Link>
            )}
            {typeSlug === "color" && (
              <Link href={`/${locale}/tools/color-picker`}>
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4 mr-1" />
                  {locale === "ko"
                    ? "색상 선택기"
                    : locale === "ja"
                      ? "カラーピッカー"
                      : "Color Picker"}
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Tool */}
        <div className="rounded-lg border p-6 mb-8">
          <GenerateTypeTool type={genType} locale={locale} />
        </div>

        {/* SEO Content */}
        <section className="space-y-6 border-t pt-8">
          {/* Use Cases */}
          {genType.useCases && (
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
                  genType.useCases[locale as keyof typeof genType.useCases] ||
                  genType.useCases.en
                ).map((useCase, index) => (
                  <li key={index}>{useCase}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Output Example */}
          <div>
            <h2 className="text-xl font-semibold mb-3">
              {locale === "ko"
                ? "출력 예시"
                : locale === "ja"
                  ? "出力例"
                  : "Output Example"}
            </h2>
            <div className="p-4 bg-muted rounded-lg font-mono text-sm break-all">
              {genType.outputExample}
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
                  ? "일괄 생성 - 한 번에 여러 개 생성 가능"
                  : locale === "ja"
                    ? "一括生成 - 一度に複数生成可能"
                    : "Bulk generation - generate multiple items at once"}
              </li>
              <li>
                {locale === "ko"
                  ? "원클릭 복사 - 결과를 클립보드에 즉시 복사"
                  : locale === "ja"
                    ? "ワンクリックコピー - 結果をクリップボードに即座にコピー"
                    : "One-click copy - instantly copy results to clipboard"}
              </li>
              <li>
                {locale === "ko"
                  ? "커스터마이즈 가능 - 길이, 형식 등 옵션 설정"
                  : locale === "ja"
                    ? "カスタマイズ可能 - 長さ、形式などのオプション設定"
                    : "Customizable - set options like length and format"}
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

          {/* Related Generators */}
          {relatedTypes.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-3">
                {locale === "ko"
                  ? "관련 생성기"
                  : locale === "ja"
                    ? "関連ジェネレーター"
                    : "Related Generators"}
              </h2>
              <div className="flex flex-wrap gap-2">
                {relatedTypes.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/${locale}/generate/${related.slug}`}
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
