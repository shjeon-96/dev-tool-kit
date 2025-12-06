"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Search } from "lucide-react";
import { tools, type ToolSlug } from "@/entities/tool";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/shared/ui/command";

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("tools");
  const tCommon = useTranslations("common");

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
    command();
  };

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

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder={tCommon("searchPlaceholder")} />
        <CommandList>
          <CommandEmpty>{tCommon("noResults")}</CommandEmpty>
          <CommandGroup heading={tCommon("tools")}>
            {Object.entries(tools).map(([slug, tool]) => (
              <CommandItem
                key={slug}
                value={`${slug} ${t(`${slug as ToolSlug}.title`)}`}
                onSelect={() =>
                  runCommand(() => router.push(`/${locale}/tools/${slug}`))
                }
              >
                <tool.icon className="mr-2 h-4 w-4" />
                {t(`${slug as ToolSlug}.title`)}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
