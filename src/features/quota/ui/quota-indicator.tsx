"use client";

/**
 * QuotaIndicator Component
 *
 * Pro 도구의 남은 무료 체험 횟수를 표시합니다.
 * - 무료 사용자: "X/Y uses remaining today"
 * - Pro 사용자: 표시하지 않음 (무제한)
 */

import { useQuota } from "../model/use-quota";
import { useFeatureAccess } from "@/entities/subscription";
import { tools } from "@/entities/tool/model/registry";
import type { ToolSlug } from "@/shared/types/tool";
import { Crown, Zap } from "lucide-react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { cn } from "@/shared/lib/utils";

interface QuotaIndicatorProps {
  slug: ToolSlug;
  className?: string;
  /** 컴팩트 모드 (아이콘만 표시) */
  compact?: boolean;
}

export function QuotaIndicator({
  slug,
  className,
  compact = false,
}: QuotaIndicatorProps) {
  const locale = useLocale();
  const { isPro, isLoading: isAuthLoading } = useFeatureAccess();
  const { stats, isLoading: isQuotaLoading } = useQuota(slug);
  const tool = tools[slug];

  // Pro 도구가 아니면 표시하지 않음
  if (!tool?.isPremium) {
    return null;
  }

  // 로딩 중
  if (isAuthLoading || isQuotaLoading) {
    return (
      <div
        className={cn(
          "h-8 w-24 animate-pulse rounded-full bg-muted",
          className,
        )}
      />
    );
  }

  // Pro 사용자는 무제한 배지 표시
  if (isPro) {
    if (compact) {
      return (
        <div
          className={cn(
            "flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-2 py-1 text-xs font-medium text-white",
            className,
          )}
        >
          <Crown className="h-3 w-3" />
          <span>Pro</span>
        </div>
      );
    }

    return (
      <div
        className={cn(
          "flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 px-3 py-1.5 text-sm",
          className,
        )}
      >
        <Crown className="h-4 w-4 text-amber-500" />
        <span className="font-medium text-amber-600 dark:text-amber-400">
          Unlimited Access
        </span>
      </div>
    );
  }

  // 무료 사용자 - 남은 횟수 표시
  if (!stats) return null;

  const { dailyUsage, dailyLimit, dailyRemaining, isExceeded } = stats;
  const usagePercent = Math.min((dailyUsage / dailyLimit) * 100, 100);

  // 사용량 초과
  if (isExceeded) {
    return (
      <Link
        href={`/${locale}/pricing`}
        className={cn(
          "group flex items-center gap-2 rounded-full border border-destructive/30 bg-destructive/10 px-3 py-1.5 text-sm transition-colors hover:bg-destructive/20",
          className,
        )}
      >
        <Zap className="h-4 w-4 text-destructive" />
        <span className="font-medium text-destructive">
          {compact ? "Upgrade" : "Daily limit reached · Upgrade to Pro"}
        </span>
      </Link>
    );
  }

  // 컴팩트 모드
  if (compact) {
    return (
      <div
        className={cn(
          "flex items-center gap-1 rounded-full border px-2 py-1 text-xs",
          dailyRemaining <= 1
            ? "border-amber-500/30 bg-amber-500/10 text-amber-600"
            : "border-border bg-muted text-muted-foreground",
          className,
        )}
      >
        <span>
          {dailyRemaining}/{dailyLimit}
        </span>
      </div>
    );
  }

  // 일반 모드 - 프로그레스 바 포함
  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">
          Free trial: {dailyRemaining} of {dailyLimit} uses left today
        </span>
        <Link
          href={`/${locale}/pricing`}
          className="font-medium text-primary hover:underline"
        >
          Upgrade
        </Link>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-300",
            usagePercent >= 100
              ? "bg-destructive"
              : usagePercent >= 66
                ? "bg-amber-500"
                : "bg-primary",
          )}
          style={{ width: `${usagePercent}%` }}
        />
      </div>
    </div>
  );
}
