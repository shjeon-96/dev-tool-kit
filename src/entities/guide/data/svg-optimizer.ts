import type { Guide } from "../model/types";

export const svgOptimizerGuide: Guide = {
  slug: "svg-optimizer",
  sections: [
    {
      id: "what-is-svg-optimization",
      titleKey: "guides.svg-optimizer.sections.whatIs.title",
      contentKey: "guides.svg-optimizer.sections.whatIs.content",
      code: `<!-- Before optimization (verbose) -->
<svg xmlns="http://www.w3.org/2000/svg"
     xmlns:xlink="http://www.w3.org/1999/xlink"
     width="100px" height="100px">
  <circle cx="50" cy="50" r="40"
          style="fill: #ff0000; stroke: #000000;"/>
</svg>

<!-- After optimization (minified) -->
<svg xmlns="http://www.w3.org/2000/svg"
     width="100" height="100">
  <circle cx="50" cy="50" r="40" fill="#f00" stroke="#000"/>
</svg>`,
      language: "xml",
    },
    {
      id: "optimization-techniques",
      titleKey: "guides.svg-optimizer.sections.techniques.title",
      contentKey: "guides.svg-optimizer.sections.techniques.content",
    },
    {
      id: "how-to-use",
      titleKey: "guides.svg-optimizer.sections.howToUse.title",
      contentKey: "guides.svg-optimizer.sections.howToUse.content",
    },
    {
      id: "best-practices",
      titleKey: "guides.svg-optimizer.sections.bestPractices.title",
      contentKey: "guides.svg-optimizer.sections.bestPractices.content",
    },
  ],
  relatedTools: ["image-resizer", "base64-converter", "app-icon-generator"],
  keywords: [
    "svg optimizer online",
    "svg minifier",
    "optimize svg file",
    "compress svg",
    "svgo online",
    "svg cleaner",
    "reduce svg size",
  ],
  difficulty: "intermediate",
  readTime: 5,
};
