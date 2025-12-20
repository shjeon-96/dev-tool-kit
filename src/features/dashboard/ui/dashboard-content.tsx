"use client";

/**
 * DashboardContent Component
 *
 * 사용자 대시보드 메인 콘텐츠
 */

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import {
  User,
  CreditCard,
  Settings,
  BarChart3,
  Key,
  Zap,
  Calendar,
  CheckCircle,
  Clock,
} from "lucide-react";
import { Button } from "@/shared/ui";
import { PlanBadge } from "@/entities/subscription";
import type { Database } from "@/shared/lib/supabase/types";
import type { TierType } from "@/shared/lib/lemonsqueezy/tiers";

type UserRow = Database["public"]["Tables"]["users"]["Row"];
type SubscriptionRow = Database["public"]["Tables"]["subscriptions"]["Row"];

interface DashboardContentProps {
  user: UserRow | null;
  subscription: SubscriptionRow | null;
  checkoutSuccess?: boolean;
}

export function DashboardContent({
  user,
  subscription,
  checkoutSuccess,
}: DashboardContentProps) {
  const t = useTranslations("dashboard");
  const locale = useLocale();
  const [showSuccessMessage, setShowSuccessMessage] = useState(checkoutSuccess);

  useEffect(() => {
    if (checkoutSuccess) {
      const timer = setTimeout(() => setShowSuccessMessage(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [checkoutSuccess]);

  // 구독 상태 계산 (enterprise는 더 이상 지원하지 않으므로 pro로 매핑)
  const dbTier = user?.tier || "free";
  const tier: TierType = dbTier === "enterprise" ? "pro" : (dbTier as TierType);
  const isActive =
    subscription?.status === "active" || subscription?.status === "trialing";
  const isCanceled = subscription?.cancel_at_period_end === true;
  const periodEnd = subscription?.current_period_end
    ? new Date(subscription.current_period_end)
    : null;

  return (
    <div className="container max-w-6xl py-8">
      {/* 결제 성공 메시지 */}
      {showSuccessMessage && (
        <div className="mb-6 rounded-lg border border-green-500 bg-green-50 p-4 dark:bg-green-900/20">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
            <div>
              <h3 className="font-semibold text-green-800 dark:text-green-200">
                {t("checkout.successTitle")}
              </h3>
              <p className="text-sm text-green-700 dark:text-green-300">
                {t("checkout.successMessage")}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{t("title")}</h1>
        <p className="mt-1 text-muted-foreground">{t("subtitle")}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* 구독 상태 카드 */}
        <div className="rounded-lg border bg-card p-6 md:col-span-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">
                  {t("subscription.title")}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {t("subscription.currentPlan")}
                </p>
              </div>
            </div>
            <PlanBadge tier={tier} className="text-sm px-3 py-1" />
          </div>

          {/* 구독 상세 정보 */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-muted/50 p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                {t("subscription.status")}
              </div>
              <p className="mt-1 font-medium">
                {isActive ? (
                  <span className="text-green-600 dark:text-green-400">
                    {t("subscription.statusActive")}
                  </span>
                ) : (
                  <span className="text-muted-foreground">
                    {t("subscription.statusInactive")}
                  </span>
                )}
                {isCanceled && (
                  <span className="ml-2 text-amber-600 dark:text-amber-400">
                    ({t("subscription.cancelsAt")})
                  </span>
                )}
              </p>
            </div>

            {periodEnd && (
              <div className="rounded-lg bg-muted/50 p-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {isCanceled
                    ? t("subscription.endsOn")
                    : t("subscription.renewsOn")}
                </div>
                <p className="mt-1 font-medium">
                  {periodEnd.toLocaleDateString(locale, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            )}
          </div>

          {/* 액션 버튼 */}
          <div className="mt-6 flex flex-wrap gap-3">
            {tier === "free" ? (
              <Button asChild>
                <Link href={`/${locale}/pricing`}>
                  <Zap className="mr-2 h-4 w-4" />
                  {t("subscription.upgrade")}
                </Link>
              </Button>
            ) : (
              <Button variant="outline" asChild>
                <Link href={`/${locale}/dashboard/billing`}>
                  <CreditCard className="mr-2 h-4 w-4" />
                  {t("subscription.manageBilling")}
                </Link>
              </Button>
            )}
          </div>
        </div>

        {/* 사용자 프로필 카드 */}
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              {user?.avatar_url ? (
                <img
                  src={user.avatar_url}
                  alt=""
                  className="h-12 w-12 rounded-full object-cover"
                />
              ) : (
                <User className="h-6 w-6 text-muted-foreground" />
              )}
            </div>
            <div className="overflow-hidden">
              <h3 className="font-semibold truncate">
                {user?.name || t("profile.anonymous")}
              </h3>
              <p className="text-sm text-muted-foreground truncate">
                {user?.email}
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <Link
              href={`/${locale}/dashboard/settings`}
              className="flex items-center gap-3 rounded-lg p-2 hover:bg-muted transition-colors"
            >
              <Settings className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{t("nav.settings")}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 빠른 링크 */}
      <div className="mt-8">
        <h2 className="mb-4 text-lg font-semibold">{t("quickLinks.title")}</h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          <Link
            href={`/${locale}/dashboard/billing`}
            className="flex items-center gap-3 rounded-lg border p-4 hover:bg-muted/50 transition-colors"
          >
            <CreditCard className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">{t("quickLinks.billing")}</p>
              <p className="text-xs text-muted-foreground">
                {t("quickLinks.billingDesc")}
              </p>
            </div>
          </Link>

          <Link
            href={`/${locale}/dashboard/usage`}
            className="flex items-center gap-3 rounded-lg border p-4 hover:bg-muted/50 transition-colors"
          >
            <BarChart3 className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">{t("quickLinks.usage")}</p>
              <p className="text-xs text-muted-foreground">
                {t("quickLinks.usageDesc")}
              </p>
            </div>
          </Link>

          <Link
            href={`/${locale}/dashboard/api-keys`}
            className="flex items-center gap-3 rounded-lg border p-4 hover:bg-muted/50 transition-colors"
          >
            <Key className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">{t("quickLinks.apiKeys")}</p>
              <p className="text-xs text-muted-foreground">
                {t("quickLinks.apiKeysDesc")}
              </p>
            </div>
          </Link>

          <Link
            href={`/${locale}/tools`}
            className="flex items-center gap-3 rounded-lg border p-4 hover:bg-muted/50 transition-colors"
          >
            <Zap className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">{t("quickLinks.tools")}</p>
              <p className="text-xs text-muted-foreground">
                {t("quickLinks.toolsDesc")}
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
