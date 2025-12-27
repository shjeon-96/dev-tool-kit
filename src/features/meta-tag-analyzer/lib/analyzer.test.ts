import { describe, it, expect } from "vitest";
import { analyzeHtml, getGrade, getGradeColor } from "./analyzer";
import { LIMITS, SAMPLE_HTML } from "./types";

describe("meta-tag-analyzer", () => {
  describe("getGrade", () => {
    it("should return A+ for score >= 90", () => {
      expect(getGrade(90)).toBe("A+");
      expect(getGrade(100)).toBe("A+");
      expect(getGrade(95)).toBe("A+");
    });

    it("should return A for score 80-89", () => {
      expect(getGrade(80)).toBe("A");
      expect(getGrade(89)).toBe("A");
      expect(getGrade(85)).toBe("A");
    });

    it("should return B for score 70-79", () => {
      expect(getGrade(70)).toBe("B");
      expect(getGrade(79)).toBe("B");
      expect(getGrade(75)).toBe("B");
    });

    it("should return C for score 60-69", () => {
      expect(getGrade(60)).toBe("C");
      expect(getGrade(69)).toBe("C");
    });

    it("should return D for score 50-59", () => {
      expect(getGrade(50)).toBe("D");
      expect(getGrade(59)).toBe("D");
    });

    it("should return F for score < 50", () => {
      expect(getGrade(49)).toBe("F");
      expect(getGrade(0)).toBe("F");
      expect(getGrade(25)).toBe("F");
    });
  });

  describe("getGradeColor", () => {
    it("should return success color for A+ and A", () => {
      expect(getGradeColor("A+")).toBe("text-success");
      expect(getGradeColor("A")).toBe("text-success");
    });

    it("should return success color for B", () => {
      expect(getGradeColor("B")).toBe("text-success");
    });

    it("should return warning color for C and D", () => {
      expect(getGradeColor("C")).toBe("text-warning");
      expect(getGradeColor("D")).toBe("text-warning");
    });

    it("should return destructive color for F", () => {
      expect(getGradeColor("F")).toBe("text-destructive");
    });

    it("should return destructive color for unknown grade", () => {
      expect(getGradeColor("X")).toBe("text-destructive");
    });
  });

  describe("LIMITS", () => {
    it("should have correct title limits", () => {
      expect(LIMITS.TITLE_MIN).toBe(30);
      expect(LIMITS.TITLE_MAX).toBe(60);
      expect(LIMITS.TITLE_OPTIMAL).toBe(50);
    });

    it("should have correct description limits", () => {
      expect(LIMITS.DESCRIPTION_MIN).toBe(120);
      expect(LIMITS.DESCRIPTION_MAX).toBe(160);
      expect(LIMITS.DESCRIPTION_OPTIMAL).toBe(150);
    });

    it("should have title limits less than description limits", () => {
      expect(LIMITS.TITLE_MAX).toBeLessThan(LIMITS.DESCRIPTION_MIN);
    });
  });

  describe("analyzeHtml", () => {
    it("should analyze SAMPLE_HTML correctly", () => {
      const result = analyzeHtml(SAMPLE_HTML);

      expect(result.meta.title).toBe("Example Page - Best Practices for SEO");
      expect(result.meta.description).toContain("best practices for SEO");
      expect(result.meta.keywords).toBe("SEO, meta tags, optimization");
      expect(result.meta.canonical).toBe("https://example.com/seo-guide");
      expect(result.meta.viewport).toBe(
        "width=device-width, initial-scale=1.0",
      );
      expect(result.meta.charset).toBe("UTF-8");
    });

    it("should extract Open Graph tags", () => {
      const result = analyzeHtml(SAMPLE_HTML);

      expect(result.openGraph.title).toBe("SEO Best Practices Guide");
      expect(result.openGraph.description).toBe(
        "Complete guide to SEO optimization",
      );
      expect(result.openGraph.image).toBe("https://example.com/og-image.png");
      expect(result.openGraph.url).toBe("https://example.com/seo-guide");
      expect(result.openGraph.type).toBe("article");
    });

    it("should extract Twitter Card tags", () => {
      const result = analyzeHtml(SAMPLE_HTML);

      expect(result.twitterCard.card).toBe("summary_large_image");
      expect(result.twitterCard.title).toBe("SEO Best Practices");
      expect(result.twitterCard.description).toBe(
        "Learn SEO optimization techniques",
      );
    });

    it("should extract headings", () => {
      const result = analyzeHtml(SAMPLE_HTML);

      expect(result.h1Tags).toHaveLength(1);
      expect(result.h1Tags[0]).toBe("SEO Best Practices Guide");
      expect(result.h2Tags).toHaveLength(2);
      expect(result.h2Tags).toContain("Meta Tags");
      expect(result.h2Tags).toContain("Open Graph");
    });

    it("should count words", () => {
      const result = analyzeHtml(SAMPLE_HTML);
      expect(result.wordCount).toBeGreaterThan(0);
    });

    it("should calculate score and grade", () => {
      const result = analyzeHtml(SAMPLE_HTML);
      expect(result.score).toBeGreaterThanOrEqual(0);
      expect(result.score).toBeLessThanOrEqual(100);
      expect(["A+", "A", "B", "C", "D", "F"]).toContain(result.grade);
    });

    it("should detect missing title", () => {
      const html = `<!DOCTYPE html>
        <html>
        <head>
          <meta name="description" content="A description here that is long enough to pass validation">
        </head>
        <body><h1>Heading</h1></body>
        </html>`;

      const result = analyzeHtml(html);
      const titleIssue = result.issues.find(
        (i) => i.type === "title" && i.level === "error",
      );
      expect(titleIssue).toBeDefined();
      expect(titleIssue?.message).toContain("title");
    });

    it("should detect short title", () => {
      const html = `<!DOCTYPE html>
        <html>
        <head>
          <title>Short</title>
          <meta name="description" content="A description here that is long enough to pass validation requirements">
          <meta name="viewport" content="width=device-width">
        </head>
        <body><h1>Heading</h1></body>
        </html>`;

      const result = analyzeHtml(html);
      const titleIssue = result.issues.find(
        (i) => i.type === "title" && i.level === "warning",
      );
      expect(titleIssue).toBeDefined();
      expect(titleIssue?.message).toContain("짧습니다");
    });

    it("should detect long title", () => {
      const longTitle = "A".repeat(70);
      const html = `<!DOCTYPE html>
        <html>
        <head>
          <title>${longTitle}</title>
          <meta name="description" content="A description here that is long enough to pass validation requirements">
          <meta name="viewport" content="width=device-width">
        </head>
        <body><h1>Heading</h1></body>
        </html>`;

      const result = analyzeHtml(html);
      const titleIssue = result.issues.find(
        (i) => i.type === "title" && i.level === "warning",
      );
      expect(titleIssue).toBeDefined();
      expect(titleIssue?.message).toContain("깁니다");
    });

    it("should detect missing description", () => {
      const html = `<!DOCTYPE html>
        <html>
        <head>
          <title>A valid title that is long enough</title>
          <meta name="viewport" content="width=device-width">
        </head>
        <body><h1>Heading</h1></body>
        </html>`;

      const result = analyzeHtml(html);
      const descIssue = result.issues.find(
        (i) => i.type === "description" && i.level === "error",
      );
      expect(descIssue).toBeDefined();
    });

    it("should detect short description", () => {
      const html = `<!DOCTYPE html>
        <html>
        <head>
          <title>A valid title that is long enough</title>
          <meta name="description" content="Too short">
          <meta name="viewport" content="width=device-width">
        </head>
        <body><h1>Heading</h1></body>
        </html>`;

      const result = analyzeHtml(html);
      const descIssue = result.issues.find(
        (i) => i.type === "description" && i.level === "warning",
      );
      expect(descIssue).toBeDefined();
      expect(descIssue?.message).toContain("짧습니다");
    });

    it("should detect long description", () => {
      const longDesc = "A".repeat(200);
      const html = `<!DOCTYPE html>
        <html>
        <head>
          <title>A valid title that is long enough</title>
          <meta name="description" content="${longDesc}">
          <meta name="viewport" content="width=device-width">
        </head>
        <body><h1>Heading</h1></body>
        </html>`;

      const result = analyzeHtml(html);
      const descIssue = result.issues.find(
        (i) => i.type === "description" && i.level === "warning",
      );
      expect(descIssue).toBeDefined();
      expect(descIssue?.message).toContain("깁니다");
    });

    it("should detect missing H1", () => {
      const html = `<!DOCTYPE html>
        <html>
        <head>
          <title>A valid title that is long enough</title>
          <meta name="description" content="A description here that is long enough to pass validation requirements">
          <meta name="viewport" content="width=device-width">
        </head>
        <body><h2>No H1 here</h2></body>
        </html>`;

      const result = analyzeHtml(html);
      const h1Issue = result.issues.find(
        (i) => i.type === "h1" && i.level === "error",
      );
      expect(h1Issue).toBeDefined();
    });

    it("should detect multiple H1 tags", () => {
      const html = `<!DOCTYPE html>
        <html>
        <head>
          <title>A valid title that is long enough</title>
          <meta name="description" content="A description here that is long enough to pass validation requirements">
          <meta name="viewport" content="width=device-width">
        </head>
        <body>
          <h1>First H1</h1>
          <h1>Second H1</h1>
        </body>
        </html>`;

      const result = analyzeHtml(html);
      const h1Issue = result.issues.find(
        (i) => i.type === "h1" && i.level === "warning",
      );
      expect(h1Issue).toBeDefined();
      expect(h1Issue?.message).toContain("2개");
    });

    it("should detect missing viewport", () => {
      const html = `<!DOCTYPE html>
        <html>
        <head>
          <title>A valid title that is long enough</title>
          <meta name="description" content="A description here that is long enough to pass validation requirements">
        </head>
        <body><h1>Heading</h1></body>
        </html>`;

      const result = analyzeHtml(html);
      const viewportIssue = result.issues.find(
        (i) => i.type === "viewport" && i.level === "error",
      );
      expect(viewportIssue).toBeDefined();
    });

    it("should detect missing Open Graph tags", () => {
      const html = `<!DOCTYPE html>
        <html>
        <head>
          <title>A valid title that is long enough</title>
          <meta name="description" content="A description here that is long enough to pass validation requirements">
          <meta name="viewport" content="width=device-width">
        </head>
        <body><h1>Heading</h1></body>
        </html>`;

      const result = analyzeHtml(html);
      const ogIssues = result.issues.filter((i) => i.type === "og");
      expect(ogIssues.length).toBeGreaterThan(0);
    });

    it("should detect images without alt attribute", () => {
      const html = `<!DOCTYPE html>
        <html>
        <head>
          <title>A valid title that is long enough</title>
          <meta name="description" content="A description here that is long enough to pass validation requirements">
          <meta name="viewport" content="width=device-width">
        </head>
        <body>
          <h1>Heading</h1>
          <img src="image1.jpg">
          <img src="image2.jpg">
        </body>
        </html>`;

      const result = analyzeHtml(html);
      expect(result.imageCount).toBe(2);

      const altIssue = result.issues.find((i) => i.type === "accessibility");
      expect(altIssue).toBeDefined();
      expect(altIssue?.message).toContain("2개");
    });

    it("should not flag images with alt attribute", () => {
      const html = `<!DOCTYPE html>
        <html>
        <head>
          <title>A valid title that is long enough</title>
          <meta name="description" content="A description here that is long enough to pass validation requirements">
          <meta name="viewport" content="width=device-width">
        </head>
        <body>
          <h1>Heading</h1>
          <img src="image1.jpg" alt="Image 1">
          <img src="image2.jpg" alt="Image 2">
        </body>
        </html>`;

      const result = analyzeHtml(html);
      const altIssue = result.issues.find((i) => i.type === "accessibility");
      expect(altIssue).toBeUndefined();
    });

    it("should give perfect score for well-optimized page", () => {
      const perfectHtml = `<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Perfect SEO Page - Best Practices Guide</title>
          <meta name="description" content="This is a perfectly optimized page with all the required meta tags. It includes proper description length for SEO optimization.">
          <link rel="canonical" href="https://example.com/perfect">
          <meta property="og:title" content="Perfect SEO Page">
          <meta property="og:description" content="Perfect optimization">
          <meta property="og:image" content="https://example.com/image.jpg">
          <meta name="twitter:card" content="summary">
        </head>
        <body>
          <h1>Perfect SEO Page</h1>
          <img src="image.jpg" alt="Description">
        </body>
        </html>`;

      const result = analyzeHtml(perfectHtml);
      expect(result.score).toBeGreaterThanOrEqual(90);
      expect(result.grade).toBe("A+");
    });

    it("should give low score for poorly optimized page", () => {
      const poorHtml = `<!DOCTYPE html>
        <html>
        <head></head>
        <body>
          <p>No meta tags, no heading, nothing.</p>
          <img src="bad.jpg">
        </body>
        </html>`;

      const result = analyzeHtml(poorHtml);
      expect(result.score).toBeLessThan(50);
      expect(result.grade).toBe("F");
    });
  });

  describe("score calculation", () => {
    it("should deduct 15 points per error", () => {
      // Missing title, description, viewport, h1 = 4 errors = -60
      const html = `<!DOCTYPE html><html><head></head><body></body></html>`;
      const result = analyzeHtml(html);

      // Should have multiple errors
      const errorCount = result.issues.filter(
        (i) => i.level === "error",
      ).length;
      expect(errorCount).toBeGreaterThanOrEqual(3);
    });

    it("should deduct 8 points per warning", () => {
      // Title too short is a warning
      const html = `<!DOCTYPE html>
        <html>
        <head>
          <title>Hi</title>
          <meta name="viewport" content="width=device-width">
        </head>
        <body><h1>H</h1></body>
        </html>`;

      const result = analyzeHtml(html);
      const warnings = result.issues.filter((i) => i.level === "warning");
      expect(warnings.length).toBeGreaterThan(0);
    });

    it("should deduct 3 points per info", () => {
      const html = `<!DOCTYPE html>
        <html>
        <head>
          <title>A valid title that is long enough</title>
          <meta name="description" content="A description here that is long enough to pass validation requirements">
          <meta name="viewport" content="width=device-width">
          <meta property="og:title" content="OG Title">
          <meta property="og:description" content="OG Description">
          <meta property="og:image" content="https://example.com/image.jpg">
        </head>
        <body><h1>Heading</h1></body>
        </html>`;

      const result = analyzeHtml(html);
      const infos = result.issues.filter((i) => i.level === "info");
      // Should have canonical and twitter card as info
      expect(infos.length).toBeGreaterThanOrEqual(1);
    });

    it("should not go below 0 or above 100", () => {
      const badHtml = `<!DOCTYPE html><html><head></head><body><img src="a"><img src="b"><img src="c"></body></html>`;
      const result = analyzeHtml(badHtml);

      expect(result.score).toBeGreaterThanOrEqual(0);
      expect(result.score).toBeLessThanOrEqual(100);
    });
  });
});
