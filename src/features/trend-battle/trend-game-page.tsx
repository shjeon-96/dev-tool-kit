import { notFound } from "next/navigation";
import { getCategoryConfig } from "@/entities/trend-item/data/categories";
import { getItemsByCategory } from "@/entities/trend-item/data/items";
import type { Locale } from "@/shared/config/site";
import {
  createDailyChallenge,
  getDailyChallengeNumber,
  getUtcDateKey,
} from "@/shared/lib/trend-battle/daily";
import { createRound } from "@/shared/lib/trend-battle/game";
import { TrendBattleGame } from "./trend-battle-game";

export function TrendGamePage({
  locale,
  categorySlug,
}: {
  locale: Locale;
  categorySlug: string;
}) {
  const config = getCategoryConfig(categorySlug, locale);
  if (!config) notFound();

  const date = getUtcDateKey();
  const items = getItemsByCategory(config.category);
  const daily = createDailyChallenge({
    items,
    date,
    category: config.category,
    roundCount: 5,
  });

  return (
    <TrendBattleGame
      locale={locale}
      config={config}
      date={date}
      challengeNumber={getDailyChallengeNumber(date)}
      dailyRounds={daily.rounds}
      items={items}
      initialPracticeRound={createRound(items)}
    />
  );
}
