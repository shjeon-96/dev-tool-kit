import { expect, test, type Page } from "@playwright/test";

const hydrationErrorsByPage = new WeakMap<Page, string[]>();

test.describe("Trend Battle MVP", () => {
  test.beforeEach(async ({ page }) => {
    const hydrationErrors: string[] = [];
    hydrationErrorsByPage.set(page, hydrationErrors);

    page.on("pageerror", (error) => {
      if (error.message.includes("Hydration failed")) {
        hydrationErrors.push(error.message);
      }
    });

    page.on("console", (message) => {
      if (
        message.type() === "error" &&
        message.text().includes("Hydration failed")
      ) {
        hydrationErrors.push(message.text());
      }
    });
  });

  test.afterEach(async ({ page }) => {
    expect(hydrationErrorsByPage.get(page) ?? []).toEqual([]);
  });

  test("starts the English random game immediately", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: "Guess which one is bigger." }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "한국어" })).toBeVisible();
    await expect(page.getByText(/Score 0/)).toBeVisible();

    await page
      .getByRole("button", { name: /Tap to choose/ })
      .first()
      .click();

    await expect(page.getByText(/Correct!|Game Over/)).toBeVisible();
    await expect(
      page.getByText(/Close call\.|Most people might guess this wrong\./),
    ).toBeVisible();
    await expect(page.locator("[data-result-state='chosen']")).toHaveCount(1);
    await expect(page.locator("[data-result-state='correct']")).toHaveCount(1);
    await expect(
      page.getByRole("button", { name: "Share result" }),
    ).toBeVisible();
  });

  test("serves the Korean localized game", async ({ page }) => {
    await page.goto("/ko");

    await expect(
      page.getByRole("heading", { name: "어느 쪽이 더 클까요?" }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "English" })).toBeVisible();
    await expect(page.getByText(/점수 0/)).toBeVisible();

    await page
      .getByRole("button", { name: /눌러서 선택/ })
      .first()
      .click();

    await expect(page.getByText(/정답!|게임 오버/)).toBeVisible();
    await expect(
      page.getByText(
        /아슬아슬한 비교였어요\.|많은 사람이 헷갈릴 수 있는 문제예요\./,
      ),
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "결과 공유" })).toBeVisible();
  });

  test("has category and policy pages needed for AdSense readiness", async ({
    page,
  }) => {
    await page.goto("/countries");
    await expect(
      page.getByRole("heading", { name: "Guess which one is bigger." }),
    ).toBeVisible();
    await expect(page.getByText("Countries by population")).toBeVisible();

    await page.goto("/sources");
    await expect(
      page.getByRole("heading", { name: "Data Sources" }),
    ).toBeVisible();

    await page.goto("/ko/privacy");
    await expect(
      page.getByRole("heading", { name: "개인정보 처리방침" }),
    ).toBeVisible();
  });

  test("serves SEO content pages with game-first layout and FAQ", async ({
    page,
  }) => {
    await page.goto("/higher-lower-country-population");

    await expect(
      page.getByRole("heading", { name: "Guess which one is bigger." }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        name: "Country Population Higher or Lower Game",
      }),
    ).toBeVisible();
    await expect(page.getByText("Data standard")).toBeVisible();
    await expect(page.locator("details")).toHaveCount(3);
    await expect.poll(async () => findJsonLd(page, "FAQPage", "en")).toBe(true);

    await page.goto("/ko/animal-speed-quiz");
    await expect(
      page.getByRole("heading", { name: "어느 쪽이 더 클까요?" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        name: "동물 속도 퀴즈: 어느 동물이 더 빠를까?",
      }),
    ).toBeVisible();
    await expect(page.getByText("자주 묻는 질문")).toBeVisible();
    await expect.poll(async () => findJsonLd(page, "FAQPage", "ko")).toBe(true);
  });

  test("serves the daily ten-question challenge in English and Korean", async ({
    page,
  }) => {
    await page.goto("/daily");

    await expect(
      page.getByRole("heading", { name: "Daily 10-question challenge" }),
    ).toBeVisible();
    await expect(page.getByText("Question 1/10")).toBeVisible();
    await page
      .getByRole("button", { name: /Tap to choose/ })
      .first()
      .click();
    await expect(
      page.getByRole("button", { name: "Next", exact: true }),
    ).toBeVisible();

    await page.goto("/ko/daily");
    await expect(
      page.getByRole("heading", { name: "오늘의 10문제 챌린지" }),
    ).toBeVisible();
    await expect(page.getByText("문제 1/10")).toBeVisible();
  });

  test("tracks category selection and ad slot view analytics", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      window.dataLayer = [];
    });

    await page.goto("/");
    await page.getByRole("link", { name: "Cities" }).click();
    await expect(page).toHaveURL(/\/cities/);

    await expect
      .poll(async () =>
        page.evaluate(() =>
          window.dataLayer?.some(
            (event) =>
              event.event === "category_selected" &&
              event.category === "city_population",
          ),
        ),
      )
      .toBe(true);

    await page.locator("[data-ad-placement]").first().scrollIntoViewIfNeeded();

    await expect
      .poll(async () =>
        page.evaluate(() =>
          window.dataLayer?.some((event) => event.event === "ad_slot_view"),
        ),
      )
      .toBe(true);
  });

  test("shows a clear message when sharing is unavailable", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      Object.defineProperty(navigator, "share", {
        configurable: true,
        value: undefined,
      });
      Object.defineProperty(navigator, "clipboard", {
        configurable: true,
        value: {
          writeText: () => Promise.reject(new Error("clipboard unavailable")),
        },
      });
    });

    await page.goto("/");
    await page
      .getByRole("button", { name: /Tap to choose/ })
      .first()
      .click();
    await page.getByRole("button", { name: "Share result" }).click();

    await expect(page.getByText("Sharing is unavailable.")).toBeVisible();
  });

  test("uses real higher/lower controls in Classic mode", async ({ page }) => {
    await page.goto("/countries");
    await page.getByRole("button", { name: "Classic" }).click();

    await expect(page.getByText(/Known value/i)).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Higher", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Lower", exact: true }),
    ).toBeVisible();

    await page.getByRole("button", { name: "Higher", exact: true }).click();
    await expect(page.getByText(/Correct!|Game Over/)).toBeVisible();
  });

  test("recommends other categories after game over", async ({ page }) => {
    await page.goto("/countries");

    for (let attempt = 0; attempt < 8; attempt += 1) {
      await page
        .getByRole("button", { name: /Tap to choose/ })
        .first()
        .click();

      if (await page.getByText("Game Over").isVisible()) {
        break;
      }

      await page.getByRole("button", { name: "Next", exact: true }).click();
    }

    const resultPanel = page.getByRole("status");

    await expect(resultPanel.getByText("Game Over")).toBeVisible();
    await expect(resultPanel.getByText("Try another category")).toBeVisible();
    await expect(
      resultPanel.getByRole("link", { name: "Cities" }),
    ).toBeVisible();
    await expect(
      resultPanel.getByRole("link", { name: "Movies" }),
    ).toBeVisible();
    await expect(
      resultPanel.getByRole("link", { name: "Animals" }),
    ).toBeVisible();
    await expect(
      page.locator('[data-ad-placement="game-over:country_population"]'),
    ).toBeVisible();
  });

  test("stores recent category, preferred mode, and played rounds locally", async ({
    page,
  }) => {
    await page.goto("/countries");

    await expect
      .poll(async () =>
        page.evaluate(() =>
          window.localStorage.getItem("trend-battle:recent-category"),
        ),
      )
      .toBe("country_population");

    await page.getByRole("button", { name: "Classic" }).click();
    await expect(
      page.evaluate(() =>
        window.localStorage.getItem("trend-battle:preferred-mode"),
      ),
    ).resolves.toBe("classic");

    await page.getByRole("button", { name: "Higher", exact: true }).click();

    const storedRounds = await page.evaluate(() =>
      JSON.parse(
        window.localStorage.getItem("trend-battle:played-rounds") ?? "[]",
      ),
    );

    expect(storedRounds[0]).toMatchObject({
      category: "country_population",
      mode: "classic",
    });
    expect(storedRounds[0].leftItemId).toBeTruthy();
    expect(storedRounds[0].rightItemId).toBeTruthy();

    await page.goto("/daily");
    await expect
      .poll(async () =>
        page.evaluate(() =>
          window.localStorage.getItem("trend-battle:recent-category"),
        ),
      )
      .toBe("daily");
  });
});

async function findJsonLd(page: Page, type: string, language: string) {
  return page.evaluate(
    ({ language, type }) =>
      Array.from(
        document.querySelectorAll('script[type="application/ld+json"]'),
      )
        .map((script) => {
          try {
            return JSON.parse(script.textContent ?? "{}");
          } catch {
            return null;
          }
        })
        .some(
          (data) =>
            data?.["@type"] === type &&
            data.inLanguage === language &&
            Array.isArray(data.mainEntity) &&
            data.mainEntity.length >= 3,
        ),
    { language, type },
  );
}
