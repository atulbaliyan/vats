import { describe, it, expect } from 'vitest';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { formatCurrency, calculateDiscount } from '../utils/formatters';

describe('Product Catalog & Helpers', () => {
  it('has a valid products catalog with required fields', () => {
    expect(PRODUCTS.length).toBeGreaterThan(0);
    PRODUCTS.forEach((product) => {
      expect(product.id).toBeDefined();
      expect(product.slug).toBeDefined();
      expect(product.name).toBeDefined();
      expect(product.price).toBeGreaterThan(0);
      expect(product.images.length).toBeGreaterThan(0);
      expect(product.sizes.length).toBeGreaterThan(0);
      expect(product.colors.length).toBeGreaterThan(0);
    });
  });

  it('has categories configured', () => {
    expect(CATEGORIES.length).toBeGreaterThanOrEqual(6);
  });

  it('formats currency correctly in INR format', () => {
    const formatted = formatCurrency(1499);
    expect(formatted).toContain('1,499');
  });

  it('calculates discount percentage accurately', () => {
    expect(calculateDiscount(1200, 2000)).toBe(40);
    expect(calculateDiscount(2000, 2000)).toBe(0);
    expect(calculateDiscount(2500, 2000)).toBe(0);
  });
});
