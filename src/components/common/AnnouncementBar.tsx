import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AnnouncementBar: React.FC = () => {
  return (
    <aside aria-label="Special Offers" className="bg-vats-charcoal border-b border-vats-border text-xs text-vats-offwhite py-2 px-4 relative z-50 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left subtle indicator */}
        <div className="hidden md:flex items-center gap-2 text-vats-lime font-medium tracking-wider text-[11px] uppercase">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>VATS PERFORMANCE LAB</span>
        </div>

        {/* Center continuous message */}
        <div className="w-full md:w-auto flex items-center justify-center gap-3 text-center">
          <span className="font-semibold tracking-wider text-vats-offwhite">
            BUILT FOR PERFORMANCE. DESIGNED FOR EVERYDAY.
          </span>
          <span className="hidden sm:inline text-vats-muted">|</span>
          <span className="hidden sm:inline text-vats-muted">
            FREE SHIPPING ON ORDERS OVER ₹1,999
          </span>
          <Link
            to="/shop"
            className="hidden lg:inline-flex items-center gap-1 text-vats-lime hover:underline font-medium text-[11px] tracking-wider uppercase ml-2"
          >
            Shop Now <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Right currency / country */}
        <div className="hidden md:flex items-center gap-3 text-[11px] text-vats-muted font-medium">
          <span>INDIA (INR ₹)</span>
          <span>EST. 2026</span>
        </div>
      </div>
    </aside>
  );
};
