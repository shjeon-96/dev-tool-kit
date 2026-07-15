import type { TrendCategory } from "@/shared/types/trend";

const DAILY_RECORD_PREFIX = "trend-battle:daily:v1";
const COMPLETED_DATES_KEY = "trend-battle:completed-dates:v1";
const PRACTICE_BEST_PREFIX = "trend-battle:practice-best:v1";

export interface DailyRecord {
  date: string;
  category: TrendCategory;
  outcomes: boolean[];
  score: number;
}

function dailyRecordKey(date: string, category: TrendCategory) {
  return `${DAILY_RECORD_PREFIX}:${category}:${date}`;
}

function isDailyRecord(value: unknown): value is DailyRecord {
  if (!value || typeof value !== "object") return false;
  const record = value as Partial<DailyRecord>;

  return (
    typeof record.date === "string" &&
    typeof record.category === "string" &&
    Array.isArray(record.outcomes) &&
    record.outcomes.length === 5 &&
    record.outcomes.every((outcome) => typeof outcome === "boolean") &&
    typeof record.score === "number"
  );
}

export function readDailyRecord(date: string, category: TrendCategory) {
  if (typeof window === "undefined") return null;
  const key = dailyRecordKey(date, category);
  const saved = window.localStorage.getItem(key);
  if (!saved) return null;

  try {
    const parsed: unknown = JSON.parse(saved);
    if (
      isDailyRecord(parsed) &&
      parsed.date === date &&
      parsed.category === category &&
      parsed.score === parsed.outcomes.filter(Boolean).length
    ) {
      return parsed;
    }
  } catch {
    // Invalid local data is removed so this key retains one canonical schema.
  }

  window.localStorage.removeItem(key);
  return null;
}

export function writeDailyRecord(record: DailyRecord) {
  window.localStorage.setItem(
    dailyRecordKey(record.date, record.category),
    JSON.stringify(record),
  );

  const dates = new Set(readCompletedDates());
  dates.add(record.date);
  window.localStorage.setItem(
    COMPLETED_DATES_KEY,
    JSON.stringify([...dates].sort()),
  );
}

export function readCompletedDates(): string[] {
  if (typeof window === "undefined") return [];
  const saved = window.localStorage.getItem(COMPLETED_DATES_KEY);
  if (!saved) return [];

  try {
    const parsed: unknown = JSON.parse(saved);
    if (
      Array.isArray(parsed) &&
      parsed.every((date) => /^\d{4}-\d{2}-\d{2}$/.test(String(date)))
    ) {
      return parsed as string[];
    }
  } catch {
    // Invalid local data is removed so this key retains one canonical schema.
  }

  window.localStorage.removeItem(COMPLETED_DATES_KEY);
  return [];
}

export function calculateStreak(dates: readonly string[], today: string) {
  const completed = new Set(dates);
  const cursor = new Date(`${today}T00:00:00.000Z`);
  let streak = 0;

  while (completed.has(cursor.toISOString().slice(0, 10))) {
    streak += 1;
    cursor.setUTCDate(cursor.getUTCDate() - 1);
  }

  return streak;
}

function practiceBestKey(category: TrendCategory) {
  return `${PRACTICE_BEST_PREFIX}:${category}`;
}

export function readPracticeBest(category: TrendCategory) {
  if (typeof window === "undefined") return 0;
  const saved = Number.parseInt(
    window.localStorage.getItem(practiceBestKey(category)) ?? "0",
    10,
  );
  return Number.isFinite(saved) ? saved : 0;
}

export function writePracticeBest(category: TrendCategory, score: number) {
  const best = Math.max(readPracticeBest(category), score);
  window.localStorage.setItem(practiceBestKey(category), String(best));
  return best;
}
