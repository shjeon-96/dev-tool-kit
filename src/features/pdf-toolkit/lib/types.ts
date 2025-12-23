/**
 * PDF Toolkit Types
 */

export interface PDFFile {
  id: string;
  name: string;
  file: File;
  pageCount: number;
  size: number;
}

export type PDFTab = "merge" | "split" | "compress" | "redact";

export interface MergeOptions {
  outputName?: string;
}

export interface SplitMode {
  type: "all" | "range" | "extract";
  /** 범위 모드: "1-5, 8, 10-12" 형식 */
  rangeInput?: string;
  /** 추출 모드: 선택된 페이지 인덱스들 (0-based) */
  selectedPages?: number[];
}

export interface SplitOptions {
  mode: SplitMode;
}

export interface CompressOptions {
  removeMetadata: boolean;
}

export interface PDFProcessResult {
  success: boolean;
  data?: Uint8Array | Uint8Array[];
  error?: string;
  /** 분할 시 파일명 목록 */
  filenames?: string[];
}

/**
 * Redaction Types
 */
export type RedactPattern = "creditCard" | "ssn" | "phone" | "email" | "custom";

export interface RedactPatternConfig {
  id: RedactPattern;
  label: string;
  description: string;
  regex: RegExp;
  enabled: boolean;
}

export interface RedactOptions {
  patterns: RedactPattern[];
  customKeywords: string[];
  redactColor: "black" | "white" | "gray";
}

export interface RedactMatch {
  pageIndex: number;
  text: string;
  pattern: RedactPattern;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface RedactResult {
  success: boolean;
  matchCount: number;
  pagesAffected: number;
  data?: Uint8Array;
  error?: string;
}
