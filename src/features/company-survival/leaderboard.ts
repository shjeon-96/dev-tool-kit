import "server-only";

import { COMPANY_SCENARIOS } from "@/entities/company-scenario/data/scenarios";
import {
  calculateCompanyScore,
  replayCompanyRun,
} from "@/shared/lib/company-survival/game";
import type {
  CompanyGameState,
  CompanyIndustry,
} from "@/shared/types/company-survival";

interface RedisResult {
  result?: number;
  error?: string;
}

function redisConfig() {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) throw new Error("Vercel KV is not configured");
  return { url, token };
}

async function runRedisPipeline(commands: (string | number)[][]) {
  const { url, token } = redisConfig();
  const response = await fetch(`${url}/pipeline`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(commands),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Vercel KV returned ${response.status}`);
  const results = (await response.json()) as RedisResult[];
  const failure = results.find((result) => result.error);
  if (failure?.error) throw new Error(failure.error);
  return results;
}

export async function submitVerifiedCompanyResult({
  date,
  industry,
  history,
  playerId,
}: {
  date: string;
  industry: CompanyIndustry;
  history: CompanyGameState["history"];
  playerId: string;
}) {
  const state = replayCompanyRun(date, industry, history, COMPANY_SCENARIOS);
  if (state.status === "playing") throw new Error("Run is not complete");
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
  return {
    score,
    percentile: Math.round((atOrBelow / total) * 100),
    total,
  };
}
