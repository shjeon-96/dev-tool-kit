import Link from "next/link";
import type { LocaleKey } from "@/shared/lib/i18n";

interface BreadcrumbNavProps {
  locale: string;
  items: Array<{
    label: string;
    href?: string;
  }>;
}

const homeLabels: Record<LocaleKey, string> = {
  en: "Home",
  ko: "홈",
  ja: "ホーム",
};

const toolsLabels: Record<LocaleKey, string> = {
  en: "Tools",
  ko: "도구",
  ja: "ツール",
};

function getLocaleLabel(
  labels: Record<LocaleKey, string>,
  locale: string,
): string {
  if (locale === "ko" || locale === "ja") return labels[locale];
  return labels.en;
}

/**
 * SEO Breadcrumb Navigation
 *
 * pSEO 페이지에서 사용하는 시각적 브레드크럼 네비게이션
 */
export function BreadcrumbNav({ locale, items }: BreadcrumbNavProps) {
  const homeLabel = getLocaleLabel(homeLabels, locale);
  const toolsLabel = getLocaleLabel(toolsLabels, locale);

  return (
    <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
      <Link href={`/${locale}`} className="hover:text-foreground">
        {homeLabel}
      </Link>
      <span>/</span>
      <Link href={`/${locale}/tools`} className="hover:text-foreground">
        {toolsLabel}
      </Link>
      {items.map((item, index) => (
        <span key={index} className="contents">
          <span>/</span>
          {item.href ? (
            <Link href={item.href} className="hover:text-foreground">
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
