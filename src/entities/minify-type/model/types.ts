export type MinifyTypeSlug =
  | "json"
  | "javascript"
  | "css"
  | "html"
  | "xml"
  | "svg"
  | "sql";

export type LocaleKey = "en" | "ko" | "ja";

export interface MinifyType {
  slug: MinifyTypeSlug;
  name: string;
  fileExtension: string;
  mimeType: string;
  category: "data" | "code" | "markup";
  content: Record<
    LocaleKey,
    {
      title: string;
      description: string;
      metaTitle: string;
      metaDescription: string;
      keywords: string[];
      benefits: string[];
      useCases: string[];
    }
  >;
}
