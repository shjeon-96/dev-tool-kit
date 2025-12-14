import type { Guide } from "../model/types";

export const textCaseConverterGuide: Guide = {
  slug: "text-case-converter",
  sections: [
    {
      id: "what-is",
      titleKey: "guides.text-case-converter.sections.whatIs.title",
      contentKey: "guides.text-case-converter.sections.whatIs.content",
      code: `Input: "hello world example"

UPPERCASE:    HELLO WORLD EXAMPLE
lowercase:    hello world example
Title Case:   Hello World Example
Sentence:     Hello world example
camelCase:    helloWorldExample
PascalCase:   HelloWorldExample
snake_case:   hello_world_example
kebab-case:   hello-world-example
CONSTANT:     HELLO_WORLD_EXAMPLE`,
      language: "text",
    },
    {
      id: "programming-cases",
      titleKey: "guides.text-case-converter.sections.programmingCases.title",
      contentKey:
        "guides.text-case-converter.sections.programmingCases.content",
      code: `// Variable naming conventions by language

// JavaScript/TypeScript
const userName = "camelCase";      // variables
function getUserData() {}          // functions
class UserService {}               // PascalCase for classes

// Python
user_name = "snake_case"           // variables
def get_user_data():               // functions
class UserService:                 # PascalCase for classes

// CSS/HTML
class="user-name"                  // kebab-case
id="main-container"

// Constants (all languages)
const MAX_RETRY_COUNT = 3;         // SCREAMING_SNAKE_CASE
API_BASE_URL = "https://..."`,
      language: "javascript",
    },
    {
      id: "how-to-use",
      titleKey: "guides.text-case-converter.sections.howToUse.title",
      contentKey: "guides.text-case-converter.sections.howToUse.content",
    },
    {
      id: "use-cases",
      titleKey: "guides.text-case-converter.sections.useCases.title",
      contentKey: "guides.text-case-converter.sections.useCases.content",
      code: `// Common use cases

// 1. API response → Frontend variable
"user_profile_data" → userProfileData

// 2. Database column → TypeScript interface
"created_at" → createdAt

// 3. Component name → File name
"UserProfileCard" → user-profile-card.tsx

// 4. CSS class → JS constant
"main-container" → MAIN_CONTAINER

// 5. Environment variable
"database url" → DATABASE_URL`,
      language: "javascript",
    },
  ],
  relatedTools: ["lorem-generator", "url-encoder", "json-formatter"],
  keywords: [
    "text case converter",
    "camelcase converter",
    "snake case converter",
    "kebab case converter",
    "uppercase lowercase converter",
    "text transformation tool",
    "case changer online",
    "programming naming convention",
  ],
  difficulty: "beginner",
  readTime: 4,
};
