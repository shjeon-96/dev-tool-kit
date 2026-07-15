import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { getDictionary } from "@/shared/i18n/dictionaries";
import {
  SITE_EMAIL,
  SITE_NAME,
  localizedPath,
  type Locale,
} from "@/shared/config/site";
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
        <Link className="brand-lockup" href={localizedPath(locale)}>
          <span className="brand-mark" aria-hidden="true">
            W/
          </span>
          <span>
            <strong>{SITE_NAME}</strong>
            <small>LOCAL UTILITY FIELD KIT</small>
          </span>
        </Link>

        <nav className="primary-nav" aria-label="Primary navigation">
          <Link href={localizedPath(locale, "tools")}>
            {dictionary.nav.tools}
          </Link>
          <Link href={localizedPath(locale, "about")}>
            {dictionary.nav.about}
          </Link>
        </nav>

        <LanguageSwitcher
          currentLocale={locale}
          label={dictionary.nav.language}
        />
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
          <span className="brand-mark" aria-hidden="true">
            W/
          </span>
          <p>{dictionary.footer.statement}</p>
        </div>

        <div>
          <p className="footer-label">{dictionary.footer.tools}</p>
          <Link href={localizedPath(locale, "tools")}>
            {dictionary.common.allTools}
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
