import type { Guide } from "../model/types";

export const metaGeneratorGuide: Guide = {
  slug: "meta-generator",
  sections: [
    {
      id: "what-is-meta-tag",
      titleKey: "guides.meta-generator.sections.whatIs.title",
      contentKey: "guides.meta-generator.sections.whatIs.content",
      code: `<!-- Essential Meta Tags -->
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="Page description here">
<title>Page Title</title>`,
      language: "html",
    },
    {
      id: "og-tags",
      titleKey: "guides.meta-generator.sections.og.title",
      contentKey: "guides.meta-generator.sections.og.content",
      code: `<!-- Open Graph Meta Tags -->
<meta property="og:title" content="Page Title">
<meta property="og:description" content="Description">
<meta property="og:image" content="https://example.com/image.jpg">
<meta property="og:url" content="https://example.com/page">
<meta property="og:type" content="website">`,
      language: "html",
    },
    {
      id: "how-to-use",
      titleKey: "guides.meta-generator.sections.howToUse.title",
      contentKey: "guides.meta-generator.sections.howToUse.content",
    },
    {
      id: "twitter-cards",
      titleKey: "guides.meta-generator.sections.twitter.title",
      contentKey: "guides.meta-generator.sections.twitter.content",
      code: `<!-- Twitter Card Meta Tags -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Page Title">
<meta name="twitter:description" content="Description">
<meta name="twitter:image" content="https://example.com/image.jpg">`,
      language: "html",
    },
  ],
  relatedTools: ["url-parser", "json-formatter", "html-entity"],
  keywords: [
    "meta tag generator",
    "og tag generator",
    "social media meta tags",
    "seo meta generator",
    "open graph generator",
    "twitter card generator",
    "html meta tags",
  ],
  difficulty: "beginner",
  readTime: 5,
};
