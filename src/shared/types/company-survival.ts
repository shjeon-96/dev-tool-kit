import type { Locale } from "@/shared/config/site";

export type CompanyMetric = "cash" | "morale" | "trust" | "momentum";
export type CompanyMetrics = Record<CompanyMetric, number>;
export const COMPANY_DEPARTMENTS = [
  "engineering",
  "design",
  "sales",
  "operations",
] as const;
export type Department = (typeof COMPANY_DEPARTMENTS)[number];
export function isCompanyDepartment(value: unknown): value is Department {
  return COMPANY_DEPARTMENTS.some((department) => department === value);
}
export type CeoTrait = "builder" | "rainmaker" | "operator";
export type CardKind = "employee" | "project" | "funding";

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

export interface LocalizedText {
  en: string;
  ko: string;
  ja: string;
}
export interface ActionCard {
  id: string;
  kind: CardKind;
  department: Department;
  title: LocalizedText;
  detail: LocalizedText;
  cost: number;
  effects: Partial<CompanyMetrics>;
  projectTarget?: number;
  completionEffects?: Partial<CompanyMetrics>;
}
export interface Incident {
  id: string;
  title: LocalizedText;
  body: LocalizedText;
  effects: Partial<CompanyMetrics>;
  counterDepartment?: Department;
  counterProjectId?: string;
  counterEffects?: Partial<CompanyMetrics>;
  counterBody?: LocalizedText;
}
export interface TraitDefinition {
  id: CeoTrait;
  title: LocalizedText;
  detail: LocalizedText;
  department: Department;
}
export interface IndustryRule {
  starting: Partial<CompanyMetrics>;
  production: Partial<CompanyMetrics>;
  passive: LocalizedText;
}

export type CompanyStatus =
  | "playing"
  | "survived"
  | "bankrupt"
  | "exodus"
  | "rejected";
export type CompanyRunLength = 6;
export interface DecisionRecord {
  cardId: string;
  department: Department;
}
export interface TurnReport {
  cardId: string;
  department: Department;
  incidentId: string;
  synergy: boolean;
  incidentCountered: boolean;
  projectCompleted: boolean;
  production: CompanyMetrics;
  effects: CompanyMetrics;
}
export interface CompanyGameState {
  version: 6;
  rulesetId: "office-roguelike-v3";
  targetTurns: CompanyRunLength;
  date: string;
  industry: CompanyIndustry;
  trait: CeoTrait;
  deck: string[];
  turn: number;
  metrics: CompanyMetrics;
  employees: Record<Department, number>;
  projects: Record<string, number>;
  projectDepartments: Record<string, Department>;
  completedProjects: string[];
  fundingPressure: number;
  status: CompanyStatus;
  history: DecisionRecord[];
  lastReport: TurnReport | null;
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
  | { event: "session_started"; date: string; playerId: string }
  | {
      event: "game_started";
      date: string;
      playerId: string;
      industry: CompanyIndustry;
      targetTurns: CompanyRunLength;
      referralId?: string;
    }
  | {
      event: "share_opened" | "share_sheet_completed" | "referral_landed";
      date: string;
      playerId: string;
      referralId: string;
    };

export type { Locale };
