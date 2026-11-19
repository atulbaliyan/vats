import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, ChevronDown, ChevronRight, Heart, Search } from 'lucide-react';
import { NAV_LINKS } from '../../data/navigation';
import { useUIStore } from '../../store/useUIStore';
import { AccessibleDrawer } from '../ui/Dialog';

export const MobileNav: React.FC = () => {
  const isMobileMenuOpen = useUIStore((s) => s.isMobileMenuOpen);
  const closeMobileMenu = useUIStore((s) => s.closeMobileMenu);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleExpand = (title: string) => {
    setExpandedSection(expandedSection === title ? null : title);
  };

  const handleLinkClick = () => {
    closeMobileMenu();
  };

  return (
    <AccessibleDrawer
      isOpen={isMobileMenuOpen}
      onClose={closeMobileMenu}
      title="Mobile Navigation Menu"
      description="Main storefront navigation links, sports categories, and account shortcuts"
      side="left"
      widthClassName="max-w-sm"
    >
      {/* Top Header */}
      <div className="p-4 border-b border-vats-border flex items-center justify-between">
        <Link
          to="/"
          onClick={handleLinkClick}
          className="flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-vats-lime focus-visible:outline-none rounded-sm"
        >
          <div
            className="w-7 h-7 bg-vats-charcoal border border-vats-border flex items-center justify-center font-display text-lg text-vats-lime"
            aria-hidden="true"
          >
            <span className="skew-x-[-12deg]">V</span>
          </div>
          <span className="font-display text-2xl tracking-wider text-vats-offwhite">
            VATS<span className="text-vats-lime">.</span>SPORTS
          </span>
        </Link>
        <button
          type="button"
          onClick={closeMobileMenu}
          className="p-2 text-vats-muted hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-vats-lime focus-visible:outline-none rounded-sm"
          aria-label="Close navigation menu"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Search Quick Bar */}
      <div className="p-4 border-b border-vats-border">
        <Link
          to="/search"
          onClick={handleLinkClick}
          className="w-full flex items-center gap-3 px-4 py-2.5 bg-vats-black border border-vats-border text-vats-muted text-sm rounded-sm hover:border-vats-muted focus-visible:ring-2 focus-visible:ring-vats-lime focus-visible:outline-none transition-colors"
          aria-label="Search catalog for gear, jerseys, and tees"
        >
          <Search className="w-4 h-4 text-vats-lime" aria-hidden="true" />
          <span>Search gear, jerseys, tees...</span>
        </Link>
      </div>

      {/* Navigation Accordion */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto" aria-label="Mobile Main Navigation">
        {NAV_LINKS.map((nav) => (
          <div key={nav.title} className="border-b border-vats-border/40 pb-1">
            <div className="flex items-center justify-between px-3 py-3">
              <Link
                to={nav.href}
                onClick={handleLinkClick}
                className="font-display text-2xl tracking-wider text-vats-offwhite hover:text-vats-lime flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-vats-lime focus-visible:outline-none rounded-sm"
              >
                {nav.title}
                {nav.badge && (
                  <span className="bg-vats-lime text-vats-black text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase">
                    {nav.badge}
                  </span>
                )}
              </Link>
              {nav.sections && (
                <button
                  type="button"
                  onClick={() => toggleExpand(nav.title)}
                  className="p-1.5 text-vats-muted hover:text-vats-lime transition-colors focus-visible:ring-2 focus-visible:ring-vats-lime focus-visible:outline-none rounded-sm"
                  aria-expanded={expandedSection === nav.title}
                  aria-label={`Toggle ${nav.title} subcategories`}
                >
                  {expandedSection === nav.title ? (
                    <ChevronDown className="w-5 h-5 text-vats-lime" />
                  ) : (
                    <ChevronRight className="w-5 h-5" />
                  )}
                </button>
              )}
            </div>

            {/* Subcategories */}
            {nav.sections && expandedSection === nav.title && (
              <div className="pl-6 pr-3 py-2 space-y-3 bg-vats-black/40 rounded-sm mb-2">
                {nav.sections.map((section, sIdx) => (
                  <div key={sIdx} className="space-y-2">
                    <div className="text-[10px] uppercase font-bold text-vats-muted tracking-widest">
                      {section.heading}
                    </div>
                    <ul className="space-y-1.5">
                      {section.items.map((item, iIdx) => (
                        <li key={iIdx}>
                          <Link
                            to={item.href}
                            onClick={handleLinkClick}
                            className="text-sm text-vats-offwhite/80 hover:text-vats-lime flex items-center justify-between py-1 focus-visible:ring-2 focus-visible:ring-vats-lime focus-visible:outline-none rounded-sm"
                          >
                            <span>{item.label}</span>
                            {item.tag && (
                              <span className="text-[9px] text-vats-lime bg-vats-lime/10 px-1.5 py-0.5 rounded font-mono">
                                {item.tag}
                              </span>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Additional navigation links */}
        <div className="pt-4 px-3 space-y-2 text-sm text-vats-offwhite/80">
          <Link
            to="/about"
            onClick={handleLinkClick}
            className="block py-1 hover:text-vats-lime transition-colors focus-visible:ring-2 focus-visible:ring-vats-lime focus-visible:outline-none rounded-sm"
          >
            About VATS Sports
          </Link>
          <Link
            to="/contact"
            onClick={handleLinkClick}
            className="block py-1 hover:text-vats-lime transition-colors focus-visible:ring-2 focus-visible:ring-vats-lime focus-visible:outline-none rounded-sm"
          >
            Contact & Enquiries
          </Link>
          <Link
            to="/wishlist"
            onClick={handleLinkClick}
            className="flex items-center gap-2 py-1 hover:text-vats-lime transition-colors focus-visible:ring-2 focus-visible:ring-vats-lime focus-visible:outline-none rounded-sm"
          >
            <Heart className="w-4 h-4 text-vats-lime" aria-hidden="true" /> Saved Wishlist
          </Link>
        </div>
      </nav>

      {/* Bottom Info */}
      <div className="p-4 border-t border-vats-border bg-vats-black/60 text-xs text-vats-muted space-y-2">
        <div className="flex items-center justify-between">
          <span>Currency:</span>
          <span className="font-semibold text-vats-offwhite">INR (₹)</span>
        </div>
        <div className="text-[11px] text-vats-muted/80">
          Engineered for movement. Designed for ambition.
        </div>
      </div>
    </AccessibleDrawer>
  );
};
