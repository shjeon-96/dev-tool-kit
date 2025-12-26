import { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Button } from "@/shared/ui";
import { ConverterTool } from "@/features/converter";
import { ImageConverter, type ImageFormat } from "@/features/image-converter";
import {
  getAllConversionSlugs,
  getConversionBySlug,
  getReverseSlug,
} from "@/entities/converter";
import { SITE_CONFIG } from "@/shared/config";
import { routing } from "@/i18n/routing";

interface PageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

// 정적 파라미터 생성 - 모든 변환 페이지 사전 생성
export async function generateStaticParams() {
  const slugs = getAllConversionSlugs();
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug })),
  );
}

// 메타데이터 생성 - SEO 최적화
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const conversion = getConversionBySlug(slug);

  if (!conversion) {
    return {
      title: "Converter Not Found",
    };
  }

  const title =
    conversion.title[locale as keyof typeof conversion.title] ||
    conversion.title.en;
  const description =
    conversion.description[locale as keyof typeof conversion.description] ||
    conversion.description.en;
  const keywords =
    conversion.keywords[locale as keyof typeof conversion.keywords] ||
    conversion.keywords.en;

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: "website",
      url: `${SITE_CONFIG.url}/${locale}/convert/${slug}`,
      images: [
        {
          url: `${SITE_CONFIG.url}/api/og/${conversion.relatedTool || "default"}?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`,
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
    },
    alternates: {
      canonical: `${SITE_CONFIG.url}/${locale}/convert/${slug}`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [
          l,
          `${SITE_CONFIG.url}/${l}/convert/${slug}`,
        ]),
      ),
    },
  };
}

export default async function ConverterPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const conversion = getConversionBySlug(slug);

  if (!conversion) {
    notFound();
  }

  const title =
    conversion.title[locale as keyof typeof conversion.title] ||
    conversion.title.en;
  const description =
    conversion.description[locale as keyof typeof conversion.description] ||
    conversion.description.en;

  const reverseSlug = getReverseSlug(slug);

  // 관련 도구 링크
  const relatedToolLink = conversion.relatedTool
    ? `/${locale}/tools/${conversion.relatedTool}`
    : null;

  return (
    <div className="container max-w-4xl mx-auto py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href={`/${locale}`} className="hover:text-foreground">
          {locale === "ko" ? "홈" : locale === "ja" ? "ホーム" : "Home"}
        </Link>
        <span>/</span>
        <Link href={`/${locale}/convert`} className="hover:text-foreground">
          {locale === "ko"
            ? "변환 도구"
            : locale === "ja"
              ? "変換ツール"
              : "Converters"}
        </Link>
        <span>/</span>
        <span className="text-foreground">{title}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">{title}</h1>
        <p className="text-muted-foreground">{description}</p>

        {/* Quick Links */}
        <div className="flex flex-wrap gap-2 mt-4">
          {reverseSlug && (
            <Link href={`/${locale}/convert/${reverseSlug}`}>
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-1" />
                {locale === "ko"
                  ? "역변환"
                  : locale === "ja"
                    ? "逆変換"
                    : "Reverse"}
              </Button>
            </Link>
          )}
          {relatedToolLink && (
            <Link href={relatedToolLink}>
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4 mr-1" />
                {locale === "ko"
                  ? "전체 도구"
                  : locale === "ja"
                    ? "フルツール"
                    : "Full Tool"}
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Converter Tool */}
      {conversion.category === "image" ? (
        <ImageConverter
          defaultFormat={
            ["jpeg", "png", "webp", "gif", "avif"].includes(conversion.to)
              ? (conversion.to as ImageFormat)
              : undefined
          }
        />
      ) : (
        <ConverterTool conversion={conversion} locale={locale} />
      )}

      {/* SEO Content */}
      <section className="mt-12 space-y-6 border-t pt-8">
        <div>
          <h2 className="text-xl font-semibold mb-3">
            {locale === "ko"
              ? "이 도구에 대해"
              : locale === "ja"
                ? "このツールについて"
                : "About This Tool"}
          </h2>
          <p className="text-muted-foreground">{description}</p>
        </div>

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
                ? "실시간 변환 - 입력과 동시에 결과 표시"
                : locale === "ja"
                  ? "リアルタイム変換 - 入力と同時に結果を表示"
                  : "Real-time conversion - results shown as you type"}
            </li>
            <li>
              {locale === "ko"
                ? "무료 & 무제한 - 회원가입 없이 무제한 사용"
                : locale === "ja"
                  ? "無料＆無制限 - 登録なしで無制限に使用可能"
                  : "Free & unlimited - no signup required"}
            </li>
            {conversion.direction === "bidirectional" && (
              <li>
                {locale === "ko"
                  ? "양방향 변환 지원"
                  : locale === "ja"
                    ? "双方向変換をサポート"
                    : "Bidirectional conversion supported"}
              </li>
            )}
          </ul>
        </div>

        {/* Related Converters */}
        <div>
          <h2 className="text-xl font-semibold mb-3">
            {locale === "ko"
              ? "관련 변환 도구"
              : locale === "ja"
                ? "関連変換ツール"
                : "Related Converters"}
          </h2>
          <div className="flex flex-wrap gap-2">
            {getRelatedSlugs(slug).map((relatedSlug) => {
              const related = getConversionBySlug(relatedSlug);
              if (!related) return null;
              return (
                <Link
                  key={relatedSlug}
                  href={`/${locale}/convert/${relatedSlug}`}
                >
                  <Button variant="outline" size="sm">
                    {related.title[locale as keyof typeof related.title] ||
                      related.title.en}
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

// 관련 변환 도구 가져오기 (같은 카테고리에서 최대 4개)
function getRelatedSlugs(currentSlug: string): string[] {
  const current = getConversionBySlug(currentSlug);
  if (!current) return [];

  const allSlugs = getAllConversionSlugs();
  return allSlugs
    .filter((slug) => {
      if (slug === currentSlug) return false;
      const conversion = getConversionBySlug(slug);
      return conversion?.category === current.category;
    })
    .slice(0, 4);
}
