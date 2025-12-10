import type { Guide } from "../model/types";

export const gradientGeneratorGuide: Guide = {
  slug: "gradient-generator",
  sections: [
    {
      id: "what-is-gradient",
      titleKey: "guides.gradient-generator.sections.whatIs.title",
      contentKey: "guides.gradient-generator.sections.whatIs.content",
      code: `/* Linear Gradient */
background: linear-gradient(90deg, #ff6b6b, #4ecdc4);

/* Radial Gradient */
background: radial-gradient(circle, #ff6b6b, #4ecdc4);

/* Conic Gradient */
background: conic-gradient(#ff6b6b, #4ecdc4, #ff6b6b);`,
      language: "css",
    },
    {
      id: "gradient-types",
      titleKey: "guides.gradient-generator.sections.types.title",
      contentKey: "guides.gradient-generator.sections.types.content",
    },
    {
      id: "how-to-use",
      titleKey: "guides.gradient-generator.sections.howToUse.title",
      contentKey: "guides.gradient-generator.sections.howToUse.content",
    },
    {
      id: "advanced-gradients",
      titleKey: "guides.gradient-generator.sections.advanced.title",
      contentKey: "guides.gradient-generator.sections.advanced.content",
      code: `/* Multi-color gradient */
background: linear-gradient(
  90deg,
  #ff6b6b 0%,
  #feca57 25%,
  #48dbfb 50%,
  #ff9ff3 75%,
  #54a0ff 100%
);

/* Gradient with transparency */
background: linear-gradient(
  to bottom,
  rgba(0, 0, 0, 0),
  rgba(0, 0, 0, 0.8)
);`,
      language: "css",
    },
  ],
  relatedTools: ["color-picker", "box-shadow", "css-to-tailwind"],
  keywords: [
    "css gradient generator",
    "linear gradient maker",
    "gradient background generator",
    "css gradient tool",
    "color gradient generator",
    "gradient creator online",
    "background gradient css",
  ],
  difficulty: "beginner",
  readTime: 5,
};
