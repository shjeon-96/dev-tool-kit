/**
 * Feature Gate System
 *
 * Pro/Free 사용자에 따른 기능 접근 제어
 */

import type { TierType } from "../model/types";

/**
 * 기능 정의
 */
export type FeatureId =
  | "bulk_actions"
  | "api_access"
  | "advanced_export"
  | "ad_free"
  | "unlimited_history"
  | "priority_support"
  | "offline_sync"
  | "custom_branding";

/**
 * 기능 설정
 */
export interface FeatureConfig {
  id: FeatureId;
  name: string;
  description: string;
  requiredTier: TierType;
  freeLimit?: number; // Free 티어의 제한 (예: 일일 사용 횟수)
  proLimit?: number; // Pro 티어의 제한
}

/**
 * 기능 목록
 */
export const FEATURES: Record<FeatureId, FeatureConfig> = {
  bulk_actions: {
    id: "bulk_actions",
    name: "Bulk Actions",
    description: "Process multiple files at once",
    requiredTier: "pro",
    freeLimit: 1,
    proLimit: 100,
  },
  api_access: {
    id: "api_access",
    name: "API Access",
    description: "Access tools via REST API",
    requiredTier: "pro",
  },
  advanced_export: {
    id: "advanced_export",
    name: "Advanced Export",
    description: "Export in multiple formats",
    requiredTier: "pro",
  },
  ad_free: {
    id: "ad_free",
    name: "Ad-Free Experience",
    description: "Browse without advertisements",
    requiredTier: "pro",
  },
  unlimited_history: {
    id: "unlimited_history",
    name: "Unlimited History",
    description: "Keep unlimited work history",
    requiredTier: "pro",
    freeLimit: 7, // 7일
    proLimit: -1, // 무제한
  },
  priority_support: {
    id: "priority_support",
    name: "Priority Support",
    description: "Get faster customer support",
    requiredTier: "pro",
  },
  offline_sync: {
    id: "offline_sync",
    name: "Offline Sync",
    description: "Sync work across devices when offline",
    requiredTier: "pro",
  },
  custom_branding: {
    id: "custom_branding",
    name: "Custom Branding",
    description: "Remove Web Toolkit branding",
    requiredTier: "pro",
  },
};

/**
 * 기능 접근 확인
 */
export function canAccessFeature(
  featureId: FeatureId,
  userTier: TierType,
): boolean {
  const feature = FEATURES[featureId];
  if (!feature) return false;

  const tierHierarchy: Record<TierType, number> = {
    free: 0,
    pro: 1,
  };

  const requiredLevel = tierHierarchy[feature.requiredTier];
  const userLevel = tierHierarchy[userTier];

  return userLevel >= requiredLevel;
}

/**
 * 기능 제한 가져오기
 */
export function getFeatureLimit(
  featureId: FeatureId,
  userTier: TierType,
): number | null {
  const feature = FEATURES[featureId];
  if (!feature) return null;

  if (userTier === "pro") {
    return feature.proLimit ?? -1;
  }

  return feature.freeLimit ?? 0;
}

/**
 * 업그레이드가 필요한 기능 목록
 */
export function getLockedFeatures(userTier: TierType): FeatureConfig[] {
  return Object.values(FEATURES).filter(
    (feature) => !canAccessFeature(feature.id, userTier),
  );
}

/**
 * 사용 가능한 기능 목록
 */
export function getAvailableFeatures(userTier: TierType): FeatureConfig[] {
  return Object.values(FEATURES).filter((feature) =>
    canAccessFeature(feature.id, userTier),
  );
}

/**
 * Pro 전용 기능 목록
 */
export function getProFeatures(): FeatureConfig[] {
  return Object.values(FEATURES).filter(
    (feature) => feature.requiredTier === "pro",
  );
}

/**
 * 도구별 프리미엄 상태
 */
export interface PremiumToolConfig {
  slug: string;
  isPremium: boolean;
  premiumFeatures?: FeatureId[];
  freeUsageLimit?: number;
}

/**
 * 프리미엄 도구 목록
 * 현재는 Bulk Actions 도구들만 프리미엄
 */
export const PREMIUM_TOOLS: PremiumToolConfig[] = [
  {
    slug: "json-bulk",
    isPremium: true,
    premiumFeatures: ["bulk_actions"],
    freeUsageLimit: 3,
  },
  {
    slug: "hash-bulk",
    isPremium: true,
    premiumFeatures: ["bulk_actions"],
    freeUsageLimit: 3,
  },
  {
    slug: "qr-bulk",
    isPremium: true,
    premiumFeatures: ["bulk_actions"],
    freeUsageLimit: 3,
  },
];

/**
 * 도구가 프리미엄인지 확인
 */
export function isToolPremium(slug: string): boolean {
  return PREMIUM_TOOLS.some((tool) => tool.slug === slug && tool.isPremium);
}

/**
 * 도구의 무료 사용 제한 가져오기
 */
export function getToolFreeLimit(slug: string): number | null {
  const tool = PREMIUM_TOOLS.find((t) => t.slug === slug);
  return tool?.freeUsageLimit ?? null;
}
