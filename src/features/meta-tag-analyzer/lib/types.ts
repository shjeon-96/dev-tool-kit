export type IssueLevel = "error" | "warning" | "info";

export interface AnalysisIssue {
  type: string;
  level: IssueLevel;
  message: string;
  suggestion?: string;
}

export interface MetaTagInfo {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  robots?: string;
  viewport?: string;
  charset?: string;
}

export interface OpenGraphInfo {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  siteName?: string;
}

export interface TwitterCardInfo {
  card?: string;
  title?: string;
  description?: string;
  image?: string;
  site?: string;
  creator?: string;
}

export interface AnalysisResult {
  score: number;
  grade: string;
  meta: MetaTagInfo;
  openGraph: OpenGraphInfo;
  twitterCard: TwitterCardInfo;
  issues: AnalysisIssue[];
  h1Tags: string[];
  h2Tags: string[];
  imageCount: number;
  wordCount: number;
}

export const LIMITS = {
  TITLE_MIN: 30,
  TITLE_MAX: 60,
  TITLE_OPTIMAL: 50,
  DESCRIPTION_MIN: 120,
  DESCRIPTION_MAX: 160,
  DESCRIPTION_OPTIMAL: 150,
} as const;

export const SAMPLE_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Example Page - Best Practices for SEO</title>
  <meta name="description" content="Learn the best practices for SEO optimization. This comprehensive guide covers meta tags, Open Graph, and Twitter Cards.">
  <meta name="keywords" content="SEO, meta tags, optimization">
  <link rel="canonical" href="https://example.com/seo-guide">

  <!-- Open Graph -->
  <meta property="og:title" content="SEO Best Practices Guide">
  <meta property="og:description" content="Complete guide to SEO optimization">
  <meta property="og:image" content="https://example.com/og-image.png">
  <meta property="og:url" content="https://example.com/seo-guide">
  <meta property="og:type" content="article">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="SEO Best Practices">
  <meta name="twitter:description" content="Learn SEO optimization techniques">
</head>
<body>
  <h1>SEO Best Practices Guide</h1>
  <h2>Meta Tags</h2>
  <p>Content about meta tags...</p>
  <h2>Open Graph</h2>
  <p>Content about Open Graph...</p>
</body>
</html>`;
