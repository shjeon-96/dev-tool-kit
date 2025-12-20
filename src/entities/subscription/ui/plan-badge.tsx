"use client";

/**
 * PlanBadge Component
 *
 * 사용자의 현재 플랜을 표시하는 배지
 */

import { cn } from "@/shared/lib";
import type { TierType } from "../model/types";

interface PlanBadgeProps {
  tier: TierType;
  className?: string;
  showLabel?: boolean;
}

const tierConfig: Record<TierType, { label: string; color: string }> = {
  free: {
    label: "Free",
    color: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  },
  pro: {
    label: "Pro",
    color: "bg-gradient-to-r from-blue-500 to-purple-500 text-white",
  },
};

export function PlanBadge({
  tier,
  className,
  showLabel = true,
}: PlanBadgeProps) {
  const config = tierConfig[tier];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
        config.color,
        className,
      )}
    >
      {tier === "pro" && (
        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )}
      {showLabel && config.label}
    </span>
  );
}
