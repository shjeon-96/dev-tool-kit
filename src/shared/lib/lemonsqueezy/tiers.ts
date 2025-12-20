/**
 * 구독 티어 정의
 * Lemon Squeezy 제품 및 Variant와 매핑
 */

export type TierType = "free" | "pro";

export interface TierFeature {
  key: string;
  free: boolean | string | number;
  pro: boolean | string | number;
}

export interface TierConfig {
  id: TierType;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  yearlyDiscount: number; // 연간 결제 할인율 (%)
  variantIdMonthly: string | null;
  variantIdYearly: string | null;
  popular?: boolean;
  features: string[];
  limits: {
    dailyApiCalls: number;
    bulkActionsPerRequest: number;
    historyRetentionDays: number;
  };
}

// 통화 설정
export const CURRENCY = {
  code: "USD",
  symbol: "$",
  locale: "en-US",
};

// 가격 포맷 헬퍼
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat(CURRENCY.locale, {
    style: "currency",
    currency: CURRENCY.code,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

// 환경 변수에서 Variant ID 가져오기
export const VARIANT_IDS = {
  PRO_MONTHLY: process.env.NEXT_PUBLIC_LEMONSQUEEZY_VARIANT_PRO_MONTHLY || "",
  PRO_YEARLY: process.env.NEXT_PUBLIC_LEMONSQUEEZY_VARIANT_PRO_YEARLY || "",
};

// 구독 티어 설정
export const TIERS: Record<TierType, TierConfig> = {
  free: {
    id: "free",
    name: "Free",
    description: "Essential tools for individual developers",
    monthlyPrice: 0,
    yearlyPrice: 0,
    yearlyDiscount: 0,
    variantIdMonthly: null,
    variantIdYearly: null,
    features: [
      "29 developer tools",
      "100 API calls/day",
      "Basic export (single file)",
      "7-day history",
      "Community support",
    ],
    limits: {
      dailyApiCalls: 100,
      bulkActionsPerRequest: 1,
      historyRetentionDays: 7,
    },
  },
  pro: {
    id: "pro",
    name: "Pro",
    description: "Unlimited access for power users",
    monthlyPrice: 1,
    yearlyPrice: 10,
    yearlyDiscount: 17,
    variantIdMonthly: VARIANT_IDS.PRO_MONTHLY,
    variantIdYearly: VARIANT_IDS.PRO_YEARLY,
    popular: true,
    features: [
      "All 29+ developer tools",
      "10,000 API calls/month",
      "Bulk actions (100 items)",
      "Unlimited history",
      "Priority support",
      "No ads",
      "API access",
    ],
    limits: {
      dailyApiCalls: -1, // 무제한 (월간 제한)
      bulkActionsPerRequest: 100,
      historyRetentionDays: -1, // 무제한
    },
  },
};

// 기능 비교 매트릭스
export const FEATURE_COMPARISON: TierFeature[] = [
  { key: "tools", free: "29 tools", pro: "29+ tools" },
  { key: "apiCalls", free: "100/day", pro: "10,000/month" },
  { key: "bulkActions", free: 1, pro: 100 },
  { key: "history", free: "7 days", pro: "Unlimited" },
  { key: "ads", free: true, pro: false },
  { key: "apiAccess", free: false, pro: true },
  { key: "prioritySupport", free: false, pro: true },
];

// 헬퍼 함수들
export function getTier(tierId: TierType): TierConfig {
  return TIERS[tierId];
}

export function getTierByVariantId(variantId: string): TierConfig | null {
  for (const tier of Object.values(TIERS)) {
    if (
      tier.variantIdMonthly === variantId ||
      tier.variantIdYearly === variantId
    ) {
      return tier;
    }
  }
  return null;
}

export function isYearlyVariant(variantId: string): boolean {
  return variantId === VARIANT_IDS.PRO_YEARLY;
}

export function getFormattedPrice(
  tier: TierConfig,
  yearly: boolean,
): { amount: number; period: string; savings?: number } {
  if (yearly) {
    const monthlyEquivalent = tier.yearlyPrice / 12;
    const savings = tier.monthlyPrice * 12 - tier.yearlyPrice;
    return {
      amount: monthlyEquivalent,
      period: "month",
      savings: savings > 0 ? savings : undefined,
    };
  }
  return {
    amount: tier.monthlyPrice,
    period: "month",
  };
}

// 사용량 제한 체크
export function checkUsageLimit(
  tier: TierType,
  limitType: keyof TierConfig["limits"],
  currentUsage: number,
): { allowed: boolean; limit: number; remaining: number } {
  const tierConfig = TIERS[tier];
  const limit = tierConfig.limits[limitType];

  // -1은 무제한
  if (limit === -1) {
    return { allowed: true, limit: -1, remaining: -1 };
  }

  const remaining = limit - currentUsage;
  return {
    allowed: remaining > 0,
    limit,
    remaining: Math.max(0, remaining),
  };
}
