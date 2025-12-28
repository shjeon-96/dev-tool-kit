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
import { LayoutGrid, BookOpen } from "lucide-react";
import Image from "next/image";

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
        className,
      )}
    >
      <div className="flex-1 overflow-y-auto py-4">
        <div className="px-3 py-2">
          <div className="flex items-center gap-2 px-4 mb-4">
            <Image
              src="/icons/icon-192x192.png"
              alt="Logo"
              width={24}
              height={24}
              className="rounded-sm"
            />
            <h2 className="text-lg font-semibold tracking-tight text-primary">
              Web Toolkit
            </h2>
          </div>

          {/* Overview Link */}
          <div className="mb-4">
            <Button
              variant={pathname === basePath ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start",
                pathname === basePath && "bg-secondary font-medium",
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
                            "w-full justify-start relative",
                            isActive &&
                              "bg-secondary font-medium before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-6 before:w-1 before:bg-primary before:rounded-r-full",
                          )}
                          asChild
                        >
                          <Link href={href}>
                            <tool.icon
                              className={cn(
                                "mr-2 h-4 w-4 transition-colors",
                                isActive && "text-primary",
                              )}
                            />
                            {t(`${slug as ToolSlug}.title`)}
                          </Link>
                        </Button>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {/* Resources */}
            <div>
              <h3 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {tSidebar("resources")}
              </h3>
              <div className="space-y-1">
                <Button
                  variant={pathname.includes("/blog") ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start relative",
                    pathname.includes("/blog") &&
                      "bg-secondary font-medium before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-6 before:w-1 before:bg-primary before:rounded-r-full",
                  )}
                  asChild
                >
                  <Link href={`/${locale}/blog`}>
                    <BookOpen
                      className={cn(
                        "mr-2 h-4 w-4 transition-colors",
                        pathname.includes("/blog") && "text-primary",
                      )}
                    />
                    {tSidebar("blog")}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
