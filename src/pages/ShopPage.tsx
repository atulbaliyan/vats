import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductSize, SportType } from '../types';
import { ProductGrid } from '../components/products/ProductGrid';
import { ProductFilters, FilterState } from '../components/products/ProductFilters';
import { SortDropdown, SortOption } from '../components/products/SortDropdown';

export const ShopPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialSport = searchParams.get('sport') as SportType | null;
  const initialSub = searchParams.get('sub');

  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Available filter options extracted from catalog
  const availableSports: SportType[] = ['Training', 'Running', 'Cricket', 'Football', 'Gym & Fitness', 'Lifestyle'];
  const availableSizes: ProductSize[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const availableSubCategories = Array.from(new Set(PRODUCTS.map((p) => p.subCategory)));
  const maxPriceLimit = 5000;

  const [filters, setFilters] = useState<FilterState>({
    sports: initialSport ? [initialSport] : [],
    sizes: [],
    subCategories: initialSub ? [initialSub] : [],
    maxPrice: maxPriceLimit,
  });

  const handleResetFilters = () => {
    setFilters({
      sports: [],
      sizes: [],
      subCategories: [],
      maxPrice: maxPriceLimit,
    });
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Filter by sports
    if (filters.sports.length > 0) {
      result = result.filter((p) => filters.sports.includes(p.sport));
    }

    // Filter by sizes
    if (filters.sizes.length > 0) {
      result = result.filter((p) => p.sizes.some((s) => filters.sizes.includes(s)));
    }

    // Filter by subcategory
    if (filters.subCategories.length > 0) {
      result = result.filter((p) => filters.subCategories.includes(p.subCategory));
    }

    // Filter by price
    result = result.filter((p) => p.price <= filters.maxPrice);

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
        break;
    }

    return result;
  }, [filters, sortBy]);

  return (
    <div className="py-10 sm:py-16 bg-vats-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Banner & Headline */}
        <div className="mb-10 space-y-2 border-b border-vats-border pb-8">
          <span className="text-xs font-mono text-vats-lime uppercase tracking-widest font-bold">
            PERFORMANCE CATALOG
          </span>
          <h1 className="font-display text-4xl sm:text-6xl text-vats-offwhite tracking-tight leading-none uppercase">
            Shop All Gear
          </h1>
          <p className="text-xs sm:text-sm text-vats-muted max-w-xl">
            Explore the complete line of VATS Sports apparel, engineered for uncompromising durability, moisture dispersion, and athletic mobility.
          </p>
        </div>

        {/* Filter Bar Controls */}
        <div className="flex items-center justify-between pb-6 border-b border-vats-border/50 mb-8">
          <div className="flex items-center gap-3">
            {/* Mobile Filter Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileFiltersOpen(true)}
              className="lg:hidden px-4 py-2 bg-vats-surface border border-vats-border text-vats-offwhite text-xs font-bold uppercase tracking-wider flex items-center gap-2 rounded-sm"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-vats-lime" />
              <span>Filters</span>
            </button>

            <span className="text-xs text-vats-muted font-mono">
              Showing <strong className="text-vats-offwhite font-bold">{filteredProducts.length}</strong> items
            </span>
          </div>

          <SortDropdown value={sortBy} onChange={setSortBy} />
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Filter Sidebar (3 cols) */}
          <div className="hidden lg:block lg:col-span-3 sticky top-28">
            <ProductFilters
              filters={filters}
              onChange={setFilters}
              onReset={handleResetFilters}
              availableSports={availableSports}
              availableSizes={availableSizes}
              availableSubCategories={availableSubCategories}
              minPrice={999}
              maxPriceLimit={maxPriceLimit}
            />
          </div>

          {/* Mobile Filter Drawer */}
          {isMobileFiltersOpen && (
            <ProductFilters
              filters={filters}
              onChange={setFilters}
              onReset={handleResetFilters}
              availableSports={availableSports}
              availableSizes={availableSizes}
              availableSubCategories={availableSubCategories}
              minPrice={999}
              maxPriceLimit={maxPriceLimit}
              isMobileDrawer={true}
              onCloseMobileDrawer={() => setIsMobileFiltersOpen(false)}
            />
          )}

          {/* Product Grid (9 cols) */}
          <div className="lg:col-span-9">
            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </div>
    </div>
  );
};
