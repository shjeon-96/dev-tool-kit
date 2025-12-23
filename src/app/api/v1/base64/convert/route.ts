import { NextRequest } from "next/server";
import {
  authenticateApiKey,
  logApiUsage,
  apiResponse,
  apiError,
} from "@/shared/lib/api";

export const runtime = "nodejs";

type ConvertMode = "encode" | "decode";

/**
 * POST /api/v1/base64/convert
 *
 * Base64 인코딩/디코딩 API
 *
 * Request Body:
 * {
 *   "input": string,           // 변환할 텍스트
 *   "mode": "encode" | "decode",  // 변환 모드 (기본: encode)
 *   "urlSafe": boolean         // URL-safe Base64 사용 (기본: false)
 * }
 *
 * Response:
 * {
 *   "success": true,
 *   "data": {
 *     "result": string,
 *     "mode": string,
 *     "urlSafe": boolean,
 *     "inputLength": number,
 *     "outputLength": number
 *   }
 * }
 */
export async function POST(request: NextRequest) {
  const startTime = Date.now();

  // 인증
  const auth = await authenticateApiKey(request);
  if (!auth.success) {
    return apiError(auth.error!, auth.statusCode!, auth.rateLimit);
  }

  try {
    const body = await request.json();
    const {
      input,
      mode = "encode",
      urlSafe = false,
    } = body as {
      input?: string;
      mode?: ConvertMode;
      urlSafe?: boolean;
    };

    if (input === undefined || input === null) {
      await logApiUsage(
        auth.apiKeyId!,
        "/api/v1/base64/convert",
        "POST",
        400,
        Date.now() - startTime,
      );
      return apiError("Missing required field: input", 400, auth.rateLimit);
    }

    if (typeof input !== "string") {
      await logApiUsage(
        auth.apiKeyId!,
        "/api/v1/base64/convert",
        "POST",
        400,
        Date.now() - startTime,
      );
      return apiError("Input must be a string", 400, auth.rateLimit);
    }

    if (mode !== "encode" && mode !== "decode") {
      await logApiUsage(
        auth.apiKeyId!,
        "/api/v1/base64/convert",
        "POST",
        400,
        Date.now() - startTime,
      );
      return apiError('Mode must be "encode" or "decode"', 400, auth.rateLimit);
    }

    let result: string;

    if (mode === "encode") {
      // 인코딩
      result = Buffer.from(input, "utf8").toString("base64");
      if (urlSafe) {
        result = result
          .replace(/\+/g, "-")
          .replace(/\//g, "_")
          .replace(/=+$/, "");
      }
    } else {
      // 디코딩
      let base64Input = input;
      if (urlSafe) {
        // URL-safe Base64를 표준 Base64로 변환
        base64Input = input.replace(/-/g, "+").replace(/_/g, "/");
        // 패딩 추가
        const padding = 4 - (base64Input.length % 4);
        if (padding !== 4) {
          base64Input += "=".repeat(padding);
        }
      }

      try {
        result = Buffer.from(base64Input, "base64").toString("utf8");
      } catch {
        await logApiUsage(
          auth.apiKeyId!,
          "/api/v1/base64/convert",
          "POST",
          400,
          Date.now() - startTime,
        );
        return apiError("Invalid Base64 input", 400, auth.rateLimit);
      }
    }

    const responseData = {
      result,
      mode,
      urlSafe,
      inputLength: input.length,
      outputLength: result.length,
    };

    await logApiUsage(
      auth.apiKeyId!,
      "/api/v1/base64/convert",
      "POST",
      200,
      Date.now() - startTime,
    );

    return apiResponse(responseData, 200, auth.rateLimit);
  } catch (error) {
    await logApiUsage(
      auth.apiKeyId!,
      "/api/v1/base64/convert",
      "POST",
      500,
      Date.now() - startTime,
    );
    return apiError(
      `Server error: ${error instanceof Error ? error.message : "Unknown error"}`,
      500,
      auth.rateLimit,
    );
  }
}
