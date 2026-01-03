"use client";

/**
 * Tool Component Map
 *
 * 도구 컴포넌트의 Dynamic Import 맵핑
 * 새 도구 추가시 이 파일만 수정하면 됩니다.
 *
 * 컨벤션:
 * - 슬러그: kebab-case (예: "json-formatter")
 * - 디렉토리: @/features/{slug}
 * - 컴포넌트: PascalCase (예: JsonFormatter)
 *
 * @example
 * // 새 도구 추가:
 * "new-tool": {
 *   import: () => import("@/features/new-tool"),
 *   component: "NewTool",
 * },
 */

import dynamic from "next/dynamic";
import type { ComponentType, ReactNode } from "react";
import type { ToolSlug } from "./types";

/**
 * Tool module export type
 * Feature modules export components, hooks, and utility functions.
 * We only extract the component specified by the component key.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ToolModule = Record<string, any>;

/**
 * 도구 Import 설정
 */
interface ToolImportConfig {
  /** Dynamic import 함수 - returns a module with React components */
  import: () => Promise<ToolModule>;
  /** Export된 컴포넌트 이름 */
  component: string;
}

/**
 * 도구 Import 설정 맵
 */
const toolImportConfigs: Record<ToolSlug, ToolImportConfig> = {
  "json-formatter": {
    import: () => import("@/features/json-formatter"),
    component: "JsonFormatter",
  },
  "jwt-decoder": {
    import: () => import("@/features/jwt-decoder"),
    component: "JwtDecoder",
  },
  "unix-timestamp": {
    import: () => import("@/features/unix-timestamp"),
    component: "UnixTimestamp",
  },
  "base64-converter": {
    import: () => import("@/features/base64-converter"),
    component: "Base64Converter",
  },
  "image-resizer": {
    import: () => import("@/features/image-resizer"),
    component: "ImageResizer",
  },
  "app-icon-generator": {
    import: () => import("@/features/app-icon-generator"),
    component: "AppIconGenerator",
  },
  "qr-generator": {
    import: () => import("@/features/qr-generator"),
    component: "QrGenerator",
  },
  "color-picker": {
    import: () => import("@/features/color-picker"),
    component: "ColorPicker",
  },
  "url-parser": {
    import: () => import("@/features/url-parser"),
    component: "UrlParser",
  },
  "uuid-generator": {
    import: () => import("@/features/uuid-generator"),
    component: "UuidGenerator",
  },
  "base-converter": {
    import: () => import("@/features/base-converter"),
    component: "BaseConverter",
  },
  "hash-generator": {
    import: () => import("@/features/hash-generator"),
    component: "HashGenerator",
  },
  "sql-formatter": {
    import: () => import("@/features/sql-formatter"),
    component: "SqlFormatter",
  },
  "cron-parser": {
    import: () => import("@/features/cron-parser"),
    component: "CronParser",
  },
  "markdown-preview": {
    import: () => import("@/features/markdown-preview"),
    component: "MarkdownPreview",
  },
  "diff-checker": {
    import: () => import("@/features/diff-checker"),
    component: "DiffChecker",
  },
  "lorem-generator": {
    import: () => import("@/features/lorem-generator"),
    component: "LoremGenerator",
  },
  "url-encoder": {
    import: () => import("@/features/url-encoder"),
    component: "UrlEncoder",
  },
  "html-entity": {
    import: () => import("@/features/html-entity"),
    component: "HtmlEntity",
  },
  "box-shadow": {
    import: () => import("@/features/box-shadow"),
    component: "BoxShadow",
  },
  "gradient-generator": {
    import: () => import("@/features/gradient-generator"),
    component: "GradientGenerator",
  },
  "ua-parser": {
    import: () => import("@/features/ua-parser"),
    component: "UAParser",
  },
  "regex-tester": {
    import: () => import("@/features/regex-tester"),
    component: "RegexTester",
  },
  "meta-generator": {
    import: () => import("@/features/meta-generator"),
    component: "MetaGenerator",
  },
  "curl-builder": {
    import: () => import("@/features/curl-builder"),
    component: "CurlBuilder",
  },
  "svg-optimizer": {
    import: () => import("@/features/svg-optimizer"),
    component: "SvgOptimizer",
  },
  "css-to-tailwind": {
    import: () => import("@/features/css-to-tailwind"),
    component: "CssToTailwind",
  },
  "prettier-playground": {
    import: () => import("@/features/prettier-playground"),
    component: "PrettierPlayground",
  },
  "json-to-typescript": {
    import: () => import("@/features/json-to-typescript"),
    component: "JsonToTypescript",
  },
  "css-minifier": {
    import: () => import("@/features/css-minifier"),
    component: "CssMinifier",
  },
  "text-case-converter": {
    import: () => import("@/features/text-case-converter"),
    component: "TextCaseConverter",
  },
  "video-compressor": {
    import: () => import("@/features/video-compressor"),
    component: "VideoCompressor",
  },
  "pdf-toolkit": {
    import: () => import("@/features/pdf-toolkit"),
    component: "PdfToolkit",
  },
  "ocr-scanner": {
    import: () => import("@/features/ocr-scanner"),
    component: "OcrScanner",
  },
  "schema-generator": {
    import: () => import("@/features/schema-generator"),
    component: "SchemaGenerator",
  },
  "headline-analyzer": {
    import: () => import("@/features/headline-analyzer"),
    component: "HeadlineAnalyzer",
  },
  "bg-remover": {
    import: () => import("@/features/bg-remover"),
    component: "BgRemover",
  },
  "og-generator": {
    import: () => import("@/features/og-generator"),
    component: "OGGenerator",
  },
  "image-converter": {
    import: () => import("@/features/image-converter"),
    component: "ImageConverter",
  },
  "sitemap-generator": {
    import: () => import("@/features/sitemap-generator"),
    component: "SitemapGenerator",
  },
  "meta-tag-analyzer": {
    import: () => import("@/features/meta-tag-analyzer"),
    component: "MetaTagAnalyzer",
  },
  "robots-generator": {
    import: () => import("@/features/robots-generator"),
    component: "RobotsGenerator",
  },
  "serp-preview": {
    import: () => import("@/features/serp-preview"),
    component: "SerpPreview",
  },
  "share-as-image": {
    import: () => import("@/features/share-as-image"),
    component: "ShareAsImage",
  },
  "token-counter": {
    import: () => import("@/features/token-counter"),
    component: "TokenCounter",
  },
};

