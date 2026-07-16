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

export type CompanyRunLength = 6 | 10;

export interface DecisionRecord {
  scenarioId: string;
  choiceId: string;
}

export interface CompanyGameState {
  version: 3;
  rulesetId: "run-length-v1";
  targetTurns: CompanyRunLength;
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

export type CompanyActivityPayload =
  | {
      event: "session_started";
      date: string;
      playerId: string;
    }
  | {
      event: "game_started";
      date: string;
      playerId: string;
      industry: CompanyIndustry;
      targetTurns: CompanyRunLength;
      referralId?: string;
    }
  | {
      event: "share_opened";
      date: string;
      playerId: string;
      referralId: string;
    }
  | {
      event: "share_sheet_completed";
      date: string;
      playerId: string;
      referralId: string;
    }
  | {
      event: "referral_landed";
      date: string;
      playerId: string;
      referralId: string;
    };
