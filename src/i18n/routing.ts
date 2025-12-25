import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ko", "ja", "es", "pt", "de"],
  defaultLocale: "en",
  // SEO: 모든 URL에 locale 접두사 포함 (307 리다이렉트 방지)
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
