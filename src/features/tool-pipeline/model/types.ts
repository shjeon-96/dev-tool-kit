import type { ToolSlug } from "@/entities/tool";

// ============================================
// Pipeline Data Types (MIME-like system)
// ============================================

/**
 * 데이터 타입 정의 - MIME Type 유사 개념
 * 각 도구가 입력/출력할 수 있는 데이터 형식을 정의합니다.
 */
export type PipelineDataType =
  | "text/plain" // 일반 텍스트
  | "text/json" // JSON 문자열
  | "text/html" // HTML 문자열
  | "text/css" // CSS 문자열
  | "text/sql" // SQL 문자열
  | "text/markdown" // Markdown 문자열
  | "text/regex" // 정규식 패턴
  | "text/url" // URL 문자열
  | "text/encoded" // 인코딩된 문자열 (Base64, URL 인코딩 등)
  | "text/hash" // 해시 문자열
  | "text/uuid" // UUID 문자열
  | "text/jwt" // JWT 토큰
  | "text/code" // 소스 코드 (언어 불특정)
  | "text/curl" // cURL 명령어
  | "text/cron" // Cron 표현식
  | "image/svg" // SVG 이미지
  | "application/qr"; // QR 코드 데이터

/**
 * 도구별 입력/출력 데이터 타입 정의
 */
export interface ToolDataTypes {
  accepts: PipelineDataType[]; // 입력으로 받을 수 있는 타입들
  outputs: PipelineDataType[]; // 출력하는 타입들
}

/**
 * 각 도구의 데이터 타입 매핑
 */
export const TOOL_DATA_TYPES: Partial<Record<ToolSlug, ToolDataTypes>> = {
  // Text & Code Tools
  "json-formatter": {
    accepts: ["text/json", "text/plain"],
    outputs: ["text/json"],
  },
  "sql-formatter": {
    accepts: ["text/sql", "text/plain"],
    outputs: ["text/sql"],
  },
  "prettier-playground": {
    accepts: [
      "text/code",
      "text/json",
      "text/css",
      "text/html",
      "text/markdown",
    ],
    outputs: ["text/code"],
  },
  "markdown-preview": {
    accepts: ["text/markdown", "text/plain"],
    outputs: ["text/html"],
  },
  "diff-checker": {
    accepts: ["text/plain", "text/code"],
    outputs: ["text/plain"],
  },
  "regex-tester": {
    accepts: ["text/plain", "text/regex"],
    outputs: ["text/regex"],
  },
  "lorem-generator": {
    accepts: [],
    outputs: ["text/plain"],
  },

  // Encoding & Conversion Tools
  "base64-converter": {
    accepts: ["text/plain", "text/encoded"],
    outputs: ["text/encoded", "text/plain"],
  },
  "url-encoder": {
    accepts: ["text/plain", "text/url"],
    outputs: ["text/encoded", "text/plain"],
  },
  "html-entity": {
    accepts: ["text/plain", "text/html"],
    outputs: ["text/encoded", "text/plain"],
  },
  "base-converter": {
    accepts: ["text/plain"],
    outputs: ["text/plain"],
  },

  // Security & Crypto Tools
  "hash-generator": {
    accepts: ["text/plain", "text/json", "text/code"],
    outputs: ["text/hash"],
  },
  "jwt-decoder": {
    accepts: ["text/jwt", "text/plain"],
    outputs: ["text/json"],
  },
  "uuid-generator": {
    accepts: [],
    outputs: ["text/uuid"],
  },

  // URL & Web Tools
  "url-parser": {
    accepts: ["text/url", "text/plain"],
    outputs: ["text/json", "text/url"],
  },
  "curl-builder": {
    accepts: ["text/url", "text/json"],
    outputs: ["text/curl"],
  },
  "meta-generator": {
    accepts: ["text/plain"],
    outputs: ["text/html"],
  },
  "ua-parser": {
    accepts: ["text/plain"],
    outputs: ["text/json"],
  },

  // Visual & Media Tools
  "qr-generator": {
    accepts: ["text/plain", "text/url", "text/uuid"],
    outputs: ["application/qr"],
  },
  "svg-optimizer": {
    accepts: ["image/svg"],
    outputs: ["image/svg"],
  },
  "color-picker": {
    accepts: ["text/plain"],
    outputs: ["text/plain", "text/css"],
  },
  "gradient-generator": {
    accepts: [],
    outputs: ["text/css"],
  },
  "box-shadow": {
    accepts: [],
    outputs: ["text/css"],
  },
  "css-to-tailwind": {
    accepts: ["text/css"],
    outputs: ["text/code"],
  },

  // Time & Data Tools
  "cron-parser": {
    accepts: ["text/cron", "text/plain"],
    outputs: ["text/plain"],
  },
};

