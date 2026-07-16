import { describe, expect, it } from "vitest";
import { ACTION_CARDS, INCIDENTS } from "@/shared/lib/company-survival/rules";
import {
  createInitialGameState,
  getTurnHand,
  getTurnIncident,
  playActionCard,
  replayCompanyRun,
  selectCeoTrait,
} from "@/shared/lib/company-survival/game";
import {
  COMPANY_INDUSTRIES,
  type CompanyGameState,
} from "@/shared/types/company-survival";

describe("office roguelike engine", () => {
  it("deals the same three-card hand for the same daily seed", () => {
    const first = getTurnHand("2026-07-16", "saas", 0);
    expect(getTurnHand("2026-07-16", "saas", 0)).toEqual(first);
    expect(first).toHaveLength(3);
    expect(new Set(first.map((card) => card.id))).toHaveLength(3);
  });

  it("keeps cards, incidents, and ids unique in the authoritative content source", () => {
    expect(ACTION_CARDS).toHaveLength(12);
    expect(INCIDENTS).toHaveLength(6);
    expect(new Set(ACTION_CARDS.map((card) => card.id))).toHaveLength(12);
    expect(new Set(INCIDENTS.map((incident) => incident.id))).toHaveLength(6);
  });

  it("plays only a dealt card and records its incident", () => {
    const state = createInitialGameState("2026-07-16", "saas");
    const card = getTurnHand(state.date, state.industry, 0)[0];
    const next = playActionCard(state, card.id);
    expect(next.turn).toBe(1);
    expect(next.history).toEqual([{ cardId: card.id }]);
    expect(next.lastReport?.incidentId).toBe(
      getTurnIncident(state.date, state.industry, 0).id,
    );
    expect(next.departments[card.department]).toBe(1);
    expect(() => playActionCard(state, "forged")).toThrow("current hand");
  });

  it("adds a department chain bonus on repeat investment", () => {
    const state = createInitialGameState("2026-07-16", "saas");
    const card = getTurnHand(state.date, state.industry, 0)[0];
    state.departments[card.department] = 1;
    expect(playActionCard(state, card.id).lastReport).toMatchObject({
      synergy: true,
    });
  });

  it("locks the CEO trait once the run starts", () => {
    const state = selectCeoTrait(
      createInitialGameState("2026-07-16", "saas"),
      "rainmaker",
    );
    const next = playActionCard(
      state,
      getTurnHand(state.date, state.industry, 0)[0].id,
    );
    expect(next.trait).toBe("rainmaker");
    expect(() => selectCeoTrait(next, "operator")).toThrow("locked");
  });

  it("replays submitted card decisions with the same engine", () => {
    const date = "2026-07-16";
    let state = createInitialGameState(date, "saas", "operator");
    for (let turn = 0; turn < 2; turn++)
      state = playActionCard(state, getTurnHand(date, "saas", turn)[0].id);
    expect(replayCompanyRun(date, "saas", "operator", state.history)).toEqual(
      state,
    );
  });

  it("offers at least one winning line for every industry seed in the launch week", () => {
    const canWin = (state: CompanyGameState): boolean => {
      if (state.status !== "playing") return state.status === "survived";
      return getTurnHand(state.date, state.industry, state.turn).some((card) =>
        canWin(playActionCard(state, card.id)),
      );
    };
    for (const date of [
      "2026-07-15",
      "2026-07-16",
      "2026-07-17",
      "2026-07-18",
      "2026-07-19",
      "2026-07-20",
      "2026-07-21",
    ])
      for (const industry of COMPANY_INDUSTRIES)
        expect(
          canWin(createInitialGameState(date, industry)),
          `${date}:${industry}`,
        ).toBe(true);
  });
});
