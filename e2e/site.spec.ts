import { expect, test } from "@playwright/test";

test.describe("RUNWAY 10 company survival", () => {
  test("redirects root to the preferred language", async ({ browser }) => {
    const context = await browser.newContext({ locale: "ko-KR" });
    const page = await context.newPage();
    await page.goto("/");
    await expect(page).toHaveURL(/\/ko$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "ko");
    await context.close();
  });

  for (const locale of ["en", "ko", "ja"] as const) {
    test(`${locale} renders the localized daily briefing`, async ({ page }) => {
      await page.goto(`/${locale}`);
      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      await expect(
        page.getByText("RUNWAY 10", { exact: true }).first(),
      ).toBeVisible();
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        "href",
        `https://web-toolkit.app/${locale}`,
      );
      await expect(page.locator(".company-rules li")).toHaveCount(3);
    });
  }

  test("applies a decision, updates company metrics, and resumes after reload", async ({
    page,
  }) => {
    await page.goto("/en");
    await page.getByRole("button", { name: "Clock in as CEO" }).click();
    const metricsBefore = await page
      .locator(".company-metrics > div strong")
      .allTextContents();
    await page.locator(".company-choices button").first().click();
    await expect(
      page.getByText("DECISION OUTCOME", { exact: false }),
    ).toBeVisible();
    await expect(page.locator(".company-effects span")).not.toHaveCount(0);
    const metricsAfter = await page
      .locator(".company-metrics > div strong")
      .allTextContents();
    expect(metricsAfter).not.toEqual(metricsBefore);
    await page.reload();
    await expect(page.locator(".company-decision-card")).toBeVisible();
    expect(
      await page.locator(".company-metrics > div strong").allTextContents(),
    ).toEqual(metricsAfter);
  });

  test("keeps decision controls usable on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/ko");
    await page.getByRole("button", { name: "대표이사로 출근하기" }).click();
    await expect(page.locator(".company-choices button")).toHaveCount(2);
    await expect(page.locator(".company-metrics > div")).toHaveCount(4);
  });

  test("redirects old product routes to the game", async ({ page }) => {
    await page.goto("/en/tools/json-formatter");
    await expect(page).toHaveURL(/\/en$/);
    await page.goto("/en/play/animals");
    await expect(page).toHaveURL(/\/en$/);
  });
});
