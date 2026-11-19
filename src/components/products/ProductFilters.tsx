import React from 'react';
import { X, RotateCcw } from 'lucide-react';
import { ProductSize, SportType } from '../../types';

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
            className="text-xs text-vats-lime hover:underline flex items-center gap-1 font-mono"
          >
            <RotateCcw className="w-3 h-3" /> Reset
          </button>
        )}
      </div>

      {/* Max Price Range Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-vats-muted uppercase tracking-wider">Max Price</span>
          <span className="text-vats-lime font-mono font-bold">₹{filters.maxPrice}</span>
        </div>
        <input
          type="range"
          min={999}
          max={maxPriceLimit}
          step={100}
          value={filters.maxPrice}
          onChange={handlePriceChange}
          className="w-full accent-vats-lime bg-vats-charcoal cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-vats-muted font-mono">
          <span>₹999</span>
          <span>₹{maxPriceLimit}</span>
        </div>
      </div>

      {/* Sport Category Filter */}
      {availableSports.length > 0 && (
        <div className="space-y-2.5">
          <span className="font-bold text-xs text-vats-muted uppercase tracking-wider block">
            Sport / Activity
          </span>
          <div className="space-y-1.5">
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
                    className="accent-vats-lime w-4 h-4 bg-vats-charcoal border-vats-border rounded-sm"
                  />
                  <span>{sport}</span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      {/* Product Type (Subcategory) */}
      {availableSubCategories.length > 0 && (
        <div className="space-y-2.5">
          <span className="font-bold text-xs text-vats-muted uppercase tracking-wider block">
            Apparel Type
          </span>
          <div className="space-y-1.5">
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
                    className="accent-vats-lime w-4 h-4 bg-vats-charcoal border-vats-border rounded-sm"
                  />
                  <span>{sub}</span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      {/* Sizes Grid */}
      {availableSizes.length > 0 && (
        <div className="space-y-2.5">
          <span className="font-bold text-xs text-vats-muted uppercase tracking-wider block">
            Available Sizes
          </span>
          <div className="flex flex-wrap gap-1.5">
            {availableSizes.map((size) => {
              const active = filters.sizes.includes(size);
              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => toggleSize(size)}
                  className={`px-3 py-1.5 text-xs font-mono font-bold uppercase rounded-sm border transition-all ${
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
        </div>
      )}
    </div>
  );

  if (isMobileDrawer) {
    return (
      <div className="fixed inset-0 z-50 flex">
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onCloseMobileDrawer}
          aria-hidden="true"
        />
        <div className="relative w-full max-w-xs bg-vats-surface border-r border-vats-border h-full p-5 overflow-y-auto z-10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-vats-border mb-4">
              <h3 className="font-display text-xl text-vats-offwhite tracking-wider">
                FILTERS
              </h3>
              <button
                type="button"
                onClick={onCloseMobileDrawer}
                className="p-1.5 text-vats-muted hover:text-white"
                aria-label="Close filters"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {content}
          </div>
          <button
            type="button"
            onClick={onCloseMobileDrawer}
            className="w-full mt-6 py-3 bg-vats-lime text-vats-black font-bold uppercase text-xs tracking-wider rounded-sm"
          >
            Apply Filters
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-vats-surface border border-vats-border p-5 rounded-sm">
      {content}
    </div>
  );
};
