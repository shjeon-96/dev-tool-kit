/**
 * Analytics Data Fetching
 *
 * Fetches revenue and traffic data from various sources
 */

import type {
  AnalyticsDashboardData,
  RevenueMetrics,
  TrafficMetrics,
  ConversionMetrics,
  ABTestResult,
} from "./types";

// ============================================
// LemonSqueezy API (Subscription Revenue)
// ============================================

interface LemonSqueezySubscription {
  id: string;
  status: string;
  created_at: string;
  cancelled_at?: string;
  renews_at?: string;
  first_subscription_item: {
    price_id: number;
    quantity: number;
  };
}

async function fetchLemonSqueezyMetrics(): Promise<
  RevenueMetrics["subscriptions"]
> {
  const apiKey = process.env.LEMONSQUEEZY_API_KEY;
  const storeId = process.env.LEMONSQUEEZY_STORE_ID;

  if (!apiKey || !storeId) {
    // Return mock data if API key not configured
    return {
      mrr: 0,
      activeSubscribers: 0,
      churnRate: 0,
      newSubscribersThisMonth: 0,
      cancelledThisMonth: 0,
    };
  }

  try {
    const response = await fetch(
      `https://api.lemonsqueezy.com/v1/subscriptions?filter[store_id]=${storeId}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          Accept: "application/vnd.api+json",
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      },
    );

    if (!response.ok) {
      throw new Error(`LemonSqueezy API error: ${response.status}`);
    }

    const data = await response.json();
    const subscriptions: LemonSqueezySubscription[] = data.data || [];

    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const active = subscriptions.filter((s) => s.status === "active");
    const newThisMonth = subscriptions.filter(
      (s) => new Date(s.created_at) >= monthStart,
    );
    const cancelledThisMonth = subscriptions.filter(
      (s) => s.cancelled_at && new Date(s.cancelled_at) >= monthStart,
    );

    // Estimate MRR based on $9.99/month Pro plan
    const mrr = active.length * 9.99;

    // Calculate churn rate (cancelled / active at start of month)
    const activeAtMonthStart = subscriptions.filter(
      (s) =>
        new Date(s.created_at) < monthStart &&
        (!s.cancelled_at || new Date(s.cancelled_at) >= monthStart),
    );
    const churnRate =
      activeAtMonthStart.length > 0
        ? (cancelledThisMonth.length / activeAtMonthStart.length) * 100
        : 0;

    return {
      mrr,
      activeSubscribers: active.length,
      churnRate: Math.round(churnRate * 10) / 10,
      newSubscribersThisMonth: newThisMonth.length,
      cancelledThisMonth: cancelledThisMonth.length,
    };
  } catch (error) {
    console.error("Failed to fetch LemonSqueezy metrics:", error);
    return {
      mrr: 0,
      activeSubscribers: 0,
      churnRate: 0,
      newSubscribersThisMonth: 0,
      cancelledThisMonth: 0,
    };
  }
}

// ============================================
// AdSense Estimation (based on traffic)
// ============================================

function estimateAdsenseRevenue(
  pageViews: number,
  period: "daily" | "weekly" | "monthly",
): RevenueMetrics["adsense"] {
  // Industry average RPM for developer tools: $2-5
  // We'll use $3 as a conservative estimate
  const estimatedRPM = 3.0;
  const estimatedRevenue = (pageViews / 1000) * estimatedRPM;

  return {
    estimatedPageViews: pageViews,
    estimatedRPM,
    estimatedRevenue: Math.round(estimatedRevenue * 100) / 100,
    period,
  };
}

// ============================================
// Traffic Metrics (from Supabase analytics or estimate)
// ============================================

async function fetchTrafficMetrics(): Promise<TrafficMetrics> {
  // In a real implementation, this would fetch from:
  // - Vercel Analytics API
  // - Google Analytics API
  // - Custom analytics table in Supabase

  // For now, return estimated data structure
  // This should be replaced with actual analytics integration

  return {
    pageViews: {
      today: 0,
      thisWeek: 0,
      thisMonth: 0,
      trend: "stable",
      trendPercentage: 0,
    },
    uniqueVisitors: {
      today: 0,
      thisWeek: 0,
      thisMonth: 0,
    },
    topPages: [],
    sources: [],
  };
}

// ============================================
// Conversion Metrics
// ============================================

async function fetchConversionMetrics(): Promise<ConversionMetrics> {
  // This would fetch from Supabase:
  // - users table (free vs pro counts)
  // - usage_logs table (tool usage)
  // - session analytics

  return {
    freeToProConversion: {
      rate: 0,
      total: 0,
      thisMonth: 0,
    },
    toolUsage: {
      totalUsage: 0,
      avgPerUser: 0,
      topTools: [],
    },
    engagement: {
      avgSessionDuration: 0,
      pagesPerSession: 0,
      bounceRate: 0,
    },
  };
}

// ============================================
// A/B Test Results
// ============================================

export async function fetchABTestResults(): Promise<ABTestResult[]> {
  // Fetch from KV store or database
  // For now, return empty array
  return [];
}

// ============================================
// Main Fetch Function
// ============================================

export async function fetchAnalyticsDashboardData(): Promise<AnalyticsDashboardData> {
  const [subscriptions, traffic, conversions, abTests] = await Promise.all([
    fetchLemonSqueezyMetrics(),
    fetchTrafficMetrics(),
    fetchConversionMetrics(),
    fetchABTestResults(),
  ]);

  // Estimate AdSense based on monthly page views
  const adsense = estimateAdsenseRevenue(
    traffic.pageViews.thisMonth,
    "monthly",
  );

  const revenue: RevenueMetrics = {
    adsense,
    subscriptions,
    totalEstimatedRevenue: adsense.estimatedRevenue + subscriptions.mrr,
  };

  return {
    revenue,
    traffic,
    conversions,
    abTests,
    lastUpdated: new Date().toISOString(),
  };
}

// ============================================
// Mock Data for Development
// ============================================

export function getMockAnalyticsData(): AnalyticsDashboardData {
  return {
    revenue: {
      adsense: {
        estimatedPageViews: 15000,
        estimatedRPM: 3.0,
        estimatedRevenue: 45.0,
        period: "monthly",
      },
      subscriptions: {
        mrr: 149.85,
        activeSubscribers: 15,
        churnRate: 5.2,
        newSubscribersThisMonth: 3,
        cancelledThisMonth: 1,
      },
      totalEstimatedRevenue: 194.85,
    },
    traffic: {
      pageViews: {
        today: 520,
        thisWeek: 3640,
        thisMonth: 15000,
        trend: "up",
        trendPercentage: 12.5,
      },
      uniqueVisitors: {
        today: 180,
        thisWeek: 1260,
        thisMonth: 5200,
      },
      topPages: [
        { path: "/tools/json-formatter", views: 2500, avgTimeOnPage: 145 },
        { path: "/tools/base64-converter", views: 1800, avgTimeOnPage: 98 },
        { path: "/tools/hash-generator", views: 1500, avgTimeOnPage: 120 },
        { path: "/tools/jwt-decoder", views: 1200, avgTimeOnPage: 85 },
        { path: "/tools/qr-generator", views: 900, avgTimeOnPage: 65 },
      ],
      sources: [
        { source: "Google", visitors: 3120, percentage: 60 },
        { source: "Direct", visitors: 1040, percentage: 20 },
        { source: "GitHub", visitors: 520, percentage: 10 },
        { source: "Twitter", visitors: 260, percentage: 5 },
        { source: "Other", visitors: 260, percentage: 5 },
      ],
    },
    conversions: {
      freeToProConversion: {
        rate: 2.5,
        total: 15,
        thisMonth: 3,
      },
      toolUsage: {
        totalUsage: 45000,
        avgPerUser: 8.65,
        topTools: [
          { slug: "json-formatter", usage: 12000 },
          { slug: "base64-converter", usage: 8500 },
          { slug: "hash-generator", usage: 7200 },
          { slug: "jwt-decoder", usage: 5800 },
          { slug: "qr-generator", usage: 4500 },
        ],
      },
      engagement: {
        avgSessionDuration: 185,
        pagesPerSession: 2.8,
        bounceRate: 45.2,
      },
    },
    abTests: [
      {
        id: "ab-cta-pricing",
        name: "Pricing CTA Button Color",
        status: "running",
        startDate: "2024-12-20",
        variants: [
          {
            id: "control",
            name: "Blue (Control)",
            traffic: 50,
            conversions: 12,
            conversionRate: 2.4,
            revenue: 119.88,
          },
          {
            id: "variant-a",
            name: "Green",
            traffic: 50,
            conversions: 18,
            conversionRate: 3.6,
            revenue: 179.82,
          },
        ],
        confidence: 87,
      },
      {
        id: "ab-ad-placement",
        name: "Ad Placement Position",
        status: "completed",
        startDate: "2024-12-01",
        endDate: "2024-12-15",
        variants: [
          {
            id: "control",
            name: "Sidebar Only",
            traffic: 50,
            conversions: 0,
            conversionRate: 0,
            revenue: 22.5,
          },
          {
            id: "variant-a",
            name: "Sidebar + Below Tool",
            traffic: 50,
            conversions: 0,
            conversionRate: 0,
            revenue: 31.2,
          },
        ],
        winner: "variant-a",
        confidence: 95,
      },
    ],
    lastUpdated: new Date().toISOString(),
  };
}
