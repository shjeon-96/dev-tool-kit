import type { ToolSlug } from "@/entities/tool";

export type CompetitorSlug =
  // 기존 (6)
  | "jsonformatter-org"
  | "cyberchef"
  | "devtoys"
  | "it-tools"
  | "transform-tools"
  | "jsonlint"
  // JSON & Code (4)
  | "codebeautify"
  | "freeformatter"
  | "beautifier-io"
  | "jsoncrack"
  // API & Developer (3)
  | "jwt-io"
  | "regex101"
  | "reqbin"
  // Encoding & Security (3)
  | "base64decode"
  | "md5hashgenerator"
  | "uuidgenerator-net"
  // Image & Media (4)
  | "tinypng"
  | "squoosh"
  | "remove-bg"
  | "canva";

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
