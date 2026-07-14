import type { MetadataRoute } from "next";
import {
  LOCALES,
  SITE_URL,
  localeAlternates,
  localizedPath,
} from "@/shared/config/site";
import { TOOL_SLUGS } from "@/shared/config/tools";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-07-15T00:00:00.000Z");
  const staticPaths = [
    { path: "", priority: 1 },
    { path: "tools", priority: 0.9 },
    { path: "about", priority: 0.6 },
    { path: "privacy", priority: 0.4 },
    { path: "terms", priority: 0.4 },
  ] as const;
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    for (const page of staticPaths) {
      entries.push({
        url: `${SITE_URL}${localizedPath(locale, page.path)}`,
        lastModified,
        changeFrequency: page.path === "" ? "weekly" : "monthly",
        priority: page.priority,
        alternates: { languages: localeAlternates(page.path) },
      });
    }

    for (const slug of TOOL_SLUGS) {
      const path = `tools/${slug}`;
      entries.push({
        url: `${SITE_URL}${localizedPath(locale, path)}`,
        lastModified,
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: { languages: localeAlternates(path) },
      });
    }
  }

  return entries;
}
