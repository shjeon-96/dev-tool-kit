"use client";

/**
 * useQuota Hook
 *
 * 도구별 사용량 추적 및 Quota 관리
 */

import { useState, useEffect, useCallback, useMemo } from "react";
import { createClient } from "@/shared/lib/supabase/client";
import { useFeatureAccess } from "@/entities/subscription";
import {
  getToolQuota,
  getRemainingQuota,
  isQuotaExceeded,
} from "@/shared/lib/quota/config";
import type { ToolSlug } from "@/shared/types/tool";
import type { Database } from "@/shared/lib/supabase/types";

type UsageRecordInsert =
  Database["public"]["Tables"]["usage_records"]["Insert"];

/**
 * Helper to insert usage records with proper typing
 * Workaround for @supabase/ssr generic type inference issue
 */
async function insertUsageRecord(
  supabase: ReturnType<typeof createClient>,
  record: UsageRecordInsert,
): Promise<{ error: Error | null }> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (supabase as any).from("usage_records").insert(record);
}

interface UsageStats {
  dailyUsage: number;
  monthlyUsage: number;
  dailyLimit: number;
  monthlyLimit: number;
  dailyRemaining: number;
  monthlyRemaining: number;
  isExceeded: boolean;
  canUse: boolean;
}

interface UseQuotaReturn {
  stats: UsageStats | null;
  isLoading: boolean;
  error: Error | null;
  trackUsage: (quantity?: number) => Promise<boolean>;
  refresh: () => Promise<void>;
}

/**
 * 로컬 스토리지 기반 익명 사용자 추적
 */
function getAnonymousUsageKey(toolSlug: string, period: "daily" | "monthly") {
  const date = new Date();
  const dateKey =
    period === "daily"
      ? date.toISOString().split("T")[0]
      : `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
  return `quota:${toolSlug}:${period}:${dateKey}`;
}

function getAnonymousUsage(toolSlug: string): {
  daily: number;
  monthly: number;
} {
  if (typeof window === "undefined") return { daily: 0, monthly: 0 };

  const dailyKey = getAnonymousUsageKey(toolSlug, "daily");
  const monthlyKey = getAnonymousUsageKey(toolSlug, "monthly");

  return {
    daily: parseInt(localStorage.getItem(dailyKey) || "0", 10),
    monthly: parseInt(localStorage.getItem(monthlyKey) || "0", 10),
  };
}

function incrementAnonymousUsage(toolSlug: string, quantity: number): void {
  if (typeof window === "undefined") return;

  const dailyKey = getAnonymousUsageKey(toolSlug, "daily");
  const monthlyKey = getAnonymousUsageKey(toolSlug, "monthly");

  const currentDaily = parseInt(localStorage.getItem(dailyKey) || "0", 10);
  const currentMonthly = parseInt(localStorage.getItem(monthlyKey) || "0", 10);

  localStorage.setItem(dailyKey, String(currentDaily + quantity));
  localStorage.setItem(monthlyKey, String(currentMonthly + quantity));
}

export function useQuota(toolSlug: ToolSlug): UseQuotaReturn {
  const supabase = createClient();
  const { isPro, isLoading: isAuthLoading } = useFeatureAccess();

  const [stats, setStats] = useState<UsageStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const tier = isPro ? "pro" : "free";
  const quota = useMemo(() => getToolQuota(toolSlug, tier), [toolSlug, tier]);

  // 사용자 확인
  useEffect(() => {
    async function checkUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUserId(user?.id || null);
    }
    checkUser();
  }, [supabase.auth]);

  // 사용량 로드
  const loadUsage = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      let dailyUsage = 0;
      let monthlyUsage = 0;

      if (userId) {
        // 로그인 사용자: DB에서 조회
        const today = new Date().toISOString().split("T")[0];
        const monthStart = new Date();
        monthStart.setDate(1);
        monthStart.setHours(0, 0, 0, 0);

        const [dailyResult, monthlyResult] = await Promise.all([
          supabase
            .from("usage_records")
            .select("quantity")
            .eq("user_id", userId)
            .eq("tool_slug", toolSlug)
            .gte("recorded_at", `${today}T00:00:00Z`),
          supabase
            .from("usage_records")
            .select("quantity")
            .eq("user_id", userId)
            .eq("tool_slug", toolSlug)
            .gte("recorded_at", monthStart.toISOString()),
        ]);

        const dailyData = dailyResult.data as { quantity: number }[] | null;
        const monthlyData = monthlyResult.data as { quantity: number }[] | null;

        dailyUsage =
          dailyData?.reduce((sum, r) => sum + (r.quantity || 0), 0) || 0;
        monthlyUsage =
          monthlyData?.reduce((sum, r) => sum + (r.quantity || 0), 0) || 0;
      } else {
        // 비로그인 사용자: 로컬 스토리지
        const localUsage = getAnonymousUsage(toolSlug);
        dailyUsage = localUsage.daily;
        monthlyUsage = localUsage.monthly;
      }

      const dailyRemaining = getRemainingQuota(dailyUsage, quota, "daily");
      const monthlyRemaining = getRemainingQuota(
        monthlyUsage,
        quota,
        "monthly",
      );
      const isExceeded =
        isQuotaExceeded(dailyUsage, quota, "daily") ||
        isQuotaExceeded(monthlyUsage, quota, "monthly");

      setStats({
        dailyUsage,
        monthlyUsage,
        dailyLimit: quota.dailyLimit,
        monthlyLimit: quota.monthlyLimit,
        dailyRemaining,
        monthlyRemaining,
        isExceeded,
        canUse: !isExceeded || isPro,
      });
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to load usage"));
    } finally {
      setIsLoading(false);
    }
  }, [userId, toolSlug, quota, supabase, isPro]);

  // 초기 로드
  useEffect(() => {
    if (!isAuthLoading) {
      loadUsage();
    }
  }, [loadUsage, isAuthLoading]);

  // 사용량 추적
  const trackUsage = useCallback(
    async (quantity: number = 1): Promise<boolean> => {
      const cost = quantity * (quota.operationCost || 1);

      // Pro 사용자는 항상 허용
      if (isPro) {
        // DB에 기록만 하고 제한 없음
        if (userId) {
          await insertUsageRecord(supabase, {
            user_id: userId,
            tool_slug: toolSlug,
            action_type: "use",
            quantity: cost,
          });
        }
        return true;
      }

      // Quota 초과 확인
      if (stats && stats.isExceeded) {
        return false;
      }

      if (userId) {
        // DB에 기록
        const { error: insertError } = await insertUsageRecord(supabase, {
          user_id: userId,
          tool_slug: toolSlug,
          action_type: "use",
          quantity: cost,
        });

        if (insertError) {
          console.error("Failed to track usage:", insertError);
          return false;
        }
      } else {
        // 로컬 스토리지에 기록
        incrementAnonymousUsage(toolSlug, cost);
      }

      // 상태 업데이트
      await loadUsage();
      return true;
    },
    [userId, toolSlug, quota, isPro, stats, supabase, loadUsage],
  );

  return {
    stats,
    isLoading: isLoading || isAuthLoading,
    error,
    trackUsage,
    refresh: loadUsage,
  };
}
