// Article Generation Cron API
//
// Generates articles from unprocessed trends using Claude Haiku.
// Should be called every 4 hours via Vercel Cron.
//
// vercel.json configuration:
// { "crons": [{ "path": "/api/cron/generate-articles", "schedule": "30 0,4,8,12,16,20 * * *" }] }

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { generateArticleFromTrend, estimateCost } from "@/lib/content-generator";
import type { Trend } from "@/entities/trend";

// Cron authentication secret
const CRON_SECRET = process.env.CRON_SECRET;

// Daily budget limit (in USD)
const DAILY_BUDGET_USD = 2.0; // ~$60/month

// Max articles per run
const MAX_ARTICLES_PER_RUN = 5;

// Supabase service role client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export const runtime = "nodejs";
export const maxDuration = 300; // 5 minutes for article generation

export async function GET(request: Request) {
  // Verify authentication
  const authHeader = request.headers.get("authorization");
  if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
    console.warn("[Cron:GenerateArticles] Unauthorized request");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const startTime = Date.now();

  console.log("[Cron:GenerateArticles] Starting article generation");

  try {
    // Check daily spending
    const todaySpent = await getTodaySpending();
    if (todaySpent >= DAILY_BUDGET_USD) {
      console.log(`[Cron:GenerateArticles] Daily budget exhausted: $${todaySpent.toFixed(4)}`);
      return NextResponse.json({
        success: true,
        message: "Daily budget exhausted",
        stats: { todaySpent, dailyBudget: DAILY_BUDGET_USD },
      });
    }

    const remainingBudget = DAILY_BUDGET_USD - todaySpent;

    // Estimate how many articles we can generate
    const estimate = estimateCost(1);
    const maxAffordable = Math.floor(remainingBudget / estimate.estimatedCost);
    const articlesToGenerate = Math.min(MAX_ARTICLES_PER_RUN, maxAffordable);

    if (articlesToGenerate === 0) {
      return NextResponse.json({
        success: true,
        message: "Not enough budget for article generation",
        stats: { remainingBudget, costPerArticle: estimate.estimatedCost },
      });
    }

    // Get unprocessed trends with highest priority
    const { data: trends, error: trendsError } = await supabase
      .from("trends")
      .select("*")
      .eq("processed", false)
      .order("priority_score", { ascending: false })
      .limit(articlesToGenerate);

    if (trendsError) {
      throw new Error(`Failed to fetch trends: ${trendsError.message}`);
    }

    if (!trends || trends.length === 0) {
      console.log("[Cron:GenerateArticles] No unprocessed trends found");
      return NextResponse.json({
        success: true,
        message: "No unprocessed trends",
        stats: { processed: 0 },
      });
    }

    console.log(`[Cron:GenerateArticles] Processing ${trends.length} trends`);

    const results = {
      generated: 0,
      failed: 0,
      totalCost: 0,
      articles: [] as string[],
      errors: [] as string[],
    };

    // Generate articles for each trend
    for (const trendData of trends) {
      try {
        // Convert to Trend type
        const trend: Trend = {
          id: trendData.id,
          source: trendData.source,
          keyword: trendData.keyword,
          volume: trendData.volume,
          competition_score: trendData.competition_score,
          priority_score: trendData.priority_score,
          region: trendData.region,
          category: trendData.category,
          detected_at: trendData.detected_at,
          processed: trendData.processed,
          processed_at: trendData.processed_at,
          metadata: trendData.metadata,
          related_keywords: trendData.related_keywords,
          created_at: trendData.created_at,
          updated_at: trendData.updated_at,
        };

        // Determine article style based on category
        const style = determineArticleStyle(trend.category);

        // Generate article
        const result = await generateArticleFromTrend(trend, style);

        if (!result) {
          results.failed++;
          results.errors.push(`Failed to generate for: ${trend.keyword}`);
          continue;
        }

        const { article, cost } = result;

        // Insert article into database
        const { data: insertedArticle, error: insertError } = await supabase
          .from("articles")
          .insert(article)
          .select("id, slug")
          .single();

        if (insertError) {
          results.failed++;
          results.errors.push(`DB insert failed for ${trend.keyword}: ${insertError.message}`);
          continue;
        }

        // Mark trend as processed
        await supabase
          .from("trends")
          .update({ processed: true })
          .eq("id", trend.id);

        // Add to publish queue (schedule 1 hour from now)
        const scheduledTime = new Date(Date.now() + 60 * 60 * 1000);
        await supabase.from("publish_queue").insert({
          article_id: insertedArticle.id,
          priority: Math.round(trend.priority_score || 50),
          scheduled_time: scheduledTime.toISOString(),
          status: "pending",
        });

        results.generated++;
        results.totalCost += cost;
        results.articles.push(insertedArticle.slug);

        console.log(`[Cron:GenerateArticles] Generated: ${insertedArticle.slug} ($${cost.toFixed(4)})`);

        // Small delay between API calls
        await new Promise((resolve) => setTimeout(resolve, 500));
      } catch (error) {
        results.failed++;
        results.errors.push(
          `Error processing ${trendData.keyword}: ${error instanceof Error ? error.message : "Unknown"}`,
        );
      }
    }

    const duration = Date.now() - startTime;

    return NextResponse.json({
      success: true,
      stats: {
        generated: results.generated,
        failed: results.failed,
        totalCost: results.totalCost,
        todaySpent: todaySpent + results.totalCost,
        articles: results.articles,
        errors: results.errors.length > 0 ? results.errors : undefined,
      },
      duration: `${duration}ms`,
    });
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error("[Cron:GenerateArticles] Error:", error);

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
 * Get today's total spending on article generation
 */
async function getTodaySpending(): Promise<number> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const { data, error } = await supabase
    .from("articles")
    .select("generation_cost_usd")
    .gte("created_at", today.toISOString());

  if (error || !data) {
    console.warn("[Cron:GenerateArticles] Failed to get today spending:", error);
    return 0;
  }

  return data.reduce((sum, article) => sum + (article.generation_cost_usd || 0), 0);
}

/**
 * Determine article style based on category
 */
function determineArticleStyle(
  category?: string | null,
): "news" | "howto" | "listicle" | "analysis" {
  switch (category) {
    case "tech":
      return "analysis";
    case "business":
      return "news";
    case "lifestyle":
      return "howto";
    case "entertainment":
      return "listicle";
    case "trending":
    case "news":
    default:
      return "news";
  }
}
