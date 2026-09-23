import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/shared/config/site";

function preferredLocale(request: NextRequest): Locale {
  const language = request.headers.get("accept-language")?.toLowerCase() ?? "";
  let best: { locale: Locale; quality: number } | undefined;

  for (const range of language.split(",")) {
    const [tag, ...parameters] = range.trim().split(";");
    const locale = tag.split("-")[0];
    if (!isLocale(locale)) continue;

    const qualityParameter = parameters
      .map((parameter) => parameter.trim())
      .find((parameter) => parameter.startsWith("q="));
    const quality = qualityParameter ? Number(qualityParameter.slice(2)) : 1;
    if (quality > 0 && quality <= 1 && (!best || quality > best.quality)) {
      best = { locale, quality };
    }
  }

  return best?.locale ?? DEFAULT_LOCALE;
}

export function proxy(request: NextRequest) {
  return NextResponse.redirect(
    new URL(`/${preferredLocale(request)}`, request.url),
  );
}

export const config = { matcher: ["/"] };
