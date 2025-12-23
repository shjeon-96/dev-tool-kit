export type DiffTypeSlug =
  | "text"
  | "json"
  | "xml"
  | "html"
  | "css"
  | "javascript"
  | "markdown"
  | "yaml";

export type LocaleKey = "en" | "ko" | "ja";

export interface DiffType {
  slug: DiffTypeSlug;
  name: string;
  fileExtension: string;
  category: "text" | "data" | "code" | "markup";
  content: Record<
    LocaleKey,
    {
      title: string;
      description: string;
      metaTitle: string;
      metaDescription: string;
      keywords: string[];
      features: string[];
      useCases: string[];
    }
  >;
}
