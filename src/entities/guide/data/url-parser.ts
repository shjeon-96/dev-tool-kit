import type { Guide } from "../model/types";

export const urlParserGuide: Guide = {
  slug: "url-parser",
  sections: [
    {
      id: "what-is-url",
      titleKey: "guides.url-parser.sections.whatIs.title",
      contentKey: "guides.url-parser.sections.whatIs.content",
      code: `// URL Structure
https://user:pass@example.com:8080/path/page?query=value#hash

protocol: https
username: user
password: pass
hostname: example.com
port: 8080
pathname: /path/page
search: ?query=value
hash: #hash`,
      language: "text",
    },
    {
      id: "url-components",
      titleKey: "guides.url-parser.sections.components.title",
      contentKey: "guides.url-parser.sections.components.content",
    },
    {
      id: "how-to-use",
      titleKey: "guides.url-parser.sections.howToUse.title",
      contentKey: "guides.url-parser.sections.howToUse.content",
    },
    {
      id: "query-parameters",
      titleKey: "guides.url-parser.sections.queryParams.title",
      contentKey: "guides.url-parser.sections.queryParams.content",
      code: `// Query Parameters Example
https://example.com/search?q=hello&page=1&sort=date

// Parsed parameters:
{
  "q": "hello",
  "page": "1",
  "sort": "date"
}`,
      language: "javascript",
    },
  ],
  relatedTools: ["url-encoder", "curl-builder", "meta-generator"],
  keywords: [
    "url parser online",
    "parse url components",
    "query string parser",
    "url decoder",
    "extract url parameters",
    "url breakdown tool",
  ],
  difficulty: "beginner",
  readTime: 4,
};
