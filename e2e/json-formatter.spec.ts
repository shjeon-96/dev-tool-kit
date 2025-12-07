import { test, expect } from "@playwright/test";

test.describe("JSON Formatter", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/en/tools/json-formatter");
  });

  test("should display the page title", async ({ page }) => {
    await expect(page).toHaveTitle(/JSON Formatter/i);
  });

  test("should format valid JSON", async ({ page }) => {
    // Find the textarea input
    const input = page.locator("textarea").first();

    // Enter valid JSON
    await input.fill('{"name":"test","value":123}');

    // Wait for auto-formatting (debounced)
    await page.waitForTimeout(600);

    // Check that output is formatted
    const output = page.locator("textarea").last();
    const outputValue = await output.inputValue();

    expect(outputValue).toContain('"name"');
    expect(outputValue).toContain('"test"');
  });

  test("should show error for invalid JSON", async ({ page }) => {
    const input = page.locator("textarea").first();

    // Enter invalid JSON
    await input.fill("{invalid json}");

    await page.waitForTimeout(600);

    // Check for error indication (red border or error message)
    const errorIndicator = page.locator(
      '[class*="text-destructive"], [class*="border-destructive"]',
    );
    await expect(errorIndicator.first()).toBeVisible();
  });

  test("should copy formatted JSON to clipboard", async ({ page, context }) => {
    // Grant clipboard permissions
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);

    const input = page.locator("textarea").first();
    await input.fill('{"test":true}');
    await page.waitForTimeout(600);

    // Click copy button
    const copyButton = page.getByRole("button", { name: /copy/i });
    await copyButton.click();

    // Verify copy success (button text changes or toast appears)
    await expect(page.locator("text=Copied")).toBeVisible({ timeout: 3000 });
  });

  test("should minify JSON when minify button is clicked", async ({ page }) => {
    const input = page.locator("textarea").first();
    await input.fill('{\n  "name": "test"\n}');
    await page.waitForTimeout(600);

    // Click minify button
    const minifyButton = page.getByRole("button", { name: /minify|compress/i });
    await minifyButton.click();

    await page.waitForTimeout(300);

    // Check output is minified
    const output = page.locator("textarea").last();
    const outputValue = await output.inputValue();
    expect(outputValue).not.toContain("\n");
  });
});
