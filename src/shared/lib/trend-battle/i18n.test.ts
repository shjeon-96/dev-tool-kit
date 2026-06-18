import { describe, expect, it } from "vitest";
import { getLocalePrefix, getLocalizedPath, messages } from "./i18n";

describe("trend battle i18n", () => {
  it("keeps English routes at the root", () => {
    expect(getLocalePrefix("en")).toBe("");
    expect(getLocalizedPath("countries", "en")).toBe("/countries");
  });

  it("prefixes Korean routes with /ko", () => {
    expect(getLocalePrefix("ko")).toBe("/ko");
    expect(getLocalizedPath("countries", "ko")).toBe("/ko/countries");
  });

  it("provides Korean game copy", () => {
    expect(messages.ko.heroTitle).toBe("어느 쪽이 더 클까요?");
  });
});
