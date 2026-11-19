import { test, expect } from '@playwright/test';
import * as path from 'path';

const SCREENSHOT_DIR = '/home/atul-baliyan/.gemini/antigravity/brain/75d12d6c-2817-4bd2-80d0-8adbc0bb32f7/screenshots';

test.describe('Visual Quality & Responsiveness Audit', () => {
  test('captures homepage at current viewport', async ({ page }, testInfo) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Wait for hero headline to be visible
    const heroHeadline = page.getByRole('heading', { level: 1 });
    await expect(heroHeadline).toBeVisible();

    // Capture hero viewport
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `01-homepage-${testInfo.project.name.toLowerCase().replace(/\s+/g, '-')}.png`),
      fullPage: false,
    });
  });

  test('captures catalog and filters', async ({ page }, testInfo) => {
    await page.goto('/shop');
    await page.waitForLoadState('networkidle');

    const shopHeader = page.getByRole('heading', { name: /shop all gear/i });
    await expect(shopHeader).toBeVisible();

    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `02-catalog-${testInfo.project.name.toLowerCase().replace(/\s+/g, '-')}.png`),
      fullPage: false,
    });
  });

  test('captures product detail page with swatch and size selectors', async ({ page }, testInfo) => {
    await page.goto('/product/vats-pro-aero-dry-training-tee');
    await page.waitForLoadState('networkidle');

    const title = page.getByRole('heading', { level: 1 });
    await expect(title).toHaveText(/VATS Pro AeroDry Training Tee/i);

    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `03-pdp-${testInfo.project.name.toLowerCase().replace(/\s+/g, '-')}.png`),
      fullPage: false,
    });
  });

  test('captures teamwear enquiry showcase', async ({ page }, testInfo) => {
    await page.goto('/teamwear');
    await page.waitForLoadState('networkidle');

    const heading = page.getByRole('heading', { name: /custom teamwear/i });
    await expect(heading).toBeVisible();

    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `04-teamwear-${testInfo.project.name.toLowerCase().replace(/\s+/g, '-')}.png`),
      fullPage: false,
    });
  });

  test('captures cart review page', async ({ page }, testInfo) => {
    await page.goto('/cart');
    await page.waitForLoadState('networkidle');

    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `05-cart-${testInfo.project.name.toLowerCase().replace(/\s+/g, '-')}.png`),
      fullPage: false,
    });
  });
});
