import type { ToolSlug } from "@/entities/tool";

export type GlossaryTermSlug =
  | "json"
  | "jwt"
  | "base64"
  | "uuid"
  | "sha"
  | "md5"
  | "url-encoding"
  | "regex"
  | "yaml"
  | "xml"
  | "csv"
  | "html-entity"
  | "cron"
  | "mime-type"
  | "api"
  | "rest"
  | "oauth"
  | "utf-8"
  | "hex"
  | "binary"
  | "query-string"
  | "data-uri"
  | "json-schema"
  | "cors"
  | "minification"
  | "hashing"
  | "encoding";

export interface GlossaryTerm {
  slug: GlossaryTermSlug;
  term: string;
  acronymFor?: string;
  shortDefinition: string;
  fullDefinition: string;
  examples: string[];
  useCases: string[];
  relatedTerms: GlossaryTermSlug[];
  relatedTools: ToolSlug[];
  category:
    | "data-formats"
    | "security"
    | "encoding"
    | "web"
    | "programming"
    | "standards";
  seoKeywords: string[];
}
