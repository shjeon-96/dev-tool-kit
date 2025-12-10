import type { Guide } from "../model/types";

export const cronParserGuide: Guide = {
  slug: "cron-parser",
  sections: [
    {
      id: "what-is-cron",
      titleKey: "guides.cron-parser.sections.whatIs.title",
      contentKey: "guides.cron-parser.sections.whatIs.content",
      code: `# Cron Expression Format
┌───────────── minute (0-59)
│ ┌───────────── hour (0-23)
│ │ ┌───────────── day of month (1-31)
│ │ │ ┌───────────── month (1-12)
│ │ │ │ ┌───────────── day of week (0-6)
│ │ │ │ │
* * * * *`,
      language: "text",
    },
    {
      id: "common-patterns",
      titleKey: "guides.cron-parser.sections.patterns.title",
      contentKey: "guides.cron-parser.sections.patterns.content",
      code: `# Common Cron Patterns
0 * * * *      # Every hour
0 0 * * *      # Every day at midnight
0 0 * * 0      # Every Sunday at midnight
*/15 * * * *   # Every 15 minutes
0 9-17 * * 1-5 # Weekdays 9AM-5PM, hourly`,
      language: "text",
    },
    {
      id: "how-to-use",
      titleKey: "guides.cron-parser.sections.howToUse.title",
      contentKey: "guides.cron-parser.sections.howToUse.content",
    },
    {
      id: "special-characters",
      titleKey: "guides.cron-parser.sections.special.title",
      contentKey: "guides.cron-parser.sections.special.content",
    },
  ],
  relatedTools: ["unix-timestamp", "json-formatter", "regex-tester"],
  keywords: [
    "cron expression generator",
    "crontab parser",
    "cron schedule builder",
    "cron syntax explained",
    "cron job scheduler",
    "parse cron expression",
    "cron time calculator",
  ],
  difficulty: "intermediate",
  readTime: 6,
};
