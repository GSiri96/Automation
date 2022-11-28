import { test, expect } from "@playwright/test";

test("Should land on home page", async ({ page }) => {
  await page.goto("https://dev.cloudio.io/", { waitUntil: "networkidle" });
  await page.waitForSelector("#io-page-wrapper");
  await page.waitForLoadState("networkidle");
  await page.waitForSelector(".rowpanel");

  await expect(
    await page.locator("#io-page-wrapper").locator("button").count()
  ).toBe(11);
  await expect(page.locator("#io-page-wrapper")).toHaveScreenshot(
    "homePage.png"
  );
});

test("Click on launch icon should naviagte to home page", async ({
  page,
}) => {
  await page.goto("https://dev.cloudio.io/#/automation/data-grid", {
    waitUntil: "networkidle",
  });
  await page.waitForSelector("#io-page-wrapper");
  await page.waitForLoadState("networkidle");

  await expect(page.url()).toContain(
    "https://dev.cloudio.io/#/automation/data-grid"
  );
  await page.click("data-testid=$sidebar$-Launch");
  await page.waitForURL("**/button-test");

  await expect(page.url()).toContain(
    "https://dev.cloudio.io/#/automation/button-test"
  );
});
