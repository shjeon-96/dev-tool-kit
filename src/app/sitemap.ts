import { getToolSlugs } from "@/entities/tool";
import { CHEATSHEET_SLUGS, type CheatsheetSlug } from "@/entities/cheatsheet";
import { getGuideSlugs } from "@/entities/guide";
import { getAllConversionSlugs } from "@/entities/converter";
import { routing } from "@/i18n/routing";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://web-toolkit.app";
  const tools = getToolSlugs();
  const cheatsheets: CheatsheetSlug[] = [...CHEATSHEET_SLUGS];
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
        locales.map((locale) => [locale, `${baseUrl}/${locale}`]),
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
          locales.map((l) => [l, `${baseUrl}/${l}/tools`]),
        ),
      },
    });
  }

  // About page for each locale
  for (const locale of locales) {
    entries.push({
      url: `${baseUrl}/${locale}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${baseUrl}/${l}/about`]),
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
          locales.map((l) => [l, `${baseUrl}/${l}/privacy`]),
        ),
      },
    });
  }

  // Terms page for each locale
  for (const locale of locales) {
    entries.push({
      url: `${baseUrl}/${locale}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${baseUrl}/${l}/terms`]),
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
            locales.map((l) => [l, `${baseUrl}/${l}/tools/${slug}`]),
          ),
        },
      });
    }
  }

  // Cheatsheets listing page for each locale
  for (const locale of locales) {
    entries.push({
      url: `${baseUrl}/${locale}/cheatsheets`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${baseUrl}/${l}/cheatsheets`]),
        ),
      },
    });
  }

  // Cheatsheet pages for each locale
  for (const slug of cheatsheets) {
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale}/cheatsheets/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}/cheatsheets/${slug}`]),
          ),
        },
      });
    }
  }

  // Guides listing page for each locale
  const guides = getGuideSlugs();
  for (const locale of locales) {
    entries.push({
      url: `${baseUrl}/${locale}/guides`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${baseUrl}/${l}/guides`]),
        ),
      },
    });
  }

  // Guide pages for each locale
  for (const slug of guides) {
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale}/guides/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}/guides/${slug}`]),
          ),
        },
      });
    }
  }

  // Converters listing page for each locale
  const converters = getAllConversionSlugs();
  for (const locale of locales) {
    entries.push({
      url: `${baseUrl}/${locale}/convert`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${baseUrl}/${l}/convert`]),
        ),
      },
    });
  }

  // Converter pages for each locale
  for (const slug of converters) {
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale}/convert/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}/convert/${slug}`]),
          ),
        },
      });
    }
  }

  return entries;
}
