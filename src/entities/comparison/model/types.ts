import type { ToolSlug } from "@/entities/tool";

export interface ComparisonFeature {
  key: string;
  weToolkit: boolean | string;
  competitor: boolean | string;
}

export interface Comparison {
  slug: string;
  toolSlug: ToolSlug;
  competitorName: string;
  keywords: string[];
}

export type ComparisonSlug =
  | "json-formatter-vs-jsonlint"
  | "json-formatter-vs-jsonformatter-org"
  | "jwt-decoder-vs-jwt-io"
  | "image-resizer-vs-tinypng"
  | "hash-generator-vs-online-tools"
  | "regex-tester-vs-regex101";
