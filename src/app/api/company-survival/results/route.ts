import { submitVerifiedCompanyResult } from "@/features/company-survival/leaderboard";
import { isAnonymousId } from "@/shared/lib/company-survival/identity";
import {
  isCompanyIndustry,
  type DecisionRecord,
} from "@/shared/types/company-survival";

interface ResultPayload {
  date?: unknown;
  industry?: unknown;
  history?: unknown;
  playerId?: unknown;
}

function isDecisionHistory(value: unknown): value is DecisionRecord[] {
  return (
    Array.isArray(value) &&
    value.length <= 10 &&
    value.every(
      (decision) =>
        decision &&
        typeof decision === "object" &&
        typeof decision.scenarioId === "string" &&
        typeof decision.choiceId === "string",
    )
  );
}

export async function POST(request: Request) {
  const startedAt = Date.now();
  try {
    const payload = (await request.json()) as ResultPayload;
    if (
      typeof payload.date !== "string" ||
      !/^\d{4}-\d{2}-\d{2}$/.test(payload.date) ||
      !isCompanyIndustry(payload.industry) ||
      !isDecisionHistory(payload.history) ||
      typeof payload.playerId !== "string" ||
      !isAnonymousId(payload.playerId)
    ) {
      return Response.json(
        { error: "Invalid result payload" },
        { status: 400 },
      );
    }
    const result = await submitVerifiedCompanyResult({
      date: payload.date,
      industry: payload.industry,
      history: payload.history,
      playerId: payload.playerId,
    });
    if (result.kind === "invalid") {
      return Response.json({ error: result.error }, { status: 400 });
    }
    // eslint-disable-next-line no-console -- Vercel runtime needs a structured info-level success event.
    console.log(
      JSON.stringify({
        level: "info",
        message: "company_result_recorded",
        industry: payload.industry,
        duration_ms: Date.now() - startedAt,
      }),
    );
    return Response.json({
      score: result.score,
      percentile: result.percentile,
      total: result.total,
    });
  } catch (error) {
    console.error(
      JSON.stringify({
        level: "error",
        message: "company_result_failed",
        error: error instanceof Error ? error.message : String(error),
        duration_ms: Date.now() - startedAt,
      }),
    );
    return Response.json({ error: "Could not record result" }, { status: 503 });
  }
}
