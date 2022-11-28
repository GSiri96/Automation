import { test, expect } from '@playwright/test';

test('Click on launch icon should naviagte to home page', async ({ page }) => {
  await page.goto('https://dev.cloudio.io/#/automation/data-grid', {
    waitUntil: 'networkidle',
  });
  await page.waitForSelector('#io-page-wrapper');
  await page.waitForLoadState('networkidle');

  await expect(page.url()).toContain('https://dev.cloudio.io/#/automation/data-grid');
  await page.click('data-testid=$sidebar$-Launch');
  await page.waitForURL("**/button-test");
  await expect(page.url()).toContain('https://dev.cloudio.io/#/automation/button-test');

});
