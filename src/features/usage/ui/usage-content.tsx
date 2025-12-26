"use client";

/**
 * UsageContent Component
 *
 * 사용량 분석 대시보드
 */

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import {
  ArrowLeft,
  BarChart3,
  TrendingUp,
  Calendar,
  Zap,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/shared/ui";
import { Progress } from "@/shared/ui";
import { PlanBadge } from "@/entities/subscription";
import { TIER_QUOTAS } from "@/shared/lib/quota/config";
import type { Database } from "@/shared/lib/supabase/types";
import type { TierType } from "@/shared/lib/lemonsqueezy/tiers";

type UserRow = Database["public"]["Tables"]["users"]["Row"];
type SubscriptionRow = Database["public"]["Tables"]["subscriptions"]["Row"];

interface UsageRecord {
  tool_slug: string;
  quantity: number;
  recorded_at: string;
}

interface UsageSummary {
  toolSlug: string;
  totalUsage: number;
  dailyUsage: number;
}

interface UsageContentProps {
  user: UserRow | null;
  subscription: SubscriptionRow | null;
  usageRecords: UsageRecord[];
}

export function UsageContent({
  user,
  subscription,
  usageRecords,
}: UsageContentProps) {
  const t = useTranslations("usage");
  const locale = useLocale();

  // 티어 결정
  const dbTier = user?.tier || "free";
  const tier: TierType = dbTier === "enterprise" ? "pro" : (dbTier as TierType);
  const quotaLimits = TIER_QUOTAS[tier];

  // 오늘 날짜와 이번 달 시작
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);

  // 일일/월간 사용량 계산
  const dailyUsage = usageRecords
    .filter((r) => r.recorded_at.startsWith(todayStr))
    .reduce((sum, r) => sum + (r.quantity || 0), 0);

  const monthlyUsage = usageRecords
    .filter((r) => new Date(r.recorded_at) >= monthStart)
    .reduce((sum, r) => sum + (r.quantity || 0), 0);

  // 도구별 사용량 집계
  const usageByTool = usageRecords.reduce(
    (acc, r) => {
      const key = r.tool_slug;
      if (!acc[key]) {
        acc[key] = { total: 0, daily: 0 };
      }
      acc[key].total += r.quantity || 0;
      if (r.recorded_at.startsWith(todayStr)) {
        acc[key].daily += r.quantity || 0;
      }
      return acc;
    },
    {} as Record<string, { total: number; daily: number }>,
  );

  // 상위 도구 목록 (사용량 기준)
  const topTools: UsageSummary[] = Object.entries(usageByTool)
    .map(([toolSlug, usage]) => ({
      toolSlug,
      totalUsage: usage.total,
      dailyUsage: usage.daily,
    }))
    .sort((a, b) => b.totalUsage - a.totalUsage)
    .slice(0, 10);

  // 퍼센트 계산
  const dailyPercent =
    quotaLimits.dailyLimit === Infinity
      ? 0
      : Math.min((dailyUsage / quotaLimits.dailyLimit) * 100, 100);
  const monthlyPercent =
    quotaLimits.monthlyLimit === Infinity
      ? 0
      : Math.min((monthlyUsage / quotaLimits.monthlyLimit) * 100, 100);

  const isNearLimit = dailyPercent >= 80 || monthlyPercent >= 80;
  const isAtLimit = dailyPercent >= 100 || monthlyPercent >= 100;

  return (
    <div className="container max-w-4xl py-8">
      {/* 뒤로 가기 */}
      <Link
        href={`/${locale}/dashboard`}
        className="mb-6 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        {t("backToDashboard")}
      </Link>

      {/* 헤더 */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <BarChart3 className="h-8 w-8" />
            {t("title")}
          </h1>
          <p className="mt-1 text-muted-foreground">{t("subtitle")}</p>
        </div>
        <PlanBadge tier={tier} className="text-sm px-3 py-1" />
      </div>

      {/* 한도 경고 */}
      {tier === "free" && (isNearLimit || isAtLimit) && (
        <div
          className={`mb-6 rounded-lg border p-4 ${
            isAtLimit
              ? "border-red-500 bg-red-50 dark:bg-red-900/20"
              : "border-amber-500 bg-amber-50 dark:bg-amber-900/20"
          }`}
        >
          <div className="flex items-center gap-3">
            <AlertTriangle
              className={`h-5 w-5 ${isAtLimit ? "text-red-600 dark:text-red-400" : "text-amber-600 dark:text-amber-400"}`}
            />
            <div className="flex-1">
              <h3
                className={`font-semibold ${isAtLimit ? "text-red-800 dark:text-red-200" : "text-amber-800 dark:text-amber-200"}`}
              >
                {isAtLimit ? t("limitReached") : t("nearLimit")}
              </h3>
              <p
                className={`text-sm ${isAtLimit ? "text-red-700 dark:text-red-300" : "text-amber-700 dark:text-amber-300"}`}
              >
                {t("upgradeMessage")}
              </p>
            </div>
            <Button size="sm" asChild>
              <Link href={`/${locale}/pricing`}>
                <Zap className="mr-2 h-4 w-4" />
                {t("upgrade")}
              </Link>
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {/* 사용량 개요 */}
        <div className="grid gap-6 sm:grid-cols-2">
          {/* 일일 사용량 */}
          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="h-5 w-5 text-primary" />
              <h2 className="font-semibold">{t("dailyUsage")}</h2>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>{t("used")}</span>
                <span className="font-medium">
                  {dailyUsage.toLocaleString()} /{" "}
                  {quotaLimits.dailyLimit === Infinity
                    ? "∞"
                    : quotaLimits.dailyLimit.toLocaleString()}
                </span>
              </div>
              {quotaLimits.dailyLimit !== Infinity && (
                <Progress
                  value={dailyPercent}
                  className={`h-2 ${
                    dailyPercent >= 100
                      ? "[&>[data-slot=progress-indicator]]:bg-red-500"
                      : dailyPercent >= 80
                        ? "[&>[data-slot=progress-indicator]]:bg-amber-500"
                        : ""
                  }`}
                />
              )}
              {quotaLimits.dailyLimit === Infinity && (
                <div className="text-sm text-muted-foreground">
                  {t("unlimited")}
                </div>
              )}
            </div>
          </div>

          {/* 월간 사용량 */}
          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h2 className="font-semibold">{t("monthlyUsage")}</h2>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>{t("used")}</span>
                <span className="font-medium">
                  {monthlyUsage.toLocaleString()} /{" "}
                  {quotaLimits.monthlyLimit === Infinity
                    ? "∞"
                    : quotaLimits.monthlyLimit.toLocaleString()}
                </span>
              </div>
              {quotaLimits.monthlyLimit !== Infinity && (
                <Progress
                  value={monthlyPercent}
                  className={`h-2 ${
                    monthlyPercent >= 100
                      ? "[&>[data-slot=progress-indicator]]:bg-red-500"
                      : monthlyPercent >= 80
                        ? "[&>[data-slot=progress-indicator]]:bg-amber-500"
                        : ""
                  }`}
                />
              )}
              {quotaLimits.monthlyLimit === Infinity && (
                <div className="text-sm text-muted-foreground">
                  {t("unlimited")}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 도구별 사용량 */}
        <div className="rounded-lg border bg-card p-6">
          <h2 className="font-semibold mb-4">{t("usageByTool")}</h2>
          {topTools.length > 0 ? (
            <div className="space-y-4">
              {topTools.map((tool) => {
                const maxUsage = topTools[0]?.totalUsage || 1;
                const percentage = (tool.totalUsage / maxUsage) * 100;

                return (
                  <div key={tool.toolSlug} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <Link
                        href={`/${locale}/tools/${tool.toolSlug}`}
                        className="font-medium hover:text-primary"
                      >
                        {formatToolName(tool.toolSlug)}
                      </Link>
                      <span className="text-muted-foreground">
                        {tool.totalUsage.toLocaleString()} {t("operations")}
                      </span>
                    </div>
                    <Progress value={percentage} className="h-1.5" />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <BarChart3 className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>{t("noUsageData")}</p>
              <p className="text-sm mt-1">{t("startUsing")}</p>
            </div>
          )}
        </div>

        {/* 요금제 정보 */}
        {tier === "free" && (
          <div className="rounded-lg border bg-gradient-to-r from-primary/10 to-primary/5 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold">{t("unlockMore")}</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {t("proFeatures")}
                </p>
              </div>
              <Button asChild>
                <Link href={`/${locale}/pricing`}>
                  <Zap className="mr-2 h-4 w-4" />
                  {t("viewPlans")}
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// 도구 slug를 표시용 이름으로 변환
function formatToolName(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
