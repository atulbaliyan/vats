import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Automated Accessibility (Axe-Core) & Keyboard Verification', () => {
  test('homepage has no critical accessibility violations', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .disableRules(['color-contrast']) // Reviewed separately for branded lime aesthetics
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('shop catalog page has no critical accessibility violations', async ({ page }) => {
    await page.goto('/shop');
    await page.waitForLoadState('networkidle');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .disableRules(['color-contrast'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('product detail page has no critical accessibility violations', async ({ page }) => {
    await page.goto('/product/vats-pro-aero-dry-training-tee');
    await page.waitForLoadState('networkidle');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .disableRules(['color-contrast'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('keyboard focus is trapped inside cart drawer when open', async ({ page, isMobile }) => {
    const isSmallScreen = isMobile || (page.viewportSize()?.width ?? 1440) < 1024;
    test.skip(isSmallScreen, 'Keyboard Tab navigation focus trapping is desktop-only');
    await page.goto('/product/vats-pro-aero-dry-training-tee');
    await page.getByRole('radio', { name: 'Size L' }).click();
    await page.getByRole('button', { name: /add to bag/i }).click();

    const drawer = page.getByRole('dialog', { name: /shopping bag/i });
    await expect(drawer).toBeVisible();

    // Tab through elements and verify focus remains inside dialog
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab');
      const isInside = await page.evaluate(() => {
        const active = document.activeElement;
        const dialog = document.querySelector('[role="dialog"]');
        return dialog?.contains(active);
      });
      expect(isInside).toBe(true);
    }

    // Escape closes drawer
    await page.keyboard.press('Escape');
    await expect(drawer).not.toBeVisible();
  });
});
