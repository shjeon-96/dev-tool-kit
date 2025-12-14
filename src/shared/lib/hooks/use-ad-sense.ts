"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { isWasmIsolatedPage } from "@/shared/lib/wasm";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

interface UseAdSenseOptions {
  /** Ad loading delay in ms (default: 1500) */
  loadingDelay?: number;
}

interface UseAdSenseReturn {
  adRef: React.RefObject<HTMLDivElement | null>;
  isLoading: boolean;
  isIsolated: boolean;
}

/**
 * Custom hook for managing AdSense ad loading state
 * Handles WASM isolated pages, loading states, and ad initialization
 */
export function useAdSense(options: UseAdSenseOptions = {}): UseAdSenseReturn {
  const { loadingDelay = 1500 } = options;

  const pathname = usePathname();
  const adRef = useRef<HTMLDivElement>(null);
  const isAdLoaded = useRef(false);
  const [isLoading, setIsLoading] = useState(true);

  // WASM isolated pages don't render ads (COOP/COEP headers block external scripts)
  const isIsolated = pathname ? isWasmIsolatedPage(pathname) : false;

  useEffect(() => {
    // Don't attempt to load ads on isolated pages
    if (isIsolated || isAdLoaded.current) return;

    let timeoutId: NodeJS.Timeout;

    try {
      if (typeof window !== "undefined" && adRef.current) {
        // Check if ad is already present
        const existingAd = adRef.current.querySelector(".adsbygoogle");
        if (existingAd && existingAd.getAttribute("data-adsbygoogle-status")) {
          // Use timeout to avoid synchronous setState in effect
          timeoutId = setTimeout(() => setIsLoading(false), 0);
          return;
        }

        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isAdLoaded.current = true;

        // Hide skeleton after a delay (ad might take time to load)
        timeoutId = setTimeout(() => setIsLoading(false), loadingDelay);
      }
    } catch (error) {
      console.error("AdSense error:", error);
      timeoutId = setTimeout(() => setIsLoading(false), 0);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isIsolated, loadingDelay]);

  return { adRef, isLoading, isIsolated };
}
