"use client";

import Link from "next/link";
import { X, Heart, Sparkles, Coffee, ShieldCheck } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { useAdBlockDetection } from "@/shared/lib/hooks/use-adblock-detection";
import { Button } from "../button";

/**
 * AdBlock 감지 시 표시되는 알림
 *
 * 사용자 친화적 접근:
 * 1. 정중한 메시지
 * 2. Pro 구독 옵션 제안
 * 3. 후원 옵션
 * 4. 화이트리스트 가이드
 */
export function AdBlockNotice() {
  const t = useTranslations("adblock");
  const locale = useLocale();
  const { showNotice, dismissNotice } = useAdBlockDetection();

  if (!showNotice) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md animate-in slide-in-from-bottom-4 duration-300">
      <div className="rounded-lg border bg-card p-5 shadow-xl">
        {/* 헤더 */}
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
            <Heart className="h-5 w-5 text-blue-500" />
          </div>
          <div className="flex-1 space-y-1">
            <p className="font-semibold text-foreground">{t("title")}</p>
            <p className="text-sm text-muted-foreground">{t("message")}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 shrink-0 hover:bg-muted"
            onClick={dismissNotice}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Dismiss</span>
          </Button>
        </div>

        {/* 옵션 목록 */}
        <div className="mt-4 space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {t("options")}
          </p>

          {/* Pro 구독 옵션 */}
          <div className="flex items-center gap-3 rounded-lg border border-primary/20 bg-primary/5 p-3">
            <Sparkles className="h-5 w-5 text-primary shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">{t("proPlan")}</p>
              <p className="text-xs text-muted-foreground">
                {t("proDescription")}
              </p>
            </div>
            <Button size="sm" className="shrink-0" asChild>
              <Link href={`/${locale}/pricing`} onClick={dismissNotice}>
                {t("viewPro")}
              </Link>
            </Button>
          </div>

          {/* 후원 옵션 */}
          <div className="flex items-center gap-3 rounded-lg border p-3 hover:bg-muted/50 transition-colors">
            <Coffee className="h-5 w-5 text-amber-500 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">{t("support")}</p>
              <p className="text-xs text-muted-foreground">
                {t("supportDescription")}
              </p>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="shrink-0"
              onClick={() => {
                dismissNotice();
                window.open("https://buymeacoffee.com/webtoolkit", "_blank");
              }}
            >
              {t("buyMeCoffee")}
            </Button>
          </div>

          {/* 화이트리스트 옵션 */}
          <div className="flex items-center gap-3 rounded-lg border p-3 hover:bg-muted/50 transition-colors">
            <ShieldCheck className="h-5 w-5 text-green-500 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">{t("whitelistTitle")}</p>
              <p className="text-xs text-muted-foreground">
                {t("whitelistDescription")}
              </p>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="shrink-0"
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

        {/* 하단 버튼 */}
        <div className="mt-4 pt-3 border-t">
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-muted-foreground hover:text-foreground"
            onClick={dismissNotice}
          >
            {t("later")}
          </Button>
        </div>
      </div>
    </div>
  );
}
