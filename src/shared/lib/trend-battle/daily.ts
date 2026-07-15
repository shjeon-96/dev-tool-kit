import type { GameRound, TrendCategory, TrendItem } from "@/shared/types/trend";
import { createRound } from "./game";

interface CreateDailyChallengeInput {
  items: readonly TrendItem[];
  date: string;
  category: TrendCategory;
  roundCount?: number;
}

export interface DailyChallenge {
  date: string;
  category: TrendCategory;
  rounds: GameRound[];
}

export function toDailySeed(date: string, category: TrendCategory) {
  const input = `${date}:${category}`;
  let seed = 2166136261;

  for (let index = 0; index < input.length; index += 1) {
    seed ^= input.charCodeAt(index);
    seed = Math.imul(seed, 16777619);
  }

  return seed >>> 0;
}

function createSeededRandom(seed: number) {
  let state = seed || 1;

  return () => {
    state = Math.imul(1664525, state) + 1013904223;
    return ((state >>> 0) % 1000000) / 1000000;
  };
}

export function createDailyChallenge({
  items,
  date,
  category,
  roundCount = 10,
}: CreateDailyChallengeInput): DailyChallenge {
  const random = createSeededRandom(toDailySeed(date, category));
  const rounds = Array.from({ length: roundCount }, () =>
    createRound(items, random),
  );

  return {
    date,
    category,
    rounds,
  };
}

export function getDailyChallengeStorageKey(date: string) {
  return `trend-battle:daily:${date}`;
}

export function getUtcDateKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

export function getDailyChallengeNumber(date: string) {
  const epoch = Date.parse("2026-01-01T00:00:00.000Z");
  const current = Date.parse(`${date}T00:00:00.000Z`);
  return Math.floor((current - epoch) / 86_400_000) + 1;
}
