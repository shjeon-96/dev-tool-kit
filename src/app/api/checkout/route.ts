import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/shared/lib/supabase/server";
import { createLemonSqueezyCheckout } from "@/shared/lib/lemonsqueezy";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    // 현재 사용자 확인
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 },
      );
    }

    // 요청 바디 파싱
    const { variantId } = await request.json();

    if (!variantId) {
      return NextResponse.json(
        { error: "Variant ID is required" },
        { status: 400 },
      );
    }

    // Lemon Squeezy 체크아웃 생성
    const checkout = await createLemonSqueezyCheckout({
      variantId,
      userId: user.id,
      userEmail: user.email!,
      userName: user.user_metadata?.full_name,
    });

    // 체크아웃 URL 반환
    const checkoutUrl = checkout.data?.attributes?.url;

    if (!checkoutUrl) {
      return NextResponse.json(
        { error: "Failed to create checkout URL" },
        { status: 500 },
      );
    }

    return NextResponse.json({ checkoutUrl });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout" },
      { status: 500 },
    );
  }
}
