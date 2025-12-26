"use client";

/**
 * usePricing Hook
 *
 * 요금제 페이지 로직을 담당하는 커스텀 훅
 * - 결제 주기 토글 (월간/연간)
 * - 체크아웃 프로세스 처리
 */

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { TIERS, type TierType } from "@/shared/lib/lemonsqueezy";
import { useAuth } from "@/features/auth";

interface UsePricingReturn {
  // 상태
  isYearly: boolean;
  setIsYearly: (value: boolean) => void;
  tiers: (typeof TIERS)[keyof typeof TIERS][];

  // 가격 계산
  getPrice: (tier: TierType) => number;

  // 액션
  handleSubscribe: (tierId: TierType) => Promise<void>;
}

export function usePricing(): UsePricingReturn {
  const router = useRouter();
  const { session } = useAuth();
  const [isYearly, setIsYearly] = useState(false);

  const tiers = Object.values(TIERS);

  // 가격 계산 (연간 선택시 월 환산 가격)
  const getPrice = useCallback(
    (tierId: TierType) => {
      const tier = TIERS[tierId];
      return isYearly ? tier.yearlyPrice / 12 : tier.monthlyPrice;
    },
    [isYearly],
  );

  // 구독 처리
  const handleSubscribe = useCallback(
    async (tierId: TierType) => {
      if (tierId === "free") {
        // 무료 플랜은 회원가입으로 이동
        router.push("/auth/signup");
        return;
      }

      if (!session) {
        // 로그인하지 않은 경우 로그인 페이지로
        router.push("/auth/signin?redirect=/pricing");
        return;
      }

      // 체크아웃 API 호출
      const tier = TIERS[tierId];
      const variantId = isYearly ? tier.variantIdYearly : tier.variantIdMonthly;

      if (!variantId) {
        console.error("Variant ID not configured");
        return;
      }

      try {
        const response = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ variantId }),
        });

        const data = await response.json();

        if (data.checkoutUrl) {
          // 외부 Lemon Squeezy checkout URL로 리다이렉트
          globalThis.location.assign(data.checkoutUrl);
        }
      } catch (error) {
        console.error("Checkout error:", error);
      }
    },
    [router, session, isYearly],
  );

  return {
    isYearly,
    setIsYearly,
    tiers,
    getPrice,
    handleSubscribe,
  };
}
