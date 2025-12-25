"use client";

import { useState, useEffect, useSyncExternalStore } from "react";

const STORAGE_KEY = "adblock-notice-dismissed";
const DISMISS_DURATION_DAYS = 7;

// Cached dismissed state for useSyncExternalStore
let cachedIsDismissed: boolean | null = null;
let cachedDismissedAt: string | null = null;

function getIsDismissed(): boolean {
  if (typeof window === "undefined") return true;

  const dismissedAt = localStorage.getItem(STORAGE_KEY);

  // Return cached value if storage hasn't changed
  if (dismissedAt === cachedDismissedAt && cachedIsDismissed !== null) {
    return cachedIsDismissed;
  }

  cachedDismissedAt = dismissedAt;

  if (!dismissedAt) {
    cachedIsDismissed = false;
    return false;
  }

  const dismissedDate = new Date(dismissedAt);
  const now = new Date();
  const daysSinceDismissed =
    (now.getTime() - dismissedDate.getTime()) / (1000 * 60 * 60 * 24);

  cachedIsDismissed = daysSinceDismissed < DISMISS_DURATION_DAYS;
  return cachedIsDismissed;
}

function subscribe(callback: () => void) {
  const handleStorageChange = () => {
    // Invalidate cache
    cachedIsDismissed = null;
    cachedDismissedAt = null;
    callback();
  };
  window.addEventListener("storage", handleStorageChange);
  return () => window.removeEventListener("storage", handleStorageChange);
}

// Stable server snapshot function
function getServerSnapshot(): boolean {
  return true; // Assume dismissed on server to prevent flash
}

export function useAdBlockDetection() {
  const [isAdBlockDetected, setIsAdBlockDetected] = useState(false);

  // Use useSyncExternalStore for SSR-safe localStorage access
  const isDismissed = useSyncExternalStore(
    subscribe,
    getIsDismissed,
    getServerSnapshot,
  );

  const [localDismissed, setLocalDismissed] = useState(false);

  useEffect(() => {
    // Skip detection if already dismissed
    if (isDismissed || localDismissed) return;

    // Detect ad blocker by checking if an ad element is blocked
    const detectAdBlock = async () => {
      try {
        const testAd = document.createElement("div");
        testAd.innerHTML = "&nbsp;";
        testAd.className =
          "adsbox ads ad-slot ad-banner textads banner-ads ad-placeholder";
        testAd.style.cssText =
          "position: absolute; left: -9999px; top: -9999px; width: 1px; height: 1px;";
        document.body.appendChild(testAd);

        // Wait for ad blockers to potentially hide the element
        await new Promise((resolve) => setTimeout(resolve, 100));

        const isBlocked =
          testAd.offsetHeight === 0 ||
          testAd.clientHeight === 0 ||
          getComputedStyle(testAd).display === "none" ||
          getComputedStyle(testAd).visibility === "hidden";

        document.body.removeChild(testAd);

        if (isBlocked) {
          setIsAdBlockDetected(true);
        }
      } catch {
        // Detection failed, assume no ad blocker
        setIsAdBlockDetected(false);
      }
    };

    detectAdBlock();
  }, [isDismissed, localDismissed]);

  const dismissNotice = () => {
    localStorage.setItem(STORAGE_KEY, new Date().toISOString());
    setLocalDismissed(true);
  };

  return {
    isAdBlockDetected,
    showNotice: isAdBlockDetected && !isDismissed && !localDismissed,
    dismissNotice,
  };
}
