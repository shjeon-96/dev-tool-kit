import "server-only";

import {
  calculateCompanyScore,
  replayCompanyRun,
} from "@/shared/lib/company-survival/game";
import { runRedisPipeline } from "@/shared/lib/redis";
import type {
  CompanyGameState,
  CompanyIndustry,
  CeoTrait,
} from "@/shared/types/company-survival";
import { recordVerifiedCompletion } from "./engagement";

export async function submitVerifiedCompanyResult({
  date,
  industry,
  history,
  trait,
  deck,
  playerId,
}: {
  date: string;
  industry: CompanyIndustry;
  history: CompanyGameState["history"];
  trait: CeoTrait;
  deck: CompanyGameState["deck"];
  playerId: string;
}) {
  const targetTurns = 6;
  let state: CompanyGameState;
  try {
    state = replayCompanyRun(date, industry, trait, deck, history);
  } catch {
    return { kind: "invalid" as const, error: "Invalid decision history" };
  }
  if (state.status === "playing") {
    return { kind: "invalid" as const, error: "Run is not complete" };
  }
  const score = calculateCompanyScore(state);
  const key = `runway10:leaderboard:v1:${industry}`;
  const member = `${playerId}:${date}`;
  const results = await runRedisPipeline([
    ["ZADD", key, score, member],
    ["ZCOUNT", key, "-inf", score],
    ["ZCARD", key],
  ]);
  const atOrBelow = results[1]?.result;
  const total = results[2]?.result;
  if (typeof atOrBelow !== "number" || typeof total !== "number" || total < 1) {
    throw new Error("Vercel KV returned an invalid leaderboard result");
  }
  await recordVerifiedCompletion({ date, playerId, targetTurns });
  return {
    kind: "verified" as const,
    score,
    percentile: Math.round((atOrBelow / total) * 100),
    total,
  };
}
