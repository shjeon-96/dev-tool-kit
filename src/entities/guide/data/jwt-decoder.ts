import type { Guide } from "../model/types";

export const jwtDecoderGuide: Guide = {
  slug: "jwt-decoder",
  sections: [
    {
      id: "what-is-jwt",
      titleKey: "guides.jwt-decoder.sections.whatIsJwt.title",
      contentKey: "guides.jwt-decoder.sections.whatIsJwt.content",
      code: `// JWT Structure: header.payload.signature
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`,
      language: "text",
    },
    {
      id: "jwt-structure",
      titleKey: "guides.jwt-decoder.sections.jwtStructure.title",
      contentKey: "guides.jwt-decoder.sections.jwtStructure.content",
      code: `// Header (Base64 decoded)
{
  "alg": "HS256",
  "typ": "JWT"
}

// Payload (Base64 decoded)
{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022,
  "exp": 1516242622
}`,
      language: "json",
    },
    {
      id: "common-claims",
      titleKey: "guides.jwt-decoder.sections.commonClaims.title",
      contentKey: "guides.jwt-decoder.sections.commonClaims.content",
      code: `{
  "iss": "https://auth.example.com",  // Issuer
  "sub": "user123",                    // Subject (user ID)
  "aud": "my-app",                     // Audience
  "exp": 1735689600,                   // Expiration time
  "iat": 1735603200,                   // Issued at
  "nbf": 1735603200,                   // Not before
  "jti": "unique-token-id"             // JWT ID
}`,
      language: "json",
    },
    {
      id: "debugging-expired",
      titleKey: "guides.jwt-decoder.sections.debuggingExpired.title",
      contentKey: "guides.jwt-decoder.sections.debuggingExpired.content",
      code: `// Check expiration in JavaScript
const token = "eyJhbGciOiJIUzI1NiIs...";
const payload = JSON.parse(atob(token.split('.')[1]));

const expDate = new Date(payload.exp * 1000);
const isExpired = expDate < new Date();

console.log("Expires:", expDate);
console.log("Is Expired:", isExpired);`,
      language: "javascript",
    },
    {
      id: "security-tips",
      titleKey: "guides.jwt-decoder.sections.securityTips.title",
      contentKey: "guides.jwt-decoder.sections.securityTips.content",
    },
  ],
  relatedTools: ["json-formatter", "base64-converter", "hash-generator"],
  keywords: [
    "jwt token debug",
    "jwt expired error",
    "decode jwt online",
    "jwt payload viewer",
    "debug authentication token",
    "jwt claims explained",
    "verify jwt expiration",
    "jwt troubleshooting",
  ],
  difficulty: "intermediate",
  readTime: 7,
};
