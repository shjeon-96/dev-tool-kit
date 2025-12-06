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
  | "color-picker";
