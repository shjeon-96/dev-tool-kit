import type { Guide } from "../model/types";

export const cssMinifierGuide: Guide = {
  slug: "css-minifier",
  sections: [
    {
      id: "what-is",
      titleKey: "guides.css-minifier.sections.whatIs.title",
      contentKey: "guides.css-minifier.sections.whatIs.content",
      code: `/* Before minification: 156 bytes */
.container {
  display: flex;
  flex-direction: column;
  padding: 16px;
  margin: 0 auto;
}

/* After minification: 78 bytes (50% reduction) */
.container{display:flex;flex-direction:column;padding:16px;margin:0 auto}`,
      language: "css",
    },
    {
      id: "benefits",
      titleKey: "guides.css-minifier.sections.benefits.title",
      contentKey: "guides.css-minifier.sections.benefits.content",
      code: `/* Typical file size reductions */
Original:    100 KB
Minified:     65 KB  (-35%)
+ Gzip:       15 KB  (-85%)

/* Performance impact */
Faster download → Better FCP/LCP
Less parsing → Faster render`,
      language: "text",
    },
    {
      id: "how-to-use",
      titleKey: "guides.css-minifier.sections.howToUse.title",
      contentKey: "guides.css-minifier.sections.howToUse.content",
    },
    {
      id: "what-gets-removed",
      titleKey: "guides.css-minifier.sections.removed.title",
      contentKey: "guides.css-minifier.sections.removed.content",
      code: `/* Removed during minification */
✓ Comments:     /* this is removed */
✓ Whitespace:   spaces, tabs, newlines
✓ Trailing ;    last semicolon in blocks
✓ Zero units:   0px → 0

/* Preserved */
✗ Selector names (use CSS obfuscation separately)
✗ Property values
✗ Important strings and URLs`,
      language: "text",
    },
  ],
  relatedTools: ["prettier-playground", "css-to-tailwind", "svg-optimizer"],
  keywords: [
    "css minifier online",
    "minify css",
    "css compressor",
    "reduce css file size",
    "css optimizer",
    "compress css online",
    "css minification tool",
    "minify stylesheet",
  ],
  difficulty: "beginner",
  readTime: 4,
};
