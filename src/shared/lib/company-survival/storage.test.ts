import { beforeEach, describe, expect, it } from "vitest";
import { createInitialGameState } from "./game";
import {
  createEmptyArchive,
  deriveCareerStats,
  readCompanyArchive,
  readOrCreateReferralId,
  readStoredRun,
  recordCompletedRun,
  writeStoredRun,
} from "./storage";

describe("company career storage", () => {
  beforeEach(() => localStorage.clear());

  it("round-trips an active daily run", () => {
    const state = createInitialGameState("2026-07-15", "saas", 6);
    writeStoredRun(localStorage, state);
    expect(
      readStoredRun(
        localStorage,
        state.date,
        state.industry,
        state.targetTurns,
      ),
    ).toEqual({ kind: "valid", value: state });
  });

  it("surfaces invalid saved data instead of replacing it", () => {
    localStorage.setItem("runway-10:company:v2:2026-07-15:saas", "{broken");
    expect(readStoredRun(localStorage, "2026-07-15", "saas", 10)).toEqual({
      kind: "invalid",
    });
  });

  it("rejects a saved run assigned to another experiment variant", () => {
    const state = createInitialGameState("2026-07-15", "saas", 6);
    writeStoredRun(localStorage, state);
    expect(readStoredRun(localStorage, state.date, state.industry, 10)).toEqual(
      { kind: "invalid" },
    );
  });

  it("records one authoritative result per date", () => {
    const state = createInitialGameState("2026-07-15", "saas", 10);
    state.turn = 10;
    state.status = "survived";
    state.history = Array.from({ length: 10 }, () => ({
      scenarioId: "x",
      choiceId: "y",
    }));
    const archive = recordCompletedRun(localStorage, state);
    expect(Object.keys(archive.results)).toEqual(["2026-07-15:saas"]);
    expect(readCompanyArchive(localStorage).kind).toBe("valid");
  });

  it("creates and reuses one anonymous referral ID", () => {
    const first = readOrCreateReferralId(localStorage);
    expect(readOrCreateReferralId(localStorage)).toBe(first);
    expect(first).toMatch(/^[0-9a-f-]{36}$/i);
  });

  it("derives streaks and career totals from dated results", () => {
    const archive = createEmptyArchive();
    for (const [date, status, score] of [
      ["2026-07-12", "bankrupt", 180],
      ["2026-07-14", "survived", 420],
      ["2026-07-15", "survived", 510],
    ] as const) {
      archive.results[`${date}:saas`] = {
        date,
        industry: "saas",
        status,
        score,
        decisions: 10,
        metrics: { cash: 50, morale: 50, trust: 50, momentum: 50 },
      };
    }
    expect(deriveCareerStats(archive, "2026-07-15")).toEqual({
      daysPlayed: 3,
      daysSurvived: 2,
      currentStreak: 2,
      bestStreak: 2,
      bestScore: 510,
    });
  });
});
