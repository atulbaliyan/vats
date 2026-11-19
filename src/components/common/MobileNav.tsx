import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, ChevronDown, ChevronRight, Heart, Search } from 'lucide-react';
import { NAV_LINKS } from '../../data/navigation';
import { useUIStore } from '../../store/useUIStore';

export const MobileNav: React.FC = () => {
  const isMobileMenuOpen = useUIStore((s) => s.isMobileMenuOpen);
  const closeMobileMenu = useUIStore((s) => s.closeMobileMenu);
  const openSearch = useUIStore((s) => s.openSearch);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  if (!isMobileMenuOpen) return null;

  const toggleExpand = (title: string) => {
    setExpandedSection(expandedSection === title ? null : title);
  };

  const handleLinkClick = () => {
    closeMobileMenu();
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={closeMobileMenu}
        aria-hidden="true"
      />

      {/* Slide-out Drawer */}
      <div className="relative w-full max-w-sm bg-vats-surface border-r border-vats-border h-full flex flex-col z-10 overflow-y-auto">
        {/* Top Header */}
        <div className="p-4 border-b border-vats-border flex items-center justify-between">
          <Link to="/" onClick={handleLinkClick} className="flex items-center gap-2">
            <div className="w-7 h-7 bg-vats-charcoal border border-vats-border flex items-center justify-center font-display text-lg text-vats-lime">
              <span className="skew-x-[-12deg]">V</span>
            </div>
            <span className="font-display text-2xl tracking-wider text-vats-offwhite">
              VATS<span className="text-vats-lime">.</span>SPORTS
            </span>
          </Link>
          <button
            type="button"
            onClick={closeMobileMenu}
            className="p-2 text-vats-muted hover:text-white transition-colors"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Search Quick Bar */}
        <div className="p-4 border-b border-vats-border">
          <button
            type="button"
            onClick={() => {
              closeMobileMenu();
              openSearch();
            }}
            className="w-full flex items-center gap-3 px-4 py-2.5 bg-vats-black border border-vats-border text-vats-muted text-sm rounded-sm"
          >
            <Search className="w-4 h-4 text-vats-lime" />
            <span>Search gear, jerseys, tees...</span>
          </button>
        </div>

        {/* Navigation Accordion */}
        <nav className="flex-1 py-4 px-2 space-y-1">
          {NAV_LINKS.map((nav) => (
            <div key={nav.title} className="border-b border-vats-border/40 pb-1">
              <div className="flex items-center justify-between px-3 py-3">
                <Link
                  to={nav.href}
                  onClick={handleLinkClick}
                  className="font-display text-2xl tracking-wider text-vats-offwhite hover:text-vats-lime flex items-center gap-2"
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
                    className="p-1.5 text-vats-muted hover:text-vats-lime transition-colors"
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
                              className="text-sm text-vats-offwhite/80 hover:text-vats-lime flex items-center justify-between py-1"
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

          {/* Additional static links */}
          <div className="pt-4 px-3 space-y-2 text-sm text-vats-offwhite/80">
            <Link
              to="/about"
              onClick={handleLinkClick}
              className="block py-1 hover:text-vats-lime transition-colors"
            >
              About VATS Sports
            </Link>
            <Link
              to="/contact"
              onClick={handleLinkClick}
              className="block py-1 hover:text-vats-lime transition-colors"
            >
              Contact & Enquiries
            </Link>
            <Link
              to="/wishlist"
              onClick={handleLinkClick}
              className="flex items-center gap-2 py-1 hover:text-vats-lime transition-colors"
            >
              <Heart className="w-4 h-4 text-vats-lime" /> Saved Wishlist
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
      </div>
    </div>
  );
};
