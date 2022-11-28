import { test, expect } from "@playwright/test";
import { chromium, FullConfig } from "@playwright/test";


test.only("page panel", async ({ page }) => {
  await page.goto("https://dev.cloudio.io/", {
    waitUntil: "networkidle",
  });
  await page.waitForSelector("#io-page-wrapper");
  await page.waitForLoadState("networkidle");

  //click on sidebar page icon
  await page.click("data-testid=$sidebar$-pages");
  await page.waitForLoadState("domcontentloaded");
  await page.waitForSelector("data-testid=$sp$-pages");
  await page.waitForLoadState("domcontentloaded");
  await page.waitForLoadState("load");

  const timeStamp = page.locator("time");
  await expect.soft(page.locator("data-testid=$sp$-pages")).toHaveScreenshot(
    "pagesList.png",
    { mask: [timeStamp] }
  );

  //click on page-create
  await page.click("data-testid=page-create");
  await page.waitForSelector("data-testid=$sp$-pages");
  await page.waitForLoadState("load");
  await expect.soft(page.locator("data-testid=$sp$-pages")).toHaveScreenshot(
    "createPage.png"
  );

  //click on page-create
  await page.click("data-testid=io-wo-blank");
  await page.waitForSelector("data-testid=$sp$-pages");
  await page.waitForLoadState("domcontentloaded");
  await page.waitForLoadState("load");
  await expect.soft(page.locator("data-testid=$sp$-pages")).toHaveScreenshot(
    "addNewPage.png"
  );

  //click on close icon
  await page.click("data-testid=panel-close");
});

test("create new page", async ({ page }) => {
  await page.goto("https://dev.cloudio.io/", {
    waitUntil: "networkidle",
  });
  await page.click("data-testid=$sidebar$-pages");
  await page.waitForLoadState("domcontentloaded");
  await page.click("data-testid=page-create");
  await page.click("data-testid=io-wo-blank");
  await page.type("data-testid=io-pageName-input", "Page From Automation");
  expect(await page.inputValue("data-testid=io-pageUid-input")).toBe(
    "page-from-automation"
  );
  //save the page
  await page.click("data-testid=page-save");
  await page.waitForSelector("data-testid=io-wo-open-designer");
  await page.waitForLoadState("load");
  //choose next step
  //   await expect(page.locator("data-testid=$sp$-pages")).toHaveScreenshot(
  //     "chooseNextStep.png"
  //   );
  //click on edit page
  await page.click("data-testid=io-wo-open-designer");

  await page.waitForLoadState("domcontentloaded");
  await page.waitForLoadState("load");
  //desiger overview
  await expect.soft(page.locator("#io_sidebar")).toHaveScreenshot("designer.png");
});

test("page access setting ", async ({ page }) => {
  await page.goto("https://dev.cloudio.io/", {
    waitUntil: "networkidle",
  });
  await page.click("data-testid=$sidebar$-pages");
  await page.waitForLoadState("domcontentloaded");
  await page
    .locator("data-testid=$sp$-pages")
    .locator("data-testid=page-from-automation")
    .hover();
  await page
    .locator("data-testid=$sp$-pages")
    .locator("data-testid=page-from-automation-more-page")
    .click();
  await page.waitForLoadState("domcontentloaded");
  await page.waitForLoadState("load");
  const timeStamp = page.locator("time");
  await expect.soft(page.locator("data-testid=$sp$-pages")).toHaveScreenshot(
    "moreActions.png",
    { mask: [timeStamp] }
  );
  await page.locator("role=menu").locator("data-testid=access").click();
  await page.waitForSelector("data-testid=public-cloudio-automation");
  await page.waitForLoadState("domcontentloaded");
  await page.waitForLoadState("load");
  await expect.soft(page.locator("data-testid=$sp$-pages")).toHaveScreenshot(
    "pageAccess.png"
  );
  const role = page.locator("data-testid=public-cloudio-automation");

  const allAccessCheckBox = role.locator("data-testid=io-public-active-input");
  const editAccessCheckBox = role.locator(
    "data-testid=io-public-readOnly-input"
  );
  expect(await allAccessCheckBox.isChecked()).toBeFalsy();
  await expect(editAccessCheckBox).toBeChecked();
  await allAccessCheckBox.check();

  await expect(allAccessCheckBox).toBeChecked();
  await expect(editAccessCheckBox).toBeChecked();

  await page.click("data-testid=save-access");
  //   await page.click('data-testid=back-button');
  //   await page.waitForSelector('data-testid=filter');
  //   await page.reload();
  await page
    .locator("data-testid=$sp$-pages")
    .locator("data-testid=page-from-automation")
    .hover();
  await page
    .locator("data-testid=$sp$-pages")
    .locator("data-testid=page-from-automation-more-page")
    .click();
  await page.locator("role=menu").locator("data-testid=access").click();
  await expect(allAccessCheckBox).toBeChecked();
  await expect(editAccessCheckBox).toBeChecked();
});

test("delete page", async ({ page }) => {
  await page.goto("https://dev.cloudio.io/", {
    waitUntil: "networkidle",
  });
  await page.waitForSelector("data-testid=$sidebar$-pages");
  await page.click("data-testid=$sidebar$-pages");
  await page.waitForLoadState("domcontentloaded");

  await page
    .locator("data-testid=$sp$-pages")
    .locator("data-testid=page-from-automation")
    .hover();
  await page
    .locator("data-testid=$sp$-pages")
    .locator("data-testid=page-from-automation-more-page")
    .click();
  await page.locator("role=menu").locator("data-testid=delete").click();
  await page.locator("role=dialog").locator("data-testid=confirm-yes").click();
  await page.waitForSelector("data-testid=notification");
  await expect(await page.locator("data-testid=notification").count()).toBe(1);
  await page
    .locator("data-testid=notification")
    .locator("data-testid=CloseIcon")
    .click();
  await page.waitForSelector("data-testid=page-from-automation");
  await page
    .locator("data-testid=$sp$-pages")
    .locator("data-testid=page-from-automation")
    .hover();
  await page
    .locator("data-testid=$sp$-pages")
    .locator("data-testid=page-from-automation-more-page")
    .click();
  await page.locator("role=menu").locator("data-testid=access").click();
  await page.locator("data-testid=uncheck-all-access-allowed").click();
  await page.click("data-testid=save-access");
  await page
    .locator("data-testid=$sp$-pages")
    .locator("data-testid=page-from-automation")
    .hover();
  await page
    .locator("data-testid=$sp$-pages")
    .locator("data-testid=page-from-automation-more-page")
    .click();
  await page.locator("role=menu").locator("data-testid=delete").click();
  await page.locator("role=dialog").locator("data-testid=confirm-yes").click();

  // await expect(await page.locator("data-testid=notification").locator(".MuiAlert-message").innerText()).toContainText('Paage ');

  await expect(
    await page.locator("data-testid=$sp$-pages").locator("header").locator("p")
  ).toContainText("8 pages");
});
