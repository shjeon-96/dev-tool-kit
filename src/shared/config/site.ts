export const SITE_NAME = "픽셀로직";
export const SITE_NAME_EN = "PixelLogic";
export const SITE_URL = "https://web-toolkit.app";
export const SITE_EMAIL = "pixellogic.app@gmail.com";

export const LOCALES = ["ko", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "ko";

export const LOCALE_LABELS: Record<Locale, string> = {
  ko: "한국어",
  en: "English",
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
