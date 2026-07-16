import { ACTION_CARDS, CEO_TRAITS, INCIDENTS, getActionCard } from "./rules";
import { COMPANY_INDUSTRIES } from "@/shared/types/company-survival";
import type {
  CeoTrait,
  CompanyGameState,
  CompanyIndustry,
  CompanyMetrics,
  CompanyStatus,
  Department,
} from "@/shared/types/company-survival";

export const RUN_LENGTH_POLICY = {
  id: "office-roguelike-v1",
  mode: "fixed",
  variants: [6],
} as const;
export const STARTING_METRICS: CompanyMetrics = {
  cash: 70,
  morale: 62,
  trust: 54,
  momentum: 34,
};
const DEPARTMENTS: readonly Department[] = [
  "engineering",
  "design",
  "sales",
  "operations",
];
const ZERO_DEPARTMENTS: Record<Department, number> = {
  engineering: 0,
  design: 0,
  sales: 0,
  operations: 0,
};

export function getUtcDateKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}
export function getChallengeNumber(date: string) {
  return (
    Math.floor(
      (Date.parse(`${date}T00:00:00.000Z`) -
        Date.parse("2026-01-01T00:00:00.000Z")) /
        86_400_000,
    ) + 1
  );
}
function hash(value: string) {
  let seed = 2166136261;
  for (const char of value) {
    seed ^= char.charCodeAt(0);
    seed = Math.imul(seed, 16777619);
  }
  return seed >>> 0;
}
function pickIndexes(seed: number, size: number, count: number) {
  const pool = Array.from({ length: size }, (_, index) => index);
  let state = seed || 1;
  for (let index = pool.length - 1; index > 0; index--) {
    state = Math.imul(1664525, state) + 1013904223;
    const swap = (state >>> 0) % (index + 1);
    [pool[index], pool[swap]] = [pool[swap], pool[index]];
  }
  return pool.slice(0, count);
}

export function getRunLength(): 6 {
  return 6;
}
export function getTurnHand(
  date: string,
  industry: CompanyIndustry,
  turn: number,
) {
  const seed = hash(`${date}:${industry}:hand:${turn}`);
  const runwayCards = ACTION_CARDS.filter(
    (card) => (card.effects.cash ?? 0) > 0 || card.cost < 0,
  );
  const runwayCard = runwayCards[pickIndexes(seed, runwayCards.length, 1)[0]];
  const remaining = ACTION_CARDS.filter((card) => card.id !== runwayCard.id);
  return [
    runwayCard,
    ...pickIndexes(seed ^ 0x9e3779b9, remaining.length, 2).map(
      (index) => remaining[index],
    ),
  ];
}
export function getTurnIncident(
  date: string,
  industry: CompanyIndustry,
  turn: number,
) {
  return INCIDENTS[
    pickIndexes(
      hash(`${date}:${industry}:incident`),
      INCIDENTS.length,
      INCIDENTS.length,
    )[turn % INCIDENTS.length]
  ];
}

export function createInitialGameState(
  date: string,
  industry: CompanyIndustry,
  trait: CeoTrait = "builder",
): CompanyGameState {
  return {
    version: 4,
    rulesetId: RUN_LENGTH_POLICY.id,
    targetTurns: 6,
    date,
    industry,
    trait,
    turn: 0,
    metrics: { ...STARTING_METRICS },
    departments: { ...ZERO_DEPARTMENTS },
    status: "playing",
    history: [],
    lastReport: null,
  };
}
export function selectCeoTrait(
  state: CompanyGameState,
  trait: CeoTrait,
): CompanyGameState {
  if (state.turn !== 0)
    throw new Error("CEO trait is locked after the run starts");
  if (!CEO_TRAITS.some((item) => item.id === trait))
    throw new Error("Unknown CEO trait");
  return { ...state, trait };
}
function clamp(value: number) {
  return Math.max(0, Math.min(100, value));
}
function status(metrics: CompanyMetrics, turn: number): CompanyStatus {
  if (metrics.cash === 0) return "bankrupt";
  if (metrics.morale === 0) return "exodus";
  if (metrics.trust === 0) return "rejected";
  return turn >= 6 ? "survived" : "playing";
}

export function playActionCard(
  state: CompanyGameState,
  cardId: string,
): CompanyGameState {
  if (state.status !== "playing")
    throw new Error("Cannot play after game completion");
  if (
    !getTurnHand(state.date, state.industry, state.turn).some(
      (card) => card.id === cardId,
    )
  )
    throw new Error("Card is not in the current hand");
  const card = getActionCard(cardId);
  const incident = getTurnIncident(state.date, state.industry, state.turn);
  const synergy = state.departments[card.department] > 0;
  const trait = CEO_TRAITS.find((item) => item.id === state.trait)!;
  const effects: CompanyMetrics = {
    cash: -10 - card.cost,
    morale: -2,
    trust: 0,
    momentum: Math.floor(state.metrics.momentum / 25),
  };
  for (const metric of Object.keys(effects) as (keyof CompanyMetrics)[])
    effects[metric] +=
      (card.effects[metric] ?? 0) + (incident.effects[metric] ?? 0);
  if (synergy) effects.momentum += 5;
  if (trait.department === card.department) {
    if (state.trait === "operator") effects.cash += 4;
    else effects.momentum += 4;
  }
  const metrics = Object.fromEntries(
    Object.entries(state.metrics).map(([metric, value]) => [
      metric,
      clamp(value + effects[metric as keyof CompanyMetrics]),
    ]),
  ) as unknown as CompanyMetrics;
  const departments = {
    ...state.departments,
    [card.department]: state.departments[card.department] + 1,
  };
  const turn = state.turn + 1;
  return {
    ...state,
    turn,
    metrics,
    departments,
    status: status(metrics, turn),
    history: [...state.history, { cardId }],
    lastReport: { cardId, incidentId: incident.id, synergy, effects },
  };
}

export function replayCompanyRun(
  date: string,
  industry: CompanyIndustry,
  trait: CeoTrait,
  history: CompanyGameState["history"],
) {
  let state = createInitialGameState(date, industry, trait);
  for (const decision of history)
    state = playActionCard(state, decision.cardId);
  return state;
}
export function calculateCompanyScore(state: CompanyGameState) {
  return Math.round(
    Object.values(state.metrics).reduce((sum, value) => sum + value, 0) +
      state.turn * 55 +
      Object.values(state.departments).filter(Boolean).length * 25,
  );
}
export function isCompanyGameState(
  value: unknown,
  date: string,
): value is CompanyGameState {
  if (!value || typeof value !== "object") return false;
  const state = value as Partial<CompanyGameState>;
  return (
    state.version === 4 &&
    state.rulesetId === RUN_LENGTH_POLICY.id &&
    state.date === date &&
    COMPANY_INDUSTRIES.some((industry) => industry === state.industry) &&
    CEO_TRAITS.some((trait) => trait.id === state.trait) &&
    state.targetTurns === 6 &&
    typeof state.turn === "number" &&
    state.turn >= 0 &&
    state.turn <= 6 &&
    Array.isArray(state.history) &&
    state.history.length === state.turn &&
    Boolean(state.metrics) &&
    Object.values(state.metrics!).every(
      (metric) => typeof metric === "number",
    ) &&
    Boolean(state.departments) &&
    DEPARTMENTS.every(
      (department) => typeof state.departments?.[department] === "number",
    ) &&
    ["playing", "survived", "bankrupt", "exodus", "rejected"].includes(
      state.status ?? "",
    )
  );
}
