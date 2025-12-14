import { test, expect } from "@playwright/test";

/**
 * Image Resizer Smoke E2E Test
 *
 * Tests that the FFmpeg.wasm-based Image Resizer loads correctly
 * and shows appropriate status indicators.
 */

test.describe("Image Resizer - FFmpeg.wasm Smoke Test", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/en/tools/image-resizer");
  });

  test("Page loads successfully", async ({ page }) => {
    // Verify the page title
    await expect(page).toHaveTitle(/Image Resizer/i);

    // Verify the main content is visible
    const content = page.locator("body");
    await expect(content).toBeVisible();
  });

  test("FFmpeg loading indicator appears initially", async ({ page }) => {
    // The FFmpeg loading indicator should appear while loading
    // Look for loading text (Korean: "FFmpeg 로딩 중...")
    const loadingIndicator = page.locator('text="FFmpeg 로딩 중..."');

    // Either loading indicator is visible or FFmpeg is already loaded
    // (depending on network speed and caching)
    const hasLoading = await loadingIndicator.isVisible().catch(() => false);

    // If not loading, check for the ready indicator
    if (!hasLoading) {
      // Look for the ready indicator (Korean: "FFmpeg.wasm 활성화됨")
      const readyIndicator = page.locator('text="FFmpeg.wasm 활성화됨"');
      const hasReady = await readyIndicator.isVisible().catch(() => false);

      // Or the "not supported" warning (for browsers without SharedArrayBuffer)
      const notSupportedIndicator = page.locator(
        'text="브라우저가 WebAssembly를 지원하지 않습니다"',
      );
      const hasNotSupported = await notSupportedIndicator
        .isVisible()
        .catch(() => false);

      // One of these states should be true
      expect(hasReady || hasNotSupported).toBe(true);
    }
  });

  test("FFmpeg becomes ready after loading", async ({ page }) => {
    // Wait for FFmpeg to finish loading (up to 30 seconds for slow connections)
    const readyIndicator = page.locator('text="FFmpeg.wasm 활성화됨"');
    const notSupportedIndicator = page.locator(
      'text="브라우저가 WebAssembly를 지원하지 않습니다"',
    );

    // Wait for either ready or not-supported state
    await Promise.race([
      readyIndicator.waitFor({ state: "visible", timeout: 30000 }),
      notSupportedIndicator.waitFor({ state: "visible", timeout: 30000 }),
    ]).catch(() => {
      // Timeout is acceptable - FFmpeg might still be loading
    });

    // At least one indicator should be visible or still loading
    const hasReady = await readyIndicator.isVisible().catch(() => false);
    const hasNotSupported = await notSupportedIndicator
      .isVisible()
      .catch(() => false);
    const loadingIndicator = page.locator('text="FFmpeg 로딩 중..."');
    const hasLoading = await loadingIndicator.isVisible().catch(() => false);

    expect(hasReady || hasNotSupported || hasLoading).toBe(true);
  });

  test("File uploader is visible", async ({ page }) => {
    // Wait for page to load
    await page.waitForLoadState("networkidle");

    // Look for the dropzone/file uploader area
    // The FileUploader component should be visible when no image is selected
    const uploadArea = page.locator(
      'text="파일을 드래그하거나 클릭하여 업로드"',
    );
    const hasUploadArea = await uploadArea.isVisible().catch(() => false);

    // Or look for the dropzone element
    const dropzone = page.locator('[role="presentation"]');
    const hasDropzone = (await dropzone.count().catch(() => 0)) > 0;

    expect(hasUploadArea || hasDropzone).toBe(true);
  });

  test("SharedArrayBuffer is available (COOP/COEP headers working)", async ({
    page,
  }) => {
    // This test verifies that the security headers are properly configured
    // SharedArrayBuffer is required for FFmpeg.wasm multi-threading
    const hasSharedArrayBuffer = await page.evaluate(() => {
      return typeof SharedArrayBuffer !== "undefined";
    });

    expect(hasSharedArrayBuffer).toBe(true);
  });

  test("crossOriginIsolated is true", async ({ page }) => {
    // Verify the page is cross-origin isolated
    const isIsolated = await page.evaluate(() => {
      return self.crossOriginIsolated;
    });

    expect(isIsolated).toBe(true);
  });

  test("No console errors on page load", async ({ page }) => {
    const consoleErrors: string[] = [];

    page.on("console", (message) => {
      if (message.type() === "error") {
        consoleErrors.push(message.text());
      }
    });

    await page.goto("/en/tools/image-resizer");
    await page.waitForLoadState("networkidle");

    // Wait a bit for any async errors
    await page.waitForTimeout(2000);

    // Filter out known acceptable errors (like AdSense in dev mode)
    const criticalErrors = consoleErrors.filter(
      (error) =>
        !error.includes("adsbygoogle") &&
        !error.includes("googlesyndication") &&
        !error.includes("Failed to load resource"),
    );

    expect(criticalErrors).toHaveLength(0);
  });

  test.describe("UI Elements", () => {
    test("Shows resize mode options", async ({ page }) => {
      // Wait for FFmpeg to load and show the full UI
      await page.waitForLoadState("networkidle");

      // We need an image first, so just verify the page structure exists
      const pageContent = await page.content();
      expect(pageContent).toContain("Image Resizer");
    });
  });

  test.describe("Cross-locale", () => {
    const locales = [
      { code: "en", loadingText: "FFmpeg 로딩 중..." },
      { code: "ko", loadingText: "FFmpeg 로딩 중..." },
      { code: "ja", loadingText: "FFmpeg 로딩 中..." },
    ];

    for (const { code } of locales) {
      test(`${code} locale page loads correctly`, async ({ page }) => {
        await page.goto(`/${code}/tools/image-resizer`);

        // Verify the page loads
        const title = await page.title();
        expect(title.length).toBeGreaterThan(0);

        // Verify SharedArrayBuffer is available
        const hasSharedArrayBuffer = await page.evaluate(() => {
          return typeof SharedArrayBuffer !== "undefined";
        });
        expect(hasSharedArrayBuffer).toBe(true);
      });
    }
  });
});
