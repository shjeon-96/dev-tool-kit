"use client";

import { useOfflineUpgradePrompt } from "@/shared/lib";
import { OfflineUpgradeModal } from "./offline-upgrade-modal";

interface OfflineUpgradePromptProps {
  promptThreshold?: number;
  cooldownMs?: number;
}

/**
 * 오프라인 전환 감지 후 업그레이드 모달을 표시하는 컴포넌트
 * 앱 레이아웃에서 사용
 */
export function OfflineUpgradePrompt({
  promptThreshold = 2,
  cooldownMs,
}: OfflineUpgradePromptProps) {
  const { shouldShowPrompt, dismissPrompt, acceptUpgrade } =
    useOfflineUpgradePrompt({
      promptThreshold,
      cooldownMs,
    });

  return (
    <OfflineUpgradeModal
      isOpen={shouldShowPrompt}
      onDismiss={dismissPrompt}
      onUpgrade={acceptUpgrade}
    />
  );
}
