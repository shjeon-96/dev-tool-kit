"use client";

import { useCallback, useEffect, useMemo, useSyncExternalStore } from "react";
import {
  getVariantAssignment,
  trackImpression,
  trackConversion,
  trackClick,
} from "./ab-testing";
import type { ABTestVariant } from "./types";

interface UseABTestResult<T extends Record<string, unknown>> {
  variant: ABTestVariant | null;
  config: T | null;
  isLoading: boolean;
  trackConversion: (value?: number, label?: string) => void;
  trackClick: (elementId?: string) => void;
}

// Store for A/B test variants
const variantCache = new Map<string, ABTestVariant | null>();
const subscribers = new Set<() => void>();

function subscribe(callback: () => void) {
  subscribers.add(callback);
  return () => subscribers.delete(callback);
}

function getSnapshot(testId: string): ABTestVariant | null {
  if (!variantCache.has(testId)) {
    // Initialize on first access (client-side only)
    if (typeof window !== "undefined") {
      variantCache.set(testId, getVariantAssignment(testId));
    }
  }
  return variantCache.get(testId) ?? null;
}

function getServerSnapshot(): ABTestVariant | null {
  return null; // Always null on server
}

/**
 * React hook for A/B testing
 *
 * @param testId - The unique identifier of the A/B test
 * @param trackOnMount - Whether to track impression on mount (default: true)
 *
 * @example
 * ```tsx
 * function PricingCTA() {
 *   const { config, trackConversion } = useABTest<PricingCTATest>("pricing-cta-v1");
 *
 *   const handleClick = () => {
 *     trackConversion(9.99, "monthly");
 *     // ... proceed with upgrade
 *   };
 *
 *   return (
 *     <Button
 *       variant={config?.buttonColor === "green" ? "success" : "primary"}
 *       onClick={handleClick}
 *     >
 *       {config?.buttonText === "get_pro" ? "Get Pro" : "Upgrade Now"}
 *     </Button>
 *   );
 * }
 * ```
 */
export function useABTest<
  T extends Record<string, unknown> = Record<string, unknown>,
>(testId: string, trackOnMount = true): UseABTestResult<T> {
  const getSnapshotForTest = useCallback(() => getSnapshot(testId), [testId]);

  const variant = useSyncExternalStore(
    subscribe,
    getSnapshotForTest,
    getServerSnapshot,
  );

  const isLoading = variant === null && typeof window !== "undefined";

  // Track impression on mount
  useEffect(() => {
    if (trackOnMount && variant) {
      trackImpression(testId);
    }
  }, [testId, trackOnMount, variant]);

  const config = useMemo(
    () => (variant ? (variant.config as T) : null),
    [variant],
  );

  const handleTrackConversion = useCallback(
    (value?: number, label?: string) => {
      trackConversion(testId, value, label);
    },
    [testId],
  );

  const handleTrackClick = useCallback(
    (elementId?: string) => {
      trackClick(testId, elementId);
    },
    [testId],
  );

  return {
    variant,
    config,
    isLoading,
    trackConversion: handleTrackConversion,
    trackClick: handleTrackClick,
  };
}

/**
 * Hook specifically for ad placement tests
 */
export function useAdPlacementTest() {
  const { config, isLoading } = useABTest<{
    showSidebarAd: boolean;
    showBelowToolAd: boolean;
    showBetweenSectionsAd: boolean;
  }>("ad-placement-v1", false);

  return {
    showSidebarAd: config?.showSidebarAd ?? true,
    showBelowToolAd: config?.showBelowToolAd ?? false,
    showBetweenSectionsAd: config?.showBetweenSectionsAd ?? false,
    isLoading,
  };
}

/**
 * Hook specifically for pricing CTA tests
 */
export function usePricingCTATest() {
  const { config, trackConversion, trackClick, isLoading } = useABTest<{
    buttonColor: "blue" | "green" | "purple" | "gradient";
    buttonText: "upgrade" | "get_pro" | "start_trial";
  }>("pricing-cta-v1");

  return {
    buttonColor: config?.buttonColor ?? "blue",
    buttonText: config?.buttonText ?? "upgrade",
    trackConversion,
    trackClick,
    isLoading,
  };
}
