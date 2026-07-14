export const SITE_NAME = "Web Toolkit";
export const SITE_URL = "https://web-toolkit.app";
export const SITE_EMAIL = "pixellogic.app@gmail.com";

export const LOCALES = ["en", "ko", "ja"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  ko: "한국어",
  ja: "日本語",
};

export function isLocale(value: string): value is Locale {
  return LOCALES.some((locale) => locale === value);
}

export function localizedPath(locale: Locale, path = "") {
  return `/${locale}${path ? `/${path.replace(/^\//, "")}` : ""}`;
}

export function localeAlternates(path = "") {
  return Object.fromEntries(
    LOCALES.map((locale) => [
      locale,
      `${SITE_URL}${localizedPath(locale, path)}`,
    ]),
  );
}
