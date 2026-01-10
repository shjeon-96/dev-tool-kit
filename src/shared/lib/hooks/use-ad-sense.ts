"use client";

import { useEffect, useRef, useState } from "react";

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
 * Handles loading states and ad initialization
 */
export function useAdSense(options: UseAdSenseOptions = {}): UseAdSenseReturn {
  const { loadingDelay = 1500 } = options;

  const adRef = useRef<HTMLDivElement>(null);
  const isAdLoaded = useRef(false);
  const [isLoading, setIsLoading] = useState(true);

  // No isolated pages in blog-only mode
  const isIsolated = false;

  useEffect(() => {
    if (isAdLoaded.current) return;

    let timeoutId: NodeJS.Timeout;

    try {
      if (typeof window !== "undefined" && adRef.current) {
        // Check if ad is already present
        const existingAd = adRef.current.querySelector(".adsbygoogle");
        if (existingAd && existingAd.getAttribute("data-adsbygoogle-status")) {
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
  }, [loadingDelay]);

  return { adRef, isLoading, isIsolated };
}
