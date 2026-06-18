import { describe, expect, it } from "vitest";
import { createLocalizedAlternates, createTrendMetadata } from "./seo-metadata";

describe("localized SEO metadata", () => {
  it("creates absolute canonical and language alternate URLs", () => {
    expect(createLocalizedAlternates("countries", "ko")).toEqual({
      canonical: "https://trendbattle.app/ko/countries",
      languages: {
        en: "https://trendbattle.app/countries",
        ko: "https://trendbattle.app/ko/countries",
        "x-default": "https://trendbattle.app/countries",
      },
    });
  });

  it("keeps home page URLs normalized", () => {
    expect(createLocalizedAlternates("home", "en").canonical).toBe(
      "https://trendbattle.app/",
    );
    expect(createLocalizedAlternates("home", "ko").canonical).toBe(
      "https://trendbattle.app/ko",
    );
  });

  it("builds consistent Open Graph and Twitter metadata per locale", () => {
    const metadata = createTrendMetadata({
      title: "소개 | Trend Battle",
      description: "한국어 소개 페이지입니다.",
      slug: "about",
      locale: "ko",
    });

    expect(metadata.alternates).toEqual(
      createLocalizedAlternates("about", "ko"),
    );
    expect(metadata.openGraph).toMatchObject({
      type: "website",
      title: "소개 | Trend Battle",
      description: "한국어 소개 페이지입니다.",
      url: "https://trendbattle.app/ko/about",
      locale: "ko_KR",
      alternateLocale: ["en_US"],
      siteName: "Trend Battle",
    });
    expect(metadata.twitter).toMatchObject({
      card: "summary_large_image",
      title: "소개 | Trend Battle",
      description: "한국어 소개 페이지입니다.",
    });
  });
});
