import { NextResponse } from "next/server";
import { createClient } from "@/shared/lib/supabase/server";

/**
 * OAuth 콜백 핸들러
 * - Google/GitHub 로그인 후 리다이렉트
 * - Authorization code를 세션으로 교환
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // 로그인 성공 - 원래 페이지로 리다이렉트
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // 에러 발생 시 로그인 페이지로 리다이렉트
  return NextResponse.redirect(
    `${origin}/auth/signin?error=auth_callback_error`,
  );
}
