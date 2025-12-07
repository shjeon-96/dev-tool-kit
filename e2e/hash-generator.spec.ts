import { test, expect } from "@playwright/test";

test.describe("Hash Generator", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/en/tools/hash-generator");
  });

  test("should display the page title", async ({ page }) => {
    await expect(page).toHaveTitle(/Hash Generator/i);
  });

  test("should generate hashes for text input", async ({ page }) => {
    // Find the textarea input
    const input = page.locator("textarea");

    // Enter text to hash
    await input.fill("hello world");

    // Wait for hash generation (debounced)
    await page.waitForTimeout(600);

    // Check that MD5 hash is displayed (known hash for "hello world")
    await expect(
      page.locator("text=5eb63bbbe01eeed093cb22bb8f5acdc3"),
    ).toBeVisible();
  });

  test("should display all hash algorithms", async ({ page }) => {
    const input = page.locator("textarea");
    await input.fill("test");
    await page.waitForTimeout(600);

    // Check all algorithm labels are visible
    await expect(page.locator("text=MD5", { exact: false })).toBeVisible();
    await expect(page.locator("text=SHA1", { exact: false })).toBeVisible();
    await expect(page.locator("text=SHA256", { exact: false })).toBeVisible();
    await expect(page.locator("text=SHA512", { exact: false })).toBeVisible();
  });

  test("should copy hash to clipboard", async ({ page, context }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);

    const input = page.locator("textarea");
    await input.fill("test");
    await page.waitForTimeout(600);

    // Click first copy button
    const copyButtons = page
      .getByRole("button")
      .filter({
        has: page.locator('svg[class*="copy" i], svg[class*="Copy" i]'),
      });
    await copyButtons.first().click();

    // Should show copied indicator
    await expect(
      page.locator('svg[class*="check" i], svg[class*="Check" i]').first(),
    ).toBeVisible({ timeout: 2000 });
  });

  test("should compare hashes correctly", async ({ page }) => {
    const input = page.locator("textarea");
    await input.fill("hello world");
    await page.waitForTimeout(600);

    // Find comparison input and enter matching hash
    const compareInput = page.locator('input[type="text"]');
    await compareInput.fill("5eb63bbbe01eeed093cb22bb8f5acdc3");

    // Should show match indicator
    await expect(page.locator("text=일치")).toBeVisible();
  });

  test("should show mismatch for wrong hash", async ({ page }) => {
    const input = page.locator("textarea");
    await input.fill("hello world");
    await page.waitForTimeout(600);

    const compareInput = page.locator('input[type="text"]');
    await compareInput.fill("wronghash123");

    // Should show mismatch indicator
    await expect(page.locator("text=일치하지")).toBeVisible();
  });
});
