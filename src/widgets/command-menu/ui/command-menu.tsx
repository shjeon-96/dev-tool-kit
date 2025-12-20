"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Search, Sparkles, Zap } from "lucide-react";
import { tools, type ToolSlug } from "@/entities/tool";
import { parseNaturalLanguageQuery } from "@/features/natural-language-search";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/shared/ui/command";
import { cn } from "@/shared/lib/utils";

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("tools");
  const tCommon = useTranslations("common");
  const tCommand = useTranslations("commandMenu");

  // Parse natural language query
  const nlpResults = useMemo(() => {
    if (search.length < 3) return [];
    return parseNaturalLanguageQuery(search);
  }, [search]);

  // Get suggested tools from NLP
  const suggestedTools = useMemo(() => {
    return nlpResults
      .filter((r) => r.confidence >= 0.5)
      .slice(0, 3)
      .map((r) => r.targetTool)
      .filter((tool): tool is ToolSlug => tool !== null);
  }, [nlpResults]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    setSearch("");
    command();
  };

  // Filter tools based on search
  const filteredTools = useMemo(() => {
    if (!search) return Object.entries(tools);

    return Object.entries(tools).filter(([slug]) => {
      const title = t(`${slug as ToolSlug}.title`).toLowerCase();
      const searchLower = search.toLowerCase();
      return (
        slug.toLowerCase().includes(searchLower) || title.includes(searchLower)
      );
    });
  }, [search, t]);

  // Quick actions based on common patterns
  const quickActions = useMemo(() => {
    const actions: { label: string; icon: typeof Zap; tool: ToolSlug }[] = [];

    if (/^[{[]/.test(search.trim())) {
      actions.push({
        label: tCommand("formatJson"),
        icon: Zap,
        tool: "json-formatter",
      });
    }
    if (/^ey[A-Za-z0-9]/.test(search.trim())) {
      actions.push({
        label: tCommand("decodeJwt"),
        icon: Zap,
        tool: "jwt-decoder",
      });
    }
    if (/^https?:\/\//.test(search.trim())) {
      actions.push({
        label: tCommand("parseUrl"),
        icon: Zap,
        tool: "url-parser",
      });
    }
    if (/^[0-9a-fA-F]{32,}$/.test(search.trim())) {
      actions.push({
        label: tCommand("detectHash"),
        icon: Zap,
        tool: "hash-generator",
      });
    }

    return actions;
  }, [search, tCommand]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="hidden md:inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm text-muted-foreground hover:bg-accent transition-colors"
      >
        <Search className="h-4 w-4" />
        <span>{tCommon("searchTools")}</span>
        <kbd className="pointer-events-none inline-flex h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen} className="max-w-xl">
        <CommandInput
          placeholder={tCommand("naturalLanguagePlaceholder")}
          value={search}
          onValueChange={setSearch}
          onClose={() => setOpen(false)}
        />
        <CommandList
          className="max-h-[420px]"
          aria-live="polite"
          aria-atomic="false"
        >
          <CommandEmpty>
            <div className="py-14 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium">{tCommon("noResults")}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {tCommand("tryNaturalLanguage")}
              </p>
            </div>
          </CommandEmpty>

          {/* Quick Actions (detected patterns) */}
          {quickActions.length > 0 && (
            <>
              <CommandGroup heading={tCommand("quickActions")}>
                {quickActions.map((action, idx) => {
                  const tool = tools[action.tool];
                  if (!tool) return null;
                  return (
                    <CommandItem
                      key={`quick-${idx}`}
                      value={`quick-${action.tool}`}
                      onSelect={() =>
                        runCommand(() => {
                          sessionStorage.setItem("command-input", search);
                          router.push(`/${locale}/tools/${action.tool}`);
                        })
                      }
                      className="bg-primary/5 hover:bg-primary/10"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                        <action.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="font-medium">{action.label}</span>
                        <span className="text-xs text-muted-foreground">
                          {t(`${action.tool}.title`)}
                        </span>
                      </div>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
              <CommandSeparator className="my-2" />
            </>
          )}

          {/* AI Suggested Tools */}
          {suggestedTools.length > 0 && quickActions.length === 0 && (
            <>
              <CommandGroup heading={tCommand("aiSuggestions")}>
                {suggestedTools.map((toolSlug) => {
                  const tool = tools[toolSlug];
                  if (!tool) return null;
                  return (
                    <CommandItem
                      key={`ai-${toolSlug}`}
                      value={`ai-${toolSlug}`}
                      onSelect={() =>
                        runCommand(() =>
                          router.push(`/${locale}/tools/${toolSlug}`),
                        )
                      }
                      className="bg-violet-500/5 hover:bg-violet-500/10"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/10">
                        <Sparkles className="h-4 w-4 text-violet-500" />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="font-medium">
                          {t(`${toolSlug}.title`)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {tCommand("suggested")}
                        </span>
                      </div>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
              <CommandSeparator className="my-2" />
            </>
          )}

          {/* All Tools */}
          <CommandGroup heading={tCommon("tools")}>
            {filteredTools.map(([slug, tool]) => (
              <CommandItem
                key={slug}
                value={`${slug} ${t(`${slug as ToolSlug}.title`)}`}
                onSelect={() =>
                  runCommand(() => router.push(`/${locale}/tools/${slug}`))
                }
                className={cn(
                  "group",
                  suggestedTools.includes(slug as ToolSlug) && "opacity-50",
                )}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted/60 group-data-[selected=true]:bg-primary/10 transition-colors">
                  <tool.icon className="h-4 w-4 text-muted-foreground group-data-[selected=true]:text-primary transition-colors" />
                </div>
                <span className="font-medium text-foreground/80 group-data-[selected=true]:text-foreground">
                  {t(`${slug as ToolSlug}.title`)}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
