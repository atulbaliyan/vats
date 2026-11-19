import { test, expect } from '@playwright/test';

test.describe('Mega-Menu Desktop Hover & Link Navigation Verification', () => {
  test('mouse movement from navigation link to dropdown preserves open state without flickering', async ({ page, isMobile }) => {
    const isSmallScreen = isMobile || (page.viewportSize()?.width ?? 1440) < 1024;
    test.skip(isSmallScreen, 'Desktop mega-menu interaction is desktop only');

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const menLink = page.getByRole('banner').getByRole('link', { name: /^men/i });
    await expect(menLink).toBeVisible();

    // 1. Initial hover opens mega-menu without click
    await menLink.hover();
    const megaMenu = page.getByRole('region', { name: /^men subcategories navigation/i });
    await expect(megaMenu).toBeVisible();

    // 2. Obtain real geometry and move mouse across the boundary into dropdown
    const triggerBox = await menLink.boundingBox();
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

  test('clicking top-level category navigates directly to category page', async ({ page, isMobile }) => {
    const isSmallScreen = isMobile || (page.viewportSize()?.width ?? 1440) < 1024;
    test.skip(isSmallScreen, 'Desktop mega-menu interaction is desktop only');

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Clicking MEN directly navigates to /men
    const menLink = page.getByRole('banner').getByRole('link', { name: /^men/i });
    await expect(menLink).toBeVisible();
    await menLink.click();
    await expect(page).toHaveURL(/\/men/);

    // Clicking WOMEN directly navigates to /women
    const womenLink = page.getByRole('banner').getByRole('link', { name: /^women/i });
    await expect(womenLink).toBeVisible();
    await womenLink.click();
    await expect(page).toHaveURL(/\/women/);

    // Clicking SPORTS directly navigates to /sports
    const sportsLink = page.getByRole('banner').getByRole('link', { name: /^sports/i });
    await expect(sportsLink).toBeVisible();
    await sportsLink.click();
    await expect(page).toHaveURL(/\/sports/);
  });

  test('clicking outside closes the dropdown without blocking clicked element', async ({ page, isMobile }) => {
    const isSmallScreen = isMobile || (page.viewportSize()?.width ?? 1440) < 1024;
    test.skip(isSmallScreen, 'Desktop mega-menu interaction is desktop only');

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const menLink = page.getByRole('banner').getByRole('link', { name: /^men/i });
    await menLink.hover();

    const megaMenu = page.getByRole('region', { name: /^men subcategories navigation/i });
    await expect(megaMenu).toBeVisible();

    // Click outside on the Search button in the banner
    const searchBtn = page.getByRole('banner').getByRole('link', { name: /search store products/i });
    await searchBtn.click();

    // Dropdown is closed and navigation to /search occurred
    await expect(page).toHaveURL(/\/search/);
    await expect(megaMenu).not.toBeVisible();
  });
});
