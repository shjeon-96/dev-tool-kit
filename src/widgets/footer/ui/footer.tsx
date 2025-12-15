"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

export function Footer() {
  const locale = useLocale();
  const t = useTranslations("footer");

  return (
    <footer className="py-3 sm:py-4 border-t bg-muted/30" role="contentinfo">
      <div className="flex flex-col items-center justify-between gap-3 sm:gap-4 sm:flex-row text-xs sm:text-sm text-muted-foreground px-4 sm:px-6">
        <p className="text-center sm:text-left">
          © {new Date().getFullYear()} Web Toolkit. {t("rights")}
        </p>
        <nav
          className="flex flex-wrap justify-center gap-3 sm:gap-4"
          aria-label={locale === "ko" ? "푸터 링크" : "Footer links"}
        >
          <Link
            href={`/${locale}/privacy`}
            className="hover:underline hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
          >
            {t("privacy")}
          </Link>
          <Link
            href="https://github.com/shjeon-96"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
            aria-label={`GitHub (${locale === "ko" ? "새 탭에서 열기" : "opens in new tab"})`}
          >
            GitHub
          </Link>
        </nav>
      </div>
    </footer>
  );
}
