import { NextRequest, NextResponse } from "next/server";

// ============================================
// Widget Embed Tracking API
// ============================================

// In-memory counter (실제 프로덕션에서는 DB 사용)
const embedStats: Map<
  string,
  { tool: string; host: string; count: number; lastSeen: number }
> = new Map();

/**
 * GET /api/widget/track
 * 위젯 임베드 추적 (1x1 투명 픽셀 반환)
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const tool = searchParams.get("tool");
  const host = searchParams.get("host");
  const version = searchParams.get("v");

  // 기본 검증
  if (!tool || !host) {
    return new NextResponse(null, { status: 400 });
  }

  // 통계 업데이트
  const key = `${tool}:${host}`;
  const existing = embedStats.get(key);

  if (existing) {
    existing.count += 1;
    existing.lastSeen = Date.now();
  } else {
    embedStats.set(key, {
      tool,
      host,
      count: 1,
      lastSeen: Date.now(),
    });
  }

  // 로그 (프로덕션에서는 분석 서비스로 전송)
  console.log(`[Widget Embed] tool=${tool} host=${host} v=${version}`);

  // 1x1 투명 GIF 반환
  const pixel = Buffer.from(
    "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
    "base64",
  );

  return new NextResponse(pixel, {
    status: 200,
    headers: {
      "Content-Type": "image/gif",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    },
  });
}

/**
 * OPTIONS /api/widget/track
 * CORS preflight
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400",
    },
  });
}
