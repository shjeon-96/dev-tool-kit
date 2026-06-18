export const trendEventNames = [
  "game_start",
  "category_selected",
  "answer_selected",
  "answer_correct",
  "answer_wrong",
  "game_over",
  "restart_game",
  "share_result",
  "ad_slot_view",
  "category_page_view",
] as const;

export type TrendEventName = (typeof trendEventNames)[number];

type PublicAnalyticsEnv = Record<string, string | undefined>;

const googleAnalyticsIdPattern = /^G-[A-Z0-9]+$/;
const plausibleBareDomainPattern =
  /^(?!-)(?:[a-zA-Z0-9-]{1,63}\.)+[a-zA-Z]{2,63}$/;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
    plausible?: (
      eventName: string,
      options?: { props?: Record<string, unknown> },
    ) => void;
  }
}

export function trackTrendEvent(
  eventName: TrendEventName,
  properties: Record<string, unknown> = {},
) {
  if (typeof window === "undefined") return;

  const payload = buildTrendEventPayload(eventName, properties);

  window.dataLayer?.push(payload);
  window.gtag?.("event", eventName, payload);
  window.plausible?.(eventName, { props: properties });
}

export function buildTrendEventPayload(
  eventName: TrendEventName,
  properties: Record<string, unknown> = {},
  timestamp = Date.now(),
) {
  return {
    event: eventName,
    timestamp,
    ...properties,
  };
}

export function getGoogleAnalyticsId(env: PublicAnalyticsEnv = process.env) {
  const measurementId = env.NEXT_PUBLIC_GA_ID?.trim();

  if (!measurementId) return undefined;

  if (!googleAnalyticsIdPattern.test(measurementId)) {
    throw new Error("NEXT_PUBLIC_GA_ID must match G-<letters-or-digits>");
  }

  return measurementId;
}

export function getPlausibleDomain(env: PublicAnalyticsEnv = process.env) {
  const domain = env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN?.trim();

  if (!domain) return undefined;

  if (!plausibleBareDomainPattern.test(domain)) {
    throw new Error(
      "NEXT_PUBLIC_PLAUSIBLE_DOMAIN must be a bare domain like trendbattle.app",
    );
  }

  return domain;
}
