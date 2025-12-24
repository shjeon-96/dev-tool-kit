/**
 * Analytics Dashboard Types
 *
 * Week 9-12: 수익 지표 모니터링 대시보드
 */

export interface RevenueMetrics {
  // AdSense 추정치 (실제 데이터는 AdSense API 필요)
  adsense: {
    estimatedPageViews: number;
    estimatedRPM: number; // Revenue per 1000 pageviews
    estimatedRevenue: number;
    period: "daily" | "weekly" | "monthly";
  };

  // LemonSqueezy 구독 수익
  subscriptions: {
    mrr: number; // Monthly Recurring Revenue
    activeSubscribers: number;
    churnRate: number;
    newSubscribersThisMonth: number;
    cancelledThisMonth: number;
  };

  // 합계
  totalEstimatedRevenue: number;
}

export interface TrafficMetrics {
  pageViews: {
    today: number;
    thisWeek: number;
    thisMonth: number;
    trend: "up" | "down" | "stable";
    trendPercentage: number;
  };

  uniqueVisitors: {
    today: number;
    thisWeek: number;
    thisMonth: number;
  };

  topPages: Array<{
    path: string;
    views: number;
    avgTimeOnPage: number;
  }>;

  sources: Array<{
    source: string;
    visitors: number;
    percentage: number;
  }>;
}

export interface ConversionMetrics {
  freeToProConversion: {
    rate: number;
    total: number;
    thisMonth: number;
  };

  toolUsage: {
    totalUsage: number;
    avgPerUser: number;
    topTools: Array<{
      slug: string;
      usage: number;
    }>;
  };

  engagement: {
    avgSessionDuration: number;
    pagesPerSession: number;
    bounceRate: number;
  };
}

export interface ABTestResult {
  id: string;
  name: string;
  status: "running" | "completed" | "paused";
  startDate: string;
  endDate?: string;
  variants: Array<{
    id: string;
    name: string;
    traffic: number; // percentage
    conversions: number;
    conversionRate: number;
    revenue: number;
  }>;
  winner?: string;
  confidence: number; // statistical confidence %
}

export interface AnalyticsDashboardData {
  revenue: RevenueMetrics;
  traffic: TrafficMetrics;
  conversions: ConversionMetrics;
  abTests: ABTestResult[];
  lastUpdated: string;
}
