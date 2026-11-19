import React from 'react';
import { ChevronDown } from 'lucide-react';

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export const SortDropdown: React.FC<SortDropdownProps> = ({ value, onChange }) => {
  return (
    <div className="relative inline-block text-xs">
      <div className="flex items-center gap-2">
        <label
          htmlFor="catalog-sort"
          className="text-vats-muted uppercase tracking-wider font-semibold hidden sm:inline cursor-pointer"
        >
          Sort By:
        </label>
        <div className="relative">
          <select
            id="catalog-sort"
            aria-label="Sort catalog products"
            value={value}
            onChange={(e) => onChange(e.target.value as SortOption)}
            className="appearance-none bg-vats-surface border border-vats-border text-vats-offwhite pl-3 pr-8 py-2 rounded-sm focus:border-vats-lime focus-visible:ring-2 focus-visible:ring-vats-lime focus-visible:outline-none cursor-pointer font-medium"
          >
            <option value="featured">Featured Picks</option>
            <option value="newest">Newest Drops</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
          <ChevronDown
            className="w-3.5 h-3.5 text-vats-muted absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
};
