import { createServerClient } from "@supabase/ssr";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import type { Database } from "./types";

// Placeholder values for build time when env vars are not available
const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";
const SUPABASE_SERVICE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY || "placeholder-service-key";

/**
 * Check if Supabase environment variables are configured
 */
export function isSupabaseConfigured(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

/**
 * 서버 컴포넌트/API Route용 Supabase 클라이언트
 * - 서버 사이드에서만 사용
 * - 쿠키 기반 세션 관리
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(
        cookiesToSet: Array<{
          name: string;
          value: string;
          options?: Record<string, unknown>;
        }>,
      ) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // Server Component에서 setAll이 호출되면 무시
          // 미들웨어에서 세션 갱신이 처리됨
        }
      },
    },
  });
}

/**
 * Service Role 클라이언트 (Admin 전용)
 * - Webhook 처리, 관리자 작업에 사용
 * - RLS 우회
 * ⚠️ 절대 클라이언트에 노출하지 말 것!
 */
export function createServiceClient() {
  return createSupabaseClient<Database>(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

/**
 * Safe Service Client getter (returns null if not configured)
 * Use this in entities/queries where graceful fallback is needed
 * - Returns null during build time when env vars are not available
 * - Safe for SSG/ISR pages that need to handle missing config
 */
export function getServiceClient() {
  if (!isSupabaseConfigured()) {
    return null;
  }

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    // Fallback to anon key if service key not available
    return createSupabaseClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }

  return createServiceClient();
}

/**
 * Untyped Service Client for tables not in Database type
 * Use this for trend blog tables (articles, authors, etc.)
 * Returns null if not configured
 */
export function getUntypedServiceClient() {
  if (!isSupabaseConfigured()) {
    return null;
  }

  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!key) {
    return null;
  }

  return createSupabaseClient(SUPABASE_URL, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
