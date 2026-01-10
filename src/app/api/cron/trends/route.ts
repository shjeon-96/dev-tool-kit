// Trend Collection Cron API
//
// Collects trending topics from multiple sources and stores in Supabase.
// Should be called every 2 hours via Vercel Cron.
//
// vercel.json configuration:
// { "crons": [{ "path": "/api/cron/trends", "schedule": "0 0,2,4,6,8,10,12,14,16,18,20,22 * * *" }] }

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { collectAllTrends, type ProcessedTrend } from "@/lib/trend-detector";

// Cron authentication secret
const CRON_SECRET = process.env.CRON_SECRET;

// Lazy initialization to prevent build-time errors
function getSupabaseClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

export const runtime = "nodejs";
export const maxDuration = 60;

export async function GET(request: Request) {
  // Verify authentication
  const authHeader = request.headers.get("authorization");
  if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
    console.warn("[Cron:Trends] Unauthorized request");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const startTime = Date.now();

  // Starting trend collection

  try {
    // Collect trends from all sources
    const { trends, results, errors } = await collectAllTrends({
      sources: ["google_trends", "reddit", "news_rss"],
      options: {
        region: "global",
        limit: 30,
        minVolume: 100,
      },
      maxTrendsPerSource: 30,
    });

    // Collected trends, proceeding to store

    // Store trends in Supabase
    const storedCount = await storeTrends(trends);

    const duration = Date.now() - startTime;

    // Log any errors
    if (errors.length > 0) {
      console.warn("[Cron:Trends] Errors:", errors);
    }

    return NextResponse.json({
      success: true,
      stats: {
        collected: trends.length,
        stored: storedCount,
        sources: results.map((r) => ({
          source: r.source,
          success: r.success,
          count: r.trends.length,
        })),
        errors: errors.length,
      },
      duration: `${duration}ms`,
    });
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error("[Cron:Trends] Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: (error as Error).message,
        duration: `${duration}ms`,
      },
      { status: 500 },
    );
  }
}

// POST also supported (for manual triggers)
export async function POST(request: Request) {
  return GET(request);
}

/**
 * Store processed trends in Supabase
 */
async function storeTrends(trends: ProcessedTrend[]): Promise<number> {
  if (trends.length === 0) return 0;

  const supabase = getSupabaseClient();
  let storedCount = 0;

  for (const trend of trends) {
    try {
      // Check if trend already exists (by keyword)
      const { data: existing } = await supabase
        .from("trends")
        .select("id")
        .eq("keyword", trend.keyword)
        .eq("processed", false)
        .single();

      if (existing) {
        // Update existing trend with higher volume if applicable
        const { error } = await supabase
          .from("trends")
          .update({
            volume: Math.max(trend.volume, 0),
            priority_score: trend.priorityScore,
            updated_at: new Date().toISOString(),
          })
          .eq("id", existing.id);

        if (!error) storedCount++;
      } else {
        // Insert new trend
        const { error } = await supabase.from("trends").insert({
          source: trend.source,
          keyword: trend.keyword,
          volume: trend.volume,
          competition_score: trend.competitionScore,
          priority_score: trend.priorityScore,
          region: trend.region,
          category: trend.category,
          detected_at: trend.detectedAt.toISOString(),
          processed: false,
          metadata: trend.metadata || {},
          related_keywords: trend.relatedKeywords || [],
        });

        if (!error) storedCount++;
      }
    } catch (error) {
      console.error(
        `[Cron:Trends] Failed to store trend: ${trend.keyword}`,
        error,
      );
    }
  }

  return storedCount;
}
