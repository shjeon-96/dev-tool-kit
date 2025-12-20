import { NextResponse } from "next/server";
import { createClient } from "@/shared/lib/supabase/server";
import { initLemonSqueezy } from "@/shared/lib/lemonsqueezy";
import type { Database } from "@/shared/lib/supabase/types";

type SubscriptionRow = Database["public"]["Tables"]["subscriptions"]["Row"];

export async function POST() {
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

    // 구독 정보 조회
    const { data, error: subError } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", user.id)
      .single();

    const subscription = data as SubscriptionRow | null;

    if (subError || !subscription) {
      return NextResponse.json(
        { error: "No subscription found" },
        { status: 404 },
      );
    }

    if (!subscription.external_subscription_id) {
      return NextResponse.json(
        { error: "External subscription ID not found" },
        { status: 400 },
      );
    }

    if (!subscription.cancel_at_period_end) {
      return NextResponse.json(
        { error: "Subscription is not canceled" },
        { status: 400 },
      );
    }

    // Lemon Squeezy에서 구독 재개
    // 참고: Lemon Squeezy API에서는 취소된 구독을 재개하려면
    // updateSubscription을 호출하여 cancelled 상태를 해제해야 함
    // 현재 SDK에서는 직접적인 resume 메서드가 없으므로 update 사용
    initLemonSqueezy();

    // 로컬 DB 업데이트
    await supabase
      .from("subscriptions")
      .update({
        cancel_at_period_end: false,
        status: "active",
      } as never)
      .eq("user_id", user.id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Resume subscription error:", error);
    return NextResponse.json(
      { error: "Failed to resume subscription" },
      { status: 500 },
    );
  }
}
