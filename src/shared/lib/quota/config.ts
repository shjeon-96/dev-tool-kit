/**
 * Quota Configuration
 *
 * 사용량 제한 설정
 */

import type { ToolSlug } from "@/entities/tool";

export interface QuotaConfig {
  /** 일일 사용 제한 (operations) */
  dailyLimit: number;
  /** 월간 사용 제한 (operations) */
  monthlyLimit: number;
  /** 작업당 카운트 (기본: 1) */
  operationCost?: number;
}

/**
 * 티어별 기본 Quota 설정
 */
export const TIER_QUOTAS = {
  free: {
    dailyLimit: 50,
    monthlyLimit: 500,
  },
  pro: {
    dailyLimit: Infinity,
    monthlyLimit: Infinity,
  },
} as const;

/**
 * 도구별 커스텀 Quota (기본 설정 오버라이드)
 */
export const TOOL_QUOTAS: Partial<Record<ToolSlug, Partial<QuotaConfig>>> = {
  // 무거운 작업은 제한 낮춤
  "video-compressor": {
    dailyLimit: 5,
    operationCost: 5,
  },
  "image-resizer": {
    dailyLimit: 30,
    operationCost: 2,
  },
  // API 호출이 필요한 도구
  "prettier-playground": {
    dailyLimit: 100,
  },
};

/**
 * 도구별 Quota 설정 가져오기
 */
export function getToolQuota(
  toolSlug: ToolSlug,
  tier: "free" | "pro",
): QuotaConfig {
  const tierQuota = TIER_QUOTAS[tier];
  const toolOverride = TOOL_QUOTAS[toolSlug];

  return {
    dailyLimit: toolOverride?.dailyLimit ?? tierQuota.dailyLimit,
    monthlyLimit: toolOverride?.monthlyLimit ?? tierQuota.monthlyLimit,
    operationCost: toolOverride?.operationCost ?? 1,
  };
}

/**
 * Quota 제한 여부 확인
 */
export function isQuotaExceeded(
  currentUsage: number,
  quota: QuotaConfig,
  period: "daily" | "monthly",
): boolean {
  const limit = period === "daily" ? quota.dailyLimit : quota.monthlyLimit;
  return currentUsage >= limit;
}

/**
 * 남은 Quota 계산
 */
export function getRemainingQuota(
  currentUsage: number,
  quota: QuotaConfig,
  period: "daily" | "monthly",
): number {
  const limit = period === "daily" ? quota.dailyLimit : quota.monthlyLimit;
  if (limit === Infinity) return Infinity;
  return Math.max(0, limit - currentUsage);
}
