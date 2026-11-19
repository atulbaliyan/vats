import { describe, it, expect } from 'vitest';
import { PRODUCTS } from '../data/products';
import {
  filterProducts,
  sortProducts,
  deriveAvailableFilters,
  createDefaultFilters,
} from '../utils/filterUtils';
import { FilterState } from '../components/products/ProductFilters';

describe('filterUtils (Domain Logic)', () => {
  const defaultFilters: FilterState = {
    sports: [],
    sizes: [],
    subCategories: [],
    maxPrice: 10000,
  };

  describe('filterProducts', () => {
    it('returns all products when no filters are active', () => {
      const results = filterProducts(PRODUCTS, defaultFilters);
      expect(results.length).toBe(PRODUCTS.length);
    });

    it('filters by single sport', () => {
      const results = filterProducts(PRODUCTS, {
        ...defaultFilters,
        sports: ['Cricket'],
      });
      expect(results.length).toBeGreaterThan(0);
      results.forEach((p) => expect(p.sport).toBe('Cricket'));
    });

    it('filters by multiple sports', () => {
      const results = filterProducts(PRODUCTS, {
        ...defaultFilters,
        sports: ['Cricket', 'Running'],
      });
      expect(results.length).toBeGreaterThan(0);
      results.forEach((p) => {
        expect(['Cricket', 'Running']).toContain(p.sport);
      });
    });

    it('filters by size', () => {
      const results = filterProducts(PRODUCTS, {
        ...defaultFilters,
        sizes: ['XXL'],
      });
      expect(results.length).toBeGreaterThan(0);
      results.forEach((p) => {
        expect(p.sizes).toContain('XXL');
      });
    });

    it('filters by subcategory', () => {
      const results = filterProducts(PRODUCTS, {
        ...defaultFilters,
        subCategories: ['T-Shirts'],
      });
      expect(results.length).toBeGreaterThan(0);
      results.forEach((p) => {
        expect(p.subCategory).toBe('T-Shirts');
      });
    });

    it('filters by maxPrice', () => {
      const maxPrice = 1500;
      const results = filterProducts(PRODUCTS, {
        ...defaultFilters,
        maxPrice,
      });
      expect(results.length).toBeGreaterThan(0);
      results.forEach((p) => {
        expect(p.price).toBeLessThanOrEqual(maxPrice);
      });
    });

    it('handles combined filter criteria', () => {
      const results = filterProducts(PRODUCTS, {
        sports: ['Training'],
        sizes: ['M'],
        subCategories: ['T-Shirts'],
        maxPrice: 2000,
      });
      results.forEach((p) => {
        expect(p.sport).toBe('Training');
        expect(p.sizes).toContain('M');
        expect(p.subCategory).toBe('T-Shirts');
        expect(p.price).toBeLessThanOrEqual(2000);
      });
    });

    it('returns empty array when no products match strict conditions', () => {
      const results = filterProducts(PRODUCTS, {
        sports: ['Cricket'],
        sizes: ['XS'],
        subCategories: ['Hoodies'], // No cricket hoodies in catalog
        maxPrice: 500, // Price too low
      });
      expect(results).toEqual([]);
    });
  });

  describe('sortProducts', () => {
    it('sorts by price low to high (price-asc)', () => {
      const sorted = sortProducts(PRODUCTS, 'price-asc');
      for (let i = 0; i < sorted.length - 1; i++) {
        expect(sorted[i].price).toBeLessThanOrEqual(sorted[i + 1].price);
      }
    });

    it('sorts by price high to low (price-desc)', () => {
      const sorted = sortProducts(PRODUCTS, 'price-desc');
      for (let i = 0; i < sorted.length - 1; i++) {
        expect(sorted[i].price).toBeGreaterThanOrEqual(sorted[i + 1].price);
      }
    });

    it('sorts by rating descending', () => {
      const sorted = sortProducts(PRODUCTS, 'rating');
      for (let i = 0; i < sorted.length - 1; i++) {
        expect(sorted[i].rating).toBeGreaterThanOrEqual(sorted[i + 1].rating);
      }
    });

    it('sorts by newest first', () => {
      const sorted = sortProducts(PRODUCTS, 'newest');
      const firstNew = sorted.findIndex((p) => p.isNew);
      expect(firstNew).toBe(0);
    });

    it('sorts by featured pick', () => {
      const sorted = sortProducts(PRODUCTS, 'featured');
      expect(sorted[0].isBestSeller || sorted[0].isTrending).toBe(true);
    });
  });

  describe('deriveAvailableFilters', () => {
    it('extracts unique sports, sizes, subcategories and price bounds', () => {
      const facets = deriveAvailableFilters(PRODUCTS);
      expect(facets.availableSports.length).toBeGreaterThan(0);
      expect(facets.availableSizes.length).toBeGreaterThan(0);
      expect(facets.availableSubCategories.length).toBeGreaterThan(0);
      expect(facets.maxPriceLimit).toBeGreaterThanOrEqual(2999);
      expect(facets.minPrice).toBeLessThanOrEqual(1500);
    });
  });

  describe('createDefaultFilters', () => {
    it('initializes clean state with defaults', () => {
      const state = createDefaultFilters(4000, 'Running', 'Shorts');
      expect(state.sports).toEqual(['Running']);
      expect(state.subCategories).toEqual(['Shorts']);
      expect(state.sizes).toEqual([]);
      expect(state.maxPrice).toBe(4000);
    });
  });
});
