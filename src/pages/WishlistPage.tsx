import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2 } from 'lucide-react';
import { useWishlistStore } from '../store/useWishlistStore';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/products/ProductCard';

export const WishlistPage: React.FC = () => {
  const wishlistIds = useWishlistStore((s) => s.wishlistIds);
  const clearWishlist = useWishlistStore((s) => s.clearWishlist);

  const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  if (wishlistProducts.length === 0) {
    return (
      <div className="py-24 bg-vats-black min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-20 h-20 rounded-full bg-vats-charcoal border border-vats-border flex items-center justify-center text-vats-muted mb-6">
          <Heart className="w-10 h-10" />
        </div>
        <h1 className="font-display text-4xl sm:text-5xl text-vats-offwhite tracking-wider uppercase mb-2">
          NO SAVED GEAR YET
        </h1>
        <p className="text-sm text-vats-muted max-w-md mb-8">
          Tap the heart icon on any training tee, jersey, or heavyweight hoodie to save it to your wishlist.
        </p>
        <Link
          to="/shop"
          className="px-8 py-4 bg-vats-lime hover:bg-vats-limeHover text-vats-black font-extrabold uppercase text-xs tracking-widest transition-all rounded-sm shadow-xl shadow-vats-lime/20"
        >
          Explore All Products
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-16 bg-vats-black min-h-screen text-vats-offwhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 pb-6 border-b border-vats-border flex items-end justify-between">
          <div>
            <span className="text-xs font-mono text-vats-lime uppercase tracking-widest font-bold">
              FAVORITES
            </span>
            <h1 className="font-display text-4xl sm:text-6xl tracking-tight leading-none uppercase">
              Saved Gear ({wishlistProducts.length})
            </h1>
          </div>
          <button
            type="button"
            onClick={clearWishlist}
            className="text-xs text-vats-muted hover:text-red-400 transition-colors underline font-mono flex items-center gap-1"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear All
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {wishlistProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
};
