export const TOOL_SLUGS = [
  "json-formatter",
  "base64-converter",
  "uuid-generator",
  "timestamp-converter",
  "url-encoder",
  "hash-generator",
  "jwt-decoder",
  "html-entity-converter",
  "color-converter",
  "regex-tester",
  "word-counter",
  "case-converter",
  "slug-generator",
  "password-generator",
  "number-base-converter",
  "csv-json-converter",
  "query-string-parser",
  "json-to-typescript",
  "text-sorter",
  "duplicate-line-remover",
] as const;

export type ToolSlug = (typeof TOOL_SLUGS)[number];

export type ToolIconName =
  | "braces"
  | "binary"
  | "fingerprint"
  | "clock"
  | "link"
  | "hash"
  | "key"
  | "code"
  | "palette"
  | "regex"
  | "text"
  | "case"
  | "wand"
  | "lock"
  | "calculator"
  | "table"
  | "list"
  | "file-code"
  | "sort"
  | "copy-minus";

export type ToolCategory = "data" | "text" | "generate" | "convert" | "test";

export interface ToolDefinition {
  slug: ToolSlug;
  index: string;
  icon: ToolIconName;
  accent: "orange" | "blue" | "green";
  category: ToolCategory;
  featured?: boolean;
}

export const TOOLS: readonly ToolDefinition[] = [
  {
    slug: "json-formatter",
    index: "01",
    icon: "braces",
    accent: "orange",
    category: "data",
    featured: true,
  },
  {
    slug: "base64-converter",
    index: "02",
    icon: "binary",
    accent: "blue",
    category: "data",
    featured: true,
  },
  {
    slug: "uuid-generator",
    index: "03",
    icon: "fingerprint",
    accent: "green",
    category: "generate",
    featured: true,
  },
  {
    slug: "timestamp-converter",
    index: "04",
    icon: "clock",
    accent: "orange",
    category: "convert",
    featured: true,
  },
  {
    slug: "url-encoder",
    index: "05",
    icon: "link",
    accent: "blue",
    category: "text",
    featured: true,
  },
  {
    slug: "hash-generator",
    index: "06",
    icon: "hash",
    accent: "green",
    category: "generate",
    featured: true,
  },
  {
    slug: "jwt-decoder",
    index: "07",
    icon: "key",
    accent: "orange",
    category: "data",
    featured: true,
  },
  {
    slug: "html-entity-converter",
    index: "08",
    icon: "code",
    accent: "blue",
    category: "text",
  },
  {
    slug: "color-converter",
    index: "09",
    icon: "palette",
    accent: "green",
    category: "convert",
    featured: true,
  },
  {
    slug: "regex-tester",
    index: "10",
    icon: "regex",
    accent: "orange",
    category: "test",
    featured: true,
  },
  {
    slug: "word-counter",
    index: "11",
    icon: "text",
    accent: "blue",
    category: "text",
  },
  {
    slug: "case-converter",
    index: "12",
    icon: "case",
    accent: "green",
    category: "text",
  },
  {
    slug: "slug-generator",
    index: "13",
    icon: "wand",
    accent: "orange",
    category: "text",
  },
  {
    slug: "password-generator",
    index: "14",
    icon: "lock",
    accent: "blue",
    category: "generate",
    featured: true,
  },
  {
    slug: "number-base-converter",
    index: "15",
    icon: "calculator",
    accent: "green",
    category: "convert",
  },
  {
    slug: "csv-json-converter",
    index: "16",
    icon: "table",
    accent: "orange",
    category: "data",
    featured: true,
  },
  {
    slug: "query-string-parser",
    index: "17",
    icon: "list",
    accent: "blue",
    category: "data",
  },
  {
    slug: "json-to-typescript",
    index: "18",
    icon: "file-code",
    accent: "green",
    category: "data",
  },
  {
    slug: "text-sorter",
    index: "19",
    icon: "sort",
    accent: "orange",
    category: "text",
  },
  {
    slug: "duplicate-line-remover",
    index: "20",
    icon: "copy-minus",
    accent: "blue",
    category: "text",
  },
];

export const FEATURED_TOOLS = TOOLS.filter((tool) => tool.featured);

export function isToolSlug(value: string): value is ToolSlug {
  return TOOL_SLUGS.some((slug) => slug === value);
}

export function getToolDefinition(slug: ToolSlug) {
  const tool = TOOLS.find((candidate) => candidate.slug === slug);
  if (!tool) throw new Error(`Unknown tool: ${slug}`);
  return tool;
}

export function getRelatedTools(slug: ToolSlug, limit = 3) {
  const current = getToolDefinition(slug);
  const sameCategory = TOOLS.filter(
    (tool) => tool.slug !== slug && tool.category === current.category,
  );
  const remaining = TOOLS.filter(
    (tool) => tool.slug !== slug && tool.category !== current.category,
  );
  return [...sameCategory, ...remaining].slice(0, limit);
}
