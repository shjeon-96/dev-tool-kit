"use client";

import { useAdSense } from "@/shared/lib/hooks/use-ad-sense";

interface AdSidebarProps {
  slot: string;
  className?: string;
}

// Fixed height for sidebar ads to prevent CLS
const SIDEBAR_MIN_HEIGHT = 600;

export function AdSidebar({ slot, className = "" }: AdSidebarProps) {
  const { adRef, isLoading, isIsolated } = useAdSense();

  // Don't render ads on WASM isolated pages
  if (isIsolated) {
    return null;
  }

  return (
    <div
      ref={adRef}
      className={`sticky top-4 relative ${className}`}
      style={{ minHeight: SIDEBAR_MIN_HEIGHT }}
    >
      {/* Skeleton placeholder to prevent CLS */}
      {isLoading && (
        <div
          className="absolute inset-0 bg-muted/30 rounded-lg flex items-center justify-center border border-dashed border-muted-foreground/20"
          style={{ minHeight: SIDEBAR_MIN_HEIGHT }}
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
        data-ad-format="vertical"
        data-full-width-responsive="false"
      />
    </div>
  );
}
