import { test, expect, Page } from '@playwright/test';

test.describe('Badge ;& Avatar & Box', () => {
  test('badge', async ({ page }) => {
    const pageWrapper = page.locator('#io-page-wrapper');
    await page.goto('https://dev.cloudio.io/#/automation/badge-test', {
      waitUntil: 'networkidle',
    });
    await page.waitForSelector('#io-page-wrapper');
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('.flexpanel');

    //badge
    await page.waitForSelector('.iflex-item-badge');
    await expect(pageWrapper.locator('.iflex-item-badge')).toHaveScreenshot(
      'badge.png'
    );

    //avatar
    await page.waitForSelector('.iflex-item-avatar');
    await expect(pageWrapper.locator('.iflex-item-avatar')).toHaveScreenshot(
      'avatar.png'
    );

    //box
    await page.waitForSelector('.iflex-item-box');
    await expect(pageWrapper.locator('.iflex-item-box')).toHaveScreenshot(
      'box.png'
    );
  });
});
