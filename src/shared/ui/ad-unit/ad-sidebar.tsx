"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { isWasmIsolatedPage } from "@/shared/lib/wasm";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

interface AdSidebarProps {
  slot: string;
  className?: string;
}

// Fixed height for sidebar ads to prevent CLS
const SIDEBAR_MIN_HEIGHT = 600;

export function AdSidebar({ slot, className = "" }: AdSidebarProps) {
  const pathname = usePathname();
  const adRef = useRef<HTMLDivElement>(null);
  const isAdLoaded = useRef(false);
  const [isLoading, setIsLoading] = useState(true);

  // Wasm 격리 페이지에서는 광고 렌더링 안 함
  const isIsolated = pathname ? isWasmIsolatedPage(pathname) : false;

  useEffect(() => {
    if (isIsolated || isAdLoaded.current) return;

    let timeoutId: NodeJS.Timeout;

    try {
      if (typeof window !== "undefined" && adRef.current) {
        const existingAd = adRef.current.querySelector(".adsbygoogle");
        if (existingAd && existingAd.getAttribute("data-adsbygoogle-status")) {
          // Use timeout to avoid synchronous setState in effect
          timeoutId = setTimeout(() => setIsLoading(false), 0);
          return;
        }

        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isAdLoaded.current = true;

        // Hide skeleton after a delay
        timeoutId = setTimeout(() => setIsLoading(false), 1500);
      }
    } catch (error) {
      console.error("AdSense error:", error);
      timeoutId = setTimeout(() => setIsLoading(false), 0);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isIsolated]);

  // Wasm 격리 페이지에서는 광고 UI도 렌더링하지 않음
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
