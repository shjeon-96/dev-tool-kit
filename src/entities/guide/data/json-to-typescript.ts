import type { Guide } from "../model/types";

export const jsonToTypescriptGuide: Guide = {
  slug: "json-to-typescript",
  sections: [
    {
      id: "what-is",
      titleKey: "guides.json-to-typescript.sections.whatIs.title",
      contentKey: "guides.json-to-typescript.sections.whatIs.content",
      code: `// JSON Input
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "isActive": true
}

// Generated TypeScript Interface
interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}`,
      language: "typescript",
    },
    {
      id: "type-inference",
      titleKey: "guides.json-to-typescript.sections.typeInference.title",
      contentKey: "guides.json-to-typescript.sections.typeInference.content",
      code: `// JSON Type → TypeScript Type
"string"     → string
123          → number
true/false   → boolean
null         → null
[]           → Array<T>
{}           → interface

// Nested objects
{
  "user": {
    "profile": {
      "avatar": "url"
    }
  }
}

// Generates
interface Root {
  user: User;
}
interface User {
  profile: Profile;
}
interface Profile {
  avatar: string;
}`,
      language: "typescript",
    },
    {
      id: "how-to-use",
      titleKey: "guides.json-to-typescript.sections.howToUse.title",
      contentKey: "guides.json-to-typescript.sections.howToUse.content",
    },
    {
      id: "api-response",
      titleKey: "guides.json-to-typescript.sections.apiResponse.title",
      contentKey: "guides.json-to-typescript.sections.apiResponse.content",
      code: `// API Response JSON
{
  "data": {
    "users": [
      { "id": 1, "name": "Alice" },
      { "id": 2, "name": "Bob" }
    ],
    "total": 2,
    "page": 1
  },
  "status": "success"
}

// Use in your code
async function fetchUsers(): Promise<ApiResponse> {
  const res = await fetch('/api/users');
  return res.json();
}`,
      language: "typescript",
    },
  ],
  relatedTools: ["json-formatter", "prettier-playground", "jwt-decoder"],
  keywords: [
    "json to typescript",
    "json to interface",
    "generate typescript types",
    "json to ts converter",
    "typescript interface generator",
    "json schema to typescript",
    "api response to typescript",
    "json type generator",
  ],
  difficulty: "beginner",
  readTime: 5,
};
