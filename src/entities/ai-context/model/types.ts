import type { ToolSlug } from "@/entities/tool/model/types";

/**
 * AI Context Entity Types
 *
 * Vibe Coding SEO 전략을 위한 AI 컨텍스트 정의
 * AI가 생성한 코드를 검증하는 도구 페이지에 특화된 SEO 콘텐츠
 */

// AI 소스 정의
export type AISource =
  | "ai-generated" // 일반 AI 생성 코드
  | "chatgpt" // ChatGPT 출력
  | "claude" // Claude 출력
  | "copilot" // GitHub Copilot
  | "gemini" // Google Gemini
  | "cursor"; // Cursor AI

// AI 컨텍스트 적용 가능한 도구들
export type AICompatibleTool = Extract<
  ToolSlug,
  | "json-formatter"
  | "jwt-decoder"
  | "sql-formatter"
  | "regex-tester"
  | "base64-converter"
  | "url-encoder"
  | "hash-generator"
  | "diff-checker"
  | "markdown-preview"
  | "html-entity"
  | "css-minifier"
  | "prettier-playground"
  | "json-to-typescript"
  | "cron-parser"
  | "uuid-generator"
  | "url-parser"
>;

// AI 컨텍스트 페이지 메타데이터
export interface AIContextMeta {
  slug: AICompatibleTool;
  aiSources: AISource[];
  commonErrors: string[];
  useCases: string[];
  keywords: string[];
  searchVolume?: number;
}

// AI 소스별 브랜딩
export interface AISourceBranding {
  id: AISource;
  name: string;
  color: string;
  description: string;
}