/**
 * 두 도구 간 데이터 타입 호환성 검사
 * @param fromTool 출력하는 도구
 * @param toTool 입력받는 도구
 * @returns 호환 가능한 데이터 타입 배열 (빈 배열이면 호환 불가)
 */
export function getCompatibleTypes(
  fromTool: ToolSlug,
  toTool: ToolSlug,
): PipelineDataType[] {
  const fromTypes = TOOL_DATA_TYPES[fromTool];
  const toTypes = TOOL_DATA_TYPES[toTool];

  if (!fromTypes || !toTypes) return [];

  return fromTypes.outputs.filter((outputType) =>
    toTypes.accepts.includes(outputType),
  );
}

/**
 * 데이터 타입 기반 호환성 검사
 */
export function isDataTypeCompatible(
  fromTool: ToolSlug,
  toTool: ToolSlug,
): boolean {
  return getCompatibleTypes(fromTool, toTool).length > 0;
}

/**
 * 특정 도구로 데이터를 보낼 수 있는 도구 목록 조회
 */
export function getToolsThatCanSendTo(toTool: ToolSlug): ToolSlug[] {
  const toTypes = TOOL_DATA_TYPES[toTool];
  if (!toTypes) return [];

  return (Object.keys(TOOL_DATA_TYPES) as ToolSlug[]).filter((fromTool) => {
    if (fromTool === toTool) return false;
    return isDataTypeCompatible(fromTool, toTool);
  });
}

/**
 * 특정 도구에서 데이터를 받을 수 있는 도구 목록 조회
 */
export function getToolsThatCanReceiveFrom(fromTool: ToolSlug): ToolSlug[] {
  const fromTypes = TOOL_DATA_TYPES[fromTool];
  if (!fromTypes) return [];

  return (Object.keys(TOOL_DATA_TYPES) as ToolSlug[]).filter((toTool) => {
    if (toTool === fromTool) return false;
    return isDataTypeCompatible(fromTool, toTool);
  });
}

// ============================================
// Pipeline Core Types
// ============================================

export interface PipelineStep {
  id: string;
  toolSlug: ToolSlug;
  input?: string;
  output?: string;
  dataType?: PipelineDataType; // 현재 데이터의 타입
  status: "pending" | "running" | "completed" | "error";
  error?: string;
}

export interface Pipeline {
  id: string;
  name: string;
  steps: PipelineStep[];
  createdAt: number;
  updatedAt: number;
}

export interface PipelineConnection {
  from: ToolSlug;
  to: ToolSlug;
  compatibleTypes?: PipelineDataType[]; // 호환되는 데이터 타입
  transform?: (output: string) => string;
}

// ============================================
// Legacy Connection Definitions (for backward compatibility)
// ============================================

// Define which tools can connect to which
export const TOOL_CONNECTIONS: PipelineConnection[] = [
  // JSON workflows
  { from: "json-formatter", to: "jwt-decoder" },
  { from: "json-formatter", to: "base64-converter" },
  { from: "json-formatter", to: "url-encoder" },
  { from: "json-formatter", to: "hash-generator" },

  // Encoding workflows
  { from: "base64-converter", to: "json-formatter" },
  { from: "base64-converter", to: "url-encoder" },
  { from: "base64-converter", to: "hash-generator" },

  // URL workflows
  { from: "url-encoder", to: "base64-converter" },
  { from: "url-encoder", to: "json-formatter" },
  { from: "url-parser", to: "url-encoder" },

  // Hash workflows
  { from: "hash-generator", to: "base64-converter" },

  // Text workflows
  { from: "lorem-generator", to: "hash-generator" },
  { from: "lorem-generator", to: "base64-converter" },
  { from: "uuid-generator", to: "hash-generator" },
  { from: "uuid-generator", to: "base64-converter" },

  // Code workflows
  { from: "sql-formatter", to: "hash-generator" },
  { from: "prettier-playground", to: "hash-generator" },

  // QR workflows
  { from: "uuid-generator", to: "qr-generator" },
  { from: "url-encoder", to: "qr-generator" },
];

export function getConnectableTools(fromTool: ToolSlug): ToolSlug[] {
  return TOOL_CONNECTIONS.filter((conn) => conn.from === fromTool).map(
    (conn) => conn.to,
  );
}

export function canConnect(from: ToolSlug, to: ToolSlug): boolean {
  return TOOL_CONNECTIONS.some((conn) => conn.from === from && conn.to === to);
}
