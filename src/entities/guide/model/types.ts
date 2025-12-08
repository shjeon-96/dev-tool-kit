export interface GuideSection {
  id: string;
  titleKey: string; // i18n key for section title
  contentKey: string; // i18n key for section content
  code?: string;
  language?: string; // code language for syntax highlighting
}

export interface Guide {
  slug: string; // matches tool slug
  sections: GuideSection[];
  relatedTools: string[];
  keywords: string[]; // SEO long-tail keywords
  difficulty: "beginner" | "intermediate" | "advanced";
  readTime: number; // minutes
}

export type GuideSlug =
  | "json-formatter"
  | "jwt-decoder"
  | "base64-converter"
  | "regex-tester"
  | "hash-generator";
