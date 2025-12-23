"use client";

import { X, Heart } from "lucide-react";
import { useTranslations } from "next-intl";
import { useAdBlockDetection } from "@/shared/lib/hooks/use-adblock-detection";
import { Button } from "../button";

export function AdBlockNotice() {
  const t = useTranslations("adblock");
  const { showNotice, dismissNotice } = useAdBlockDetection();

  if (!showNotice) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm animate-in slide-in-from-bottom-4 duration-300">
      <div className="rounded-lg border bg-card p-4 shadow-lg">
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-pink-100 dark:bg-pink-900/30">
            <Heart className="h-4 w-4 text-pink-500" />
          </div>
          <div className="flex-1 space-y-2">
            <p className="text-sm font-medium">{t("title")}</p>
            <p className="text-xs text-muted-foreground">{t("message")}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 shrink-0"
            onClick={dismissNotice}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Dismiss</span>
          </Button>
        </div>
        <div className="mt-3 flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 text-xs"
            onClick={dismissNotice}
          >
            {t("later")}
          </Button>
          <Button
            variant="default"
            size="sm"
            className="flex-1 text-xs"
            onClick={() => {
              dismissNotice();
              window.open(
                "https://help.getadblock.com/support/solutions/articles/6000055743-how-to-whitelist-a-website-in-adblock",
                "_blank",
              );
            }}
          >
            {t("whitelist")}
          </Button>
        </div>
      </div>
    </div>
  );
}
