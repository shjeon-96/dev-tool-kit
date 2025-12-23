import { test, expect } from "@playwright/test";

test.describe("Base64 Converter", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/en/tools/base64-converter");
  });

  test("should display the page title", async ({ page }) => {
    await expect(page).toHaveTitle(/Base64/i);
  });

  test("should encode text to base64", async ({ page }) => {
    // Find input textarea
    const input = page.locator("textarea").first();

    // Enter text to encode
    await input.fill("Hello, World!");

    // Wait for processing
    await page.waitForTimeout(500);

    // Click encode button if needed, or check auto-encode
    const encodeButton = page.getByRole("button", { name: /encode/i });
    if (await encodeButton.isVisible()) {
      await encodeButton.click();
    }

    await page.waitForTimeout(500);

    // Check output contains base64 encoded result
    const output = page.locator("textarea").last();
    const outputValue = await output.inputValue();

    // "Hello, World!" in base64 is "SGVsbG8sIFdvcmxkIQ=="
    expect(outputValue).toContain("SGVsbG8sIFdvcmxkIQ==");
  });

  test("should decode base64 to text", async ({ page }) => {
    // Click decode tab/mode
    const decodeTab = page.getByRole("button", { name: /decode/i });
    if (await decodeTab.isVisible()) {
      await decodeTab.click();
    }

    await page.waitForTimeout(300);

    // Find input and enter base64
    const input = page.locator("textarea").first();
    await input.fill("SGVsbG8sIFdvcmxkIQ==");

    await page.waitForTimeout(500);

    // Check output
    const output = page.locator("textarea").last();
    const outputValue = await output.inputValue();

    expect(outputValue).toContain("Hello, World!");
  });

  test("should copy result to clipboard", async ({ page, context }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);

    const input = page.locator("textarea").first();
    await input.fill("Test");

    await page.waitForTimeout(500);

    // Click copy button
    const copyButton = page.getByRole("button", { name: /copy/i });
    await copyButton.click();

    // Verify copy success
    await expect(page.locator("text=Copied")).toBeVisible({ timeout: 3000 });
  });
});
