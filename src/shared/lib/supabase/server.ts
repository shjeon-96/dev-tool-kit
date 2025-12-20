import { createServerClient } from "@supabase/ssr";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import type { Database } from "./types";

/**
 * 서버 컴포넌트/API Route용 Supabase 클라이언트
 * - 서버 사이드에서만 사용
 * - 쿠키 기반 세션 관리
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
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
    },
  );
}

/**
 * Service Role 클라이언트 (Admin 전용)
 * - Webhook 처리, 관리자 작업에 사용
 * - RLS 우회
 * ⚠️ 절대 클라이언트에 노출하지 말 것!
 */
export function createServiceClient() {
  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );
}
