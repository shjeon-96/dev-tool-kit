import type { Guide } from "../model/types";

export const sqlFormatterGuide: Guide = {
  slug: "sql-formatter",
  sections: [
    {
      id: "what-is-sql-formatter",
      titleKey: "guides.sql-formatter.sections.whatIs.title",
      contentKey: "guides.sql-formatter.sections.whatIs.content",
      code: `-- Before formatting
SELECT u.id,u.name,o.total FROM users u JOIN orders o ON u.id=o.user_id WHERE o.status='completed';

-- After formatting
SELECT
  u.id,
  u.name,
  o.total
FROM users u
JOIN orders o ON u.id = o.user_id
WHERE o.status = 'completed';`,
      language: "sql",
    },
    {
      id: "formatting-options",
      titleKey: "guides.sql-formatter.sections.options.title",
      contentKey: "guides.sql-formatter.sections.options.content",
    },
    {
      id: "how-to-use",
      titleKey: "guides.sql-formatter.sections.howToUse.title",
      contentKey: "guides.sql-formatter.sections.howToUse.content",
    },
    {
      id: "sql-dialects",
      titleKey: "guides.sql-formatter.sections.dialects.title",
      contentKey: "guides.sql-formatter.sections.dialects.content",
      code: `-- MySQL specific
SELECT * FROM users LIMIT 10;

-- PostgreSQL specific
SELECT * FROM users FETCH FIRST 10 ROWS ONLY;

-- SQL Server specific
SELECT TOP 10 * FROM users;`,
      language: "sql",
    },
  ],
  relatedTools: ["json-formatter", "prettier-playground", "diff-checker"],
  keywords: [
    "sql formatter online",
    "format sql query",
    "sql beautifier",
    "sql pretty print",
    "mysql formatter",
    "postgresql formatter",
    "sql query formatter",
  ],
  difficulty: "beginner",
  readTime: 4,
};
