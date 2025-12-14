import { test, expect } from "@playwright/test";

/**
 * Security Headers E2E Test
 *
 * Tests that COOP/COEP headers are correctly applied to Wasm-isolated pages
 * (image-resizer, hash-generator) while not being applied to other pages.
 *
 * COOP (Cross-Origin-Opener-Policy): "same-origin"
 * COEP (Cross-Origin-Embedder-Policy): "require-corp"
 *
 * These headers enable SharedArrayBuffer which is required for FFmpeg.wasm
 */

const WASM_ISOLATED_TOOLS = ["image-resizer", "hash-generator"];
const NON_ISOLATED_TOOLS = [
  "json-formatter",
  "jwt-decoder",
  "base64-converter",
];

test.describe("Security Headers - COOP/COEP", () => {
  test.describe("Wasm-Isolated Pages", () => {
    for (const tool of WASM_ISOLATED_TOOLS) {
      test(`${tool} page has COOP/COEP headers`, async ({ request }) => {
        const response = await request.get(`/en/tools/${tool}`);

        expect(response.status()).toBe(200);

        // Check COOP header
        const coopHeader = response.headers()["cross-origin-opener-policy"];
        expect(coopHeader).toBe("same-origin");

        // Check COEP header
        const coepHeader = response.headers()["cross-origin-embedder-policy"];
        expect(coepHeader).toBe("require-corp");
      });

      test(`${tool} page can access SharedArrayBuffer`, async ({ page }) => {
        await page.goto(`/en/tools/${tool}`);

        // Check if SharedArrayBuffer is available (enabled by COOP/COEP)
        const hasSharedArrayBuffer = await page.evaluate(() => {
          return typeof SharedArrayBuffer !== "undefined";
        });

        expect(hasSharedArrayBuffer).toBe(true);
      });
    }
  });

  test.describe("Non-Isolated Pages", () => {
    for (const tool of NON_ISOLATED_TOOLS) {
      test(`${tool} page does NOT have COOP/COEP headers`, async ({
        request,
      }) => {
        const response = await request.get(`/en/tools/${tool}`);

        expect(response.status()).toBe(200);

        // COOP header should NOT be present or not be "same-origin"
        const coopHeader = response.headers()["cross-origin-opener-policy"];
        expect(coopHeader).not.toBe("same-origin");

        // COEP header should NOT be present or not be "require-corp"
        const coepHeader = response.headers()["cross-origin-embedder-policy"];
        expect(coepHeader).not.toBe("require-corp");
      });
    }

    test("Home page does NOT have COOP/COEP headers", async ({ request }) => {
      const response = await request.get("/en");

      expect(response.status()).toBe(200);

      const coopHeader = response.headers()["cross-origin-opener-policy"];
      expect(coopHeader).not.toBe("same-origin");

      const coepHeader = response.headers()["cross-origin-embedder-policy"];
      expect(coepHeader).not.toBe("require-corp");
    });

    test("Tools overview page does NOT have COOP/COEP headers", async ({
      request,
    }) => {
      const response = await request.get("/en/tools");

      expect(response.status()).toBe(200);

      const coopHeader = response.headers()["cross-origin-opener-policy"];
      expect(coopHeader).not.toBe("same-origin");

      const coepHeader = response.headers()["cross-origin-embedder-policy"];
      expect(coepHeader).not.toBe("require-corp");
    });
  });

  test.describe("Locale Variants", () => {
    const locales = ["en", "ko", "ja"];

    for (const locale of locales) {
      test(`image-resizer has COOP/COEP headers for ${locale} locale`, async ({
        request,
      }) => {
        const response = await request.get(`/${locale}/tools/image-resizer`);

        expect(response.status()).toBe(200);

        const coopHeader = response.headers()["cross-origin-opener-policy"];
        expect(coopHeader).toBe("same-origin");

        const coepHeader = response.headers()["cross-origin-embedder-policy"];
        expect(coepHeader).toBe("require-corp");
      });
    }
  });
});
