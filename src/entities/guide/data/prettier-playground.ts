import type { Guide } from "../model/types";

export const prettierPlaygroundGuide: Guide = {
  slug: "prettier-playground",
  sections: [
    {
      id: "what-is-prettier",
      titleKey: "guides.prettier-playground.sections.whatIs.title",
      contentKey: "guides.prettier-playground.sections.whatIs.content",
      code: `// Before Prettier
const user={name:"John",age:30,email:"john@example.com",address:{city:"NYC",zip:"10001"}}

// After Prettier
const user = {
  name: "John",
  age: 30,
  email: "john@example.com",
  address: {
    city: "NYC",
    zip: "10001",
  },
};`,
      language: "javascript",
    },
    {
      id: "supported-languages",
      titleKey: "guides.prettier-playground.sections.languages.title",
      contentKey: "guides.prettier-playground.sections.languages.content",
    },
    {
      id: "how-to-use",
      titleKey: "guides.prettier-playground.sections.howToUse.title",
      contentKey: "guides.prettier-playground.sections.howToUse.content",
    },
    {
      id: "configuration",
      titleKey: "guides.prettier-playground.sections.config.title",
      contentKey: "guides.prettier-playground.sections.config.content",
      code: `// Common Prettier Options
{
  "printWidth": 80,        // Line width
  "tabWidth": 2,           // Spaces per tab
  "useTabs": false,        // Use spaces
  "semi": true,            // Semicolons
  "singleQuote": true,     // Single quotes
  "trailingComma": "es5",  // Trailing commas
  "bracketSpacing": true   // Spaces in objects
}`,
      language: "json",
    },
  ],
  relatedTools: ["json-formatter", "sql-formatter", "diff-checker"],
  keywords: [
    "prettier online",
    "code formatter online",
    "prettier playground",
    "javascript formatter",
    "typescript formatter",
    "code beautifier online",
    "prettier format code",
  ],
  difficulty: "beginner",
  readTime: 4,
};
