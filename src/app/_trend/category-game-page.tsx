import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  categoryConfigs,
  getLocalizedCategoryConfig,
} from "@/entities/trend-item/data/categories";
import {
  getItemsByCategory,
  getRandomCategoryItems,
} from "@/entities/trend-item/data/items";
import type {
  AppLocale,
  TrendCategory,
  TrendCategoryConfig,
  TrendItem,
} from "@/shared/types/trend";
import { AdSlot } from "@/widgets/trend-battle/ui/ad-slot";
import { CategoryNav } from "@/widgets/trend-battle/ui/category-nav";
import { TrendBattleGame } from "@/widgets/trend-battle/ui/trend-battle-game";
import { messages } from "@/shared/lib/trend-battle/i18n";
import { createRound } from "@/shared/lib/trend-battle/game";
import { createTrendMetadata } from "@/shared/lib/trend-battle/seo-metadata";

export function createCategoryMetadata(
  slug: string,
  locale: AppLocale = "en",
): Metadata {
  const config = getLocalizedCategoryConfig(slug, locale);

  if (!config) {
    return {
      title: "Trend Battle",
      description: "Guess which one is bigger.",
    };
  }

  return createTrendMetadata({
    title: `${config.seoTitle} | Trend Battle`,
    description: config.seoDescription,
    slug: config.slug,
    locale,
  });
}

interface CategoryGamePageProps {
  slug: string;
  locale?: AppLocale;
}

export function CategoryGamePage({
  slug,
  locale = "en",
}: CategoryGamePageProps) {
  const config = getLocalizedCategoryConfig(slug, locale);

  if (!config) notFound();

  return (
    <TrendPageShell
      activeSlug={config.slug}
      config={config}
      items={getItemsByCategory(config.category)}
      storageCategory={config.category}
      locale={locale}
    />
  );
}

export function RandomGamePage({ locale = "en" }: { locale?: AppLocale }) {
  const config = categoryConfigs[0];
  const copy = messages[locale];

  return (
    <TrendPageShell
      activeSlug="play"
      config={{
        ...config,
        category: "country_population",
        label: copy.randomLabel,
        shortLabel: copy.randomShortLabel,
        slug: "play",
        question: copy.randomQuestion,
        classicPrompt: copy.randomClassicPrompt,
        valueLabel: locale === "ko" ? "값" : "value",
        seoTitle:
          locale === "ko"
            ? "Higher or Lower 랜덤 게임"
            : "Higher or Lower Game",
        seoDescription:
          locale === "ko"
            ? "랜덤 비교 퀴즈를 바로 시작하고 어느 항목의 수치가 더 큰지 맞혀보세요."
            : "Play a fast random comparison quiz and guess which item has the bigger number.",
      }}
      items={getRandomCategoryItems()}
      storageCategory="random"
      locale={locale}
    />
  );
}

interface TrendPageShellProps {
  activeSlug: string;
  config: TrendCategoryConfig;
  items: readonly TrendItem[];
  storageCategory: TrendCategory | "random";
  locale: AppLocale;
}

function TrendPageShell({
  activeSlug,
  config,
  items,
  storageCategory,
  locale,
}: TrendPageShellProps) {
  const copy = messages[locale];

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <CategoryNav activeSlug={activeSlug} locale={locale} />
      <TrendBattleGame
        items={items}
        config={config}
        storageCategory={storageCategory}
        initialRound={createRound(items)}
        locale={locale}
      />
      <section className="mx-auto grid max-w-5xl gap-6 px-4 pb-12">
        <AdSlot label={`${config.label} page ad`} text={copy.advertisement} />
        <div className="grid gap-4 rounded-lg border border-slate-200 bg-white p-5 text-sm leading-6 text-slate-700">
          <h2 className="text-xl font-bold text-slate-950">
            {copy.aboutCategoryTitle}
          </h2>
          <p>
            {config.seoDescription} {copy.aboutCategoryBody}
          </p>
          <p>{copy.matchingBody}</p>
        </div>
      </section>
    </main>
  );
}

export function createHomeMetadata(locale: AppLocale = "en"): Metadata {
  const description =
    locale === "ko"
      ? "국가, 도시, 영화, 동물, 산 데이터를 비교하며 어느 쪽이 더 큰지 맞히는 빠른 게임입니다."
      : "Play a fast higher or lower comparison game with countries, cities, movies, animals, and mountains.";

  return createTrendMetadata({
    title:
      locale === "ko"
        ? "Trend Battle | 어느 쪽이 더 클까요?"
        : "Trend Battle | Guess Which One Is Bigger",
    description,
    slug: "home",
    locale,
    openGraphTitle: "Trend Battle",
  });
}
