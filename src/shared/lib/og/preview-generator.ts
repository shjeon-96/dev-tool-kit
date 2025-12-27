import type { ToolSlug } from "@/shared/types/tool";

// ============================================
// OG Preview Generator
// ============================================

/**
 * 도구별 OG 이미지용 미리보기 생성
 * 각 도구 타입에 맞는 최적화된 미리보기 텍스트 생성
 */

// 미리보기 최대 길이
const MAX_PREVIEW_LENGTH = 500;

// 도구별 OG 타입 매핑
const TOOL_OG_TYPES: Partial<Record<ToolSlug, "code" | "hash" | "color">> = {
  // Code type (코드 미리보기)
  "json-formatter": "code",
  "jwt-decoder": "code",
  "markdown-preview": "code",
  "schema-generator": "code",
  "sql-formatter": "code",
  "json-to-typescript": "code",
  "prettier-playground": "code",

  // Hash type (해시 다이어그램)
  "hash-generator": "hash",

  // Color type (색상 스와치)
  "color-picker": "color",
  "gradient-generator": "color",
};

/**
 * 도구 타입에 맞는 OG 타입 반환
 */
export function getOgType(
  toolSlug: ToolSlug,
): "code" | "hash" | "color" | "default" {
  return TOOL_OG_TYPES[toolSlug] || "default";
}

/**
 * 코드 미리보기 생성 (JSON, YAML, JWT 등)
 */
function generateCodePreview(input: string): string {
  const trimmed = input.trim();

  // 이미 짧으면 그대로 반환
  if (trimmed.length <= MAX_PREVIEW_LENGTH) {
    return trimmed;
  }

  // 긴 코드는 앞부분만 표시
  return trimmed.slice(0, MAX_PREVIEW_LENGTH) + "\n...";
}

/**
 * 해시 미리보기 생성
 * options에서 algorithm과 hash 값을 추출
 */
function generateHashPreview(
  input: string,
  options?: Record<string, unknown>,
): { input: string; hash: string; algorithm: string } {
  const algorithm = (options?.algorithm as string) || "SHA-256";
  const hash = (options?.hash as string) || "";

  return {
    input: input.length > 100 ? input.slice(0, 100) + "..." : input,
    hash: hash.length > 64 ? hash.slice(0, 64) + "..." : hash,
    algorithm,
  };
}

/**
 * 색상 미리보기 생성
 */
function generateColorPreview(
  input: string,
  options?: Record<string, unknown>,
): string {
  // HEX 색상 추출
  const hexMatch = input.match(/#[0-9a-fA-F]{3,8}/g);
  if (hexMatch) {
    return hexMatch.slice(0, 5).join(",");
  }

  // options에서 colors 배열 추출
  const colors = options?.colors as string[] | undefined;
  if (colors && Array.isArray(colors)) {
    return colors.slice(0, 5).join(",");
  }

  return input;
}

/**
 * URL 인코딩된 OG 파라미터 생성
 */
export interface OgParams {
  type?: "code" | "hash" | "color" | "default";
  preview?: string;
  input?: string;
  hash?: string;
  algorithm?: string;
}

/**
 * 공유 데이터에서 OG 이미지 URL 파라미터 생성
 */
export function generateOgParams(
  toolSlug: ToolSlug,
  input: string,
  options?: Record<string, unknown>,
): OgParams {
  const ogType = getOgType(toolSlug);

  switch (ogType) {
    case "code":
      return {
        type: "code",
        preview: generateCodePreview(input),
      };

    case "hash": {
      const hashPreview = generateHashPreview(input, options);
      return {
        type: "hash",
        input: hashPreview.input,
        hash: hashPreview.hash,
        algorithm: hashPreview.algorithm,
      };
    }

    case "color":
      return {
        type: "color",
        preview: generateColorPreview(input, options),
      };

    default:
      return {
        type: "default",
      };
  }
}

/**
 * OG 이미지 URL 생성
 */
export function generateOgImageUrl(
  baseUrl: string,
  toolSlug: ToolSlug,
  title: string,
  description: string,
  input?: string,
  options?: Record<string, unknown>,
): string {
  const params = new URLSearchParams();
  params.set("title", title);
  params.set("description", description);

  // 입력 데이터가 있으면 미리보기 파라미터 추가
  if (input) {
    const ogParams = generateOgParams(toolSlug, input, options);

    if (ogParams.type && ogParams.type !== "default") {
      params.set("type", ogParams.type);
    }

    if (ogParams.preview) {
      params.set("preview", ogParams.preview);
    }

    if (ogParams.input) {
      params.set("input", ogParams.input);
    }

    if (ogParams.hash) {
      params.set("hash", ogParams.hash);
    }

    if (ogParams.algorithm) {
      params.set("algorithm", ogParams.algorithm);
    }
  }

  return `${baseUrl}/api/og/${toolSlug}?${params.toString()}`;
}
