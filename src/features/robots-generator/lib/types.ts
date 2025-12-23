export type RuleType = "allow" | "disallow";

export interface RobotRule {
  id: string;
  type: RuleType;
  path: string;
}

export interface UserAgentConfig {
  id: string;
  userAgent: string;
  rules: RobotRule[];
}

export interface RobotsConfig {
  userAgents: UserAgentConfig[];
  sitemapUrl?: string;
  crawlDelay?: number;
  additionalDirectives?: string;
}

export const DEFAULT_USER_AGENTS = [
  { value: "*", label: "All robots (*)" },
  { value: "Googlebot", label: "Googlebot" },
  { value: "Bingbot", label: "Bingbot" },
  { value: "Yandex", label: "Yandex" },
  { value: "Baiduspider", label: "Baiduspider" },
  { value: "DuckDuckBot", label: "DuckDuckBot" },
  { value: "Slurp", label: "Yahoo! Slurp" },
  { value: "facebookexternalhit", label: "Facebook" },
  { value: "Twitterbot", label: "Twitter" },
  { value: "GPTBot", label: "GPTBot (OpenAI)" },
  { value: "CCBot", label: "CCBot (Common Crawl)" },
  { value: "anthropic-ai", label: "Anthropic AI" },
] as const;

export const COMMON_PATHS = [
  { value: "/", label: "Root (/)" },
  { value: "/admin/", label: "Admin (/admin/)" },
  { value: "/api/", label: "API (/api/)" },
  { value: "/private/", label: "Private (/private/)" },
  { value: "/tmp/", label: "Temp (/tmp/)" },
  { value: "/cgi-bin/", label: "CGI Bin (/cgi-bin/)" },
  { value: "/*.pdf$", label: "PDF files (/*.pdf$)" },
  { value: "/*.doc$", label: "Word files (/*.doc$)" },
  { value: "/search", label: "Search (/search)" },
  { value: "/cart", label: "Cart (/cart)" },
  { value: "/checkout", label: "Checkout (/checkout)" },
  { value: "/account", label: "Account (/account)" },
] as const;

export function createDefaultConfig(): RobotsConfig {
  return {
    userAgents: [
      {
        id: crypto.randomUUID(),
        userAgent: "*",
        rules: [{ id: crypto.randomUUID(), type: "allow", path: "/" }],
      },
    ],
    sitemapUrl: "",
    crawlDelay: undefined,
  };
}

export function createEmptyUserAgent(): UserAgentConfig {
  return {
    id: crypto.randomUUID(),
    userAgent: "*",
    rules: [],
  };
}

export function createEmptyRule(type: RuleType = "allow"): RobotRule {
  return {
    id: crypto.randomUUID(),
    type,
    path: "",
  };
}
