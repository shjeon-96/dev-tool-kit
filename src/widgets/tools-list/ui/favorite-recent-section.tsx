"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Star, Clock, X } from "lucide-react";
import { useFavorites, useRecentTools } from "@/shared/lib";
import { tools, type ToolSlug } from "@/entities/tool";
import { Button } from "@/shared/ui";

export function FavoriteRecentSection() {
  const locale = useLocale();
  const t = useTranslations("tools");
  const tSidebar = useTranslations("sidebar");
  const {
    favorites,
    removeFavorite,
    hasFavorites,
    isLoaded: favLoaded,
  } = useFavorites();
  const {
    getRecentSlugs,
    clearRecentTools,
    hasRecentTools,
    isLoaded: recentLoaded,
  } = useRecentTools();

  const recentSlugs = getRecentSlugs();

  // Don't render until both are loaded to prevent hydration mismatch
  if (!favLoaded || !recentLoaded) {
    return null;
  }

  // Filter out favorites from recent to avoid duplicates
  const filteredRecent = recentSlugs.filter(
    (slug) => !favorites.includes(slug),
  );

  if (!hasFavorites && !hasRecentTools) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Favorites Section */}
      {hasFavorites && (
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-warning fill-warning" />
            <h2 className="text-sm font-semibold text-muted-foreground">
              {tSidebar("favorites")}
            </h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {favorites.map((slug) => {
              const tool = tools[slug];
              if (!tool) return null;
              return (
                <Link
                  key={slug}
                  href={`/${locale}/tools/${slug}`}
                  className="group relative flex items-center gap-3 rounded-lg border p-3 transition-all hover:border-primary/50 hover:shadow-sm"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-md bg-muted group-hover:bg-primary/10">
                    <tool.icon className="h-4 w-4 group-hover:text-primary" />
                  </div>
                  <span className="text-sm font-medium group-hover:text-primary truncate">
                    {t(`${slug as ToolSlug}.title`)}
                  </span>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      removeFavorite(slug);
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 p-1 hover:bg-muted rounded transition-all"
                    aria-label="Remove from favorites"
                  >
                    <X className="h-3 w-3 text-muted-foreground" />
                  </button>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Recent Tools Section */}
      {filteredRecent.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <h2 className="text-sm font-semibold text-muted-foreground">
                {tSidebar("recentlyUsed")}
              </h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearRecentTools}
              className="h-7 text-xs text-muted-foreground"
            >
              {tSidebar("clearRecent")}
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {filteredRecent.slice(0, 6).map((slug) => {
              const tool = tools[slug];
              if (!tool) return null;
              return (
                <Link
                  key={slug}
                  href={`/${locale}/tools/${slug}`}
                  className="group flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-all hover:border-primary/50 hover:bg-muted"
                >
                  <tool.icon className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary" />
                  <span className="group-hover:text-primary">
                    {t(`${slug as ToolSlug}.title`)}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
