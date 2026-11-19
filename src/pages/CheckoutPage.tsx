import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  CheckCircle2,
  Truck,
  CreditCard,
  QrCode,
  DollarSign,
  ArrowRight,
  ShoppingBag,
} from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { formatCurrency } from '../utils/formatters';

export const CheckoutPage: React.FC = () => {
  const items = useCartStore((s) => s.items);
  const getSubtotal = useCartStore((s) => s.getSubtotal);
  const getDiscountAmount = useCartStore((s) => s.getDiscountAmount);
  const getShippingFee = useCartStore((s) => s.getShippingFee);
  const getFinalTotal = useCartStore((s) => s.getFinalTotal);
  const clearCart = useCartStore((s) => s.clearCart);

  const [address, setAddress] = useState({
    fullName: 'Arjun Mehra',
    email: 'arjun.mehra@example.com',
    phone: '+91 98765 12345',
    street: 'Plot 42, Sector 18, Cyber City',
    city: 'Gurugram',
    state: 'Haryana',
    pincode: '122002',
  });

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');


  const subtotal = getSubtotal();
  const discount = getDiscountAmount();
  const shipping = getShippingFee();
  const finalTotal = getFinalTotal();

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="py-24 bg-vats-black min-h-[70vh] flex flex-col items-center justify-center text-center px-4 text-vats-offwhite">
        <div className="w-16 h-16 rounded-full bg-vats-charcoal border border-vats-border flex items-center justify-center text-vats-muted mb-4">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="font-display text-3xl uppercase tracking-wider mb-2">
          Your Shopping Bag is Empty
        </h2>
        <p className="text-xs text-vats-muted mb-6">
          Add items to your bag before heading to checkout.
        </p>
        <Link
          to="/shop"
          className="px-6 py-3 bg-vats-lime text-vats-black font-bold uppercase text-xs tracking-wider rounded-sm"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const generatedOrder = `VATS-${Math.floor(100000 + Math.random() * 900000)}-IN`;
      setOrderNumber(generatedOrder);
      setIsProcessing(false);
      setOrderComplete(true);
      clearCart();
    }, 1200);
  };

  if (orderComplete) {
    return (
      <div className="py-20 bg-vats-black min-h-[75vh] flex items-center justify-center px-4 text-vats-offwhite">
        <div className="max-w-lg w-full bg-vats-surface border border-vats-border p-8 rounded-sm text-center space-y-6 shadow-2xl animate-in fade-in zoom-in-95 duration-300">
          <div className="w-16 h-16 bg-vats-lime/10 border border-vats-lime text-vats-lime rounded-full mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono text-vats-lime uppercase tracking-widest font-bold">
              DEMONSTRATION ORDER CONFIRMED
            </span>
            <h1 className="font-display text-4xl sm:text-5xl tracking-tight leading-none uppercase">
              Order Placed!
            </h1>
            <p className="text-xs text-vats-muted">
              Simulated Reference Code: <strong className="text-vats-offwhite font-mono">{orderNumber}</strong>
            </p>
          </div>

          <div className="p-4 bg-vats-black border border-vats-border rounded-sm text-left text-xs space-y-2">
            <div className="flex justify-between text-vats-muted">
              <span>Delivery To:</span>
              <strong className="text-vats-offwhite">{address.fullName}</strong>
            </div>
            <div className="flex justify-between text-vats-muted">
              <span>Destination:</span>
              <span className="text-vats-offwhite">{address.city}, {address.state} — {address.pincode}</span>
            </div>
            <div className="flex justify-between text-vats-muted">
              <span>Estimated Delivery:</span>
              <span className="text-vats-lime font-bold">3 Business Days</span>
            </div>
            <div className="flex justify-between text-vats-muted pt-2 border-t border-vats-border/50">
              <span>Simulated Payment:</span>
              <span className="text-vats-offwhite uppercase font-mono">{paymentMethod}</span>
            </div>
          </div>

          <div className="p-3 bg-vats-charcoal/60 border border-vats-border rounded-sm text-[11px] text-vats-muted leading-relaxed">
            <strong className="text-vats-offwhite block mb-0.5">Note:</strong>
            This is an interactive demonstration checkout. No actual charges were debited and no financial transaction was executed.
          </div>

          <div className="flex gap-3 pt-2">
            <Link
              to="/shop"
              className="flex-1 py-3.5 bg-vats-lime hover:bg-vats-limeHover text-vats-black font-extrabold uppercase text-xs tracking-widest transition-all rounded-sm"
            >
              Continue Shopping
            </Link>
            <Link
              to="/"
              className="px-6 py-3.5 bg-vats-charcoal hover:bg-vats-border text-vats-offwhite font-bold uppercase text-xs tracking-wider rounded-sm transition-colors"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-16 bg-vats-black min-h-screen text-vats-offwhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 pb-6 border-b border-vats-border">
          <span className="text-xs font-mono text-vats-lime uppercase tracking-widest font-bold">
            SECURE CHECKOUT DEMO
          </span>
          <h1 className="font-display text-4xl sm:text-6xl tracking-tight leading-none uppercase">
            Order Checkout
          </h1>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Shipping Address & Payment Selection (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Shipping Address */}
            <div className="p-6 bg-vats-surface border border-vats-border rounded-sm space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-vats-border">
                <Truck className="w-5 h-5 text-vats-lime" />
                <h3 className="font-display text-2xl tracking-wider text-vats-offwhite uppercase">
                  1. Shipping Information
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-vats-muted block mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={address.fullName}
                    onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                    className="w-full px-3 py-2 bg-vats-black border border-vats-border text-xs text-vats-offwhite focus:border-vats-lime focus:outline-none rounded-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-vats-muted block mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={address.email}
                    onChange={(e) => setAddress({ ...address, email: e.target.value })}
                    className="w-full px-3 py-2 bg-vats-black border border-vats-border text-xs text-vats-offwhite focus:border-vats-lime focus:outline-none rounded-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-vats-muted block mb-1">
                    Phone (with WhatsApp update) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={address.phone}
                    onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-vats-black border border-vats-border text-xs text-vats-offwhite focus:border-vats-lime focus:outline-none rounded-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-vats-muted block mb-1">
                    PIN Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={address.pincode}
                    onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                    className="w-full px-3 py-2 bg-vats-black border border-vats-border text-xs text-vats-offwhite focus:border-vats-lime focus:outline-none rounded-sm"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-vats-muted block mb-1">
                  Street Address / Flat / Building *
                </label>
                <input
                  type="text"
                  required
                  value={address.street}
                  onChange={(e) => setAddress({ ...address, street: e.target.value })}
                  className="w-full px-3 py-2 bg-vats-black border border-vats-border text-xs text-vats-offwhite focus:border-vats-lime focus:outline-none rounded-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-vats-muted block mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    className="w-full px-3 py-2 bg-vats-black border border-vats-border text-xs text-vats-offwhite focus:border-vats-lime focus:outline-none rounded-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-vats-muted block mb-1">
                    State *
                  </label>
                  <input
                    type="text"
                    required
                    value={address.state}
                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    className="w-full px-3 py-2 bg-vats-black border border-vats-border text-xs text-vats-offwhite focus:border-vats-lime focus:outline-none rounded-sm"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Simulated Payment Selection */}
            <div className="p-6 bg-vats-surface border border-vats-border rounded-sm space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-vats-border">
                <CreditCard className="w-5 h-5 text-vats-lime" />
                <h3 className="font-display text-2xl tracking-wider text-vats-offwhite uppercase">
                  2. Demonstration Payment Method
                </h3>
              </div>

              <p className="text-xs text-vats-muted">
                Select a simulated payment channel. No real payment processing or collection occurs.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label
                  className={`p-4 border rounded-sm flex flex-col justify-between gap-3 cursor-pointer transition-all ${
                    paymentMethod === 'upi'
                      ? 'border-vats-lime bg-vats-lime/10'
                      : 'border-vats-border bg-vats-black hover:border-vats-muted'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <QrCode className="w-5 h-5 text-vats-lime" />
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                      className="accent-vats-lime"
                    />
                  </div>
                  <div>
                    <span className="font-bold text-xs text-vats-offwhite block">UPI / QR (Demo)</span>
                    <span className="text-[10px] text-vats-muted">GPay, PhonePe, Paytm</span>
                  </div>
                </label>

                <label
                  className={`p-4 border rounded-sm flex flex-col justify-between gap-3 cursor-pointer transition-all ${
                    paymentMethod === 'card'
                      ? 'border-vats-lime bg-vats-lime/10'
                      : 'border-vats-border bg-vats-black hover:border-vats-muted'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <CreditCard className="w-5 h-5 text-vats-lime" />
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="accent-vats-lime"
                    />
                  </div>
                  <div>
                    <span className="font-bold text-xs text-vats-offwhite block">Cards (Demo)</span>
                    <span className="text-[10px] text-vats-muted">Visa, Mastercard, RuPay</span>
                  </div>
                </label>

                <label
                  className={`p-4 border rounded-sm flex flex-col justify-between gap-3 cursor-pointer transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-vats-lime bg-vats-lime/10'
                      : 'border-vats-border bg-vats-black hover:border-vats-muted'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <DollarSign className="w-5 h-5 text-vats-lime" />
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="accent-vats-lime"
                    />
                  </div>
                  <div>
                    <span className="font-bold text-xs text-vats-offwhite block">Pay on Delivery</span>
                    <span className="text-[10px] text-vats-muted">Simulated Cash on Delivery</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Summary (5 cols) */}
          <div className="lg:col-span-5 bg-vats-surface border border-vats-border p-6 rounded-sm space-y-5 sticky top-28">
            <h3 className="font-display text-2xl tracking-wider text-vats-offwhite uppercase pb-3 border-b border-vats-border">
              Order Items ({items.length})
            </h3>

            {/* Compact items list */}
            <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 text-xs">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-12 h-14 object-cover rounded-sm border border-vats-border flex-shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <span className="font-bold text-vats-offwhite line-clamp-1">
                      {item.product.name}
                    </span>
                    <span className="text-[11px] text-vats-muted">
                      {item.selectedColor} • Size {item.selectedSize} • Qty {item.quantity}
                    </span>
                    <span className="font-mono text-vats-lime font-bold">
                      {formatCurrency(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Financial Summary */}
            <div className="space-y-2 text-xs text-vats-muted border-t border-vats-border pt-4">
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
              <div className="flex justify-between text-lg font-bold text-vats-offwhite border-t border-vats-border pt-3">
                <span>Total Due</span>
                <span className="text-vats-lime font-mono">{formatCurrency(finalTotal)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 bg-vats-lime hover:bg-vats-limeHover text-vats-black font-extrabold uppercase text-xs tracking-widest flex items-center justify-center gap-2 transition-all rounded-sm shadow-xl shadow-vats-lime/10"
            >
              {isProcessing ? (
                'Simulating Order Authorization...'
              ) : (
                <>
                  Place Demonstration Order <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-vats-muted text-center pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-vats-lime" />
              <span>Demonstration checkout with secure client simulator</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
