import { recordCompanyActivity } from "@/features/company-survival/engagement";
import { parseCompanyActivity } from "@/shared/lib/company-survival/activity";
import { getUtcDateKey } from "@/shared/lib/company-survival/game";

export async function POST(request: Request) {
  try {
    const activity = parseCompanyActivity(
      await request.json(),
      getUtcDateKey(),
    );
    if (!activity) {
      return Response.json(
        { error: "Invalid activity payload" },
        { status: 400 },
      );
    }
    // Local browsers may share production-like env files; never pollute business metrics in dev.
    if (process.env.NODE_ENV !== "production") {
      return new Response(null, { status: 204 });
    }
    // ponytail: anonymous UUID dedupe assumes no targeted metric spam; add edge rate limits if abuse appears.
    await recordCompanyActivity(activity);
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error(
      JSON.stringify({
        level: "error",
        message: "company_activity_failed",
        error: error instanceof Error ? error.message : String(error),
      }),
    );
    return Response.json(
      { error: "Could not record activity" },
      { status: 503 },
    );
  }
}
