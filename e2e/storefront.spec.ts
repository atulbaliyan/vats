import { test, expect } from '@playwright/test';

test.describe('Storefront Full E2E User Journey & Interactions', () => {
  test('1. Homepage loads successfully with hero, brand story, and categories', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Hero title is visible
    const heroH1 = page.getByRole('heading', { level: 1 });
    await expect(heroH1).toBeVisible();
    await expect(heroH1).toContainText('BEYOND');
    await expect(heroH1).toContainText('LIMITS.');

    // CTAs are present
    const shopCTA = page.getByRole('link', { name: /shop collection/i });
    await expect(shopCTA).toBeVisible();

    // Category section
    const catHeading = page.getByRole('heading', { name: /shop by category/i });
    await expect(catHeading).toBeVisible();

    // Brand story section
    const manifesto = page.getByRole('heading', { name: /not made to follow/i });
    await expect(manifesto).toBeVisible();
  });

  test('2. Desktop and mobile navigation flows', async ({ page, isMobile }) => {
    await page.goto('/');

    const isSmallScreen = isMobile || (page.viewportSize()?.width ?? 1440) < 1024;
    if (isSmallScreen) {
      // Mobile drawer open/close
      const menuBtn = page.getByRole('button', { name: /open mobile navigation menu/i });
      await expect(menuBtn).toBeVisible();
      await menuBtn.click();

      // Drawer is open
      const closeBtn = page.getByRole('button', { name: /close navigation menu/i });
      await expect(closeBtn).toBeVisible();

      // Click Men link inside drawer
      const menLink = page.getByRole('dialog').getByRole('link', { name: /^men/i }).first();
      await menLink.click();
      await expect(page).toHaveURL(/\/men/);
    } else {
      // Desktop nav links
      const menLink = page.getByRole('banner').getByRole('link', { name: /^men/i });
      await expect(menLink).toBeVisible();
      await menLink.click();
      await expect(page).toHaveURL(/\/men/);
    }
  });

  test('3. Product search with instant query filtering', async ({ page }) => {
    await page.goto('/search');

    const searchInput = page.getByPlaceholder(/search by product, sport, or fabric technology/i);
    await expect(searchInput).toBeVisible();

    // Search for Cricket
    await searchInput.fill('Cricket');
    await expect(page.getByText(/Cricket/i).first()).toBeVisible();

    // Click quick tag
    const tagBtn = page.getByRole('button', { name: 'Hoodies' });
    await tagBtn.click();
    await expect(searchInput).toHaveValue('Hoodies');
  });

  test('4. Category filtering and sorting in Shop catalog', async ({ page, isMobile }) => {
    await page.goto('/shop');

    const isSmallScreen = isMobile || (page.viewportSize()?.width ?? 1440) < 1024;
    if (!isSmallScreen) {
      // Desktop filter sidebar: check Cricket filter
      const cricketCheckbox = page.getByRole('checkbox', { name: /^cricket/i });
      await cricketCheckbox.check();
      await expect(page).toHaveURL(/sport=Cricket/);

      // Verify product articles rendered
      const productArticles = page.locator('article');
      await expect(productArticles.first()).toBeVisible();

      // Sorting
      const sortSelect = page.getByLabel(/sort catalog products/i);
      await sortSelect.selectOption('price-asc');
      await expect(page).toHaveURL(/sort=price-asc/);
    } else {
      // Mobile filter drawer
      const filterDrawerBtn = page.getByRole('button', { name: /open filter menu/i });
      await filterDrawerBtn.click();
      const cricketCheckbox = page.getByRole('dialog').getByRole('checkbox', { name: /^cricket/i });
      await cricketCheckbox.check();
      const applyBtn = page.getByRole('button', { name: /apply filters/i });
      await applyBtn.scrollIntoViewIfNeeded();
      await applyBtn.click({ force: true });
      await expect(page).toHaveURL(/sport=Cricket/);
    }
  });

  test('5. Product Detail: size, color selection, and size guide modal', async ({ page }) => {
    await page.goto('/product/vats-pro-aero-dry-training-tee');

    // Title and price
    await expect(page.getByRole('heading', { level: 1 })).toContainText('VATS Pro AeroDry Training Tee');
    await expect(page.getByText('₹1,299', { exact: true })).toBeVisible();

    // Size Guide modal
    const sizeGuideBtn = page.getByRole('button', { name: /^size guide/i });
    await sizeGuideBtn.click();

    const dialog = page.getByRole('dialog', { name: /size guide/i });
    await expect(dialog).toBeVisible();

    // Dismiss with Escape key
    await page.keyboard.press('Escape');
    await expect(dialog).not.toBeVisible();

    // Select Size L
    const sizeL = page.getByRole('radio', { name: 'Size L' });
    await sizeL.click();
    await expect(sizeL).toHaveAttribute('aria-checked', 'true');

    // Select Color
    const limeColor = page.getByRole('radio', { name: /electric lime/i });
    if (await limeColor.isVisible()) {
      await limeColor.click();
      await expect(limeColor).toHaveAttribute('aria-checked', 'true');
    }
  });

  test('6. Cart: Add to Bag, Drawer modifications, and Coupon Code', async ({ page }) => {
    await page.goto('/product/vats-pro-aero-dry-training-tee');

    // Select size L first
    await page.getByRole('radio', { name: 'Size L' }).click();

    // Click Add to Bag on PDP (automatically opens cart drawer)
    const addToBagBtn = page.getByRole('button', { name: /add to bag/i });
    await addToBagBtn.click();

    // Cart drawer is open
    const cartDrawer = page.getByRole('dialog', { name: /shopping bag/i });
    await expect(cartDrawer).toBeVisible();

    // Verify item in cart
    await expect(cartDrawer.getByText(/VATS Pro AeroDry Training Tee/i)).toBeVisible();

    // Increment quantity
    const increaseBtn = cartDrawer.getByRole('button', { name: /increase quantity/i });
    await increaseBtn.click();
    await expect(cartDrawer.getByText('2', { exact: true })).toBeVisible();

    // Apply Promo Code BEYOND10
    const promoInput = cartDrawer.getByPlaceholder(/promo code/i);
    await promoInput.fill('BEYOND10');
    const applyPromoBtn = cartDrawer.getByRole('button', { name: /^apply$/i });
    await applyPromoBtn.click();

    // Verify discount applied feedback
    await expect(cartDrawer.getByText(/10% discount applied/i)).toBeVisible();
  });

  test('7. Wishlist persistence across reloads', async ({ page }) => {
    await page.goto('/shop');

    // Find first wishlist button
    const wishlistBtn = page.getByRole('button', { name: /add .* to wishlist/i }).first();
    await wishlistBtn.click();

    // Navigate to wishlist
    await page.goto('/wishlist');
    const savedHeading = page.getByRole('heading', { name: /saved gear/i });
    await expect(savedHeading).toBeVisible();

    // Check at least one item present
    const wishlistCard = page.locator('article').first();
    await expect(wishlistCard).toBeVisible();

    // Reload page to verify persistence in localStorage
    await page.reload();
    await expect(page.locator('article').first()).toBeVisible();
  });

  test('8. QuickView Modal: open, escape dismissal, and focus restoration', async ({ page, isMobile }) => {
    const isSmallScreen = isMobile || (page.viewportSize()?.width ?? 1440) < 1024;
    test.skip(isSmallScreen, 'QuickView hover button is desktop only (lg+)');
    await page.goto('/shop');

    const firstProduct = page.locator('article').first();
    await firstProduct.hover();

    const quickViewBtn = page.getByRole('button', { name: /quick view/i }).first();
    await expect(quickViewBtn).toBeVisible();
    await quickViewBtn.focus();
    await quickViewBtn.click();

    // Modal opens
    const modal = page.getByRole('dialog', { name: /quick view/i });
    await expect(modal).toBeVisible();

    // Escape closes modal
    await page.keyboard.press('Escape');
    await expect(modal).not.toBeVisible();

    // Focus restored to button
    await expect(quickViewBtn).toBeFocused();
  });

  test('9. Teamwear quotation inquiry form validation and demo submission', async ({ page }) => {
    await page.goto('/teamwear');

    // Submit empty form to trigger browser validation
    const submitBtn = page.getByRole('button', { name: /request custom team proposal/i });
    await submitBtn.click();

    // Fill valid form
    await page.getByPlaceholder(/e\.g\. Rahul Sharma/i).fill('Vikram Singh');
    await page.getByPlaceholder(/e\.g\. Delhi Premier Academy/i).fill('Delhi Lions Sports Club');
    await page.getByPlaceholder(/coach@academy\.com/i).fill('vikram@delhiclub.test');
    await page.getByPlaceholder(/\+91 98765 43210/i).fill('+91 98765 43210');

    // Submit
    await submitBtn.click();

    // Confirmation message displayed
    await expect(page.getByRole('heading', { name: /enquiry received!/i })).toBeVisible();
    await expect(page.getByText(/has been logged in demo mode/i)).toBeVisible();
  });

  test('10. Demo checkout flow with order code generation', async ({ page }) => {
    // Put item in cart first
    await page.goto('/product/vats-pro-aero-dry-training-tee');
    await page.getByRole('radio', { name: 'Size L' }).click();
    await page.getByRole('button', { name: /add to bag/i }).click();

    // Proceed to checkout
    await page.goto('/checkout');
    await expect(page.getByRole('heading', { name: /order checkout/i })).toBeVisible();

    // Fill shipping form
    await page.locator('#checkout-full-name').fill('Arjun Verma');
    await page.locator('#checkout-email').fill('arjun@example.test');
    await page.locator('#checkout-phone').fill('+91 98765 43210');
    await page.locator('#checkout-pincode').fill('110001');
    await page.locator('#checkout-street').fill('42 Sports Hub, Ring Road');
    await page.locator('#checkout-city').fill('New Delhi');
    await page.locator('#checkout-state').fill('Delhi');

    // Submit Order
    const placeOrderBtn = page.getByRole('button', { name: /place demonstration order/i });
    await placeOrderBtn.click();

    // Confirmation
    await expect(page.getByRole('heading', { name: /order (placed|confirmed)/i })).toBeVisible();
    await expect(page.getByText(/VATS-\d+-IN/i)).toBeVisible();
  });
});
