"use client";

import { Zap, WifiOff, Wifi } from "lucide-react";
import { useOfflineReady } from "@/shared/lib/hooks/use-online-status";
import { cn } from "@/shared/lib/utils";

interface OfflineIndicatorProps {
  className?: string;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
}

/**
 * PWA 오프라인 준비 상태를 표시하는 배지
 * - Ready for Offline ⚡️: Service Worker가 활성화되어 오프라인에서도 사용 가능
 * - Offline: 현재 오프라인 상태
 * - Online: 온라인 상태 (Service Worker 미지원 또는 미등록)
 */
export function OfflineIndicator({
  className,
  showLabel = true,
  size = "sm",
}: OfflineIndicatorProps) {
  const { isOnline, isOfflineReady, canWorkOffline } = useOfflineReady();

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-3 py-1",
    lg: "text-base px-4 py-1.5",
  };

  const iconSize = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  // 오프라인 상태
  if (!isOnline) {
    return (
      <div
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full font-medium",
          "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
          sizeClasses[size],
          className,
        )}
      >
        <WifiOff className={iconSize[size]} />
        {showLabel && <span>Offline</span>}
      </div>
    );
  }

  // 오프라인 준비 완료 (Service Worker 활성화)
  if (canWorkOffline) {
    return (
      <div
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full font-medium",
          "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
          sizeClasses[size],
          className,
        )}
        title="This tool works offline. Your data stays in your browser."
      >
        <Zap className={iconSize[size]} />
        {showLabel && <span>Ready for Offline</span>}
      </div>
    );
  }

  // 온라인 상태 (Service Worker 미지원/미등록)
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-medium",
        "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400",
        sizeClasses[size],
        className,
      )}
    >
      <Wifi className={iconSize[size]} />
      {showLabel && <span>Online</span>}
    </div>
  );
}

/**
 * 간단한 오프라인 준비 배지 (도구 카드에서 사용)
 */
export function OfflineBadge({ className }: { className?: string }) {
  const { canWorkOffline } = useOfflineReady();

  if (!canWorkOffline) return null;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-xs font-medium",
        "text-emerald-600 dark:text-emerald-400",
        className,
      )}
      title="Works offline"
    >
      <Zap className="h-3 w-3" />
      <span>Offline Ready</span>
    </span>
  );
}

/**
 * 아이콘만 표시하는 컴팩트 인디케이터
 */
export function OfflineStatusIcon({ className }: { className?: string }) {
  const { isOnline, canWorkOffline } = useOfflineReady();

  if (!isOnline) {
    return (
      <span title="You are offline">
        <WifiOff
          className={cn("h-4 w-4 text-amber-500", className)}
          aria-label="You are offline"
        />
      </span>
    );
  }

  if (canWorkOffline) {
    return (
      <span title="Ready for offline use">
        <Zap
          className={cn("h-4 w-4 text-emerald-500", className)}
          aria-label="Ready for offline use"
        />
      </span>
    );
  }

  return (
    <span title="Online">
      <Wifi
        className={cn("h-4 w-4 text-sky-500", className)}
        aria-label="Online"
      />
    </span>
  );
}
