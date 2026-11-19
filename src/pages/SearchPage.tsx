import React, { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductGrid } from '../components/products/ProductGrid';

const QUICK_TAGS = ['T-Shirts', 'Cricket', 'Track Pants', 'Running', 'Hoodies', 'Leggings', 'Custom Kit'];

export const SearchPage: React.FC = () => {
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PRODUCTS;

    return PRODUCTS.filter((p) => {
      return (
        p.name.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.sport.toLowerCase().includes(q) ||
        p.subCategory.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.features.some((f) => f.toLowerCase().includes(q))
      );
    });
  }, [query]);

  return (
    <div className="py-12 sm:py-16 bg-vats-black min-h-screen text-vats-offwhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-6 text-center mb-12">
          <span className="text-xs font-mono text-vats-lime uppercase tracking-widest font-bold">
            PRODUCT SEARCH
          </span>
          <h1 className="font-display text-4xl sm:text-6xl tracking-tight leading-none uppercase">
            Find Your Gear
          </h1>

          {/* Search Input Box */}
          <div className="relative">
            <Search className="w-5 h-5 text-vats-lime absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by product, sport, or fabric technology..."
              className="w-full pl-12 pr-10 py-4 bg-vats-surface border border-vats-border focus:border-vats-lime focus:outline-none text-sm text-vats-offwhite rounded-sm placeholder:text-vats-muted shadow-2xl"
              autoFocus
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-vats-muted hover:text-white"
                aria-label="Clear search"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Quick Tags Suggestions */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs">
            <span className="text-vats-muted">Popular:</span>
            {QUICK_TAGS.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setQuery(tag)}
                className="px-3 py-1 bg-vats-charcoal hover:bg-vats-border border border-vats-border rounded-full text-vats-offwhite transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Search Results Summary */}
        <div className="mb-8 pb-4 border-b border-vats-border flex items-center justify-between text-xs text-vats-muted font-mono">
          <span>
            {query ? `Results for "${query}"` : 'All Available Performance Gear'}
          </span>
          <span>{searchResults.length} products found</span>
        </div>

        {/* Product Grid */}
        <ProductGrid
          products={searchResults}
          emptyMessage={`No items found matching "${query}".`}
        />
      </div>
    </div>
  );
};
