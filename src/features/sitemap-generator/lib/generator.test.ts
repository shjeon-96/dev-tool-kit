import { describe, it, expect } from "vitest";
import {
  isValidUrl,
  normalizeUrl,
  parseUrls,
  escapeXml,
  formatDate,
  generateUrlEntry,
  generateSitemap,
  generateSitemapIndex,
  extractDomain,
  validateSameDomain,
  calculateStats,
} from "./generator";
import type { SitemapUrl, SitemapOptions } from "./types";
import { DEFAULT_OPTIONS } from "./types";

describe("isValidUrl", () => {
  it("should return true for valid http URLs", () => {
    expect(isValidUrl("http://example.com")).toBe(true);
    expect(isValidUrl("http://example.com/path")).toBe(true);
  });

  it("should return true for valid https URLs", () => {
    expect(isValidUrl("https://example.com")).toBe(true);
    expect(isValidUrl("https://example.com/path?query=1")).toBe(true);
  });

  it("should return false for invalid URLs", () => {
    expect(isValidUrl("not-a-url")).toBe(false);
    expect(isValidUrl("ftp://example.com")).toBe(false);
    expect(isValidUrl("")).toBe(false);
  });
});

describe("normalizeUrl", () => {
  it("should remove trailing slashes except for root", () => {
    expect(normalizeUrl("https://example.com/")).toBe("https://example.com/");
    expect(normalizeUrl("https://example.com/path/")).toBe(
      "https://example.com/path",
    );
  });

  it("should preserve query strings", () => {
    expect(normalizeUrl("https://example.com/path?q=1")).toBe(
      "https://example.com/path?q=1",
    );
  });

  it("should return original string for invalid URLs", () => {
    expect(normalizeUrl("not-a-url")).toBe("not-a-url");
  });
});

describe("parseUrls", () => {
  it("should parse URLs separated by newlines", () => {
    const input = "https://example.com\nhttps://example.com/about";
    const result = parseUrls(input);
    expect(result).toEqual([
      "https://example.com/",
      "https://example.com/about",
    ]);
  });

  it("should parse URLs separated by commas", () => {
    const input = "https://example.com,https://example.com/about";
    const result = parseUrls(input);
    expect(result).toEqual([
      "https://example.com/",
      "https://example.com/about",
    ]);
  });

  it("should remove duplicate URLs", () => {
    const input =
      "https://example.com\nhttps://example.com\nhttps://example.com/about";
    const result = parseUrls(input);
    expect(result).toEqual([
      "https://example.com/",
      "https://example.com/about",
    ]);
  });

  it("should skip invalid URLs", () => {
    const input = "https://example.com\nnot-a-url\nhttps://example.com/about";
    const result = parseUrls(input);
    expect(result).toEqual([
      "https://example.com/",
      "https://example.com/about",
    ]);
  });

  it("should handle empty input", () => {
    expect(parseUrls("")).toEqual([]);
    expect(parseUrls("   ")).toEqual([]);
  });
});

describe("escapeXml", () => {
  it("should escape XML special characters", () => {
    expect(escapeXml("&")).toBe("&amp;");
    expect(escapeXml("<")).toBe("&lt;");
    expect(escapeXml(">")).toBe("&gt;");
    expect(escapeXml('"')).toBe("&quot;");
    expect(escapeXml("'")).toBe("&apos;");
  });

  it("should escape multiple special characters", () => {
    expect(escapeXml('<a href="test">link</a>')).toBe(
      "&lt;a href=&quot;test&quot;&gt;link&lt;/a&gt;",
    );
  });
});

