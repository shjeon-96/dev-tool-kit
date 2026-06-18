import type { Metadata } from "next";
import { getItemsByCategory } from "@/entities/trend-item/data/items";
import {
  createDailyChallenge,
  getUtcDateKey,
} from "@/shared/lib/trend-battle/daily";
import type { AppLocale } from "@/shared/types/trend";
import { AdSlot } from "@/widgets/trend-battle/ui/ad-slot";
import { CategoryNav } from "@/widgets/trend-battle/ui/category-nav";
import { DailyChallengeGame } from "@/widgets/trend-battle/ui/daily-challenge-game";
import { messages } from "@/shared/lib/trend-battle/i18n";
import { createTrendMetadata } from "@/shared/lib/trend-battle/seo-metadata";

export function createDailyMetadata(locale: AppLocale = "en"): Metadata {
  const description =
    locale === "ko"
      ? "매일 바뀌는 Trend Battle 10문제 챌린지입니다. 로그인 없이 오늘 점수를 남겨보세요."
      : "Play today's fixed 10-question Trend Battle challenge. No login required.";

  const title =
    locale === "ko"
      ? "오늘의 10문제 챌린지 | Trend Battle"
      : "Daily 10-Question Challenge | Trend Battle";

  return createTrendMetadata({
    title,
    description,
    slug: "daily",
    locale,
  });
}

export function DailyPage({ locale = "en" }: { locale?: AppLocale }) {
  const copy = messages[locale];
  const today = getUtcDateKey();
  const items = getItemsByCategory("country_population");
  const challenge = createDailyChallenge({
    items,
    date: today,
    category: "country_population",
  });

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <CategoryNav activeSlug="daily" locale={locale} />
      <DailyChallengeGame
        date={challenge.date}
        rounds={challenge.rounds}
        locale={locale}
      />
      <section className="mx-auto grid max-w-5xl gap-6 px-4 pb-12">
        <AdSlot label="Daily challenge page ad" text={copy.advertisement} />
        <div className="grid gap-3 rounded-lg border border-slate-200 bg-white p-5 text-sm leading-6 text-slate-700">
          <h2 className="text-xl font-bold text-slate-950">
            {locale === "ko" ? "오늘의 챌린지 방식" : "How the daily works"}
          </h2>
          <p>
            {locale === "ko"
              ? "데일리 챌린지는 UTC 날짜 기준으로 같은 10개 문제를 제공합니다. 오늘 점수는 브라우저에 저장됩니다."
              : "The daily challenge uses the UTC date to serve the same 10 rounds for the day. Your daily score is stored in the browser."}
          </p>
        </div>
      </section>
    </main>
  );
}
