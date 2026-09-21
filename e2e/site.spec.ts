import { expect, test } from "@playwright/test";

test.describe("multilingual PixelLogic homepage", () => {
  test("redirects the root using the preferred supported language", async ({
    browser,
  }) => {
    const context = await browser.newContext({ locale: "ko-KR" });
    const page = await context.newPage();
    await page.goto("/");
    await expect(page).toHaveURL(/\/ko$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "ko");
    await context.close();
  });

  for (const locale of ["en", "ko", "ja"] as const) {
    test(`${locale} homepage exposes the product shelf`, async ({ page }) => {
      await page.goto(`/${locale}`);
      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      await expect(page.getByRole("main")).toBeVisible();
      await expect(page.locator(".product-card-shell")).toHaveCount(4);
      await expect(
        page.getByRole("heading", { name: "Weight History" }),
      ).toBeVisible();
      await expect(
        page.getByRole("heading", { name: "Sol Scheduler" }),
      ).toBeVisible();
      await expect(
        page.getByRole("heading", { name: "One Second Run" }),
      ).toBeVisible();
      await expect(
        page.getByRole("heading", { name: "PixelLogic Blocks" }),
      ).toBeVisible();
      await expect(page.getByRole("button", { name: "App Store" })).toHaveCount(
        2,
      );
      await expect(
        page.getByRole("button", { name: "Google Play" }),
      ).toHaveCount(2);
      await expect(
        page.getByRole("button", { name: /Open app|앱 열기|アプリを開く/ }),
      ).toHaveCount(1);
      await expect(
        page.getByRole("button", {
          name: /Public page|공개 안내|公開ページ/,
        }),
      ).toHaveCount(1);
      await expect(
        page.getByRole("link", { name: /Products|제품|プロダクト/ }).first(),
      ).toBeVisible();
      await expect(page.locator('a[href*="/tools"]')).toHaveCount(0);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        "href",
        `https://web-toolkit.app/${locale}`,
      );
    });
  }

  test("keeps the PixelLogic studio pages reachable", async ({ page }) => {
    await page.goto("/en/about");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "studio",
    );
    await page.getByRole("link", { name: "Play" }).click();
    await expect(page).toHaveURL(/\/en\/play$/);
  });

  test("keeps the primary navigation available on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/ko");
    await expect(
      page.getByRole("navigation", { name: "Primary navigation" }),
    ).toBeVisible();
    await expect(
      page
        .getByRole("navigation", { name: "Primary navigation" })
        .getByRole("link", { name: "제품", exact: true }),
    ).toBeVisible();
  });
});
