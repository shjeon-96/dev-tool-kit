"use client";

import { Suspense } from "react";
import { useTranslations } from "next-intl";
import { tools, toolComponents, type ToolSlug } from "@/entities/tool";
import { PremiumToolGate, useFeatureAccess } from "@/entities/subscription";
import { useQuota } from "@/shared/lib/quota";
import { QuotaWarning, ErrorBoundary, PrivacyBadge } from "@/shared/ui";

function ToolSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-10 bg-muted rounded w-full" />
      <div className="grid gap-4 md:grid-cols-2">
        <div className="h-[400px] bg-muted rounded" />
        <div className="h-[400px] bg-muted rounded" />
      </div>
    </div>
  );
}

interface ToolRendererProps {
  slug: ToolSlug;
}

export function ToolRenderer({ slug }: ToolRendererProps) {
  const t = useTranslations("common");
  const tTools = useTranslations("tools");
  const ToolComponent = toolComponents[slug];
  const tool = tools[slug];
  const { isPro } = useFeatureAccess();
  const { stats, isLoading: isQuotaLoading } = useQuota(slug);

  if (!ToolComponent) {
    return <p className="text-muted-foreground">{t("loading")}</p>;
  }

  const toolName = tTools(`${slug}.title`);
  const toolDescription = tTools(`${slug}.description`);

  // Quota 경고 표시 조건: 무료 사용자이고 사용량이 80% 이상이거나 초과됨
  const showQuotaWarning =
    !isPro &&
    !isQuotaLoading &&
    stats &&
    (stats.dailyUsage >= stats.dailyLimit * 0.8 ||
      stats.monthlyUsage >= stats.monthlyLimit * 0.8 ||
      stats.isExceeded);

  return (
    <PremiumToolGate
      toolName={toolName}
      toolDescription={toolDescription}
      isPremium={tool?.isPremium}
    >
      <PrivacyBadge className="mb-4" />
      {showQuotaWarning && stats && (
        <QuotaWarning
          dailyUsage={stats.dailyUsage}
          dailyLimit={stats.dailyLimit}
          monthlyUsage={stats.monthlyUsage}
          monthlyLimit={stats.monthlyLimit}
          isExceeded={stats.isExceeded}
          className="mb-4"
        />
      )}
      <ErrorBoundary
        errorMessage={`${toolName} 실행 중 오류가 발생했습니다.`}
        resetKey={slug}
      >
        <Suspense fallback={<ToolSkeleton />}>
          <ToolComponent />
        </Suspense>
      </ErrorBoundary>
    </PremiumToolGate>
  );
}
