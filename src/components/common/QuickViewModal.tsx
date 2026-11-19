import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { useUIStore } from '../../store/useUIStore';
import { useCartStore } from '../../store/useCartStore';
import { formatCurrency, calculateDiscount } from '../../utils/formatters';
import { ProductSize } from '../../types';
import { AccessibleModal } from '../ui/Dialog';

export const QuickViewModal: React.FC = () => {
  const product = useUIStore((s) => s.quickViewProduct);
  const closeQuickView = useUIStore((s) => s.closeQuickView);
  const addItem = useCartStore((s) => s.addItem);
  const addToast = useUIStore((s) => s.addToast);

  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<ProductSize>('M');
  const [quantity] = useState<number>(1);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedImage(product.images[0] || '');
      setSelectedColor(product.colors[0]?.name || product.defaultColor);
      setSelectedSize(product.sizes[0] || 'M');
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
    <AccessibleModal
      isOpen={!!product}
      onClose={closeQuickView}
      title={`Quick View: ${product.name}`}
      description={`Select colorway and size for ${product.name} and add to bag`}
      maxWidthClassName="max-w-3xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left: Product Images */}
        <div className="p-6 bg-vats-black/40 flex flex-col justify-between">
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm bg-vats-charcoal">
            <img
              src={selectedImage}
              alt={product.name}
              width={600}
              height={800}
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
            <div className="flex gap-2 mt-4 overflow-x-auto pb-1" role="tablist" aria-label="Product thumbnails">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  role="tab"
                  aria-selected={selectedImage === img}
                  aria-label={`View photo ${idx + 1}`}
                  onClick={() => setSelectedImage(img)}
                  className={`w-14 h-16 rounded-sm overflow-hidden border-2 transition-all flex-shrink-0 focus-visible:ring-2 focus-visible:ring-vats-lime focus-visible:outline-none ${
                    selectedImage === img
                      ? 'border-vats-lime'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" width={56} height={64} className="w-full h-full object-cover" />
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
              <span aria-hidden="true">•</span>
              <span>{product.subCategory}</span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl text-vats-offwhite tracking-wider mt-1">
              {product.name}
            </h2>
            <p className="text-xs text-vats-muted mt-1">{product.subtitle}</p>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-2 text-xs">
              <div className="flex items-center text-vats-lime" aria-label={`Rating: ${product.rating} out of 5 stars`}>
                <Star className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
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
              <span id="quickview-color-label" className="text-xs font-bold uppercase tracking-wider text-vats-muted block mb-2">
                Color: <strong className="text-vats-offwhite">{selectedColor}</strong>
              </span>
              <div
                role="radiogroup"
                aria-labelledby="quickview-color-label"
                className="flex gap-2"
              >
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    role="radio"
                    aria-checked={selectedColor === c.name}
                    aria-label={`Color option: ${c.name}`}
                    onClick={() => setSelectedColor(c.name)}
                    className={`w-8 h-8 rounded-full border-2 transition-all p-0.5 flex items-center justify-center focus-visible:ring-2 focus-visible:ring-vats-lime focus-visible:outline-none ${
                      selectedColor === c.name
                        ? 'border-vats-lime scale-110'
                        : 'border-vats-border hover:border-vats-muted'
                    }`}
                    style={{ backgroundColor: c.hex }}
                  >
                    {selectedColor === c.name && (
                      <Check
                        className={`w-3.5 h-3.5 ${
                          c.hex === '#FFFFFF' || c.hex === '#C7FF35' ? 'text-black' : 'text-white'
                        }`}
                        aria-hidden="true"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <span id="quickview-size-label" className="text-xs font-bold uppercase tracking-wider text-vats-muted">
                  Select Size
                </span>
                <Link
                  to={`/product/${product.slug}`}
                  onClick={closeQuickView}
                  className="text-[11px] text-vats-lime hover:underline focus-visible:ring-1 focus-visible:ring-vats-lime focus-visible:outline-none rounded-sm"
                >
                  Size Guide
                </Link>
              </div>
              <div
                role="radiogroup"
                aria-labelledby="quickview-size-label"
                className="flex flex-wrap gap-2"
              >
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    role="radio"
                    aria-checked={selectedSize === s}
                    aria-label={`Size ${s}`}
                    onClick={() => setSelectedSize(s)}
                    className={`px-3 py-1.5 text-xs font-bold uppercase border transition-all rounded-sm font-mono focus-visible:ring-2 focus-visible:ring-vats-lime focus-visible:outline-none ${
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
              className={`w-full py-3.5 font-bold uppercase text-xs tracking-widest transition-all rounded-sm flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none ${
                isAdded
                  ? 'bg-emerald-500 text-white'
                  : 'bg-vats-lime hover:bg-vats-limeHover text-vats-black shadow-lg shadow-vats-lime/10'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4" aria-hidden="true" /> Added to Bag!
                </>
              ) : (
                <>Add to Bag — {formatCurrency(product.price)}</>
              )}
            </button>

            <Link
              to={`/product/${product.slug}`}
              onClick={closeQuickView}
              className="w-full py-2.5 bg-transparent border border-vats-border hover:border-vats-lime text-vats-offwhite text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors rounded-sm focus-visible:ring-2 focus-visible:ring-vats-lime focus-visible:outline-none"
            >
              View Full Product Details <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>

            <div className="flex items-center justify-center gap-2 text-[10px] text-vats-muted text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-vats-lime" aria-hidden="true" />
              <span>30-Day Risk-Free Returns & Express Delivery</span>
            </div>
          </div>
        </div>
      </div>
    </AccessibleModal>
  );
};
