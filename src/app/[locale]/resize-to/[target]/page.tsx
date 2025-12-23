import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Button } from "@/shared/ui";
import { ResizeTargetTool } from "@/features/resize-target";
import {
  getAllResizeTargetSlugs,
  getResizeTargetBySlug,
  getRelatedResizeTargets,
} from "@/entities/image-resize-target";
import { SITE_CONFIG } from "@/shared/config";
import {
  BreadcrumbJsonLd,
  SoftwareApplicationJsonLd,
  FaqJsonLd,
} from "@/shared/ui";

interface PageProps {
  params: Promise<{
    locale: string;
    target: string;
  }>;
}

// 정적 파라미터 생성 - 모든 리사이즈 타겟 페이지 사전 생성
export async function generateStaticParams() {
  const slugs = getAllResizeTargetSlugs();
  const locales = ["en", "ko", "ja"];

  return locales.flatMap((locale) =>
    slugs.map((slug) => ({
      locale,
      target: slug,
    })),
  );
}

// 메타데이터 생성 - SEO 최적화
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, target: targetSlug } = await params;
  const target = getResizeTargetBySlug(targetSlug);

  if (!target) {
    return {
      title: "Resize Target Not Found",
    };
  }

  const title =
    target.title[locale as keyof typeof target.title] || target.title.en;
  const description =
    target.description[locale as keyof typeof target.description] ||
    target.description.en;
  const keywords =
    target.keywords[locale as keyof typeof target.keywords] ||
    target.keywords.en;

  const ogImageUrl = `/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`;

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: "website",
      url: `${SITE_CONFIG.url}/${locale}/resize-to/${targetSlug}`,
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
      canonical: `${SITE_CONFIG.url}/${locale}/resize-to/${targetSlug}`,
      languages: {
        en: `${SITE_CONFIG.url}/en/resize-to/${targetSlug}`,
        ko: `${SITE_CONFIG.url}/ko/resize-to/${targetSlug}`,
        ja: `${SITE_CONFIG.url}/ja/resize-to/${targetSlug}`,
      },
    },
  };
}

