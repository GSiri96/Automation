import { test, expect } from '@playwright/test';

test('button', async ({ page }) => {
  await page.goto('https://dev.cloudio.io/#/automation/button-test', { waitUntil: 'networkidle' });
  await page.waitForSelector('#io-page-wrapper');
  await page.waitForLoadState('networkidle');
  await page.waitForSelector('.rowpanel');
  await expect(
    await page.locator('#io-page-wrapper').locator('button').count()
  ).toBe(11);
  await expect(page.locator('#io-page-wrapper')).toHaveScreenshot(
     'button.png'
  );
});