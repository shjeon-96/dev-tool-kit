import type { Guide } from "../model/types";

export const uaParserGuide: Guide = {
  slug: "ua-parser",
  sections: [
    {
      id: "what-is-user-agent",
      titleKey: "guides.ua-parser.sections.whatIs.title",
      contentKey: "guides.ua-parser.sections.whatIs.content",
      code: `// Example User Agent String
Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)
AppleWebKit/537.36 (KHTML, like Gecko)
Chrome/120.0.0.0 Safari/537.36

// Parsed Result:
Browser: Chrome 120.0.0.0
OS: macOS 10.15.7
Device: Desktop`,
      language: "text",
    },
    {
      id: "ua-components",
      titleKey: "guides.ua-parser.sections.components.title",
      contentKey: "guides.ua-parser.sections.components.content",
    },
    {
      id: "how-to-use",
      titleKey: "guides.ua-parser.sections.howToUse.title",
      contentKey: "guides.ua-parser.sections.howToUse.content",
    },
    {
      id: "common-patterns",
      titleKey: "guides.ua-parser.sections.patterns.title",
      contentKey: "guides.ua-parser.sections.patterns.content",
      code: `// Mobile Detection Patterns
iPhone: "iPhone" in UA
Android: "Android" in UA
iPad: "iPad" in UA

// Browser Detection
Chrome: "Chrome" && !"Edg"
Firefox: "Firefox"
Safari: "Safari" && !"Chrome"
Edge: "Edg"`,
      language: "javascript",
    },
  ],
  relatedTools: ["url-parser", "regex-tester", "json-formatter"],
  keywords: [
    "user agent parser",
    "ua string analyzer",
    "browser detection tool",
    "parse user agent online",
    "what is my user agent",
    "user agent decoder",
    "browser identifier",
  ],
  difficulty: "intermediate",
  readTime: 5,
};
