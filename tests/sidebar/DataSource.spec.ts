import { test, expect } from "@playwright/test";


// test.afterEach(async ({ page }) => {
//   await page.close();
// });

test("datasource panel", async ({ page }) => {
  await page.goto("https://dev.cloudio.io/", {
    waitUntil: "networkidle",
  });
  await page.waitForSelector("#io-page-wrapper");
  await page.waitForLoadState("networkidle");

  //click on sidebar ds icon
  await page.click("data-testid=$sidebar$-ds");
  await page.waitForLoadState("domcontentloaded");
  await page.waitForSelector("data-testid=$sp$-ds");
  await page.waitForLoadState("domcontentloaded");
  await page.waitForLoadState("load");

  const timeStamp = page.locator("time");
  await expect
    .soft(page.locator("data-testid=$sp$-ds"))
    .toHaveScreenshot("dsList.png", { mask: [timeStamp] });

  //click on page-create
  await page.click("data-testid=action");
  await page.waitForSelector("data-testid=$sp$-ds");
  await page.waitForLoadState("load");
  await expect
    .soft(page.locator("data-testid=$sp$-ds"))
    .toHaveScreenshot("createDS.png");
  //   await expect.poll(() =>  page.locator("data-testid=$sp$-ds").screenshot(), {
  //     intervals: [1_000, 2_000, 10_000],
  //     timeout: 60_000
  //   }).toMatchSnapshot();
  //    await expect.poll(() => page.screenshot()).toMatchSnapshot();

  //click on page-create
  await page.click("data-testid=io-wo-blank");
  await page.waitForSelector("data-testid=$sp$-ds");
  await page.waitForLoadState("domcontentloaded");
  await page.waitForLoadState("load");

  await expect
    .soft(page.locator("data-testid=$sp$-ds"))
    .toHaveScreenshot("addNewDS.png");

  //click on close icon
  await page.click("data-testid=panel-close");
});

test("add new datasource", async ({ page }) => {
  await page.goto("https://dev.cloudio.io/", {
    waitUntil: "networkidle",
  });
  await page.click("data-testid=$sidebar$-ds");
  await page.waitForLoadState("domcontentloaded");
  await page.click("data-testid=action");
  await page.click("data-testid=io-wo-blank");
  await page.type("data-testid=io-ds-name-input", "DS From Automation");
  await page.type("data-testid=io-table-name-input", "DS_AUT");
  //save the page
  await page.click("data-testid=action");
  await page.waitForSelector("data-testid=io-wo-edit");
  await page.waitForLoadState("load");
  //choose next step
  // await expect(page.locator("data-testid=$sp$-ds")).toHaveScreenshot(
  //   "chooseNextStep.png"
  // );
  //click on edit page
  await page.click("data-testid=io-wo-edit");

  await page.waitForLoadState("domcontentloaded");
  await page.waitForLoadState("load");
  //desiger overview
  await expect
    .soft(page.locator("data-testid=$sp$-ds"))
    .toHaveScreenshot("editDatasource.png");
});

test("access setting", async ({ page }) => {
  await page.goto("https://dev.cloudio.io/", {
    waitUntil: "networkidle",
  });
  await page.click("data-testid=$sidebar$-ds");
  await page.waitForLoadState("domcontentloaded");
  await page
    .locator("data-testid=$sp$-ds")
    .locator("data-testid=DsFromAutomation")
    .hover();
  await page
    .locator("data-testid=$sp$-ds")
    .locator("data-testid=DsFromAutomation-more")
    .click();

  await page.waitForLoadState("domcontentloaded");
  await page.waitForLoadState("load");
  const timeStamp = page.locator("time");
  await page.waitForSelector("li[data-testid=DsFromAutomation] p > span");
  await expect
    .soft(page.locator("data-testid=$sp$-ds"))
    .toHaveScreenshot("moreActions.png", { mask: [timeStamp] });
  await page
    .locator("role=menu")
    .locator("data-testid=DsFromAutomation-access")
    .click();
  await page.waitForSelector("role=grid");
  await page.waitForLoadState("domcontentloaded");
  await page.waitForLoadState("load");
  await expect
    .soft(page.locator("data-testid=$sp$-ds"))
    .toHaveScreenshot("AccessSetttings.png");
});

