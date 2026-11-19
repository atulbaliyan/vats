import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, Tag, ShieldCheck, Truck } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { formatCurrency } from '../utils/formatters';

export const CartPage: React.FC = () => {
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const clearCart = useCartStore((s) => s.clearCart);
  const getSubtotal = useCartStore((s) => s.getSubtotal);
  const getDiscountAmount = useCartStore((s) => s.getDiscountAmount);
  const getShippingFee = useCartStore((s) => s.getShippingFee);
  const getFinalTotal = useCartStore((s) => s.getFinalTotal);
  const couponCode = useCartStore((s) => s.couponCode);
  const applyCoupon = useCartStore((s) => s.applyCoupon);
  const removeCoupon = useCartStore((s) => s.removeCoupon);

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ text: string; isError: boolean } | null>(null);

  const navigate = useNavigate();

  const subtotal = getSubtotal();
  const discount = getDiscountAmount();
  const shipping = getShippingFee();
  const finalTotal = getFinalTotal();

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const res = applyCoupon(inputCoupon);
    setCouponMsg({ text: res.message, isError: !res.success });
    if (res.success) setInputCoupon('');
  };

  if (items.length === 0) {
    return (
      <div className="py-24 bg-vats-black min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-20 h-20 rounded-full bg-vats-charcoal border border-vats-border flex items-center justify-center text-vats-muted mb-6">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="font-display text-4xl sm:text-5xl text-vats-offwhite tracking-wider uppercase mb-2">
          YOUR SHOPPING BAG IS EMPTY
        </h1>
        <p className="text-sm text-vats-muted max-w-md mb-8">
          Explore our latest drops, training tees, and custom team kits to start building your gear setup.
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
              ORDER REVIEW
            </span>
            <h1 className="font-display text-4xl sm:text-6xl tracking-tight leading-none uppercase">
              Shopping Bag ({items.reduce((acc, i) => acc + i.quantity, 0)})
            </h1>
          </div>
          <button
            type="button"
            onClick={clearCart}
            className="text-xs text-vats-muted hover:text-red-400 transition-colors underline font-mono"
          >
            Clear Entire Bag
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Items List (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row gap-5 p-4 sm:p-5 bg-vats-surface border border-vats-border rounded-sm group hover:border-vats-muted transition-colors"
              >
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-24 h-32 sm:w-28 sm:h-36 object-cover rounded-sm border border-vats-border flex-shrink-0"
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <span className="text-[10px] font-mono text-vats-lime uppercase tracking-widest">
                          {item.product.sport}
                        </span>
                        <h3 className="font-bold text-base text-vats-offwhite hover:text-vats-lime transition-colors">
                          <Link to={`/product/${item.product.slug}`}>{item.product.name}</Link>
                        </h3>
                      </div>
                      <span className="text-base font-bold text-vats-lime font-mono">
                        {formatCurrency(item.product.price * item.quantity)}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 mt-2 text-xs text-vats-muted">
                      <span>Color: <strong className="text-vats-offwhite">{item.selectedColor}</strong></span>
                      <span>Size: <strong className="text-vats-offwhite">{item.selectedSize}</strong></span>
                      <span>Unit: <strong className="text-vats-offwhite font-mono">{formatCurrency(item.product.price)}</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-vats-border/50">
                    {/* Quantity Stepper */}
                    <div className="flex items-center border border-vats-border bg-vats-charcoal rounded-sm">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2.5 py-1 text-vats-muted hover:text-white"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-mono font-bold text-vats-offwhite">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2.5 py-1 text-vats-muted hover:text-white"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="text-xs text-vats-muted hover:text-red-400 flex items-center gap-1 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Box (4 cols) */}
          <div className="lg:col-span-4 bg-vats-surface border border-vats-border p-6 rounded-sm space-y-5 sticky top-28">
            <h3 className="font-display text-2xl tracking-wider text-vats-offwhite uppercase pb-3 border-b border-vats-border">
              Order Summary
            </h3>

            {/* Promo Code Form */}
            <form onSubmit={handleApplyCoupon} className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-vats-muted block">
                Have a Promo Code?
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-vats-muted" />
                  <input
                    type="text"
                    value={inputCoupon}
                    onChange={(e) => setInputCoupon(e.target.value)}
                    placeholder='e.g. "BEYOND10"'
                    className="w-full pl-9 pr-3 py-2 bg-vats-black border border-vats-border text-xs text-vats-offwhite focus:border-vats-lime focus:outline-none uppercase rounded-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-vats-charcoal hover:bg-vats-border text-xs font-bold uppercase tracking-wider transition-colors rounded-sm"
                >
                  Apply
                </button>
              </div>

              {couponMsg && (
                <p className={`text-xs font-medium ${couponMsg.isError ? 'text-red-400' : 'text-vats-lime'}`}>
                  {couponMsg.text}
                </p>
              )}

              {couponCode && !couponMsg && (
                <div className="flex items-center justify-between text-xs text-vats-lime bg-vats-lime/10 px-2.5 py-1.5 rounded">
                  <span>Code Applied: <strong>{couponCode}</strong></span>
                  <button
                    type="button"
                    onClick={removeCoupon}
                    className="text-red-400 hover:underline font-mono text-[11px]"
                  >
                    Remove
                  </button>
                </div>
              )}
            </form>

            {/* Calculations Breakdown */}
            <div className="space-y-2.5 text-xs text-vats-muted border-t border-vats-border pt-4">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="text-vats-offwhite font-mono">{formatCurrency(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-vats-lime">
                  <span>Promo Discount</span>
                  <span className="font-mono">-{formatCurrency(discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Express Delivery</span>
                <span className="font-mono">
                  {shipping === 0 ? <strong className="text-vats-lime">FREE</strong> : formatCurrency(shipping)}
                </span>
              </div>
              <div className="flex justify-between text-lg font-bold text-vats-offwhite border-t border-vats-border pt-3">
                <span>Grand Total</span>
                <span className="text-vats-lime font-mono">{formatCurrency(finalTotal)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate('/checkout')}
              className="w-full py-4 bg-vats-lime hover:bg-vats-limeHover text-vats-black font-extrabold uppercase text-xs tracking-widest flex items-center justify-center gap-2 transition-all rounded-sm shadow-xl shadow-vats-lime/10"
            >
              Proceed to Demo Checkout <ArrowRight className="w-4 h-4" />
            </button>

            <div className="space-y-2 pt-2 border-t border-vats-border/50 text-[11px] text-vats-muted">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-vats-lime flex-shrink-0" />
                <span>Pan-India express delivery in 2-4 business days</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-vats-lime flex-shrink-0" />
                <span>30-Day returns with 100% money back guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
