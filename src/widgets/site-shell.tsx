"use client";

import Link from "next/link";
import * as UI from "@pixellogic/ui/react";
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
    <UI.MarketingNav
      labels={{
        nav: dictionary.nav.primary,
        openMenu: dictionary.nav.openMenu,
        closeMenu: dictionary.nav.closeMenu,
      }}
      brand={
        <Link
          className="brand-link"
          href={localizedPath(locale)}
          aria-label={dictionary.nav.home}
        >
          <PixelLogicLockup />
        </Link>
      }
      links={[
        {
          label: dictionary.nav.products,
          href: localizedPath(locale, "#products"),
        },
        {
          label: dictionary.nav.process,
          href: localizedPath(locale, "process"),
        },
      ]}
      actions={
        <div className="header-actions">
          <LanguageSwitcher
            currentLocale={locale}
            label={dictionary.nav.language}
          />
          <ThemeToggle label={dictionary.common.toggleTheme} />
        </div>
      }
    />
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
    <UI.MarketingFooter
      navLabel={dictionary.footer.nav}
      brand={<PixelLogicLockup />}
      links={[
        {
          label: dictionary.footer.products,
          href: localizedPath(locale, "#products"),
        },
        {
          label: dictionary.nav.process,
          href: localizedPath(locale, "process"),
        },
        { label: dictionary.footer.contact, href: `mailto:${SITE_EMAIL}` },
        {
          label: dictionary.footer.privacy,
          href: localizedPath(locale, "privacy"),
          emphasis: true,
        },
        {
          label: dictionary.footer.terms,
          href: localizedPath(locale, "terms"),
        },
      ]}
      copyright={`© ${new Date().getFullYear()} PixelLogic. ${dictionary.footer.rights}`}
    />
  );
}
