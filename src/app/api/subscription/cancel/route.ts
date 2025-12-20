import { NextResponse } from "next/server";
import { createClient } from "@/shared/lib/supabase/server";
import { cancelLemonSqueezySubscription } from "@/shared/lib/lemonsqueezy";
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
        { error: "No active subscription found" },
        { status: 404 },
      );
    }

    if (!subscription.external_subscription_id) {
      return NextResponse.json(
        { error: "External subscription ID not found" },
        { status: 400 },
      );
    }

    // Lemon Squeezy에서 구독 취소
    await cancelLemonSqueezySubscription(subscription.external_subscription_id);

    // 로컬 DB 업데이트 (웹훅에서도 처리되지만, 즉시 반영을 위해)
    await supabase
      .from("subscriptions")
      .update({ cancel_at_period_end: true } as never)
      .eq("user_id", user.id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Cancel subscription error:", error);
    return NextResponse.json(
      { error: "Failed to cancel subscription" },
      { status: 500 },
    );
  }
}
