// Article Generation Cron API
//
// Generates articles from unprocessed trends using Claude Haiku.
// Should be called every 4 hours via Vercel Cron.
//
// vercel.json configuration:
// { "crons": [{ "path": "/api/cron/generate-articles", "schedule": "30 0,4,8,12,16,20 * * *" }] }

import { NextResponse } from "next/server";
import {
  generateArticleFromTrend,
  estimateCost,
} from "@/lib/content-generator";
import type { Trend } from "@/entities/trend";
import { verifyCronAuth } from "@/shared/lib/api";
import { getUntypedServiceClient } from "@/shared/lib/supabase/server";

// Daily budget limit (in USD)
const DAILY_BUDGET_USD = 2.0; // ~$60/month

// Max articles per run
const MAX_ARTICLES_PER_RUN = 5;

export const runtime = "nodejs";
export const maxDuration = 300; // 5 minutes for article generation

export async function GET(request: Request) {
  // Verify authentication using shared middleware
  const auth = verifyCronAuth(request, "GenerateArticles");
  if (!auth.authorized) return auth.error;

  const startTime = Date.now();

  // Debug logging removed for production

  try {
    // Check daily spending
    const todaySpent = await getTodaySpending();
    if (todaySpent >= DAILY_BUDGET_USD) {
      console.warn(
        `[Cron:GenerateArticles] Daily budget exhausted: $${todaySpent.toFixed(4)}`,
      );
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

    const supabase = getUntypedServiceClient();
    if (!supabase) {
      return NextResponse.json(
        { success: false, error: "Database not configured" },
        { status: 500 },
      );
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
      console.warn("[Cron:GenerateArticles] No unprocessed trends found");
      return NextResponse.json({
        success: true,
        message: "No unprocessed trends",
        stats: { processed: 0 },
      });
    }

    // Processing trends

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

        // Determine article style based on category and keyword
        const style = determineArticleStyle(trend.category, trend.keyword);

        // Generate article
        const result = await generateArticleFromTrend(trend, style);

        if (!result || result.error) {
          results.failed++;
          const errorMsg = result?.error || "Unknown error";
          results.errors.push(
            `Failed to generate for: ${trend.keyword} - ${errorMsg}`,
          );
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
          // Handle duplicate slug - article already exists, mark trend as processed
          if (insertError.message.includes("duplicate key")) {
            await supabase
              .from("trends")
              .update({ processed: true })
              .eq("id", trend.id);
            results.errors.push(
              `Skipped duplicate for ${trend.keyword}: article already exists`,
            );
          } else {
            results.failed++;
            results.errors.push(
              `DB insert failed for ${trend.keyword}: ${insertError.message}`,
            );
          }
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

        // Article generated successfully

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
  const supabase = getUntypedServiceClient();
  if (!supabase) return 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const { data, error } = await supabase
    .from("articles")
    .select("generation_cost_usd")
    .gte("created_at", today.toISOString());

  if (error || !data) {
    console.warn(
      "[Cron:GenerateArticles] Failed to get today spending:",
      error,
    );
    return 0;
  }

  return data.reduce(
    (sum, article) => sum + (article.generation_cost_usd || 0),
    0,
  );
}

/**
 * Patterns that indicate comparison/review content (high RPM)
 */
const COMPARISON_PATTERNS = [
  / vs\.? /i, // "X vs Y" or "X vs. Y"
  / versus /i, // "X versus Y"
  /best .+ for /i, // "best CRM for small business"
  /top \d+ /i, // "top 10 software"
  /\d+ best /i, // "10 best tools"
  / comparison/i, // "software comparison"
  / compared/i, // "tools compared"
  / alternative/i, // "Slack alternatives"
  / review/i, // "product review"
];

/**
 * Check if keyword matches comparison patterns
 */
function isComparisonKeyword(keyword: string): boolean {
  return COMPARISON_PATTERNS.some((pattern) => pattern.test(keyword));
}

/**
 * Determine article style based on category and keyword
 */
function determineArticleStyle(
  category?: string | null,
  keyword?: string,
): "news" | "howto" | "listicle" | "analysis" | "comparison" {
  // Check for comparison patterns first (highest RPM potential)
  if (keyword && isComparisonKeyword(keyword)) {
    return "comparison";
  }

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
