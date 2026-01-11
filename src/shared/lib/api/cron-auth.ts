// Cron Authentication Middleware
// Reusable auth check for Vercel Cron jobs

import { NextResponse } from "next/server";

const CRON_SECRET = process.env.CRON_SECRET;

/**
 * Result type for cron auth check
 */
export type CronAuthResult =
  | { authorized: true; error?: never }
  | { authorized: false; error: NextResponse };

/**
 * Verify cron request authorization
 * @param request - The incoming request
 * @param routeName - Name of the route for logging (e.g., "Trends", "GenerateArticles")
 * @returns Authorization result with error response if unauthorized
 *
 * @example
 * ```ts
 * const auth = verifyCronAuth(request, "Trends");
 * if (!auth.authorized) return auth.error;
 * ```
 */
export function verifyCronAuth(
  request: Request,
  routeName: string,
): CronAuthResult {
  const authHeader = request.headers.get("authorization");

  if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
    console.warn(`[Cron:${routeName}] Unauthorized request`);
    return {
      authorized: false,
      error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  return { authorized: true };
}

/**
 * Higher-order function to wrap cron handlers with auth
 * @param routeName - Name of the route for logging
 * @param handler - The actual cron handler function
 * @returns Wrapped handler with auth check
 *
 * @example
 * ```ts
 * export const GET = withCronAuth("Trends", async (request) => {
 *   // Your cron logic here
 *   return NextResponse.json({ success: true });
 * });
 * ```
 */
export function withCronAuth(
  routeName: string,
  handler: (request: Request) => Promise<NextResponse>,
) {
  return async (request: Request) => {
    const auth = verifyCronAuth(request, routeName);
    if (!auth.authorized) return auth.error;

    return handler(request);
  };
}
