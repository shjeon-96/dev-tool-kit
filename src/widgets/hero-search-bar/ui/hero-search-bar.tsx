"use client";

import { Search } from "lucide-react";
import { useTranslations } from "next-intl";

export function HeroSearchBar() {
  const t = useTranslations("landing");

  const handleClick = () => {
    document.dispatchEvent(new CustomEvent("open-command-menu"));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className="group relative mx-auto max-w-2xl cursor-pointer"
    >
      <div className="flex items-center gap-3 rounded-xl border-2 border-muted-foreground/20 bg-background/80 backdrop-blur-sm px-4 py-3.5 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
        <Search className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
        <span className="flex-1 text-left text-muted-foreground group-hover:text-foreground/70 transition-colors">
          {t("hero.searchPlaceholder")}
        </span>
        <kbd className="hidden sm:inline-flex h-6 items-center gap-1 rounded border bg-muted px-2 font-mono text-xs text-muted-foreground">
          <span className="text-sm">⌘</span>K
        </kbd>
      </div>
    </div>
  );
}
