import { NextRequest } from "next/server";
import { createHash } from "crypto";
import {
  authenticateApiKey,
  logApiUsage,
  apiResponse,
  apiError,
} from "@/shared/lib/api";

export const runtime = "nodejs";

type HashAlgorithm =
  | "md5"
  | "sha1"
  | "sha256"
  | "sha384"
  | "sha512"
  | "sha3-256"
  | "sha3-512";

const SUPPORTED_ALGORITHMS: HashAlgorithm[] = [
  "md5",
  "sha1",
  "sha256",
  "sha384",
  "sha512",
  "sha3-256",
  "sha3-512",
];

/**
 * POST /api/v1/hash/generate
 *
 * 해시 생성 API
 *
 * Request Body:
 * {
 *   "input": string,           // 해시할 텍스트
 *   "algorithm": string,       // 알고리즘 (기본: sha256)
 *   "encoding": "hex" | "base64"  // 출력 인코딩 (기본: hex)
 * }
 *
 * Response:
 * {
 *   "success": true,
 *   "data": {
 *     "hash": string,
 *     "algorithm": string,
 *     "encoding": string,
 *     "inputLength": number
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
    const {
      input,
      algorithm = "sha256",
      encoding = "hex",
    } = body as {
      input?: string;
      algorithm?: string;
      encoding?: "hex" | "base64";
    };

    if (input === undefined || input === null) {
      await logApiUsage(
        auth.apiKeyId!,
        "/api/v1/hash/generate",
        "POST",
        400,
        Date.now() - startTime,
      );
      return apiError("Missing required field: input");
    }

    if (typeof input !== "string") {
      await logApiUsage(
        auth.apiKeyId!,
        "/api/v1/hash/generate",
        "POST",
        400,
        Date.now() - startTime,
      );
      return apiError("Input must be a string");
    }

    const normalizedAlgorithm = algorithm.toLowerCase() as HashAlgorithm;
    if (!SUPPORTED_ALGORITHMS.includes(normalizedAlgorithm)) {
      await logApiUsage(
        auth.apiKeyId!,
        "/api/v1/hash/generate",
        "POST",
        400,
        Date.now() - startTime,
      );
      return apiError(
        `Unsupported algorithm. Supported: ${SUPPORTED_ALGORITHMS.join(", ")}`,
      );
    }

    if (encoding !== "hex" && encoding !== "base64") {
      await logApiUsage(
        auth.apiKeyId!,
        "/api/v1/hash/generate",
        "POST",
        400,
        Date.now() - startTime,
      );
      return apiError('Encoding must be "hex" or "base64"');
    }

    // 해시 생성
    const hash = createHash(normalizedAlgorithm)
      .update(input, "utf8")
      .digest(encoding);

    const responseData = {
      hash,
      algorithm: normalizedAlgorithm,
      encoding,
      inputLength: input.length,
    };

    await logApiUsage(
      auth.apiKeyId!,
      "/api/v1/hash/generate",
      "POST",
      200,
      Date.now() - startTime,
    );

    return apiResponse(responseData);
  } catch (error) {
    await logApiUsage(
      auth.apiKeyId!,
      "/api/v1/hash/generate",
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

/**
 * GET /api/v1/hash/generate
 *
 * 지원하는 알고리즘 목록 조회
 */
export async function GET(request: NextRequest) {
  const startTime = Date.now();

  // 인증
  const auth = await authenticateApiKey(request);
  if (!auth.success) {
    return apiError(auth.error!, auth.statusCode!);
  }

  await logApiUsage(
    auth.apiKeyId!,
    "/api/v1/hash/generate",
    "GET",
    200,
    Date.now() - startTime,
  );

  return apiResponse({
    supportedAlgorithms: SUPPORTED_ALGORITHMS,
    supportedEncodings: ["hex", "base64"],
  });
}
