import { describe, expect, it } from "vitest";
import { categoryConfigs } from "./categories";
import {
  buildSeoPageJsonLd,
  seoContentPages,
  getSeoContentPage,
} from "./seo-pages";

describe("SEO content pages", () => {
  it("defines at least five PRD SEO pages", () => {
    expect(seoContentPages).toHaveLength(5);
  });

  it("maps every SEO page to an existing category and has complete FAQ content", () => {
    const categorySlugs = new Set(categoryConfigs.map((config) => config.slug));

    for (const page of seoContentPages) {
      expect(categorySlugs.has(page.categorySlug)).toBe(true);
      expect(page.title.length).toBeGreaterThan(12);
      expect(page.description.length).toBeGreaterThan(40);
      expect(page.faq.length).toBeGreaterThanOrEqual(3);
      expect(page.faq.every((faq) => faq.question && faq.answer)).toBe(true);
    }
  });

  it("provides Korean SEO copy for every English SEO page", () => {
    for (const page of seoContentPages) {
      const koreanPage = getSeoContentPage(page.slug, "ko");

      expect(koreanPage?.title).not.toBe(page.title);
      expect(koreanPage?.faq).toHaveLength(page.faq.length);
    }
  });

  it("builds FAQPage JSON-LD for search result eligibility", () => {
    const page = getSeoContentPage("animal-speed-quiz", "en");

    expect(page).toBeDefined();

    const jsonLd = buildSeoPageJsonLd(page!, "en");

    expect(jsonLd).toMatchObject({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      inLanguage: "en",
      url: "https://trendbattle.app/animal-speed-quiz",
      name: "Animal Speed Quiz: Which Animal Is Faster?",
    });
    expect(jsonLd.mainEntity).toHaveLength(page!.faq.length);
    expect(jsonLd.mainEntity[0]).toMatchObject({
      "@type": "Question",
      name: page!.faq[0].question,
      acceptedAnswer: {
        "@type": "Answer",
        text: page!.faq[0].answer,
      },
    });
  });
});
