import type {
  CompanyGameState,
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

export function getUtcDateKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

export function getChallengeNumber(date: string) {
  const epoch = Date.parse("2026-01-01T00:00:00.000Z");
  const current = Date.parse(`${date}T00:00:00.000Z`);
  return Math.floor((current - epoch) / 86_400_000) + 1;
}

function hashDate(date: string) {
  let seed = 2166136261;
  for (const character of date) {
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

export function createDailyScenarioOrder(
  date: string,
  scenarios: readonly CompanyScenario[],
) {
  if (scenarios.length < GAME_LENGTH) {
    throw new Error(
      `Company Survival requires at least ${GAME_LENGTH} scenarios`,
    );
  }

  const random = seededRandom(hashDate(date));
  const shuffled = [...scenarios];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [
      shuffled[swapIndex],
      shuffled[index],
    ];
  }
  return shuffled.slice(0, GAME_LENGTH).map((scenario) => scenario.id);
}

export function createInitialGameState(date: string): CompanyGameState {
  return {
    version: 1,
    date,
    turn: 0,
    metrics: { ...STARTING_METRICS },
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
    state.version === 1 &&
    state.date === date &&
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
