import type { ToolSlug } from "@/entities/tool";

export interface ParsedIntent {
  action: string;
  targetTool: ToolSlug | null;
  confidence: number;
  originalQuery: string;
}

// Keywords that map to specific tools
const TOOL_KEYWORDS: Record<string, ToolSlug[]> = {
  // JSON related
  json: ["json-formatter"],
  format: ["json-formatter", "sql-formatter", "prettier-playground"],
  validate: ["json-formatter"],
  prettify: ["json-formatter", "prettier-playground"],
  minify: ["json-formatter"],

  // JWT related
  jwt: ["jwt-decoder"],
  token: ["jwt-decoder"],
  decode: ["jwt-decoder", "base64-converter", "url-encoder"],

  // Image related
  image: ["image-resizer", "app-icon-generator", "color-picker"],
  resize: ["image-resizer"],
  compress: ["image-resizer"],
  icon: ["app-icon-generator"],
  favicon: ["app-icon-generator"],

  // Encoding/Conversion
  base64: ["base64-converter"],
  encode: ["base64-converter", "url-encoder", "html-entity"],
  url: ["url-encoder", "url-parser"],
  html: ["html-entity"],
  entity: ["html-entity"],

  // Hash/Security
  hash: ["hash-generator"],
  md5: ["hash-generator"],
  sha: ["hash-generator"],
  sha256: ["hash-generator"],

  // Code
  sql: ["sql-formatter"],
  regex: ["regex-tester"],
  regexp: ["regex-tester"],
  regular: ["regex-tester"],
  css: ["css-to-tailwind", "gradient-generator", "box-shadow"],
  tailwind: ["css-to-tailwind"],
  prettier: ["prettier-playground"],
  code: ["prettier-playground"],

  // Generators
  uuid: ["uuid-generator"],
  guid: ["uuid-generator"],
  qr: ["qr-generator"],
  qrcode: ["qr-generator"],
  lorem: ["lorem-generator"],
  ipsum: ["lorem-generator"],
  text: ["lorem-generator"],
  color: ["color-picker", "gradient-generator"],
  palette: ["color-picker"],
  gradient: ["gradient-generator"],
  shadow: ["box-shadow"],

  // Time/Date
  timestamp: ["unix-timestamp"],
  unix: ["unix-timestamp"],
  time: ["unix-timestamp"],
  date: ["unix-timestamp"],
  cron: ["cron-parser"],

  // Other
  diff: ["diff-checker"],
  compare: ["diff-checker"],
  markdown: ["markdown-preview"],
  preview: ["markdown-preview"],
  meta: ["meta-generator"],
  seo: ["meta-generator"],
  user: ["ua-parser"],
  agent: ["ua-parser"],
  browser: ["ua-parser"],
  curl: ["curl-builder"],
  svg: ["svg-optimizer"],
  optimize: ["svg-optimizer"],
};

// Action phrases that indicate user intent
const ACTION_PATTERNS: { pattern: RegExp; tools: ToolSlug[] }[] = [
  {
    pattern: /format\s*(my\s*)?(json|sql|code)/i,
    tools: ["json-formatter", "sql-formatter", "prettier-playground"],
  },
  {
    pattern: /decode\s*(my\s*)?(jwt|token|base64)/i,
    tools: ["jwt-decoder", "base64-converter"],
  },
  {
    pattern: /resize\s*(my\s*)?(image|photo|picture)/i,
    tools: ["image-resizer"],
  },
  {
    pattern: /generate\s*(a\s*)?(uuid|guid|qr|qrcode|hash|lorem)/i,
    tools: [
      "uuid-generator",
      "qr-generator",
      "hash-generator",
      "lorem-generator",
    ],
  },
  {
    pattern: /convert\s*(to\s*)?(base64|url|timestamp)/i,
    tools: ["base64-converter", "url-encoder", "unix-timestamp"],
  },
  {
    pattern: /parse\s*(my\s*)?(url|cron|user\s*agent)/i,
    tools: ["url-parser", "cron-parser", "ua-parser"],
  },
  { pattern: /test\s*(my\s*)?(regex|regexp)/i, tools: ["regex-tester"] },
  { pattern: /preview\s*(my\s*)?(markdown|md)/i, tools: ["markdown-preview"] },
  { pattern: /pick\s*(a\s*)?(color|colour)/i, tools: ["color-picker"] },
  {
    pattern: /create\s*(a\s*)?(gradient|shadow)/i,
    tools: ["gradient-generator", "box-shadow"],
  },
  { pattern: /check\s*(the\s*)?(diff|difference)/i, tools: ["diff-checker"] },
  { pattern: /optimize\s*(my\s*)?(svg)/i, tools: ["svg-optimizer"] },
  { pattern: /build\s*(a\s*)?(curl)/i, tools: ["curl-builder"] },
];

export function parseNaturalLanguageQuery(query: string): ParsedIntent[] {
  const normalizedQuery = query.toLowerCase().trim();
  const results: Map<ToolSlug, number> = new Map();

  // Check action patterns first (higher confidence)
  for (const { pattern, tools } of ACTION_PATTERNS) {
    if (pattern.test(normalizedQuery)) {
      for (const tool of tools) {
        results.set(tool, (results.get(tool) || 0) + 0.8);
      }
    }
  }

  // Check keyword matches
  const words = normalizedQuery.split(/\s+/);
  for (const word of words) {
    const matchingTools = TOOL_KEYWORDS[word];
    if (matchingTools) {
      for (const tool of matchingTools) {
        results.set(tool, (results.get(tool) || 0) + 0.5);
      }
    }
  }

  // Convert to array and sort by confidence
  const intents: ParsedIntent[] = Array.from(results.entries())
    .map(([tool, confidence]) => ({
      action: "navigate",
      targetTool: tool,
      confidence: Math.min(confidence, 1), // Cap at 1
      originalQuery: query,
    }))
    .sort((a, b) => b.confidence - a.confidence);

  return intents;
}

export function findBestMatch(query: string): ToolSlug | null {
  const intents = parseNaturalLanguageQuery(query);
  if (intents.length > 0 && intents[0].confidence >= 0.5) {
    return intents[0].targetTool;
  }
  return null;
}
