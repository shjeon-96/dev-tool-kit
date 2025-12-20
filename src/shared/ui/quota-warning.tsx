"use client";

/**
 * QuotaWarning Component
 *
 * 사용량 경고 및 한도 초과 표시 UI
 */

import { AlertTriangle, TrendingUp, Crown } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { cn } from "@/shared/lib/utils";

interface QuotaWarningProps {
  dailyUsage: number;
  dailyLimit: number;
  monthlyUsage: number;
  monthlyLimit: number;
  isExceeded: boolean;
  className?: string;
}

export function QuotaWarning({
  dailyUsage,
  dailyLimit,
  monthlyUsage,
  monthlyLimit,
  isExceeded,
  className,
}: QuotaWarningProps) {
  const t = useTranslations("quota");

  const dailyPercent =
    dailyLimit === Infinity
      ? 0
      : Math.min((dailyUsage / dailyLimit) * 100, 100);
  const monthlyPercent =
    monthlyLimit === Infinity
      ? 0
      : Math.min((monthlyUsage / monthlyLimit) * 100, 100);

  const showWarning = dailyPercent >= 80 || monthlyPercent >= 80;

  if (!showWarning && !isExceeded) {
    return null;
  }

  return (
    <div
      className={cn(
        "rounded-lg border p-4",
        isExceeded
          ? "border-destructive/50 bg-destructive/10"
          : "border-yellow-500/50 bg-yellow-500/10",
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
            isExceeded ? "bg-destructive/20" : "bg-yellow-500/20",
          )}
        >
          {isExceeded ? (
            <AlertTriangle className="h-4 w-4 text-destructive" />
          ) : (
            <TrendingUp className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
          )}
        </div>

        <div className="flex-1 space-y-2">
          <h4
            className={cn(
              "font-medium",
              isExceeded
                ? "text-destructive"
                : "text-yellow-700 dark:text-yellow-300",
            )}
          >
            {isExceeded ? t("exceeded.title") : t("warning.title")}
          </h4>

          <p className="text-sm text-muted-foreground">
            {isExceeded ? t("exceeded.description") : t("warning.description")}
          </p>

          {/* 사용량 표시 */}
          <div className="space-y-2 pt-2">
            {dailyLimit !== Infinity && (
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">{t("daily")}</span>
                  <span className="font-medium">
                    {dailyUsage} / {dailyLimit}
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className={cn(
                      "h-full transition-all",
                      dailyPercent >= 100
                        ? "bg-destructive"
                        : dailyPercent >= 80
                          ? "bg-yellow-500"
                          : "bg-primary",
                    )}
                    style={{ width: `${dailyPercent}%` }}
                  />
                </div>
              </div>
            )}

            {monthlyLimit !== Infinity && (
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">{t("monthly")}</span>
                  <span className="font-medium">
                    {monthlyUsage} / {monthlyLimit}
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className={cn(
                      "h-full transition-all",
                      monthlyPercent >= 100
                        ? "bg-destructive"
                        : monthlyPercent >= 80
                          ? "bg-yellow-500"
                          : "bg-primary",
                    )}
                    style={{ width: `${monthlyPercent}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* 업그레이드 CTA */}
          <Link
            href="/pricing"
            className={cn(
              "mt-3 inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
              "bg-gradient-to-r from-amber-500 to-orange-500 text-white",
              "hover:from-amber-600 hover:to-orange-600",
            )}
          >
            <Crown className="h-3.5 w-3.5" />
            {t("upgradeCta")}
          </Link>
        </div>
      </div>
    </div>
  );
}

/**
 * 간단한 사용량 배지
 */
interface QuotaBadgeProps {
  usage: number;
  limit: number;
  className?: string;
}

export function QuotaBadge({ usage, limit, className }: QuotaBadgeProps) {
  if (limit === Infinity) {
    return null;
  }

  const percent = Math.min((usage / limit) * 100, 100);
  const isExceeded = percent >= 100;
  const isWarning = percent >= 80;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium",
        isExceeded
          ? "bg-destructive/10 text-destructive"
          : isWarning
            ? "bg-yellow-500/10 text-yellow-700 dark:text-yellow-300"
            : "bg-muted text-muted-foreground",
        className,
      )}
    >
      <span>
        {usage}/{limit}
      </span>
    </div>
  );
}
