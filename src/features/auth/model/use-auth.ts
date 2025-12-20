"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseClient, type User } from "@/shared/lib/supabase";
import type { AuthError, Session } from "@supabase/supabase-js";

interface UseAuthReturn {
  user: User | null;
  session: Session | null;
  loading: boolean;
  error: AuthError | null;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (
    email: string,
    password: string,
    name?: string,
  ) => Promise<void>;
  signInWithOAuth: (provider: "google" | "github") => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AuthError | null>(null);
  const router = useRouter();
  const supabase = getSupabaseClient();
  const initialized = useRef(false);

  // 세션 초기화 및 변경 감지
  useEffect(() => {
    // 초기 세션 가져오기
    const initializeAuth = async () => {
      try {
        const {
          data: { session: initialSession },
        } = await supabase.auth.getSession();
        setSession(initialSession);

        if (initialSession?.user) {
          // users 테이블에서 프로필 가져오기 (실패해도 무시)
          try {
            const { data: profile } = await supabase
              .from("users")
              .select("*")
              .eq("id", initialSession.user.id)
              .single();
            setUser(profile);
          } catch {
            // 프로필 조회 실패 시 무시 (테이블이 없거나 RLS 문제)
            setUser(null);
          }
        }
      } catch {
        // 세션 조회 실패
      } finally {
        setLoading(false);
        initialized.current = true;
      }
    };

    initializeAuth();

    // 인증 상태 변경 감지
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      // 초기화 전에는 무시 (initializeAuth에서 처리)
      if (!initialized.current) return;

      setSession(currentSession);

      if (currentSession?.user) {
        // users 테이블에서 프로필 가져오기
        try {
          const { data: profile } = await supabase
            .from("users")
            .select("*")
            .eq("id", currentSession.user.id)
            .single();
          setUser(profile);
        } catch {
          setUser(null);
        }
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  // 이메일/비밀번호 로그인
  const signInWithEmail = useCallback(
    async (email: string, password: string) => {
      setLoading(true);
      setError(null);

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error);
        setLoading(false);
        throw error;
      }

      router.refresh();
    },
    [supabase, router],
  );

  // 이메일/비밀번호 회원가입
  const signUpWithEmail = useCallback(
    async (email: string, password: string, name?: string) => {
      setLoading(true);
      setError(null);

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      });

      if (error) {
        setError(error);
        setLoading(false);
        throw error;
      }

      router.refresh();
    },
    [supabase, router],
  );

  // OAuth 로그인 (Google, GitHub)
  const signInWithOAuth = useCallback(
    async (provider: "google" | "github") => {
      setLoading(true);
      setError(null);

      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        setError(error);
        setLoading(false);
        throw error;
      }
    },
    [supabase],
  );

  // 로그아웃
  const signOut = useCallback(async () => {
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signOut();

    if (error) {
      setError(error);
      setLoading(false);
      throw error;
    }

    router.refresh();
    router.push("/");
  }, [supabase, router]);

  // 비밀번호 재설정
  const resetPassword = useCallback(
    async (email: string) => {
      setError(null);

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) {
        setError(error);
        throw error;
      }
    },
    [supabase],
  );

  return {
    user,
    session,
    loading,
    error,
    signInWithEmail,
    signUpWithEmail,
    signInWithOAuth,
    signOut,
    resetPassword,
  };
}
