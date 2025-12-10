import type { Guide } from "../model/types";

export const curlBuilderGuide: Guide = {
  slug: "curl-builder",
  sections: [
    {
      id: "what-is-curl",
      titleKey: "guides.curl-builder.sections.whatIs.title",
      contentKey: "guides.curl-builder.sections.whatIs.content",
      code: `# Basic GET request
curl https://api.example.com/users

# POST request with JSON
curl -X POST https://api.example.com/users \\
  -H "Content-Type: application/json" \\
  -d '{"name": "John", "email": "john@example.com"}'`,
      language: "bash",
    },
    {
      id: "common-options",
      titleKey: "guides.curl-builder.sections.options.title",
      contentKey: "guides.curl-builder.sections.options.content",
      code: `# Common cURL options
-X, --request    # HTTP method (GET, POST, PUT, DELETE)
-H, --header     # Add header
-d, --data       # Request body
-o, --output     # Save to file
-v, --verbose    # Verbose output
-s, --silent     # Silent mode
-L, --location   # Follow redirects`,
      language: "bash",
    },
    {
      id: "how-to-use",
      titleKey: "guides.curl-builder.sections.howToUse.title",
      contentKey: "guides.curl-builder.sections.howToUse.content",
    },
    {
      id: "authentication",
      titleKey: "guides.curl-builder.sections.auth.title",
      contentKey: "guides.curl-builder.sections.auth.content",
      code: `# Bearer token
curl -H "Authorization: Bearer YOUR_TOKEN" \\
  https://api.example.com/protected

# Basic auth
curl -u username:password \\
  https://api.example.com/protected

# API key in header
curl -H "X-API-Key: YOUR_API_KEY" \\
  https://api.example.com/data`,
      language: "bash",
    },
  ],
  relatedTools: ["url-parser", "json-formatter", "jwt-decoder"],
  keywords: [
    "curl command builder",
    "curl generator online",
    "http request builder",
    "curl request maker",
    "api request generator",
    "curl syntax generator",
    "rest api curl",
  ],
  difficulty: "intermediate",
  readTime: 6,
};
