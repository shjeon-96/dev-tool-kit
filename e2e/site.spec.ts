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
      await expect(page.getByTestId("bori-product-card")).toHaveCount(3);
      await expect(page.locator(".product-app-icon")).toHaveCount(6);
      await expect(
        page.getByTestId("bori-product-card").locator(".product-app-icon"),
      ).toHaveCount(3);
      await expect(
        page.getByTestId("bori-product-card").locator(".brand-companion-image"),
      ).toHaveCount(0);
      await expect(
        page.getByRole("heading", { name: "Weight History" }),
      ).toBeVisible();
      await expect(
        page.getByRole("heading", { name: "Sol Scheduler" }),
      ).toBeVisible();
      await expect(
        page.getByRole("heading", { name: "One Second Run" }),
      ).toBeVisible();
      await expect(page.getByRole("button", { name: "App Store" })).toHaveCount(
        1,
      );
      await expect(
        page.getByRole("button", { name: "Google Play" }),
      ).toHaveCount(1);
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

  test("keeps the site shell and product shelf in sync with the theme", async ({
    page,
  }) => {
    await page.goto("/ko");

    const themeRoot = page.locator(".pixellogic-theme");
    const themeToggle = page.getByRole("button", { name: "테마 전환" });
    const readTheme = () =>
      themeRoot.evaluate((root) => {
        const getPaper = (element: Element | null) =>
          element ? getComputedStyle(element).getPropertyValue("--paper") : "";
        const getBackground = (element: Element | null) =>
          element ? getComputedStyle(element).backgroundColor : "";

        return {
          mode: root.getAttribute("data-pl-theme"),
          pagePaper: getPaper(root),
          headerPaper: getPaper(document.querySelector(".site-header")),
          footerPaper: getPaper(document.querySelector(".site-footer")),
          productCardBackground: getBackground(
            document.querySelector(".bori-product-card"),
          ),
        };
      });

    const initial = await readTheme();
    await themeToggle.click();
    await expect(themeRoot).not.toHaveAttribute("data-pl-theme", initial.mode);

    const next = await readTheme();
    expect(next.headerPaper).toBe(next.pagePaper);
    expect(next.footerPaper).toBe(next.pagePaper);
    expect(next.productCardBackground).not.toBe(initial.productCardBackground);
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
