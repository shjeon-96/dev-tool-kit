/**
 * Subscription Entity Types
 *
 * 구독 관련 타입 정의
 */

import type { Database } from "@/shared/lib/supabase/types";

// 기본 구독 타입
export type Subscription = Database["public"]["Tables"]["subscriptions"]["Row"];
export type SubscriptionInsert =
  Database["public"]["Tables"]["subscriptions"]["Insert"];
export type SubscriptionUpdate =
  Database["public"]["Tables"]["subscriptions"]["Update"];

// 구독 상태
export type SubscriptionStatus = NonNullable<Subscription["status"]>;

// 구독 제공자
export type SubscriptionProvider = Subscription["provider"];

// 티어 타입
export type TierType = "free" | "pro";

// 구독 정보 (UI 표시용)
export interface SubscriptionInfo {
  // 기본 정보
  id: string | null;
  userId: string;
  status: SubscriptionStatus | "none";
  tier: TierType;

  // 결제 정보
  provider: SubscriptionProvider | null;
  externalSubscriptionId: string | null;
  externalCustomerId: string | null;
  planId: string | null;

  // 기간 정보
  currentPeriodStart: Date | null;
  currentPeriodEnd: Date | null;
  cancelAtPeriodEnd: boolean;

  // 편의 속성
  isActive: boolean;
  isPro: boolean;
  isCanceled: boolean;
  daysUntilExpiry: number | null;
}

// 구독 액션
export interface SubscriptionActions {
  // 구독 관리
  subscribe: (variantId: string) => Promise<void>;
  cancel: () => Promise<void>;
  resume: () => Promise<void>;
  changePlan: (newVariantId: string) => Promise<void>;

  // 상태 새로고침
  refresh: () => Promise<void>;
}

// useSubscription 훅 반환 타입
export interface UseSubscriptionReturn {
  subscription: SubscriptionInfo | null;
  isLoading: boolean;
  error: Error | null;
  actions: SubscriptionActions;
}

// 구독 이벤트 (웹훅)
export interface SubscriptionEvent {
  type:
    | "subscription_created"
    | "subscription_updated"
    | "subscription_cancelled"
    | "subscription_expired"
    | "subscription_paused"
    | "subscription_resumed"
    | "subscription_payment_success"
    | "subscription_payment_failed"
    | "subscription_payment_recovered";
  subscriptionId: string;
  userId: string;
  timestamp: Date;
  data: Record<string, unknown>;
}
