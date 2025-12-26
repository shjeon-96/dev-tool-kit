"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui";
import { Progress } from "@/shared/ui";
import { Badge } from "@/shared/ui";
import type { AnalyticsDashboardData } from "../lib/types";

interface AnalyticsDashboardProps {
  data: AnalyticsDashboardData;
}

export function AnalyticsDashboard({ data }: AnalyticsDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground text-sm">
            Last updated: {new Date(data.lastUpdated).toLocaleString()}
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="traffic">Traffic</TabsTrigger>
          <TabsTrigger value="ab-tests">A/B Tests</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Revenue Summary */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <MetricCard
              title="Estimated Monthly Revenue"
              value={`$${data.revenue.totalEstimatedRevenue.toFixed(2)}`}
              subtitle="AdSense + Subscriptions"
              trend="up"
              trendValue="+12.5%"
            />
            <MetricCard
              title="Monthly Page Views"
              value={data.traffic.pageViews.thisMonth.toLocaleString()}
              subtitle={`${data.traffic.uniqueVisitors.thisMonth.toLocaleString()} unique visitors`}
              trend={data.traffic.pageViews.trend}
              trendValue={`${data.traffic.pageViews.trend === "up" ? "+" : ""}${data.traffic.pageViews.trendPercentage}%`}
            />
            <MetricCard
              title="Active Subscribers"
              value={data.revenue.subscriptions.activeSubscribers.toString()}
              subtitle={`$${data.revenue.subscriptions.mrr.toFixed(2)} MRR`}
            />
            <MetricCard
              title="Conversion Rate"
              value={`${data.conversions.freeToProConversion.rate}%`}
              subtitle={`${data.conversions.freeToProConversion.thisMonth} new this month`}
            />
          </div>

          {/* Top Tools */}
          <Card>
            <CardHeader>
              <CardTitle>Top Tools by Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.traffic.topPages.map((page, index) => (
                  <div key={page.path} className="flex items-center gap-4">
                    <span className="text-muted-foreground w-6 text-sm">
                      #{index + 1}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{page.path}</span>
                        <span className="text-muted-foreground text-sm">
                          {page.views.toLocaleString()} views
                        </span>
                      </div>
                      <Progress
                        value={
                          (page.views / data.traffic.topPages[0].views) * 100
                        }
                        className="mt-2 h-2"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Revenue Tab */}
        <TabsContent value="revenue" className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* AdSense Card */}
            <Card>
              <CardHeader>
                <CardTitle>AdSense (Estimated)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-muted-foreground text-sm">Page Views</p>
                    <p className="text-2xl font-bold">
                      {data.revenue.adsense.estimatedPageViews.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">RPM</p>
                    <p className="text-2xl font-bold">
                      ${data.revenue.adsense.estimatedRPM.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <p className="text-muted-foreground text-sm">
                    Estimated Revenue
                  </p>
                  <p className="text-3xl font-bold text-green-600">
                    ${data.revenue.adsense.estimatedRevenue.toFixed(2)}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    Per {data.revenue.adsense.period}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Subscriptions Card */}
            <Card>
              <CardHeader>
                <CardTitle>Subscriptions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-muted-foreground text-sm">MRR</p>
                    <p className="text-2xl font-bold text-green-600">
                      ${data.revenue.subscriptions.mrr.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">
                      Active Subscribers
                    </p>
                    <p className="text-2xl font-bold">
                      {data.revenue.subscriptions.activeSubscribers}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 border-t pt-4">
                  <div>
                    <p className="text-muted-foreground text-xs">New</p>
                    <p className="text-lg font-semibold text-green-600">
                      +{data.revenue.subscriptions.newSubscribersThisMonth}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Cancelled</p>
                    <p className="text-lg font-semibold text-red-600">
                      -{data.revenue.subscriptions.cancelledThisMonth}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Churn Rate</p>
                    <p className="text-lg font-semibold">
                      {data.revenue.subscriptions.churnRate}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Traffic Tab */}
        <TabsContent value="traffic" className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Traffic Sources */}
            <Card>
              <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.traffic.sources.map((source) => (
                    <div key={source.source} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          {source.source}
                        </span>
                        <span className="text-muted-foreground text-sm">
                          {source.visitors.toLocaleString()} (
                          {source.percentage}
                          %)
                        </span>
                      </div>
                      <Progress value={source.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Engagement Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Engagement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <p className="text-sm font-medium">
                        Avg. Session Duration
                      </p>
                      <p className="text-muted-foreground text-xs">
                        Time spent per session
                      </p>
                    </div>
                    <p className="text-2xl font-bold">
                      {Math.floor(
                        data.conversions.engagement.avgSessionDuration / 60,
                      )}
                      :
                      {String(
                        data.conversions.engagement.avgSessionDuration % 60,
                      ).padStart(2, "0")}
                    </p>
                  </div>
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <p className="text-sm font-medium">Pages per Session</p>
                      <p className="text-muted-foreground text-xs">
                        Avg. pages viewed
                      </p>
                    </div>
                    <p className="text-2xl font-bold">
                      {data.conversions.engagement.pagesPerSession}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Bounce Rate</p>
                      <p className="text-muted-foreground text-xs">
                        Single page visits
                      </p>
                    </div>
                    <p className="text-2xl font-bold">
                      {data.conversions.engagement.bounceRate}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* A/B Tests Tab */}
        <TabsContent value="ab-tests" className="space-y-6">
          {data.abTests.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No A/B tests configured</p>
              </CardContent>
            </Card>
          ) : (
            data.abTests.map((test) => (
              <Card key={test.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{test.name}</CardTitle>
                    <Badge
                      variant={
                        test.status === "running"
                          ? "default"
                          : test.status === "completed"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {test.status}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Started: {test.startDate}
                    {test.endDate && ` - Ended: ${test.endDate}`}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {test.variants.map((variant) => (
                      <div
                        key={variant.id}
                        className={`rounded-lg border p-4 ${
                          test.winner === variant.id
                            ? "border-green-500 bg-green-50 dark:bg-green-950"
                            : ""
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{variant.name}</span>
                            {test.winner === variant.id && (
                              <Badge variant="default" className="bg-green-600">
                                Winner
                              </Badge>
                            )}
                          </div>
                          <span className="text-muted-foreground text-sm">
                            {variant.traffic}% traffic
                          </span>
                        </div>
                        <div className="mt-4 grid grid-cols-3 gap-4">
                          <div>
                            <p className="text-muted-foreground text-xs">
                              Conversions
                            </p>
                            <p className="text-lg font-semibold">
                              {variant.conversions}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground text-xs">
                              Conv. Rate
                            </p>
                            <p className="text-lg font-semibold">
                              {variant.conversionRate}%
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground text-xs">
                              Revenue
                            </p>
                            <p className="text-lg font-semibold">
                              ${variant.revenue.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="text-muted-foreground pt-2 text-sm">
                      Statistical Confidence: {test.confidence}%
                      {test.confidence >= 95 && " ✓ Significant"}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

// ============================================
// Metric Card Component
// ============================================

interface MetricCardProps {
  title: string;
  value: string;
  subtitle?: string;
  trend?: "up" | "down" | "stable";
  trendValue?: string;
}

function MetricCard({
  title,
  value,
  subtitle,
  trend,
  trendValue,
}: MetricCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <p className="text-muted-foreground text-sm">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
        <div className="flex items-center justify-between">
          {subtitle && (
            <p className="text-muted-foreground text-xs">{subtitle}</p>
          )}
          {trend && trendValue && (
            <span
              className={`text-xs font-medium ${
                trend === "up"
                  ? "text-green-600"
                  : trend === "down"
                    ? "text-red-600"
                    : "text-gray-500"
              }`}
            >
              {trendValue}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
