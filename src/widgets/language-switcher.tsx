"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Languages } from "lucide-react";
import { LOCALES, LOCALE_LABELS, type Locale } from "@/shared/config/site";

export function LanguageSwitcher({
  currentLocale,
  label,
}: {
  currentLocale: Locale;
  label: string;
}) {
  const pathname = usePathname();

  return (
    <div className="language-switcher" aria-label={label}>
      <Languages aria-hidden="true" size={16} />
      {LOCALES.map((locale) => {
        const segments = pathname.split("/");
        segments[1] = locale;
        const href = segments.join("/") || `/${locale}`;

        return (
          <Link
            key={locale}
            href={href}
            hrefLang={locale}
            lang={locale}
            aria-current={locale === currentLocale ? "page" : undefined}
          >
            {LOCALE_LABELS[locale]}
          </Link>
        );
      })}
    </div>
  );
}
