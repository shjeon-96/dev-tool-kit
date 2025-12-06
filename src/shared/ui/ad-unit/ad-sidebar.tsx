"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

interface AdSidebarProps {
  slot: string;
  className?: string;
}

export function AdSidebar({ slot, className = "" }: AdSidebarProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const isAdLoaded = useRef(false);

  useEffect(() => {
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
  }, []);

  return (
    <div ref={adRef} className={`sticky top-4 ${className}`}>
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
