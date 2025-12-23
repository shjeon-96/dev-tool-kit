import type {
  RobotsConfig,
  UserAgentConfig,
  RobotRule,
  RuleType,
} from "./types";
import {
  createDefaultConfig,
  createEmptyUserAgent,
  createEmptyRule,
} from "./types";

export function generateRobotsTxt(config: RobotsConfig): string {
  const lines: string[] = [];

  for (const ua of config.userAgents) {
    lines.push(`User-agent: ${ua.userAgent}`);

    if (config.crawlDelay && config.crawlDelay > 0) {
      lines.push(`Crawl-delay: ${config.crawlDelay}`);
    }

    for (const rule of ua.rules) {
      if (rule.path.trim()) {
        const directive = rule.type === "allow" ? "Allow" : "Disallow";
        lines.push(`${directive}: ${rule.path}`);
      }
    }

    lines.push("");
  }

  if (config.sitemapUrl?.trim()) {
    lines.push(`Sitemap: ${config.sitemapUrl}`);
    lines.push("");
  }

  if (config.additionalDirectives?.trim()) {
    lines.push(config.additionalDirectives.trim());
    lines.push("");
  }

  return lines.join("\n").trim();
}

export function parseRobotsTxt(content: string): RobotsConfig {
  const config = createDefaultConfig();
  config.userAgents = [];

  const lines = content.split("\n").map((line) => line.trim());
  let currentUserAgent: UserAgentConfig | null = null;

  for (const line of lines) {
    if (!line || line.startsWith("#")) continue;

    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) continue;

    const directive = line.substring(0, colonIndex).trim().toLowerCase();
    const value = line.substring(colonIndex + 1).trim();

    switch (directive) {
      case "user-agent":
        if (currentUserAgent) {
          config.userAgents.push(currentUserAgent);
        }
        currentUserAgent = createEmptyUserAgent();
        currentUserAgent.userAgent = value;
        break;

      case "allow":
        if (currentUserAgent) {
          currentUserAgent.rules.push(createRuleWithPath("allow", value));
        }
        break;

      case "disallow":
        if (currentUserAgent) {
          currentUserAgent.rules.push(createRuleWithPath("disallow", value));
        }
        break;

      case "sitemap":
        config.sitemapUrl = value;
        break;

      case "crawl-delay":
        config.crawlDelay = parseInt(value, 10) || undefined;
        break;
    }
  }

  if (currentUserAgent) {
    config.userAgents.push(currentUserAgent);
  }

  if (config.userAgents.length === 0) {
    config.userAgents = createDefaultConfig().userAgents;
  }

  return config;
}

function createRuleWithPath(type: RuleType, path: string): RobotRule {
  const rule = createEmptyRule(type);
  rule.path = path;
  return rule;
}

export function validateRobotsTxt(content: string): string[] {
  const errors: string[] = [];
  const lines = content.split("\n");
  let hasUserAgent = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line || line.startsWith("#")) continue;

    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) {
      errors.push(`Line ${i + 1}: Invalid format - missing colon`);
      continue;
    }

    const directive = line.substring(0, colonIndex).trim().toLowerCase();
    const value = line.substring(colonIndex + 1).trim();

    const validDirectives = [
      "user-agent",
      "allow",
      "disallow",
      "sitemap",
      "crawl-delay",
      "host",
    ];

    if (!validDirectives.includes(directive)) {
      errors.push(`Line ${i + 1}: Unknown directive "${directive}"`);
    }

    if (directive === "user-agent") {
      hasUserAgent = true;
      if (!value) {
        errors.push(`Line ${i + 1}: User-agent value is empty`);
      }
    }

    if ((directive === "allow" || directive === "disallow") && !hasUserAgent) {
      errors.push(`Line ${i + 1}: ${directive} without User-agent`);
    }

    if (directive === "sitemap" && value && !isValidUrl(value)) {
      errors.push(`Line ${i + 1}: Invalid sitemap URL`);
    }

    if (directive === "crawl-delay" && value && isNaN(parseInt(value, 10))) {
      errors.push(`Line ${i + 1}: Crawl-delay must be a number`);
    }
  }

  if (!hasUserAgent && content.trim()) {
    errors.push("Missing User-agent directive");
  }

  return errors;
}

function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export const SAMPLE_ROBOTS_TXT = `# robots.txt for example.com

User-agent: *
Allow: /
Disallow: /admin/
Disallow: /private/
Disallow: /api/
Crawl-delay: 1

User-agent: Googlebot
Allow: /
Disallow: /search
Disallow: /cart

User-agent: GPTBot
Disallow: /

Sitemap: https://example.com/sitemap.xml`;
