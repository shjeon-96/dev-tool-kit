import type { Guide } from "../model/types";

export const loremGeneratorGuide: Guide = {
  slug: "lorem-generator",
  sections: [
    {
      id: "what-is-lorem",
      titleKey: "guides.lorem-generator.sections.whatIs.title",
      contentKey: "guides.lorem-generator.sections.whatIs.content",
      code: `Lorem ipsum dolor sit amet, consectetur
adipiscing elit. Sed do eiusmod tempor
incididunt ut labore et dolore magna aliqua.`,
      language: "text",
    },
    {
      id: "generation-options",
      titleKey: "guides.lorem-generator.sections.options.title",
      contentKey: "guides.lorem-generator.sections.options.content",
    },
    {
      id: "how-to-use",
      titleKey: "guides.lorem-generator.sections.howToUse.title",
      contentKey: "guides.lorem-generator.sections.howToUse.content",
    },
    {
      id: "design-usage",
      titleKey: "guides.lorem-generator.sections.design.title",
      contentKey: "guides.lorem-generator.sections.design.content",
    },
  ],
  relatedTools: ["markdown-preview", "json-formatter", "uuid-generator"],
  keywords: [
    "lorem ipsum generator",
    "placeholder text generator",
    "dummy text generator",
    "lipsum generator",
    "random text generator",
    "filler text online",
  ],
  difficulty: "beginner",
  readTime: 3,
};
