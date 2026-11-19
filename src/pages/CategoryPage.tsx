import React, { useState, useMemo } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { SlidersHorizontal } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { CategoryType, ProductSize, SportType } from '../types';
import { ProductGrid } from '../components/products/ProductGrid';
import { ProductFilters, FilterState } from '../components/products/ProductFilters';
import { SortDropdown, SortOption } from '../components/products/SortDropdown';

export const CategoryPage: React.FC = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Determine active category from route path
  let activeCategory: CategoryType = 'men';
  let pageTitle = "Men's Performance";
  let pageSubtitle = 'Engineered training gear, moisture-wicking tees, and tapered track pants.';

  if (location.pathname.startsWith('/women')) {
    activeCategory = 'women';
    pageTitle = "Women's Activewear";
    pageSubtitle = 'Sculpt seamless compression, squat-proof leggings, and medium-impact sports bras.';
  } else if (location.pathname.startsWith('/sports')) {
    activeCategory = 'sports';
    pageTitle = 'Sports & Disciplines';
    pageSubtitle = 'Performance gear purpose-built for cricket, football, running, and heavy fitness.';
  } else if (location.pathname.startsWith('/collections')) {
    activeCategory = 'collections';
    pageTitle = 'Collections & Limited Drops';
    pageSubtitle = 'Heavyweight 280 GSM cotton drops and bonded tech fleece streetwear capsules.';
  }

  const querySport = searchParams.get('sport') as SportType | null;
  const querySub = searchParams.get('sub');

  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Filter base products by category
  const baseProducts = useMemo(() => {
    if (activeCategory === 'sports') {
      if (querySport) {
        return PRODUCTS.filter((p) => p.sport.toLowerCase() === querySport.toLowerCase());
      }
      return PRODUCTS;
    }
    return PRODUCTS.filter((p) => p.category === activeCategory);
  }, [activeCategory, querySport]);

  const availableSports: SportType[] = Array.from(new Set(baseProducts.map((p) => p.sport)));
  const availableSizes: ProductSize[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const availableSubCategories = Array.from(new Set(baseProducts.map((p) => p.subCategory)));
  const maxPriceLimit = 5000;

  const [filters, setFilters] = useState<FilterState>({
    sports: querySport ? [querySport] : [],
    sizes: [],
    subCategories: querySub ? [querySub] : [],
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

  const filteredProducts = useMemo(() => {
    let result = [...baseProducts];

    if (filters.sports.length > 0) {
      result = result.filter((p) => filters.sports.includes(p.sport));
    }

    if (filters.sizes.length > 0) {
      result = result.filter((p) => p.sizes.some((s) => filters.sizes.includes(s)));
    }

    if (filters.subCategories.length > 0) {
      result = result.filter((p) => filters.subCategories.includes(p.subCategory));
    }

    result = result.filter((p) => p.price <= filters.maxPrice);

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
  }, [baseProducts, filters, sortBy]);

  return (
    <div className="py-10 sm:py-16 bg-vats-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Header */}
        <div className="mb-10 space-y-2 border-b border-vats-border pb-8">
          <span className="text-xs font-mono text-vats-lime uppercase tracking-widest font-bold">
            CATEGORY // {activeCategory.toUpperCase()}
          </span>
          <h1 className="font-display text-4xl sm:text-6xl text-vats-offwhite tracking-tight leading-none uppercase">
            {pageTitle}
          </h1>
          <p className="text-xs sm:text-sm text-vats-muted max-w-xl">
            {pageSubtitle}
          </p>
        </div>

        {/* Filter Bar Controls */}
        <div className="flex items-center justify-between pb-6 border-b border-vats-border/50 mb-8">
          <div className="flex items-center gap-3">
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

        {/* Grid and Filters */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
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

          <div className="lg:col-span-9">
            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </div>
    </div>
  );
};
