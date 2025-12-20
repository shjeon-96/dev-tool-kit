"use client";

import { useEffect, useRef } from "react";
import { useFeatureAccess } from "@/entities/subscription";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

interface ToolResultAdProps {
  slot: string;
  position?: "top" | "bottom";
  className?: string;
}

/**
 * 도구 결과창 주변에 배치하는 광고 컴포넌트
 * 골든 존 - 결과창 상단/하단에 배치하여 높은 노출률 확보
 */
export function ToolResultAd({
  slot,
  position = "bottom",
  className = "",
}: ToolResultAdProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const isAdLoaded = useRef(false);
  const { canRemoveAds, isLoading: isLoadingSubscription } = useFeatureAccess();

  useEffect(() => {
    // Don't load ads for Pro users
    if (!isLoadingSubscription && canRemoveAds) return;
    if (isAdLoaded.current) return;

    try {
      if (typeof window !== "undefined" && adRef.current) {
        const existingAd = adRef.current.querySelector(".adsbygoogle");
        if (existingAd && existingAd.getAttribute("data-adsbygoogle-status")) {
          return;
        }

        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isAdLoaded.current = true;
      }
    } catch (error) {
      console.error("AdSense error:", error);
    }
  }, [isLoadingSubscription, canRemoveAds]);

  // Pro users don't see ads
  if (!isLoadingSubscription && canRemoveAds) {
    return null;
  }

  return (
    <div
      ref={adRef}
      className={`ad-tool-result ${position === "top" ? "mb-4" : "mt-4"} ${className}`}
    >
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-4981986991458105"
        data-ad-slot={slot}
        data-ad-format="horizontal"
        data-full-width-responsive="true"
      />
    </div>
  );
}
