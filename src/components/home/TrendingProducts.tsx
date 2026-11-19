import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Flame } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../products/ProductCard';

export const TrendingProducts: React.FC = () => {
  // Select top trending & bestseller products
  const trendingItems = PRODUCTS.filter((p) => p.isTrending || p.isBestSeller).slice(0, 4);

  return (
    <section className="py-20 bg-vats-surface/40 border-t border-vats-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-vats-lime uppercase tracking-widest font-semibold mb-2">
              <Flame className="w-3.5 h-3.5 text-vats-lime" />
              <span>HIGH DEMAND</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-vats-offwhite tracking-tight uppercase leading-none">
              Trending Now
            </h2>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-vats-lime uppercase tracking-wider hover:underline"
          >
            Explore All Gear <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {trendingItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
