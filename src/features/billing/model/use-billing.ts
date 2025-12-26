"use client";

/**
 * useBilling Hook
 *
 * 구독 관리 로직을 담당하는 커스텀 훅
 * - 구독 상태 계산
 * - 구독 취소/재개 API 호출
 * - UI 상태 관리
 */

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { Database } from "@/shared/lib/supabase/types";
import type { TierType } from "@/shared/lib/lemonsqueezy/tiers";
import { TIERS } from "@/shared/lib/lemonsqueezy/tiers";

type UserRow = Database["public"]["Tables"]["users"]["Row"];
type SubscriptionRow = Database["public"]["Tables"]["subscriptions"]["Row"];

interface UseBillingProps {
  user: UserRow | null;
  subscription: SubscriptionRow | null;
}

interface UseBillingReturn {
  // 상태
  tier: TierType;
  tierConfig: (typeof TIERS)[TierType];
  isActive: boolean;
  isCanceled: boolean;
  periodEnd: Date | null;

  // UI 상태
  showCancelDialog: boolean;
  setShowCancelDialog: (show: boolean) => void;
  isLoading: boolean;

  // 액션
  handleCancelSubscription: () => Promise<void>;
  handleResumeSubscription: () => Promise<void>;
}

export function useBilling({
  user,
  subscription,
}: UseBillingProps): UseBillingReturn {
  const router = useRouter();

  // UI 상태
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 구독 상태 계산 (enterprise는 더 이상 지원하지 않으므로 pro로 매핑)
  const dbTier = user?.tier || "free";
  const tier: TierType = dbTier === "enterprise" ? "pro" : (dbTier as TierType);
  const tierConfig = TIERS[tier];

  const isActive =
    subscription?.status === "active" || subscription?.status === "trialing";
  const isCanceled = subscription?.cancel_at_period_end === true;
  const periodEnd = subscription?.current_period_end
    ? new Date(subscription.current_period_end)
    : null;

  // 구독 취소 처리
  const handleCancelSubscription = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/subscription/cancel", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to cancel subscription");
      }

      setShowCancelDialog(false);
      router.refresh();
    } catch (error) {
      console.error("Cancel error:", error);
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  // 구독 재개 처리
  const handleResumeSubscription = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/subscription/resume", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to resume subscription");
      }

      router.refresh();
    } catch (error) {
      console.error("Resume error:", error);
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  return {
    // 상태
    tier,
    tierConfig,
    isActive,
    isCanceled,
    periodEnd,

    // UI 상태
    showCancelDialog,
    setShowCancelDialog,
    isLoading,

    // 액션
    handleCancelSubscription,
    handleResumeSubscription,
  };
}
