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
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-success/10 text-success border border-success/20">
        <Shield className="h-3.5 w-3.5" />
        <span className="font-medium">{t("privacy.noServerUpload")}</span>
      </div>
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-info/10 text-info border border-info/20">
        <WifiOff className="h-3.5 w-3.5" />
        <span className="font-medium">{t("privacy.worksOffline")}</span>
      </div>
    </div>
  );
}
