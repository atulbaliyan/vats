import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { formatCurrency } from '../../utils/formatters';
import { AccessibleDrawer } from '../ui/Dialog';

export const CartDrawer: React.FC = () => {
  const isDrawerOpen = useCartStore((s) => s.isDrawerOpen);
  const closeDrawer = useCartStore((s) => s.closeDrawer);
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const getSubtotal = useCartStore((s) => s.getSubtotal);
  const getDiscountAmount = useCartStore((s) => s.getDiscountAmount);
  const getShippingFee = useCartStore((s) => s.getShippingFee);
  const getFinalTotal = useCartStore((s) => s.getFinalTotal);
  const couponCode = useCartStore((s) => s.couponCode);
  const applyCoupon = useCartStore((s) => s.applyCoupon);
  const removeCoupon = useCartStore((s) => s.removeCoupon);

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  const navigate = useNavigate();

  const subtotal = getSubtotal();
  const discount = getDiscountAmount();
  const shipping = getShippingFee();
  const finalTotal = getFinalTotal();

  // Free shipping threshold: ₹1,999
  const freeShippingThreshold = 1999;
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const amountNeeded = freeShippingThreshold - subtotal;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const res = applyCoupon(inputCoupon);
    if (res.success) {
      setCouponSuccess(res.message);
      setCouponError('');
      setInputCoupon('');
    } else {
      setCouponError(res.message);
      setCouponSuccess('');
    }
  };

  const handleProceedToCheckout = () => {
    closeDrawer();
    navigate('/checkout');
  };

  return (
    <AccessibleDrawer
      isOpen={isDrawerOpen}
      onClose={closeDrawer}
      title={`Your Shopping Bag (${items.reduce((acc, i) => acc + i.quantity, 0)} items)`}
      description="Review items in your shopping bag, apply promotional discounts, and proceed to checkout"
      side="right"
      widthClassName="max-w-md"
    >
      {/* Header */}
      <div className="p-4 border-b border-vats-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-vats-lime" aria-hidden="true" />
          <h2 className="font-display text-2xl tracking-wider text-vats-offwhite">
            YOUR BAG ({items.reduce((acc, i) => acc + i.quantity, 0)})
          </h2>
        </div>
        <button
          type="button"
          onClick={closeDrawer}
          className="p-1.5 text-vats-muted hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-vats-lime focus-visible:outline-none rounded-sm"
          aria-label="Close cart drawer"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Free Shipping Progress Indicator */}
      <div
        className="bg-vats-charcoal/80 px-4 py-3 border-b border-vats-border text-xs"
        role="region"
        aria-label="Free shipping status"
      >
        {amountNeeded > 0 ? (
          <p className="text-vats-offwhite/90 mb-1.5">
            Add <span className="font-bold text-vats-lime">{formatCurrency(amountNeeded)}</span> more for{' '}
            <span className="font-bold">FREE Express Delivery</span>
          </p>
        ) : (
          <p className="text-vats-lime font-bold mb-1.5 flex items-center gap-1.5">
            <span>🎉</span> Congratulations! You qualify for FREE Express Delivery
          </p>
        )}
        <div
          className="w-full bg-vats-black h-1.5 rounded-full overflow-hidden"
          role="progressbar"
          aria-valuenow={Math.round(freeShippingProgress)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Free shipping threshold progress"
        >
          <div
            className="bg-vats-lime h-full transition-all duration-300"
            style={{ width: `${freeShippingProgress}%` }}
          />
        </div>
      </div>

      {/* Items List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4" role="feed" aria-label="Cart items list">
        {items.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
            <div className="w-16 h-16 rounded-full bg-vats-charcoal border border-vats-border flex items-center justify-center text-vats-muted">
              <ShoppingBag className="w-8 h-8" aria-hidden="true" />
            </div>
            <div className="space-y-1">
              <h3 className="font-display text-2xl text-vats-offwhite tracking-wider">
                YOUR BAG IS EMPTY
              </h3>
              <p className="text-xs text-vats-muted max-w-xs">
                Upgrade your gear with our high-performance training kits and oversized drops.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                closeDrawer();
                navigate('/shop');
              }}
              className="mt-4 px-6 py-3 bg-vats-lime text-vats-black font-bold uppercase text-xs tracking-widest hover:bg-vats-limeHover transition-colors rounded-sm focus-visible:ring-2 focus-visible:ring-vats-lime focus-visible:outline-none"
            >
              Shop Now
            </button>
          </div>
        ) : (
          items.map((item) => (
            <article
              key={item.id}
              className="flex gap-4 p-3 bg-vats-black/50 border border-vats-border rounded-sm group hover:border-vats-muted transition-colors"
              aria-label={`${item.product.name}, Size ${item.selectedSize}, Color ${item.selectedColor}`}
            >
              {/* Product Thumbnail */}
              <img
                src={item.product.images[0]}
                alt={item.product.name}
                width={80}
                height={96}
                className="w-20 h-24 object-cover rounded-sm border border-vats-border flex-shrink-0"
              />

              {/* Details */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start gap-2">
                    <Link
                      to={`/product/${item.product.slug}`}
                      onClick={closeDrawer}
                      className="text-xs font-bold text-vats-offwhite hover:text-vats-lime transition-colors line-clamp-1 focus-visible:ring-2 focus-visible:ring-vats-lime focus-visible:outline-none rounded-sm"
                    >
                      {item.product.name}
                    </Link>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="text-vats-muted hover:text-red-400 transition-colors p-1 focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:outline-none rounded-sm"
                      aria-label={`Remove ${item.product.name} from cart`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-3 mt-1 text-[11px] text-vats-muted">
                    <span>
                      Color: <strong className="text-vats-offwhite">{item.selectedColor}</strong>
                    </span>
                    <span>
                      Size: <strong className="text-vats-offwhite">{item.selectedSize}</strong>
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-3">
                  {/* Quantity Selector */}
                  <div
                    className="flex items-center border border-vats-border bg-vats-charcoal rounded-sm"
                    role="group"
                    aria-label={`Quantity selector for ${item.product.name}`}
                  >
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-2 py-1 text-vats-muted hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-vats-lime focus-visible:outline-none"
                      aria-label={`Decrease quantity of ${item.product.name}`}
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span
                      className="px-2 text-xs font-mono font-bold text-vats-offwhite"
                      aria-live="polite"
                    >
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 text-vats-muted hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-vats-lime focus-visible:outline-none"
                      aria-label={`Increase quantity of ${item.product.name}`}
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Price */}
                  <span className="text-sm font-bold text-vats-lime font-mono">
                    {formatCurrency(item.product.price * item.quantity)}
                  </span>
                </div>
              </div>
            </article>
          ))
        )}
      </div>

      {/* Footer calculations & checkout */}
      {items.length > 0 && (
        <div className="p-4 border-t border-vats-border bg-vats-black space-y-3">
          {/* Promo Code Form */}
          <form onSubmit={handleApplyCoupon} className="space-y-1">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Tag
                  className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-vats-muted"
                  aria-hidden="true"
                />
                <input
                  type="text"
                  value={inputCoupon}
                  onChange={(e) => setInputCoupon(e.target.value)}
                  placeholder='Promo code (try "BEYOND10")'
                  aria-label="Promotional coupon code"
                  aria-invalid={couponError ? 'true' : 'false'}
                  aria-describedby={couponError ? 'coupon-error' : couponSuccess ? 'coupon-success' : undefined}
                  className="w-full pl-8 pr-3 py-2 bg-vats-surface border border-vats-border text-xs text-vats-offwhite focus:border-vats-lime focus-visible:ring-2 focus-visible:ring-vats-lime focus-visible:outline-none uppercase rounded-sm"
                />
              </div>
              <button
                type="submit"
                className="px-3 py-2 bg-vats-charcoal hover:bg-vats-border text-xs font-bold uppercase tracking-wider text-vats-offwhite transition-colors rounded-sm focus-visible:ring-2 focus-visible:ring-vats-lime focus-visible:outline-none"
              >
                Apply
              </button>
            </div>

            {couponSuccess && (
              <p id="coupon-success" role="status" className="text-[11px] text-vats-lime font-medium">
                {couponSuccess}
              </p>
            )}
            {couponError && (
              <p id="coupon-error" role="alert" className="text-[11px] text-red-400 font-medium">
                {couponError}
              </p>
            )}
            {couponCode && !couponSuccess && (
              <div className="flex items-center justify-between text-[11px] text-vats-lime bg-vats-lime/10 px-2 py-1 rounded">
                <span>
                  Applied: <strong>{couponCode}</strong>
                </span>
                <button
                  type="button"
                  onClick={removeCoupon}
                  className="text-red-400 hover:underline font-mono focus-visible:ring-1 focus-visible:ring-red-400 focus-visible:outline-none"
                  aria-label={`Remove coupon code ${couponCode}`}
                >
                  Remove
                </button>
              </div>
            )}
          </form>

          {/* Calculations Breakdown */}
          <div className="space-y-1.5 text-xs text-vats-muted border-t border-vats-border/50 pt-3">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-vats-offwhite font-mono">{formatCurrency(subtotal)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-vats-lime">
                <span>Discount</span>
                <span className="font-mono">-{formatCurrency(discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Delivery</span>
              <span className="font-mono">
                {shipping === 0 ? <strong className="text-vats-lime">FREE</strong> : formatCurrency(shipping)}
              </span>
            </div>
            <div className="flex justify-between text-base font-bold text-vats-offwhite border-t border-vats-border pt-2">
              <span>Total</span>
              <span className="text-vats-lime font-mono">{formatCurrency(finalTotal)}</span>
            </div>
          </div>

          {/* Checkout Action Button */}
          <button
            type="button"
            onClick={handleProceedToCheckout}
            className="w-full py-3.5 bg-vats-lime hover:bg-vats-limeHover text-vats-black font-extrabold uppercase text-xs tracking-widest flex items-center justify-center gap-2 transition-all rounded-sm shadow-lg shadow-vats-lime/10 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
          >
            Proceed to Checkout <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>

          <div className="flex items-center justify-center gap-2 text-[10px] text-vats-muted text-center pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-vats-lime" aria-hidden="true" />
            <span>Demonstration checkout with secure demo simulation</span>
          </div>
        </div>
      )}
    </AccessibleDrawer>
  );
};
