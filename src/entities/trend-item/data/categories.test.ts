import { describe, expect, it } from "vitest";
import { categoryDefinitions, getCategoryConfig } from "./categories";

describe("trend category definitions", () => {
  it("keeps one definition for every playable category", () => {
    expect(categoryDefinitions).toHaveLength(5);
    expect(new Set(categoryDefinitions.map(({ slug }) => slug)).size).toBe(5);
  });

  it("returns locale-specific labels from the canonical definition", () => {
    expect(getCategoryConfig("countries", "en")?.shortLabel).toBe("Countries");
    expect(getCategoryConfig("countries", "ko")?.shortLabel).toBe("국가");
    expect(getCategoryConfig("countries", "ja")?.shortLabel).toBe("国");
  });

  it("rejects unknown category slugs", () => {
    expect(getCategoryConfig("unknown", "en")).toBeUndefined();
  });
});
