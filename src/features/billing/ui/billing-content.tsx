"use client";

/**
 * BillingContent Component
 *
 * 결제 및 구독 관리 페이지
 */

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import {
  ArrowLeft,
  CreditCard,
  Calendar,
  Receipt,
  AlertTriangle,
  ExternalLink,
  Check,
} from "lucide-react";
import { Button } from "@/shared/ui";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/shared/ui";
import { PlanBadge } from "@/entities/subscription";
import { TIERS, formatPrice } from "@/shared/lib/lemonsqueezy/tiers";
import { useBilling } from "../model/use-billing";
import type { Database } from "@/shared/lib/supabase/types";

type UserRow = Database["public"]["Tables"]["users"]["Row"];
type SubscriptionRow = Database["public"]["Tables"]["subscriptions"]["Row"];

interface BillingContentProps {
  user: UserRow | null;
  subscription: SubscriptionRow | null;
}

export function BillingContent({ user, subscription }: BillingContentProps) {
  const t = useTranslations("billing");
  const locale = useLocale();

  const {
    tier,
    tierConfig,
    isActive,
    isCanceled,
    periodEnd,
    showCancelDialog,
    setShowCancelDialog,
    isLoading,
    handleCancelSubscription,
    handleResumeSubscription,
  } = useBilling({ user, subscription });

  return (
    <div className="container max-w-4xl py-8">
      {/* 뒤로 가기 */}
      <Link
        href={`/${locale}/dashboard`}
        className="mb-6 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        {t("title")}
      </Link>

      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{t("title")}</h1>
        <p className="mt-1 text-muted-foreground">{t("subtitle")}</p>
      </div>

      <div className="space-y-6">
        {/* 현재 플랜 */}
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">
                  {t("currentPlan.title")}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {t("currentPlan.description", { tier: tierConfig.name })}
                </p>
              </div>
            </div>
            <PlanBadge tier={tier} className="text-sm px-3 py-1" />
          </div>

          {/* 다음 결제 정보 */}
          {isActive && periodEnd && (
            <div className="mt-6 rounded-lg bg-muted/50 p-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">
                  {t("nextBilling.title")}
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {t("nextBilling.date", {
                  date: periodEnd.toLocaleDateString(locale, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }),
                })}
              </p>
              {!isCanceled && tier !== "free" && (
                <p className="text-sm text-muted-foreground">
                  {t("nextBilling.amount", {
                    amount: formatPrice(tierConfig.monthlyPrice),
                  })}
                </p>
              )}
              {isCanceled && (
                <p className="mt-2 text-sm text-warning">
                  {t("subscription.cancelsAt", {
                    date: periodEnd.toLocaleDateString(locale),
                  })}
                </p>
              )}
            </div>
          )}

          {/* 액션 버튼 */}
          <div className="mt-6 flex flex-wrap gap-3">
            {tier === "free" ? (
              <Button asChild>
                <Link href={`/${locale}/pricing`}>
                  {t("actions.changePlan")}
                </Link>
              </Button>
            ) : (
              <>
                <Button variant="outline" asChild>
                  <Link href={`/${locale}/pricing`}>
                    {t("actions.changePlan")}
                  </Link>
                </Button>

                {isCanceled ? (
                  <Button
                    variant="outline"
                    onClick={handleResumeSubscription}
                    disabled={isLoading}
                  >
                    {t("actions.resumeSubscription")}
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => setShowCancelDialog(true)}
                  >
                    {t("actions.cancelSubscription")}
                  </Button>
                )}
              </>
            )}
          </div>
        </div>

        {/* Lemon Squeezy 고객 포털 링크 */}
        {tier !== "free" && subscription?.external_customer_id && (
          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Receipt className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">
                  {t("paymentMethod.title")}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {t("paymentMethod.description")}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <Button variant="outline" asChild>
                <a
                  href={`https://app.lemonsqueezy.com/my-orders`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("customerPortal")}
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        )}

        {/* 플랜 비교 */}
        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-lg font-semibold mb-4">Plan Features</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {Object.values(TIERS).map((tierItem) => (
              <div
                key={tierItem.id}
                className={`rounded-lg border p-4 ${
                  tier === tierItem.id ? "border-primary bg-primary/5" : ""
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">{tierItem.name}</h3>
                  {tier === tierItem.id && (
                    <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                      Current
                    </span>
                  )}
                </div>
                <p className="text-2xl font-bold">
                  {formatPrice(tierItem.monthlyPrice)}
                  <span className="text-sm font-normal text-muted-foreground">
                    /월
                  </span>
                </p>
                <ul className="mt-4 space-y-2">
                  {tierItem.features.slice(0, 5).map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-success mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 취소 확인 다이얼로그 */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent>
          <DialogHeader>
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
              <AlertTriangle className="h-6 w-6 text-destructive" />
            </div>
            <DialogTitle className="text-center">
              {t("cancel.title")}
            </DialogTitle>
            <DialogDescription className="text-center">
              {t("cancel.description")}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col gap-2 sm:flex-col">
            <Button
              variant="destructive"
              onClick={handleCancelSubscription}
              disabled={isLoading}
              className="w-full"
            >
              {t("cancel.confirm")}
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowCancelDialog(false)}
              className="w-full"
            >
              {t("cancel.keep")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
