import { describe, expect, it } from "vitest";
import { getRecommendedCategoryConfigs } from "./categories";

describe("category recommendations", () => {
  it("recommends other categories after a category game over", () => {
    const recommendations = getRecommendedCategoryConfigs(
      "country_population",
      "en",
    );

    expect(recommendations).toHaveLength(3);
    expect(
      recommendations.every(
        (config) => config.category !== "country_population",
      ),
    ).toBe(true);
    expect(recommendations.map((config) => config.slug)).toEqual([
      "cities",
      "movies",
      "animals",
    ]);
  });

  it("uses localized category labels for Korean recommendations", () => {
    const recommendations = getRecommendedCategoryConfigs("random", "ko");

    expect(recommendations.map((config) => config.shortLabel)).toEqual([
      "국가",
      "도시",
      "영화",
    ]);
  });
});
