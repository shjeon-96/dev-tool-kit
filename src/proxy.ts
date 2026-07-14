import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, type Locale } from "@/shared/config/site";

function preferredLocale(request: NextRequest): Locale {
  const language = request.headers.get("accept-language")?.toLowerCase() ?? "";
  if (language.includes("ko")) return "ko";
  if (language.includes("ja")) return "ja";
  return DEFAULT_LOCALE;
}

export function proxy(request: NextRequest) {
  return NextResponse.redirect(
    new URL(`/${preferredLocale(request)}`, request.url),
  );
}

export const config = { matcher: ["/"] };
