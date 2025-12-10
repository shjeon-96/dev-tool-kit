import type { Guide } from "../model/types";

export const boxShadowGuide: Guide = {
  slug: "box-shadow",
  sections: [
    {
      id: "what-is-box-shadow",
      titleKey: "guides.box-shadow.sections.whatIs.title",
      contentKey: "guides.box-shadow.sections.whatIs.content",
      code: `/* Box Shadow Syntax */
box-shadow: offset-x offset-y blur spread color;

/* Example */
box-shadow: 0px 4px 6px -1px rgba(0, 0, 0, 0.1);

/* Multiple Shadows */
box-shadow:
  0 1px 3px rgba(0,0,0,0.12),
  0 1px 2px rgba(0,0,0,0.24);`,
      language: "css",
    },
    {
      id: "shadow-properties",
      titleKey: "guides.box-shadow.sections.properties.title",
      contentKey: "guides.box-shadow.sections.properties.content",
    },
    {
      id: "how-to-use",
      titleKey: "guides.box-shadow.sections.howToUse.title",
      contentKey: "guides.box-shadow.sections.howToUse.content",
    },
    {
      id: "design-tips",
      titleKey: "guides.box-shadow.sections.tips.title",
      contentKey: "guides.box-shadow.sections.tips.content",
      code: `/* Subtle elevation */
box-shadow: 0 1px 3px rgba(0,0,0,0.1);

/* Card hover effect */
box-shadow: 0 10px 40px rgba(0,0,0,0.15);

/* Inset shadow (inner) */
box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);`,
      language: "css",
    },
  ],
  relatedTools: ["gradient-generator", "color-picker", "css-to-tailwind"],
  keywords: [
    "css box shadow generator",
    "shadow generator online",
    "box shadow css",
    "drop shadow generator",
    "css shadow maker",
    "box shadow examples",
    "shadow effect css",
  ],
  difficulty: "beginner",
  readTime: 4,
};
