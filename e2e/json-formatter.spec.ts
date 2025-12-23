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

    // Click the Beautify button to format
    const beautifyButton = page.getByRole("button", { name: /beautify/i });
    await beautifyButton.click();

    // Wait for formatting
    await page.waitForTimeout(500);

    // Check that output textarea has formatted content
    const output = page.getByRole("textbox", { name: "Output" });
    await expect(output).toContainText('"name"');
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

  test("should have action buttons available", async ({ page }) => {
    const input = page.locator("textarea").first();
    await input.fill('{"test":true}');

    // Click beautify first to generate output
    const beautifyButton = page.getByRole("button", { name: /beautify/i });
    await beautifyButton.click();
    await page.waitForTimeout(300);

    // Verify that action buttons are available (format buttons, etc)
    const actionButtons = page.locator("button");
    const buttonCount = await actionButtons.count();

    // Should have multiple action buttons
    expect(buttonCount).toBeGreaterThan(2);
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
