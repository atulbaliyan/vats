import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, ShoppingBag, Check } from 'lucide-react';
import { Product } from '../../types';
import { formatCurrency, calculateDiscount } from '../../utils/formatters';
import { useWishlistStore } from '../../store/useWishlistStore';
import { useCartStore } from '../../store/useCartStore';
import { useUIStore } from '../../store/useUIStore';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isQuickAdded, setIsQuickAdded] = useState(false);

  const isInWishlist = useWishlistStore((s) => s.isInWishlist(product.id));
  const toggleWishlist = useWishlistStore((s) => s.toggleWishlist);
  const addItem = useCartStore((s) => s.addItem);
  const openQuickView = useUIStore((s) => s.openQuickView);
  const addToast = useUIStore((s) => s.addToast);

  const discount = calculateDiscount(product.price, product.originalPrice);
  const primaryImage = product.images[0];
  const secondaryImage = product.images[1] || product.images[0];

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const added = toggleWishlist(product.id);
    if (added) {
      addToast('Saved to Wishlist', product.name, 'success');
    } else {
      addToast('Removed from Wishlist', product.name, 'info');
    }
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Default to medium size or first available size
    const size = product.sizes.includes('M') ? 'M' : product.sizes[0];
    addItem(product, product.defaultColor, size, 1);
    setIsQuickAdded(true);
    addToast('Added to bag!', `${product.name} (${size})`, 'success');
    setTimeout(() => setIsQuickAdded(false), 1200);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickView(product);
  };

  return (
    <div
      className="group relative flex flex-col bg-vats-surface border border-vats-border rounded-sm overflow-hidden transition-all duration-300 hover:border-vats-muted/80 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Frame */}
      <Link
        to={`/product/${product.slug}`}
        className="relative aspect-[3/4] w-full overflow-hidden bg-vats-charcoal block select-none"
      >
        <img
          src={isHovered ? secondaryImage : primaryImage}
          alt={product.name}
          className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.isNew && (
            <span className="bg-white text-vats-black text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-sm tracking-wider shadow">
              NEW
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-vats-lime text-vats-black text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-sm tracking-wider shadow">
              BESTSELLER
            </span>
          )}
          {discount > 0 && (
            <span className="bg-red-600 text-white text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-sm tracking-wider shadow font-mono">
              -{discount}%
            </span>
          )}
        </div>

        {/* Wishlist Button (Always visible / accessible) */}
        <button
          type="button"
          onClick={handleWishlistClick}
          className={`absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            isInWishlist
              ? 'bg-red-500 text-white shadow-lg'
              : 'bg-vats-black/60 text-vats-offwhite hover:text-red-400 hover:bg-vats-black backdrop-blur-sm'
          }`}
          aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          title="Save to wishlist"
        >
          <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-current' : ''}`} />
        </button>

        {/* Hover Action Drawer (Desktop) */}
        <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-vats-black/95 via-vats-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 hidden sm:flex items-center gap-2">
          <button
            type="button"
            onClick={handleQuickAdd}
            disabled={isQuickAdded}
            className={`flex-1 py-2.5 px-3 rounded-sm text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
              isQuickAdded
                ? 'bg-emerald-500 text-white'
                : 'bg-vats-lime hover:bg-vats-limeHover text-vats-black shadow-md'
            }`}
          >
            {isQuickAdded ? (
              <>
                <Check className="w-3.5 h-3.5" /> Added
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" /> Quick Add
              </>
            )}
          </button>
          <button
            type="button"
            onClick={handleQuickView}
            className="p-2.5 bg-vats-charcoal hover:bg-vats-border text-vats-offwhite rounded-sm transition-colors border border-vats-border"
            title="Quick View Modal"
            aria-label="Quick View Product"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </Link>

      {/* Product Content Details */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
        <div>
          {/* Subtitle / Sport label */}
          <div className="flex items-center justify-between text-[11px] text-vats-muted uppercase tracking-wider mb-1">
            <span>{product.sport}</span>
            <span className="font-mono">{product.subCategory}</span>
          </div>

          {/* Product Name */}
          <Link
            to={`/product/${product.slug}`}
            className="font-bold text-sm text-vats-offwhite hover:text-vats-lime transition-colors line-clamp-1 block"
          >
            {product.name}
          </Link>

          {/* Subtitle description */}
          <p className="text-[11px] text-vats-muted line-clamp-1 mt-0.5">
            {product.subtitle}
          </p>
        </div>

        {/* Color swatches & Pricing */}
        <div className="pt-2 border-t border-vats-border/50 flex items-center justify-between">
          {/* Colors */}
          <div className="flex items-center gap-1.5">
            {product.colors.slice(0, 3).map((c, i) => (
              <span
                key={i}
                className="w-3 h-3 rounded-full border border-vats-border"
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
            {product.colors.length > 3 && (
              <span className="text-[10px] text-vats-muted font-mono">
                +{product.colors.length - 3}
              </span>
            )}
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-bold text-vats-lime font-mono">
              {formatCurrency(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-[11px] text-vats-muted line-through font-mono">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>
        </div>

        {/* Mobile Quick Add Button */}
        <button
          type="button"
          onClick={handleQuickAdd}
          className="sm:hidden w-full mt-2 py-2 bg-vats-charcoal border border-vats-border text-vats-offwhite text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 rounded-sm"
        >
          <ShoppingBag className="w-3.5 h-3.5 text-vats-lime" /> Quick Add
        </button>
      </div>
    </div>
  );
};
