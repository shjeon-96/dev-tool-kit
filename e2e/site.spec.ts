import { expect, test } from "@playwright/test";

test.describe("PixelLogic public website", () => {
  test("redirects the root to the preferred supported language", async ({
    browser,
  }) => {
    const koContext = await browser.newContext({ locale: "ko-KR" });
    const koPage = await koContext.newPage();
    await koPage.goto("/");
    await expect(koPage).toHaveURL(/\/ko$/);
    await expect(koPage.locator("html")).toHaveAttribute("lang", "ko");
    await koContext.close();

    const enContext = await browser.newContext({ locale: "en-US" });
    const enPage = await enContext.newPage();
    await enPage.goto("/");
    await expect(enPage).toHaveURL(/\/en$/);
    await enContext.close();
  });

  for (const [locale, heading] of [
    ["ko", "작은 호기심을, 오래 쓰는 경험으로."],
    ["en", "Small curiosities, built to last."],
  ] as const) {
    test(`${locale} renders the studio and four real products`, async ({
      page,
    }) => {
      await page.goto(`/${locale}`);
      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      await expect(page.getByRole("heading", { name: heading })).toBeVisible();
      await expect(page.locator(".product-window")).toHaveCount(4);
      await expect(page.locator(".product-row")).toHaveCount(4);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        "href",
        `https://web-toolkit.app/${locale}`,
      );
    });
  }

  test("publishes privacy, terms, and deletion documents without sign-in", async ({
    page,
  }) => {
    await page.goto("/ko/privacy");
    await expect(
      page.getByRole("heading", { name: "개인정보처리방침" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Google 사용자 데이터" }),
    ).toBeVisible();
    await expect(
      page.getByText(/Gmail, Google Drive, Google Calendar/),
    ).toBeVisible();

    await page.goto("/ko/terms");
    await expect(
      page.getByRole("heading", { name: "서비스 이용약관" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "유료 서비스" }),
    ).toBeVisible();

    await page.goto("/ko/account-deletion");
    await expect(
      page.getByRole("heading", { name: "계정 및 데이터 삭제", exact: true }),
    ).toBeVisible();
    await expect(page.locator(".deletion-steps li")).toHaveCount(4);
    await expect(
      page.getByText(
        "마지막 활성 앱이면 전체 픽셀로직 계정 삭제로 안내합니다.",
      ),
    ).toBeVisible();
  });

  test("persists an explicit color theme", async ({ page }) => {
    await page.goto("/ko");
    const initial = await page.locator("html").getAttribute("data-theme");
    await page.getByRole("button", { name: "색상 테마 바꾸기" }).click();
    const next = initial === "dark" ? "light" : "dark";
    await expect(page.locator("html")).toHaveAttribute("data-theme", next);
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("data-theme", next);
  });

  test("keeps the homepage usable on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/ko");
    await expect(
      page.getByRole("heading", { name: "작은 호기심을, 오래 쓰는 경험으로." }),
    ).toBeVisible();
    await expect(page.locator(".product-window")).toHaveCount(4);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(390);
    await page.getByRole("link", { name: "데이터 이용" }).last().click();
    await expect(page.locator("#data-use")).toBeInViewport();
  });

  test("removes the former game routes and APIs", async ({ request }) => {
    expect((await request.get("/ko/play")).status()).toBe(404);
    expect((await request.get("/ko/tools")).status()).toBe(404);
    expect((await request.get("/api/company-survival/results")).status()).toBe(
      404,
    );
  });
});
