"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { cn } from "@/shared/lib";
import { Button } from "@/shared/ui";
import {
  tools,
  getToolsByCategory,
  getSortedCategories,
  type ToolSlug,
} from "@/entities/tool";
import { LayoutGrid } from "lucide-react";

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("tools");
  const tSidebar = useTranslations("sidebar");

  const groupedTools = getToolsByCategory(tools);
  const sortedCategories = getSortedCategories();

  const basePath = `/${locale}/tools`;

  return (
    <div
      className={cn(
        "h-full border-r bg-card flex flex-col overflow-hidden",
        className
      )}
    >
      <div className="flex-1 overflow-y-auto py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight text-primary">
            DevToolkit
          </h2>

          {/* Overview Link */}
          <div className="mb-4">
            <Button
              variant={pathname === basePath ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start",
                pathname === basePath && "bg-secondary font-medium"
              )}
              asChild
            >
              <Link href={basePath}>
                <LayoutGrid className="mr-2 h-4 w-4" />
                {tSidebar("allTools")}
              </Link>
            </Button>
          </div>

          {/* Grouped Tools by Category */}
          <div className="space-y-6">
            {sortedCategories.map((category) => {
              const toolSlugs = groupedTools.get(category.id) || [];
              if (toolSlugs.length === 0) return null;

              return (
                <div key={category.id}>
                  <h3 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {tSidebar(`categories.${category.labelKey}`)}
                  </h3>
                  <div className="space-y-1">
                    {toolSlugs.map((slug) => {
                      const tool = tools[slug];
                      const href = `${basePath}/${slug}`;
                      const isActive = pathname === href;

                      return (
                        <Button
                          key={slug}
                          variant={isActive ? "secondary" : "ghost"}
                          className={cn(
                            "w-full justify-start",
                            isActive && "bg-secondary font-medium"
                          )}
                          asChild
                        >
                          <Link href={href}>
                            <tool.icon className="mr-2 h-4 w-4" />
                            {t(`${slug as ToolSlug}.title`)}
                          </Link>
                        </Button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
