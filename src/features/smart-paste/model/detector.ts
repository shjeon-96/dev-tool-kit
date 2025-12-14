import type { ToolSlug } from "@/entities/tool";

export interface DetectionResult {
  tool: ToolSlug;
  confidence: number;
  reason: string;
}

// Regex patterns for content detection
const patterns = {
  // JSON detection
  json: /^\s*[\[{][\s\S]*[\]}]\s*$/,
  jsonLoose: /["']\s*:\s*["'{\[\d]/,

  // JWT detection (3 base64 parts separated by dots)
  jwt: /^eyJ[A-Za-z0-9_-]+\.eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/,

  // UUID detection
  uuid: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
  uuidMultiple:
    /[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/gi,

  // Base64 detection
  base64: /^[A-Za-z0-9+/]+={0,2}$/,
  base64Long: /^[A-Za-z0-9+/]{20,}={0,2}$/,

  // URL detection
  url: /^https?:\/\/[^\s]+$/i,
  urlWithParams: /^https?:\/\/[^\s]+\?[^\s]+$/i,

  // Unix timestamp (10 or 13 digits)
  unixTimestamp: /^1[0-9]{9,12}$/,

  // Hash detection (MD5, SHA-1, SHA-256, SHA-512)
  md5: /^[a-f0-9]{32}$/i,
  sha1: /^[a-f0-9]{40}$/i,
  sha256: /^[a-f0-9]{64}$/i,
  sha512: /^[a-f0-9]{128}$/i,

  // SQL detection
  sql: /^\s*(SELECT|INSERT|UPDATE|DELETE|CREATE|DROP|ALTER|WITH)\s+/i,

  // Cron expression
  cron: /^(\*|[0-9,\-\/]+)\s+(\*|[0-9,\-\/]+)\s+(\*|[0-9,\-\/]+)\s+(\*|[0-9,\-\/]+)\s+(\*|[0-9,\-\/]+)(\s+(\*|[0-9,\-\/]+))?$/,

  // Markdown detection
  markdown: /^#+\s|^\*\s|^-\s|^\d+\.\s|^>\s|\*\*[^*]+\*\*|\[.+\]\(.+\)/m,

  // HTML entities
  htmlEntities: /&[a-z]+;|&#\d+;|&#x[0-9a-f]+;/i,

  // Hex color
  hexColor: /^#([0-9a-f]{3}){1,2}$/i,

  // RGB/HSL color
  rgbColor: /^rgb\s*\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/i,
  hslColor: /^hsl\s*\(\s*\d+\s*,\s*\d+%?\s*,\s*\d+%?\s*\)$/i,

  // User Agent
  userAgent: /Mozilla\/\d|Chrome\/\d|Safari\/\d|Firefox\/\d|Edge\/\d/i,

  // CSS detection
  css: /[{};]\s*[\w-]+\s*:\s*[^;]+;/,

  // Regex pattern
  regex: /^\/[^/]+\/[gimsuvy]*$/,

  // cURL command
  curl: /^curl\s+/i,

  // SVG
  svg: /<svg[\s\S]*<\/svg>/i,
};

/**
 * Detect the most appropriate tool for the given content
 */
export function detectContentType(content: string): DetectionResult | null {
  if (!content || typeof content !== "string") {
    return null;
  }

  const trimmed = content.trim();

  // Check for empty content
  if (!trimmed) {
    return null;
  }

  // JWT detection (high priority - very specific pattern)
  if (patterns.jwt.test(trimmed)) {
    return {
      tool: "jwt-decoder",
      confidence: 0.98,
      reason: "JWT token detected",
    };
  }

  // JSON detection
  if (patterns.json.test(trimmed)) {
    try {
      JSON.parse(trimmed);
      return {
        tool: "json-formatter",
        confidence: 0.95,
        reason: "Valid JSON detected",
      };
    } catch {
      // Might still be JSON-like content
      if (patterns.jsonLoose.test(trimmed)) {
        return {
          tool: "json-formatter",
          confidence: 0.7,
          reason: "JSON-like content detected",
        };
      }
    }
  }

  // UUID detection
  if (patterns.uuid.test(trimmed)) {
    return {
      tool: "uuid-generator",
      confidence: 0.9,
      reason: "UUID detected",
    };
  }

  // SQL detection
  if (patterns.sql.test(trimmed)) {
    return {
      tool: "sql-formatter",
      confidence: 0.85,
      reason: "SQL query detected",
    };
  }

  // Cron expression
  if (patterns.cron.test(trimmed)) {
    return {
      tool: "cron-parser",
      confidence: 0.9,
      reason: "Cron expression detected",
    };
  }

  // Unix timestamp
  if (patterns.unixTimestamp.test(trimmed)) {
    return {
      tool: "unix-timestamp",
      confidence: 0.85,
      reason: "Unix timestamp detected",
    };
  }

  // URL with query parameters
  if (patterns.urlWithParams.test(trimmed)) {
    return {
      tool: "url-parser",
      confidence: 0.9,
      reason: "URL with parameters detected",
    };
  }

  // Simple URL
  if (patterns.url.test(trimmed)) {
    return {
      tool: "url-encoder",
      confidence: 0.75,
      reason: "URL detected",
    };
  }

  // Hash detection
  if (patterns.sha512.test(trimmed)) {
    return {
      tool: "hash-generator",
      confidence: 0.85,
      reason: "SHA-512 hash detected",
    };
  }
  if (patterns.sha256.test(trimmed)) {
    return {
      tool: "hash-generator",
      confidence: 0.85,
      reason: "SHA-256 hash detected",
    };
  }
  if (patterns.sha1.test(trimmed)) {
    return {
      tool: "hash-generator",
      confidence: 0.85,
      reason: "SHA-1 hash detected",
    };
  }
  if (patterns.md5.test(trimmed)) {
    return {
      tool: "hash-generator",
      confidence: 0.85,
      reason: "MD5 hash detected",
    };
  }

  // User Agent
  if (patterns.userAgent.test(trimmed)) {
    return {
      tool: "ua-parser",
      confidence: 0.9,
      reason: "User Agent string detected",
    };
  }

  // cURL command
  if (patterns.curl.test(trimmed)) {
    return {
      tool: "curl-builder",
      confidence: 0.9,
      reason: "cURL command detected",
    };
  }

  // SVG
  if (patterns.svg.test(trimmed)) {
    return {
      tool: "svg-optimizer",
      confidence: 0.9,
      reason: "SVG content detected",
    };
  }

  // Markdown (lower priority - common patterns)
  if (patterns.markdown.test(trimmed) && trimmed.length > 50) {
    return {
      tool: "markdown-preview",
      confidence: 0.7,
      reason: "Markdown content detected",
    };
  }

  // HTML entities
  if (patterns.htmlEntities.test(trimmed)) {
    return {
      tool: "html-entity",
      confidence: 0.75,
      reason: "HTML entities detected",
    };
  }

  // Color detection
  if (
    patterns.hexColor.test(trimmed) ||
    patterns.rgbColor.test(trimmed) ||
    patterns.hslColor.test(trimmed)
  ) {
    return {
      tool: "color-picker",
      confidence: 0.85,
      reason: "Color value detected",
    };
  }

  // Regex pattern
  if (patterns.regex.test(trimmed)) {
    return {
      tool: "regex-tester",
      confidence: 0.85,
      reason: "Regex pattern detected",
    };
  }

  // CSS detection
  if (patterns.css.test(trimmed)) {
    return {
      tool: "css-to-tailwind",
      confidence: 0.7,
      reason: "CSS code detected",
    };
  }

  // Base64 detection (lower priority - many false positives)
  if (patterns.base64Long.test(trimmed) && trimmed.length > 30) {
    return {
      tool: "base64-converter",
      confidence: 0.6,
      reason: "Base64 encoded content detected",
    };
  }

  return null;
}
