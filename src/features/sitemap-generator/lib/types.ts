/**
 * Sitemap Generator Types
 */

export interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: ChangeFrequency;
  priority?: number;
}

export type ChangeFrequency =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

export interface SitemapOptions {
  includeLastmod: boolean;
  defaultChangefreq: ChangeFrequency;
  defaultPriority: number;
  prettyPrint: boolean;
}

export const DEFAULT_OPTIONS: SitemapOptions = {
  includeLastmod: true,
  defaultChangefreq: "weekly",
  defaultPriority: 0.5,
  prettyPrint: true,
};

export const CHANGE_FREQUENCIES: { value: ChangeFrequency; label: string }[] = [
  { value: "always", label: "Always" },
  { value: "hourly", label: "Hourly" },
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
  { value: "never", label: "Never" },
];

export const PRIORITY_OPTIONS = [
  { value: 1.0, label: "1.0 (Highest)" },
  { value: 0.9, label: "0.9" },
  { value: 0.8, label: "0.8 (High)" },
  { value: 0.7, label: "0.7" },
  { value: 0.6, label: "0.6" },
  { value: 0.5, label: "0.5 (Default)" },
  { value: 0.4, label: "0.4" },
  { value: 0.3, label: "0.3 (Low)" },
  { value: 0.2, label: "0.2" },
  { value: 0.1, label: "0.1 (Lowest)" },
];
