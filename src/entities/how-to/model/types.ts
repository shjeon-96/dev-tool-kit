import type { ToolSlug } from "@/entities/tool";

/**
 * How-To Guide Types
 *
 * "how to convert json to yaml" 형태의 롱테일 키워드 타겟팅
 * 검색 의도: 특정 작업 수행 방법
 */

// How-To 액션 슬러그
export type HowToActionSlug =
  // JSON 관련 (8)
  | "convert-json-to-yaml"
  | "convert-json-to-xml"
  | "convert-json-to-csv"
  | "format-json-online"
  | "validate-json-syntax"
  | "minify-json-data"
  | "convert-json-to-typescript"
  | "prettify-json-code"
  // 인코딩 관련 (6)
  | "encode-base64-string"
  | "decode-base64-online"
  | "encode-url-parameters"
  | "decode-url-string"
  | "convert-text-to-hex"
  | "convert-hex-to-text"
  // 해시/보안 관련 (4)
  | "generate-md5-hash"
  | "generate-sha256-hash"
  | "decode-jwt-token"
  | "generate-uuid-online"
  // 이미지 관련 (6)
  | "resize-image-online"
  | "convert-png-to-webp"
  | "convert-jpg-to-png"
  | "remove-image-background"
  | "generate-qr-code"
  | "compress-image-online"
  // 코드 관련 (6)
  | "format-sql-query"
  | "test-regex-pattern"
  | "convert-css-to-tailwind"
  | "minify-css-code"
  | "format-markdown-text"
  | "generate-cron-expression"
  // SEO 관련 (4)
  | "generate-meta-tags"
  | "create-schema-markup"
  | "generate-sitemap-xml"
  | "preview-google-serp"
  // 유틸리티 (6)
  | "parse-url-components"
  | "convert-unix-timestamp"
  | "extract-text-from-image"
  | "generate-lorem-ipsum"
  | "compare-text-diff"
  | "generate-app-icons";

// How-To 카테고리
export type HowToCategory =
  | "json"
  | "encoding"
  | "security"
  | "image"
  | "code"
  | "seo"
  | "utility";

// How-To 가이드 정의
export interface HowToGuide {
  slug: HowToActionSlug;
  action: string; // "convert json to yaml"
  category: HowToCategory;
  title: {
    en: string;
    ko: string;
    ja: string;
  };
  description: {
    en: string;
    ko: string;
    ja: string;
  };
  steps: {
    en: string[];
    ko: string[];
    ja: string[];
  };
  relatedTool: ToolSlug;
  keywords: string[];
  searchVolume: number;
}
