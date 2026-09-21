export const SITE_NAME = "PixelLogic";
export const SITE_URL = "https://web-toolkit.app";
export const SITE_EMAIL = "pixellogic.app@gmail.com";

export const PRODUCT_STORE_LINKS = {
  oneSecondRun: {
    ios: "https://apps.apple.com/us/app/one-second-run/id6763670652",
    android:
      "https://play.google.com/store/apps/details?id=com.jeonseunghun.onesecondrun",
  },
  pixelLogicBlocks: {
    ios: "https://apps.apple.com/us/app/pixellogic-blocks/id6808668810",
    android:
      "https://play.google.com/store/apps/details?id=com.pixellogic.blockblast",
  },
} as const;

export const LOCALES = ["en", "ko", "ja"] as const;
export type Locale = (typeof LOCALES)[number];
export type ProductId = keyof typeof PRODUCT_STORE_LINKS;

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
