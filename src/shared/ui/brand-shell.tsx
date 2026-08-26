import Link from "next/link";
import type { HomeContent } from "@/shared/content/site-content";
import { SITE_EMAIL, localizedPath, type Locale } from "@/shared/config/site";
import { ThemeToggle } from "@/shared/ui/theme-toggle";

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`brand-lockup${compact ? " is-compact" : ""}`}>
      <svg className="brand-mark" viewBox="0 0 48 32" aria-hidden="true">
        <path
          d="M2 2h13c8 0 13 4.2 13 11s-5 11-13 11H9v6H2V2Zm7 7v8h6c3.7 0 6-1.5 6-4s-2.3-4-6-4H9Z"
          fillRule="evenodd"
          clipRule="evenodd"
        />
        <path d="M30 2h7v21h9v7H30V2Z" />
        <rect className="brand-mark-signal" x="24" y="2" width="4" height="4" />
      </svg>
      <span className="brand-wordmark">
        PIXELLOGIC <span aria-hidden="true">/</span> 픽셀로직
      </span>
    </span>
  );
}

export function BrandHeader({
  locale,
  nav,
}: {
  locale: Locale;
  nav: HomeContent["nav"];
}) {
  const otherLocale: Locale = locale === "ko" ? "en" : "ko";

  return (
    <header className="site-header">
      <div className="shell header-row">
        <Link
          className="brand-link"
          href={localizedPath(locale)}
          aria-label="PixelLogic home"
        >
          <BrandMark />
        </Link>
        <nav
          className="primary-nav"
          aria-label={locale === "ko" ? "주요 메뉴" : "Primary navigation"}
        >
          <a href="#products">{nav.products}</a>
          <a href="#principles">{nav.principles}</a>
          <a href="#data-use">{nav.data}</a>
          <a href="#contact">{nav.contact}</a>
        </nav>
        <div className="header-actions">
          <Link
            className="language-link"
            href={localizedPath(otherLocale)}
            hrefLang={otherLocale}
          >
            <strong>{locale.toUpperCase()}</strong>
            <span aria-hidden="true">·</span>
            <span>{otherLocale.toUpperCase()}</span>
          </Link>
          <ThemeToggle label={nav.theme} />
        </div>
      </div>
      <nav
        className="mobile-nav shell"
        aria-label={locale === "ko" ? "모바일 메뉴" : "Mobile navigation"}
      >
        <a href="#products">{nav.products}</a>
        <a href="#principles">{nav.principles}</a>
        <a href="#data-use">{nav.data}</a>
        <a href="#contact">{nav.contact}</a>
      </nav>
    </header>
  );
}

export function PolicyFooter({
  locale,
  statement,
}: {
  locale: Locale;
  statement: string;
}) {
  return (
    <footer className="site-footer">
      <div className="shell footer-lead">
        <BrandMark compact />
        <p>{statement}</p>
      </div>
      <div className="shell footer-links">
        <nav aria-label={locale === "ko" ? "정책 문서" : "Policy documents"}>
          <Link href={localizedPath(locale, "privacy")}>
            {locale === "ko" ? "개인정보처리방침" : "Privacy Policy"}
          </Link>
          <Link href={localizedPath(locale, "terms")}>
            {locale === "ko" ? "서비스 이용약관" : "Terms of Service"}
          </Link>
          <Link href={localizedPath(locale, "account-deletion")}>
            {locale === "ko"
              ? "계정 및 데이터 삭제"
              : "Account & Data Deletion"}
          </Link>
        </nav>
        <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>
        <span>© 2026 PixelLogic</span>
      </div>
    </footer>
  );
}

export type { HomeContent } from "@/shared/content/site-content";
