import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Star,
  Heart,
  ShoppingBag,
  Check,
  ChevronDown,
  ShieldCheck,
  Truck,
  RotateCcw,
  Ruler,
  X,
  Share2,
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductSize } from '../types';
import { formatCurrency, calculateDiscount } from '../utils/formatters';
import { useCartStore } from '../store/useCartStore';
import { useWishlistStore } from '../store/useWishlistStore';
import { useUIStore } from '../store/useUIStore';
import { ProductCard } from '../components/products/ProductCard';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = PRODUCTS.find((p) => p.slug === slug) || PRODUCTS[0];

  const [activeImage, setActiveImage] = useState<string>(product.images[0]);
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors[0]?.name || product.defaultColor
  );
  const [selectedSize, setSelectedSize] = useState<ProductSize>(product.sizes[0] || 'M');
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdded, setIsAdded] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  // Accordion states
  const [openAccordion, setOpenAccordion] = useState<string | null>('features');

  const addItem = useCartStore((s) => s.addItem);
  const isInWishlist = useWishlistStore((s) => s.isInWishlist(product.id));
  const toggleWishlist = useWishlistStore((s) => s.toggleWishlist);
  const addToast = useUIStore((s) => s.addToast);

  // Sync state when slug changes
  useEffect(() => {
    setActiveImage(product.images[0]);
    setSelectedColor(product.colors[0]?.name || product.defaultColor);
    setSelectedSize(product.sizes[0] || 'M');
    setQuantity(1);
    setIsAdded(false);
    window.scrollTo(0, 0);
  }, [product]);

  const discount = calculateDiscount(product.price, product.originalPrice);

  // Related products
  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.sport === product.sport)
  ).slice(0, 4);

  const handleAddToCart = () => {
    addItem(product, selectedColor, selectedSize, quantity);
    setIsAdded(true);
    addToast('Added to bag!', `${product.name} (${selectedColor}, ${selectedSize})`, 'success');
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleWishlistToggle = () => {
    const added = toggleWishlist(product.id);
    if (added) {
      addToast('Saved to Wishlist', product.name, 'success');
    } else {
      addToast('Removed from Wishlist', product.name, 'info');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.subtitle,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      addToast('Link Copied', 'Product link copied to clipboard', 'info');
    }
  };

  return (
    <div className="py-10 bg-vats-black min-h-screen text-vats-offwhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="text-xs text-vats-muted mb-8 flex items-center gap-2">
          <Link to="/" className="hover:text-vats-lime transition-colors">Home</Link>
          <span>/</span>
          <Link to={`/${product.category}`} className="hover:text-vats-lime transition-colors uppercase">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-vats-offwhite font-medium truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Image Gallery (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm bg-vats-charcoal border border-vats-border">
              <img
                src={activeImage}
                alt={product.name}
                width={800}
                height={1067}
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover transition-all duration-500"
              />
              {discount > 0 && (
                <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-mono font-bold px-2.5 py-1 rounded-sm uppercase tracking-wider">
                  {discount}% OFF
                </span>
              )}
            </div>

            {/* Thumbnail Selectors */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImage(img)}
                    className={`w-20 h-24 rounded-sm overflow-hidden border-2 transition-all flex-shrink-0 ${
                      activeImage === img ? 'border-vats-lime scale-100' : 'border-vats-border opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      width={80}
                      height={96}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Purchasing Controls & Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              {/* Category & Tag */}
              <div className="flex items-center justify-between text-xs font-mono text-vats-lime uppercase tracking-wider mb-2">
                <span>{product.sport} // {product.subCategory}</span>
                <button
                  type="button"
                  onClick={handleShare}
                  className="text-vats-muted hover:text-vats-lime transition-colors p-1"
                  title="Share product"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl text-vats-offwhite tracking-tight leading-tight">
                {product.name}
              </h1>
              <p className="text-xs text-vats-muted mt-1 leading-relaxed">
                {product.subtitle}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-3 text-xs">
                <div className="flex items-center text-vats-lime">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-bold ml-1 font-mono">{product.rating}</span>
                </div>
                <span className="text-vats-muted">
                  ({product.reviewCount} verified athlete reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mt-4">
                <span className="text-3xl font-extrabold text-vats-lime font-mono">
                  {formatCurrency(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-base text-vats-muted line-through font-mono">
                    {formatCurrency(product.originalPrice)}
                  </span>
                )}
                <span className="text-xs text-vats-muted font-normal">
                  (Inclusive of all taxes)
                </span>
              </div>
            </div>

            {/* Colors */}
            <div className="space-y-2 border-t border-vats-border pt-4">
              <label className="text-xs font-bold uppercase tracking-wider text-vats-muted block">
                Selected Color: <strong className="text-vats-offwhite">{selectedColor}</strong>
              </label>
              <div className="flex gap-2.5">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setSelectedColor(c.name)}
                    className={`w-9 h-9 rounded-full border-2 transition-all p-0.5 flex items-center justify-center ${
                      selectedColor === c.name
                        ? 'border-vats-lime scale-110'
                        : 'border-vats-border hover:border-vats-muted'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  >
                    {selectedColor === c.name && (
                      <Check className={`w-4 h-4 ${c.hex === '#FFFFFF' || c.hex === '#C7FF35' ? 'text-black' : 'text-white'}`} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="space-y-2 border-t border-vats-border pt-4">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-wider text-vats-muted">
                  Select Size
                </label>
                <button
                  type="button"
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-xs text-vats-lime hover:underline flex items-center gap-1 font-medium"
                >
                  <Ruler className="w-3.5 h-3.5" /> Size Guide
                </button>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSelectedSize(s)}
                    className={`py-3 text-xs font-mono font-bold uppercase border transition-all rounded-sm ${
                      selectedSize === s
                        ? 'border-vats-lime bg-vats-lime text-vats-black'
                        : 'border-vats-border bg-vats-surface text-vats-offwhite hover:border-vats-muted'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & CTA Buttons */}
            <div className="space-y-3 border-t border-vats-border pt-4">
              <div className="flex items-center gap-4">
                {/* Quantity Stepper */}
                <div className="flex items-center border border-vats-border bg-vats-surface rounded-sm">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3.5 py-3 text-vats-muted hover:text-white"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-3 font-mono font-bold text-xs">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3.5 py-3 text-vats-muted hover:text-white"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Add to Bag */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={isAdded}
                  className={`flex-1 py-3.5 font-extrabold uppercase text-xs tracking-widest transition-all rounded-sm flex items-center justify-center gap-2 ${
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
                    <>
                      <ShoppingBag className="w-4 h-4" /> Add to Bag — {formatCurrency(product.price * quantity)}
                    </>
                  )}
                </button>

                {/* Wishlist Heart */}
                <button
                  type="button"
                  onClick={handleWishlistToggle}
                  className={`p-3.5 rounded-sm border transition-all ${
                    isInWishlist
                      ? 'bg-red-500 text-white border-red-500'
                      : 'bg-vats-surface border-vats-border text-vats-offwhite hover:border-red-400 hover:text-red-400'
                  }`}
                  aria-label={isInWishlist ? 'Remove from wishlist' : 'Save to wishlist'}
                >
                  <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Value Props */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-[10px] text-vats-muted text-center border-t border-vats-border/50">
                <div className="flex flex-col items-center gap-1 p-2 bg-vats-surface rounded-sm">
                  <Truck className="w-3.5 h-3.5 text-vats-lime" />
                  <span>Free Express (₹1999+)</span>
                </div>
                <div className="flex flex-col items-center gap-1 p-2 bg-vats-surface rounded-sm">
                  <RotateCcw className="w-3.5 h-3.5 text-vats-lime" />
                  <span>30-Day Easy Returns</span>
                </div>
                <div className="flex flex-col items-center gap-1 p-2 bg-vats-surface rounded-sm">
                  <ShieldCheck className="w-3.5 h-3.5 text-vats-lime" />
                  <span>Authentic VATS Lab</span>
                </div>
              </div>
            </div>

            {/* Accordions (Product Description, Features, Fabric Care) */}
            <div className="border-t border-vats-border pt-4 space-y-2">
              {/* Features Accordion */}
              <div className="border border-vats-border rounded-sm bg-vats-surface overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenAccordion(openAccordion === 'features' ? null : 'features')}
                  className="w-full p-3.5 text-left text-xs font-bold uppercase tracking-wider flex justify-between items-center text-vats-offwhite"
                >
                  <span>Technical Specifications & Features</span>
                  <ChevronDown
                    className={`w-4 h-4 text-vats-lime transition-transform ${
                      openAccordion === 'features' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openAccordion === 'features' && (
                  <div className="p-3.5 pt-0 text-xs text-vats-muted border-t border-vats-border/40 space-y-2">
                    <p className="leading-relaxed">{product.description}</p>
                    <ul className="list-disc pl-4 space-y-1 text-vats-offwhite/90">
                      {product.features.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Fabric & Care Accordion */}
              <div className="border border-vats-border rounded-sm bg-vats-surface overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenAccordion(openAccordion === 'care' ? null : 'care')}
                  className="w-full p-3.5 text-left text-xs font-bold uppercase tracking-wider flex justify-between items-center text-vats-offwhite"
                >
                  <span>Fabric Composition & Care Instructions</span>
                  <ChevronDown
                    className={`w-4 h-4 text-vats-lime transition-transform ${
                      openAccordion === 'care' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openAccordion === 'care' && (
                  <div className="p-3.5 pt-0 text-xs text-vats-muted border-t border-vats-border/40 space-y-1">
                    <ul className="list-disc pl-4 space-y-1 text-vats-offwhite/90">
                      {product.fabricCare.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Size Guide Modal */}
        {isSizeGuideOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setIsSizeGuideOpen(false)}
            />
            <div className="relative bg-vats-surface border border-vats-border w-full max-w-lg p-6 rounded-sm z-10 space-y-4">
              <div className="flex justify-between items-center border-b border-vats-border pb-3">
                <h3 className="font-display text-2xl text-vats-offwhite tracking-wider">
                  VATS SIZE GUIDE (INCHES)
                </h3>
                <button
                  type="button"
                  onClick={() => setIsSizeGuideOpen(false)}
                  className="p-1 text-vats-muted hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="overflow-x-auto text-xs">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-vats-border text-vats-lime font-mono">
                      <th className="py-2">Size</th>
                      <th className="py-2">Chest</th>
                      <th className="py-2">Waist</th>
                      <th className="py-2">Length</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-vats-border/50 text-vats-offwhite/90">
                    <tr><td className="py-2 font-bold font-mono">S</td><td>36 - 38"</td><td>28 - 30"</td><td>27.5"</td></tr>
                    <tr><td className="py-2 font-bold font-mono">M</td><td>39 - 41"</td><td>31 - 33"</td><td>28.5"</td></tr>
                    <tr><td className="py-2 font-bold font-mono">L</td><td>42 - 44"</td><td>34 - 36"</td><td>29.5"</td></tr>
                    <tr><td className="py-2 font-bold font-mono">XL</td><td>45 - 47"</td><td>37 - 39"</td><td>30.5"</td></tr>
                    <tr><td className="py-2 font-bold font-mono">XXL</td><td>48 - 50"</td><td>40 - 42"</td><td>31.5"</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] text-vats-muted">
                Fits true to athletic performance size. For an oversized streetwear aesthetic, consider sizing up one size.
              </p>
            </div>
          </div>
        )}

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-12 border-t border-vats-border space-y-6">
            <h3 className="font-display text-3xl sm:text-4xl text-vats-offwhite tracking-tight uppercase">
              You May Also Like
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
