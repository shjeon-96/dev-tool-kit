import type { Locale } from "@/shared/config/site";

export type CompanyMetric = "cash" | "morale" | "trust" | "momentum";

export type CompanyMetrics = Record<CompanyMetric, number>;

export interface ScenarioChoice {
  id: string;
  label: Record<Locale, string>;
  detail: Record<Locale, string>;
  result: Record<Locale, string>;
  effects: Partial<CompanyMetrics>;
}

export interface CompanyScenario {
  id: string;
  department: Record<Locale, string>;
  title: Record<Locale, string>;
  body: Record<Locale, string>;
  choices: readonly [ScenarioChoice, ScenarioChoice];
}

export type CompanyStatus =
  | "playing"
  | "survived"
  | "bankrupt"
  | "exodus"
  | "rejected";

export interface DecisionRecord {
  scenarioId: string;
  choiceId: string;
}

export interface CompanyGameState {
  version: 1;
  date: string;
  turn: number;
  metrics: CompanyMetrics;
  status: CompanyStatus;
  history: DecisionRecord[];
}
