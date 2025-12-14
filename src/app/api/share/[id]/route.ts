import { NextRequest, NextResponse } from "next/server";
import { getShareData } from "@/shared/lib/kv";

// ============================================
// Share Data Retrieval API
// ============================================

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/share/[id]
 * 공유 데이터 조회
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    if (!id || typeof id !== "string") {
      return NextResponse.json(
        { success: false, error: "Invalid share ID" },
        { status: 400 },
      );
    }

    // 공유 데이터 조회
    const result = await getShareData(id);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: result.data,
    });
  } catch (error) {
    console.error("Share data retrieval error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