describe("formatDate", () => {
  it("should format date as ISO 8601 date only", () => {
    const date = new Date("2024-01-15T12:00:00Z");
    expect(formatDate(date)).toBe("2024-01-15");
  });

  it("should return current date when no argument", () => {
    const result = formatDate();
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});

describe("generateUrlEntry", () => {
  const url: SitemapUrl = {
    loc: "https://example.com/page",
    changefreq: "weekly",
    priority: 0.8,
  };

  it("should generate a basic URL entry", () => {
    const options: SitemapOptions = { ...DEFAULT_OPTIONS, prettyPrint: false };
    const result = generateUrlEntry(url, options);
    expect(result).toContain("<url>");
    expect(result).toContain("<loc>https://example.com/page</loc>");
    expect(result).toContain("<changefreq>weekly</changefreq>");
    expect(result).toContain("<priority>0.8</priority>");
    expect(result).toContain("</url>");
  });

  it("should include lastmod when option is enabled", () => {
    const options: SitemapOptions = {
      ...DEFAULT_OPTIONS,
      includeLastmod: true,
      prettyPrint: false,
    };
    const result = generateUrlEntry(url, options);
    expect(result).toContain("<lastmod>");
  });

  it("should format with indentation when prettyPrint is true", () => {
    const options: SitemapOptions = { ...DEFAULT_OPTIONS, prettyPrint: true };
    const result = generateUrlEntry(url, options, "  ");
    expect(result).toContain("  <url>");
    expect(result).toContain("    <loc>");
  });
});

describe("generateSitemap", () => {
  it("should generate a valid sitemap XML", () => {
    const urls: SitemapUrl[] = [
      { loc: "https://example.com/", changefreq: "daily", priority: 1.0 },
      { loc: "https://example.com/about", changefreq: "weekly", priority: 0.8 },
    ];
    const result = generateSitemap(urls, { prettyPrint: false });

    expect(result).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(result).toContain(
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    );
    expect(result).toContain("</urlset>");
    expect(result).toContain("https://example.com/");
    expect(result).toContain("https://example.com/about");
  });

  it("should use default options when not provided", () => {
    const urls: SitemapUrl[] = [{ loc: "https://example.com/" }];
    const result = generateSitemap(urls);
    expect(result).toContain("<priority>0.5</priority>");
  });
});

describe("generateSitemapIndex", () => {
  it("should generate a valid sitemap index", () => {
    const sitemapUrls = [
      "https://example.com/sitemap1.xml",
      "https://example.com/sitemap2.xml",
    ];
    const result = generateSitemapIndex(sitemapUrls);

    expect(result).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(result).toContain(
      '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    );
    expect(result).toContain("</sitemapindex>");
    expect(result).toContain("<sitemap>");
    expect(result).toContain("https://example.com/sitemap1.xml");
  });
});

describe("extractDomain", () => {
  it("should extract domain from URL", () => {
    expect(extractDomain("https://example.com/path")).toBe("example.com");
    expect(extractDomain("https://sub.example.com/path")).toBe(
      "sub.example.com",
    );
  });

  it("should return null for invalid URLs", () => {
    expect(extractDomain("not-a-url")).toBe(null);
  });
});

describe("validateSameDomain", () => {
  it("should return valid for same domain URLs", () => {
    const urls = ["https://example.com/", "https://example.com/about"];
    const result = validateSameDomain(urls);
    expect(result.valid).toBe(true);
    expect(result.domain).toBe("example.com");
    expect(result.invalidUrls).toEqual([]);
  });

  it("should return invalid for different domains", () => {
    const urls = ["https://example.com/", "https://other.com/about"];
    const result = validateSameDomain(urls);
    expect(result.valid).toBe(false);
    expect(result.invalidUrls).toContain("https://other.com/about");
  });

  it("should handle empty array", () => {
    const result = validateSameDomain([]);
    expect(result.valid).toBe(true);
    expect(result.domain).toBe(null);
  });
});

describe("calculateStats", () => {
  it("should calculate correct statistics", () => {
    const urls: SitemapUrl[] = [
      { loc: "https://example.com/", changefreq: "daily", priority: 1.0 },
      { loc: "https://example.com/about", changefreq: "weekly", priority: 0.8 },
      { loc: "https://other.com/page", changefreq: "daily", priority: 0.5 },
    ];
    const stats = calculateStats(urls);

    expect(stats.totalUrls).toBe(3);
    expect(stats.uniqueDomains).toBe(2);
    expect(stats.avgPriority).toBeCloseTo(0.767, 2);
    expect(stats.changefreqDistribution.daily).toBe(2);
    expect(stats.changefreqDistribution.weekly).toBe(1);
  });

  it("should handle empty array", () => {
    const stats = calculateStats([]);
    expect(stats.totalUrls).toBe(0);
    expect(stats.uniqueDomains).toBe(0);
    expect(stats.avgPriority).toBe(0);
  });
});
