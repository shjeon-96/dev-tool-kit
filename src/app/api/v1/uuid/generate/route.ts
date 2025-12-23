import { NextRequest } from "next/server";
import { randomUUID } from "crypto";
import {
  authenticateApiKey,
  logApiUsage,
  apiResponse,
  apiError,
} from "@/shared/lib/api";

export const runtime = "nodejs";

type UuidVersion = "v4" | "nil";
type UuidFormat = "standard" | "uppercase" | "no-dashes" | "braces";

/**
 * POST /api/v1/uuid/generate
 *
 * UUID 생성 API
 *
 * Request Body:
 * {
 *   "version": "v4" | "nil",      // UUID 버전 (기본: v4)
 *   "count": number,              // 생성 개수 (기본: 1, 최대: 100)
 *   "format": "standard" | "uppercase" | "no-dashes" | "braces"  // 형식 (기본: standard)
 * }
 *
 * Response:
 * {
 *   "success": true,
 *   "data": {
 *     "uuids": string[],
 *     "version": string,
 *     "format": string,
 *     "count": number
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
      version = "v4",
      count = 1,
      format = "standard",
    } = body as {
      version?: UuidVersion;
      count?: number;
      format?: UuidFormat;
    };

    if (version !== "v4" && version !== "nil") {
      await logApiUsage(
        auth.apiKeyId!,
        "/api/v1/uuid/generate",
        "POST",
        400,
        Date.now() - startTime,
      );
      return apiError('Version must be "v4" or "nil"', 400, auth.rateLimit);
    }

    if (typeof count !== "number" || count < 1 || count > 100) {
      await logApiUsage(
        auth.apiKeyId!,
        "/api/v1/uuid/generate",
        "POST",
        400,
        Date.now() - startTime,
      );
      return apiError(
        "Count must be a number between 1 and 100",
        400,
        auth.rateLimit,
      );
    }

    if (!["standard", "uppercase", "no-dashes", "braces"].includes(format)) {
      await logApiUsage(
        auth.apiKeyId!,
        "/api/v1/uuid/generate",
        "POST",
        400,
        Date.now() - startTime,
      );
      return apiError(
        'Format must be "standard", "uppercase", "no-dashes", or "braces"',
        400,
        auth.rateLimit,
      );
    }

    const uuids: string[] = [];

    for (let i = 0; i < count; i++) {
      let uuid: string;

      if (version === "nil") {
        uuid = "00000000-0000-0000-0000-000000000000";
      } else {
        uuid = randomUUID();
      }

      // 형식 적용
      switch (format) {
        case "uppercase":
          uuid = uuid.toUpperCase();
          break;
        case "no-dashes":
          uuid = uuid.replace(/-/g, "");
          break;
        case "braces":
          uuid = `{${uuid}}`;
          break;
        default:
          // standard - 그대로 유지
          break;
      }

      uuids.push(uuid);
    }

    const responseData = {
      uuids,
      version,
      format,
      count: uuids.length,
    };

    await logApiUsage(
      auth.apiKeyId!,
      "/api/v1/uuid/generate",
      "POST",
      200,
      Date.now() - startTime,
    );

    return apiResponse(responseData, 200, auth.rateLimit);
  } catch (error) {
    await logApiUsage(
      auth.apiKeyId!,
      "/api/v1/uuid/generate",
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

/**
 * GET /api/v1/uuid/generate
 *
 * 단일 UUID v4 생성 (간편 API)
 */
export async function GET(request: NextRequest) {
  const startTime = Date.now();

  // 인증
  const auth = await authenticateApiKey(request);
  if (!auth.success) {
    return apiError(auth.error!, auth.statusCode!, auth.rateLimit);
  }

  const uuid = randomUUID();

  await logApiUsage(
    auth.apiKeyId!,
    "/api/v1/uuid/generate",
    "GET",
    200,
    Date.now() - startTime,
  );

  return apiResponse(
    {
      uuid,
      version: "v4",
    },
    200,
    auth.rateLimit,
  );
}
