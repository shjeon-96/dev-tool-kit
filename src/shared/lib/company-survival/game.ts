import { COMPANY_INDUSTRIES } from "@/shared/types/company-survival";
import type {
  CompanyGameState,
  CompanyIndustry,
  CompanyMetrics,
  CompanyScenario,
  CompanyStatus,
} from "@/shared/types/company-survival";

export const GAME_LENGTH = 10;
export const STARTING_METRICS: CompanyMetrics = {
  cash: 64,
  morale: 62,
  trust: 58,
  momentum: 45,
};

const PROFILE_METRIC_ADJUSTMENTS: Record<
  CompanyIndustry,
  Partial<CompanyMetrics>
> = {
  saas: {},
  commerce: { cash: -5, momentum: 8 },
  "game-studio": { cash: -8, morale: 8 },
  fintech: { trust: 10, momentum: -6 },
  "ai-lab": { trust: -8, momentum: 12 },
  hardware: { cash: 10, momentum: -10 },
};

export function getUtcDateKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

export function getChallengeNumber(date: string) {
  const epoch = Date.parse("2026-01-01T00:00:00.000Z");
  const current = Date.parse(`${date}T00:00:00.000Z`);
  return Math.floor((current - epoch) / 86_400_000) + 1;
}

function hashChallenge(date: string, industry: CompanyIndustry) {
  let seed = 2166136261;
  for (const character of `${date}:${industry}`) {
    seed ^= character.charCodeAt(0);
    seed = Math.imul(seed, 16777619);
  }
  return seed >>> 0;
}

function seededRandom(seed: number) {
  let state = seed || 1;
  return () => {
    state = Math.imul(1664525, state) + 1013904223;
    return (state >>> 0) / 4_294_967_296;
  };
}

function getWeekKey(date: string) {
  const current = new Date(`${date}T00:00:00.000Z`);
  const day = current.getUTCDay() || 7;
  current.setUTCDate(current.getUTCDate() - day + 1);
  return current.toISOString().slice(0, 10);
}

export function createDailyScenarioOrder(
  date: string,
  industry: CompanyIndustry,
  scenarios: readonly CompanyScenario[],
) {
  const profileScenarios = scenarios.filter(
    (scenario) => scenario.industry === "all" || scenario.industry === industry,
  );
  const standardScenarios = profileScenarios.filter(
    (scenario) => scenario.cadence === "standard",
  );
  const weeklyScenarios = profileScenarios.filter(
    (scenario) => scenario.cadence === "weekly",
  );
  if (standardScenarios.length < GAME_LENGTH - 1 || !weeklyScenarios.length) {
    throw new Error(
      `Company Survival requires a weekly scenario and ${GAME_LENGTH - 1} standard scenarios for ${industry}`,
    );
  }

  const random = seededRandom(hashChallenge(date, industry));
  const shuffled = [...standardScenarios];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [
      shuffled[swapIndex],
      shuffled[index],
    ];
  }
  const weeklyRandom = seededRandom(hashChallenge(getWeekKey(date), industry));
  const weekly =
    weeklyScenarios[Math.floor(weeklyRandom() * weeklyScenarios.length)];
  return [weekly, ...shuffled.slice(0, GAME_LENGTH - 1)].map(
    (scenario) => scenario.id,
  );
}

export function replayCompanyRun(
  date: string,
  industry: CompanyIndustry,
  history: CompanyGameState["history"],
  scenarios: readonly CompanyScenario[],
) {
  const order = createDailyScenarioOrder(date, industry, scenarios);
  let state = createInitialGameState(date, industry);
  for (const decision of history) {
    const expectedScenarioId = order[state.turn];
    if (decision.scenarioId !== expectedScenarioId) {
      throw new Error(
        "Decision history does not match the daily scenario order",
      );
    }
    const scenario = scenarios.find((item) => item.id === decision.scenarioId);
    if (!scenario) throw new Error(`Unknown scenario ${decision.scenarioId}`);
    state = applyDecision(state, scenario, decision.choiceId);
  }
  return state;
}

export function createInitialGameState(
  date: string,
  industry: CompanyIndustry,
): CompanyGameState {
  const adjustment = PROFILE_METRIC_ADJUSTMENTS[industry];
  const metrics = Object.fromEntries(
    Object.entries(STARTING_METRICS).map(([metric, value]) => [
      metric,
      value + (adjustment[metric as keyof CompanyMetrics] ?? 0),
    ]),
  ) as unknown as CompanyMetrics;
  return {
    version: 2,
    date,
    industry,
    turn: 0,
    metrics,
    status: "playing",
    history: [],
  };
}

function clamp(value: number) {
  return Math.max(0, Math.min(100, value));
}

function deriveStatus(
  metrics: CompanyMetrics,
  nextTurn: number,
): CompanyStatus {
  if (metrics.cash === 0) return "bankrupt";
  if (metrics.morale === 0) return "exodus";
  if (metrics.trust === 0) return "rejected";
  if (nextTurn >= GAME_LENGTH) return "survived";
  return "playing";
}

export function applyDecision(
  state: CompanyGameState,
  scenario: CompanyScenario,
  choiceId: string,
): CompanyGameState {
  if (state.status !== "playing")
    throw new Error("Cannot decide after game completion");
  const choice = scenario.choices.find((item) => item.id === choiceId);
  if (!choice)
    throw new Error(`Unknown choice ${choiceId} for scenario ${scenario.id}`);

  const metrics = Object.fromEntries(
    Object.entries(state.metrics).map(([metric, value]) => [
      metric,
      clamp(value + (choice.effects[metric as keyof CompanyMetrics] ?? 0)),
    ]),
  ) as unknown as CompanyMetrics;
  const turn = state.turn + 1;

  return {
    ...state,
    turn,
    metrics,
    status: deriveStatus(metrics, turn),
    history: [...state.history, { scenarioId: scenario.id, choiceId }],
  };
}

export function calculateCompanyScore(state: CompanyGameState) {
  const metricScore = Object.values(state.metrics).reduce(
    (sum, value) => sum + value,
    0,
  );
  return Math.round(metricScore + state.turn * 25);
}

export function isCompanyGameState(
  value: unknown,
  date: string,
): value is CompanyGameState {
  if (!value || typeof value !== "object") return false;
  const state = value as Partial<CompanyGameState>;
  return (
    state.version === 2 &&
    state.date === date &&
    COMPANY_INDUSTRIES.some((industry) => industry === state.industry) &&
    typeof state.turn === "number" &&
    state.turn >= 0 &&
    state.turn <= GAME_LENGTH &&
    Array.isArray(state.history) &&
    state.history.length === state.turn &&
    Boolean(state.metrics) &&
    typeof state.metrics?.cash === "number" &&
    typeof state.metrics?.morale === "number" &&
    typeof state.metrics?.trust === "number" &&
    typeof state.metrics?.momentum === "number" &&
    ["playing", "survived", "bankrupt", "exodus", "rejected"].includes(
      state.status ?? "",
    )
  );
}
