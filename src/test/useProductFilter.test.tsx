import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { useProductFilter } from '../hooks/useProductFilter';

describe('useProductFilter (Hook Integration)', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter initialEntries={['/shop']}>{children}</MemoryRouter>
  );

  it('initializes with all products when no query params present', () => {
    const { result } = renderHook(() => useProductFilter(PRODUCTS), { wrapper });

    expect(result.current.products.length).toBe(PRODUCTS.length);
    expect(result.current.hasActiveFilters).toBe(false);
    expect(result.current.sortBy).toBe('featured');
  });

  it('updates filters and filters products accordingly', () => {
    const { result } = renderHook(() => useProductFilter(PRODUCTS), { wrapper });

    act(() => {
      result.current.setFilters({
        ...result.current.filters,
        sports: ['Cricket'],
      });
    });

    expect(result.current.hasActiveFilters).toBe(true);
    expect(result.current.products.length).toBeGreaterThan(0);
    result.current.products.forEach((p) => {
      expect(p.sport).toBe('Cricket');
    });
  });

  it('updates sort option', () => {
    const { result } = renderHook(() => useProductFilter(PRODUCTS), { wrapper });

    act(() => {
      result.current.setSortBy('price-asc');
    });

    expect(result.current.sortBy).toBe('price-asc');
    const products = result.current.products;
    for (let i = 0; i < products.length - 1; i++) {
      expect(products[i].price).toBeLessThanOrEqual(products[i + 1].price);
    }
  });

  it('resets all active filters back to initial state', () => {
    const { result } = renderHook(() => useProductFilter(PRODUCTS), { wrapper });

    act(() => {
      result.current.setFilters({
        sports: ['Training'],
        sizes: ['M'],
        subCategories: ['T-Shirts'],
        maxPrice: 1200,
      });
    });

    expect(result.current.hasActiveFilters).toBe(true);

    act(() => {
      result.current.resetFilters();
    });

    expect(result.current.hasActiveFilters).toBe(false);
    expect(result.current.products.length).toBe(PRODUCTS.length);
  });

  it('respects initial URL query parameters', () => {
    const queryWrapper = ({ children }: { children: React.ReactNode }) => (
      <MemoryRouter initialEntries={['/shop?sport=Running&sub=Shorts&sort=price-desc']}>
        {children}
      </MemoryRouter>
    );

    const { result } = renderHook(() => useProductFilter(PRODUCTS), {
      wrapper: queryWrapper,
    });

    expect(result.current.filters.sports).toEqual(['Running']);
    expect(result.current.filters.subCategories).toEqual(['Shorts']);
    expect(result.current.sortBy).toBe('price-desc');
  });
});
