import { beforeEach, describe, expect, it } from "vitest";
import { calculateStreak, readDailyRecord, writeDailyRecord } from "./storage";

describe("trend battle storage", () => {
  beforeEach(() => window.localStorage.clear());

  it("stores one canonical daily result per date and category", () => {
    const record = {
      date: "2026-07-15",
      category: "country_population" as const,
      outcomes: [true, false, true, true, false],
      score: 3,
    };

    writeDailyRecord(record);
    expect(readDailyRecord(record.date, record.category)).toEqual(record);
  });

  it("counts consecutive completed UTC dates ending today", () => {
    expect(
      calculateStreak(
        ["2026-07-12", "2026-07-13", "2026-07-14", "2026-07-15"],
        "2026-07-15",
      ),
    ).toBe(4);
    expect(calculateStreak(["2026-07-13", "2026-07-15"], "2026-07-15")).toBe(1);
  });

  it("removes records that do not match the canonical schema", () => {
    const key = "trend-battle:daily:v1:country_population:2026-07-15";
    window.localStorage.setItem(key, JSON.stringify({ score: "invalid" }));

    expect(readDailyRecord("2026-07-15", "country_population")).toBeNull();
    expect(window.localStorage.getItem(key)).toBeNull();
  });
});
