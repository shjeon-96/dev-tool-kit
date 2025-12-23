export type ValidateTypeSlug =
  | "json"
  | "xml"
  | "yaml"
  | "html"
  | "css"
  | "email"
  | "url"
  | "regex"
  | "credit-card"
  | "phone";

export type LocaleKey = "en" | "ko" | "ja";

export interface ValidateType {
  slug: ValidateTypeSlug;
  name: string;
  category: "data" | "markup" | "format" | "input";
  content: Record<
    LocaleKey,
    {
      title: string;
      description: string;
      metaTitle: string;
      metaDescription: string;
      keywords: string[];
      validationRules: string[];
      useCases: string[];
    }
  >;
}
