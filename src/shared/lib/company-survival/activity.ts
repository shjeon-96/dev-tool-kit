import { isCompanyIndustry } from "@/shared/types/company-survival";
import type {
  CompanyActivityPayload,
  CompanyRunLength,
} from "@/shared/types/company-survival";
import { isAnonymousId } from "./identity";

function isRunLength(value: unknown): value is CompanyRunLength {
  return value === 6 || value === 10;
}

export function parseCompanyActivity(
  value: unknown,
  currentDate: string,
): CompanyActivityPayload | null {
  if (!value || typeof value !== "object") return null;
  const payload = value as Record<string, unknown>;
  if (
    payload.date !== currentDate ||
    !isAnonymousId(payload.playerId) ||
    typeof payload.event !== "string"
  ) {
    return null;
  }
  const base = { date: payload.date, playerId: payload.playerId };
  if (payload.event === "session_started") {
    return { event: payload.event, ...base };
  }
  if (
    payload.event === "game_started" &&
    isCompanyIndustry(payload.industry) &&
    isRunLength(payload.targetTurns) &&
    (payload.referralId === undefined || isAnonymousId(payload.referralId))
  ) {
    return {
      event: payload.event,
      ...base,
      industry: payload.industry,
      targetTurns: payload.targetTurns,
      referralId: payload.referralId as string | undefined,
    };
  }
  if (
    (payload.event === "share_opened" ||
      payload.event === "share_sheet_completed" ||
      payload.event === "referral_landed") &&
    isAnonymousId(payload.referralId)
  ) {
    return { event: payload.event, ...base, referralId: payload.referralId };
  }
  return null;
}
