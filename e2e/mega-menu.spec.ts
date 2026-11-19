import { test, expect } from '@playwright/test';

test.describe('Mega-Menu Desktop Interaction & Mouse Movement Verification', () => {
  test('mouse movement from navigation trigger to dropdown preserves open state without flickering', async ({ page, isMobile }) => {
    const isSmallScreen = isMobile || (page.viewportSize()?.width ?? 1440) < 1024;
    test.skip(isSmallScreen, 'Desktop mega-menu interaction is desktop only');

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const menTrigger = page.getByRole('banner').getByRole('button', { name: /^men/i });
    await expect(menTrigger).toBeVisible();

    // 1. Initial hover opens mega-menu
    await menTrigger.hover();
    const megaMenu = page.getByRole('region', { name: /men subcategories navigation/i });
    await expect(megaMenu).toBeVisible();

    // 2. Obtain real geometry and move mouse across the boundary into dropdown
    const triggerBox = await menTrigger.boundingBox();
    const menuBox = await megaMenu.boundingBox();
    expect(triggerBox).not.toBeNull();
    expect(menuBox).not.toBeNull();

    if (triggerBox && menuBox) {
      // Step A: Center of trigger
      await page.mouse.move(triggerBox.x + triggerBox.width / 2, triggerBox.y + triggerBox.height / 2);
      await expect(megaMenu).toBeVisible();

      // Step B: Bottom edge / boundary zone
      await page.mouse.move(triggerBox.x + triggerBox.width / 2, triggerBox.y + triggerBox.height + 2);
      await expect(megaMenu).toBeVisible();

      // Step C: Well inside dropdown panel
      await page.mouse.move(menuBox.x + 80, menuBox.y + 60);
      await expect(megaMenu).toBeVisible();
    }

    // 3. Submenu link is clickable and navigates cleanly
    const tshirtsLink = megaMenu.getByRole('link', { name: /performance t-shirts/i });
    await expect(tshirtsLink).toBeVisible();
    await tshirtsLink.click();

    await expect(page).toHaveURL(/sub=T-Shirts/);
    await expect(megaMenu).not.toBeVisible();
  });

  test('clicking navigation trigger pins menu and outside click closes it', async ({ page, isMobile }) => {
    const isSmallScreen = isMobile || (page.viewportSize()?.width ?? 1440) < 1024;
    test.skip(isSmallScreen, 'Desktop mega-menu interaction is desktop only');

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const womenTrigger = page.getByRole('banner').getByRole('button', { name: /^women/i });
    await expect(womenTrigger).toBeVisible();

    // Click trigger to pin menu
    await womenTrigger.click();
    const megaMenu = page.getByRole('region', { name: /women subcategories navigation/i });
    await expect(megaMenu).toBeVisible();

    // Move mouse far away to empty body space
    await page.mouse.move(10, 500);
    // Wait 500ms and verify menu remains open because it was opened via click
    await page.waitForTimeout(500);
    await expect(megaMenu).toBeVisible();

    // Click outside in body area
    await page.mouse.click(10, 500);
    await expect(megaMenu).not.toBeVisible();
  });
});
