import { describe, expect, it } from "vitest";
import {
  ACTION_CARDS,
  INCIDENTS,
  STARTER_DECK,
  isCardUnlocked,
  isCeoTraitUnlocked,
} from "@/shared/lib/company-survival/rules";
import {
  calculateProduction,
  createInitialGameState,
  getPlacementDepartments,
  getTurnHand,
  getTurnIncident,
  playActionCard,
  replayCompanyRun,
  selectCeoTrait,
  selectGameDeck,
} from "@/shared/lib/company-survival/game";
import {
  COMPANY_DEPARTMENTS,
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
    const next = playActionCard(state, card.id, "sales");
    expect(next.turn).toBe(1);
    expect(next.history).toEqual([{ cardId: card.id, department: "sales" }]);
    expect(next.lastReport?.department).toBe("sales");
    expect(next.lastReport?.incidentId).toBe(
      getTurnIncident(state.date, state.industry, 0).id,
    );
    expect(() => playActionCard(state, "forged", "sales")).toThrow(
      "current hand",
    );
  });

  it("turns persistent employees into monthly production", () => {
    const state = createInitialGameState("2026-07-16", "saas");
    state.employees = { engineering: 1, design: 1, sales: 1, operations: 1 };
    expect(calculateProduction(state)).toEqual({
      cash: -3,
      morale: 2,
      trust: 2,
      momentum: 4,
    });
  });

  it("uses the chosen office department for employee placement", () => {
    const state = createInitialGameState("2026-07-16", "saas");
    const card = getTurnHand(state.date, state.industry, 0).find(
      (item) => item.kind === "employee",
    )!;
    const department = COMPANY_DEPARTMENTS.find(
      (item) => item !== card.department,
    )!;
    const next = playActionCard(state, card.id, department);
    expect(next.employees[department]).toBe(1);
    expect(next.employees[card.department]).toBe(0);
  });

  it("locks an in-progress project to its chosen department", () => {
    const date = Array.from(
      { length: 31 },
      (_, index) => `2026-07-${String(index + 1).padStart(2, "0")}`,
    ).find((candidate) =>
      getTurnHand(candidate, "saas", 0).some((card) => card.kind === "project"),
    )!;
    const state = createInitialGameState(date, "saas");
    const card = getTurnHand(date, "saas", 0).find(
      (item) => item.kind === "project",
    )!;
    const next = playActionCard(state, card.id, "operations");
    expect(next.projectDepartments[card.id]).toBe("operations");
    expect(getPlacementDepartments(next, card.id)).toEqual(["operations"]);
  });

  it("gives every industry a real starting or production rule", () => {
    const baselines = COMPANY_INDUSTRIES.map((industry) => {
      const state = createInitialGameState("2026-07-16", industry);
      return JSON.stringify([state.metrics, calculateProduction(state)]);
    });
    expect(new Set(baselines)).toHaveLength(COMPANY_INDUSTRIES.length);
  });

  it("builds a valid eight-card deck before the run locks", () => {
    const state = createInitialGameState("2026-07-16", "saas");
    const deck = [...STARTER_DECK.slice(0, 7), "hire-operator"];
    expect(selectGameDeck(state, deck).deck).toEqual(deck);
    expect(() => selectGameDeck(state, deck.slice(1))).toThrow("eight unique");
    const next = playActionCard(
      state,
      getTurnHand(state.date, state.industry, 0)[0].id,
      "engineering",
    );
    expect(() => selectGameDeck(next, deck)).toThrow("locked");
  });

  it("unlocks new cards and CEO traits after completed runs", () => {
    expect(isCardUnlocked("hire-operator", 0)).toBe(false);
    expect(isCardUnlocked("hire-operator", 1)).toBe(true);
    expect(isCardUnlocked("automation", 1)).toBe(false);
    expect(isCardUnlocked("automation", 2)).toBe(true);
    expect(isCeoTraitUnlocked("rainmaker", 1)).toBe(true);
    expect(isCeoTraitUnlocked("operator", 1)).toBe(false);
    expect(isCeoTraitUnlocked("operator", 2)).toBe(true);
  });

  it("lets completed projects counter later incidents", () => {
    const date = Array.from(
      { length: 31 },
      (_, index) => `2026-07-${String(index + 1).padStart(2, "0")}`,
    ).find(
      (candidate) =>
        getTurnIncident(candidate, "saas", 0).id === "investor-demo",
    )!;
    const state = createInitialGameState(date, "saas");
    state.completedProjects = ["ship-core"];
    const card = getTurnHand(
      date,
      "saas",
      0,
      state.deck,
      state.completedProjects,
    )[0];
    expect(
      playActionCard(state, card.id, "engineering").lastReport,
    ).toMatchObject({
      incidentCountered: true,
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
      "engineering",
    );
    expect(next.trait).toBe("rainmaker");
    expect(() => selectCeoTrait(next, "operator")).toThrow("locked");
  });

  it("replays submitted card decisions with the same engine", () => {
    const date = "2026-07-16";
    let state = createInitialGameState(date, "saas", "operator");
    for (let turn = 0; turn < 2; turn++)
      state = playActionCard(
        state,
        getTurnHand(date, "saas", turn)[0].id,
        turn % 2 ? "sales" : "engineering",
      );
    expect(
      replayCompanyRun(date, "saas", "operator", state.deck, state.history),
    ).toEqual(state);
  });

  it("offers at least one winning line for every industry seed in the launch week", () => {
    const canWin = (state: CompanyGameState): boolean => {
      if (state.status !== "playing") return state.status === "survived";
      return getTurnHand(
        state.date,
        state.industry,
        state.turn,
        state.deck,
        state.completedProjects,
      ).some((card) => canWin(playActionCard(state, card.id, card.department)));
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
