import type { ToolSlug } from "@/entities/tool";

/**
 * Language-Type pSEO Entity
 *
 * "json in python", "yaml in javascript" 형태의 언어별 가이드 롱테일 키워드 타겟팅
 * 검색 의도: 특정 프로그래밍 언어에서 데이터 포맷/도구 사용법
 */

// 지원 프로그래밍 언어
export type ProgrammingLanguage =
  | "python"
  | "javascript"
  | "typescript"
  | "nodejs"
  | "java"
  | "csharp"
  | "go"
  | "rust"
  | "php"
  | "ruby";

// 도구/포맷 타입
export type ToolFormat =
  | "json"
  | "yaml"
  | "xml"
  | "csv"
  | "base64"
  | "hash"
  | "regex"
  | "jwt"
  | "uuid"
  | "url-encoding";

// Language-Type 슬러그 (tool-in-language 형식)
export type LanguageTypeSlug =
  // JSON 관련 (10)
  | "json-in-python"
  | "json-in-javascript"
  | "json-in-typescript"
  | "json-in-nodejs"
  | "json-in-java"
  | "json-in-csharp"
  | "json-in-go"
  | "json-in-rust"
  | "json-in-php"
  | "json-in-ruby"
  // YAML 관련 (6)
  | "yaml-in-python"
  | "yaml-in-javascript"
  | "yaml-in-nodejs"
  | "yaml-in-go"
  | "yaml-in-ruby"
  | "yaml-in-java"
  // Base64 관련 (6)
  | "base64-in-python"
  | "base64-in-javascript"
  | "base64-in-nodejs"
  | "base64-in-java"
  | "base64-in-csharp"
  | "base64-in-go"
  // Hash 관련 (5)
  | "hash-in-python"
  | "hash-in-javascript"
  | "hash-in-nodejs"
  | "hash-in-java"
  | "hash-in-go"
  // Regex 관련 (5)
  | "regex-in-python"
  | "regex-in-javascript"
  | "regex-in-java"
  | "regex-in-go"
  | "regex-in-php"
  // JWT 관련 (4)
  | "jwt-in-python"
  | "jwt-in-javascript"
  | "jwt-in-nodejs"
  | "jwt-in-java"
  // UUID 관련 (4)
  | "uuid-in-python"
  | "uuid-in-javascript"
  | "uuid-in-java"
  | "uuid-in-go"
  // URL Encoding 관련 (4)
  | "url-encoding-in-python"
  | "url-encoding-in-javascript"
  | "url-encoding-in-java"
  | "url-encoding-in-php"
  // XML 관련 (4)
  | "xml-in-python"
  | "xml-in-javascript"
  | "xml-in-java"
  | "xml-in-csharp"
  // CSV 관련 (4)
  | "csv-in-python"
  | "csv-in-javascript"
  | "csv-in-java"
  | "csv-in-php";

// Language-Type 카테고리
export type LanguageTypeCategory =
  | "data-format" // JSON, YAML, XML, CSV
  | "encoding" // Base64, URL Encoding
  | "security" // Hash, JWT
  | "utility"; // Regex, UUID

// 코드 예제
export interface CodeExample {
  title: string;
  code: string;
  description?: string;
}

// Language-Type 정의
export interface LanguageType {
  slug: LanguageTypeSlug;
  tool: ToolFormat;
  language: ProgrammingLanguage;
  category: LanguageTypeCategory;
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
  // 주요 사용 사례
  useCases: {
    en: string[];
    ko: string[];
    ja: string[];
  };
  // 코드 예제
  codeExamples: {
    en: CodeExample[];
    ko: CodeExample[];
    ja: CodeExample[];
  };
  // 관련 도구
  relatedTool: ToolSlug;
  // SEO 키워드
  keywords: string[];
  // 예상 검색량 (상대적)
  searchVolume: number;
}
