import { describe, expect, it } from "vitest";
import { categoryConfigs } from "@/entities/trend-item/data/categories";
import { seoContentPages } from "@/entities/trend-item/data/seo-pages";
import sitemap from "./sitemap";

describe("localized sitemap", () => {
  it("includes English and Korean URLs for every public page family", () => {
    const urls = sitemap().map((entry) => entry.url);
    const baseUrl = "https://trendbattle.app";
    const staticRoutes = [
      "",
      "/play",
      "/daily",
      "/about",
      "/privacy",
      "/terms",
      "/sources",
      "/contact",
    ];

    for (const route of staticRoutes) {
      expect(urls).toContain(`${baseUrl}${route}`);
      expect(urls).toContain(
        `${baseUrl}${route === "" ? "/ko" : `/ko${route}`}`,
      );
    }

    for (const config of categoryConfigs) {
      expect(urls).toContain(`${baseUrl}/${config.slug}`);
      expect(urls).toContain(`${baseUrl}/ko/${config.slug}`);
    }

    for (const page of seoContentPages) {
      expect(urls).toContain(`${baseUrl}/${page.slug}`);
      expect(urls).toContain(`${baseUrl}/ko/${page.slug}`);
    }
  });
});
