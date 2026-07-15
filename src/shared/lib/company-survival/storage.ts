import { calculateCompanyScore, isCompanyGameState } from "./game";
import {
  COMPANY_INDUSTRIES,
  type CompanyArchive,
  type CompanyCareerStats,
  type CompanyDailyResult,
  type CompanyGameState,
  type CompanyIndustry,
  isCompanyIndustry,
} from "@/shared/types/company-survival";

const ARCHIVE_KEY = "runway-10:archive:v2";
const PROFILE_KEY = "runway-10:profile:v1";
const PLAYER_ID_KEY = "runway-10:player:v1";

type StoredValue<T> =
  | { kind: "empty" }
  | { kind: "valid"; value: T }
  | { kind: "invalid" };

export function runStorageKey(date: string, industry: CompanyIndustry) {
  return `runway-10:company:v2:${date}:${industry}`;
}

export function readStoredProfile(
  storage: Pick<Storage, "getItem">,
): StoredValue<CompanyIndustry> {
  const value = storage.getItem(PROFILE_KEY);
  if (!value) return { kind: "empty" };
  return isCompanyIndustry(value)
    ? { kind: "valid", value }
    : { kind: "invalid" };
}

export function writeStoredProfile(
  storage: Pick<Storage, "setItem">,
  industry: CompanyIndustry,
) {
  storage.setItem(PROFILE_KEY, industry);
}

export function clearStoredProfile(storage: Pick<Storage, "removeItem">) {
  storage.removeItem(PROFILE_KEY);
}

export function readStoredRun(
  storage: Pick<Storage, "getItem">,
  date: string,
  industry: CompanyIndustry,
): StoredValue<CompanyGameState> {
  const saved = storage.getItem(runStorageKey(date, industry));
  if (!saved) return { kind: "empty" };
  try {
    const parsed: unknown = JSON.parse(saved);
    return isCompanyGameState(parsed, date) && parsed.industry === industry
      ? { kind: "valid", value: parsed }
      : { kind: "invalid" };
  } catch {
    return { kind: "invalid" };
  }
}

export function writeStoredRun(
  storage: Pick<Storage, "setItem">,
  state: CompanyGameState,
) {
  storage.setItem(
    runStorageKey(state.date, state.industry),
    JSON.stringify(state),
  );
}

export function clearStoredRun(
  storage: Pick<Storage, "removeItem">,
  date: string,
  industry: CompanyIndustry,
) {
  storage.removeItem(runStorageKey(date, industry));
}

export function clearStoredRunsForDate(
  storage: Pick<Storage, "removeItem">,
  date: string,
) {
  for (const industry of COMPANY_INDUSTRIES) {
    clearStoredRun(storage, date, industry);
  }
}

export function readOrCreatePlayerId(
  storage: Pick<Storage, "getItem" | "setItem">,
) {
  const stored = storage.getItem(PLAYER_ID_KEY);
  if (stored && /^[0-9a-f-]{36}$/i.test(stored)) return stored;
  const playerId = crypto.randomUUID();
  storage.setItem(PLAYER_ID_KEY, playerId);
  return playerId;
}

export function createEmptyArchive(): CompanyArchive {
  return { version: 2, results: {} };
}

function isDailyResult(
  value: unknown,
  key: string,
): value is CompanyDailyResult {
  if (!value || typeof value !== "object") return false;
  const result = value as Partial<CompanyDailyResult>;
  return (
    `${result.date}:${result.industry}` === key &&
    COMPANY_INDUSTRIES.some((industry) => industry === result.industry) &&
    ["survived", "bankrupt", "exodus", "rejected"].includes(
      result.status ?? "",
    ) &&
    typeof result.score === "number" &&
    typeof result.decisions === "number" &&
    Boolean(result.metrics) &&
    typeof result.metrics?.cash === "number" &&
    typeof result.metrics?.morale === "number" &&
    typeof result.metrics?.trust === "number" &&
    typeof result.metrics?.momentum === "number"
  );
}

export function readCompanyArchive(
  storage: Pick<Storage, "getItem">,
): StoredValue<CompanyArchive> {
  const saved = storage.getItem(ARCHIVE_KEY);
  if (!saved) return { kind: "empty" };
  try {
    const parsed: unknown = JSON.parse(saved);
    if (!parsed || typeof parsed !== "object") return { kind: "invalid" };
    const archive = parsed as Partial<CompanyArchive>;
    if (
      archive.version !== 2 ||
      !archive.results ||
      typeof archive.results !== "object"
    ) {
      return { kind: "invalid" };
    }
    const isValid = Object.entries(archive.results).every(([date, result]) =>
      isDailyResult(result, date),
    );
    return isValid
      ? { kind: "valid", value: archive as CompanyArchive }
      : { kind: "invalid" };
  } catch {
    return { kind: "invalid" };
  }
}

export function clearCompanyArchive(storage: Pick<Storage, "removeItem">) {
  storage.removeItem(ARCHIVE_KEY);
}

export function recordCompletedRun(
  storage: Pick<Storage, "getItem" | "setItem">,
  state: CompanyGameState,
) {
  if (state.status === "playing") {
    throw new Error("Cannot archive an unfinished company run");
  }
  const stored = readCompanyArchive(storage);
  if (stored.kind === "invalid") {
    throw new Error("Company archive is corrupted");
  }
  const archive = stored.kind === "valid" ? stored.value : createEmptyArchive();
  const next: CompanyArchive = {
    version: 2,
    results: {
      ...archive.results,
      [`${state.date}:${state.industry}`]: {
        date: state.date,
        industry: state.industry,
        status: state.status,
        score: calculateCompanyScore(state),
        metrics: { ...state.metrics },
        decisions: state.turn,
      },
    },
  };
  storage.setItem(ARCHIVE_KEY, JSON.stringify(next));
  return next;
}

function dayDistance(from: string, to: string) {
  return Math.round(
    (Date.parse(`${to}T00:00:00.000Z`) - Date.parse(`${from}T00:00:00.000Z`)) /
      86_400_000,
  );
}

export function deriveCareerStats(
  archive: CompanyArchive,
  today: string,
): CompanyCareerStats {
  const allResults = Object.values(archive.results);
  const results = Object.values(
    Object.groupBy(allResults, (result) => result.date),
  )
    .map((dailyResults) =>
      dailyResults!.reduce((best, result) =>
        result.score > best.score ? result : best,
      ),
    )
    .sort((left, right) => left.date.localeCompare(right.date));
  let bestStreak = 0;
  let runningStreak = 0;
  let previousDate: string | null = null;

  for (const result of results) {
    runningStreak =
      previousDate && dayDistance(previousDate, result.date) === 1
        ? runningStreak + 1
        : 1;
    bestStreak = Math.max(bestStreak, runningStreak);
    previousDate = result.date;
  }

  const lastDate = results.at(-1)?.date;
  const currentStreak =
    lastDate && dayDistance(lastDate, today) <= 1 ? runningStreak : 0;

  return {
    daysPlayed: results.length,
    daysSurvived: new Set(
      allResults
        .filter((result) => result.status === "survived")
        .map((result) => result.date),
    ).size,
    currentStreak,
    bestStreak,
    bestScore: Math.max(0, ...allResults.map((result) => result.score)),
  };
}
