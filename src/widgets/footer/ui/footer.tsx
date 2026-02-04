"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

export function Footer() {
  const locale = useLocale();
  const t = useTranslations("footer");

  return (
    <footer className="py-4 sm:py-6 border-t bg-muted/30" role="contentinfo">
      <div className="flex flex-col items-center gap-4 text-xs sm:text-sm text-muted-foreground px-4 sm:px-6">
        {/* Business Info */}
        <div className="text-center space-y-1">
          <p className="font-medium text-foreground/80">
            {locale === "ko" ? "픽셀로직" : "PixelLogic"}
          </p>
          <p>
            {locale === "ko"
              ? "대표: 전승훈 | 사업자등록번호: 698-38-01639"
              : "CEO: Seunghun Jeon | Business No: 698-38-01639"}
          </p>
          <p>
            {locale === "ko"
              ? "인천시 연수구 컨벤시아대로 81, 드림시티 5층 509-205A호"
              : "509-205A, Dream City 5F, 81 Convensia-daero, Yeonsu-gu, Incheon, Korea"}
          </p>
        </div>

        {/* Navigation Links */}
        <nav
          className="flex flex-wrap justify-center gap-3 sm:gap-4"
          aria-label={locale === "ko" ? "푸터 링크" : "Footer links"}
        >
          <Link
            href={`/${locale}/about`}
            className="hover:underline hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
          >
            {t("about")}
          </Link>
          <Link
            href={`/${locale}/privacy`}
            className="hover:underline hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
          >
            {t("privacy")}
          </Link>
          <Link
            href={`/${locale}/terms`}
            className="hover:underline hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
          >
            {t("terms")}
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

        {/* Copyright */}
        <p className="text-center">
          © {new Date().getFullYear()} Web Toolkit. {t("rights")}
        </p>
      </div>
    </footer>
  );
}
