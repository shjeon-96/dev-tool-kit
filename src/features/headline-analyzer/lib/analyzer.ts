/**
 * Headline Analyzer - Core Analysis Logic
 */

import type {
  HeadlineAnalysis,
  HeadlineGrade,
  HeadlineType,
  WordBalance,
  SentimentResult,
  SeoAnalysis,
  AnalyzerOptions,
  DEFAULT_OPTIONS,
} from "./types";
import {
  POWER_WORDS,
  EMOTIONAL_WORDS,
  COMMON_WORDS,
  POSITIVE_WORDS,
  NEGATIVE_WORDS,
  HEADLINE_PATTERNS,
} from "./word-lists";

/**
 * Extract words from headline (lowercase, alphanumeric only)
 */
export function extractWords(headline: string): string[] {
  return headline
    .toLowerCase()
    .replace(/[^a-z0-9\s'-]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 0);
}

/**
 * Calculate word balance (common, uncommon, emotional, power)
 */
export function analyzeWordBalance(words: string[]): WordBalance {
  const commonWords: string[] = [];
  const uncommonWords: string[] = [];
  const emotionalWords: string[] = [];
  const powerWords: string[] = [];

  const uniqueWords = [...new Set(words)];

  for (const word of uniqueWords) {
    if (POWER_WORDS.has(word)) {
      powerWords.push(word);
    }
    if (EMOTIONAL_WORDS.has(word)) {
      emotionalWords.push(word);
    }
    if (COMMON_WORDS.has(word)) {
      commonWords.push(word);
    } else {
      uncommonWords.push(word);
    }
  }

  const totalWords = words.length || 1;

  return {
    commonPercentage: Math.round((commonWords.length / totalWords) * 100),
    uncommonPercentage: Math.round((uncommonWords.length / totalWords) * 100),
    emotionalPercentage: Math.round((emotionalWords.length / totalWords) * 100),
    powerPercentage: Math.round((powerWords.length / totalWords) * 100),
    commonWords,
    uncommonWords,
    emotionalWords,
    powerWords,
  };
}

/**
 * Analyze sentiment of headline
 */
export function analyzeSentiment(words: string[]): SentimentResult {
  const positiveWords: string[] = [];
  const negativeWords: string[] = [];

  for (const word of words) {
    if (POSITIVE_WORDS.has(word)) {
      positiveWords.push(word);
    }
    if (NEGATIVE_WORDS.has(word)) {
      negativeWords.push(word);
    }
  }

  const positiveCount = positiveWords.length;
  const negativeCount = negativeWords.length;
  const totalSentimentWords = positiveCount + negativeCount;

  let score = 0;
  if (totalSentimentWords > 0) {
    score = (positiveCount - negativeCount) / totalSentimentWords;
  }

  let type: "positive" | "negative" | "neutral" = "neutral";
  if (score > 0.2) {
    type = "positive";
  } else if (score < -0.2) {
    type = "negative";
  }

  return {
    type,
    score: Math.round(score * 100) / 100,
    positiveWords,
    negativeWords,
  };
}

/**
 * Detect headline type
 */
export function detectHeadlineType(headline: string): HeadlineType {
  const trimmed = headline.trim();

  for (const [type, pattern] of Object.entries(HEADLINE_PATTERNS)) {
    if (pattern.test(trimmed)) {
      return type as HeadlineType;
    }
  }

  // Check for statement (declarative sentence)
  if (/^[A-Z].*[^?!]$/.test(trimmed)) {
    return "statement";
  }

  return "other";
}

/**
 * Analyze SEO factors
 */
export function analyzeSeo(headline: string, wordCount: number): SeoAnalysis {
  const charCount = headline.length;
  const hasNumbers = /\d/.test(headline);
  const hasBrackets = /[\[\](){}]/.test(headline);
  const startsWithNumber = /^\d/.test(headline.trim());

  // Optimal title length for SEO: 50-60 characters
  const isOptimalLength = charCount >= 50 && charCount <= 60;
  // Optimal word count: 6-12 words
  const isOptimalWordCount = wordCount >= 6 && wordCount <= 12;

  // Calculate length score
  let lengthScore = 100;
  if (charCount < 30) {
    lengthScore = 50;
  } else if (charCount < 50) {
    lengthScore = 75;
  } else if (charCount > 70) {
    lengthScore = 70;
  } else if (charCount > 60) {
    lengthScore = 85;
  }

  return {
    lengthScore,
    hasNumbers,
    hasBrackets,
    startsWithNumber,
    isOptimalLength,
    isOptimalWordCount,
  };
}

/**
 * Generate improvement suggestions
 */
export function generateSuggestions(
  headline: string,
  wordBalance: WordBalance,
  sentiment: SentimentResult,
  seo: SeoAnalysis,
  wordCount: number,
): string[] {
  const suggestions: string[] = [];

  // Word count suggestions
  if (wordCount < 6) {
    suggestions.push(
      "Add more words for a stronger headline (aim for 6-12 words)",
    );
  } else if (wordCount > 15) {
    suggestions.push("Consider shortening your headline (aim for 6-12 words)");
  }

  // Character count suggestions
  if (headline.length < 40) {
    suggestions.push(
      "Your headline is short. Consider adding more detail for SEO",
    );
  } else if (headline.length > 70) {
    suggestions.push(
      "Your headline may be truncated in search results (keep under 60 characters)",
    );
  }

  // Power/Emotional word suggestions
  if (
    wordBalance.powerWords.length === 0 &&
    wordBalance.emotionalWords.length === 0
  ) {
    suggestions.push(
      "Add power words or emotional words to make your headline more compelling",
    );
  }

  // Number suggestions
  if (!seo.hasNumbers && wordCount > 3) {
    suggestions.push("Consider adding a number for higher click-through rates");
  }

  // Uncommon word suggestions
  if (wordBalance.uncommonPercentage < 20) {
    suggestions.push("Use more unique/uncommon words to stand out");
  }

  // Common word overuse
  if (wordBalance.commonPercentage > 60) {
    suggestions.push(
      "Too many common words. Replace some with more specific terms",
    );
  }

  // Neutral sentiment
  if (sentiment.type === "neutral" && wordCount > 4) {
    suggestions.push(
      "Add emotional words to create a stronger connection with readers",
    );
  }

  return suggestions.slice(0, 5); // Limit to 5 suggestions
}

/**
 * Calculate overall headline score
 */
export function calculateScore(
  wordBalance: WordBalance,
  sentiment: SentimentResult,
  seo: SeoAnalysis,
  wordCount: number,
  characterCount: number,
): number {
  let score = 50; // Base score

  // Word count bonus (max +15)
  if (wordCount >= 6 && wordCount <= 12) {
    score += 15;
  } else if (wordCount >= 4 && wordCount <= 15) {
    score += 8;
  }

  // Character count bonus (max +10)
  if (characterCount >= 50 && characterCount <= 60) {
    score += 10;
  } else if (characterCount >= 40 && characterCount <= 70) {
    score += 5;
  }

  // Power words bonus (max +10)
  score += Math.min(wordBalance.powerWords.length * 3, 10);

  // Emotional words bonus (max +10)
  score += Math.min(wordBalance.emotionalWords.length * 3, 10);

  // Uncommon words bonus (max +8)
  if (
    wordBalance.uncommonPercentage >= 20 &&
    wordBalance.uncommonPercentage <= 40
  ) {
    score += 8;
  } else if (wordBalance.uncommonPercentage > 10) {
    score += 4;
  }

  // Numbers bonus (+5)
  if (seo.hasNumbers) {
    score += 5;
  }

  // Starts with number bonus (+3)
  if (seo.startsWithNumber) {
    score += 3;
  }

  // Sentiment bonus (max +5)
  if (sentiment.type !== "neutral") {
    score += 5;
  }

  // Balance penalty (too many common words)
  if (wordBalance.commonPercentage > 70) {
    score -= 10;
  }

  // Ensure score is within 0-100
  return Math.max(0, Math.min(100, Math.round(score)));
}

/**
 * Convert score to grade
 */
export function scoreToGrade(score: number): HeadlineGrade {
  if (score >= 90) return "A+";
  if (score >= 80) return "A";
  if (score >= 70) return "B+";
  if (score >= 60) return "B";
  if (score >= 50) return "C+";
  if (score >= 40) return "C";
  if (score >= 30) return "D";
  return "F";
}

/**
 * Calculate reading time in seconds
 */
export function calculateReadingTime(wordCount: number): number {
  // Average reading speed: 200-250 words per minute
  // For headlines, people read slower due to attention
  const wordsPerSecond = 3.5;
  return Math.ceil(wordCount / wordsPerSecond);
}

/**
 * Main analysis function
 */
export function analyzeHeadline(
  headline: string,
  options: AnalyzerOptions = {},
): HeadlineAnalysis {
  const trimmedHeadline = headline.trim();

  if (!trimmedHeadline) {
    return {
      score: 0,
      grade: "F",
      wordCount: 0,
      characterCount: 0,
      readingTime: 0,
      headlineType: "other",
      wordBalance: {
        commonPercentage: 0,
        uncommonPercentage: 0,
        emotionalPercentage: 0,
        powerPercentage: 0,
        commonWords: [],
        uncommonWords: [],
        emotionalWords: [],
        powerWords: [],
      },
      sentiment: {
        type: "neutral",
        score: 0,
        positiveWords: [],
        negativeWords: [],
      },
      seo: {
        lengthScore: 0,
        hasNumbers: false,
        hasBrackets: false,
        startsWithNumber: false,
        isOptimalLength: false,
        isOptimalWordCount: false,
      },
      suggestions: ["Enter a headline to analyze"],
    };
  }

  const words = extractWords(trimmedHeadline);
  const wordCount = words.length;
  const characterCount = trimmedHeadline.length;

  const wordBalance = analyzeWordBalance(words);
  const sentiment = analyzeSentiment(words);
  const seo = analyzeSeo(trimmedHeadline, wordCount);
  const headlineType = detectHeadlineType(trimmedHeadline);
  const readingTime = calculateReadingTime(wordCount);

  const score = calculateScore(
    wordBalance,
    sentiment,
    seo,
    wordCount,
    characterCount,
  );
  const grade = scoreToGrade(score);

  const suggestions = generateSuggestions(
    trimmedHeadline,
    wordBalance,
    sentiment,
    seo,
    wordCount,
  );

  return {
    score,
    grade,
    wordCount,
    characterCount,
    readingTime,
    headlineType,
    wordBalance,
    sentiment,
    seo,
    suggestions,
  };
}

/**
 * Get grade color for UI
 */
export function getGradeColor(grade: HeadlineGrade): string {
  switch (grade) {
    case "A+":
    case "A":
      return "text-success";
    case "B+":
    case "B":
      return "text-info";
    case "C+":
    case "C":
      return "text-warning";
    case "D":
      return "text-warning";
    case "F":
      return "text-destructive";
  }
}

/**
 * Get headline type label
 */
export function getHeadlineTypeLabel(type: HeadlineType): string {
  const labels: Record<HeadlineType, string> = {
    "how-to": "How-To",
    listicle: "Listicle",
    question: "Question",
    statement: "Statement",
    command: "Command",
    news: "News",
    comparison: "Comparison",
    guide: "Guide",
    review: "Review",
    other: "Other",
  };
  return labels[type];
}
