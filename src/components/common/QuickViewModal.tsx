import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Star, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { useUIStore } from '../../store/useUIStore';
import { useCartStore } from '../../store/useCartStore';
import { formatCurrency, calculateDiscount } from '../../utils/formatters';
import { ProductSize } from '../../types';

export const QuickViewModal: React.FC = () => {
  const product = useUIStore((s) => s.quickViewProduct);
  const closeQuickView = useUIStore((s) => s.closeQuickView);
  const addItem = useCartStore((s) => s.addItem);
  const addToast = useUIStore((s) => s.addToast);

  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<ProductSize>('M');
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedImage(product.images[0] || '');
      setSelectedColor(product.colors[0]?.name || product.defaultColor);
      setSelectedSize(product.sizes[0] || 'M');
      setQuantity(1);
      setIsAdded(false);
    }
  }, [product]);

  if (!product) return null;

  const discount = calculateDiscount(product.price, product.originalPrice);

  const handleAddToCart = () => {
    addItem(product, selectedColor, selectedSize, quantity);
    setIsAdded(true);
    addToast('Added to bag!', `${product.name} (${selectedColor}, ${selectedSize})`, 'success');
    setTimeout(() => {
      setIsAdded(false);
      closeQuickView();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={closeQuickView}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div
        className="relative bg-vats-surface border border-vats-border w-full max-w-3xl overflow-hidden rounded-sm shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        <button
          type="button"
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-20 p-2 text-vats-muted hover:text-white bg-vats-black/60 rounded-full transition-colors"
          aria-label="Close quick view"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Product Images */}
          <div className="p-6 bg-vats-black/40 flex flex-col justify-between">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm bg-vats-charcoal">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-300"
              />
              {discount > 0 && (
                <span className="absolute top-3 left-3 bg-vats-lime text-vats-black font-extrabold text-[10px] px-2 py-0.5 rounded-sm uppercase tracking-wider font-mono">
                  {discount}% OFF
                </span>
              )}
            </div>

            {/* Thumbnail selector */}
            {product.images.length > 1 && (
              <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImage(img)}
                    className={`w-14 h-16 rounded-sm overflow-hidden border-2 transition-all flex-shrink-0 ${
                      selectedImage === img ? 'border-vats-lime' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Details & Purchase Form */}
          <div className="p-6 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-vats-lime font-mono uppercase tracking-wider">
                <span>{product.sport}</span>
                <span>•</span>
                <span>{product.subCategory}</span>
              </div>

              <h2 className="font-display text-2xl sm:text-3xl text-vats-offwhite tracking-wider mt-1">
                {product.name}
              </h2>
              <p className="text-xs text-vats-muted mt-1">{product.subtitle}</p>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2 text-xs">
                <div className="flex items-center text-vats-lime">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="font-bold ml-1 font-mono">{product.rating}</span>
                </div>
                <span className="text-vats-muted">({product.reviewCount} reviews)</span>
              </div>

              {/* Pricing */}
              <div className="flex items-baseline gap-3 mt-3">
                <span className="text-2xl font-extrabold text-vats-lime font-mono">
                  {formatCurrency(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-vats-muted line-through font-mono">
                    {formatCurrency(product.originalPrice)}
                  </span>
                )}
              </div>

              {/* Colors */}
              <div className="mt-4">
                <label className="text-xs font-bold uppercase tracking-wider text-vats-muted block mb-2">
                  Color: <span className="text-vats-offwhite">{selectedColor}</span>
                </label>
                <div className="flex gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setSelectedColor(c.name)}
                      className={`w-8 h-8 rounded-full border-2 transition-all p-0.5 flex items-center justify-center ${
                        selectedColor === c.name ? 'border-vats-lime scale-110' : 'border-vats-border hover:border-vats-muted'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    >
                      {selectedColor === c.name && (
                        <Check className={`w-3.5 h-3.5 ${c.hex === '#FFFFFF' || c.hex === '#C7FF35' ? 'text-black' : 'text-white'}`} />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-vats-muted">
                    Select Size
                  </label>
                  <Link
                    to={`/product/${product.slug}`}
                    onClick={closeQuickView}
                    className="text-[11px] text-vats-lime hover:underline"
                  >
                    Size Guide
                  </Link>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedSize(s)}
                      className={`px-3 py-1.5 text-xs font-bold uppercase border transition-all rounded-sm font-mono ${
                        selectedSize === s
                          ? 'border-vats-lime bg-vats-lime text-vats-black'
                          : 'border-vats-border text-vats-offwhite hover:border-vats-muted bg-vats-black'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="space-y-3 pt-3 border-t border-vats-border">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={isAdded}
                className={`w-full py-3.5 font-bold uppercase text-xs tracking-widest transition-all rounded-sm flex items-center justify-center gap-2 ${
                  isAdded
                    ? 'bg-emerald-500 text-white'
                    : 'bg-vats-lime hover:bg-vats-limeHover text-vats-black shadow-lg shadow-vats-lime/10'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" /> Added to Bag!
                  </>
                ) : (
                  <>Add to Bag — {formatCurrency(product.price)}</>
                )}
              </button>

              <Link
                to={`/product/${product.slug}`}
                onClick={closeQuickView}
                className="w-full py-2.5 bg-transparent border border-vats-border hover:border-vats-lime text-vats-offwhite text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors rounded-sm"
              >
                View Full Product Details <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <div className="flex items-center justify-center gap-2 text-[10px] text-vats-muted text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-vats-lime" />
                <span>30-Day Risk-Free Returns & Express Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
