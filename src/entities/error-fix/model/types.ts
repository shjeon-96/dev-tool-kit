import type { LucideIcon } from "lucide-react";
import type { ToolSlug } from "@/entities/tool";

/**
 * ErrorFix Entity Types
 *
 * AI 코드 생성 시 발생하는 일반적인 오류에 대한
 * 해결 가이드 페이지를 위한 타입 정의
 */

// 오류 유형 슬러그 - URL에 사용
export type ErrorFixSlug =
  // JSON 관련 오류 (8)
  | "json-unexpected-token"
  | "json-unterminated-string"
  | "json-trailing-comma"
  | "json-duplicate-keys"
  | "json-invalid-escape"
  | "json-number-format"
  | "json-depth-exceeded"
  | "json-circular-reference"
  // JavaScript 오류 (12)
  | "js-undefined-is-not-a-function"
  | "js-cannot-read-property-of-undefined"
  | "js-syntaxerror-unexpected-token"
  | "js-referenceerror-not-defined"
  | "js-typeerror-null-property"
  | "js-rangeerror-invalid-array-length"
  | "js-maximum-call-stack"
  | "js-cors-error"
  | "js-fetch-failed"
  | "js-promise-unhandled-rejection"
  | "js-module-not-found"
  | "js-invalid-left-hand-side"
  // TypeScript 오류 (9)
  | "ts-type-not-assignable"
  | "ts-property-does-not-exist"
  | "ts-argument-type-not-assignable"
  | "ts-object-is-possibly-undefined"
  | "ts-cannot-find-module"
  | "ts-no-overload-matches"
  | "ts-implicit-any"
  | "ts-missing-properties"
  | "ts-generic-constraint"
  // React 오류 (10)
  | "react-hooks-rules-violation"
  | "react-key-prop-missing"
  | "react-too-many-rerenders"
  | "react-invalid-hook-call"
  | "react-cannot-update-unmounted"
  | "react-hydration-mismatch"
  | "react-objects-not-valid-child"
  | "react-ref-not-forwarded"
  | "react-context-not-provided"
  | "react-controlled-uncontrolled"
  // Python 오류 (7)
  | "python-indentation-error"
  | "python-name-not-defined"
  | "python-type-error"
  | "python-attribute-error"
  | "python-index-error"
  | "python-key-error"
  | "python-import-error"
  // Node.js 오류 (4)
  | "node-cannot-find-module"
  | "node-enoent"
  | "node-eaddrinuse"
  | "node-heap-out-of-memory";

// 오류 카테고리
export type ErrorCategory =
  | "json"
  | "javascript"
  | "typescript"
  | "react"
  | "python"
  | "nodejs";

// 오류 심각도
export type ErrorSeverity = "critical" | "high" | "medium" | "low";

// 해결 단계
export interface FixStep {
  title: string;
  description: string;
  code?: {
    before?: string;
    after: string;
    language: string;
  };
}

// 관련 도구
export interface RelatedToolInfo {
  slug: ToolSlug;
  reason: string;
}

// FAQ 항목
export interface ErrorFaq {
  question: string;
  answer: string;
}

// ErrorFix 엔티티 정의
export interface ErrorFix {
  // 기본 정보
  slug: ErrorFixSlug;
  title: string;
  errorMessage: string;
  description: string;

  // 분류
  category: ErrorCategory;
  severity: ErrorSeverity;
  icon: LucideIcon;

  // 콘텐츠
  cause: string;
  aiContext: string; // AI가 왜 이런 오류를 생성하는지
  fixSteps: FixStep[];

  // 관련 정보
  relatedTools: RelatedToolInfo[];
  relatedErrors: ErrorFixSlug[];
  faq: ErrorFaq[];

  // SEO
  keywords: string[];
  searchVolume?: number; // 월간 검색량 추정
}

// 카테고리 설정
export interface ErrorCategoryConfig {
  id: ErrorCategory;
  label: string;
  description: string;
  icon: LucideIcon;
  color: string;
}
