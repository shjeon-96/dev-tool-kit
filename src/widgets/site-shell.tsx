import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { getDictionary } from "@/shared/i18n/dictionaries";
import {
  SITE_EMAIL,
  SITE_NAME,
  localizedPath,
  type Locale,
} from "@/shared/config/site";
import { PixelLogicLockup } from "@/shared/ui/brand-assets";
import { ThemeToggle } from "@/shared/ui/theme-toggle";
import { LanguageSwitcher } from "./language-switcher";

type Dictionary = ReturnType<typeof getDictionary>;

export function SiteHeader({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link
          className="brand-link"
          href={localizedPath(locale)}
          aria-label={`${SITE_NAME} home`}
        >
          <PixelLogicLockup />
        </Link>

        <nav className="primary-nav" aria-label="Primary navigation">
          <Link href={localizedPath(locale, "#products")}>
            {dictionary.nav.products}
          </Link>
          <Link href={localizedPath(locale, "play")}>
            {dictionary.nav.play}
          </Link>
          <Link href={localizedPath(locale, "about")}>
            {dictionary.nav.about}
          </Link>
        </nav>

        <div className="header-actions">
          <LanguageSwitcher
            currentLocale={locale}
            label={dictionary.nav.language}
          />
          <ThemeToggle label={locale === "ko" ? "테마 전환" : "Toggle theme"} />
        </div>
      </div>
    </header>
  );
}

export function SiteFooter({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <PixelLogicLockup compact />
          <p>{dictionary.footer.statement}</p>
        </div>

        <div>
          <p className="footer-label">{dictionary.footer.products}</p>
          <Link href={localizedPath(locale, "#products")}>
            {dictionary.nav.products}
          </Link>
        </div>
        <div>
          <p className="footer-label">{dictionary.footer.company}</p>
          <Link href={localizedPath(locale, "about")}>
            {dictionary.footer.about}
          </Link>
          <a href={`mailto:${SITE_EMAIL}`}>
            {dictionary.footer.contact}{" "}
            <ArrowUpRight aria-hidden="true" size={13} />
          </a>
        </div>
        <div>
          <p className="footer-label">{dictionary.footer.legal}</p>
          <Link href={localizedPath(locale, "privacy")}>
            {dictionary.footer.privacy}
          </Link>
          <Link href={localizedPath(locale, "terms")}>
            {dictionary.footer.terms}
          </Link>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} PixelLogic</span>
        <span>{dictionary.footer.rights}</span>
      </div>
    </footer>
  );
}
