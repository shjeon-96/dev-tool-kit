"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { isWasmIsolatedPage } from "@/shared/lib/wasm";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

interface AdUnitProps {
  slot: string;
  format?: "auto" | "horizontal" | "vertical" | "rectangle";
  responsive?: boolean;
  className?: string;
}

export function AdUnit({
  slot,
  format = "auto",
  responsive = true,
  className = "",
}: AdUnitProps) {
  const pathname = usePathname();
  const adRef = useRef<HTMLDivElement>(null);
  const isAdLoaded = useRef(false);

  // Wasm 격리 페이지에서는 광고 렌더링 안 함 (COOP/COEP 헤더로 인해 외부 스크립트 차단됨)
  const isIsolated = pathname ? isWasmIsolatedPage(pathname) : false;

  useEffect(() => {
    // 격리된 페이지에서는 광고 로드 시도하지 않음
    if (isIsolated || isAdLoaded.current) return;

    try {
      if (typeof window !== "undefined" && adRef.current) {
        // Check if ad is already present
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
  }, [isIsolated]);

  // Wasm 격리 페이지에서는 광고 UI도 렌더링하지 않음
  if (isIsolated) {
    return null;
  }

  return (
    <div ref={adRef} className={`ad-container ${className}`}>
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
