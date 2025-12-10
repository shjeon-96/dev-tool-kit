import type { Guide } from "../model/types";

export const unixTimestampGuide: Guide = {
  slug: "unix-timestamp",
  sections: [
    {
      id: "what-is-unix-timestamp",
      titleKey: "guides.unix-timestamp.sections.whatIs.title",
      contentKey: "guides.unix-timestamp.sections.whatIs.content",
      code: `// Unix timestamp examples
1702339200    // Seconds (10 digits) - Dec 12, 2023
1702339200000 // Milliseconds (13 digits) - Dec 12, 2023

// Getting current timestamp in JavaScript
Date.now()           // Milliseconds
Math.floor(Date.now() / 1000) // Seconds`,
      language: "javascript",
    },
    {
      id: "seconds-vs-milliseconds",
      titleKey: "guides.unix-timestamp.sections.secondsVsMs.title",
      contentKey: "guides.unix-timestamp.sections.secondsVsMs.content",
    },
    {
      id: "how-to-use",
      titleKey: "guides.unix-timestamp.sections.howToUse.title",
      contentKey: "guides.unix-timestamp.sections.howToUse.content",
    },
    {
      id: "timezone-handling",
      titleKey: "guides.unix-timestamp.sections.timezone.title",
      contentKey: "guides.unix-timestamp.sections.timezone.content",
      code: `// Timezone conversion
const date = new Date(1702339200 * 1000);

// Local time
date.toLocaleString(); // "12/12/2023, 12:00:00 AM"

// UTC time
date.toUTCString(); // "Tue, 12 Dec 2023 00:00:00 GMT"

// Specific timezone
date.toLocaleString('en-US', { timeZone: 'Asia/Seoul' });`,
      language: "javascript",
    },
    {
      id: "common-use-cases",
      titleKey: "guides.unix-timestamp.sections.useCases.title",
      contentKey: "guides.unix-timestamp.sections.useCases.content",
    },
  ],
  relatedTools: ["cron-parser", "jwt-decoder", "json-formatter"],
  keywords: [
    "unix timestamp converter",
    "epoch time converter",
    "timestamp to date",
    "date to timestamp",
    "unix time calculator",
    "milliseconds to date",
    "current unix timestamp",
  ],
  difficulty: "beginner",
  readTime: 5,
};
