import { expect, test } from "@playwright/test";

test.describe("RUNWAY 10 office roguelike", () => {
  test("redirects root to the preferred language", async ({ browser }) => {
    const context = await browser.newContext({ locale: "ko-KR" });
    const page = await context.newPage();
    await page.goto("/");
    await expect(page).toHaveURL(/\/ko$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "ko");
    await context.close();
  });

  for (const [locale, heading] of [
    ["en", "Build the company before it breaks."],
    ["ko", "망하기 전에, 회사를 만들어라."],
    ["ja", "壊れる前に、会社を作れ。"],
  ] as const) {
    test(`${locale} renders the localized game lobby`, async ({ page }) => {
      await page.goto(`/${locale}`);
      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      await expect(page.getByRole("heading", { name: heading })).toBeVisible();
      await expect(page.locator(".lobby-office")).toBeVisible();
      await expect(page.locator(".profile-strip button")).toHaveCount(6);
      await expect(page.locator(".trait-strip button")).toHaveCount(3);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        "href",
        `https://web-toolkit.app/${locale}`,
      );
    });
  }

  test("plays a card, animates its department, and resumes after reload", async ({
    page,
  }) => {
    await page.goto("/en");
    await page.getByRole("button", { name: /Start month one/ }).click();
    await expect(page.locator(".office-board")).toBeVisible();
    await expect(page.locator(".action-card")).toHaveCount(3);
    const metricsBefore = await page
      .locator(".hud-metrics strong")
      .allTextContents();
    await page.locator(".action-card").first().click();
    await expect(page.locator(".turn-report")).toBeVisible();
    await expect(page.locator(".office-unit.is-working")).toHaveCount(1);
    expect(
      await page.locator(".hud-metrics strong").allTextContents(),
    ).not.toEqual(metricsBefore);
    await page.reload();
    await expect(page.locator(".turn-report")).toBeVisible();
    await page.getByRole("button", { name: /Next month/ }).click();
    await expect(page.locator(".action-card")).toHaveCount(3);
  });

  test("changes the deterministic deck with the selected industry", async ({
    page,
  }) => {
    await page.goto("/en");
    const gameStudio = page
      .locator(".profile-strip button")
      .filter({ hasText: "GAME" });
    await gameStudio.click();
    await expect(gameStudio).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator(".company-seed strong")).toContainText("GAME");
    await page.getByRole("button", { name: /Start month one/ }).click();
    await expect(page.locator(".action-card")).toHaveCount(3);
  });

  test("requires a valid eight-card starting deck", async ({ page }) => {
    await page.goto("/en");
    await expect(page.locator(".deck-builder button")).toHaveCount(12);
    const selected = page.locator('.deck-builder button[aria-pressed="true"]');
    await expect(selected).toHaveCount(8);
    await selected.first().click();
    await expect(
      page.getByRole("button", { name: /Start month one/ }),
    ).toBeDisabled();
    await page
      .locator('.deck-builder button[aria-pressed="false"]:not(:disabled)')
      .first()
      .click();
    await expect(
      page.getByRole("button", { name: /Start month one/ }),
    ).toBeEnabled();
  });

  test("keeps the board and cards usable on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/ko");
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(390);
    await page.getByRole("button", { name: /첫 달 시작/ }).click();
    await expect(page.locator(".office-board")).toBeVisible();
    await expect(page.locator(".action-card")).toHaveCount(3);
    await expect(page.locator(".hud-metrics > div")).toHaveCount(4);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(390);
  });

  test("redirects old product routes to the game", async ({ page }) => {
    await page.goto("/en/tools/json-formatter");
    await expect(page).toHaveURL(/\/en$/);
    await page.goto("/en/play/animals");
    await expect(page).toHaveURL(/\/en$/);
  });
});
