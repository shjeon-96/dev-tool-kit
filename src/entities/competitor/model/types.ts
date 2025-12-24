import type { ToolSlug } from "@/entities/tool";

export type CompetitorSlug =
  | "jsonformatter-org"
  | "cyberchef"
  | "devtoys"
  | "it-tools"
  | "transform-tools"
  | "jsonlint";

export interface ComparisonPoint {
  feature: string;
  webToolkit: string | boolean;
  competitor: string | boolean;
  advantage: "web-toolkit" | "competitor" | "tie";
}

export interface Competitor {
  slug: CompetitorSlug;
  name: string;
  url: string;
  description: string;
  category: "json" | "multi-tool" | "desktop" | "online";
  logo?: string;
  comparisonPoints: ComparisonPoint[];
  overlappingTools: ToolSlug[];
  weaknesses: string[];
  targetKeywords: string[];
  searchVolume: number;
}
