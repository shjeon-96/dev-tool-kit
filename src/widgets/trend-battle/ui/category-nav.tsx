"use client";

import Link from "next/link";
import { categoryConfigs } from "@/entities/trend-item/data/categories";
import {
  getAlternateLocale,
  getLocalizedPath,
  messages,
} from "@/shared/lib/trend-battle/i18n";
import { trackTrendEvent } from "@/shared/lib/trend-battle/analytics";
import type { AppLocale } from "@/shared/types/trend";

interface CategoryNavProps {
  activeSlug?: string;
  locale?: AppLocale;
}

export function CategoryNav({ activeSlug, locale = "en" }: CategoryNavProps) {
  const copy = messages[locale];
  const alternateLocale = getAlternateLocale(locale);
  const trackCategorySelection = (category: string) => {
    trackTrendEvent("category_selected", {
      category,
      locale,
      from: activeSlug ?? "home",
    });
  };

  return (
    <div className="mx-auto flex w-full max-w-5xl items-center gap-2 px-4 py-4">
      <nav
        aria-label="Trend Battle categories"
        className="flex min-w-0 flex-1 gap-2 overflow-x-auto"
      >
        <Link
          href={getLocalizedPath("play", locale)}
          onClick={() => trackCategorySelection("random")}
          className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold ${
            activeSlug === "play"
              ? "border-slate-950 bg-slate-950 text-white"
              : "border-slate-300 bg-white text-slate-700"
          }`}
        >
          {copy.randomShortLabel}
        </Link>
        <Link
          href={getLocalizedPath("daily", locale)}
          onClick={() => trackCategorySelection("daily")}
          className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold ${
            activeSlug === "daily"
              ? "border-slate-950 bg-slate-950 text-white"
              : "border-slate-300 bg-white text-slate-700"
          }`}
        >
          {copy.daily}
        </Link>
        {categoryConfigs.map((config) => (
          <Link
            key={config.slug}
            href={getLocalizedPath(config.slug, locale)}
            onClick={() => trackCategorySelection(config.category)}
            className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold ${
              activeSlug === config.slug
                ? "border-slate-950 bg-slate-950 text-white"
                : "border-slate-300 bg-white text-slate-700"
            }`}
          >
            {locale === "ko"
              ? toKoreanShortLabel(config.slug)
              : config.shortLabel}
          </Link>
        ))}
      </nav>
      <Link
        href={getLocalizedPath(activeSlug ?? "home", alternateLocale)}
        className="shrink-0 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700"
        hrefLang={alternateLocale}
      >
        {copy.otherLanguageName}
      </Link>
    </div>
  );
}

function toKoreanShortLabel(slug: string) {
  const labels: Record<string, string> = {
    countries: "국가",
    cities: "도시",
    movies: "영화",
    animals: "동물",
    mountains: "산",
  };

  return labels[slug] ?? slug;
}
