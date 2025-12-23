import type { LucideIcon } from "lucide-react";

export type ToolCategory = "text" | "media" | "security" | "converters";

export interface Tool {
  title: string;
  description: string;
  icon: LucideIcon;
  category: ToolCategory;
  /** Pro 전용 기능 여부 */
  isPremium?: boolean;
  /** 무료 사용자 일일 사용 제한 (미설정 시 무제한) */
  freeLimit?: number;
  /** 관련 도구 목록 (내부 링크 SEO 강화) */
  relatedTools?: ToolSlug[];
}

export type ToolSlug =
  | "json-formatter"
  | "jwt-decoder"
  | "image-resizer"
  | "unix-timestamp"
  | "base64-converter"
  | "app-icon-generator"
  | "qr-generator"
  | "color-picker"
  | "url-parser"
  | "uuid-generator"
  | "base-converter"
  | "hash-generator"
  | "sql-formatter"
  | "cron-parser"
  | "markdown-preview"
  | "diff-checker"
  | "lorem-generator"
  | "url-encoder"
  | "html-entity"
  | "box-shadow"
  | "gradient-generator"
  | "ua-parser"
  | "regex-tester"
  | "meta-generator"
  | "curl-builder"
  | "svg-optimizer"
  | "css-to-tailwind"
  | "prettier-playground"
  | "json-to-typescript"
  | "css-minifier"
  | "text-case-converter"
  | "video-compressor"
  | "pdf-toolkit"
  | "ocr-scanner"
  | "schema-generator"
  | "headline-analyzer"
  | "bg-remover"
  | "og-generator"
  | "image-converter"
  | "sitemap-generator";
