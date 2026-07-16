import "server-only";

import { runRedisPipeline } from "@/shared/lib/redis";
import type {
  CompanyActivityPayload,
  CompanyRunLength,
} from "@/shared/types/company-survival";

const ACTIVITY_TTL_SECONDS = 120 * 86_400;
const IDENTITY_TTL_SECONDS = 400 * 86_400;

function dayDistance(from: string, to: string) {
  return Math.round(
    (Date.parse(`${to}T00:00:00.000Z`) - Date.parse(`${from}T00:00:00.000Z`)) /
      86_400_000,
  );
}

function addToDailySet(key: string, playerId: string) {
  return [
    ["SADD", key, playerId],
    ["EXPIRE", key, ACTIVITY_TTL_SECONDS],
  ] satisfies (string | number)[][];
}

async function recordSession(date: string, playerId: string) {
  const firstDateKey = `runway10:user:first-date:v1:${playerId}`;
  const sessionKey = `runway10:activity:session:v1:${date}`;
  const initial = await runRedisPipeline([
    ["SET", firstDateKey, date, "NX", "EX", IDENTITY_TTL_SECONDS],
    ["GET", firstDateKey],
    ...addToDailySet(sessionKey, playerId),
  ]);
  const firstDate = initial[1]?.result;
  if (typeof firstDate !== "string") {
    throw new Error("Vercel KV returned an invalid first visit date");
  }
  const difference = dayDistance(firstDate, date);
  const cohortKey =
    difference === 0
      ? `runway10:cohort:first:v1:${firstDate}`
      : difference === 1
        ? `runway10:cohort:d1:v1:${firstDate}`
        : difference === 7
          ? `runway10:cohort:d7:v1:${firstDate}`
          : null;
  if (cohortKey) {
    await runRedisPipeline(addToDailySet(cohortKey, playerId));
  }
}

async function recordReferral(
  event: "referral_landed" | "referral_game_started",
  date: string,
  playerId: string,
  referralId: string,
) {
  const ownerKey = `runway10:referral:owner:v1:${referralId}`;
  const [owner] = await runRedisPipeline([["GET", ownerKey]]);
  if (typeof owner?.result !== "string" || owner.result === playerId) return;
  const action = event === "referral_landed" ? "landed" : "started";
  await runRedisPipeline([
    ...addToDailySet(
      `runway10:referral:${action}:v1:${date}:${referralId}`,
      playerId,
    ),
    ...addToDailySet(`runway10:referral:${action}:v1:${date}`, playerId),
  ]);
}

export async function recordCompanyActivity(activity: CompanyActivityPayload) {
  if (activity.event === "session_started") {
    await recordSession(activity.date, activity.playerId);
    return;
  }
  if (activity.event === "game_started") {
    await runRedisPipeline([
      ...addToDailySet(
        `runway10:activity:start:v1:${activity.date}`,
        activity.playerId,
      ),
      ...addToDailySet(
        `runway10:experiment:run-length:v1:start:${activity.targetTurns}:${activity.date}`,
        activity.playerId,
      ),
    ]);
    if (activity.referralId) {
      await recordReferral(
        "referral_game_started",
        activity.date,
        activity.playerId,
        activity.referralId,
      );
    }
    return;
  }
  if (activity.event === "share_opened") {
    await runRedisPipeline([
      [
        "SET",
        `runway10:referral:owner:v1:${activity.referralId}`,
        activity.playerId,
        "EX",
        IDENTITY_TTL_SECONDS,
      ],
    ]);
    return;
  }
  if (activity.event === "share_sheet_completed") {
    await runRedisPipeline(
      addToDailySet(
        `runway10:activity:share:v1:${activity.date}`,
        activity.playerId,
      ),
    );
    return;
  }
  await recordReferral(
    "referral_landed",
    activity.date,
    activity.playerId,
    activity.referralId,
  );
}

export async function recordVerifiedCompletion({
  date,
  playerId,
  targetTurns,
}: {
  date: string;
  playerId: string;
  targetTurns: CompanyRunLength;
}) {
  await runRedisPipeline([
    ...addToDailySet(`runway10:activity:complete:v1:${date}`, playerId),
    ...addToDailySet(
      `runway10:experiment:run-length:v1:complete:${targetTurns}:${date}`,
      playerId,
    ),
  ]);
}
