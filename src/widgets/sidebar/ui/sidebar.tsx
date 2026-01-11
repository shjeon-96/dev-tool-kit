"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/shared/lib";
import { Button } from "@/shared/ui";
import {
  Home,
  BookOpen,
  TrendingUp,
  Briefcase,
  Laptop,
  Sparkles,
  Info,
  CreditCard,
  Film,
  Newspaper,
} from "lucide-react";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";

// Article categories with icons (labels come from i18n)
const ARTICLE_CATEGORIES: { id: string; icon: LucideIcon }[] = [
  { id: "tech", icon: Laptop },
  { id: "business", icon: Briefcase },
  { id: "lifestyle", icon: Sparkles },
  { id: "entertainment", icon: Film },
  { id: "trending", icon: TrendingUp },
  { id: "news", icon: Newspaper },
];

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("sidebar");
  const tNav = useTranslations("navigation");

  const basePath = `/${locale}`;

  return (
    <div
      className={cn(
        "h-full border-r bg-card flex flex-col overflow-hidden",
        className,
      )}
    >
      <div className="flex-1 overflow-y-auto py-4">
        <div className="px-3 py-2">
          {/* Logo */}
          <div className="flex items-center gap-2 px-4 mb-6">
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

          {/* Home Link */}
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
                <Home className="mr-2 h-4 w-4" />
                {tNav("home")}
              </Link>
            </Button>
          </div>

          {/* Articles Link */}
          <div className="mb-6">
            <Button
              variant={
                pathname === `${basePath}/articles` ? "secondary" : "ghost"
              }
              className={cn(
                "w-full justify-start",
                pathname === `${basePath}/articles` &&
                  "bg-secondary font-medium",
              )}
              asChild
            >
              <Link href={`${basePath}/articles`}>
                <BookOpen className="mr-2 h-4 w-4" />
                {t("allArticles")}
              </Link>
            </Button>
          </div>

          {/* Categories */}
          <div className="space-y-6">
            <div>
              <h3 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {t("categoriesHeader")}
              </h3>
              <div className="space-y-1">
                {ARTICLE_CATEGORIES.map((category) => {
                  const href = `${basePath}/${category.id}`;
                  const isActive =
                    pathname === href || pathname.startsWith(`${href}/`);

                  return (
                    <Button
                      key={category.id}
                      variant={isActive ? "secondary" : "ghost"}
                      className={cn(
                        "w-full justify-start relative transition-all",
                        isActive &&
                          "bg-primary/15 font-medium text-primary before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-6 before:w-[3px] before:bg-primary before:rounded-r-full",
                      )}
                      asChild
                    >
                      <Link href={href}>
                        <category.icon
                          className={cn(
                            "mr-2 h-4 w-4 transition-colors",
                            isActive && "text-primary",
                          )}
                        />
                        {t(`categories.${category.id}`)}
                      </Link>
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Other Links */}
            <div>
              <h3 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {t("more")}
              </h3>
              <div className="space-y-1">
                <Button
                  variant={pathname.includes("/about") ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  asChild
                >
                  <Link href={`${basePath}/about`}>
                    <Info className="mr-2 h-4 w-4" />
                    {t("about")}
                  </Link>
                </Button>
                <Button
                  variant={
                    pathname.includes("/pricing") ? "secondary" : "ghost"
                  }
                  className="w-full justify-start"
                  asChild
                >
                  <Link href={`${basePath}/pricing`}>
                    <CreditCard className="mr-2 h-4 w-4" />
                    {t("pricing")}
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
