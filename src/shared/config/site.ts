export const SITE_NAME = "PixelLogic";
export const SITE_URL = "https://web-toolkit.app";
export const SITE_EMAIL = "pixellogic.app@gmail.com";

// 새 링크 종류를 늘리려면 여기와 dictionaries의 common 라벨을 함께 늘린다.
export const PRODUCT_LINK_KINDS = [
  "appStore",
  "googlePlay",
  "web",
  "publicPage",
] as const;
export type ProductLinkKind = (typeof PRODUCT_LINK_KINDS)[number];

export const PRODUCT_LINKS = {
  oneSecondRun: {
    appStore: "https://apps.apple.com/us/app/one-second-run/id6763670652",
    googlePlay:
      "https://play.google.com/store/apps/details?id=com.jeonseunghun.onesecondrun",
  },
  solScheduler: {
    publicPage: "https://sola-scheduler-6476537626.web.app/privacy.html",
  },
  weightHistory: {
    web: "https://weight-history-nextjs.vercel.app/ko",
  },
} as const satisfies Record<string, Partial<Record<ProductLinkKind, string>>>;

export const LOCALES = ["en", "ko", "ja"] as const;
export type Locale = (typeof LOCALES)[number];
export type ProductId = keyof typeof PRODUCT_LINKS;

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
