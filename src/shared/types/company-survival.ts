import type { Locale } from "@/shared/config/site";

export type CompanyMetric = "cash" | "morale" | "trust" | "momentum";

export const COMPANY_INDUSTRIES = [
  "saas",
  "commerce",
  "game-studio",
  "fintech",
  "ai-lab",
  "hardware",
] as const;

export type CompanyIndustry = (typeof COMPANY_INDUSTRIES)[number];

export function isCompanyIndustry(value: unknown): value is CompanyIndustry {
  return COMPANY_INDUSTRIES.some((industry) => industry === value);
}

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
  industry: CompanyIndustry | "all";
  cadence: "standard" | "weekly";
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
  version: 2;
  date: string;
  industry: CompanyIndustry;
  turn: number;
  metrics: CompanyMetrics;
  status: CompanyStatus;
  history: DecisionRecord[];
}

export interface CompanyDailyResult {
  date: string;
  industry: CompanyIndustry;
  status: Exclude<CompanyStatus, "playing">;
  score: number;
  metrics: CompanyMetrics;
  decisions: number;
}

export interface CompanyArchive {
  version: 2;
  results: Record<string, CompanyDailyResult>;
}

export interface CompanyCareerStats {
  daysPlayed: number;
  daysSurvived: number;
  currentStreak: number;
  bestStreak: number;
  bestScore: number;
}
