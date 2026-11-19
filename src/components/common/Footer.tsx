import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Instagram, Twitter, Youtube, Check } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    setIsSubscribed(true);
  };

  return (
    <footer className="bg-vats-black border-t border-vats-border text-vats-offwhite pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-vats-border">
          {/* Col 1: Brand & Identity (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <Link
              to="/"
              className="inline-block group focus:outline-none focus-visible:ring-2 focus-visible:ring-vats-lime rounded-sm transition-transform duration-200 active:scale-95"
            >
              <BrandLogo
                variant="full"
                theme="dark"
                className="h-10 sm:h-11 w-auto"
                alt="VATS SPORTS"
              />
              <span className="block text-[10px] uppercase tracking-ultra text-vats-muted font-bold mt-2">
                BEYOND LIMITS
              </span>
            </Link>

            <p className="text-xs text-vats-muted leading-relaxed max-w-sm">
              Engineered for movement. Designed for ambition. High-performance athletic apparel,
              oversized streetwear capsules, and custom tournament team kits crafted for relentless athletes.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#instagram"
                className="w-8 h-8 rounded-full bg-vats-charcoal border border-vats-border flex items-center justify-center text-vats-muted hover:text-vats-lime hover:border-vats-lime transition-colors"
                aria-label="VATS Sports Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#twitter"
                className="w-8 h-8 rounded-full bg-vats-charcoal border border-vats-border flex items-center justify-center text-vats-muted hover:text-vats-lime hover:border-vats-lime transition-colors"
                aria-label="VATS Sports Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#youtube"
                className="w-8 h-8 rounded-full bg-vats-charcoal border border-vats-border flex items-center justify-center text-vats-muted hover:text-vats-lime hover:border-vats-lime transition-colors"
                aria-label="VATS Sports YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Categories (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-display text-lg tracking-wider text-vats-offwhite uppercase">
              Shop Categories
            </h4>
            <ul className="space-y-2 text-xs text-vats-muted">
              <li>
                <Link to="/men" className="hover:text-vats-lime transition-colors">Men's Training</Link>
              </li>
              <li>
                <Link to="/women" className="hover:text-vats-lime transition-colors">Women's Activewear</Link>
              </li>
              <li>
                <Link to="/sports?sport=Running" className="hover:text-vats-lime transition-colors">Running & Pace</Link>
              </li>
              <li>
                <Link to="/sports?sport=Cricket" className="hover:text-vats-lime transition-colors">Cricket Matchwear</Link>
              </li>
              <li>
                <Link to="/collections" className="hover:text-vats-lime transition-colors">Heavyweight Drops</Link>
              </li>
              <li>
                <Link to="/teamwear" className="hover:text-vats-lime transition-colors text-vats-lime font-semibold">Custom Teamwear</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Brand & Support (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-display text-lg tracking-wider text-vats-offwhite uppercase">
              Brand & Support
            </h4>
            <ul className="space-y-2 text-xs text-vats-muted">
              <li>
                <Link to="/about" className="hover:text-vats-lime transition-colors">About VATS Sports</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-vats-lime transition-colors">Contact & Customer Care</Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-vats-lime transition-colors">Full Catalog Index</Link>
              </li>
              <li>
                <span className="text-vats-muted/70">Shipping: 2-4 Business Days Pan-India</span>
              </li>
              <li>
                <span className="text-vats-muted/70">Returns: 30-Day Hassle Free</span>
              </li>
              <li>
                <Link to="/teamwear" className="hover:text-vats-lime transition-colors">Bulk Academy Enquiries</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter Box (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-display text-lg tracking-wider text-vats-offwhite uppercase">
              Stay in the Game
            </h4>
            <p className="text-xs text-vats-muted leading-relaxed">
              Subscribe for early access to limited heavyweight drops, secret sales, and technical fabric updates.
            </p>

            {isSubscribed ? (
              <div className="p-3 bg-vats-lime/10 border border-vats-lime/30 text-vats-lime text-xs font-semibold rounded-sm flex items-center gap-2">
                <Check className="w-4 h-4" /> You're on the VIP access list.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="w-full px-3.5 py-2.5 bg-vats-surface border border-vats-border text-xs text-vats-offwhite focus:border-vats-lime focus:outline-none rounded-sm"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 bottom-1 px-3 bg-vats-lime hover:bg-vats-limeHover text-vats-black font-bold text-xs uppercase tracking-wider rounded-sm flex items-center justify-center transition-colors"
                    aria-label="Subscribe to newsletter"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-[10px] text-vats-muted/70 block">
                  No spam. Only athlete drops and technical release notes.
                </span>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar & Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-vats-muted">
          <div className="text-center md:text-left">
            <p className="text-vats-muted/80">
              © {new Date().getFullYear()} VATS SPORTS. All rights reserved.
            </p>
            <p className="text-[11px] text-vats-muted/60 mt-1">
              Independent website concept for Vats Sports. Not an official website. Product listings and prices are illustrative.
            </p>
          </div>

          <div className="flex items-center gap-6 text-[11px]">
            <Link to="/about" className="hover:text-vats-offwhite transition-colors">Privacy Policy</Link>
            <Link to="/about" className="hover:text-vats-offwhite transition-colors">Terms of Service</Link>
            <Link to="/contact" className="hover:text-vats-offwhite transition-colors">Store Locator</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
