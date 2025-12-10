import type { Guide } from "../model/types";

export const uuidGeneratorGuide: Guide = {
  slug: "uuid-generator",
  sections: [
    {
      id: "what-is-uuid",
      titleKey: "guides.uuid-generator.sections.whatIs.title",
      contentKey: "guides.uuid-generator.sections.whatIs.content",
      code: `// UUID v4 Example (Random)
550e8400-e29b-41d4-a716-446655440000

// ULID Example (Sortable)
01ARZ3NDEKTSV4RRFFQ69G5FAV`,
      language: "text",
    },
    {
      id: "uuid-versions",
      titleKey: "guides.uuid-generator.sections.versions.title",
      contentKey: "guides.uuid-generator.sections.versions.content",
      code: `// UUID Versions
v1 - Timestamp + MAC address
v4 - Random (most common)
v5 - Namespace + Name (SHA-1)

// UUID v4 format
xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
         ^    ^
         |    variant (8,9,a,b)
         version (4)`,
      language: "text",
    },
    {
      id: "uuid-vs-ulid",
      titleKey: "guides.uuid-generator.sections.uuidVsUlid.title",
      contentKey: "guides.uuid-generator.sections.uuidVsUlid.content",
    },
    {
      id: "how-to-use",
      titleKey: "guides.uuid-generator.sections.howToUse.title",
      contentKey: "guides.uuid-generator.sections.howToUse.content",
    },
  ],
  relatedTools: ["hash-generator", "base64-converter", "json-formatter"],
  keywords: [
    "uuid generator online",
    "generate uuid v4",
    "ulid generator",
    "random uuid",
    "guid generator",
    "unique id generator",
    "uuid vs ulid",
  ],
  difficulty: "beginner",
  readTime: 5,
};