export default async function ResizeTargetPage({ params }: PageProps) {
  const { locale, target: targetSlug } = await params;
  setRequestLocale(locale);

  const target = getResizeTargetBySlug(targetSlug);

  if (!target) {
    notFound();
  }

  const title =
    target.title[locale as keyof typeof target.title] || target.title.en;
  const description =
    target.description[locale as keyof typeof target.description] ||
    target.description.en;

  const relatedTargets = getRelatedResizeTargets(targetSlug, 6);

  const breadcrumbItems = [
    {
      name: locale === "ko" ? "홈" : locale === "ja" ? "ホーム" : "Home",
      url: SITE_CONFIG.url,
    },
    {
      name:
        locale === "ko"
          ? "이미지 도구"
          : locale === "ja"
            ? "画像ツール"
            : "Image Tools",
      url: `${SITE_CONFIG.url}/${locale}/tools`,
    },
    {
      name: title,
      url: `${SITE_CONFIG.url}/${locale}/resize-to/${targetSlug}`,
    },
  ];

  // FAQ 생성
  const faqs =
    locale === "ko"
      ? [
          {
            q: `이미지를 ${getTargetLabel(target, locale)}로 어떻게 리사이즈하나요?`,
            a: "이미지를 업로드하면 자동으로 최적의 품질을 유지하면서 목표 크기로 리사이즈됩니다. 모든 처리는 브라우저에서 이루어지므로 개인정보가 안전합니다.",
          },
          {
            q: "무료로 사용할 수 있나요?",
            a: "네, 완전히 무료입니다. 회원가입 없이 무제한으로 사용할 수 있습니다.",
          },
          {
            q: "어떤 이미지 포맷을 지원하나요?",
            a: "PNG, JPEG, WebP, GIF 등 모든 주요 이미지 포맷을 지원합니다.",
          },
        ]
      : locale === "ja"
        ? [
            {
              q: `画像を${getTargetLabel(target, locale)}にリサイズする方法は？`,
              a: "画像をアップロードすると、最適な品質を維持しながら目標サイズに自動的にリサイズされます。すべての処理はブラウザで行われるため、プライバシーが保護されます。",
            },
            {
              q: "無料で使用できますか？",
              a: "はい、完全に無料です。登録なしで無制限に使用できます。",
            },
            {
              q: "どの画像形式に対応していますか？",
              a: "PNG、JPEG、WebP、GIFなど、すべての主要な画像形式に対応しています。",
            },
          ]
        : [
            {
              q: `How do I resize an image to ${getTargetLabel(target, locale)}?`,
              a: "Simply upload your image and it will automatically be resized to the target size while maintaining optimal quality. All processing happens in your browser, keeping your data private.",
            },
            {
              q: "Is this tool free to use?",
              a: "Yes, it's completely free. No signup required and unlimited usage.",
            },
            {
              q: "What image formats are supported?",
              a: "We support all major image formats including PNG, JPEG, WebP, and GIF.",
            },
          ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <SoftwareApplicationJsonLd
        name={title}
        description={description}
        url={`${SITE_CONFIG.url}/${locale}/resize-to/${targetSlug}`}
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
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{title}</h1>
          <p className="text-muted-foreground">{description}</p>

          {/* Quick Links */}
          <div className="flex flex-wrap gap-2 mt-4">
            <Link href={`/${locale}/tools/image-resizer`}>
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4 mr-1" />
                {locale === "ko"
                  ? "커스텀 리사이즈"
                  : locale === "ja"
                    ? "カスタムリサイズ"
                    : "Custom Resize"}
              </Button>
            </Link>
          </div>
        </div>

        {/* Resize Tool */}
        <div className="rounded-lg border p-6 mb-8">
          <ResizeTargetTool target={target} locale={locale} />
        </div>

        {/* SEO Content */}
        <section className="space-y-6 border-t pt-8">
          {/* Use Cases */}
          {target.useCases && (
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
                  target.useCases[locale as keyof typeof target.useCases] ||
                  target.useCases.en
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
                  ? "무료 & 무제한 - 회원가입 없이 무제한 사용"
                  : locale === "ja"
                    ? "無料＆無制限 - 登録なしで無制限に使用可能"
                    : "Free & unlimited - no signup required"}
              </li>
              <li>
                {locale === "ko"
                  ? "고품질 리사이즈 - 최적의 알고리즘으로 품질 유지"
                  : locale === "ja"
                    ? "高品質リサイズ - 最適なアルゴリズムで品質を維持"
                    : "High-quality resize - optimal algorithms maintain quality"}
              </li>
              <li>
                {locale === "ko"
                  ? "즉시 다운로드 - 처리 후 바로 다운로드"
                  : locale === "ja"
                    ? "即時ダウンロード - 処理後すぐにダウンロード"
                    : "Instant download - download immediately after processing"}
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
          {relatedTargets.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-3">
                {locale === "ko"
                  ? "관련 리사이즈 도구"
                  : locale === "ja"
                    ? "関連リサイズツール"
                    : "Related Resize Tools"}
              </h2>
              <div className="flex flex-wrap gap-2">
                {relatedTargets.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/${locale}/resize-to/${related.slug}`}
                  >
                    <Button variant="outline" size="sm">
                      {related.title[locale as keyof typeof related.title] ||
                        related.title.en}
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

// 타겟 라벨 생성 헬퍼
function getTargetLabel(
  target: ReturnType<typeof getResizeTargetBySlug>,
  locale: string,
): string {
  if (!target) return "";

  if (target.type === "file-size" && target.targetSizeKB) {
    return target.targetSizeKB >= 1024
      ? `${target.targetSizeKB / 1024}MB`
      : `${target.targetSizeKB}KB`;
  }
  if (target.targetWidth && target.targetHeight) {
    return `${target.targetWidth}×${target.targetHeight}px`;
  }
  return "";
}
