"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, History, Workflow, Grid3X3 } from "lucide-react";
import type { ToolSlug } from "@/entities/tool/model/types";
import { tools } from "@/entities/tool/model/registry";
import {
  getWeightedRecommendations,
  type LinkWeight,
} from "@/shared/lib/internal-linking";
import { useVisitedTools } from "@/shared/lib/hooks/use-visited-tools";
import { Badge } from "./badge";
import { Card, CardContent, CardHeader, CardTitle } from "./card";

// ============================================
// 타입 정의
// ============================================

interface SmartInternalLinksProps {
  /** 현재 도구 slug */
  currentTool: ToolSlug;
  /** 표시할 최대 링크 수 */
  maxLinks?: number;
  /** 컴팩트 모드 (사이드바용) */
  compact?: boolean;
  /** 추가 className */
  className?: string;
}

interface GroupedLinks {
  workflow: LinkWeight[];
  history: LinkWeight[];
  category: LinkWeight[];
}

// ============================================
// 컴포넌트
// ============================================

/**
 * Smart Internal Links
 *
 * User Journey 기반 내부 링크 추천 컴포넌트
 * - Workflow: 작업 흐름에서 자연스럽게 이어지는 도구
 * - History: 사용자가 자주 사용하는 도구
 * - Category: 같은 카테고리의 관련 도구
 */
export function SmartInternalLinks({
  currentTool,
  maxLinks = 8,
  compact = false,
  className = "",
}: SmartInternalLinksProps) {
  const locale = useLocale();
  const t = useTranslations("common");
  const { visitedTools, isLoaded } = useVisitedTools();

  // 추천 계산
  const recommendations = getWeightedRecommendations(
    currentTool,
    visitedTools,
    maxLinks,
  );

  // 그룹별 분류
  const grouped = recommendations.reduce<GroupedLinks>(
    (acc, link) => {
      acc[link.reason].push(link);
      return acc;
    },
    { workflow: [], history: [], category: [] },
  );

  // 로딩 중이거나 추천이 없으면 렌더링 안함
  if (!isLoaded || recommendations.length === 0) {
    return null;
  }

  if (compact) {
    return (
      <CompactLinks
        recommendations={recommendations}
        locale={locale}
        className={className}
        t={t}
      />
    );
  }

  return (
    <Card className={`mt-8 ${className}`}>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <ArrowRight className="h-5 w-5" />
          {t("relatedTools")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Workflow Links */}
        {grouped.workflow.length > 0 && (
          <LinkGroup
            title={t("nextSteps")}
            icon={<Workflow className="h-4 w-4" />}
            links={grouped.workflow}
            locale={locale}
            badgeVariant="default"
          />
        )}

        {/* History-based Links */}
        {grouped.history.length > 0 && (
          <LinkGroup
            title={t("recentlyUsed")}
            icon={<History className="h-4 w-4" />}
            links={grouped.history}
            locale={locale}
            badgeVariant="secondary"
          />
        )}

        {/* Category Links */}
        {grouped.category.length > 0 && (
          <LinkGroup
            title={t("similarTools")}
            icon={<Grid3X3 className="h-4 w-4" />}
            links={grouped.category}
            locale={locale}
            badgeVariant="outline"
          />
        )}
      </CardContent>
    </Card>
  );
}

// ============================================
// 서브 컴포넌트
// ============================================

interface LinkGroupProps {
  title: string;
  icon: React.ReactNode;
  links: LinkWeight[];
  locale: string;
  badgeVariant: "default" | "secondary" | "outline" | "destructive";
}

function LinkGroup({
  title,
  icon,
  links,
  locale,
  badgeVariant,
}: LinkGroupProps) {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
        {icon}
        {title}
      </h4>
      <div className="flex flex-wrap gap-2">
        {links.map(({ target, weight }) => {
          const tool = tools[target];
          if (!tool) return null;

          return (
            <Link
              key={target}
              href={`/${locale}/tools/${target}`}
              className="group"
            >
              <Badge
                variant={badgeVariant}
                className="transition-all hover:scale-105 cursor-pointer"
              >
                <tool.icon className="h-3 w-3 mr-1" />
                {tool.title}
                {weight >= 0.8 && <span className="ml-1 opacity-60">★</span>}
              </Badge>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

interface CompactLinksProps {
  recommendations: LinkWeight[];
  locale: string;
  className: string;
  t: ReturnType<typeof useTranslations>;
}

function CompactLinks({
  recommendations,
  locale,
  className,
  t,
}: CompactLinksProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        {t("relatedTools")}
      </h4>
      <div className="flex flex-col gap-1">
        {recommendations.slice(0, 5).map(({ target, reason }) => {
          const tool = tools[target];
          if (!tool) return null;

          return (
            <Link
              key={target}
              href={`/${locale}/tools/${target}`}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
            >
              <tool.icon className="h-3.5 w-3.5" />
              <span className="truncate">{tool.title}</span>
              {reason === "workflow" && (
                <ArrowRight className="h-3 w-3 ml-auto opacity-50" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

// ============================================
// 방문 기록 컴포넌트 (페이지에서 호출)
// ============================================

interface ToolVisitRecorderProps {
  slug: ToolSlug;
}

/**
 * 도구 페이지 방문을 기록하는 컴포넌트
 * 각 도구 페이지의 최상단에 배치
 */
export function ToolVisitRecorder({ slug }: ToolVisitRecorderProps) {
  const { recordVisit } = useVisitedTools();

  // 마운트 시 방문 기록
  if (typeof window !== "undefined") {
    // useEffect 대신 즉시 실행 (한 번만)
    const key = `recorded-${slug}`;
    if (!sessionStorage.getItem(key)) {
      recordVisit(slug);
      sessionStorage.setItem(key, "1");
    }
  }

  return null;
}
