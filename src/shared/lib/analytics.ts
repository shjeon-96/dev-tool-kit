import type { CompanyActivityPayload } from "@/shared/types/company-survival";

type GameEvent =
  | "ad_loaded"
  | "ad_requested"
  | "card_downloaded"
  | "choice_made"
  | "game_completed"
  | "game_started"
  | "profile_selected"
  | "referral_landed"
  | "session_started"
  | "share_opened"
  | "share_sheet_completed";

declare global {
  interface Window {
    clarity?: (command: "event" | "set", name: string, value?: string) => void;
  }
}

export function trackGameEvent(
  name: GameEvent,
  properties?: Record<string, string | number | boolean>,
) {
  if (!window.clarity) return;
  for (const [key, value] of Object.entries(properties ?? {})) {
    window.clarity("set", key, String(value));
  }
  window.clarity("event", name);
}

export async function recordCompanyActivity(activity: CompanyActivityPayload) {
  const response = await fetch("/api/company-survival/activity", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(activity),
    keepalive: true,
  });
  if (!response.ok) {
    throw new Error(`Activity endpoint returned ${response.status}`);
  }
}
