import { describe, expect, it } from "vitest";
import { COMPANY_SCENARIOS } from "@/entities/company-scenario/data/scenarios";
import {
  GAME_LENGTH,
  applyDecision,
  createDailyScenarioOrder,
  createInitialGameState,
} from "@/shared/lib/company-survival/game";

describe("company survival game", () => {
  it("creates one deterministic ten-event challenge per date", () => {
    const first = createDailyScenarioOrder("2026-07-15", COMPANY_SCENARIOS);
    const second = createDailyScenarioOrder("2026-07-15", COMPANY_SCENARIOS);
    expect(first).toEqual(second);
    expect(first).toHaveLength(GAME_LENGTH);
    expect(new Set(first)).toHaveLength(GAME_LENGTH);
  });

  it("applies the selected choice and records one turn", () => {
    const state = createInitialGameState("2026-07-15");
    const scenario = COMPANY_SCENARIOS[0];
    const next = applyDecision(state, scenario, scenario.choices[0].id);
    expect(next.turn).toBe(1);
    expect(next.history).toEqual([
      { scenarioId: scenario.id, choiceId: scenario.choices[0].id },
    ]);
    expect(next.metrics).not.toEqual(state.metrics);
  });

  it("fails the company when a critical metric reaches zero", () => {
    const state = createInitialGameState("2026-07-15");
    state.metrics.cash = 1;
    const scenario = COMPANY_SCENARIOS.find((item) =>
      item.choices.some((choice) => (choice.effects.cash ?? 0) < 0),
    )!;
    const choice = scenario.choices.find(
      (item) => (item.effects.cash ?? 0) < 0,
    )!;
    expect(applyDecision(state, scenario, choice.id).status).toBe("bankrupt");
  });

  it("marks a company as survived after the tenth completed decision", () => {
    const scenario = COMPANY_SCENARIOS.find(
      (item) => item.id === "founder-interview",
    )!;
    const steadyChoice = scenario.choices.find(
      (item) => item.id === "decline",
    )!;
    let state = createInitialGameState("2026-07-15");
    for (let turn = 0; turn < GAME_LENGTH; turn += 1) {
      state = applyDecision(state, scenario, steadyChoice.id);
    }
    expect(state.status).toBe("survived");
    expect(state.turn).toBe(GAME_LENGTH);
  });
});
