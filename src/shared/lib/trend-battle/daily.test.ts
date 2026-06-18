import { describe, expect, it } from "vitest";
import type { TrendItem } from "@/shared/types/trend";
import {
  createDailyChallenge,
  getDailyChallengeStorageKey,
  toDailySeed,
} from "./daily";

const items = Array.from({ length: 12 }, (_, index) => {
  const value = 100 + index * 20;

  return {
    id: `item-${index}`,
    category: "country_population",
    name: `Item ${index}`,
    value,
    unit: "people",
    displayValue: `${value} people`,
    sourceName: "Test Source",
    sourceUrl: "https://example.com",
    updatedAt: "2026-06-18",
  } satisfies TrendItem;
});

describe("daily challenge", () => {
  it("derives a stable seed from the date and category", () => {
    expect(toDailySeed("2026-06-18", "country_population")).toBe(
      toDailySeed("2026-06-18", "country_population"),
    );
    expect(toDailySeed("2026-06-18", "country_population")).not.toBe(
      toDailySeed("2026-06-19", "country_population"),
    );
  });

  it("creates ten deterministic rounds for the same date", () => {
    const first = createDailyChallenge({
      items,
      date: "2026-06-18",
      category: "country_population",
    });
    const second = createDailyChallenge({
      items,
      date: "2026-06-18",
      category: "country_population",
    });

    expect(first.rounds).toHaveLength(10);
    expect(second.rounds).toEqual(first.rounds);
  });

  it("does not pair the same item against itself", () => {
    const challenge = createDailyChallenge({
      items,
      date: "2026-06-18",
      category: "country_population",
    });

    expect(
      challenge.rounds.every(
        (round) => round.leftItem.id !== round.rightItem.id,
      ),
    ).toBe(true);
  });

  it("uses a date-specific localStorage key", () => {
    expect(getDailyChallengeStorageKey("2026-06-18")).toBe(
      "trend-battle:daily:2026-06-18",
    );
  });
});
