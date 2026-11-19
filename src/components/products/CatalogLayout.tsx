import React, { useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { Product, ProductSize, SportType } from '../../types';
import { ProductFilters, FilterState } from './ProductFilters';
import { SortDropdown, SortOption } from './SortDropdown';
import { ProductGrid } from './ProductGrid';

export interface CatalogLayoutProps {
  title: string;
  categoryTag?: string;
  description: string;
  products: Product[];
  totalCount: number;
  filters: FilterState;
  sortBy: SortOption;
  availableSports: SportType[];
  availableSizes: ProductSize[];
  availableSubCategories: string[];
  minPrice: number;
  maxPriceLimit: number;
  onFilterChange: (filters: FilterState) => void;
  onResetFilters: () => void;
  onSortChange: (sort: SortOption) => void;
  emptyMessage?: string;
}

export const CatalogLayout: React.FC<CatalogLayoutProps> = ({
  title,
  categoryTag,
  description,
  products,
  filters,
  sortBy,
  availableSports,
  availableSizes,
  availableSubCategories,
  minPrice,
  maxPriceLimit,
  onFilterChange,
  onResetFilters,
  onSortChange,
  emptyMessage,
}) => {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Calculate active filter count for the badge
  const activeFilterCount =
    filters.sports.length +
    filters.sizes.length +
    filters.subCategories.length +
    (filters.maxPrice < maxPriceLimit ? 1 : 0);

  return (
    <div className="py-10 sm:py-16 bg-vats-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Catalog Header Banner */}
        <div className="mb-10 space-y-2 border-b border-vats-border pb-8">
          {categoryTag && (
            <span className="text-xs font-mono text-vats-lime uppercase tracking-widest font-bold block">
              {categoryTag}
            </span>
          )}
          <h1 className="font-display text-4xl sm:text-6xl text-vats-offwhite tracking-tight leading-none uppercase">
            {title}
          </h1>
          <p className="text-xs sm:text-sm text-vats-muted max-w-xl leading-relaxed">
            {description}
          </p>
        </div>

        {/* Filter & Sort Controls Bar */}
        <div className="flex items-center justify-between pb-6 border-b border-vats-border/50 mb-8">
          <div className="flex items-center gap-3">
            {/* Mobile Filter Drawer Trigger */}
            <button
              type="button"
              onClick={() => setIsMobileFiltersOpen(true)}
              className="lg:hidden px-4 py-2 bg-vats-surface border border-vats-border text-vats-offwhite text-xs font-bold uppercase tracking-wider flex items-center gap-2 rounded-sm"
              aria-label="Open filter menu"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-vats-lime" />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className="bg-vats-lime text-vats-black text-[10px] font-mono font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>

            <span className="text-xs text-vats-muted font-mono">
              Showing <strong className="text-vats-offwhite font-bold">{products.length}</strong> items
            </span>
          </div>

          <SortDropdown value={sortBy} onChange={onSortChange} />
        </div>

        {/* Catalog Body (Sidebar + Product Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Filter Sidebar (3 cols) */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-28" aria-label="Catalog Filters">
            <ProductFilters
              filters={filters}
              onChange={onFilterChange}
              onReset={onResetFilters}
              availableSports={availableSports}
              availableSizes={availableSizes}
              availableSubCategories={availableSubCategories}
              minPrice={minPrice}
              maxPriceLimit={maxPriceLimit}
            />
          </aside>

          {/* Mobile Filter Drawer Modal */}
          {isMobileFiltersOpen && (
            <ProductFilters
              filters={filters}
              onChange={onFilterChange}
              onReset={onResetFilters}
              availableSports={availableSports}
              availableSizes={availableSizes}
              availableSubCategories={availableSubCategories}
              minPrice={minPrice}
              maxPriceLimit={maxPriceLimit}
              isMobileDrawer={true}
              onCloseMobileDrawer={() => setIsMobileFiltersOpen(false)}
            />
          )}

          {/* Product Grid (9 cols) */}
          <main className="lg:col-span-9" aria-label="Product Catalog">
            <ProductGrid products={products} emptyMessage={emptyMessage} />
          </main>
        </div>
      </div>
    </div>
  );
};
