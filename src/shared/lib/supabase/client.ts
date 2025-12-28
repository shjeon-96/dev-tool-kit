"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types";

export type TypedSupabaseClient = SupabaseClient<Database>;

// Placeholder values for build time when env vars are not available
const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

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
 * 브라우저/클라이언트 컴포넌트용 Supabase 클라이언트
 * - 클라이언트 사이드에서 사용
 * - 인증 상태 관리, 실시간 구독 등에 사용
 * - 환경 변수 없이도 빌드 가능 (placeholder 사용)
 */
export function createClient(): TypedSupabaseClient {
  return createBrowserClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);
}

// Singleton instance for client-side
let clientInstance: TypedSupabaseClient | undefined = undefined;

export function getSupabaseClient(): TypedSupabaseClient {
  if (clientInstance === undefined) {
    clientInstance = createClient();
  }
  return clientInstance;
}
