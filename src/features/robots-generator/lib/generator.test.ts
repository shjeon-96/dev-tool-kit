import { describe, it, expect } from "vitest";
import {
  generateRobotsTxt,
  parseRobotsTxt,
  validateRobotsTxt,
  SAMPLE_ROBOTS_TXT,
} from "./generator";
import {
  createDefaultConfig,
  createEmptyUserAgent,
  createEmptyRule,
  DEFAULT_USER_AGENTS,
  COMMON_PATHS,
} from "./types";
import type { RobotsConfig } from "./types";

describe("robots-generator", () => {
  describe("generateRobotsTxt", () => {
    it("should generate basic robots.txt with single user-agent", () => {
      const config: RobotsConfig = {
        userAgents: [
          {
            id: "1",
            userAgent: "*",
            rules: [{ id: "r1", type: "allow", path: "/" }],
          },
        ],
      };

      const result = generateRobotsTxt(config);
      expect(result).toContain("User-agent: *");
      expect(result).toContain("Allow: /");
    });

    it("should generate robots.txt with multiple user-agents", () => {
      const config: RobotsConfig = {
        userAgents: [
          {
            id: "1",
            userAgent: "*",
            rules: [{ id: "r1", type: "allow", path: "/" }],
          },
          {
            id: "2",
            userAgent: "Googlebot",
            rules: [{ id: "r2", type: "disallow", path: "/admin/" }],
          },
        ],
      };

      const result = generateRobotsTxt(config);
      expect(result).toContain("User-agent: *");
      expect(result).toContain("User-agent: Googlebot");
      expect(result).toContain("Allow: /");
      expect(result).toContain("Disallow: /admin/");
    });

    it("should include sitemap when provided", () => {
      const config: RobotsConfig = {
        userAgents: [
          {
            id: "1",
            userAgent: "*",
            rules: [],
          },
        ],
        sitemapUrl: "https://example.com/sitemap.xml",
      };

      const result = generateRobotsTxt(config);
      expect(result).toContain("Sitemap: https://example.com/sitemap.xml");
    });

    it("should include crawl-delay when provided", () => {
      const config: RobotsConfig = {
        userAgents: [
          {
            id: "1",
            userAgent: "*",
            rules: [{ id: "r1", type: "allow", path: "/" }],
          },
        ],
        crawlDelay: 10,
      };

      const result = generateRobotsTxt(config);
      expect(result).toContain("Crawl-delay: 10");
    });

    it("should not include crawl-delay when zero", () => {
      const config: RobotsConfig = {
        userAgents: [
          {
            id: "1",
            userAgent: "*",
            rules: [{ id: "r1", type: "allow", path: "/" }],
          },
        ],
        crawlDelay: 0,
      };

      const result = generateRobotsTxt(config);
      expect(result).not.toContain("Crawl-delay");
    });

    it("should include additional directives when provided", () => {
      const config: RobotsConfig = {
        userAgents: [
          {
            id: "1",
            userAgent: "*",
            rules: [],
          },
        ],
        additionalDirectives: "Host: example.com",
      };

      const result = generateRobotsTxt(config);
      expect(result).toContain("Host: example.com");
    });

    it("should skip rules with empty paths", () => {
      const config: RobotsConfig = {
        userAgents: [
          {
            id: "1",
            userAgent: "*",
            rules: [
              { id: "r1", type: "allow", path: "/" },
              { id: "r2", type: "disallow", path: "" },
              { id: "r3", type: "disallow", path: "  " },
            ],
          },
        ],
      };

      const result = generateRobotsTxt(config);
      expect(result).toContain("Allow: /");
      expect(result.match(/Disallow/g)).toBeNull();
    });

    it("should handle empty user agents array", () => {
      const config: RobotsConfig = {
        userAgents: [],
        sitemapUrl: "https://example.com/sitemap.xml",
      };

      const result = generateRobotsTxt(config);
      expect(result).toContain("Sitemap: https://example.com/sitemap.xml");
    });
  });

  describe("parseRobotsTxt", () => {
    it("should parse basic robots.txt", () => {
      const content = `User-agent: *
Allow: /
Disallow: /admin/`;

      const config = parseRobotsTxt(content);
      expect(config.userAgents).toHaveLength(1);
      expect(config.userAgents[0].userAgent).toBe("*");
      expect(config.userAgents[0].rules).toHaveLength(2);
    });

    it("should parse multiple user-agents", () => {
      const content = `User-agent: *
Allow: /

User-agent: Googlebot
Disallow: /search`;

      const config = parseRobotsTxt(content);
      expect(config.userAgents).toHaveLength(2);
      expect(config.userAgents[0].userAgent).toBe("*");
      expect(config.userAgents[1].userAgent).toBe("Googlebot");
    });

    it("should parse sitemap directive", () => {
      const content = `User-agent: *
Allow: /

Sitemap: https://example.com/sitemap.xml`;

      const config = parseRobotsTxt(content);
      expect(config.sitemapUrl).toBe("https://example.com/sitemap.xml");
    });

    it("should parse crawl-delay directive", () => {
      const content = `User-agent: *
Crawl-delay: 5
Allow: /`;

      const config = parseRobotsTxt(content);
      expect(config.crawlDelay).toBe(5);
    });

    it("should ignore comments", () => {
      const content = `# This is a comment
User-agent: *
# Another comment
Allow: /`;

      const config = parseRobotsTxt(content);
      expect(config.userAgents).toHaveLength(1);
      expect(config.userAgents[0].rules).toHaveLength(1);
    });

    it("should ignore empty lines", () => {
      const content = `User-agent: *

Allow: /

Disallow: /admin/`;

      const config = parseRobotsTxt(content);
      expect(config.userAgents[0].rules).toHaveLength(2);
    });

    it("should handle case-insensitive directives", () => {
      const content = `USER-AGENT: *
ALLOW: /
DISALLOW: /admin/`;

      const config = parseRobotsTxt(content);
      expect(config.userAgents).toHaveLength(1);
      expect(config.userAgents[0].rules).toHaveLength(2);
    });

    it("should return default config for empty content", () => {
      const config = parseRobotsTxt("");
      expect(config.userAgents).toHaveLength(1);
      expect(config.userAgents[0].userAgent).toBe("*");
    });

    it("should handle invalid crawl-delay value", () => {
      const content = `User-agent: *
Crawl-delay: invalid
Allow: /`;

      const config = parseRobotsTxt(content);
      expect(config.crawlDelay).toBeUndefined();
    });

    it("should parse SAMPLE_ROBOTS_TXT correctly", () => {
      const config = parseRobotsTxt(SAMPLE_ROBOTS_TXT);
      expect(config.userAgents.length).toBeGreaterThan(0);
      expect(config.sitemapUrl).toBe("https://example.com/sitemap.xml");
    });
  });

  describe("validateRobotsTxt", () => {
    it("should return no errors for valid robots.txt", () => {
      const content = `User-agent: *
Allow: /
Disallow: /admin/`;

      const errors = validateRobotsTxt(content);
      expect(errors).toHaveLength(0);
    });

    it("should detect missing colon", () => {
      const content = `User-agent *
Allow: /`;

      const errors = validateRobotsTxt(content);
      expect(errors.some((e) => e.includes("missing colon"))).toBe(true);
    });

    it("should detect unknown directive", () => {
      const content = `User-agent: *
Unknown: value`;

      const errors = validateRobotsTxt(content);
      expect(errors.some((e) => e.includes("Unknown directive"))).toBe(true);
    });

    it("should detect allow/disallow without user-agent", () => {
      const content = `Allow: /
Disallow: /admin/`;

      const errors = validateRobotsTxt(content);
      expect(errors.some((e) => e.includes("without User-agent"))).toBe(true);
    });

    it("should detect empty user-agent value", () => {
      const content = `User-agent:
Allow: /`;

      const errors = validateRobotsTxt(content);
      expect(errors.some((e) => e.includes("value is empty"))).toBe(true);
    });

    it("should detect invalid sitemap URL", () => {
      const content = `User-agent: *
Allow: /
Sitemap: not-a-valid-url`;

      const errors = validateRobotsTxt(content);
      expect(errors.some((e) => e.includes("Invalid sitemap URL"))).toBe(true);
    });

    it("should accept valid sitemap URL", () => {
      const content = `User-agent: *
Allow: /
Sitemap: https://example.com/sitemap.xml`;

      const errors = validateRobotsTxt(content);
      expect(errors).toHaveLength(0);
    });

    it("should detect invalid crawl-delay value", () => {
      const content = `User-agent: *
Crawl-delay: abc`;

      const errors = validateRobotsTxt(content);
      expect(errors.some((e) => e.includes("must be a number"))).toBe(true);
    });

    it("should accept valid crawl-delay value", () => {
      const content = `User-agent: *
Crawl-delay: 10`;

      const errors = validateRobotsTxt(content);
      expect(errors).toHaveLength(0);
    });

    it("should ignore comments and empty lines", () => {
      const content = `# Comment
User-agent: *

# Another comment
Allow: /`;

      const errors = validateRobotsTxt(content);
      expect(errors).toHaveLength(0);
    });

    it("should detect missing user-agent in non-empty content", () => {
      const content = `Sitemap: https://example.com/sitemap.xml`;

      const errors = validateRobotsTxt(content);
      expect(errors.some((e) => e.includes("Missing User-agent"))).toBe(true);
    });

    it("should return no errors for empty content", () => {
      const errors = validateRobotsTxt("");
      expect(errors).toHaveLength(0);
    });

    it("should accept host directive", () => {
      const content = `User-agent: *
Allow: /
Host: example.com`;

      const errors = validateRobotsTxt(content);
      expect(errors).toHaveLength(0);
    });
  });

  describe("createDefaultConfig", () => {
    it("should create config with default user-agent", () => {
      const config = createDefaultConfig();
      expect(config.userAgents).toHaveLength(1);
      expect(config.userAgents[0].userAgent).toBe("*");
    });

    it("should have allow rule for root path", () => {
      const config = createDefaultConfig();
      expect(config.userAgents[0].rules).toHaveLength(1);
      expect(config.userAgents[0].rules[0].type).toBe("allow");
      expect(config.userAgents[0].rules[0].path).toBe("/");
    });

    it("should have empty sitemapUrl", () => {
      const config = createDefaultConfig();
      expect(config.sitemapUrl).toBe("");
    });

    it("should have undefined crawlDelay", () => {
      const config = createDefaultConfig();
      expect(config.crawlDelay).toBeUndefined();
    });

    it("should generate unique IDs", () => {
      const config1 = createDefaultConfig();
      const config2 = createDefaultConfig();
      expect(config1.userAgents[0].id).not.toBe(config2.userAgents[0].id);
    });
  });

  describe("createEmptyUserAgent", () => {
    it("should create user-agent with wildcard", () => {
      const ua = createEmptyUserAgent();
      expect(ua.userAgent).toBe("*");
    });

    it("should have empty rules array", () => {
      const ua = createEmptyUserAgent();
      expect(ua.rules).toEqual([]);
    });

    it("should have unique ID", () => {
      const ua1 = createEmptyUserAgent();
      const ua2 = createEmptyUserAgent();
      expect(ua1.id).not.toBe(ua2.id);
    });
  });

  describe("createEmptyRule", () => {
    it("should create allow rule by default", () => {
      const rule = createEmptyRule();
      expect(rule.type).toBe("allow");
    });

    it("should create disallow rule when specified", () => {
      const rule = createEmptyRule("disallow");
      expect(rule.type).toBe("disallow");
    });

    it("should have empty path", () => {
      const rule = createEmptyRule();
      expect(rule.path).toBe("");
    });

    it("should have unique ID", () => {
      const rule1 = createEmptyRule();
      const rule2 = createEmptyRule();
      expect(rule1.id).not.toBe(rule2.id);
    });
  });

  describe("DEFAULT_USER_AGENTS", () => {
    it("should have wildcard as first option", () => {
      expect(DEFAULT_USER_AGENTS[0].value).toBe("*");
    });

    it("should include major search engine bots", () => {
      const values = DEFAULT_USER_AGENTS.map((ua) => ua.value);
      expect(values).toContain("Googlebot");
      expect(values).toContain("Bingbot");
      expect(values).toContain("Yandex");
    });

    it("should include social media bots", () => {
      const values = DEFAULT_USER_AGENTS.map((ua) => ua.value);
      expect(values).toContain("facebookexternalhit");
      expect(values).toContain("Twitterbot");
    });

    it("should include AI bots", () => {
      const values = DEFAULT_USER_AGENTS.map((ua) => ua.value);
      expect(values).toContain("GPTBot");
      expect(values).toContain("CCBot");
      expect(values).toContain("anthropic-ai");
    });

    it("should have label for each user agent", () => {
      DEFAULT_USER_AGENTS.forEach((ua) => {
        expect(ua.label).toBeDefined();
        expect(ua.label.length).toBeGreaterThan(0);
      });
    });
  });

  describe("COMMON_PATHS", () => {
    it("should have root path as first option", () => {
      expect(COMMON_PATHS[0].value).toBe("/");
    });

    it("should include common restricted paths", () => {
      const values = COMMON_PATHS.map((p) => p.value);
      expect(values).toContain("/admin/");
      expect(values).toContain("/api/");
      expect(values).toContain("/private/");
    });

    it("should include e-commerce paths", () => {
      const values = COMMON_PATHS.map((p) => p.value);
      expect(values).toContain("/cart");
      expect(values).toContain("/checkout");
      expect(values).toContain("/account");
    });

    it("should include file pattern paths", () => {
      const values = COMMON_PATHS.map((p) => p.value);
      expect(values).toContain("/*.pdf$");
      expect(values).toContain("/*.doc$");
    });

    it("should have label for each path", () => {
      COMMON_PATHS.forEach((path) => {
        expect(path.label).toBeDefined();
        expect(path.label.length).toBeGreaterThan(0);
      });
    });
  });

  describe("round-trip: generate → parse", () => {
    it("should preserve user-agent after round-trip", () => {
      const original: RobotsConfig = {
        userAgents: [
          {
            id: "1",
            userAgent: "Googlebot",
            rules: [
              { id: "r1", type: "allow", path: "/" },
              { id: "r2", type: "disallow", path: "/admin/" },
            ],
          },
        ],
        sitemapUrl: "https://example.com/sitemap.xml",
      };

      const generated = generateRobotsTxt(original);
      const parsed = parseRobotsTxt(generated);

      expect(parsed.userAgents[0].userAgent).toBe("Googlebot");
      expect(parsed.userAgents[0].rules.length).toBe(2);
      expect(parsed.sitemapUrl).toBe("https://example.com/sitemap.xml");
    });

    it("should preserve multiple user-agents after round-trip", () => {
      const original: RobotsConfig = {
        userAgents: [
          {
            id: "1",
            userAgent: "*",
            rules: [{ id: "r1", type: "allow", path: "/" }],
          },
          {
            id: "2",
            userAgent: "GPTBot",
            rules: [{ id: "r2", type: "disallow", path: "/" }],
          },
        ],
      };

      const generated = generateRobotsTxt(original);
      const parsed = parseRobotsTxt(generated);

      expect(parsed.userAgents.length).toBe(2);
      expect(parsed.userAgents[0].userAgent).toBe("*");
      expect(parsed.userAgents[1].userAgent).toBe("GPTBot");
    });
  });
});
