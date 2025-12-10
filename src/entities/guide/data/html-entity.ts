import type { Guide } from "../model/types";

export const htmlEntityGuide: Guide = {
  slug: "html-entity",
  sections: [
    {
      id: "what-is-html-entity",
      titleKey: "guides.html-entity.sections.whatIs.title",
      contentKey: "guides.html-entity.sections.whatIs.content",
      code: `// HTML Entity Examples
<  →  &lt;
>  →  &gt;
&  →  &amp;
"  →  &quot;
'  →  &apos;
©  →  &copy;
€  →  &euro;`,
      language: "text",
    },
    {
      id: "common-entities",
      titleKey: "guides.html-entity.sections.common.title",
      contentKey: "guides.html-entity.sections.common.content",
      code: `// Special Characters
&nbsp;  → Non-breaking space
&ndash; → En dash (–)
&mdash; → Em dash (—)
&hellip; → Ellipsis (…)

// Symbols
&trade; → ™
&reg;   → ®
&copy;  → ©
&deg;   → °`,
      language: "html",
    },
    {
      id: "how-to-use",
      titleKey: "guides.html-entity.sections.howToUse.title",
      contentKey: "guides.html-entity.sections.howToUse.content",
    },
    {
      id: "security",
      titleKey: "guides.html-entity.sections.security.title",
      contentKey: "guides.html-entity.sections.security.content",
    },
  ],
  relatedTools: ["url-encoder", "base64-converter", "markdown-preview"],
  keywords: [
    "html entity encoder",
    "html entity decoder",
    "html special characters",
    "escape html online",
    "html entities list",
    "convert to html entities",
    "html character codes",
  ],
  difficulty: "beginner",
  readTime: 4,
};
