"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Calculator, Calendar, Search, BookOpen } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/shared/ui";
import { tools, getSortedCategories, type ToolSlug } from "@/entities/tool";

import { Button } from "@/shared/ui";

import { useRecentTools } from "@/shared/lib/hooks/use-recent-tools";

export function CommandMenu() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("commandMenu");

  // Recent Tools Hook
  const { addRecentTool, getRecentSlugs, hasRecentTools } = useRecentTools();
  const recentSlugs = getRecentSlugs();

  // Get all tools and categories
  const categories = getSortedCategories();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    // Custom event listener for opening from other components
    const handleOpenEvent = () => setOpen(true);

    document.addEventListener("keydown", down);
    document.addEventListener("open-command-menu", handleOpenEvent);
    return () => {
      document.removeEventListener("keydown", down);
      document.removeEventListener("open-command-menu", handleOpenEvent);
    };
  }, []);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  const handleToolSelect = (slug: string) => {
    addRecentTool(slug as ToolSlug);
    runCommand(() => router.push(`/${locale}/tools/${slug}`));
  };

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50 md:hidden">
        <Button
          variant="outline"
          size="icon"
          className="h-12 w-12 rounded-full shadow-lg bg-background/80 backdrop-blur-sm border-primary/20"
          onClick={() => setOpen(true)}
        >
          <Search className="h-5 w-5" />
        </Button>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder={t("placeholder")} />
        <CommandList>
          <CommandEmpty>{t("noResults")}</CommandEmpty>

          {/* Recent Tools Section */}
          {hasRecentTools && (
            <CommandGroup heading={t("recentlyUsed")}>
              {recentSlugs.map((slug) => {
                const tool = tools[slug];
                if (!tool) return null;
                return (
                  <CommandItem
                    key={`recent-${slug}`}
                    onSelect={() => handleToolSelect(slug)}
                    value={`recent-${tool.title}`}
                  >
                    <tool.icon className="mr-2 h-4 w-4" />
                    <span>{tool.title}</span>
                    <span className="ml-auto text-xs text-muted-foreground opacity-70">
                      {t("recent")}
                    </span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          )}

          <CommandSeparator />

          <CommandGroup heading={t("suggestions")}>
            <CommandItem
              onSelect={() => runCommand(() => router.push(`/${locale}`))}
            >
              <Calendar className="mr-2 h-4 w-4" />
              <span>{t("home")}</span>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => router.push(`/${locale}/tools`))}
            >
              <Calculator className="mr-2 h-4 w-4" />
              <span>{t("allTools")}</span>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => router.push(`/${locale}/blog`))}
            >
              <BookOpen className="mr-2 h-4 w-4" />
              <span>{t("blog")}</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          {categories.map((category) => {
            const categoryTools = Object.entries(tools).filter(
              ([, tool]) => tool.category === category.id,
            );

            if (categoryTools.length === 0) return null;

            return (
              <CommandGroup
                key={category.id}
                heading={t(`categories.${category.labelKey}`)}
              >
                {categoryTools.map(([slug, tool]) => (
                  <CommandItem
                    key={slug}
                    onSelect={() => handleToolSelect(slug)}
                    value={tool.title} // For search filtering
                  >
                    <tool.icon className="mr-2 h-4 w-4" />
                    <span>{tool.title}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            );
          })}
        </CommandList>
      </CommandDialog>
    </>
  );
}
