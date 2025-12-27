import { describe, it, expect } from "vitest";
import {
  extractWords,
  analyzeWordBalance,
  analyzeSentiment,
  detectHeadlineType,
  analyzeSeo,
  calculateScore,
  scoreToGrade,
  calculateReadingTime,
  analyzeHeadline,
  getGradeColor,
  getHeadlineTypeLabel,
} from "./analyzer";

describe("Headline Analyzer", () => {
  describe("extractWords", () => {
    it("extracts words from headline", () => {
      const words = extractWords("10 Best Ways to Learn Programming");
      expect(words).toEqual([
        "10",
        "best",
        "ways",
        "to",
        "learn",
        "programming",
      ]);
    });

    it("handles special characters", () => {
      const words = extractWords("What's the Best Way?");
      expect(words).toContain("what's");
      expect(words).toContain("the");
      expect(words).toContain("best");
    });

    it("returns empty array for empty string", () => {
      const words = extractWords("");
      expect(words).toEqual([]);
    });
  });

  describe("analyzeWordBalance", () => {
    it("identifies power words", () => {
      const words = ["free", "exclusive", "guide"];
      const balance = analyzeWordBalance(words);
      expect(balance.powerWords).toContain("free");
      expect(balance.powerWords).toContain("exclusive");
    });

    it("identifies emotional words", () => {
      const words = ["amazing", "incredible", "tips"];
      const balance = analyzeWordBalance(words);
      expect(balance.emotionalWords).toContain("amazing");
      expect(balance.emotionalWords).toContain("incredible");
    });

    it("identifies common words", () => {
      const words = ["the", "best", "way", "to", "learn"];
      const balance = analyzeWordBalance(words);
      expect(balance.commonWords).toContain("the");
      expect(balance.commonWords).toContain("to");
    });

    it("calculates percentages correctly", () => {
      const words = ["the", "best", "tips"]; // 1 common, 2 uncommon
      const balance = analyzeWordBalance(words);
      expect(balance.commonPercentage).toBe(33); // 1/3 * 100
      expect(balance.uncommonPercentage).toBe(67); // 2/3 * 100
    });
  });

  describe("analyzeSentiment", () => {
    it("detects positive sentiment", () => {
      const words = ["amazing", "best", "wonderful", "tips"];
      const sentiment = analyzeSentiment(words);
      expect(sentiment.type).toBe("positive");
      expect(sentiment.score).toBeGreaterThan(0);
    });

    it("detects negative sentiment", () => {
      const words = ["avoid", "worst", "mistakes", "fail"];
      const sentiment = analyzeSentiment(words);
      expect(sentiment.type).toBe("negative");
      expect(sentiment.score).toBeLessThan(0);
    });

    it("detects neutral sentiment", () => {
      const words = ["how", "to", "learn", "programming"];
      const sentiment = analyzeSentiment(words);
      expect(sentiment.type).toBe("neutral");
      expect(sentiment.score).toBe(0);
    });
  });

  describe("detectHeadlineType", () => {
    it("detects how-to headlines", () => {
      expect(detectHeadlineType("How to Learn Programming")).toBe("how-to");
      expect(detectHeadlineType("How To Build a Website")).toBe("how-to");
    });

    it("detects listicle headlines", () => {
      expect(detectHeadlineType("10 Best Ways to Learn")).toBe("listicle");
      expect(detectHeadlineType("Top 5 Programming Languages")).toBe(
        "listicle",
      );
      expect(detectHeadlineType("7 Tips for Success")).toBe("listicle");
    });

    it("detects question headlines", () => {
      expect(detectHeadlineType("What is TypeScript?")).toBe("question");
      expect(detectHeadlineType("Why Should You Learn React?")).toBe(
        "question",
      );
    });

    it("detects command headlines", () => {
      expect(detectHeadlineType("Start Your Journey Today")).toBe("command");
      expect(detectHeadlineType("Learn Programming Now")).toBe("command");
    });

    it("detects guide headlines", () => {
      expect(detectHeadlineType("The Complete Guide to React")).toBe("guide");
      expect(detectHeadlineType("Ultimate Tutorial for Beginners")).toBe(
        "guide",
      );
    });

    it("detects comparison headlines", () => {
      expect(detectHeadlineType("React vs Angular")).toBe("comparison");
      expect(detectHeadlineType("React versus Vue Comparison")).toBe(
        "comparison",
      );
    });
  });

  describe("analyzeSeo", () => {
    it("detects numbers in headline", () => {
      const seo = analyzeSeo("10 Best Tips", 3);
      expect(seo.hasNumbers).toBe(true);
      expect(seo.startsWithNumber).toBe(true);
    });

    it("detects brackets", () => {
      const seo = analyzeSeo("Best Tips [2024 Edition]", 4);
      expect(seo.hasBrackets).toBe(true);
    });

    it("calculates optimal length correctly", () => {
      const optimal = analyzeSeo(
        "This is a headline that is exactly optimal length chars",
        10,
      );
      expect(optimal.isOptimalLength).toBe(true);

      const tooShort = analyzeSeo("Short", 1);
      expect(tooShort.isOptimalLength).toBe(false);
    });

    it("calculates optimal word count", () => {
      const optimal = analyzeSeo("One two three four five six seven eight", 8);
      expect(optimal.isOptimalWordCount).toBe(true);

      const tooFew = analyzeSeo("Too short", 2);
      expect(tooFew.isOptimalWordCount).toBe(false);
    });
  });

  describe("calculateScore", () => {
    it("returns higher score for good headlines", () => {
      const goodBalance = {
        commonPercentage: 30,
        uncommonPercentage: 35,
        emotionalPercentage: 20,
        powerPercentage: 15,
        commonWords: ["the", "to"],
        uncommonWords: ["programming", "learn"],
        emotionalWords: ["amazing"],
        powerWords: ["free"],
      };
      const goodSentiment = {
        type: "positive" as const,
        score: 0.5,
        positiveWords: ["amazing", "best"],
        negativeWords: [],
      };
      const goodSeo = {
        lengthScore: 100,
        hasNumbers: true,
        hasBrackets: false,
        startsWithNumber: true,
        isOptimalLength: true,
        isOptimalWordCount: true,
      };

      const score = calculateScore(goodBalance, goodSentiment, goodSeo, 8, 55);
      expect(score).toBeGreaterThan(70);
    });

    it("returns lower score for poor headlines", () => {
      const poorBalance = {
        commonPercentage: 80,
        uncommonPercentage: 20,
        emotionalPercentage: 0,
        powerPercentage: 0,
        commonWords: ["the", "a", "to", "is"],
        uncommonWords: ["test"],
        emotionalWords: [],
        powerWords: [],
      };
      const neutralSentiment = {
        type: "neutral" as const,
        score: 0,
        positiveWords: [],
        negativeWords: [],
      };
      const poorSeo = {
        lengthScore: 50,
        hasNumbers: false,
        hasBrackets: false,
        startsWithNumber: false,
        isOptimalLength: false,
        isOptimalWordCount: false,
      };

      const score = calculateScore(
        poorBalance,
        neutralSentiment,
        poorSeo,
        3,
        20,
      );
      expect(score).toBeLessThan(50);
    });
  });

  describe("scoreToGrade", () => {
    it("returns correct grades", () => {
      expect(scoreToGrade(95)).toBe("A+");
      expect(scoreToGrade(85)).toBe("A");
      expect(scoreToGrade(75)).toBe("B+");
      expect(scoreToGrade(65)).toBe("B");
      expect(scoreToGrade(55)).toBe("C+");
      expect(scoreToGrade(45)).toBe("C");
      expect(scoreToGrade(35)).toBe("D");
      expect(scoreToGrade(25)).toBe("F");
    });
  });

  describe("calculateReadingTime", () => {
    it("calculates reading time correctly", () => {
      expect(calculateReadingTime(7)).toBe(2); // 7 / 3.5 = 2
      expect(calculateReadingTime(14)).toBe(4); // 14 / 3.5 = 4
      expect(calculateReadingTime(1)).toBe(1);
    });
  });

  describe("analyzeHeadline", () => {
    it("returns complete analysis for valid headline", () => {
      const analysis = analyzeHeadline(
        "10 Amazing Ways to Learn Programming Fast",
      );

      expect(analysis.score).toBeGreaterThan(0);
      expect(analysis.grade).toBeDefined();
      expect(analysis.wordCount).toBe(7);
      expect(analysis.characterCount).toBe(41);
      expect(analysis.headlineType).toBe("listicle");
      expect(analysis.wordBalance.emotionalWords).toContain("amazing");
      expect(analysis.seo.hasNumbers).toBe(true);
      expect(analysis.seo.startsWithNumber).toBe(true);
    });

    it("handles empty headline", () => {
      const analysis = analyzeHeadline("");

      expect(analysis.score).toBe(0);
      expect(analysis.grade).toBe("F");
      expect(analysis.wordCount).toBe(0);
      expect(analysis.suggestions).toContain("Enter a headline to analyze");
    });

    it("generates relevant suggestions", () => {
      const analysis = analyzeHeadline("Test");

      expect(analysis.suggestions.length).toBeGreaterThan(0);
      expect(analysis.suggestions.some((s) => s.includes("more words"))).toBe(
        true,
      );
    });
  });

  describe("getGradeColor", () => {
    it("returns success color for A grades", () => {
      expect(getGradeColor("A+")).toBe("text-success");
      expect(getGradeColor("A")).toBe("text-success");
    });

    it("returns info color for B grades", () => {
      expect(getGradeColor("B+")).toBe("text-info");
      expect(getGradeColor("B")).toBe("text-info");
    });

    it("returns warning color for C and D grades", () => {
      expect(getGradeColor("C+")).toBe("text-warning");
      expect(getGradeColor("C")).toBe("text-warning");
      expect(getGradeColor("D")).toBe("text-warning");
    });

    it("returns destructive color for F grade", () => {
      expect(getGradeColor("F")).toBe("text-destructive");
    });
  });

  describe("getHeadlineTypeLabel", () => {
    it("returns correct labels", () => {
      expect(getHeadlineTypeLabel("how-to")).toBe("How-To");
      expect(getHeadlineTypeLabel("listicle")).toBe("Listicle");
      expect(getHeadlineTypeLabel("question")).toBe("Question");
    });
  });
});
