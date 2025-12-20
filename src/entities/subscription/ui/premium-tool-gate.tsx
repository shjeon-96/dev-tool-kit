"use client";

/**
 * PremiumToolGate Component
 *
 * 프리미엄 도구 접근 게이팅 래퍼
 * - Pro 사용자: 도구 정상 표시
 * - Free 사용자: 잠금 오버레이 + 업그레이드 모달
 */

import { useState } from "react";
import { useFeatureAccess } from "../model/use-subscription";
import { FeatureLockOverlay } from "./upgrade-modal";
import { UpgradeModal } from "./upgrade-modal";

interface PremiumToolGateProps {
  /** 도구 이름 (잠금 메시지에 표시) */
  toolName: string;
  /** 도구 설명 (모달에 표시) */
  toolDescription?: string;
  /** 도구 컴포넌트 */
  children: React.ReactNode;
  /** 프리미엄 여부 (false면 게이팅 없이 바로 렌더링) */
  isPremium?: boolean;
}

export function PremiumToolGate({
  toolName,
  toolDescription,
  children,
  isPremium = false,
}: PremiumToolGateProps) {
  const { isPro, isLoading } = useFeatureAccess();
  const [showModal, setShowModal] = useState(false);

  // 프리미엄 도구가 아니면 바로 렌더링
  if (!isPremium) {
    return <>{children}</>;
  }

  // 로딩 중에는 잠금 상태로 표시
  if (isLoading) {
    return (
      <div className="relative">
        <div className="pointer-events-none opacity-50">{children}</div>
        <div className="absolute inset-0 flex items-center justify-center bg-background/80">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      </div>
    );
  }

  // Pro 사용자는 바로 접근
  if (isPro) {
    return <>{children}</>;
  }

  // Free 사용자는 잠금 표시
  return (
    <>
      <FeatureLockOverlay
        feature={`${toolName} - Pro 전용 기능`}
        isLocked={true}
        onUpgradeClick={() => setShowModal(true)}
      >
        {children}
      </FeatureLockOverlay>

      <UpgradeModal
        open={showModal}
        onOpenChange={setShowModal}
        feature={toolName}
        featureDescription={toolDescription}
      />
    </>
  );
}

/**
 * 프리미엄 도구 배지
 */
export function PremiumBadge({ className }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-2 py-0.5 text-xs font-medium text-white ${className}`}
    >
      Pro
    </span>
  );
}
