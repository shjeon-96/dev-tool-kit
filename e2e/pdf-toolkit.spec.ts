import { test, expect } from "@playwright/test";

test.describe("PDF Toolkit", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/en/tools/pdf-toolkit");
  });

  test("should display the page title", async ({ page }) => {
    await expect(page).toHaveTitle(/PDF Toolkit/i);
  });

  test("should show all tabs", async ({ page }) => {
    // Check all tabs are visible
    const mergeTab = page.getByRole("tab", { name: /merge/i });
    const splitTab = page.getByRole("tab", { name: /split/i });
    const compressTab = page.getByRole("tab", { name: /compress/i });
    const redactTab = page.getByRole("tab", { name: /redact/i });

    await expect(mergeTab).toBeVisible();
    await expect(splitTab).toBeVisible();
    await expect(compressTab).toBeVisible();
    await expect(redactTab).toBeVisible();
  });

  test("should switch between tabs", async ({ page }) => {
    // Click Split tab
    const splitTab = page.getByRole("tab", { name: /split/i });
    await splitTab.click();

    // Verify Split tab content is shown
    await expect(page.getByText(/range|pages/i).first()).toBeVisible();

    // Click Compress tab
    const compressTab = page.getByRole("tab", { name: /compress/i });
    await compressTab.click();

    // Verify Compress tab content is shown
    await expect(page.getByText(/metadata|compress/i).first()).toBeVisible();

    // Click Redact tab
    const redactTab = page.getByRole("tab", { name: /redact/i });
    await redactTab.click();

    // Verify Redact tab content is shown
    await expect(page.getByText(/credit card|pattern/i).first()).toBeVisible();
  });

  test("Redact tab should show pattern selection", async ({ page }) => {
    // Go to Redact tab
    const redactTab = page.getByRole("tab", { name: /redact/i });
    await redactTab.click();

    await page.waitForTimeout(300);

    // Check pattern options are visible
    const creditCardPattern = page.getByText(/credit card/i);
    const ssnPattern = page.getByText(/ssn|id number/i);
    const phonePattern = page.getByText(/phone/i);
    const emailPattern = page.getByText(/email/i);

    await expect(creditCardPattern.first()).toBeVisible();
    await expect(ssnPattern.first()).toBeVisible();
    await expect(phonePattern.first()).toBeVisible();
    await expect(emailPattern.first()).toBeVisible();
  });

  test("Redact tab should show color selection", async ({ page }) => {
    // Go to Redact tab
    const redactTab = page.getByRole("tab", { name: /redact/i });
    await redactTab.click();

    await page.waitForTimeout(300);

    // Check color options
    const blackColor = page.getByText(/black/i);
    const grayColor = page.getByText(/gray/i);
    const whiteColor = page.getByText(/white/i);

    await expect(blackColor.first()).toBeVisible();
    await expect(grayColor.first()).toBeVisible();
    await expect(whiteColor.first()).toBeVisible();
  });

  test("Redact tab should allow custom keyword input", async ({ page }) => {
    // Go to Redact tab
    const redactTab = page.getByRole("tab", { name: /redact/i });
    await redactTab.click();

    await page.waitForTimeout(300);

    // Find keyword input
    const keywordInput = page.locator(
      'input[placeholder*="keyword"], input[type="text"]',
    );

    if (await keywordInput.first().isVisible()) {
      // Enter a keyword
      await keywordInput.first().fill("confidential");

      // Click add button
      const addButton = page.locator('button:has(svg[class*="plus"])');
      if (await addButton.isVisible()) {
        await addButton.click();

        // Check keyword is added
        await expect(page.getByText("confidential")).toBeVisible();
      }
    }
  });

  test("should show upload prompt when no file is selected", async ({
    page,
  }) => {
    // Check for upload prompt in merge tab
    const uploadPrompt = page.locator('[class*="dropzone"], [class*="dashed"]');
    await expect(uploadPrompt.first()).toBeVisible();
  });
});
