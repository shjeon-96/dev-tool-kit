import { ADS_TXT_CONTENT } from "@/shared/config/adsense";

export function GET() {
  return new Response(ADS_TXT_CONTENT, {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
