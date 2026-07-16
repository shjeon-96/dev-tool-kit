import {
  ACTION_CARDS,
  CEO_TRAITS,
  INCIDENTS,
  INDUSTRY_RULES,
  STARTER_DECK,
  getActionCard,
} from "./rules";
import { COMPANY_INDUSTRIES } from "@/shared/types/company-survival";
import type {
  CeoTrait,
  CompanyGameState,
  CompanyIndustry,
  CompanyMetrics,
  CompanyStatus,
  Department,
  Incident,
} from "@/shared/types/company-survival";

export const RUN_LENGTH_POLICY = {
  id: "office-roguelike-v2",
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
function addEffects(target: CompanyMetrics, effects: Partial<CompanyMetrics>) {
  for (const metric of Object.keys(target) as (keyof CompanyMetrics)[])
    target[metric] += effects[metric] ?? 0;
}

export function getRunLength(): 6 {
  return 6;
}
export function isValidDeck(deck: readonly string[]) {
  if (deck.length !== 8 || new Set(deck).size !== 8) return false;
  const cards = deck.map((id) => ACTION_CARDS.find((card) => card.id === id));
  return (
    cards.every(Boolean) &&
    ["employee", "project", "funding"].every((kind) =>
      cards.some((card) => card?.kind === kind),
    )
  );
}
export function selectGameDeck(
  state: CompanyGameState,
  deck: readonly string[],
) {
  if (state.turn !== 0) throw new Error("Deck is locked after the run starts");
  if (!isValidDeck(deck))
    throw new Error("Deck must contain eight unique cards and every card kind");
  return { ...state, deck: [...deck] };
}
export function getTurnHand(
  date: string,
  industry: CompanyIndustry,
  turn: number,
  deck: readonly string[] = STARTER_DECK,
  completedProjects: readonly string[] = [],
) {
  if (!isValidDeck(deck)) throw new Error("Cannot deal from an invalid deck");
  const seed = hash(`${date}:${industry}:hand:${turn}`);
  const available = deck
    .map(getActionCard)
    .filter(
      (card) => card.kind !== "project" || !completedProjects.includes(card.id),
    );
  const fundingCards = available.filter((card) => card.kind === "funding");
  const anchor = fundingCards[pickIndexes(seed, fundingCards.length, 1)[0]];
  const remaining = available.filter((card) => card.id !== anchor.id);
  return [
    anchor,
    ...pickIndexes(
      seed ^ 0x9e3779b9,
      remaining.length,
      Math.min(2, remaining.length),
    ).map((index) => remaining[index]),
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
  const starting = INDUSTRY_RULES[industry].starting;
  return {
    version: 5,
    rulesetId: RUN_LENGTH_POLICY.id,
    targetTurns: 6,
    date,
    industry,
    trait,
    deck: [...STARTER_DECK],
    turn: 0,
    metrics: Object.fromEntries(
      Object.entries(STARTING_METRICS).map(([metric, value]) => [
        metric,
        value + (starting[metric as keyof CompanyMetrics] ?? 0),
      ]),
    ) as unknown as CompanyMetrics,
    employees: { ...ZERO_DEPARTMENTS },
    projects: {},
    completedProjects: [],
    fundingPressure: 0,
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
export function getDepartmentLevel(
  state: CompanyGameState,
  department: Department,
) {
  return (
    state.employees[department] +
    state.completedProjects.filter(
      (id) => getActionCard(id).department === department,
    ).length
  );
}
export function calculateProduction(state: CompanyGameState): CompanyMetrics {
  const employeeCount = Object.values(state.employees).reduce(
    (sum, count) => sum + count,
    0,
  );
  const production: CompanyMetrics = {
    cash:
      state.employees.sales * 4 +
      state.employees.operations -
      employeeCount * 2,
    morale: state.employees.operations * 2,
    trust: state.employees.design * 2 - state.fundingPressure * 2,
    momentum: state.employees.engineering * 3,
  };
  addEffects(production, INDUSTRY_RULES[state.industry].production);
  return production;
}
function incidentEffects(state: CompanyGameState, incident: Incident) {
  const countered = Boolean(
    (incident.counterDepartment &&
      state.employees[incident.counterDepartment] > 0) ||
    (incident.counterProjectId &&
      state.completedProjects.includes(incident.counterProjectId)),
  );
  return {
    countered,
    effects: countered
      ? (incident.counterEffects ?? incident.effects)
      : incident.effects,
  };
}
function clamp(value: number) {
  return Math.max(0, Math.min(100, value));
}
function deriveStatus(metrics: CompanyMetrics, turn: number): CompanyStatus {
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
    !getTurnHand(
      state.date,
      state.industry,
      state.turn,
      state.deck,
      state.completedProjects,
    ).some((card) => card.id === cardId)
  )
    throw new Error("Card is not in the current hand");

  const card = getActionCard(cardId);
  const incident = getTurnIncident(state.date, state.industry, state.turn);
  const incidentResult = incidentEffects(state, incident);
  const production = calculateProduction(state);
  const effects: CompanyMetrics = {
    cash: -10 - card.cost,
    morale: -2,
    trust: 0,
    momentum: 0,
  };
  addEffects(effects, production);
  addEffects(effects, card.effects);
  addEffects(effects, incidentResult.effects);

  const employees = { ...state.employees };
  const projects = { ...state.projects };
  const completedProjects = [...state.completedProjects];
  let fundingPressure = state.fundingPressure;
  let projectCompleted = false;

  if (card.kind === "employee") employees[card.department] += 1;
  if (card.kind === "funding") fundingPressure += 1;
  if (card.kind === "project") {
    const progress =
      (projects[card.id] ?? 0) + 1 + state.employees[card.department];
    projects[card.id] = Math.min(card.projectTarget!, progress);
    if (
      progress >= card.projectTarget! &&
      !completedProjects.includes(card.id)
    ) {
      completedProjects.push(card.id);
      projectCompleted = true;
      addEffects(effects, card.completionEffects ?? {});
    }
  }

  const synergy = getDepartmentLevel(state, card.department) > 0;
  if (synergy) effects.momentum += 5;
  const trait = CEO_TRAITS.find((item) => item.id === state.trait)!;
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
  const turn = state.turn + 1;
  return {
    ...state,
    turn,
    metrics,
    employees,
    projects,
    completedProjects,
    fundingPressure,
    status: deriveStatus(metrics, turn),
    history: [...state.history, { cardId }],
    lastReport: {
      cardId,
      incidentId: incident.id,
      synergy,
      incidentCountered: incidentResult.countered,
      projectCompleted,
      production,
      effects,
    },
  };
}

export function replayCompanyRun(
  date: string,
  industry: CompanyIndustry,
  trait: CeoTrait,
  deck: readonly string[],
  history: CompanyGameState["history"],
) {
  let state = selectGameDeck(
    createInitialGameState(date, industry, trait),
    deck,
  );
  for (const decision of history)
    state = playActionCard(state, decision.cardId);
  return state;
}
export function calculateCompanyScore(state: CompanyGameState) {
  return Math.round(
    Object.values(state.metrics).reduce((sum, value) => sum + value, 0) +
      state.turn * 55 +
      Object.values(state.employees).reduce((sum, count) => sum + count, 0) *
        18 +
      state.completedProjects.length * 35,
  );
}
export function isCompanyGameState(
  value: unknown,
  date: string,
): value is CompanyGameState {
  if (!value || typeof value !== "object") return false;
  const state = value as Partial<CompanyGameState>;
  return (
    state.version === 5 &&
    state.rulesetId === RUN_LENGTH_POLICY.id &&
    state.date === date &&
    COMPANY_INDUSTRIES.some((industry) => industry === state.industry) &&
    CEO_TRAITS.some((trait) => trait.id === state.trait) &&
    state.targetTurns === 6 &&
    isValidDeck(state.deck ?? []) &&
    typeof state.turn === "number" &&
    state.turn >= 0 &&
    state.turn <= 6 &&
    Array.isArray(state.history) &&
    state.history.length === state.turn &&
    Boolean(state.metrics) &&
    Object.values(state.metrics!).every(
      (metric) => typeof metric === "number",
    ) &&
    Boolean(state.employees) &&
    DEPARTMENTS.every(
      (department) => typeof state.employees?.[department] === "number",
    ) &&
    Boolean(state.projects) &&
    Object.values(state.projects!).every(
      (progress) => typeof progress === "number",
    ) &&
    Array.isArray(state.completedProjects) &&
    typeof state.fundingPressure === "number" &&
    ["playing", "survived", "bankrupt", "exodus", "rejected"].includes(
      state.status ?? "",
    )
  );
}
