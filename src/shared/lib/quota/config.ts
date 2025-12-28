/**
 * Quota Configuration
 *
 * 사용량 제한 설정
 * - Pro 도구는 toolInfo.freeLimit 사용
 * - 일반 도구는 TIER_QUOTAS 또는 TOOL_QUOTAS 사용
 */

import type { ToolSlug } from "@/shared/types/tool";

/**
 * Tool 정보 (FSD 경계 준수를 위해 외부에서 전달)
 */
export interface ToolInfo {
  isPremium?: boolean;
  freeLimit?: number;
}

export interface QuotaConfig {
  /** 일일 사용 제한 (operations) */
  dailyLimit: number;
  /** 월간 사용 제한 (operations) */
  monthlyLimit: number;
  /** 작업당 카운트 (기본: 1) */
  operationCost?: number;
  /** Pro 전용 도구 여부 */
  isPremium?: boolean;
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
 * Note: isPremium 도구는 registry.freeLimit를 우선 사용
 */
export const TOOL_QUOTAS: Partial<Record<ToolSlug, Partial<QuotaConfig>>> = {
  // 무거운 작업은 제한 낮춤
  "video-compressor": {
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
 * - Pro 사용자: 무제한
 * - Free 사용자 + Premium 도구: toolInfo.freeLimit 적용
 * - Free 사용자 + 일반 도구: TOOL_QUOTAS 또는 TIER_QUOTAS 적용
 *
 * @param toolSlug - 도구 식별자
 * @param tier - 사용자 티어 (free/pro)
 * @param toolInfo - 도구 정보 (entities 레이어에서 전달)
 */
export function getToolQuota(
  toolSlug: ToolSlug,
  tier: "free" | "pro",
  toolInfo?: ToolInfo,
): QuotaConfig {
  const tierQuota = TIER_QUOTAS[tier];
  const toolOverride = TOOL_QUOTAS[toolSlug];

  // Pro 사용자는 무제한
  if (tier === "pro") {
    return {
      dailyLimit: Infinity,
      monthlyLimit: Infinity,
      operationCost: toolOverride?.operationCost ?? 1,
      isPremium: toolInfo?.isPremium,
    };
  }

  // Premium 도구는 toolInfo.freeLimit 사용 (없으면 기본값 3)
  if (toolInfo?.isPremium) {
    const freeLimit = toolInfo.freeLimit ?? 3;
    return {
      dailyLimit: freeLimit,
      monthlyLimit: freeLimit * 30, // 월간은 일간의 30배
      operationCost: toolOverride?.operationCost ?? 1,
      isPremium: true,
    };
  }

  // 일반 도구
  return {
    dailyLimit: toolOverride?.dailyLimit ?? tierQuota.dailyLimit,
    monthlyLimit: toolOverride?.monthlyLimit ?? tierQuota.monthlyLimit,
    operationCost: toolOverride?.operationCost ?? 1,
    isPremium: false,
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
