import type { Guide } from "../model/types";

export const urlEncoderGuide: Guide = {
  slug: "url-encoder",
  sections: [
    {
      id: "what-is-url-encoding",
      titleKey: "guides.url-encoder.sections.whatIs.title",
      contentKey: "guides.url-encoder.sections.whatIs.content",
      code: `// URL Encoding Examples
Original: Hello World!
Encoded:  Hello%20World%21

Original: user@example.com
Encoded:  user%40example.com

Original: price=100&currency=€
Encoded:  price%3D100%26currency%3D%E2%82%AC`,
      language: "text",
    },
    {
      id: "special-characters",
      titleKey: "guides.url-encoder.sections.special.title",
      contentKey: "guides.url-encoder.sections.special.content",
      code: `// Common URL Encoded Characters
Space  → %20 or +
!      → %21
@      → %40
#      → %23
$      → %24
&      → %26
=      → %3D
?      → %3F`,
      language: "text",
    },
    {
      id: "how-to-use",
      titleKey: "guides.url-encoder.sections.howToUse.title",
      contentKey: "guides.url-encoder.sections.howToUse.content",
    },
    {
      id: "programming-usage",
      titleKey: "guides.url-encoder.sections.programming.title",
      contentKey: "guides.url-encoder.sections.programming.content",
      code: `// JavaScript
encodeURIComponent("Hello World!")
// "Hello%20World%21"

decodeURIComponent("Hello%20World%21")
// "Hello World!"

// Python
from urllib.parse import quote, unquote
quote("Hello World!")  # "Hello%20World%21"`,
      language: "javascript",
    },
  ],
  relatedTools: ["url-parser", "base64-converter", "html-entity"],
  keywords: [
    "url encoder online",
    "url decoder",
    "percent encoding",
    "encode url string",
    "decode url online",
    "uri encoder",
    "url escape tool",
  ],
  difficulty: "beginner",
  readTime: 4,
};
