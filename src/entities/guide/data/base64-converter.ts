import type { Guide } from "../model/types";

export const base64ConverterGuide: Guide = {
  slug: "base64-converter",
  sections: [
    {
      id: "what-is-base64",
      titleKey: "guides.base64-converter.sections.whatIsBase64.title",
      contentKey: "guides.base64-converter.sections.whatIsBase64.content",
      code: `// Original text
Hello, World!

// Base64 encoded
SGVsbG8sIFdvcmxkIQ==`,
      language: "text",
    },
    {
      id: "encoding-images",
      titleKey: "guides.base64-converter.sections.encodingImages.title",
      contentKey: "guides.base64-converter.sections.encodingImages.content",
      code: `<!-- Using Base64 image in HTML -->
<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEU..." />

/* Using Base64 image in CSS */
.icon {
  background-image: url('data:image/svg+xml;base64,PHN2ZyB4...');
}`,
      language: "html",
    },
    {
      id: "common-use-cases",
      titleKey: "guides.base64-converter.sections.commonUseCases.title",
      contentKey: "guides.base64-converter.sections.commonUseCases.content",
      code: `// JavaScript: Encode to Base64
const encoded = btoa("Hello, World!");
// Result: "SGVsbG8sIFdvcmxkIQ=="

// JavaScript: Decode from Base64
const decoded = atob("SGVsbG8sIFdvcmxkIQ==");
// Result: "Hello, World!"

// Node.js: Buffer approach
const base64 = Buffer.from("Hello").toString('base64');
const text = Buffer.from(base64, 'base64').toString('utf8');`,
      language: "javascript",
    },
    {
      id: "data-urls",
      titleKey: "guides.base64-converter.sections.dataUrls.title",
      contentKey: "guides.base64-converter.sections.dataUrls.content",
      code: `// Data URL format
data:[<mediatype>][;base64],<data>

// Examples
data:text/plain;base64,SGVsbG8=
data:image/png;base64,iVBORw0KGgo...
data:application/json;base64,eyJuYW1l...
data:text/html;base64,PGgxPkhlbGxvPC...`,
      language: "text",
    },
    {
      id: "size-considerations",
      titleKey: "guides.base64-converter.sections.sizeConsiderations.title",
      contentKey: "guides.base64-converter.sections.sizeConsiderations.content",
    },
  ],
  relatedTools: ["json-formatter", "url-encoder", "hash-generator"],
  keywords: [
    "base64 encode image",
    "base64 to file",
    "image to base64",
    "convert file to base64",
    "base64 data url",
    "decode base64 string",
    "base64 image embed",
    "base64 converter online",
  ],
  difficulty: "beginner",
  readTime: 5,
};
