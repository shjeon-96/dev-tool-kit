import type { Guide } from "../model/types";

export const diffCheckerGuide: Guide = {
  slug: "diff-checker",
  sections: [
    {
      id: "what-is-diff",
      titleKey: "guides.diff-checker.sections.whatIs.title",
      contentKey: "guides.diff-checker.sections.whatIs.content",
      code: `// Original
function hello() {
  console.log("Hello");
}

// Modified
function hello(name) {
  console.log("Hello, " + name);
}

// Diff output shows:
// - function hello() {
// + function hello(name) {
// -   console.log("Hello");
// +   console.log("Hello, " + name);`,
      language: "javascript",
    },
    {
      id: "diff-types",
      titleKey: "guides.diff-checker.sections.types.title",
      contentKey: "guides.diff-checker.sections.types.content",
    },
    {
      id: "how-to-use",
      titleKey: "guides.diff-checker.sections.howToUse.title",
      contentKey: "guides.diff-checker.sections.howToUse.content",
    },
    {
      id: "use-cases",
      titleKey: "guides.diff-checker.sections.useCases.title",
      contentKey: "guides.diff-checker.sections.useCases.content",
    },
  ],
  relatedTools: ["json-formatter", "markdown-preview", "prettier-playground"],
  keywords: [
    "diff checker online",
    "compare text online",
    "text diff tool",
    "code diff viewer",
    "compare two files",
    "online diff",
    "text comparison tool",
  ],
  difficulty: "beginner",
  readTime: 4,
};
