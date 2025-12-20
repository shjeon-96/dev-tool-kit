"use client";

/**
 * useSubscription Hook
 *
 * 사용자 구독 상태 관리 훅
 */

import { useState, useEffect, useCallback, useMemo } from "react";
import { createClient } from "@/shared/lib/supabase/client";
import type {
  SubscriptionInfo,
  SubscriptionActions,
  UseSubscriptionReturn,
  TierType,
  SubscriptionStatus,
} from "./types";
import type { Database } from "@/shared/lib/supabase/types";

type SubscriptionRow = Database["public"]["Tables"]["subscriptions"]["Row"];
type UserRow = Database["public"]["Tables"]["users"]["Row"];

/**
 * 구독 상태 관리 훅
 */
export function useSubscription(): UseSubscriptionReturn {
  const supabase = createClient();

  const [subscription, setSubscription] = useState<SubscriptionInfo | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // 구독 정보 로드
  const loadSubscription = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // 현재 사용자 확인
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        setSubscription(null);
        setIsLoading(false);
        return;
      }

      // 사용자 및 구독 정보 조회
      const [userResult, subscriptionResult] = await Promise.all([
        supabase.from("users").select("tier").eq("id", user.id).single(),
        supabase
          .from("subscriptions")
          .select("*")
          .eq("user_id", user.id)
          .maybeSingle(),
      ]);

      const userData = userResult.data as UserRow | null;
      const subscriptionData =
        subscriptionResult.data as SubscriptionRow | null;

      // 구독 정보 변환
      const info = transformSubscription(user.id, userData, subscriptionData);
      setSubscription(info);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to load subscription"),
      );
    } finally {
      setIsLoading(false);
    }
  }, [supabase]);

  // 초기 로드
  useEffect(() => {
    loadSubscription();

    // Auth 상태 변경 구독
    const {
      data: { subscription: authSubscription },
    } = supabase.auth.onAuthStateChange(() => {
      loadSubscription();
    });

    return () => {
      authSubscription.unsubscribe();
    };
  }, [loadSubscription, supabase.auth]);

  // 구독하기 (체크아웃 시작)
  const subscribe = useCallback(async (variantId: string) => {
    try {
      setError(null);

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ variantId }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to create checkout");
      }

      const { checkoutUrl } = await response.json();
      window.location.href = checkoutUrl;
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Subscription failed"));
      throw err;
    }
  }, []);

  // 구독 취소
  const cancel = useCallback(async () => {
    try {
      setError(null);

      const response = await fetch("/api/subscription/cancel", {
        method: "POST",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to cancel subscription");
      }

      await loadSubscription();
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Cancellation failed"));
      throw err;
    }
  }, [loadSubscription]);

  // 구독 재개
  const resume = useCallback(async () => {
    try {
      setError(null);

      const response = await fetch("/api/subscription/resume", {
        method: "POST",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to resume subscription");
      }

      await loadSubscription();
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Resume failed"));
      throw err;
    }
  }, [loadSubscription]);

  // 플랜 변경
  const changePlan = useCallback(
    async (newVariantId: string) => {
      try {
        setError(null);

        const response = await fetch("/api/subscription/change-plan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ variantId: newVariantId }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Failed to change plan");
        }

        await loadSubscription();
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Plan change failed"));
        throw err;
      }
    },
    [loadSubscription],
  );

  // 새로고침
  const refresh = useCallback(async () => {
    await loadSubscription();
  }, [loadSubscription]);

  // 액션 객체
  const actions: SubscriptionActions = useMemo(
    () => ({
      subscribe,
      cancel,
      resume,
      changePlan,
      refresh,
    }),
    [subscribe, cancel, resume, changePlan, refresh],
  );

  return {
    subscription,
    isLoading,
    error,
    actions,
  };
}

/**
 * 구독 데이터 변환
 */
function transformSubscription(
  userId: string,
  user: UserRow | null,
  subscription: SubscriptionRow | null,
): SubscriptionInfo {
  const tier = (user?.tier || "free") as TierType;
  const status = subscription?.status || "none";

  // 활성 상태 확인
  const isActive = ["active", "trialing"].includes(status);
  const isPro = tier === "pro" && isActive;
  const isCanceled = subscription?.cancel_at_period_end === true;

  // 만료일까지 남은 일수
  let daysUntilExpiry: number | null = null;
  if (subscription?.current_period_end) {
    const endDate = new Date(subscription.current_period_end);
    const now = new Date();
    const diffTime = endDate.getTime() - now.getTime();
    daysUntilExpiry = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  return {
    id: subscription?.id || null,
    userId,
    status: status as SubscriptionStatus | "none",
    tier,

    provider: subscription?.provider || null,
    externalSubscriptionId: subscription?.external_subscription_id || null,
    externalCustomerId: subscription?.external_customer_id || null,
    planId: subscription?.plan_id || null,

    currentPeriodStart: subscription?.current_period_start
      ? new Date(subscription.current_period_start)
      : null,
    currentPeriodEnd: subscription?.current_period_end
      ? new Date(subscription.current_period_end)
      : null,
    cancelAtPeriodEnd: subscription?.cancel_at_period_end || false,

    isActive,
    isPro,
    isCanceled,
    daysUntilExpiry,
  };
}

/**
 * 티어별 기능 확인 훅
 */
export function useFeatureAccess() {
  const { subscription, isLoading } = useSubscription();

  return useMemo(
    () => ({
      isLoading,
      tier: subscription?.tier || "free",
      isActive: subscription?.isActive || false,
      isPro: subscription?.isPro || false,

      // 기능별 접근 확인
      canAccessBulkActions: subscription?.isPro || false,
      canAccessApi: subscription?.isPro || false,
      canAccessAdvancedExport: subscription?.isPro || false,
      canRemoveAds: subscription?.isPro || false,
      hasUnlimitedHistory: subscription?.isPro || false,
      hasPrioritySupport: subscription?.isPro || false,
    }),
    [subscription, isLoading],
  );
}
