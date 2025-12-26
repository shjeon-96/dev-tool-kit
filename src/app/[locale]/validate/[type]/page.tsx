import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { CheckCircle2, Shield, Zap, Lock } from "lucide-react";
import { Button } from "@/shared/ui";
import { ValidateTypeTool } from "@/features/validate-type";
import {
  getAllValidateTypeSlugs,
  getValidateTypeBySlug,
  getRelatedValidateTypes,
} from "@/entities/validate-type";
import type { LocaleKey } from "@/entities/validate-type";
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
  const slugs = getAllValidateTypeSlugs();
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, type: slug })),
  );
}

// 메타데이터 생성
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, type: typeSlug } = await params;
  const validateType = getValidateTypeBySlug(typeSlug);

  if (!validateType) {
    return { title: "Validator Not Found" };
  }

  const localeKey = locale as LocaleKey;
  const content = validateType.content[localeKey] || validateType.content.en;

  const ogImageUrl = `/api/og?title=${encodeURIComponent(content.metaTitle)}&description=${encodeURIComponent(content.metaDescription)}`;

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    keywords: [...content.keywords, "validator", "checker", "online", "free"],
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      type: "website",
      url: `${SITE_CONFIG.url}/${locale}/validate/${typeSlug}`,
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
      canonical: `${SITE_CONFIG.url}/${locale}/validate/${typeSlug}`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [
          l,
          `${SITE_CONFIG.url}/${l}/validate/${typeSlug}`,
        ]),
      ),
    },
  };
}

export default async function ValidatePage({ params }: PageProps) {
  const { locale, type: typeSlug } = await params;
  setRequestLocale(locale);

  const validateType = getValidateTypeBySlug(typeSlug);

  if (!validateType) {
    notFound();
  }

  const localeKey = locale as LocaleKey;
  const content = validateType.content[localeKey] || validateType.content.en;

  const relatedTypes = getRelatedValidateTypes(
    typeSlug as Parameters<typeof getRelatedValidateTypes>[0],
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
          ? "검증 도구"
          : locale === "ja"
            ? "検証ツール"
            : "Validators",
      url: `${SITE_CONFIG.url}/${locale}/tools`,
    },
    {
      name: content.title,
      url: `${SITE_CONFIG.url}/${locale}/validate/${typeSlug}`,
    },
  ];

  const faqs =
    locale === "ko"
      ? [
          {
            q: `${validateType.name} 검증이란 무엇인가요?`,
            a: content.description,
          },
          {
            q: "검증이 실패하면 어떻게 되나요?",
            a: "오류 메시지와 함께 문제가 있는 부분을 알려드립니다. 경고도 함께 표시되어 잠재적인 문제를 파악할 수 있습니다.",
          },
          {
            q: "데이터가 안전한가요?",
            a: "모든 검증은 브라우저에서 로컬로 처리됩니다. 데이터가 서버로 전송되지 않습니다.",
          },
        ]
      : locale === "ja"
        ? [
            {
              q: `${validateType.name}の検証とは何ですか？`,
              a: content.description,
            },
            {
              q: "検証に失敗した場合はどうなりますか？",
              a: "エラーメッセージとともに問題のある箇所をお知らせします。警告も表示され、潜在的な問題を把握できます。",
            },
            {
              q: "データは安全ですか？",
              a: "すべての検証はブラウザでローカルに処理されます。データはサーバーに送信されません。",
            },
          ]
        : [
            {
              q: `What is ${validateType.name} validation?`,
              a: content.description,
            },
            {
              q: "What happens if validation fails?",
              a: "You'll receive error messages indicating the problem areas. Warnings are also shown to identify potential issues.",
            },
            {
              q: "Is my data safe?",
              a: "All validation happens locally in your browser. Your data never leaves your device.",
            },
          ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <SoftwareApplicationJsonLd
        name={content.title}
        description={content.description}
        url={`${SITE_CONFIG.url}/${locale}/validate/${typeSlug}`}
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
            <CheckCircle2 className="h-6 w-6 text-primary" />
            <h1 className="text-2xl md:text-3xl font-bold">{content.title}</h1>
          </div>
          <p className="text-muted-foreground">{content.description}</p>
        </div>

        {/* Tool */}
        <div className="rounded-lg border p-6 mb-8">
          <ValidateTypeTool type={validateType} locale={locale} />
        </div>

        {/* SEO Content */}
        <section className="space-y-6 border-t pt-8">
          {/* Validation Rules */}
          <div>
            <h2 className="text-xl font-semibold mb-3">
              {locale === "ko"
                ? "검증 규칙"
                : locale === "ja"
                  ? "検証ルール"
                  : "Validation Rules"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {content.validationRules.map((rule, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg"
                >
                  {index === 0 ? (
                    <Shield className="h-5 w-5 text-info flex-shrink-0 mt-0.5" />
                  ) : index === 1 ? (
                    <Zap className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
                  ) : (
                    <Lock className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                  )}
                  <span className="text-sm">{rule}</span>
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
                  ? "즉시 검증 - 실시간 결과 확인"
                  : locale === "ja"
                    ? "即座に検証 - リアルタイムで結果確認"
                    : "Instant validation - real-time results"}
              </li>
              <li>
                {locale === "ko"
                  ? "상세한 오류 메시지 - 문제 파악 용이"
                  : locale === "ja"
                    ? "詳細なエラーメッセージ - 問題把握が容易"
                    : "Detailed error messages - easy problem identification"}
              </li>
              <li>
                {locale === "ko"
                  ? "경고 표시 - 잠재적 문제 사전 감지"
                  : locale === "ja"
                    ? "警告表示 - 潜在的な問題の事前検出"
                    : "Warning display - detect potential issues early"}
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
                  ? "관련 검증 도구"
                  : locale === "ja"
                    ? "関連検証ツール"
                    : "Related Validators"}
              </h2>
              <div className="flex flex-wrap gap-2">
                {relatedTypes.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/${locale}/validate/${related.slug}`}
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
