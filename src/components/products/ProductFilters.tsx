import React from 'react';
import { X, RotateCcw } from 'lucide-react';
import { ProductSize, SportType } from '../../types';
import { AccessibleDrawer } from '../ui/Dialog';

export interface FilterState {
  sports: SportType[];
  sizes: ProductSize[];
  subCategories: string[];
  maxPrice: number;
}

interface ProductFiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
  availableSports: SportType[];
  availableSizes: ProductSize[];
  availableSubCategories: string[];
  minPrice: number;
  maxPriceLimit: number;
  isMobileDrawer?: boolean;
  onCloseMobileDrawer?: () => void;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  onChange,
  onReset,
  availableSports,
  availableSizes,
  availableSubCategories,
  minPrice = 999,
  maxPriceLimit,
  isMobileDrawer = false,
  onCloseMobileDrawer,
}) => {
  const toggleSport = (sport: SportType) => {
    const updated = filters.sports.includes(sport)
      ? filters.sports.filter((s) => s !== sport)
      : [...filters.sports, sport];
    onChange({ ...filters, sports: updated });
  };

  const toggleSize = (size: ProductSize) => {
    const updated = filters.sizes.includes(size)
      ? filters.sizes.filter((s) => s !== size)
      : [...filters.sizes, size];
    onChange({ ...filters, sizes: updated });
  };

  const toggleSubCategory = (sub: string) => {
    const updated = filters.subCategories.includes(sub)
      ? filters.subCategories.filter((s) => s !== sub)
      : [...filters.subCategories, sub];
    onChange({ ...filters, subCategories: updated });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...filters, maxPrice: Number(e.target.value) });
  };

  const hasActiveFilters =
    filters.sports.length > 0 ||
    filters.sizes.length > 0 ||
    filters.subCategories.length > 0 ||
    filters.maxPrice < maxPriceLimit;

  const content = (
    <div className="space-y-6 text-sm">
      {/* Header with Clear button */}
      <div className="flex items-center justify-between pb-3 border-b border-vats-border">
        <span className="font-bold uppercase tracking-wider text-xs text-vats-offwhite">
          Filter Catalog
        </span>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="text-xs text-vats-lime hover:underline flex items-center gap-1 font-mono focus-visible:ring-1 focus-visible:ring-vats-lime focus-visible:outline-none rounded-sm"
            aria-label="Reset all filters to defaults"
          >
            <RotateCcw className="w-3 h-3" aria-hidden="true" /> Reset
          </button>
        )}
      </div>

      {/* Max Price Range Slider */}
      <fieldset className="space-y-2 border-0 p-0 m-0">
        <div className="flex items-center justify-between text-xs">
          <legend className="font-bold text-vats-muted uppercase tracking-wider">Max Price</legend>
          <span className="text-vats-lime font-mono font-bold" aria-live="polite">
            ₹{filters.maxPrice}
          </span>
        </div>
        <input
          type="range"
          min={minPrice}
          max={maxPriceLimit}
          step={100}
          value={filters.maxPrice}
          onChange={handlePriceChange}
          aria-label="Maximum price filter in Indian Rupees"
          aria-valuemin={minPrice}
          aria-valuemax={maxPriceLimit}
          aria-valuenow={filters.maxPrice}
          className="w-full accent-vats-lime bg-vats-charcoal cursor-pointer focus-visible:ring-2 focus-visible:ring-vats-lime focus-visible:outline-none rounded-sm"
        />
        <div className="flex justify-between text-[10px] text-vats-muted font-mono" aria-hidden="true">
          <span>₹{minPrice}</span>
          <span>₹{maxPriceLimit}</span>
        </div>
      </fieldset>

      {/* Sport Category Filter */}
      {availableSports.length > 0 && (
        <fieldset className="space-y-2.5 border-0 p-0 m-0">
          <legend className="font-bold text-xs text-vats-muted uppercase tracking-wider block mb-1">
            Sport / Activity
          </legend>
          <div className="space-y-1.5" role="group" aria-label="Filter by sport or activity">
            {availableSports.map((sport) => {
              const checked = filters.sports.includes(sport);
              return (
                <label
                  key={sport}
                  className="flex items-center gap-2.5 text-xs text-vats-offwhite/90 hover:text-vats-lime cursor-pointer select-none"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleSport(sport)}
                    className="accent-vats-lime w-4 h-4 bg-vats-charcoal border-vats-border rounded-sm focus-visible:ring-2 focus-visible:ring-vats-lime focus-visible:outline-none"
                  />
                  <span>{sport}</span>
                </label>
              );
            })}
          </div>
        </fieldset>
      )}

      {/* Product Type (Subcategory) */}
      {availableSubCategories.length > 0 && (
        <fieldset className="space-y-2.5 border-0 p-0 m-0">
          <legend className="font-bold text-xs text-vats-muted uppercase tracking-wider block mb-1">
            Apparel Type
          </legend>
          <div className="space-y-1.5" role="group" aria-label="Filter by apparel type">
            {availableSubCategories.map((sub) => {
              const checked = filters.subCategories.includes(sub);
              return (
                <label
                  key={sub}
                  className="flex items-center gap-2.5 text-xs text-vats-offwhite/90 hover:text-vats-lime cursor-pointer select-none"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleSubCategory(sub)}
                    className="accent-vats-lime w-4 h-4 bg-vats-charcoal border-vats-border rounded-sm focus-visible:ring-2 focus-visible:ring-vats-lime focus-visible:outline-none"
                  />
                  <span>{sub}</span>
                </label>
              );
            })}
          </div>
        </fieldset>
      )}

      {/* Sizes Grid */}
      {availableSizes.length > 0 && (
        <fieldset className="space-y-2.5 border-0 p-0 m-0">
          <legend className="font-bold text-xs text-vats-muted uppercase tracking-wider block mb-1">
            Available Sizes
          </legend>
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by size">
            {availableSizes.map((size) => {
              const active = filters.sizes.includes(size);
              return (
                <button
                  key={size}
                  type="button"
                  aria-pressed={active}
                  onClick={() => toggleSize(size)}
                  className={`px-3 py-1.5 text-xs font-mono font-bold uppercase rounded-sm border transition-all focus-visible:ring-2 focus-visible:ring-vats-lime focus-visible:outline-none ${
                    active
                      ? 'border-vats-lime bg-vats-lime text-vats-black'
                      : 'border-vats-border bg-vats-charcoal text-vats-offwhite hover:border-vats-muted'
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </fieldset>
      )}
    </div>
  );

  if (isMobileDrawer) {
    return (
      <AccessibleDrawer
        isOpen={true}
        onClose={onCloseMobileDrawer || (() => {})}
        side="left"
        title="Filter Products"
        description="Filter catalog by sport, apparel type, size, and price range"
        widthClassName="max-w-xs"
      >
        <div className="h-full p-5 overflow-y-auto flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-vats-border mb-4">
              <h2 className="font-display text-xl text-vats-offwhite tracking-wider">
                FILTERS
              </h2>
              <button
                type="button"
                onClick={onCloseMobileDrawer}
                className="p-1.5 text-vats-muted hover:text-white focus-visible:ring-2 focus-visible:ring-vats-lime focus-visible:outline-none rounded-sm"
                aria-label="Close filters drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {content}
          </div>
          <button
            type="button"
            onClick={onCloseMobileDrawer}
            className="w-full mt-6 py-3 bg-vats-lime text-vats-black font-bold uppercase text-xs tracking-wider rounded-sm focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
          >
            Apply Filters
          </button>
        </div>
      </AccessibleDrawer>
    );
  }

  return (
    <div className="bg-vats-surface border border-vats-border p-5 rounded-sm">
      {content}
    </div>
  );
};
