import { describe, expect, it } from "vitest";
import { COMPANY_SCENARIOS } from "@/entities/company-scenario/data/scenarios";
import {
  GAME_LENGTH,
  applyDecision,
  createDailyScenarioOrder,
  createInitialGameState,
  replayCompanyRun,
} from "@/shared/lib/company-survival/game";

describe("company survival game", () => {
  it("creates one deterministic ten-event challenge per date", () => {
    const first = createDailyScenarioOrder(
      "2026-07-15",
      "saas",
      COMPANY_SCENARIOS,
    );
    const second = createDailyScenarioOrder(
      "2026-07-15",
      "saas",
      COMPANY_SCENARIOS,
    );
    expect(first).toEqual(second);
    expect(first).toHaveLength(GAME_LENGTH);
    expect(new Set(first)).toHaveLength(GAME_LENGTH);
  });

  it("applies the selected choice and records one turn", () => {
    const state = createInitialGameState("2026-07-15", "saas");
    const scenario = COMPANY_SCENARIOS[0];
    const next = applyDecision(state, scenario, scenario.choices[0].id);
    expect(next.turn).toBe(1);
    expect(next.history).toEqual([
      { scenarioId: scenario.id, choiceId: scenario.choices[0].id },
    ]);
    expect(next.metrics).not.toEqual(state.metrics);
  });

  it("fails the company when a critical metric reaches zero", () => {
    const state = createInitialGameState("2026-07-15", "saas");
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
    let state = createInitialGameState("2026-07-15", "saas");
    for (let turn = 0; turn < GAME_LENGTH; turn += 1) {
      state = applyDecision(state, scenario, steadyChoice.id);
    }
    expect(state.status).toBe("survived");
    expect(state.turn).toBe(GAME_LENGTH);
  });

  it("provides 84 unique scenarios with twelve exclusive crises per industry", () => {
    expect(COMPANY_SCENARIOS).toHaveLength(84);
    expect(
      new Set(COMPANY_SCENARIOS.map((scenario) => scenario.id)),
    ).toHaveLength(84);
    for (const industry of [
      "saas",
      "commerce",
      "game-studio",
      "fintech",
      "ai-lab",
      "hardware",
    ] as const) {
      expect(
        COMPANY_SCENARIOS.filter((scenario) => scenario.industry === industry),
      ).toHaveLength(12);
      expect(
        COMPANY_SCENARIOS.filter(
          (scenario) =>
            scenario.industry === industry && scenario.cadence === "weekly",
        ),
      ).toHaveLength(2);
      const order = createDailyScenarioOrder(
        "2026-07-15",
        industry,
        COMPANY_SCENARIOS,
      );
      expect(order).toHaveLength(10);
      expect(
        COMPANY_SCENARIOS.find((scenario) => scenario.id === order[0]),
      ).toHaveProperty("cadence", "weekly");
    }
  });

  it("keeps the featured crisis fixed throughout one UTC week", () => {
    const wednesday = createDailyScenarioOrder(
      "2026-07-15",
      "saas",
      COMPANY_SCENARIOS,
    );
    const thursday = createDailyScenarioOrder(
      "2026-07-16",
      "saas",
      COMPANY_SCENARIOS,
    );
    expect(wednesday[0]).toBe(thursday[0]);
  });

  it("replays submitted decisions from the authoritative daily order", () => {
    const date = "2026-07-15";
    const order = createDailyScenarioOrder(date, "saas", COMPANY_SCENARIOS);
    let state = createInitialGameState(date, "saas");
    while (state.status === "playing") {
      const scenario = COMPANY_SCENARIOS.find(
        (item) => item.id === order[state.turn],
      )!;
      state = applyDecision(state, scenario, scenario.choices[0].id);
    }
    expect(
      replayCompanyRun(date, "saas", state.history, COMPANY_SCENARIOS),
    ).toEqual(state);
    expect(() =>
      replayCompanyRun(
        date,
        "saas",
        [{ scenarioId: "forged", choiceId: "forged" }],
        COMPANY_SCENARIOS,
      ),
    ).toThrow("daily scenario order");
  });
});
