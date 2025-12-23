import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { getShareData } from "@/shared/lib/kv";
import { tools } from "@/entities/tool";
import { generateOgImageUrl } from "@/shared/lib/og";

// ============================================
// Share Redirect Page
// ============================================

interface SharePageProps {
  params: Promise<{ id: string }>;
}

// 기본 URL
const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://web-toolkit.app";

/**
 * 도구별 표시 이름 매핑
 */
const TOOL_DISPLAY_NAMES: Record<string, string> = {
  "json-formatter": "JSON Formatter",
  "jwt-decoder": "JWT Decoder",
  "image-resizer": "Image Resizer",
  "unix-timestamp": "Unix Timestamp",
  "base64-converter": "Base64 Converter",
  "app-icon-generator": "App Icon Generator",
  "qr-generator": "QR Code Generator",
  "color-picker": "Color Picker",
  "url-parser": "URL Parser",
  "uuid-generator": "UUID Generator",
  "base-converter": "Base Converter",
  "hash-generator": "Hash Generator",
  "sql-formatter": "SQL Formatter",
  "cron-parser": "Cron Parser",
  "markdown-preview": "Markdown Preview",
  "diff-checker": "Diff Checker",
  "lorem-generator": "Lorem Ipsum Generator",
  "url-encoder": "URL Encoder",
  "html-entity": "HTML Entity",
  "box-shadow": "Box Shadow Generator",
  "gradient-generator": "Gradient Generator",
  "ua-parser": "User Agent Parser",
  "regex-tester": "Regex Tester",
  "meta-generator": "Meta Tag Generator",
  "curl-builder": "cURL Builder",
  "svg-optimizer": "SVG Optimizer",
  "css-to-tailwind": "CSS to Tailwind",
  "prettier-playground": "Prettier Playground",
  "json-to-typescript": "JSON to TypeScript",
  "css-minifier": "CSS Minifier",
  "text-case-converter": "Text Case Converter",
  "video-compressor": "Video Compressor",
  "pdf-toolkit": "PDF Toolkit",
  "ocr-scanner": "OCR Scanner",
  "schema-generator": "Schema Generator",
  "headline-analyzer": "Headline Analyzer",
  "bg-remover": "Background Remover",
  "og-generator": "OG Image Generator",
  "image-converter": "Image Converter",
  "sitemap-generator": "Sitemap Generator",
  "meta-tag-analyzer": "Meta Tag Analyzer",
  "robots-generator": "Robots.txt Generator",
  "serp-preview": "SERP Preview",
};

/**
 * 공유 링크 메타데이터 - 동적 OG 이미지 포함
 */
export async function generateMetadata({
  params,
}: SharePageProps): Promise<Metadata> {
  const { id } = await params;
  const result = await getShareData(id);

  if (!result.success || !result.data) {
    return {
      title: "Share Not Found | DevToolkit",
      description: "This share link may have expired or does not exist.",
    };
  }

  const { toolSlug, input, options } = result.data;
  const tool = tools[toolSlug];
  const toolName = TOOL_DISPLAY_NAMES[toolSlug] || toolSlug;

  if (!tool) {
    return {
      title: "Share Not Found | DevToolkit",
      description: "This tool no longer exists.",
    };
  }

  const title = `Shared: ${toolName}`;
  const description = `View shared ${toolName} data on DevToolkit - Free developer tools`;

  // 동적 OG 이미지 URL 생성 (입력 데이터 미리보기 포함)
  const ogImageUrl = generateOgImageUrl(
    BASE_URL,
    toolSlug,
    title,
    description,
    input,
    options,
  );

  return {
    title: `${title} | DevToolkit`,
    description,
    robots: "noindex, nofollow", // 공유 페이지는 인덱싱 안함
    openGraph: {
      title,
      description,
      type: "website",
      url: `${BASE_URL}/s/${id}`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      siteName: "DevToolkit",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

/**
 * 공유 페이지 - 데이터 로드 후 해당 도구 페이지로 리다이렉트
 */
export default async function SharePage({ params }: SharePageProps) {
  const { id } = await params;

  // 1. 공유 데이터 조회
  const result = await getShareData(id);

  // 2. 데이터가 없거나 만료된 경우
  if (!result.success || !result.data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4 p-8">
          <div className="text-6xl">🔗</div>
          <h1 className="text-2xl font-bold">Share Link Not Found</h1>
          <p className="text-muted-foreground max-w-md">
            {result.error ||
              "This share link may have expired or does not exist."}
          </p>
          <p className="text-sm text-muted-foreground">
            Share links expire after 30 days.
          </p>
          <Link
            href="/en/tools"
            className="inline-block mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Go to DevToolkit
          </Link>
        </div>
      </div>
    );
  }

  // 3. 도구 존재 여부 확인
  const tool = tools[result.data.toolSlug];
  if (!tool) {
    notFound();
  }

  // 4. 공유 데이터를 쿼리 파라미터로 인코딩하여 리다이렉트
  // 데이터는 클라이언트에서 sessionStorage로 전달
  const searchParams = new URLSearchParams({
    shared: id,
  });

  // 기본 locale은 en
  redirect(`/en/tools/${result.data.toolSlug}?${searchParams.toString()}`);
}
