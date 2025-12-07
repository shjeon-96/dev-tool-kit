export interface CheatsheetItem {
  code: string;
  name: string;
  description: string;
  example?: string;
  category?: string;
}

export interface Cheatsheet {
  slug: string;
  title: string;
  description: string;
  items: CheatsheetItem[];
}

export type CheatsheetSlug = "git" | "http-status" | "regex" | "mime-types";

export const CHEATSHEET_SLUGS: CheatsheetSlug[] = [
  "git",
  "http-status",
  "regex",
  "mime-types",
] as const;
