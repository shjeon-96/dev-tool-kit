import { NextRequest } from "next/server";
import {
  authenticateApiKey,
  logApiUsage,
  apiResponse,
  apiError,
} from "@/shared/lib/api";

export const runtime = "nodejs";

/**
 * POST /api/v1/json/format
 *
 * JSON 포맷팅 API
 *
 * Request Body:
 * {
 *   "json": string | object,  // JSON 문자열 또는 객체
 *   "indent": number,          // 들여쓰기 (기본: 2)
 *   "minify": boolean          // 최소화 여부 (기본: false)
 * }
 *
 * Response:
 * {
 *   "success": true,
 *   "data": {
 *     "formatted": string,
 *     "valid": boolean,
 *     "size": { original: number, formatted: number }
 *   }
 * }
 */
export async function POST(request: NextRequest) {
  const startTime = Date.now();

  // 인증
  const auth = await authenticateApiKey(request);
  if (!auth.success) {
    return apiError(auth.error!, auth.statusCode!);
  }

  try {
    const body = await request.json();
    const { json, indent = 2, minify = false } = body;

    if (json === undefined || json === null) {
      await logApiUsage(
        auth.apiKeyId!,
        "/api/v1/json/format",
        "POST",
        400,
        Date.now() - startTime,
      );
      return apiError("Missing required field: json");
    }

    // JSON 파싱 및 포맷팅
    let parsed: unknown;
    let originalString: string;

    if (typeof json === "string") {
      originalString = json;
      try {
        parsed = JSON.parse(json);
      } catch (e) {
        await logApiUsage(
          auth.apiKeyId!,
          "/api/v1/json/format",
          "POST",
          400,
          Date.now() - startTime,
        );
        return apiError(
          `Invalid JSON: ${e instanceof Error ? e.message : "Parse error"}`,
        );
      }
    } else {
      originalString = JSON.stringify(json);
      parsed = json;
    }

    // 포맷팅
    const formatted = minify
      ? JSON.stringify(parsed)
      : JSON.stringify(parsed, null, indent);

    const responseData = {
      formatted,
      valid: true,
      size: {
        original: originalString.length,
        formatted: formatted.length,
      },
    };

    await logApiUsage(
      auth.apiKeyId!,
      "/api/v1/json/format",
      "POST",
      200,
      Date.now() - startTime,
    );

    return apiResponse(responseData);
  } catch (error) {
    await logApiUsage(
      auth.apiKeyId!,
      "/api/v1/json/format",
      "POST",
      500,
      Date.now() - startTime,
    );
    return apiError(
      `Server error: ${error instanceof Error ? error.message : "Unknown error"}`,
      500,
    );
  }
}
