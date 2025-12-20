import type { Comparison, ComparisonSlug } from "./types";

export const comparisons: Record<ComparisonSlug, Comparison> = {
  "json-formatter-vs-jsonlint": {
    slug: "json-formatter-vs-jsonlint",
    toolSlug: "json-formatter",
    competitorName: "JSONLint",
    keywords: [
      "json formatter vs jsonlint",
      "jsonlint alternative",
      "best json formatter",
      "json validator comparison",
    ],
  },
  "json-formatter-vs-jsonformatter-org": {
    slug: "json-formatter-vs-jsonformatter-org",
    toolSlug: "json-formatter",
    competitorName: "JSONFormatter.org",
    keywords: [
      "json formatter comparison",
      "jsonformatter.org alternative",
      "online json formatter",
      "free json formatter",
    ],
  },
  "jwt-decoder-vs-jwt-io": {
    slug: "jwt-decoder-vs-jwt-io",
    toolSlug: "jwt-decoder",
    competitorName: "JWT.io",
    keywords: [
      "jwt decoder vs jwt.io",
      "jwt.io alternative",
      "jwt token decoder comparison",
      "best jwt decoder",
    ],
  },
  "image-resizer-vs-tinypng": {
    slug: "image-resizer-vs-tinypng",
    toolSlug: "image-resizer",
    competitorName: "TinyPNG",
    keywords: [
      "image resizer vs tinypng",
      "tinypng alternative",
      "image compression comparison",
      "free image resizer",
    ],
  },
  "hash-generator-vs-online-tools": {
    slug: "hash-generator-vs-online-tools",
    toolSlug: "hash-generator",
    competitorName: "Online Hash Tools",
    keywords: [
      "hash generator comparison",
      "md5 generator alternative",
      "sha256 generator online",
      "best hash generator",
    ],
  },
  "regex-tester-vs-regex101": {
    slug: "regex-tester-vs-regex101",
    toolSlug: "regex-tester",
    competitorName: "Regex101",
    keywords: [
      "regex tester vs regex101",
      "regex101 alternative",
      "regex tester comparison",
      "best regex tester",
    ],
  },
};

export function getComparisonSlugs(): ComparisonSlug[] {
  return Object.keys(comparisons) as ComparisonSlug[];
}

export function getComparison(slug: string): Comparison | undefined {
  return comparisons[slug as ComparisonSlug];
}

export function getComparisonsByTool(toolSlug: string): Comparison[] {
  return Object.values(comparisons).filter((c) => c.toolSlug === toolSlug);
}

export function getAllComparisons(): Comparison[] {
  return Object.values(comparisons);
}
