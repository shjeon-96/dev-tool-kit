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
    appStore:
      "https://apps.apple.com/us/app/%EC%86%94%EB%9D%BC-%EC%9D%BC%EC%A0%95%EA%B3%BC-%ED%95%A0-%EC%9D%BC/id6476537626",
    googlePlay:
      "https://play.google.com/store/apps/details?id=com.simple.scheduler",
    web: "https://scheduler-nextjs-two.vercel.app",
  },
  weightHistory: {
    appStore:
      "https://apps.apple.com/us/app/%EB%AA%B8%EB%AC%B4%EA%B2%8C-%EA%B8%B0%EB%A1%9D-%ED%95%98%EB%A3%A8%ED%95%98%EB%A3%A8-%EA%B8%B0%EB%A1%9D%ED%95%B4%EC%84%9C-%EA%B1%B4%EA%B0%95%ED%95%B4%EC%A7%80%EA%B8%B0/id6749294913",
    googlePlay:
      "https://play.google.com/store/apps/details?id=com.shjeon.weight",
    web: "https://weight-history-nextjs.vercel.app/ko",
  },
  blockBlast: {
    appStore: "https://apps.apple.com/us/app/pixellogic-blocks/id6808668810",
    googlePlay:
      "https://play.google.com/store/apps/details?id=com.pixellogic.blockblast",
  },
  orbit: {
    web: "https://orbit.web-toolkit.app",
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
