import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://web-toolkit.app";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/", // API routes
        "/s/", // Short URL redirects
        "/_next/", // Next.js internals
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
