import type {
  StoredTrendCategory,
  TrendAnswer,
  TrendCategory,
  TrendGameMode,
} from "@/shared/types/trend";
import { getHighScoreKey } from "./game";

const recentCategoryKey = "trend-battle:recent-category";
const preferredModeKey = "trend-battle:preferred-mode";
const playedRoundsKey = "trend-battle:played-rounds";
const maxStoredPlayedRounds = 20;

export interface StoredPlayedRound {
  category: StoredTrendCategory;
  mode: TrendGameMode | "daily";
  leftItemId: string;
  rightItemId: string;
  selectedAnswer: TrendAnswer;
  correctAnswer: TrendAnswer;
  wasCorrect: boolean;
  score: number;
  playedAt: number;
  date?: string;
}

export function readHighScore(category: TrendCategory | "random") {
  if (typeof window === "undefined") return 0;

  const saved = window.localStorage.getItem(getHighScoreKey(category));
  const parsed = saved === null ? 0 : Number.parseInt(saved, 10);

  return Number.isFinite(parsed) ? parsed : 0;
}

export function writeHighScore(
  category: TrendCategory | "random",
  score: number,
) {
  if (typeof window === "undefined") return score;

  const nextScore = Math.max(readHighScore(category), score);
  window.localStorage.setItem(getHighScoreKey(category), String(nextScore));

  return nextScore;
}

export function readRecentCategory(): StoredTrendCategory | null {
  if (typeof window === "undefined") return null;

  const saved = window.localStorage.getItem(recentCategoryKey);

  return isStoredTrendCategory(saved) ? saved : null;
}

export function writeRecentCategory(category: StoredTrendCategory) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(recentCategoryKey, category);
}

export function readPreferredMode(): TrendGameMode | null {
  if (typeof window === "undefined") return null;

  const saved = window.localStorage.getItem(preferredModeKey);
  if (saved === "duel" || saved === "classic") return saved;

  if (saved !== null) {
    window.localStorage.removeItem(preferredModeKey);
  }

  return null;
}

export function writePreferredMode(mode: TrendGameMode) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(preferredModeKey, mode);
}

export function readPlayedRounds(): StoredPlayedRound[] {
  if (typeof window === "undefined") return [];

  const saved = window.localStorage.getItem(playedRoundsKey);
  if (saved === null) return [];

  try {
    const parsed: unknown = JSON.parse(saved);
    if (!Array.isArray(parsed)) {
      window.localStorage.removeItem(playedRoundsKey);
      return [];
    }

    const validRounds = parsed.filter(isStoredPlayedRound);

    if (validRounds.length !== parsed.length) {
      window.localStorage.setItem(playedRoundsKey, JSON.stringify(validRounds));
    }

    return validRounds;
  } catch {
    window.localStorage.removeItem(playedRoundsKey);
    return [];
  }
}

export function appendPlayedRound(round: StoredPlayedRound) {
  if (typeof window === "undefined") return;

  const rounds = [round, ...readPlayedRounds()].slice(0, maxStoredPlayedRounds);
  window.localStorage.setItem(playedRoundsKey, JSON.stringify(rounds));
}

function isStoredTrendCategory(
  category: string | null,
): category is StoredTrendCategory {
  return (
    category === "country_population" ||
    category === "city_population" ||
    category === "movie_box_office" ||
    category === "animal_speed" ||
    category === "mountain_height" ||
    category === "random" ||
    category === "daily"
  );
}

function isTrendAnswer(answer: unknown): answer is TrendAnswer {
  return answer === "left" || answer === "right";
}

function isStoredPlayedRound(value: unknown): value is StoredPlayedRound {
  if (typeof value !== "object" || value === null) return false;

  const round = value as Partial<StoredPlayedRound>;

  return (
    isStoredTrendCategory(round.category ?? null) &&
    (round.mode === "duel" ||
      round.mode === "classic" ||
      round.mode === "daily") &&
    typeof round.leftItemId === "string" &&
    typeof round.rightItemId === "string" &&
    isTrendAnswer(round.selectedAnswer) &&
    isTrendAnswer(round.correctAnswer) &&
    typeof round.wasCorrect === "boolean" &&
    typeof round.score === "number" &&
    typeof round.playedAt === "number" &&
    (round.date === undefined || typeof round.date === "string")
  );
}
