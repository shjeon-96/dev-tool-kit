// Article Publishing Cron API
//
// Publishes scheduled articles from the queue.
// Should be called every hour via Vercel Cron.
//
// vercel.json configuration:
// { "crons": [{ "path": "/api/cron/publish-articles", "schedule": "0 * * * *" }] }

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

// Cron authentication secret
const CRON_SECRET = process.env.CRON_SECRET;

// Max articles to publish per run
const MAX_PUBLISH_PER_RUN = 10;

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
    console.warn("[Cron:PublishArticles] Unauthorized request");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const startTime = Date.now();
  const now = new Date();

  // Starting article publishing

  try {
    const supabase = getSupabaseClient();

    // Get articles ready to publish from queue
    const { data: queueItems, error: queueError } = await supabase
      .from("publish_queue")
      .select(
        `
        id,
        article_id,
        priority,
        scheduled_time,
        retry_count,
        articles (
          id,
          slug,
          title_ko,
          title_en,
          category,
          status
        )
      `,
      )
      .eq("status", "pending")
      .lte("scheduled_time", now.toISOString())
      .order("priority", { ascending: false })
      .order("scheduled_time", { ascending: true })
      .limit(MAX_PUBLISH_PER_RUN);

    if (queueError) {
      throw new Error(`Failed to fetch queue: ${queueError.message}`);
    }

    if (!queueItems || queueItems.length === 0) {
      // No articles ready to publish
      return NextResponse.json({
        success: true,
        message: "No articles to publish",
        stats: { published: 0 },
      });
    }

    // Processing queue items

    const results = {
      published: 0,
      failed: 0,
      articles: [] as string[],
      errors: [] as string[],
    };

    for (const queueItem of queueItems) {
      // Handle both single object and array from Supabase join
      const articlesData = queueItem.articles;
      const article = (
        Array.isArray(articlesData) ? articlesData[0] : articlesData
      ) as {
        id: string;
        slug: string;
        title_ko: string;
        title_en: string;
        category: string;
        status: string;
      } | null;

      if (!article) {
        // Mark queue item as failed
        await supabase
          .from("publish_queue")
          .update({
            status: "failed",
            error_message: "Article not found",
          })
          .eq("id", queueItem.id);

        results.failed++;
        results.errors.push(`Article not found for queue item ${queueItem.id}`);
        continue;
      }

      try {
        // Update queue status to processing
        await supabase
          .from("publish_queue")
          .update({ status: "processing" })
          .eq("id", queueItem.id);

        // Update article status to published
        const { error: updateError } = await supabase
          .from("articles")
          .update({
            status: "published",
            published_at: now.toISOString(),
            updated_at: now.toISOString(),
          })
          .eq("id", article.id);

        if (updateError) {
          throw new Error(`Failed to update article: ${updateError.message}`);
        }

        // Trigger ISR revalidation for the article pages
        try {
          // Revalidate article pages for all locales
          revalidatePath(`/ko/${article.category}/${article.slug}`);
          revalidatePath(`/en/${article.category}/${article.slug}`);

          // Revalidate category pages
          revalidatePath(`/ko/${article.category}`);
          revalidatePath(`/en/${article.category}`);

          // Revalidate home pages
          revalidatePath("/ko");
          revalidatePath("/en");

          // Revalidate sitemap
          revalidatePath("/sitemap.xml");
        } catch (revalidateError) {
          // Log but don't fail - ISR will eventually catch up
          console.warn(
            "[Cron:PublishArticles] Revalidation warning:",
            revalidateError,
          );
        }

        // Mark queue item as completed
        await supabase
          .from("publish_queue")
          .update({
            status: "completed",
          })
          .eq("id", queueItem.id);

        // Initialize analytics record
        await supabase.from("article_analytics").insert({
          article_id: article.id,
          views: 0,
          unique_visitors: 0,
          avg_time_on_page: 0,
          bounce_rate: 0,
          social_shares: 0,
        });

        results.published++;
        results.articles.push(article.slug);

        // Article published successfully
      } catch (error) {
        // Handle retry logic
        const retryCount = queueItem.retry_count + 1;
        const maxRetries = 3;

        if (retryCount >= maxRetries) {
          await supabase
            .from("publish_queue")
            .update({
              status: "failed",
              retry_count: retryCount,
              error_message:
                error instanceof Error ? error.message : "Unknown error",
            })
            .eq("id", queueItem.id);
        } else {
          // Schedule retry (15 minutes later)
          const retryTime = new Date(now.getTime() + 15 * 60 * 1000);
          await supabase
            .from("publish_queue")
            .update({
              status: "pending",
              retry_count: retryCount,
              scheduled_time: retryTime.toISOString(),
              error_message:
                error instanceof Error ? error.message : "Unknown error",
            })
            .eq("id", queueItem.id);
        }

        results.failed++;
        results.errors.push(
          `Failed to publish ${article.slug}: ${error instanceof Error ? error.message : "Unknown"}`,
        );
      }
    }

    const duration = Date.now() - startTime;

    // Publishing completed

    return NextResponse.json({
      success: true,
      stats: {
        published: results.published,
        failed: results.failed,
        articles: results.articles,
        errors: results.errors.length > 0 ? results.errors : undefined,
      },
      duration: `${duration}ms`,
    });
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error("[Cron:PublishArticles] Error:", error);

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
