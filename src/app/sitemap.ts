import type { MetadataRoute } from "next";
import { categoryConfigs } from "@/entities/trend-item/data/categories";
import { seoContentPages } from "@/entities/trend-item/data/seo-pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://trendbattle.app";
  const now = new Date();
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
  const koreanRoutes = staticRoutes.map((route) =>
    route === "" ? "/ko" : `/ko${route}`,
  );

  return [
    ...[...staticRoutes, ...koreanRoutes].map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.7,
    })),
    ...categoryConfigs.map((config) => ({
      url: `${baseUrl}/${config.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...categoryConfigs.map((config) => ({
      url: `${baseUrl}/ko/${config.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...seoContentPages.flatMap((page) => [
      {
        url: `${baseUrl}/${page.slug}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.85,
      },
      {
        url: `${baseUrl}/ko/${page.slug}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.85,
      },
    ]),
  ];
}
