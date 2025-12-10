import type { Guide } from "../model/types";

export const baseConverterGuide: Guide = {
  slug: "base-converter",
  sections: [
    {
      id: "what-is-number-base",
      titleKey: "guides.base-converter.sections.whatIs.title",
      contentKey: "guides.base-converter.sections.whatIs.content",
      code: `// Same number in different bases
Decimal (base 10):  255
Binary (base 2):    11111111
Octal (base 8):     377
Hexadecimal (base 16): FF`,
      language: "text",
    },
    {
      id: "common-bases",
      titleKey: "guides.base-converter.sections.commonBases.title",
      contentKey: "guides.base-converter.sections.commonBases.content",
    },
    {
      id: "how-to-use",
      titleKey: "guides.base-converter.sections.howToUse.title",
      contentKey: "guides.base-converter.sections.howToUse.content",
    },
    {
      id: "programming-usage",
      titleKey: "guides.base-converter.sections.programming.title",
      contentKey: "guides.base-converter.sections.programming.content",
      code: `// JavaScript number literals
const decimal = 255;
const binary = 0b11111111;
const octal = 0o377;
const hex = 0xFF;

// Converting in JavaScript
(255).toString(2)  // "11111111"
(255).toString(16) // "ff"
parseInt("FF", 16) // 255`,
      language: "javascript",
    },
  ],
  relatedTools: ["hash-generator", "base64-converter", "color-picker"],
  keywords: [
    "binary to decimal",
    "hex to decimal",
    "number base converter",
    "binary converter",
    "hexadecimal converter",
    "octal converter",
    "radix converter",
  ],
  difficulty: "beginner",
  readTime: 5,
};
