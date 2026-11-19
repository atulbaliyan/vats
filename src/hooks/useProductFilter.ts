import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product, SportType } from '../types';
import { FilterState } from '../components/products/ProductFilters';
import { SortOption } from '../components/products/SortDropdown';
import {
  filterProducts,
  sortProducts,
  deriveAvailableFilters,
  createDefaultFilters,
} from '../utils/filterUtils';

export interface UseProductFilterOptions {
  syncUrl?: boolean;
  defaultSort?: SortOption;
}

export interface UseProductFilterResult {
  products: Product[];
  totalCount: number;
  filteredCount: number;
  filters: FilterState;
  sortBy: SortOption;
  availableSports: SportType[];
  availableSizes: ReturnType<typeof deriveAvailableFilters>['availableSizes'];
  availableSubCategories: string[];
  minPrice: number;
  maxPriceLimit: number;
  hasActiveFilters: boolean;
  setFilters: (filters: FilterState) => void;
  setSortBy: (sort: SortOption) => void;
  resetFilters: () => void;
}

export function useProductFilter(
  baseProducts: Product[],
  options: UseProductFilterOptions = { syncUrl: true, defaultSort: 'featured' }
): UseProductFilterResult {
  const [searchParams, setSearchParams] = useSearchParams();
  const { syncUrl = true, defaultSort = 'featured' } = options;

  // Derive static facets from the base product set
  const facets = useMemo(() => deriveAvailableFilters(baseProducts), [baseProducts]);

  // Read URL params initially
  const querySport = searchParams.get('sport') as SportType | null;
  const querySub = searchParams.get('sub');
  const querySort = (searchParams.get('sort') as SortOption) || defaultSort;

  // Filter state
  const [filters, setFilters] = useState<FilterState>(() =>
    createDefaultFilters(facets.maxPriceLimit, querySport, querySub)
  );
  const [sortBy, setSortBy] = useState<SortOption>(querySort);

  // Sync state when URL search params change externally (e.g. browser back/forward or navigation links)
  const lastParamsRef = useRef(searchParams.toString());
  useEffect(() => {
    const currentParams = searchParams.toString();
    if (currentParams !== lastParamsRef.current) {
      lastParamsRef.current = currentParams;
      const newSport = searchParams.get('sport') as SportType | null;
      const newSub = searchParams.get('sub');
      const newSort = (searchParams.get('sort') as SortOption) || defaultSort;

      setFilters((prev) => ({
        ...prev,
        sports: newSport ? [newSport] : [],
        subCategories: newSub ? [newSub] : [],
      }));
      setSortBy(newSort);
    }
  }, [searchParams, defaultSort]);

  // Sync URL when filter or sort state changes internally
  const updateUrl = useCallback(
    (currentFilters: FilterState, currentSort: SortOption) => {
      if (!syncUrl) return;

      const params = new URLSearchParams(searchParams);

      // Sport param
      if (currentFilters.sports.length === 1) {
        params.set('sport', currentFilters.sports[0]);
      } else {
        params.delete('sport');
      }

      // Subcategory param
      if (currentFilters.subCategories.length === 1) {
        params.set('sub', currentFilters.subCategories[0]);
      } else {
        params.delete('sub');
      }

      // Sort param
      if (currentSort !== defaultSort) {
        params.set('sort', currentSort);
      } else {
        params.delete('sort');
      }

      const newString = params.toString();
      if (newString !== searchParams.toString()) {
        lastParamsRef.current = newString;
        setSearchParams(params, { replace: true });
      }
    },
    [syncUrl, defaultSort, searchParams, setSearchParams]
  );

  const handleSetFilters = useCallback(
    (newFilters: FilterState) => {
      setFilters(newFilters);
      updateUrl(newFilters, sortBy);
    },
    [sortBy, updateUrl]
  );

  const handleSetSort = useCallback(
    (newSort: SortOption) => {
      setSortBy(newSort);
      updateUrl(filters, newSort);
    },
    [filters, updateUrl]
  );

  const resetFilters = useCallback(() => {
    const defaultState = createDefaultFilters(facets.maxPriceLimit);
    setFilters(defaultState);
    updateUrl(defaultState, sortBy);
  }, [facets.maxPriceLimit, sortBy, updateUrl]);

  // Compute filtered & sorted products
  const products = useMemo(() => {
    const filtered = filterProducts(baseProducts, filters);
    return sortProducts(filtered, sortBy);
  }, [baseProducts, filters, sortBy]);

  const hasActiveFilters = useMemo(() => {
    return (
      filters.sports.length > 0 ||
      filters.sizes.length > 0 ||
      filters.subCategories.length > 0 ||
      filters.maxPrice < facets.maxPriceLimit
    );
  }, [filters, facets.maxPriceLimit]);

  return {
    products,
    totalCount: baseProducts.length,
    filteredCount: products.length,
    filters,
    sortBy,
    availableSports: facets.availableSports,
    availableSizes: facets.availableSizes,
    availableSubCategories: facets.availableSubCategories,
    minPrice: facets.minPrice,
    maxPriceLimit: facets.maxPriceLimit,
    hasActiveFilters,
    setFilters: handleSetFilters,
    setSortBy: handleSetSort,
    resetFilters,
  };
}
