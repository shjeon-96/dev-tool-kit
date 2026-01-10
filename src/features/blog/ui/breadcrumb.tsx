import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  accent?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  locale: string;
  className?: string;
}

export function Breadcrumb({ items, locale, className = "" }: BreadcrumbProps) {
  const isKorean = locale === "ko";

  return (
    <nav className={`flex items-center gap-2 text-sm text-muted-foreground ${className}`}>
      <Link href={`/${locale}`} className="hover:text-foreground transition-colors">
        {isKorean ? "홈" : "Home"}
      </Link>
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-2">
          <ChevronRight className="h-4 w-4" />
          {item.href ? (
            <Link
              href={item.href}
              className={`hover:text-foreground transition-colors ${item.accent || ""}`}
            >
              {item.label}
            </Link>
          ) : (
            <span className={`truncate max-w-[200px] ${item.accent || ""}`}>
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
