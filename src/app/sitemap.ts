import type { MetadataRoute } from "next";
import {
  LOCALES,
  SITE_URL,
  localeAlternates,
  localizedPath,
} from "@/shared/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    { path: "", priority: 1 },
    { path: "privacy", priority: 0.4 },
    { path: "bori-cleaner/privacy", priority: 0.4 },
    { path: "terms", priority: 0.4 },
  ] as const;
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    for (const page of staticPaths) {
      entries.push({
        url: `${SITE_URL}${localizedPath(locale, page.path)}`,
        changeFrequency: page.path === "" ? "weekly" : "monthly",
        priority: page.priority,
        alternates: { languages: localeAlternates(page.path) },
      });
    }
  }

  return entries;
}
