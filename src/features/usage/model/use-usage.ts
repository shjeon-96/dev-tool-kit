"use client";

/**
 * useUsage Hook
 *
 * 사용량 계산 및 집계 로직을 담당하는 커스텀 훅
 * - 일일/월간 사용량 계산
 * - 도구별 사용량 집계
 * - 한도 퍼센트 계산
 */

import { useMemo } from "react";
import { TIER_QUOTAS } from "@/shared/lib/quota/config";
import type { Database } from "@/shared/lib/supabase/types";
import type { TierType } from "@/shared/lib/lemonsqueezy/tiers";

type UserRow = Database["public"]["Tables"]["users"]["Row"];

interface UsageRecord {
  tool_slug: string;
  quantity: number;
  recorded_at: string;
}

interface UsageSummary {
  toolSlug: string;
  totalUsage: number;
  dailyUsage: number;
}

interface UseUsageProps {
  user: UserRow | null;
  usageRecords: UsageRecord[];
}

interface UseUsageReturn {
  // 티어 정보
  tier: TierType;
  quotaLimits: (typeof TIER_QUOTAS)[TierType];

  // 사용량
  dailyUsage: number;
  monthlyUsage: number;

  // 퍼센트
  dailyPercent: number;
  monthlyPercent: number;

  // 상태 플래그
  isNearLimit: boolean;
  isAtLimit: boolean;

  // 도구별 사용량
  topTools: UsageSummary[];
}

export function useUsage({
  user,
  usageRecords,
}: UseUsageProps): UseUsageReturn {
  // 티어 결정
  const dbTier = user?.tier || "free";
  const tier: TierType = dbTier === "enterprise" ? "pro" : (dbTier as TierType);
  const quotaLimits = TIER_QUOTAS[tier];

  // 오늘 날짜와 이번 달 시작
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);

  // 일일 사용량 계산
  const dailyUsage = useMemo(
    () =>
      usageRecords
        .filter((r) => r.recorded_at.startsWith(todayStr))
        .reduce((sum, r) => sum + (r.quantity || 0), 0),
    [usageRecords, todayStr],
  );

  // 월간 사용량 계산
  const monthlyUsage = useMemo(
    () =>
      usageRecords
        .filter((r) => new Date(r.recorded_at) >= monthStart)
        .reduce((sum, r) => sum + (r.quantity || 0), 0),
    [usageRecords, monthStart],
  );

  // 도구별 사용량 집계
  const topTools = useMemo(() => {
    const usageByTool = usageRecords.reduce(
      (acc, r) => {
        const key = r.tool_slug;
        if (!acc[key]) {
          acc[key] = { total: 0, daily: 0 };
        }
        acc[key].total += r.quantity || 0;
        if (r.recorded_at.startsWith(todayStr)) {
          acc[key].daily += r.quantity || 0;
        }
        return acc;
      },
      {} as Record<string, { total: number; daily: number }>,
    );

    return Object.entries(usageByTool)
      .map(([toolSlug, usage]) => ({
        toolSlug,
        totalUsage: usage.total,
        dailyUsage: usage.daily,
      }))
      .sort((a, b) => b.totalUsage - a.totalUsage)
      .slice(0, 10);
  }, [usageRecords, todayStr]);

  // 퍼센트 계산
  const dailyPercent =
    quotaLimits.dailyLimit === Infinity
      ? 0
      : Math.min((dailyUsage / quotaLimits.dailyLimit) * 100, 100);

  const monthlyPercent =
    quotaLimits.monthlyLimit === Infinity
      ? 0
      : Math.min((monthlyUsage / quotaLimits.monthlyLimit) * 100, 100);

  // 상태 플래그
  const isNearLimit = dailyPercent >= 80 || monthlyPercent >= 80;
  const isAtLimit = dailyPercent >= 100 || monthlyPercent >= 100;

  return {
    tier,
    quotaLimits,
    dailyUsage,
    monthlyUsage,
    dailyPercent,
    monthlyPercent,
    isNearLimit,
    isAtLimit,
    topTools,
  };
}

/**
 * 도구 slug를 표시용 이름으로 변환
 */
export function formatToolName(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