/**
 * Tool component type after dynamic import
 */
type ToolComponent = ComponentType<{ children?: ReactNode }>;

/**
 * Dynamic 컴포넌트 맵 생성
 *
 * Next.js dynamic import를 사용하여 코드 스플리팅 적용
 */
function createToolComponents(): Record<ToolSlug, ToolComponent> {
  const components = {} as Record<ToolSlug, ToolComponent>;

  for (const [slug, config] of Object.entries(toolImportConfigs)) {
    components[slug as ToolSlug] = dynamic(
      () =>
        config.import().then((mod) => {
          const Component = mod[config.component];
          if (!Component) {
            throw new Error(
              `Component "${config.component}" not found in module for tool "${slug}"`,
            );
          }
          return Component;
        }),
      { ssr: false },
    );
  }

  return components;
}

/**
 * 도구 컴포넌트 맵
 *
 * @example
 * const ToolComponent = toolComponents["json-formatter"];
 * <ToolComponent />
 */
export const toolComponents = createToolComponents();

/**
 * 등록된 모든 도구 슬러그 목록
 */
export const registeredToolSlugs = Object.keys(toolImportConfigs) as ToolSlug[];

/**
 * 도구 컴포넌트 존재 여부 확인
 */
export function hasToolComponent(slug: string): slug is ToolSlug {
  return slug in toolImportConfigs;
}
