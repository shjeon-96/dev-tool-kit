/**
 * A/B Testing Types
 *
 * Week 9-12: A/B 테스트 인프라 (광고 배치, CTA)
 */

export interface ABTest {
  id: string;
  name: string;
  description?: string;
  variants: ABTestVariant[];
  startDate: string;
  endDate?: string;
  status: "draft" | "running" | "paused" | "completed";
  targetAudience?: ABTestAudience;
}

export interface ABTestVariant {
  id: string;
  name: string;
  weight: number; // 0-100, sum of all variants should be 100
  config: Record<string, unknown>;
}

export interface ABTestAudience {
  // Filter by subscription status
  subscriptionStatus?: ("free" | "pro")[];
  // Filter by locale
  locales?: string[];
  // Percentage of traffic to include
  trafficPercentage?: number;
}

export interface ABTestAssignment {
  testId: string;
  variantId: string;
  assignedAt: number;
}

export interface ABTestEvent {
  testId: string;
  variantId: string;
  eventType: "impression" | "conversion" | "click";
  eventData?: Record<string, unknown>;
  timestamp: number;
}

// Predefined A/B test configurations
export interface PricingCTATest {
  buttonColor: "blue" | "green" | "purple" | "gradient";
  buttonText: "upgrade" | "get_pro" | "start_trial";
}

export interface AdPlacementTest {
  showSidebarAd: boolean;
  showBelowToolAd: boolean;
  showBetweenSectionsAd: boolean;
}
