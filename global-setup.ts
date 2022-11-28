// global-setup.ts
import { chromium, FullConfig } from "@playwright/test";

const log_in = async (page) => {
  await page.goto("https://dev.cloudio.io/", { waitUntil: "networkidle" });

  await page.locator("#username").fill("siri");
  await page.locator("#password").fill("u6c0mm0n@123L");
  await page.locator("[data-testid=signin]").click();
  await page.screenshot();
  await page.waitForNavigation({ waitUntil: "networkidle" });
  // Save signed-in state to 'storageState.json'.
  await page.context().storageState({ path: "storageState.json" });
};
// const log_out = async(page,browser,context) =>{
//   await page.goto("https://dev.cloudio.io/", { waitUntil: "networkidle" });
//   await page.click("[data-testid=user-profile]");
//   await page.pause();

//   await page.click("role=menu  >> [data-testid=logout]");
//   await context.close();
//   await browser.close();

// }
async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    recordVideo: {
      dir: "/Users/sirisunkara/Practice/gitHub/actions-runner/_work/Automation/Automation/videos",
    },
  });
  context.clearCookies();
  context.setDefaultNavigationTimeout(90000);
  const page = await context.newPage();

  await page.goto("https://dev.cloudio.io/", { waitUntil: "networkidle" });

  await page.locator("#username").fill("siri");
  await page.locator("#password").fill("u6c0mm0n@123L");
  await page.locator("[data-testid=signin]").click();
  await page.screenshot();
  await page.waitForNavigation({ waitUntil: "networkidle" });
  // Save signed-in state to 'storageState.json'.
  await page.context().storageState({ path: "storageState.json" });
  const log_out = async () => {
    await page.goto("https://dev.cloudio.io/", { waitUntil: "networkidle" });
    await page.click("[data-testid=user-profile]");
    await page.pause();

    await page.click("role=menu  >> [data-testid=logout]");
  };
  await context.close();
  await browser.close();
  return log_out;
}

export default globalSetup;
