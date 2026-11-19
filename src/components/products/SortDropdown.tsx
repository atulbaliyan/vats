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
        <span className="text-vats-muted uppercase tracking-wider font-semibold hidden sm:inline">
          Sort By:
        </span>
        <div className="relative">
          <select
            value={value}
            onChange={(e) => onChange(e.target.value as SortOption)}
            className="appearance-none bg-vats-surface border border-vats-border text-vats-offwhite pl-3 pr-8 py-2 rounded-sm focus:border-vats-lime focus:outline-none cursor-pointer font-medium"
          >
            <option value="featured">Featured Picks</option>
            <option value="newest">Newest Drops</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-vats-muted absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};
