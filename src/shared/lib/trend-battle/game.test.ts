import { describe, expect, it } from "vitest";
import type { TrendItem } from "@/shared/types/trend";
import {
  createRound,
  getHighScoreKey,
  isCorrectAnswer,
  pickComparableItem,
} from "./game";
import { formatRoundInsight, formatRoundResult } from "./format";

const baseItems = [
  {
    id: "a",
    category: "country_population",
    name: "Alpha",
    value: 100,
    unit: "people",
    displayValue: "100 people",
    sourceName: "Test Source",
    sourceUrl: "https://example.com/a",
    updatedAt: "2026-06-18",
  },
  {
    id: "b",
    category: "country_population",
    name: "Beta",
    value: 180,
    unit: "people",
    displayValue: "180 people",
    sourceName: "Test Source",
    sourceUrl: "https://example.com/b",
    updatedAt: "2026-06-18",
  },
  {
    id: "c",
    category: "country_population",
    name: "Gamma",
    value: 1000,
    unit: "people",
    displayValue: "1,000 people",
    sourceName: "Test Source",
    sourceUrl: "https://example.com/c",
    updatedAt: "2026-06-18",
  },
] satisfies TrendItem[];

describe("trend battle game logic", () => {
  it("creates a round with two different comparable items", () => {
    const round = createRound(baseItems, () => 0);

    expect(round.leftItem.id).toBe("a");
    expect(round.rightItem.id).toBe("b");
    expect(round.correctAnswer).toBe("right");
  });

  it("picks comparable items within the recommended 1.1x to 5x range", () => {
    const picked = pickComparableItem(baseItems[0], baseItems, () => 0);

    expect(picked.id).toBe("b");
  });

  it("throws when a category does not have enough items", () => {
    expect(() => createRound([baseItems[0]], () => 0)).toThrow(
      "At least two trend items are required",
    );
  });

  it("checks left and right answers against the canonical round answer", () => {
    const round = createRound(baseItems, () => 0);

    expect(isCorrectAnswer(round, "right")).toBe(true);
    expect(isCorrectAnswer(round, "left")).toBe(false);
  });

  it("formats result copy with both revealed values", () => {
    const round = createRound(baseItems, () => 0);

    expect(formatRoundResult(round)).toEqual([
      "Alpha: 100 people",
      "Beta: 180 people",
    ]);
  });

  it("formats close-call insight copy for narrow comparisons", () => {
    const round = createRound(baseItems, () => 0);

    expect(formatRoundInsight(round, "en")).toBe("Close call.");
    expect(formatRoundInsight(round, "ko")).toBe("아슬아슬한 비교였어요.");
  });

  it("formats surprising insight copy for wide comparisons", () => {
    const round = {
      leftItem: baseItems[0],
      rightItem: baseItems[2],
      category: "country_population",
      correctAnswer: "right",
    } as const;

    expect(formatRoundInsight(round, "en")).toBe(
      "Most people might guess this wrong.",
    );
    expect(formatRoundInsight(round, "ko")).toBe(
      "많은 사람이 헷갈릴 수 있는 문제예요.",
    );
  });

  it("uses category-specific localStorage keys for high scores", () => {
    expect(getHighScoreKey("country_population")).toBe(
      "trend-battle:high-score:country_population",
    );
  });
});
