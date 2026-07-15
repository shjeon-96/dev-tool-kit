type GameEvent =
  | "choice_made"
  | "game_completed"
  | "game_d1_return"
  | "game_started"
  | "result_shared";

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

const FIRST_VISIT_KEY = "runway-10:first-visit:v1";
const D1_TRACKED_KEY = "runway-10:d1-tracked:v1";

export function trackD1Return(
  storage: Pick<Storage, "getItem" | "setItem">,
  date: string,
  industry: string,
) {
  const firstVisit = storage.getItem(FIRST_VISIT_KEY);
  if (!firstVisit) {
    storage.setItem(FIRST_VISIT_KEY, date);
    return;
  }
  if (storage.getItem(D1_TRACKED_KEY)) return;
  const difference = Math.round(
    (Date.parse(`${date}T00:00:00.000Z`) -
      Date.parse(`${firstVisit}T00:00:00.000Z`)) /
      86_400_000,
  );
  if (difference === 1) {
    trackGameEvent("game_d1_return", { industry });
    storage.setItem(D1_TRACKED_KEY, date);
  }
}
