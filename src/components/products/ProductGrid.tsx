import React from 'react';
import { Product } from '../../types';
import { ProductCard } from './ProductCard';
import { ShoppingBag } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  emptyMessage?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  emptyMessage = 'No products match your selected filters.',
}) => {
  if (products.length === 0) {
    return (
      <div className="py-20 text-center flex flex-col items-center justify-center space-y-4 bg-vats-surface/50 border border-vats-border rounded-sm p-8">
        <div className="w-16 h-16 rounded-full bg-vats-charcoal border border-vats-border flex items-center justify-center text-vats-muted">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h4 className="font-display text-2xl text-vats-offwhite tracking-wider">
          NO GEAR FOUND
        </h4>
        <p className="text-xs text-vats-muted max-w-sm">
          {emptyMessage} Try resetting your filters or adjusting your search term.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
