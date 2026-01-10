import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // Reduced from 6 to 2 locales to minimize zero-impression pages
  // Previously: ["en", "ko", "ja", "es", "pt", "de"]
  locales: ["en", "ko"],
  defaultLocale: "en",
  // SEO: 모든 URL에 locale 접두사 포함 (307 리다이렉트 방지)
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
