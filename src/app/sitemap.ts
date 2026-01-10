import { getAllPosts } from "@/entities/post";
import { getAllArticleSlugs } from "@/entities/trend";
import { routing } from "@/i18n/routing";
import type { MetadataRoute } from "next";

// Valid categories for sitemap
const CATEGORIES = ["tech", "business", "lifestyle", "entertainment", "trending", "news"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://web-toolkit.app";
  const locales = routing.locales;

  const entries: MetadataRoute.Sitemap = [];

  // Root URL
  entries.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1,
    alternates: {
      languages: Object.fromEntries(
        locales.map((locale) => [locale, `${baseUrl}/${locale}`]),
      ),
    },
  });

  // Static pages for each locale
  const staticPages = [
    { path: "about", changeFrequency: "monthly" as const, priority: 0.5 },
    { path: "privacy", changeFrequency: "yearly" as const, priority: 0.3 },
    { path: "terms", changeFrequency: "yearly" as const, priority: 0.3 },
    { path: "pricing", changeFrequency: "monthly" as const, priority: 0.6 },
    { path: "blog", changeFrequency: "daily" as const, priority: 0.9 },
  ];

  for (const page of staticPages) {
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale}/${page.path}`,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}/${page.path}`]),
          ),
        },
      });
    }
  }

  // Category pages for each locale
  for (const category of CATEGORIES) {
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale}/${category}`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}/${category}`]),
          ),
        },
      });
    }
  }

  // Legacy blog posts for each locale
  const posts = getAllPosts();
  for (const post of posts) {
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}/blog/${post.slug}`]),
          ),
        },
      });
    }
  }

  // Dynamic articles from Supabase
  try {
    const articles = await getAllArticleSlugs();
    for (const article of articles) {
      for (const locale of locales) {
        entries.push({
          url: `${baseUrl}/${locale}/${article.category}/${article.slug}`,
          lastModified: new Date(article.updated_at),
          changeFrequency: "weekly",
          priority: 0.8,
          alternates: {
            languages: Object.fromEntries(
              locales.map((l) => [l, `${baseUrl}/${l}/${article.category}/${article.slug}`]),
            ),
          },
        });
      }
    }
  } catch (error) {
    console.error("[Sitemap] Failed to fetch articles from Supabase:", error);
  }

  return entries;
}
