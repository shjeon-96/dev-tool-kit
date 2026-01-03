/**
 * A/B Testing Utilities
 *
 * Client-side A/B test assignment and tracking
 */

import type {
  ABTest,
  ABTestVariant,
  ABTestAssignment,
  ABTestEvent,
} from "./types";
import {
  safeGetItem,
  safeGetRawItem,
  safeSetItem,
  safeSetRawItem,
  safeRemoveItem,
  safeJsonParse,
} from "@/shared/lib/storage";
import { createLogger } from "@/shared/lib/logger";

const logger = createLogger("ab-testing");

// Storage key prefix
const STORAGE_PREFIX = "ab_test_";
const EVENTS_KEY = "ab_test_events";

// ============================================
// Test Configuration
// ============================================

export const AB_TESTS: ABTest[] = [
  {
    id: "pricing-cta-v1",
    name: "Pricing CTA Button",
    description: "Test different CTA button styles on pricing page",
    status: "running",
    startDate: "2024-12-20",
    variants: [
      {
        id: "control",
        name: "Blue (Control)",
        weight: 50,
        config: { buttonColor: "blue", buttonText: "upgrade" },
      },
      {
        id: "green",
        name: "Green Variant",
        weight: 50,
        config: { buttonColor: "green", buttonText: "get_pro" },
      },
    ],
  },
  {
    id: "ad-placement-v1",
    name: "Ad Placement",
    description: "Test different ad placements for optimal revenue",
    status: "running",
    startDate: "2024-12-20",
    variants: [
      {
        id: "control",
        name: "Sidebar Only",
        weight: 50,
        config: {
          showSidebarAd: true,
          showBelowToolAd: false,
          showBetweenSectionsAd: false,
        },
      },
      {
        id: "sidebar-below",
        name: "Sidebar + Below Tool",
        weight: 50,
        config: {
          showSidebarAd: true,
          showBelowToolAd: true,
          showBetweenSectionsAd: false,
        },
      },
    ],
  },
];

// ============================================
// Assignment Logic
// ============================================

/**
 * Get or create a consistent variant assignment for a user
 */
export function getVariantAssignment(testId: string): ABTestVariant | null {
  if (typeof window === "undefined") return null;

  const test = AB_TESTS.find((t) => t.id === testId);
  if (!test || test.status !== "running") return null;

  // Check for existing assignment
  const storageKey = `${STORAGE_PREFIX}${testId}`;
  const stored = safeGetRawItem(storageKey);

  if (stored) {
    const parseResult = safeJsonParse<ABTestAssignment>(stored, {
      testId: "",
      variantId: "",
      assignedAt: 0,
    });
    if (parseResult.success && parseResult.data) {
      const variant = test.variants.find(
        (v) => v.id === parseResult.data!.variantId,
      );
      if (variant) return variant;
    }
    // Invalid stored data, will reassign
    logger.debug("Invalid AB test assignment, reassigning", { testId });
  }

  // Create new assignment based on weighted random selection
  const variant = selectVariantByWeight(test.variants);

  // Store assignment
  const assignment: ABTestAssignment = {
    testId,
    variantId: variant.id,
    assignedAt: Date.now(),
  };
  safeSetItem(storageKey, assignment);

  return variant;
}

/**
 * Select variant based on weight distribution
 */
function selectVariantByWeight(variants: ABTestVariant[]): ABTestVariant {
  const totalWeight = variants.reduce((sum, v) => sum + v.weight, 0);
  let random = Math.random() * totalWeight;

  for (const variant of variants) {
    random -= variant.weight;
    if (random <= 0) return variant;
  }

  return variants[0];
}

/**
 * Get config value from assigned variant
 */
export function getTestConfig<T>(testId: string, key: string): T | null {
  const variant = getVariantAssignment(testId);
  if (!variant) return null;
  return (variant.config[key] as T) ?? null;
}

// ============================================
// Event Tracking
// ============================================

/**
 * Track an A/B test event
 */
export function trackABEvent(
  testId: string,
  eventType: ABTestEvent["eventType"],
  eventData?: Record<string, unknown>,
): void {
  if (typeof window === "undefined") return;

  const variant = getVariantAssignment(testId);
  if (!variant) return;

  const event: ABTestEvent = {
    testId,
    variantId: variant.id,
    eventType,
    eventData,
    timestamp: Date.now(),
  };

  // Store event locally (for batch upload)
  const events = safeGetItem<ABTestEvent[]>(EVENTS_KEY, []);
  events.push(event);

  // Keep only last 100 events to prevent storage overflow
  if (events.length > 100) {
    events.splice(0, events.length - 100);
  }

  safeSetItem(EVENTS_KEY, events);

  // In production, also send to analytics endpoint
  if (process.env.NODE_ENV === "production") {
    sendEventToAnalytics(event).catch((error) => {
      logger.debug("Failed to send AB event to analytics", {
        testId,
        error: error instanceof Error ? error.message : "Unknown error",
      });
    });
  }
}

/**
 * Track impression (variant shown to user)
 */
export function trackImpression(testId: string): void {
  trackABEvent(testId, "impression");
}

/**
 * Track conversion (user completed desired action)
 */
export function trackConversion(
  testId: string,
  value?: number,
  label?: string,
): void {
  trackABEvent(testId, "conversion", { value, label });
}

/**
 * Track click (user clicked on test element)
 */
export function trackClick(testId: string, elementId?: string): void {
  trackABEvent(testId, "click", { elementId });
}

/**
 * Send event to analytics endpoint
 */
async function sendEventToAnalytics(event: ABTestEvent): Promise<void> {
  const response = await fetch("/api/analytics/ab-event", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event),
  });

  if (!response.ok) {
    throw new Error(`Analytics API returned ${response.status}`);
  }
}

// ============================================
// Utility Functions
// ============================================

/**
 * Get all stored events for batch upload
 */
export function getStoredEvents(): ABTestEvent[] {
  if (typeof window === "undefined") return [];
  return safeGetItem<ABTestEvent[]>(EVENTS_KEY, []);
}

/**
 * Clear stored events after successful upload
 */
export function clearStoredEvents(): void {
  if (typeof window === "undefined") return;
  safeRemoveItem(EVENTS_KEY);
}

/**
 * Get all assignments for a user
 */
export function getAllAssignments(): ABTestAssignment[] {
  if (typeof window === "undefined") return [];

  const assignments: ABTestAssignment[] = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith(STORAGE_PREFIX)) {
      const stored = safeGetRawItem(key);
      if (stored) {
        const parseResult = safeJsonParse<ABTestAssignment>(stored, {
          testId: "",
          variantId: "",
          assignedAt: 0,
        });
        if (parseResult.success && parseResult.data?.testId) {
          assignments.push(parseResult.data);
        }
      }
    }
  }

  return assignments;
}

/**
 * Force reset a test assignment (for testing)
 */
export function resetTestAssignment(testId: string): void {
  if (typeof window === "undefined") return;
  safeRemoveItem(`${STORAGE_PREFIX}${testId}`);
}
