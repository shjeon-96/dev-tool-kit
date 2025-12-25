export interface BlogPost {
  slug: string;
  title: {
    en: string;
    ko: string;
    ja: string;
  };
  excerpt: {
    en: string;
    ko: string;
    ja: string;
  };
  content: {
    en: string;
    ko: string;
    ja: string;
  };
  author: string;
  date: string; // ISO 8601 format (YYYY-MM-DD)
  category: "technical" | "tutorial" | "announcement";
  tags: string[];
  readingTimeMinutes: number;
}
