import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/shared/lib/supabase/server";
import {
  verifyWebhookSignature,
  parseWebhookPayload,
  extractSubscriptionData,
  extractUserId,
  isSubscriptionEvent,
  type WebhookEventType,
} from "@/shared/lib/lemonsqueezy";
import { getTierByVariantId } from "@/shared/lib/lemonsqueezy/tiers";
import type { Database } from "@/shared/lib/supabase/types";
import { createLogger } from "@/shared/lib/logger";

const logger = createLogger("webhook:lemonsqueezy");

type SubscriptionStatus =
  Database["public"]["Tables"]["subscriptions"]["Row"]["status"];
type SubscriptionInsert =
  Database["public"]["Tables"]["subscriptions"]["Insert"];
type SubscriptionUpdate =
  Database["public"]["Tables"]["subscriptions"]["Update"];
type UserUpdate = Database["public"]["Tables"]["users"]["Update"];

// Lemon Squeezy 상태를 DB 상태로 매핑
function mapStatus(lsStatus: string): SubscriptionStatus {
  const statusMap: Record<string, SubscriptionStatus> = {
    active: "active",
    on_trial: "trialing",
    paused: "paused",
    past_due: "past_due",
    unpaid: "past_due",
    cancelled: "canceled",
    expired: "canceled",
  };
  return statusMap[lsStatus] || "active";
}

export async function POST(request: NextRequest) {
  try {
    // 원본 바디 가져오기 (서명 검증용)
    const rawBody = await request.text();

    // 서명 검증
    const signature = request.headers.get("x-signature");
    const webhookSecret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;

    if (!signature || !webhookSecret) {
      console.error("Missing signature or webhook secret");
      return NextResponse.json(
        { error: "Missing signature or webhook secret" },
        { status: 400 },
      );
    }

    const isValid = verifyWebhookSignature(rawBody, signature, webhookSecret);

    if (!isValid) {
      console.error("Invalid webhook signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    // 페이로드 파싱
    const payload = parseWebhookPayload(rawBody);
    const eventType = payload.meta.event_name as WebhookEventType;

    logger.info("Webhook received", { eventType });

    // 구독 이벤트 처리
    if (isSubscriptionEvent(eventType)) {
      await handleSubscriptionEvent(eventType, payload);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 },
    );
  }
}

async function handleSubscriptionEvent(
  eventType: WebhookEventType,
  payload: ReturnType<typeof parseWebhookPayload>,
) {
  const supabase = createServiceClient();
  const subscriptionData = extractSubscriptionData(payload);
  const userId = extractUserId(payload);

  if (!userId) {
    console.error("No user_id in webhook custom data");
    return;
  }

  // Tier 결정
  const tier = getTierByVariantId(String(subscriptionData.variantId));
  const tierType = tier?.id || "pro";

  switch (eventType) {
    case "subscription_created":
    case "subscription_updated":
    case "subscription_resumed": {
      // 구독 생성/업데이트/재개
      const subscriptionInsertPayload: SubscriptionInsert = {
        user_id: userId,
        provider: "lemonsqueezy",
        external_subscription_id: subscriptionData.id,
        external_customer_id: String(subscriptionData.customerId),
        plan_id: String(subscriptionData.variantId),
        status: mapStatus(subscriptionData.status),
        current_period_start: subscriptionData.createdAt,
        current_period_end: subscriptionData.renewsAt,
        cancel_at_period_end: subscriptionData.cancelled,
      };

      const subscriptionUpdatePayload: SubscriptionUpdate = {
        provider: "lemonsqueezy",
        external_subscription_id: subscriptionData.id,
        external_customer_id: String(subscriptionData.customerId),
        plan_id: String(subscriptionData.variantId),
        status: mapStatus(subscriptionData.status),
        current_period_start: subscriptionData.createdAt,
        current_period_end: subscriptionData.renewsAt,
        cancel_at_period_end: subscriptionData.cancelled,
      };

      // 기존 구독 확인
      const { data: existing } = await supabase
        .from("subscriptions")
        .select("id")
        .eq("user_id", userId)
        .maybeSingle();

      if (existing) {
        const { error: updateError } = await supabase
          .from("subscriptions")
          .update(subscriptionUpdatePayload as never)
          .eq("user_id", userId);
        if (updateError) {
          console.error("Failed to update subscription:", updateError);
        }
      } else {
        const { error: insertError } = await supabase
          .from("subscriptions")
          .insert(subscriptionInsertPayload as never);
        if (insertError) {
          console.error("Failed to insert subscription:", insertError);
        }
      }

      // 사용자 티어 업데이트
      const { error: userTierError } = await supabase
        .from("users")
        .update({ tier: tierType } as UserUpdate as never)
        .eq("id", userId);
      if (userTierError) {
        console.error("Failed to update user tier:", userTierError);
      }
      break;
    }

    case "subscription_cancelled": {
      // 구독 취소 (기간 종료 시 취소 예정)
      const { error: cancelError } = await supabase
        .from("subscriptions")
        .update({
          status: "canceled",
          cancel_at_period_end: true,
        } as SubscriptionUpdate as never)
        .eq("user_id", userId);
      if (cancelError) {
        console.error("Failed to cancel subscription:", cancelError);
      }
      break;
    }

    case "subscription_expired": {
      // 구독 만료
      const { error: expireError } = await supabase
        .from("subscriptions")
        .update({ status: "canceled" } as SubscriptionUpdate as never)
        .eq("user_id", userId);
      if (expireError) {
        console.error("Failed to expire subscription:", expireError);
      }

      // 사용자 티어를 무료로 변경
      const { error: downgradeError } = await supabase
        .from("users")
        .update({ tier: "free" } as UserUpdate as never)
        .eq("id", userId);
      if (downgradeError) {
        console.error("Failed to downgrade user tier:", downgradeError);
      }
      break;
    }

    case "subscription_paused": {
      // 구독 일시정지
      const { error: pauseError } = await supabase
        .from("subscriptions")
        .update({ status: "paused" } as SubscriptionUpdate as never)
        .eq("user_id", userId);
      if (pauseError) {
        console.error("Failed to pause subscription:", pauseError);
      }
      break;
    }

    case "subscription_payment_success": {
      // 결제 성공 - 갱신 날짜 업데이트
      const { error: paymentSuccessError } = await supabase
        .from("subscriptions")
        .update({
          status: "active",
          current_period_end: subscriptionData.renewsAt,
        } as SubscriptionUpdate as never)
        .eq("user_id", userId);
      if (paymentSuccessError) {
        console.error("Failed to update payment success:", paymentSuccessError);
      }
      break;
    }

    case "subscription_payment_failed": {
      // 결제 실패
      const { error: paymentFailError } = await supabase
        .from("subscriptions")
        .update({ status: "past_due" } as SubscriptionUpdate as never)
        .eq("user_id", userId);
      if (paymentFailError) {
        console.error("Failed to update payment failed:", paymentFailError);
      }
      break;
    }

    case "subscription_payment_recovered": {
      // 결제 복구
      const { error: recoverError } = await supabase
        .from("subscriptions")
        .update({ status: "active" } as SubscriptionUpdate as never)
        .eq("user_id", userId);
      if (recoverError) {
        console.error("Failed to update payment recovered:", recoverError);
      }
      break;
    }

    default:
      logger.warn("Unhandled subscription event", { eventType });
  }
}
