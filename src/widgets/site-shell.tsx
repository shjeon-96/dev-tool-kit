import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { getDictionary } from "@/shared/i18n/dictionaries";
import { SITE_EMAIL, localizedPath, type Locale } from "@/shared/config/site";
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
          aria-label={dictionary.nav.home}
        >
          <PixelLogicLockup />
        </Link>

        <nav className="primary-nav" aria-label={dictionary.nav.primary}>
          <Link href={localizedPath(locale, "#products")}>
            {dictionary.nav.products}
          </Link>
        </nav>

        <div className="header-actions">
          <LanguageSwitcher
            currentLocale={locale}
            label={dictionary.nav.language}
          />
          <ThemeToggle label={dictionary.common.toggleTheme} />
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
          <PixelLogicLockup />
          <p>{dictionary.footer.statement}</p>
        </div>

        <div>
          <p className="footer-label">{dictionary.footer.products}</p>
          <Link href={localizedPath(locale, "#products")}>
            {dictionary.nav.products}
          </Link>
        </div>
        <div>
          <p className="footer-label">{dictionary.footer.contact}</p>
          <a href={`mailto:${SITE_EMAIL}`}>
            {SITE_EMAIL} <ArrowUpRight aria-hidden="true" size={13} />
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
