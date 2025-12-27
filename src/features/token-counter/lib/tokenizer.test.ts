import { describe, it, expect } from "vitest";
import {
  countTokens,
  getTextStats,
  calculateCost,
  analyzeText,
  formatCurrency,
  formatNumber,
  getTokenWordRatio,
  estimateReadingTime,
} from "./tokenizer";

describe("tokenizer", () => {
  describe("countTokens", () => {
    it("should return 0 for empty string", () => {
      expect(countTokens("", "gpt-4o")).toBe(0);
    });

    it("should count tokens for simple text with OpenAI model", () => {
      const tokens = countTokens("Hello, world!", "gpt-4o");
      expect(tokens).toBeGreaterThan(0);
      expect(tokens).toBeLessThan(10); // "Hello, world!" should be ~4 tokens
    });

    it("should count tokens for simple text with Anthropic model", () => {
      const tokens = countTokens("Hello, world!", "claude-3.5-sonnet");
      expect(tokens).toBeGreaterThan(0);
      // Anthropic uses ~0.9x multiplier
      expect(tokens).toBeLessThan(10);
    });

    it("should count more tokens for longer text", () => {
      const shortTokens = countTokens("Hello", "gpt-4o");
      const longTokens = countTokens(
        "Hello, this is a longer sentence with more words.",
        "gpt-4o",
      );
      expect(longTokens).toBeGreaterThan(shortTokens);
    });

    it("should handle Korean text", () => {
      const tokens = countTokens("안녕하세요, 세계!", "gpt-4o");
      expect(tokens).toBeGreaterThan(0);
    });

    it("should handle code snippets", () => {
      const code = `function hello() {\n  console.log("Hello");\n}`;
      const tokens = countTokens(code, "gpt-4o");
      expect(tokens).toBeGreaterThan(5);
    });

    it("should apply 0.9x multiplier for Anthropic models", () => {
      const text = "This is a test sentence for token counting.";
      const openaiTokens = countTokens(text, "gpt-4o");
      const anthropicTokens = countTokens(text, "claude-3.5-sonnet");
      // Anthropic tokens should be approximately 90% of OpenAI tokens
      expect(anthropicTokens).toBeLessThanOrEqual(openaiTokens);
    });
  });

  describe("getTextStats", () => {
    it("should return zeros for empty string", () => {
      const stats = getTextStats("");
      expect(stats).toEqual({ characters: 0, words: 0, lines: 0 });
    });

    it("should count characters correctly", () => {
      const stats = getTextStats("Hello");
      expect(stats.characters).toBe(5);
    });

    it("should count words correctly", () => {
      const stats = getTextStats("Hello world test");
      expect(stats.words).toBe(3);
    });

    it("should count lines correctly", () => {
      const stats = getTextStats("Line 1\nLine 2\nLine 3");
      expect(stats.lines).toBe(3);
    });

    it("should handle single line", () => {
      const stats = getTextStats("Single line");
      expect(stats.lines).toBe(1);
    });

    it("should handle Windows line endings (CRLF)", () => {
      const stats = getTextStats("Line 1\r\nLine 2");
      expect(stats.lines).toBe(2);
    });

    it("should handle old Mac line endings (CR)", () => {
      const stats = getTextStats("Line 1\rLine 2");
      expect(stats.lines).toBe(2);
    });

    it("should handle whitespace-only string", () => {
      const stats = getTextStats("   ");
      expect(stats.characters).toBe(3);
      expect(stats.words).toBe(0);
    });

    it("should handle multiple spaces between words", () => {
      const stats = getTextStats("Hello    world");
      expect(stats.words).toBe(2);
    });
  });

  describe("calculateCost", () => {
    it("should calculate cost for GPT-4o", () => {
      const cost = calculateCost(1000, 1.0, "gpt-4o");
      // GPT-4o: $2.5 input, $10 output per 1M tokens
      // 1000 input + 1000 output = $0.0025 + $0.01 = $0.0125
      expect(cost.inputCost).toBeCloseTo(0.0025, 4);
      expect(cost.outputCost).toBeCloseTo(0.01, 4);
      expect(cost.totalCost).toBeCloseTo(0.0125, 4);
      expect(cost.outputTokensEstimate).toBe(1000);
    });

    it("should calculate cost with different output ratio", () => {
      const cost = calculateCost(1000, 2.0, "gpt-4o");
      expect(cost.outputTokensEstimate).toBe(2000);
      expect(cost.outputCost).toBeCloseTo(0.02, 4);
    });

    it("should calculate cost for Claude 3.5 Sonnet", () => {
      const cost = calculateCost(1000, 1.0, "claude-3.5-sonnet");
      // Claude 3.5 Sonnet: $3 input, $15 output per 1M tokens
      expect(cost.inputCost).toBeCloseTo(0.003, 4);
      expect(cost.outputCost).toBeCloseTo(0.015, 4);
      expect(cost.totalCost).toBeCloseTo(0.018, 4);
    });

    it("should handle zero tokens", () => {
      const cost = calculateCost(0, 1.0, "gpt-4o");
      expect(cost.inputCost).toBe(0);
      expect(cost.outputCost).toBe(0);
      expect(cost.totalCost).toBe(0);
    });

    it("should handle fractional output ratio", () => {
      const cost = calculateCost(1000, 0.5, "gpt-4o");
      expect(cost.outputTokensEstimate).toBe(500);
    });

    it("should calculate cost for o1-pro (expensive model)", () => {
      const cost = calculateCost(1000000, 1.0, "o1-pro");
      // o1-pro: $150 input, $600 output per 1M tokens
      expect(cost.inputCost).toBeCloseTo(150, 0);
      expect(cost.outputCost).toBeCloseTo(600, 0);
    });
  });

  describe("analyzeText", () => {
    it("should return complete analysis for text", () => {
      const result = analyzeText("Hello world", "gpt-4o", 1.0);

      expect(result.count.tokens).toBeGreaterThan(0);
      expect(result.count.characters).toBe(11);
      expect(result.count.words).toBe(2);
      expect(result.count.lines).toBe(1);
      expect(result.model).toBe("gpt-4o");
      expect(result.costEstimate).toBeDefined();
      expect(result.percentOfContext).toBeGreaterThan(0);
    });

    it("should calculate percent of context correctly", () => {
      // GPT-4o has 128000 context window
      const result = analyzeText("Test", "gpt-4o", 1.0);
      expect(result.percentOfContext).toBeLessThan(1);
    });

    it("should use default output ratio of 1.0", () => {
      const withDefault = analyzeText("Test", "gpt-4o");
      const withExplicit = analyzeText("Test", "gpt-4o", 1.0);
      expect(withDefault.costEstimate.outputTokensEstimate).toBe(
        withExplicit.costEstimate.outputTokensEstimate,
      );
    });

    it("should include cost estimate", () => {
      const result = analyzeText("Hello world", "gpt-4o", 1.5);
      expect(result.costEstimate.inputCost).toBeGreaterThan(0);
      expect(result.costEstimate.outputCost).toBeGreaterThan(0);
      expect(result.costEstimate.totalCost).toBeGreaterThan(0);
    });
  });

  describe("formatCurrency", () => {
    it("should format very small values with 4 decimals", () => {
      expect(formatCurrency(0.00001)).toBe("$0.0000");
    });

    it("should format small values with 4 decimals", () => {
      expect(formatCurrency(0.0012)).toBe("$0.0012");
    });

    it("should format medium values with 3 decimals", () => {
      expect(formatCurrency(0.123)).toBe("$0.123");
    });

    it("should format values >= 1 with 2 decimals", () => {
      expect(formatCurrency(1.234)).toBe("$1.23");
    });

    it("should format large values correctly", () => {
      expect(formatCurrency(100.5)).toBe("$100.50");
    });

    it("should handle zero", () => {
      expect(formatCurrency(0)).toBe("$0.0000");
    });
  });

  describe("formatNumber", () => {
    it("should format small numbers without commas", () => {
      expect(formatNumber(999)).toBe("999");
    });

    it("should format thousands with commas", () => {
      expect(formatNumber(1000)).toMatch(/1.?000/); // locale-dependent separator
    });

    it("should format millions", () => {
      const formatted = formatNumber(1000000);
      expect(formatted).toContain("000");
    });

    it("should handle zero", () => {
      expect(formatNumber(0)).toBe("0");
    });
  });

  describe("getTokenWordRatio", () => {
    it("should calculate ratio correctly", () => {
      expect(getTokenWordRatio(10, 5)).toBe(2);
    });

    it("should return 0 when words is 0", () => {
      expect(getTokenWordRatio(10, 0)).toBe(0);
    });

    it("should handle fractional ratios", () => {
      expect(getTokenWordRatio(5, 10)).toBe(0.5);
    });
  });

  describe("estimateReadingTime", () => {
    it("should estimate reading time with default WPM", () => {
      // 200 words at 200 WPM = 1 minute
      expect(estimateReadingTime(200)).toBe(1);
    });

    it("should estimate reading time with custom WPM", () => {
      // 300 words at 100 WPM = 3 minutes
      expect(estimateReadingTime(300, 100)).toBe(3);
    });

    it("should round up partial minutes", () => {
      // 201 words at 200 WPM = 1.005 minutes, should round to 2
      expect(estimateReadingTime(201)).toBe(2);
    });

    it("should handle zero words", () => {
      expect(estimateReadingTime(0)).toBe(0);
    });

    it("should handle very short text", () => {
      expect(estimateReadingTime(50)).toBe(1);
    });
  });
});
