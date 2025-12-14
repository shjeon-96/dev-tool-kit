import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import {
  saveShareData,
  checkRateLimit,
  createShareUrl,
  canShare,
} from "@/shared/lib/kv";
import type { ToolSlug } from "@/entities/tool";
import { tools } from "@/entities/tool";

// ============================================
// Share API Route Handler
// ============================================

interface ShareRequestBody {
  toolSlug: ToolSlug;
  input: string;
  options?: Record<string, unknown>;
}

/**
 * POST /api/share
 * 도구 데이터를 공유 링크로 생성
 */
export async function POST(request: NextRequest) {
  try {
    // 1. IP 추출 (Rate Limit용)
    const headersList = await headers();
    const forwardedFor = headersList.get("x-forwarded-for");
    const realIp = headersList.get("x-real-ip");
    const ip = forwardedFor?.split(",")[0] || realIp || "unknown";

    // 2. Rate Limit 체크
    const rateLimit = await checkRateLimit(ip);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many requests. Please try again later.",
        },
        {
          status: 429,
          headers: {
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": rateLimit.resetAt.toString(),
          },
        },
      );
    }

    // 3. Request Body 파싱
    const body: ShareRequestBody = await request.json();
    const { toolSlug, input, options } = body;

    // 4. 입력 검증
    if (!toolSlug || typeof toolSlug !== "string") {
      return NextResponse.json(
        { success: false, error: "Invalid tool slug" },
        { status: 400 },
      );
    }

    if (!input || typeof input !== "string") {
      return NextResponse.json(
        { success: false, error: "Input is required" },
        { status: 400 },
      );
    }

    // 5. 도구 존재 여부 확인
    if (!tools[toolSlug]) {
      return NextResponse.json(
        { success: false, error: "Tool not found" },
        { status: 404 },
      );
    }

    // 6. 데이터 크기 검증
    const shareCheck = canShare(input);
    if (!shareCheck.canShare) {
      return NextResponse.json(
        { success: false, error: shareCheck.reason },
        { status: 413 },
      );
    }

    // 7. 공유 데이터 저장
    const result = await saveShareData(toolSlug, input, options);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 },
      );
    }

    // 8. 공유 URL 생성
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || `https://${headersList.get("host")}`;
    const shareUrl = createShareUrl(result.id!, baseUrl);

    // 9. 성공 응답
    return NextResponse.json(
      {
        success: true,
        id: result.id,
        url: shareUrl,
        expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days
      },
      {
        status: 201,
        headers: {
          "X-RateLimit-Remaining": rateLimit.remaining.toString(),
          "X-RateLimit-Reset": rateLimit.resetAt.toString(),
        },
      },
    );
  } catch (error) {
    console.error("Share API error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}

/**
 * OPTIONS /api/share
 * CORS preflight 처리
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
