"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
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
} from "lucide-react";
import Image from "next/image";

// Blog categories
const BLOG_CATEGORIES = [
  { id: "tech", icon: Laptop, labelEn: "Tech", labelKo: "테크" },
  { id: "business", icon: Briefcase, labelEn: "Business", labelKo: "비즈니스" },
  { id: "lifestyle", icon: Sparkles, labelEn: "Lifestyle", labelKo: "라이프스타일" },
  { id: "trending", icon: TrendingUp, labelEn: "Trending", labelKo: "트렌딩" },
] as const;

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  const locale = useLocale();

  const isKorean = locale === "ko";
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
                {isKorean ? "홈" : "Home"}
              </Link>
            </Button>
          </div>

          {/* Blog Link */}
          <div className="mb-6">
            <Button
              variant={pathname === `${basePath}/blog` ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start",
                pathname === `${basePath}/blog` && "bg-secondary font-medium",
              )}
              asChild
            >
              <Link href={`${basePath}/blog`}>
                <BookOpen className="mr-2 h-4 w-4" />
                {isKorean ? "블로그" : "Blog"}
              </Link>
            </Button>
          </div>

          {/* Categories */}
          <div className="space-y-6">
            <div>
              <h3 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {isKorean ? "카테고리" : "Categories"}
              </h3>
              <div className="space-y-1">
                {BLOG_CATEGORIES.map((category) => {
                  const href = `${basePath}/blog?category=${category.id}`;
                  const isActive = pathname.includes(category.id);

                  return (
                    <Button
                      key={category.id}
                      variant={isActive ? "secondary" : "ghost"}
                      className={cn(
                        "w-full justify-start relative",
                        isActive &&
                          "bg-secondary font-medium before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-6 before:w-1 before:bg-primary before:rounded-r-full",
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
                        {isKorean ? category.labelKo : category.labelEn}
                      </Link>
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Other Links */}
            <div>
              <h3 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {isKorean ? "더보기" : "More"}
              </h3>
              <div className="space-y-1">
                <Button
                  variant={pathname.includes("/about") ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  asChild
                >
                  <Link href={`${basePath}/about`}>
                    <Info className="mr-2 h-4 w-4" />
                    {isKorean ? "소개" : "About"}
                  </Link>
                </Button>
                <Button
                  variant={pathname.includes("/pricing") ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  asChild
                >
                  <Link href={`${basePath}/pricing`}>
                    <CreditCard className="mr-2 h-4 w-4" />
                    {isKorean ? "요금제" : "Pricing"}
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
