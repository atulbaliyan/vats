import { describe, it, expect, beforeEach } from 'vitest';
import { useCartStore } from '../store/useCartStore';
import { PRODUCTS } from '../data/products';

describe('useCartStore', () => {
  beforeEach(() => {
    useCartStore.getState().clearCart();
  });

  it('starts with an empty cart', () => {
    expect(useCartStore.getState().items).toEqual([]);
    expect(useCartStore.getState().getTotalCount()).toBe(0);
    expect(useCartStore.getState().getSubtotal()).toBe(0);
  });

  it('adds an item to cart and updates count and subtotal', () => {
    const product = PRODUCTS[0];
    useCartStore.getState().addItem(product, product.defaultColor, 'M', 2);

    const items = useCartStore.getState().items;
    expect(items.length).toBe(1);
    expect(items[0].quantity).toBe(2);
    expect(useCartStore.getState().getTotalCount()).toBe(2);
    expect(useCartStore.getState().getSubtotal()).toBe(product.price * 2);
  });

  it('applies coupon discount code correctly', () => {
    const product = PRODUCTS[0];
    useCartStore.getState().addItem(product, product.defaultColor, 'M', 2);
    const subtotal = product.price * 2;

    const res = useCartStore.getState().applyCoupon('BEYOND10');
    expect(res.success).toBe(true);
    expect(useCartStore.getState().discountRate).toBe(0.1);
    expect(useCartStore.getState().getDiscountAmount()).toBe(Math.round(subtotal * 0.1));
  });

  it('removes item and clears cart', () => {
    const product = PRODUCTS[0];
    useCartStore.getState().addItem(product, product.defaultColor, 'M', 1);
    const itemId = `${product.id}-${product.defaultColor}-M`;

    useCartStore.getState().removeItem(itemId);
    expect(useCartStore.getState().items.length).toBe(0);
  });
});
