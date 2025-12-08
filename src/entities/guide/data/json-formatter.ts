import type { Guide } from "../model/types";

export const jsonFormatterGuide: Guide = {
  slug: "json-formatter",
  sections: [
    {
      id: "what-is-json",
      titleKey: "guides.json-formatter.sections.whatIsJson.title",
      contentKey: "guides.json-formatter.sections.whatIsJson.content",
      code: `{
  "name": "John Doe",
  "age": 30,
  "email": "john@example.com",
  "isActive": true,
  "tags": ["developer", "designer"]
}`,
      language: "json",
    },
    {
      id: "common-errors",
      titleKey: "guides.json-formatter.sections.commonErrors.title",
      contentKey: "guides.json-formatter.sections.commonErrors.content",
      code: `// ❌ Missing quotes around keys
{ name: "John" }

// ✅ Correct
{ "name": "John" }

// ❌ Trailing comma
{ "name": "John", }

// ✅ Correct
{ "name": "John" }

// ❌ Single quotes
{ 'name': 'John' }

// ✅ Correct
{ "name": "John" }`,
      language: "javascript",
    },
    {
      id: "how-to-use",
      titleKey: "guides.json-formatter.sections.howToUse.title",
      contentKey: "guides.json-formatter.sections.howToUse.content",
    },
    {
      id: "advanced-features",
      titleKey: "guides.json-formatter.sections.advancedFeatures.title",
      contentKey: "guides.json-formatter.sections.advancedFeatures.content",
      code: `// Minified JSON (saves bandwidth)
{"name":"John","age":30,"email":"john@example.com"}

// Formatted JSON (readable)
{
  "name": "John",
  "age": 30,
  "email": "john@example.com"
}`,
      language: "json",
    },
    {
      id: "api-debugging",
      titleKey: "guides.json-formatter.sections.apiDebugging.title",
      contentKey: "guides.json-formatter.sections.apiDebugging.content",
      code: `// API Response Example
{
  "status": 200,
  "data": {
    "users": [
      { "id": 1, "name": "Alice" },
      { "id": 2, "name": "Bob" }
    ],
    "pagination": {
      "page": 1,
      "total": 100
    }
  }
}`,
      language: "json",
    },
  ],
  relatedTools: ["jwt-decoder", "base64-converter", "prettier-playground"],
  keywords: [
    "json format error fix",
    "invalid json debug",
    "json syntax error",
    "json validator online",
    "format json api response",
    "minify json online",
    "json beautifier",
    "fix json parsing error",
  ],
  difficulty: "beginner",
  readTime: 5,
};
