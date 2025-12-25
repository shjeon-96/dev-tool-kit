"use client";

import { useAdSense } from "@/shared/lib/hooks/use-ad-sense";
import { useFeatureAccess } from "@/entities/subscription";

interface AdUnitProps {
  slot: string;
  format?: "auto" | "horizontal" | "vertical" | "rectangle";
  responsive?: boolean;
  className?: string;
}

// Fixed height placeholders to prevent CLS
const FORMAT_HEIGHTS = {
  auto: 250,
  horizontal: 90,
  vertical: 600,
  rectangle: 250,
} as const;

// 개발 환경에서는 광고 비활성화
const isDev = process.env.NODE_ENV === "development";

export function AdUnit({
  slot,
  format = "auto",
  responsive = true,
  className = "",
}: AdUnitProps) {
  const { adRef, isLoading, isIsolated } = useAdSense();
  const { canRemoveAds, isLoading: isLoadingSubscription } = useFeatureAccess();

  // 개발 환경에서는 광고 숨김
  if (isDev) {
    return null;
  }

  // Don't render ads on WASM isolated pages
  if (isIsolated) {
    return null;
  }

  // Pro users don't see ads (wait for subscription check to complete)
  if (!isLoadingSubscription && canRemoveAds) {
    return null;
  }

  const minHeight = FORMAT_HEIGHTS[format];

  return (
    <div
      ref={adRef}
      className={`ad-container relative ${className}`}
      style={{ minHeight }}
    >
      {/* Skeleton placeholder to prevent CLS */}
      {isLoading && (
        <div
          className="absolute inset-0 bg-muted/30 rounded-lg flex items-center justify-center border border-dashed border-muted-foreground/20"
          style={{ minHeight }}
        >
          <div className="text-center text-muted-foreground/50 text-xs">
            <div className="animate-pulse">
              <div className="w-16 h-2 bg-muted-foreground/20 rounded mx-auto mb-2" />
              <div className="w-12 h-2 bg-muted-foreground/20 rounded mx-auto" />
            </div>
          </div>
        </div>
      )}
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-4981986991458105"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </div>
  );
}
