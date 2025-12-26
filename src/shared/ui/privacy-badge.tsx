"use client";

import { Shield, Wifi, WifiOff } from "lucide-react";
import { useTranslations } from "next-intl";

interface PrivacyBadgeProps {
  className?: string;
}

export function PrivacyBadge({ className }: PrivacyBadgeProps) {
  const t = useTranslations("common");

  return (
    <div
      className={`flex flex-wrap items-center gap-3 text-xs text-muted-foreground ${className ?? ""}`}
    >
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20">
        <Shield className="h-3.5 w-3.5" />
        <span className="font-medium">{t("privacy.noServerUpload")}</span>
      </div>
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
        <WifiOff className="h-3.5 w-3.5" />
        <span className="font-medium">{t("privacy.worksOffline")}</span>
      </div>
    </div>
  );
}
