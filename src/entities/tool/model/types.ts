import type { LucideIcon } from "lucide-react";

export type ToolCategory = "text" | "media" | "security" | "converters";

export interface Tool {
  title: string;
  description: string;
  icon: LucideIcon;
  category: ToolCategory;
}

export type ToolSlug =
  | "json-formatter"
  | "jwt-decoder"
  | "image-resizer"
  | "unix-timestamp"
  | "base64-converter"
  | "app-icon-generator"
  | "qr-generator"
  | "color-picker"
  | "url-parser"
  | "uuid-generator"
  | "base-converter"
  | "hash-generator"
  | "sql-formatter"
  | "cron-parser"
  | "markdown-preview"
  | "diff-checker"
  | "lorem-generator"
  | "url-encoder"
  | "html-entity"
  | "box-shadow"
  | "gradient-generator"
  | "ua-parser"
  | "regex-tester"
  | "meta-generator"
  | "curl-builder"
  | "svg-optimizer"
  | "css-to-tailwind"
  | "prettier-playground"
  | "json-to-typescript"
  | "css-minifier"
  | "text-case-converter";
