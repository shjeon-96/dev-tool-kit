"use client";

import { useEffect } from "react";
import { ADSENSE_CLIENT_ID } from "@/shared/config/adsense";
import type { Locale } from "@/shared/config/site";

const GAME_OVER_AD_SLOT = "4991680569";

declare global {
  interface Window {
    adsbygoogle?: Record<string, unknown>[];
  }
}

export function GameOverAd({ locale }: { locale: Locale }) {
  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      (window.adsbygoogle ??= []).push({});
    }
  }, []);

  return (
    <aside className="company-game-over-ad" aria-label="Advertisement">
      <span>{locale === "ko" ? "광고" : locale === "ja" ? "広告" : "AD"}</span>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={GAME_OVER_AD_SLOT}
        data-ad-format="horizontal"
        data-full-width-responsive="true"
      />
    </aside>
  );
}
