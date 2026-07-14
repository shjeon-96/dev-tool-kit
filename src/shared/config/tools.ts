export const TOOL_SLUGS = [
  "json-formatter",
  "base64-converter",
  "uuid-generator",
  "timestamp-converter",
  "url-encoder",
  "hash-generator",
] as const;

export type ToolSlug = (typeof TOOL_SLUGS)[number];

export type ToolIconName =
  | "braces"
  | "binary"
  | "fingerprint"
  | "clock"
  | "link"
  | "hash";

export interface ToolDefinition {
  slug: ToolSlug;
  index: string;
  icon: ToolIconName;
  accent: "orange" | "blue" | "green";
}

export const TOOLS: readonly ToolDefinition[] = [
  { slug: "json-formatter", index: "01", icon: "braces", accent: "orange" },
  { slug: "base64-converter", index: "02", icon: "binary", accent: "blue" },
  { slug: "uuid-generator", index: "03", icon: "fingerprint", accent: "green" },
  { slug: "timestamp-converter", index: "04", icon: "clock", accent: "orange" },
  { slug: "url-encoder", index: "05", icon: "link", accent: "blue" },
  { slug: "hash-generator", index: "06", icon: "hash", accent: "green" },
];

export function isToolSlug(value: string): value is ToolSlug {
  return TOOL_SLUGS.some((slug) => slug === value);
}

export function getToolDefinition(slug: ToolSlug) {
  const tool = TOOLS.find((candidate) => candidate.slug === slug);
  if (!tool) throw new Error(`Unknown tool: ${slug}`);
  return tool;
}
