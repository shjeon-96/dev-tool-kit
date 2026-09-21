import {
  DEFAULT_LOCALE,
  LOCALE_LABELS,
  LOCALES,
  SITE_URL,
  isLocale,
  localeAlternates,
  localizedPath,
} from "@/shared/config/site";

describe("site locale helpers", () => {
  it("keeps the supported locales and their labels aligned", () => {
    expect(LOCALES).toEqual(["en", "ko", "ja"]);
    expect(DEFAULT_LOCALE).toBe("en");
    expect(LOCALE_LABELS).toEqual({
      en: "English",
      ko: "한국어",
      ja: "日本語",
    });
  });

  it("accepts supported locales and rejects unknown values", () => {
    expect(LOCALES.every(isLocale)).toBe(true);
    expect(isLocale("fr")).toBe(false);
  });

  it("builds localized paths with or without a nested path", () => {
    expect(localizedPath("ko")).toBe("/ko");
    expect(localizedPath("ja", "privacy")).toBe("/ja/privacy");
    expect(localizedPath("en", "/privacy")).toBe("/en/privacy");
  });

  it("builds canonical alternates for every supported locale", () => {
    expect(localeAlternates("privacy")).toEqual({
      en: `${SITE_URL}/en/privacy`,
      ko: `${SITE_URL}/ko/privacy`,
      ja: `${SITE_URL}/ja/privacy`,
    });
  });
});
