/**
 * Headline Analyzer - Type Definitions
 */

export interface HeadlineAnalysis {
  /** Overall headline score (0-100) */
  score: number;
  /** Grade based on score */
  grade: HeadlineGrade;
  /** Word count */
  wordCount: number;
  /** Character count */
  characterCount: number;
  /** Estimated reading time in seconds */
  readingTime: number;
  /** Headline type classification */
  headlineType: HeadlineType;
  /** Word balance analysis */
  wordBalance: WordBalance;
  /** Sentiment analysis */
  sentiment: SentimentResult;
  /** SEO analysis */
  seo: SeoAnalysis;
  /** Suggestions for improvement */
  suggestions: string[];
}

export type HeadlineGrade = "A+" | "A" | "B+" | "B" | "C+" | "C" | "D" | "F";

export type HeadlineType =
  | "how-to"
  | "listicle"
  | "question"
  | "statement"
  | "command"
  | "news"
  | "comparison"
  | "guide"
  | "review"
  | "other";

export interface WordBalance {
  /** Common words percentage (the, is, a, etc.) */
  commonPercentage: number;
  /** Uncommon words percentage */
  uncommonPercentage: number;
  /** Emotional words percentage */
  emotionalPercentage: number;
  /** Power words percentage */
  powerPercentage: number;
  /** Common words found */
  commonWords: string[];
  /** Uncommon words found */
  uncommonWords: string[];
  /** Emotional words found */
  emotionalWords: string[];
  /** Power words found */
  powerWords: string[];
}

export interface SentimentResult {
  /** Overall sentiment type */
  type: "positive" | "negative" | "neutral";
  /** Sentiment score (-1 to 1) */
  score: number;
  /** Positive words found */
  positiveWords: string[];
  /** Negative words found */
  negativeWords: string[];
}

export interface SeoAnalysis {
  /** Title length score (0-100) */
  lengthScore: number;
  /** Whether headline contains numbers */
  hasNumbers: boolean;
  /** Whether headline uses parentheses/brackets */
  hasBrackets: boolean;
  /** Whether headline starts with number */
  startsWithNumber: boolean;
  /** Character count within optimal range (50-60) */
  isOptimalLength: boolean;
  /** Word count within optimal range (6-12) */
  isOptimalWordCount: boolean;
}

export interface AnalyzerOptions {
  /** Language for analysis (affects word lists) */
  language?: "en" | "ko" | "ja";
}

export const DEFAULT_OPTIONS: AnalyzerOptions = {
  language: "en",
};
