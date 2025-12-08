import type { Guide } from "../model/types";

export const regexTesterGuide: Guide = {
  slug: "regex-tester",
  sections: [
    {
      id: "what-is-regex",
      titleKey: "guides.regex-tester.sections.whatIsRegex.title",
      contentKey: "guides.regex-tester.sections.whatIsRegex.content",
      code: `// Basic pattern matching
/hello/        // Matches "hello"
/hello/i       // Case-insensitive match
/hello/g       // Global match (find all)
/hello/gi      // Global + case-insensitive`,
      language: "javascript",
    },
    {
      id: "email-validation",
      titleKey: "guides.regex-tester.sections.emailValidation.title",
      contentKey: "guides.regex-tester.sections.emailValidation.content",
      code: `// Simple email validation
/^[\\w.-]+@[\\w.-]+\\.\\w{2,}$/

// Breakdown:
// ^         - Start of string
// [\\w.-]+  - Username (letters, numbers, dots, hyphens)
// @         - At symbol
// [\\w.-]+  - Domain name
// \\.       - Dot before TLD
// \\w{2,}   - TLD (at least 2 characters)
// $         - End of string

// Test cases:
// ✅ user@example.com
// ✅ john.doe@company.co.uk
// ❌ invalid@
// ❌ @example.com`,
      language: "javascript",
    },
    {
      id: "phone-validation",
      titleKey: "guides.regex-tester.sections.phoneValidation.title",
      contentKey: "guides.regex-tester.sections.phoneValidation.content",
      code: `// US Phone number patterns
/^\\d{3}-\\d{3}-\\d{4}$/           // 123-456-7890
/^\\(\\d{3}\\) \\d{3}-\\d{4}$/     // (123) 456-7890
/^\\+1\\d{10}$/                    // +11234567890

// International format
/^\\+[1-9]\\d{1,14}$/              // E.164 format

// Flexible US phone
/^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4}$/`,
      language: "javascript",
    },
    {
      id: "common-patterns",
      titleKey: "guides.regex-tester.sections.commonPatterns.title",
      contentKey: "guides.regex-tester.sections.commonPatterns.content",
      code: `// URL validation
/^https?:\\/\\/[\\w.-]+(?:\\.[\\w.-]+)+[\\w\\-._~:/?#[\\]@!$&'()*+,;=]*$/

// IP Address (IPv4)
/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/

// Date (YYYY-MM-DD)
/^\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])$/

// Hex color
/^#(?:[0-9a-fA-F]{3}){1,2}$/

// Password (8+ chars, upper, lower, number)
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$/`,
      language: "javascript",
    },
    {
      id: "flags-modifiers",
      titleKey: "guides.regex-tester.sections.flagsModifiers.title",
      contentKey: "guides.regex-tester.sections.flagsModifiers.content",
      code: `// Flags/Modifiers
/pattern/g   // Global - find all matches
/pattern/i   // Case-insensitive
/pattern/m   // Multiline mode
/pattern/s   // Dotall - . matches newlines
/pattern/u   // Unicode support
/pattern/y   // Sticky mode

// Combining flags
/pattern/gi  // Global + case-insensitive
/pattern/gm  // Global + multiline`,
      language: "javascript",
    },
  ],
  relatedTools: ["json-formatter", "url-encoder", "prettier-playground"],
  keywords: [
    "regex email validation",
    "regex phone number",
    "test regex online",
    "regex pattern tester",
    "regular expression validator",
    "regex password validation",
    "regex url pattern",
    "debug regex pattern",
  ],
  difficulty: "intermediate",
  readTime: 8,
};
