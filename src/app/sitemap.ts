import { getToolSlugs } from "@/entities/tool";
import { routing } from "@/i18n/routing";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL || "https://web-toolkit.app";
  const tools = getToolSlugs();
  const locales = routing.locales;

  const entries: MetadataRoute.Sitemap = [];

  // Root URL
  entries.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1,
    alternates: {
      languages: Object.fromEntries(
        locales.map((locale) => [locale, `${baseUrl}/${locale}`])
      ),
    },
  });

  // Tools listing page for each locale
  for (const locale of locales) {
    entries.push({
      url: `${baseUrl}/${locale}/tools`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${baseUrl}/${l}/tools`])
        ),
      },
    });
  }

  // Privacy page for each locale
  for (const locale of locales) {
    entries.push({
      url: `${baseUrl}/${locale}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${baseUrl}/${l}/privacy`])
        ),
      },
    });
  }

  // Tool pages for each locale
  for (const slug of tools) {
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale}/tools/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}/tools/${slug}`])
          ),
        },
      });
    }
  }

  return entries;
}
