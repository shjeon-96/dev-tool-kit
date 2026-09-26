import type { MetadataRoute } from "next";
import {
  LOCALES,
  PRODUCT_LINKS,
  SITE_URL,
  productSlug,
  type ProductId,
  localeAlternates,
  localizedPath,
} from "@/shared/config/site";
import { appDocumentEntries } from "@/shared/legal/app-documents";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    { path: "", priority: 1 },
    { path: "process", priority: 0.8 },
    { path: "privacy", priority: 0.4 },
    { path: "terms", priority: 0.4 },
    ...(Object.keys(PRODUCT_LINKS) as ProductId[]).map((id) => ({
      path: `work/${productSlug(id)}`,
      priority: 0.8,
    })),
  ];
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

  // 앱 문서는 언어마다 있는 것만 싣는다.
  for (const { locale, slug, kind } of appDocumentEntries()) {
    entries.push({
      url: `${SITE_URL}${localizedPath(locale, `work/${slug}/${kind}`)}`,
      changeFrequency: "monthly",
      priority: 0.4,
    });
  }

  return entries;
}