test("view attributes", async ({ page }) => {
  await page.goto("https://dev.cloudio.io/", {
    waitUntil: "networkidle",
  });
  await page.click("data-testid=$sidebar$-ds");
  await page.waitForLoadState("domcontentloaded");
  await page
    .locator("data-testid=$sp$-ds")
    .locator("data-testid=DsFromAutomation")
    .hover();
  await page
    .locator("data-testid=$sp$-ds")
    .locator("data-testid=DsFromAutomation-attrs")
    .click();
  await page.waitForSelector("data-testid=search-fields");
  //default attributes
  await expect(await page.locator("_react=CellComponent").count()).toBe(5);

  //add a attribute
  await page.locator("data-testid=action").click();
  //confiming the datasource name
  await expect(
    await page.locator("data-testid=io-datasourceUid-input").inputValue()
  ).toEqual("DsFromAutomation");

  //Add new field
  await expect
    .soft(page.locator("data-testid=$sp$-ds"))
    .toHaveScreenshot("addNewField.png");
  await page.locator("data-testid=io-columnName-input").fill("ATTR_AUT");
  await expect(
    await page.locator("data-testid=io-attributeName-input").inputValue()
  ).toEqual("Attr Aut");
  await expect(
    await page.locator("data-testid=io-attributeCode-input").inputValue()
  ).toEqual("attrAut");

  //click on save
  await page.click("data-testid=action");
  await page.waitForSelector("data-testid=notification");
  await expect(await page.locator("data-testid=notification").count()).toBe(1);
  await expect(
    await page.locator("data-testid=notification").locator(".MuiAlert-message")
  ).toContainText("Field Attr Aut created successfully!");

  await page
    .locator("data-testid=notification")
    .locator("data-testid=CloseIcon")
    .click();
  //click on back
  await page.click("data-testid=back");
  await page.waitForSelector("data-testid=search-fields");

  await page.waitForSelector("_react=CellComponent >> nth=5");

  await expect(await page.locator("_react=CellComponent").count()).toEqual(6);

  await expect(
    await page.locator("_react=CellComponent >> nth=0").innerText()
  ).toBe("Attr Aut");

  await page.locator("_react=CellComponent >> nth=0").hover();
  //delete attr
  await page.locator("_react=CellComponent >> nth=0").locator("button").click();

  await page.waitForSelector("data-testid=notification");
  await expect(await page.locator("data-testid=notification").count()).toBe(1);
  await expect(
    await page.locator("data-testid=notification").locator(".MuiAlert-message")
  ).toContainText("1 records posted");
  await expect(await page.locator("_react=CellComponent").count()).toBe(5);
});

test("delete datasource", async ({ page }) => {
  await page.goto("https://dev.cloudio.io/", {
    waitUntil: "networkidle",
  });
  await page.click("data-testid=$sidebar$-ds");
  await page.waitForLoadState("domcontentloaded");
  await page
    .locator("data-testid=$sp$-ds")
    .locator("data-testid=DsFromAutomation")
    .hover();
  await page
    .locator("data-testid=$sp$-ds")
    .locator("data-testid=DsFromAutomation-more")
    .click();

  await page.waitForLoadState("domcontentloaded");
  await page.waitForLoadState("load");

  await page
    .locator("role=menu")
    .locator("data-testid=DsFromAutomation-delete")
    .click();
  await page.locator("role=dialog").locator("data-testid=confirm-yes").click();
  await page.waitForSelector("data-testid=notification");
  await expect(await page.locator("data-testid=notification").count()).toBe(1);
  await expect(
    await page.locator("data-testid=notification").locator(".MuiAlert-message")
  ).toContainText(
    "You must unassign this datasource from all roles before deleting it!"
  );
  await page
    .locator("data-testid=notification")
    .locator("data-testid=CloseIcon")
    .click();
  await page
    .locator("data-testid=$sp$-ds")
    .locator("data-testid=DsFromAutomation")
    .hover();
  await page
    .locator("data-testid=$sp$-ds")
    .locator("data-testid=DsFromAutomation-more")
    .click();
  await page
    .locator("role=menu")
    .locator("data-testid=DsFromAutomation-access")
    .click();
  await page.waitForSelector("role=grid");
  await page.locator("data-testid=datasource-access-uncheckall-view").click();
  await page.locator("data-testid=datasource-access-uncheckall-insert").click();
  await page.locator("data-testid=datasource-access-uncheckall-update").click();
  await page.locator("data-testid=datasource-access-uncheckall-delete").click();
  await page.locator("data-testid=datasource-access-uncheckall-audit").click();
  await page.locator("data-testid=datasource-access-uncheckall-export").click();

  await page.locator("data-testid=save").click();

  await page
    .locator("data-testid=$sp$-ds")
    .locator("data-testid=DsFromAutomation")
    .hover();
  await page
    .locator("data-testid=$sp$-ds")
    .locator("data-testid=DsFromAutomation-more")
    .click();
  await page
    .locator("role=menu")
    .locator("data-testid=DsFromAutomation-delete")
    .click();
  await page.locator("role=dialog").locator("data-testid=confirm-yes").click();
  await page.waitForSelector("data-testid=notification");
  await expect(await page.locator("data-testid=notification").count()).toBe(1);
});
