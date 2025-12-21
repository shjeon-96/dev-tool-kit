import { test, expect } from "@playwright/test";

test.describe("Headline Analyzer", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/en/tools/headline-analyzer");
  });

  test("should display the page title", async ({ page }) => {
    await expect(page).toHaveTitle(/Headline Analyzer/i);
  });

  test("should analyze headline in real-time", async ({ page }) => {
    const textarea = page.locator("textarea");

    // Enter a headline
    await textarea.fill("10 Amazing Ways to Boost Your Productivity Today");

    // Wait for analysis to update
    await page.waitForTimeout(300);

    // Check score is displayed (should be > 0)
    const scoreElement = page.locator("text=/^\\d{1,3}$/").first();
    await expect(scoreElement).toBeVisible();

    // Check grade is displayed (A+, A, B+, B, C+, C, D, F)
    await expect(
      page.locator("text=/^(A\\+|A|B\\+|B|C\\+|C|D|F)$/"),
    ).toBeVisible();
  });

  test("should show headline type badge", async ({ page }) => {
    const textarea = page.locator("textarea");

    // Enter a listicle headline
    await textarea.fill("10 Tips for Better Sleep");
    await page.waitForTimeout(300);

    // Should detect as Listicle
    await expect(page.getByText("Listicle", { exact: true })).toBeVisible();
  });

  test("should display word balance bars", async ({ page }) => {
    const textarea = page.locator("textarea");
    await textarea.fill("Amazing free tips to improve your skills instantly");
    await page.waitForTimeout(300);

    // Check Word Balance section exists
    await expect(page.getByText("Word Balance", { exact: true })).toBeVisible();

    // Check individual balance categories using exact match
    await expect(page.getByText("Common Words", { exact: true })).toBeVisible();
    await expect(
      page.getByText("Uncommon Words", { exact: true }),
    ).toBeVisible();
    await expect(
      page.getByText("Emotional Words", { exact: true }),
    ).toBeVisible();
    await expect(page.getByText("Power Words", { exact: true })).toBeVisible();
  });

  test("should show sentiment analysis", async ({ page }) => {
    const textarea = page.locator("textarea");

    // Test positive headline
    await textarea.fill("Amazing success story of wonderful achievement");
    await page.waitForTimeout(300);

    // Sentiment section should be visible
    await expect(page.getByText("Sentiment", { exact: true })).toBeVisible();

    // Should show positive sentiment
    await expect(page.getByText("positive", { exact: true })).toBeVisible();
  });

  test("should display SEO factors", async ({ page }) => {
    const textarea = page.locator("textarea");
    await textarea.fill("10 Tips [2024 Guide] for Better Productivity");
    await page.waitForTimeout(300);

    // Check SEO Factors section
    await expect(page.getByText("SEO Factors", { exact: true })).toBeVisible();

    // Check individual SEO factors
    await expect(page.getByText("Has Numbers", { exact: true })).toBeVisible();
    await expect(
      page.getByText("Starts w/ Number", { exact: true }),
    ).toBeVisible();
    await expect(page.getByText("Has Brackets", { exact: true })).toBeVisible();
    await expect(
      page.getByText("Optimal Length", { exact: true }),
    ).toBeVisible();
  });

  test("should generate suggestions for short headlines", async ({ page }) => {
    const textarea = page.locator("textarea");

    // Enter a very short headline
    await textarea.fill("Test");
    await page.waitForTimeout(300);

    // Check suggestions section appears (using exact match on card title)
    await expect(page.getByText("Suggestions", { exact: true })).toBeVisible();

    // Should suggest adding more words
    await expect(page.locator("text=/more words|6-12 words/i")).toBeVisible();
  });

  test("should load example headlines", async ({ page }) => {
    // Find example buttons (they have truncated text with "...")
    const exampleButtons = page.locator("button.text-xs");
    const count = await exampleButtons.count();

    // Click the first example button if available
    if (count > 0) {
      await exampleButtons.first().click();

      // Wait for the headline to be loaded
      await page.waitForTimeout(300);

      // Textarea should now have content
      const textarea = page.locator("textarea");
      const value = await textarea.inputValue();
      expect(value.length).toBeGreaterThan(0);

      // Score should be visible
      const scoreElement = page.locator("text=/^\\d{1,3}$/").first();
      await expect(scoreElement).toBeVisible();
    }
  });

  test("should clear headline with Clear button", async ({ page }) => {
    const textarea = page.locator("textarea");

    // Enter some text
    await textarea.fill("Test headline content");

    // Click Clear button
    await page.getByRole("button", { name: /clear/i }).click();

    // Textarea should be empty
    await expect(textarea).toHaveValue("");
  });

  test("should detect different headline types", async ({ page }) => {
    const textarea = page.locator("textarea");

    // Test How-To
    await textarea.fill("How to Learn Programming in 30 Days");
    await page.waitForTimeout(300);
    await expect(page.getByText("How-To", { exact: true })).toBeVisible();

    // Test Question
    await textarea.fill("What is the Best Way to Learn JavaScript?");
    await page.waitForTimeout(300);
    await expect(page.getByText("Question", { exact: true })).toBeVisible();

    // Test Guide - avoid "Command" which conflicts with Command Palette
    await textarea.fill("The Complete Guide to React Development");
    await page.waitForTimeout(300);
    await expect(page.getByText("Guide", { exact: true })).toBeVisible();
  });

  test("should show word count and character count", async ({ page }) => {
    const textarea = page.locator("textarea");
    await textarea.fill("One two three four five");
    await page.waitForTimeout(300);

    // Should show word count
    await expect(page.getByText("Word Count", { exact: true })).toBeVisible();

    // The word count value should be displayed in a specific element
    const wordCountCard = page
      .locator("text=Word Count")
      .locator("..")
      .locator("..");
    await expect(wordCountCard).toContainText("5");

    // Should show character count (read time card has characters)
    await expect(page.locator("text=/\\d+ characters/")).toBeVisible();
  });
});
