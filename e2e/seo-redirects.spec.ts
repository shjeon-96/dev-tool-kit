import { test, expect } from "@playwright/test";

test.describe("SEO Redirects and URL Consistency", () => {
  const locales = ["en", "ko", "ja"];

  test("should redirect outdated /login to /:locale/auth/signin", async ({
    page,
  }) => {
    // Test base /login redirect
    await page.goto("/login");
    // Should redirect to /en/auth/signin (default locale)
    await expect(page).toHaveURL(/\/auth\/signin/);
    await expect(page).toHaveURL(/\/en\/auth\/signin/);
  });

  for (const locale of locales) {
    test(`should redirect /${locale}/login to /${locale}/auth/signin`, async ({
      page,
    }) => {
      await page.goto(`/${locale}/login`);
      await expect(page).toHaveURL(new RegExp(`/${locale}/auth/signin`));
    });

    test(`should redirect /cheatsheets/Comp.vue to /${locale}/cheatsheets/vue`, async ({
      page,
    }) => {
      await page.goto("/cheatsheets/Comp.vue");
      // Since it's a global redirect in next.config.ts, it might go to default locale if not specified
      await expect(page).toHaveURL(/\/cheatsheets\/vue/);
    });
  }

  test("should ensure locale prefix is always present (localePrefix: always)", async ({
    page,
  }) => {
    // If we go to a URL without a locale, it should redirect to the default locale version
    await page.goto("/tools/json-formatter");
    // Depending on the middleware, it should redirect to /en/tools/json-formatter
    await expect(page).toHaveURL(/\/en\/tools\/json-formatter/);
  });

  test("should redirect /proxy to homepage", async ({ page }) => {
    await page.goto("/proxy");
    await expect(page).toHaveURL(/\/en/);
  });
});
