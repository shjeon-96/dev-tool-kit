import { describe, expect, it } from "vitest";
import { categoryDefinitions } from "./categories";
import { getItemsByCategory, trendItems } from "./items";

describe("trend item data quality", () => {
  it("has playable data for every MVP category", () => {
    for (const config of categoryDefinitions) {
      expect(getItemsByCategory(config.category).length).toBeGreaterThanOrEqual(
        25,
      );
    }
  });

  it("meets the PRD 100-item floor for country population", () => {
    expect(
      getItemsByCategory("country_population").length,
    ).toBeGreaterThanOrEqual(100);
  });

  it("meets the PRD 100-item floor for city population", () => {
    expect(getItemsByCategory("city_population").length).toBeGreaterThanOrEqual(
      100,
    );
  });

  it("meets the PRD 100-item floor for movie box office", () => {
    expect(
      getItemsByCategory("movie_box_office").length,
    ).toBeGreaterThanOrEqual(100);
  });

  it("meets the PRD 100-item floor for animal speed", () => {
    expect(getItemsByCategory("animal_speed").length).toBeGreaterThanOrEqual(
      100,
    );
  });

  it("meets the PRD 100-item floor for mountain height", () => {
    expect(getItemsByCategory("mountain_height").length).toBeGreaterThanOrEqual(
      100,
    );
  });

  it("uses unique item ids across the static dataset", () => {
    const ids = trendItems.map((item) => item.id);
    const uniqueIds = new Set(ids);

    expect(uniqueIds.size).toBe(ids.length);
  });

  it("keeps every item sourced, dated, and numerically comparable", () => {
    for (const item of trendItems) {
      expect(item.id).toMatch(/^[a-z0-9-]+$/);
      expect(item.name.length).toBeGreaterThan(1);
      expect(item.value).toBeGreaterThan(0);
      expect(item.displayValue.length).toBeGreaterThan(0);
      expect(item.sourceName.length).toBeGreaterThan(0);
      expect(item.sourceUrl).toMatch(/^https:\/\//);
      expect(item.updatedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });
});
