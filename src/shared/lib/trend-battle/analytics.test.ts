import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  buildTrendEventPayload,
  getGoogleAnalyticsId,
  getPlausibleDomain,
  trackTrendEvent,
  trendEventNames,
} from "./analytics";

describe("trend battle analytics", () => {
  beforeEach(() => {
    window.dataLayer = [];
    window.gtag = vi.fn();
    window.plausible = vi.fn();
  });

  it("defines every PRD analytics event name", () => {
    expect(trendEventNames).toEqual([
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
    ]);
  });

  it("builds a timestamped event payload without mutating properties", () => {
    const properties = { category: "countries", score: 3 };

    expect(buildTrendEventPayload("answer_correct", properties, 12345)).toEqual(
      {
        event: "answer_correct",
        timestamp: 12345,
        category: "countries",
        score: 3,
      },
    );
    expect(properties).toEqual({ category: "countries", score: 3 });
  });

  it("sends events to dataLayer, gtag, and plausible", () => {
    trackTrendEvent("category_selected", {
      category: "countries",
      locale: "en",
    });

    expect(window.dataLayer).toHaveLength(1);
    expect(window.dataLayer?.[0]).toMatchObject({
      event: "category_selected",
      category: "countries",
      locale: "en",
    });
    expect(window.gtag).toHaveBeenCalledWith(
      "event",
      "category_selected",
      expect.objectContaining({ category: "countries" }),
    );
    expect(window.plausible).toHaveBeenCalledWith("category_selected", {
      props: { category: "countries", locale: "en" },
    });
  });

  it("reads and validates a Google Analytics measurement ID", () => {
    expect(getGoogleAnalyticsId({ NEXT_PUBLIC_GA_ID: " G-ABC123DEF4 " })).toBe(
      "G-ABC123DEF4",
    );
    expect(getGoogleAnalyticsId({})).toBeUndefined();
    expect(() =>
      getGoogleAnalyticsId({ NEXT_PUBLIC_GA_ID: "UA-123456-1" }),
    ).toThrow("NEXT_PUBLIC_GA_ID must match G-<letters-or-digits>");
  });

  it("reads and validates a Plausible bare domain", () => {
    expect(
      getPlausibleDomain({ NEXT_PUBLIC_PLAUSIBLE_DOMAIN: " trendbattle.app " }),
    ).toBe("trendbattle.app");
    expect(getPlausibleDomain({})).toBeUndefined();
    expect(() =>
      getPlausibleDomain({
        NEXT_PUBLIC_PLAUSIBLE_DOMAIN: "https://trendbattle.app",
      }),
    ).toThrow(
      "NEXT_PUBLIC_PLAUSIBLE_DOMAIN must be a bare domain like trendbattle.app",
    );
  });
});
