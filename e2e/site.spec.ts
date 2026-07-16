import { expect, test } from "@playwright/test";
import { getRunLength } from "@/shared/lib/company-survival/game";

const tenTurnPlayerId = Array.from(
  { length: 100 },
  (_, index) => `00000000-0000-4000-8000-${String(index).padStart(12, "0")}`,
).find((playerId) => getRunLength(playerId) === 10)!;

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

  test("changes the daily game state with the selected industry profile", async ({
    page,
  }) => {
    await page.goto("/en");
    const gameStudio = page.getByRole("button", { name: /Game Studio/ });
    await gameStudio.click();
    await expect(gameStudio).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator(".company-seed strong")).toContainText("GAME");
    await page.getByRole("button", { name: "Clock in as CEO" }).click();
    await expect(page.locator(".company-metrics > div strong")).toHaveText([
      "56",
      "70",
      "58",
      "45",
    ]);
  });

  test("keeps decision controls usable on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/ko");
    await expect(page.locator(".company-profile-picker button")).toHaveCount(6);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(390);
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

  test("restores career statistics and downloads a PNG result card", async ({
    page,
  }) => {
    const activities: Record<string, unknown>[] = [];
    await page.route("**/api/company-survival/activity", async (route) => {
      activities.push(route.request().postDataJSON());
      await route.fulfill({ status: 204 });
    });
    await page.route("**/api/company-survival/results", async (route) => {
      await route.fulfill({
        contentType: "application/json",
        body: JSON.stringify({ score: 543, percentile: 88, total: 2407 }),
      });
    });
    await page.addInitScript(() => {
      Object.defineProperty(navigator, "share", {
        configurable: true,
        value: async (data: ShareData) => {
          (window as unknown as { runway10Shared?: ShareData }).runway10Shared =
            data;
        },
      });
    });
    await page.goto("/en");
    await page.evaluate((playerId) => {
      const date = new Date().toISOString().slice(0, 10);
      const metrics = { cash: 72, morale: 66, trust: 81, momentum: 74 };
      const history = Array.from({ length: 10 }, (_, index) => ({
        scenarioId: `scenario-${index}`,
        choiceId: "choice",
      }));
      const run = {
        version: 3,
        rulesetId: "run-length-v1",
        targetTurns: 10,
        date,
        industry: "saas",
        turn: 10,
        metrics,
        status: "survived",
        history,
      };
      const result = {
        date,
        industry: "saas",
        status: "survived",
        score: 543,
        metrics,
        decisions: 10,
      };
      localStorage.setItem(
        `runway-10:company:v3:${date}:saas`,
        JSON.stringify(run),
      );
      localStorage.setItem("runway-10:player:v1", playerId);
      localStorage.setItem("runway-10:profile:v1", "saas");
      localStorage.setItem(
        "runway-10:archive:v2",
        JSON.stringify({
          version: 2,
          results: { [`${date}:saas`]: result },
        }),
      );
    }, tenTurnPlayerId);
    await page.reload();

    await expect(
      page.getByRole("region", { name: "CEO CAREER RECORD" }),
    ).toContainText("100%");
    await expect(
      page.getByRole("region", { name: "GLOBAL INDUSTRY RANK" }),
    ).toContainText("TOP 13%");
    await expect(page.locator(".company-game-over-ad")).toBeAttached();
    const downloadPromise = page.waitForEvent("download");
    await page.getByRole("button", { name: "Save result card" }).click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(/^runway-10-\d+\.png$/);
    await page.getByRole("button", { name: "Share survival report" }).click();
    await expect
      .poll(() =>
        activities.some(
          (activity) => activity.event === "share_sheet_completed",
        ),
      )
      .toBe(true);
    const sharedUrl = await page.evaluate(
      () =>
        (window as unknown as { runway10Shared?: ShareData }).runway10Shared
          ?.url,
    );
    expect(sharedUrl).toContain("?ref=");
    expect(sharedUrl).toContain("utm_source=share");
  });
});
