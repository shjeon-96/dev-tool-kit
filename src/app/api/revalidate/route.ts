/**
 * On-demand ISR 재생성 API
 *
 * 특정 경로의 정적 페이지를 즉시 재생성하도록 트리거
 */

import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET;

export async function POST(request: Request) {
  // 인증 검증
  const authHeader = request.headers.get("authorization");
  if (REVALIDATE_SECRET && authHeader !== `Bearer ${REVALIDATE_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { path, type = "page" } = body;

    if (!path) {
      return NextResponse.json({ error: "Path is required" }, { status: 400 });
    }

    // 경로 기반 재생성
    // type: "page" | "layout"
    revalidatePath(path, type as "page" | "layout");
    console.log(`[Revalidate] Path revalidated: ${path} (${type})`);

    return NextResponse.json({
      success: true,
      revalidated: { path, type },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[Revalidate] Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: (error as Error).message,
      },
      { status: 500 },
    );
  }
}
