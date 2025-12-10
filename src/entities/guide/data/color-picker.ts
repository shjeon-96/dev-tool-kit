import type { Guide } from "../model/types";

export const colorPickerGuide: Guide = {
  slug: "color-picker",
  sections: [
    {
      id: "what-is-color-picker",
      titleKey: "guides.color-picker.sections.whatIs.title",
      contentKey: "guides.color-picker.sections.whatIs.content",
    },
    {
      id: "color-formats",
      titleKey: "guides.color-picker.sections.colorFormats.title",
      contentKey: "guides.color-picker.sections.colorFormats.content",
      code: `// HEX Color
#FF5733
#ff5733 (lowercase)
#F53 (shorthand)

// RGB Color
rgb(255, 87, 51)
rgba(255, 87, 51, 0.5) // with alpha

// HSL Color
hsl(14, 100%, 60%)
hsla(14, 100%, 60%, 0.5) // with alpha`,
      language: "css",
    },
    {
      id: "how-to-use",
      titleKey: "guides.color-picker.sections.howToUse.title",
      contentKey: "guides.color-picker.sections.howToUse.content",
    },
    {
      id: "color-palettes",
      titleKey: "guides.color-picker.sections.colorPalettes.title",
      contentKey: "guides.color-picker.sections.colorPalettes.content",
    },
  ],
  relatedTools: ["gradient-generator", "box-shadow", "css-to-tailwind"],
  keywords: [
    "color picker from image",
    "hex color picker",
    "rgb to hex converter",
    "color palette generator",
    "eyedropper tool online",
    "image color extractor",
    "css color picker",
  ],
  difficulty: "beginner",
  readTime: 4,
};
