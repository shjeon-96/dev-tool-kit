import { test, expect } from "@playwright/test";
import path from "path";
import fs from "fs";

test.describe("Image Converter", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/en/tools/image-converter");
  });

  test("should display the page title", async ({ page }) => {
    await expect(page).toHaveTitle(/Image Converter/i);
  });

  test("should show format selection options", async ({ page }) => {
    // Check that format buttons are visible
    const jpegButton = page.getByRole("button", { name: /jpeg/i });
    const pngButton = page.getByRole("button", { name: /png/i });
    const webpButton = page.getByRole("button", { name: /webp/i });

    await expect(jpegButton).toBeVisible();
    await expect(pngButton).toBeVisible();
    await expect(webpButton).toBeVisible();
  });

  test("should show quality slider", async ({ page }) => {
    // Check quality slider exists
    const qualitySlider = page.locator('input[type="range"]');
    await expect(qualitySlider).toBeVisible();
  });

  test("should show dropzone area", async ({ page }) => {
    // Check dropzone exists
    const dropzone = page.locator(
      '[class*="dropzone"], [class*="border-dashed"]',
    );
    await expect(dropzone.first()).toBeVisible();
  });

  test("should allow format selection", async ({ page }) => {
    // Click on WebP format
    const webpButton = page.getByRole("button", { name: /webp/i });
    await webpButton.click();

    // Check that WebP is selected (has active/selected state)
    await expect(webpButton).toHaveClass(
      /bg-primary|variant-default|data-\[state=active\]/,
    );
  });

  test("should adjust quality value", async ({ page }) => {
    const qualitySlider = page.locator('input[type="range"]');

    // Get initial value
    const initialValue = await qualitySlider.inputValue();

    // Change slider value
    await qualitySlider.fill("50");

    // Verify value changed
    const newValue = await qualitySlider.inputValue();
    expect(newValue).toBe("50");
  });
});
