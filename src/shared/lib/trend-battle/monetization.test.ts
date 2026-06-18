import { describe, expect, it } from "vitest";
import {
  getGoogleAdsenseClient,
  getGoogleSiteVerification,
} from "./monetization";

describe("trend battle monetization config", () => {
  it("reads a valid AdSense client id from the public environment", () => {
    expect(
      getGoogleAdsenseClient({
        NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT: " ca-pub-4981986991458105 ",
      }),
    ).toBe("ca-pub-4981986991458105");
  });

  it("omits AdSense when no client id is configured", () => {
    expect(getGoogleAdsenseClient({})).toBeUndefined();
  });

  it("rejects malformed AdSense client ids", () => {
    expect(() =>
      getGoogleAdsenseClient({
        NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT: "pub-4981986991458105",
      }),
    ).toThrow("NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT must match ca-pub-<digits>");
  });

  it("reads the Google Search Console verification token", () => {
    expect(
      getGoogleSiteVerification({
        NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION: " verification-token ",
      }),
    ).toBe("verification-token");
  });
});
