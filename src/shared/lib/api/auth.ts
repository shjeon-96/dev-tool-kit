import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { createServiceClient } from "../supabase/server";
import { API_RATE_LIMITS } from "@/features/api-access/model/types";

export interface ApiAuthResult {
  success: boolean;
  userId?: string;
  apiKeyId?: string;
  error?: string;
  statusCode?: number;
}

/**
 * API 키 인증 및 Rate Limiting
 * - Bearer 토큰 형식: Authorization: Bearer wtk_xxxxx
 * - Rate limit 체크: 분/일/월 단위
 */
export async function authenticateApiKey(
  request: NextRequest,
): Promise<ApiAuthResult> {
  const authHeader = request.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return {
      success: false,
      error: "Missing or invalid Authorization header. Use: Bearer <api_key>",
      statusCode: 401,
    };
  }

  const apiKey = authHeader.replace("Bearer ", "").trim();

  if (!apiKey.startsWith("wtk_")) {
    return {
      success: false,
      error: "Invalid API key format",
      statusCode: 401,
    };
  }

  const supabase = createServiceClient();

  // API 키 조회
  const { data: keyData, error: keyError } = await supabase
    .from("api_keys")
    .select("id, user_id, expires_at, revoked_at")
    .eq("key_hash", hashApiKey(apiKey))
    .single();

  if (keyError || !keyData) {
    return {
      success: false,
      error: "Invalid API key",
      statusCode: 401,
    };
  }

  // 타입 단언 - 실제 DB 스키마에 맞춤
  const apiKeyData = keyData as {
    id: string;
    user_id: string;
    expires_at: string | null;
    revoked_at: string | null;
  };

  if (apiKeyData.revoked_at) {
    return {
      success: false,
      error: "API key is revoked",
      statusCode: 401,
    };
  }

  if (apiKeyData.expires_at && new Date(apiKeyData.expires_at) < new Date()) {
    return {
      success: false,
      error: "API key has expired",
      statusCode: 401,
    };
  }

  // 사용자 구독 상태 확인
  const { data: userData } = await supabase
    .from("users")
    .select("tier")
    .eq("id", apiKeyData.user_id)
    .single();

  const userTier = (userData as { tier: string } | null)?.tier;

  if (!userTier || userTier !== "pro") {
    return {
      success: false,
      error: "API access requires Pro subscription",
      statusCode: 403,
    };
  }

  // Rate limit 체크
  const rateLimitResult = await checkRateLimit(
    supabase,
    apiKeyData.id,
    API_RATE_LIMITS.pro,
  );

  if (!rateLimitResult.allowed) {
    return {
      success: false,
      error: rateLimitResult.error,
      statusCode: 429,
    };
  }

  // 마지막 사용 시간 업데이트
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (supabase as any)
    .from("api_keys")
    .update({
      last_used_at: new Date().toISOString(),
    })
    .eq("id", apiKeyData.id);

  return {
    success: true,
    userId: apiKeyData.user_id,
    apiKeyId: apiKeyData.id,
  };
}

/**
 * API 키 해싱 (간단한 SHA-256)
 */
function hashApiKey(key: string): string {
  // 클라이언트에서 해싱된 키를 저장했으므로 동일한 방식으로 해싱
  // 실제로는 bcrypt 등 더 안전한 방식 권장
  return createHash("sha256").update(key).digest("hex");
}

/**
 * Rate Limit 체크
 */
async function checkRateLimit(
  supabase: ReturnType<typeof createServiceClient>,
  apiKeyId: string,
  limits: (typeof API_RATE_LIMITS)["pro"],
): Promise<{ allowed: boolean; error?: string }> {
  const now = new Date();
  const oneMinuteAgo = new Date(now.getTime() - 60 * 1000);
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  // 분당 요청 수
  const { count: minuteCount } = await supabase
    .from("api_usage")
    .select("*", { count: "exact", head: true })
    .eq("api_key_id", apiKeyId)
    .gte("created_at", oneMinuteAgo.toISOString());

  if ((minuteCount ?? 0) >= limits.requestsPerMinute) {
    return {
      allowed: false,
      error: `Rate limit exceeded: ${limits.requestsPerMinute} requests per minute`,
    };
  }

  // 일간 요청 수
  const { count: dayCount } = await supabase
    .from("api_usage")
    .select("*", { count: "exact", head: true })
    .eq("api_key_id", apiKeyId)
    .gte("created_at", oneDayAgo.toISOString());

  if ((dayCount ?? 0) >= limits.requestsPerDay) {
    return {
      allowed: false,
      error: `Rate limit exceeded: ${limits.requestsPerDay} requests per day`,
    };
  }

  // 월간 요청 수
  const { count: monthCount } = await supabase
    .from("api_usage")
    .select("*", { count: "exact", head: true })
    .eq("api_key_id", apiKeyId)
    .gte("created_at", oneMonthAgo.toISOString());

  if ((monthCount ?? 0) >= limits.requestsPerMonth) {
    return {
      allowed: false,
      error: `Rate limit exceeded: ${limits.requestsPerMonth} requests per month`,
    };
  }

  return { allowed: true };
}

/**
 * API 사용 기록 저장
 */
export async function logApiUsage(
  apiKeyId: string,
  endpoint: string,
  method: string,
  statusCode: number,
  responseTimeMs: number,
): Promise<void> {
  const supabase = createServiceClient();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (supabase as any).from("api_usage").insert({
    api_key_id: apiKeyId,
    endpoint,
    method,
    status_code: statusCode,
    response_time_ms: responseTimeMs,
    created_at: new Date().toISOString(),
  });
}

/**
 * API 응답 헬퍼
 */
export function apiResponse<T>(
  data: T,
  status: number = 200,
): NextResponse<{ success: true; data: T }> {
  return NextResponse.json({ success: true, data }, { status });
}

export function apiError(
  error: string,
  status: number = 400,
): NextResponse<{ success: false; error: string }> {
  return NextResponse.json({ success: false, error }, { status });
}
