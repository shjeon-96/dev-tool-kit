import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/shared/lib/supabase/server";
import { createLemonSqueezyCheckout } from "@/shared/lib/lemonsqueezy";

export async function POST(request: NextRequest) {
  try {
    // 환경 변수 확인
    if (!process.env.LEMONSQUEEZY_API_KEY) {
      console.error("Checkout error: LEMONSQUEEZY_API_KEY is not configured");
      return NextResponse.json(
        { error: "Payment service is not configured" },
        { status: 503 },
      );
    }

    if (!process.env.NEXT_PUBLIC_LEMONSQUEEZY_STORE_ID) {
      console.error(
        "Checkout error: NEXT_PUBLIC_LEMONSQUEEZY_STORE_ID is not configured",
      );
      return NextResponse.json(
        { error: "Payment service is not configured" },
        { status: 503 },
      );
    }

    // Variant ID 환경변수 확인
    const hasVariantIds =
      process.env.NEXT_PUBLIC_LEMONSQUEEZY_VARIANT_PRO_MONTHLY ||
      process.env.NEXT_PUBLIC_LEMONSQUEEZY_VARIANT_PRO_YEARLY;

    if (!hasVariantIds) {
      console.error(
        "Checkout error: LEMONSQUEEZY_VARIANT_PRO_MONTHLY/YEARLY is not configured",
      );
      return NextResponse.json(
        { error: "Payment service is not configured" },
        { status: 503 },
      );
    }

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
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 },
      );
    }

    const { variantId } = body;

    if (!variantId) {
      return NextResponse.json(
        { error: "Variant ID is required" },
        { status: 400 },
      );
    }

    // variantId가 유효한지 확인 (빈 문자열이 아닌지)
    if (typeof variantId !== "string" || variantId.trim() === "") {
      console.error("Checkout error: Invalid variantId received:", variantId);
      return NextResponse.json(
        { error: "Invalid variant ID" },
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
      console.error("Checkout error: No checkout URL returned", checkout);
      return NextResponse.json(
        { error: "Failed to create checkout URL" },
        { status: 500 },
      );
    }

    return NextResponse.json({ checkoutUrl });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Checkout error:", errorMessage, error);

    // 사용자에게 더 구체적인 에러 메시지 제공
    if (errorMessage.includes("LEMONSQUEEZY_API_KEY")) {
      return NextResponse.json(
        { error: "Payment service is not configured" },
        { status: 503 },
      );
    }

    if (errorMessage.includes("STORE_ID")) {
      return NextResponse.json(
        { error: "Payment service is not configured" },
        { status: 503 },
      );
    }

    // LemonSqueezy "Not Found" 에러 - 잘못된 variantId 또는 storeId
    if (errorMessage.includes("Not Found")) {
      console.error(
        "Checkout error: Invalid variantId or storeId configuration",
      );
      return NextResponse.json(
        { error: "Payment service is not configured correctly" },
        { status: 503 },
      );
    }

    return NextResponse.json(
      { error: "Failed to create checkout. Please try again later." },
      { status: 500 },
    );
  }
}
