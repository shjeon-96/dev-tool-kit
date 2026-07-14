import { expect, test } from "@playwright/test";

test.describe("multilingual Web Toolkit", () => {
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
    test(`${locale} home exposes localized navigation and all tools`, async ({
      page,
    }) => {
      await page.goto(`/${locale}`);
      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      await expect(page.getByRole("main")).toBeVisible();
      await expect(page.locator(".tool-card")).toHaveCount(6);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        "href",
        `https://web-toolkit.app/${locale}`,
      );
    });
  }

  test("formats JSON locally", async ({ page }) => {
    await page.goto("/en/tools/json-formatter");
    await page
      .getByRole("textbox", { name: "JSON input" })
      .fill('{"ready":true}');
    await page.getByRole("button", { name: "Format JSON" }).click();
    await expect(
      page.getByRole("textbox", { name: /Processed JSON/ }),
    ).toHaveValue('{\n  "ready": true\n}');
  });

  test("keeps the same tool when switching language", async ({ page }) => {
    await page.goto("/en/tools/base64-converter");
    await page.getByRole("link", { name: "한국어" }).click();
    await expect(page).toHaveURL(/\/ko\/tools\/base64-converter$/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Base64",
    );
  });

  test("keeps primary navigation available on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/ko");
    await expect(
      page.getByRole("navigation", { name: "Primary navigation" }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "도구", exact: true }),
    ).toBeVisible();
  });
});
