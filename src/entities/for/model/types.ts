import type { ToolSlug } from "@/entities/tool";

/**
 * For Use-Case Types
 *
 * "json formatter for api" 형태의 use-case 롱테일 키워드 타겟팅
 * 검색 의도: 특정 목적에 맞는 도구 찾기
 */

// For Use-Case 슬러그
export type ForUseCaseSlug =
  // 개발자 워크플로우 (8)
  | "json-formatter-for-api"
  | "json-formatter-for-config"
  | "base64-encoder-for-images"
  | "hash-generator-for-passwords"
  | "uuid-generator-for-database"
  | "jwt-decoder-for-debugging"
  | "regex-tester-for-validation"
  | "sql-formatter-for-queries"
  // 웹 개발 (8)
  | "image-converter-for-web"
  | "image-resizer-for-social-media"
  | "qr-generator-for-marketing"
  | "meta-generator-for-seo"
  | "schema-generator-for-google"
  | "sitemap-generator-for-seo"
  | "color-picker-for-design"
  | "css-minifier-for-performance"
  // API & 통합 (6)
  | "json-formatter-for-postman"
  | "url-encoder-for-api"
  | "timestamp-converter-for-logs"
  | "diff-tool-for-code-review"
  | "lorem-generator-for-mockups"
  | "cron-parser-for-scheduling"
  // 데이터 처리 (6)
  | "csv-converter-for-excel"
  | "yaml-converter-for-kubernetes"
  | "xml-converter-for-legacy"
  | "markdown-preview-for-github"
  | "json-validator-for-schema"
  | "text-diff-for-documents"
  // 보안 & 인증 (4)
  | "hash-generator-for-verification"
  | "base64-decoder-for-tokens"
  | "password-generator-for-security"
  | "jwt-decoder-for-auth";

// Use-Case 카테고리
export type ForCategory = "developer" | "web" | "api" | "data" | "security";

// For Use-Case 정의
export interface ForUseCase {
  slug: ForUseCaseSlug;
  tool: string; // "JSON Formatter"
  useCase: string; // "API Development"
  category: ForCategory;
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
  benefits: {
    en: string[];
    ko: string[];
    ja: string[];
  };
  relatedTool: ToolSlug;
  keywords: string[];
  searchVolume: number;
}
