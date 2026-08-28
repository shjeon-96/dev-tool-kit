import type { MetadataRoute } from "next";
import {
  LOCALES,
  SITE_URL,
  localeAlternates,
  localizedPath,
} from "@/shared/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  for (const locale of LOCALES) {
    for (const path of ["", "privacy", "terms", "account-deletion"] as const) {
      entries.push({
        url: `${SITE_URL}${localizedPath(locale, path)}`,
        lastModified: new Date("2026-08-26T00:00:00.000Z"),
        changeFrequency: path === "" ? "monthly" : "yearly",
        priority: path === "" ? 1 : 0.4,
        alternates: { languages: localeAlternates(path) },
      });
    }
  }
  return entries;
}
