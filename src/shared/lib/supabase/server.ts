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
