"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { useTranslations } from "next-intl";
import { tools, type ToolSlug } from "@/entities/tool";
import { PremiumToolGate, useFeatureAccess } from "@/entities/subscription";
import { useQuota } from "@/shared/lib/quota";
import { QuotaWarning, ErrorBoundary } from "@/shared/ui";

const toolComponents: Record<ToolSlug, React.ComponentType> = {
  "json-formatter": dynamic(
    () => import("@/features/json-formatter").then((mod) => mod.JsonFormatter),
    { ssr: false },
  ),
  "jwt-decoder": dynamic(
    () => import("@/features/jwt-decoder").then((mod) => mod.JwtDecoder),
    { ssr: false },
  ),
  "unix-timestamp": dynamic(
    () => import("@/features/unix-timestamp").then((mod) => mod.UnixTimestamp),
    { ssr: false },
  ),
  "base64-converter": dynamic(
    () =>
      import("@/features/base64-converter").then((mod) => mod.Base64Converter),
    { ssr: false },
  ),
  "image-resizer": dynamic(
    () => import("@/features/image-resizer").then((mod) => mod.ImageResizer),
    { ssr: false },
  ),
  "app-icon-generator": dynamic(
    () =>
      import("@/features/app-icon-generator").then(
        (mod) => mod.AppIconGenerator,
      ),
    { ssr: false },
  ),
  "qr-generator": dynamic(
    () => import("@/features/qr-generator").then((mod) => mod.QrGenerator),
    { ssr: false },
  ),
  "color-picker": dynamic(
    () => import("@/features/color-picker").then((mod) => mod.ColorPicker),
    { ssr: false },
  ),
  "url-parser": dynamic(
    () => import("@/features/url-parser").then((mod) => mod.UrlParser),
    { ssr: false },
  ),
  "uuid-generator": dynamic(
    () => import("@/features/uuid-generator").then((mod) => mod.UuidGenerator),
    { ssr: false },
  ),
  "base-converter": dynamic(
    () => import("@/features/base-converter").then((mod) => mod.BaseConverter),
    { ssr: false },
  ),
  "hash-generator": dynamic(
    () => import("@/features/hash-generator").then((mod) => mod.HashGenerator),
    { ssr: false },
  ),
  "sql-formatter": dynamic(
    () => import("@/features/sql-formatter").then((mod) => mod.SqlFormatter),
    { ssr: false },
  ),
  "cron-parser": dynamic(
    () => import("@/features/cron-parser").then((mod) => mod.CronParser),
    { ssr: false },
  ),
  "markdown-preview": dynamic(
    () =>
      import("@/features/markdown-preview").then((mod) => mod.MarkdownPreview),
    { ssr: false },
  ),
  "diff-checker": dynamic(
    () => import("@/features/diff-checker").then((mod) => mod.DiffChecker),
    { ssr: false },
  ),
  "lorem-generator": dynamic(
    () =>
      import("@/features/lorem-generator").then((mod) => mod.LoremGenerator),
    { ssr: false },
  ),
  "url-encoder": dynamic(
    () => import("@/features/url-encoder").then((mod) => mod.UrlEncoder),
    { ssr: false },
  ),
  "html-entity": dynamic(
    () => import("@/features/html-entity").then((mod) => mod.HtmlEntity),
    { ssr: false },
  ),
  "box-shadow": dynamic(
    () => import("@/features/box-shadow").then((mod) => mod.BoxShadow),
    { ssr: false },
  ),
  "gradient-generator": dynamic(
    () =>
      import("@/features/gradient-generator").then(
        (mod) => mod.GradientGenerator,
      ),
    { ssr: false },
  ),
  "ua-parser": dynamic(
    () => import("@/features/ua-parser").then((mod) => mod.UAParser),
    { ssr: false },
  ),
  "regex-tester": dynamic(
    () => import("@/features/regex-tester").then((mod) => mod.RegexTester),
    { ssr: false },
  ),
  "meta-generator": dynamic(
    () => import("@/features/meta-generator").then((mod) => mod.MetaGenerator),
    { ssr: false },
  ),
  "curl-builder": dynamic(
    () => import("@/features/curl-builder").then((mod) => mod.CurlBuilder),
    { ssr: false },
  ),
  "svg-optimizer": dynamic(
    () => import("@/features/svg-optimizer").then((mod) => mod.SvgOptimizer),
    { ssr: false },
  ),
  "css-to-tailwind": dynamic(
    () => import("@/features/css-to-tailwind").then((mod) => mod.CssToTailwind),
    { ssr: false },
  ),
  "prettier-playground": dynamic(
    () =>
      import("@/features/prettier-playground").then(
        (mod) => mod.PrettierPlayground,
      ),
    { ssr: false },
  ),
  "json-to-typescript": dynamic(
    () =>
      import("@/features/json-to-typescript").then(
        (mod) => mod.JsonToTypescript,
      ),
    { ssr: false },
  ),
  "css-minifier": dynamic(
    () => import("@/features/css-minifier").then((mod) => mod.CssMinifier),
    { ssr: false },
  ),
  "text-case-converter": dynamic(
    () =>
      import("@/features/text-case-converter").then(
        (mod) => mod.TextCaseConverter,
      ),
    { ssr: false },
  ),
  "video-compressor": dynamic(
    () =>
      import("@/features/video-compressor").then((mod) => mod.VideoCompressor),
    { ssr: false },
  ),
  "pdf-toolkit": dynamic(
    () => import("@/features/pdf-toolkit").then((mod) => mod.PdfToolkit),
    { ssr: false },
  ),
  "ocr-scanner": dynamic(
    () => import("@/features/ocr-scanner").then((mod) => mod.OcrScanner),
    { ssr: false },
  ),
  "schema-generator": dynamic(
    () =>
      import("@/features/schema-generator").then((mod) => mod.SchemaGenerator),
    { ssr: false },
  ),
  "headline-analyzer": dynamic(
    () =>
      import("@/features/headline-analyzer").then(
        (mod) => mod.HeadlineAnalyzer,
      ),
    { ssr: false },
  ),
  "bg-remover": dynamic(
    () => import("@/features/bg-remover").then((mod) => mod.BgRemover),
    { ssr: false },
  ),
  "og-generator": dynamic(
    () => import("@/features/og-generator").then((mod) => mod.OGGenerator),
    { ssr: false },
  ),
  "image-converter": dynamic(
    () =>
      import("@/features/image-converter").then((mod) => mod.ImageConverter),
    { ssr: false },
  ),
  "sitemap-generator": dynamic(
    () =>
      import("@/features/sitemap-generator").then(
        (mod) => mod.SitemapGenerator,
      ),
    { ssr: false },
  ),
  "meta-tag-analyzer": dynamic(
    () =>
      import("@/features/meta-tag-analyzer").then((mod) => mod.MetaTagAnalyzer),
    { ssr: false },
  ),
  "robots-generator": dynamic(
    () =>
      import("@/features/robots-generator").then((mod) => mod.RobotsGenerator),
    { ssr: false },
  ),
  "serp-preview": dynamic(
    () => import("@/features/serp-preview").then((mod) => mod.SerpPreview),
    { ssr: false },
  ),
  "share-as-image": dynamic(
    () => import("@/features/share-as-image").then((mod) => mod.ShareAsImage),
    { ssr: false },
  ),
};

function ToolSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-10 bg-muted rounded w-full" />
      <div className="grid gap-4 md:grid-cols-2">
        <div className="h-[400px] bg-muted rounded" />
        <div className="h-[400px] bg-muted rounded" />
      </div>
    </div>
  );
}

interface ToolRendererProps {
  slug: ToolSlug;
}

export function ToolRenderer({ slug }: ToolRendererProps) {
  const t = useTranslations("common");
  const tTools = useTranslations("tools");
  const ToolComponent = toolComponents[slug];
  const tool = tools[slug];
  const { isPro } = useFeatureAccess();
  const { stats, isLoading: isQuotaLoading } = useQuota(slug);

  if (!ToolComponent) {
    return <p className="text-muted-foreground">{t("loading")}</p>;
  }

  const toolName = tTools(`${slug}.title`);
  const toolDescription = tTools(`${slug}.description`);

  // Quota 경고 표시 조건: 무료 사용자이고 사용량이 80% 이상이거나 초과됨
  const showQuotaWarning =
    !isPro &&
    !isQuotaLoading &&
    stats &&
    (stats.dailyUsage >= stats.dailyLimit * 0.8 ||
      stats.monthlyUsage >= stats.monthlyLimit * 0.8 ||
      stats.isExceeded);

  return (
    <PremiumToolGate
      toolName={toolName}
      toolDescription={toolDescription}
      isPremium={tool?.isPremium}
    >
      {showQuotaWarning && stats && (
        <QuotaWarning
          dailyUsage={stats.dailyUsage}
          dailyLimit={stats.dailyLimit}
          monthlyUsage={stats.monthlyUsage}
          monthlyLimit={stats.monthlyLimit}
          isExceeded={stats.isExceeded}
          className="mb-4"
        />
      )}
      <ErrorBoundary
        errorMessage={`${toolName} 실행 중 오류가 발생했습니다.`}
        resetKey={slug}
      >
        <Suspense fallback={<ToolSkeleton />}>
          <ToolComponent />
        </Suspense>
      </ErrorBoundary>
    </PremiumToolGate>
  );
}
