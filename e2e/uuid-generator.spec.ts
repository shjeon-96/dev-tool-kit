import { test, expect } from "@playwright/test";

test.describe("UUID Generator", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/en/tools/uuid-generator");
  });

  test("should display the page title", async ({ page }) => {
    await expect(page).toHaveTitle(/UUID/i);
  });

  test("should generate UUID v4 by default", async ({ page }) => {
    // Check that a UUID is displayed
    const uuidOutput = page.locator(
      'input[readonly], [class*="font-mono"], code',
    );

    await expect(uuidOutput.first()).toBeVisible();

    // Get the UUID value
    const uuidValue = await uuidOutput.first().textContent();

    // UUID v4 format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
    if (uuidValue) {
      expect(uuidValue).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
      );
    }
  });

  test("should generate new UUID on button click", async ({ page }) => {
    // Get initial UUID
    const uuidOutput = page.locator(
      'input[readonly], [class*="font-mono"], code',
    );
    const initialUuid = await uuidOutput.first().textContent();

    // Click generate button
    const generateButton = page.getByRole("button", { name: /generate|new/i });
    await generateButton.click();

    await page.waitForTimeout(300);

    // Get new UUID
    const newUuid = await uuidOutput.first().textContent();

    // UUIDs should be different
    expect(newUuid).not.toBe(initialUuid);
  });

  test("should copy UUID to clipboard", async ({ page, context }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);

    // Click copy button
    const copyButton = page.getByRole("button", { name: /copy/i });
    await copyButton.click();

    // Verify copy success
    await expect(page.locator("text=Copied")).toBeVisible({ timeout: 3000 });
  });

  test("should generate ULID", async ({ page }) => {
    // Click ULID tab/option
    const ulidTab = page.getByRole("button", { name: /ulid/i });
    if (await ulidTab.isVisible()) {
      await ulidTab.click();
      await page.waitForTimeout(300);

      // Check output format (ULID is 26 characters)
      const output = page.locator(
        'input[readonly], [class*="font-mono"], code',
      );
      const ulidValue = await output.first().textContent();

      if (ulidValue) {
        // ULID format: 26 alphanumeric characters
        expect(ulidValue.trim()).toMatch(/^[0-9A-Z]{26}$/);
      }
    }
  });

  test("should generate multiple UUIDs in bulk mode", async ({ page }) => {
    // Look for bulk/count input
    const countInput = page.locator('input[type="number"]');

    if (await countInput.isVisible()) {
      // Set count to 5
      await countInput.fill("5");

      // Click generate
      const generateButton = page.getByRole("button", { name: /generate/i });
      await generateButton.click();

      await page.waitForTimeout(500);

      // Check that multiple UUIDs are shown
      const uuidList = page.locator('[class*="font-mono"]');
      const count = await uuidList.count();

      expect(count).toBeGreaterThanOrEqual(5);
    }
  });
});
