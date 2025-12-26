import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { ImageIcon, FileImage, Monitor, Smartphone } from "lucide-react";
import { Button } from "@/shared/ui";
import {
  allResizeTargets,
  getResizeTargetsByType,
} from "@/entities/image-resize-target";
import { SITE_CONFIG } from "@/shared/config";
import { BreadcrumbJsonLd, SoftwareApplicationJsonLd } from "@/shared/ui";

interface PageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;

  const title =
    locale === "ko"
      ? "이미지 리사이즈 도구 - 모든 크기 & 플랫폼"
      : locale === "ja"
        ? "画像リサイズツール - すべてのサイズ＆プラットフォーム"
        : "Image Resize Tools - All Sizes & Platforms";

  const description =
    locale === "ko"
      ? "10KB~2MB 파일 크기, 100x100~1920x1080 픽셀, Instagram, Facebook, YouTube, Twitter 등 소셜 미디어 플랫폼에 최적화된 무료 이미지 리사이즈 도구"
      : locale === "ja"
        ? "10KB〜2MBのファイルサイズ、100x100〜1920x1080ピクセル、Instagram、Facebook、YouTube、Twitterなどのソーシャルメディアプラットフォームに最適化された無料画像リサイズツール"
        : "Free image resize tools for 10KB-2MB file sizes, 100x100-1920x1080 pixels, optimized for Instagram, Facebook, YouTube, Twitter and more";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_CONFIG.url}/${locale}/resize-to`,
    },
    alternates: {
      canonical: `${SITE_CONFIG.url}/${locale}/resize-to`,
      languages: {
        en: `${SITE_CONFIG.url}/en/resize-to`,
        ko: `${SITE_CONFIG.url}/ko/resize-to`,
        ja: `${SITE_CONFIG.url}/ja/resize-to`,
      },
    },
  };
}

export default async function ResizeToIndexPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const fileSizeTargets = getResizeTargetsByType("file-size");
  const dimensionTargets = getResizeTargetsByType("dimension");
  const platformTargets = getResizeTargetsByType("platform");

  const labels = {
    en: {
      title: "Image Resize Tools",
      subtitle: "Resize images to exact sizes for any purpose",
      fileSize: "By File Size",
      fileSizeDesc: "Compress images to specific KB/MB limits",
      dimension: "By Dimension",
      dimensionDesc: "Resize to exact pixel dimensions",
      platform: "By Platform",
      platformDesc: "Optimized for social media and apps",
      customResize: "Need Custom Size?",
      customResizeDesc: "Use our full image resizer for any custom dimensions",
      goToResizer: "Go to Image Resizer",
    },
    ko: {
      title: "이미지 리사이즈 도구",
      subtitle: "모든 목적에 맞는 정확한 크기로 이미지 리사이즈",
      fileSize: "파일 크기별",
      fileSizeDesc: "특정 KB/MB 제한으로 이미지 압축",
      dimension: "해상도별",
      dimensionDesc: "정확한 픽셀 크기로 리사이즈",
      platform: "플랫폼별",
      platformDesc: "소셜 미디어 및 앱에 최적화",
      customResize: "커스텀 크기가 필요하신가요?",
      customResizeDesc: "모든 커스텀 크기를 위한 전체 이미지 리사이저 사용",
      goToResizer: "이미지 리사이저로 이동",
    },
    ja: {
      title: "画像リサイズツール",
      subtitle: "あらゆる目的に合わせた正確なサイズに画像をリサイズ",
      fileSize: "ファイルサイズ別",
      fileSizeDesc: "特定のKB/MB制限に画像を圧縮",
      dimension: "解像度別",
      dimensionDesc: "正確なピクセルサイズにリサイズ",
      platform: "プラットフォーム別",
      platformDesc: "ソーシャルメディアやアプリに最適化",
      customResize: "カスタムサイズが必要ですか？",
      customResizeDesc:
        "あらゆるカスタムサイズのためのフル画像リサイザーを使用",
      goToResizer: "画像リサイザーへ",
    },
  };

  const t = labels[locale as keyof typeof labels] || labels.en;

  const breadcrumbItems = [
    {
      name: locale === "ko" ? "홈" : locale === "ja" ? "ホーム" : "Home",
      url: SITE_CONFIG.url,
    },
    {
      name: t.title,
      url: `${SITE_CONFIG.url}/${locale}/resize-to`,
    },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <SoftwareApplicationJsonLd
        name={t.title}
        description={t.subtitle}
        url={`${SITE_CONFIG.url}/${locale}/resize-to`}
        applicationCategory="UtilitiesApplication"
      />

      <div className="container max-w-6xl mx-auto py-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{t.title}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* File Size Section */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-info/10">
              <FileImage className="h-5 w-5 text-info" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">{t.fileSize}</h2>
              <p className="text-sm text-muted-foreground">{t.fileSizeDesc}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {fileSizeTargets.map((target) => (
              <Link
                key={target.slug}
                href={`/${locale}/resize-to/${target.slug}`}
                className="group"
              >
                <div className="rounded-lg border p-4 hover:border-primary hover:bg-accent transition-colors">
                  <div className="text-lg font-semibold group-hover:text-primary">
                    {target.targetSizeKB! >= 1024
                      ? `${target.targetSizeKB! / 1024}MB`
                      : `${target.targetSizeKB}KB`}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {locale === "ko"
                      ? "클릭하여 리사이즈"
                      : locale === "ja"
                        ? "クリックしてリサイズ"
                        : "Click to resize"}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Dimension Section */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
              <Monitor className="h-5 w-5 text-success" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">{t.dimension}</h2>
              <p className="text-sm text-muted-foreground">{t.dimensionDesc}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {dimensionTargets.map((target) => (
              <Link
                key={target.slug}
                href={`/${locale}/resize-to/${target.slug}`}
                className="group"
              >
                <div className="rounded-lg border p-4 hover:border-primary hover:bg-accent transition-colors">
                  <div className="text-lg font-semibold group-hover:text-primary">
                    {target.targetWidth}×{target.targetHeight}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {locale === "ko"
                      ? "픽셀"
                      : locale === "ja"
                        ? "ピクセル"
                        : "pixels"}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Platform Section */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Smartphone className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">{t.platform}</h2>
              <p className="text-sm text-muted-foreground">{t.platformDesc}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {platformTargets.map((target) => (
              <Link
                key={target.slug}
                href={`/${locale}/resize-to/${target.slug}`}
                className="group"
              >
                <div className="rounded-lg border p-4 hover:border-primary hover:bg-accent transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium group-hover:text-primary">
                        {target.platform}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {target.targetWidth}×{target.targetHeight}px
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {target.slug.includes("profile")
                        ? locale === "ko"
                          ? "프로필"
                          : locale === "ja"
                            ? "プロフィール"
                            : "Profile"
                        : target.slug.includes("story")
                          ? locale === "ko"
                            ? "스토리"
                            : locale === "ja"
                              ? "ストーリー"
                              : "Story"
                          : target.slug.includes("post")
                            ? locale === "ko"
                              ? "포스트"
                              : locale === "ja"
                                ? "投稿"
                                : "Post"
                            : target.slug.includes("thumbnail")
                              ? locale === "ko"
                                ? "썸네일"
                                : locale === "ja"
                                  ? "サムネイル"
                                  : "Thumbnail"
                              : target.slug.includes("favicon")
                                ? locale === "ko"
                                  ? "파비콘"
                                  : locale === "ja"
                                    ? "ファビコン"
                                    : "Favicon"
                                : ""}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Custom Resize CTA */}
        <section className="rounded-lg border bg-muted/50 p-8 text-center">
          <ImageIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-xl font-semibold mb-2">{t.customResize}</h2>
          <p className="text-muted-foreground mb-4">{t.customResizeDesc}</p>
          <Link href={`/${locale}/tools/image-resizer`}>
            <Button size="lg">{t.goToResizer}</Button>
          </Link>
        </section>
      </div>
    </>
  );
}
