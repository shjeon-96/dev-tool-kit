import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/shared/lib/supabase/server";
import { LEAD_MAGNETS } from "@/features/lead-capture";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, sourceTool, leadMagnetId, personaTag } = body;

    // 유효성 검증
    if (!email || !sourceTool || !leadMagnetId) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 },
      );
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Invalid email format" },
        { status: 400 },
      );
    }

    // Lead Magnet 존재 확인
    const leadMagnet = LEAD_MAGNETS[leadMagnetId];
    if (!leadMagnet) {
      return NextResponse.json(
        { success: false, message: "Invalid lead magnet" },
        { status: 400 },
      );
    }

    const supabase = await createClient();

    // leads 테이블에 저장 (중복 시 무시)
    // Note: leads 테이블은 Supabase에서 수동 생성 필요
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any).from("leads").upsert(
      {
        email,
        source_tool: sourceTool,
        lead_magnet: leadMagnetId,
        persona_tag: personaTag,
        subscribed_at: new Date().toISOString(),
      },
      {
        onConflict: "email,source_tool",
        ignoreDuplicates: true,
      },
    );

    if (error) {
      console.error("Failed to save lead:", error);
      // 테이블이 없어도 일단 성공 처리 (개발 환경)
      if (error.code === "42P01") {
        // relation does not exist
        console.warn("Leads table does not exist, skipping save");
      } else {
        return NextResponse.json(
          { success: false, message: "Failed to save lead" },
          { status: 500 },
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: "Lead captured successfully",
      leadMagnetUrl: leadMagnet.fileUrl,
    });
  } catch (error) {
    console.error("Lead capture error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
