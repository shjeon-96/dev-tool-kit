import type { Guide } from "../model/types";

export const markdownPreviewGuide: Guide = {
  slug: "markdown-preview",
  sections: [
    {
      id: "what-is-markdown",
      titleKey: "guides.markdown-preview.sections.whatIs.title",
      contentKey: "guides.markdown-preview.sections.whatIs.content",
      code: `# Heading 1
## Heading 2

**Bold text** and *italic text*

- List item 1
- List item 2

[Link](https://example.com)

\`inline code\``,
      language: "markdown",
    },
    {
      id: "syntax-guide",
      titleKey: "guides.markdown-preview.sections.syntax.title",
      contentKey: "guides.markdown-preview.sections.syntax.content",
      code: `# Headers
# H1 | ## H2 | ### H3

# Emphasis
**bold** | *italic* | ~~strikethrough~~

# Code
\`inline\` | \`\`\`block\`\`\`

# Lists
- Unordered | 1. Ordered

# Links & Images
[text](url) | ![alt](image-url)`,
      language: "markdown",
    },
    {
      id: "how-to-use",
      titleKey: "guides.markdown-preview.sections.howToUse.title",
      contentKey: "guides.markdown-preview.sections.howToUse.content",
    },
    {
      id: "advanced-features",
      titleKey: "guides.markdown-preview.sections.advanced.title",
      contentKey: "guides.markdown-preview.sections.advanced.content",
    },
  ],
  relatedTools: ["diff-checker", "json-formatter", "html-entity"],
  keywords: [
    "markdown preview online",
    "markdown editor",
    "markdown to html",
    "live markdown preview",
    "github markdown preview",
    "markdown renderer",
    "md preview",
  ],
  difficulty: "beginner",
  readTime: 5,
};
