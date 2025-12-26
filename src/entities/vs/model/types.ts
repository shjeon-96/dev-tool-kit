import type { ToolSlug } from "@/entities/tool";

/**
 * VS Comparison Types
 *
 * "JSON vs YAML" 형태의 비교 롱테일 키워드 타겟팅
 * 검색 의도: 두 기술/포맷 간의 차이점 이해
 */

// VS 비교 슬러그
export type VsComparisonSlug =
  // 데이터 포맷 비교 (10)
  | "json-vs-yaml"
  | "json-vs-xml"
  | "json-vs-csv"
  | "yaml-vs-toml"
  | "xml-vs-html"
  | "markdown-vs-html"
  | "json-vs-toml"
  | "csv-vs-excel"
  | "json-vs-protobuf"
  | "xml-vs-json"
  // 인코딩 비교 (6)
  | "base64-vs-hex"
  | "utf8-vs-ascii"
  | "url-encoding-vs-base64"
  | "base64-vs-base32"
  | "unicode-vs-utf8"
  | "percent-encoding-vs-url-encoding"
  // 해시 알고리즘 비교 (6)
  | "md5-vs-sha256"
  | "sha1-vs-sha256"
  | "sha256-vs-sha512"
  | "bcrypt-vs-argon2"
  | "md5-vs-sha1"
  | "sha256-vs-sha3"
  // 이미지 포맷 비교 (6)
  | "png-vs-jpeg"
  | "webp-vs-png"
  | "svg-vs-png"
  | "gif-vs-webp"
  | "avif-vs-webp"
  | "jpeg-vs-webp"
  // 코드/도구 비교 (6)
  | "regex-vs-glob"
  | "jwt-vs-session"
  | "uuid-vs-ulid"
  | "rest-vs-graphql"
  | "sql-vs-nosql"
  | "typescript-vs-javascript";

// VS 비교 카테고리
export type VsCategory = "data-format" | "encoding" | "hash" | "image" | "code";

// 비교 포인트
export interface ComparisonAspect {
  aspect: string;
  item1: string;
  item2: string;
  winner?: "item1" | "item2" | "tie";
}

// VS 비교 정의
export interface VsComparison {
  slug: VsComparisonSlug;
  item1: string; // "JSON"
  item2: string; // "YAML"
  category: VsCategory;
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
  comparison: {
    en: ComparisonAspect[];
    ko: ComparisonAspect[];
    ja: ComparisonAspect[];
  };
  conclusion: {
    en: string;
    ko: string;
    ja: string;
  };
  relatedTool: ToolSlug;
  keywords: string[];
  searchVolume: number;
}
