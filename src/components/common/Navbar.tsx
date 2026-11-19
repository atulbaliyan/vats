import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Menu, ArrowRight } from 'lucide-react';
import { NAV_LINKS, NavCategory } from '../../data/navigation';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';
import { useUIStore } from '../../store/useUIStore';
import { useMegaMenu } from '../../hooks/useMegaMenu';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const totalCartCount = useCartStore((s) => s.getTotalCount());
  const openCartDrawer = useCartStore((s) => s.openDrawer);
  const isMobileMenuOpen = useUIStore((s) => s.isMobileMenuOpen);
  const wishlistCount = useWishlistStore((s) => s.wishlistIds.length);
  const toggleMobileMenu = useUIStore((s) => s.toggleMobileMenu);

  const {
    activeMenu,
    navRef,
    registerTriggerRef,
    closeMenu,
    handleItemPointerEnter,
    handleItemPointerLeave,
    handleItemFocus,
    handleItemBlur,
    handleTriggerKeyDown,
    handleSubmenuLinkClick,
  } = useMegaMenu({ hoverCloseDelayMs: 3000 });

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    closeMenu();
  }, [location.pathname, closeMenu]);

  return (
    <header
      role="banner"
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled || !isHome
          ? 'bg-vats-black/90 backdrop-blur-md border-b border-vats-border shadow-2xl py-3.5'
          : 'bg-gradient-to-b from-vats-black/80 via-vats-black/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Left: Mobile Menu Toggle & Brand Logo */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 text-vats-offwhite hover:text-vats-lime transition-colors focus-visible:ring-2 focus-visible:ring-vats-lime focus-visible:outline-none rounded-sm"
              aria-label="Open mobile navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              <Menu className="w-6 h-6" />
            </button>

            <Link
              to="/"
              className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-vats-lime rounded-sm"
            >
              {/* Dynamic Logo Symbol */}
              <div
                className="w-8 h-8 bg-vats-charcoal border border-vats-border flex items-center justify-center font-display text-xl text-vats-lime group-hover:border-vats-lime transition-colors"
                aria-hidden="true"
              >
                <span className="skew-x-[-12deg]">V</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-2xl sm:text-3xl tracking-wider leading-none text-vats-offwhite group-hover:text-white transition-colors">
                  VATS<span className="text-vats-lime">.</span>SPORTS
                </span>
                <span className="text-[9px] uppercase tracking-ultra text-vats-muted font-semibold leading-none">
                  BEYOND LIMITS
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Desktop Navigation Links with Mega Menu */}
          <nav ref={navRef as React.RefObject<HTMLElement>} className="hidden lg:flex items-center space-x-1" aria-label="Main Store Navigation">
            {NAV_LINKS.map((nav: NavCategory) => {
              const hasSections = Boolean(nav.sections && nav.sections.length > 0);
              const isOpen = activeMenu === nav.title;
              const menuId = `mega-menu-${nav.title.toLowerCase()}`;
              const triggerId = `nav-trigger-${nav.title.toLowerCase()}`;
              const isCurrentRoute =
                location.pathname === nav.href || location.pathname.startsWith(nav.href + '/');

              return (
                <div
                  key={nav.title}
                  className="relative"
                  onMouseEnter={() => hasSections && handleItemPointerEnter(nav.title)}
                  onMouseLeave={() => hasSections && handleItemPointerLeave()}
                  onFocus={() => hasSections && handleItemFocus(nav.title)}
                  onBlur={hasSections ? handleItemBlur : undefined}
                >
                  <Link
                    to={nav.href}
                    id={hasSections ? triggerId : undefined}
                    ref={hasSections ? registerTriggerRef(nav.title) : undefined}
                    onClick={() => closeMenu()}
                    onKeyDown={(e) => hasSections && handleTriggerKeyDown(e, nav.title)}
                    aria-expanded={hasSections ? isOpen : undefined}
                    aria-haspopup={hasSections ? 'true' : undefined}
                    aria-controls={hasSections && isOpen ? menuId : undefined}
                    className={`px-4 py-2 text-sm font-semibold tracking-wider uppercase transition-colors relative flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-vats-lime focus-visible:outline-none rounded-sm ${
                      isOpen || isCurrentRoute
                        ? 'text-vats-lime'
                        : 'text-vats-offwhite/90 hover:text-vats-lime'
                    }`}
                  >
                    {nav.title}
                    {nav.badge && (
                      <span className="bg-vats-lime text-vats-black text-[9px] font-extrabold px-1.5 py-0.5 rounded-sm uppercase tracking-wider">
                        {nav.badge}
                      </span>
                    )}
                  </Link>

                  {/* Desktop Mega Menu Dropdown */}
                  {hasSections && isOpen && (
                    <div
                      id={menuId}
                      role="region"
                      aria-label={`${nav.title} subcategories navigation`}
                      className="absolute top-full left-1/2 -translate-x-1/2 w-[680px] pt-2 z-50 before:absolute before:-top-3 before:left-0 before:right-0 before:h-3 before:content-['']"
                    >
                      <div className="bg-vats-surface/95 backdrop-blur-xl border border-vats-border p-6 shadow-2xl rounded-sm transition-all duration-200">
                        <div className="grid grid-cols-12 gap-6">
                          {/* Nav Links Column */}
                          <div className="col-span-7 grid grid-cols-2 gap-6">
                            {nav.sections!.map((sec, idx) => (
                              <div key={idx} className="space-y-3">
                                <h4 className="text-[11px] font-bold uppercase tracking-widest text-vats-muted border-b border-vats-border/50 pb-1">
                                  {sec.heading}
                                </h4>
                                <ul className="space-y-2">
                                  {sec.items.map((item, itemIdx) => (
                                    <li key={itemIdx}>
                                      <Link
                                        to={item.href}
                                        onClick={handleSubmenuLinkClick}
                                        className="text-xs text-vats-offwhite/80 hover:text-vats-lime transition-colors flex items-center justify-between group focus-visible:ring-1 focus-visible:ring-vats-lime focus-visible:outline-none rounded-sm"
                                      >
                                        <span className="group-hover:translate-x-0.5 transition-transform">
                                          {item.label}
                                        </span>
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

                          {/* Featured Promo Card Column */}
                          {nav.featuredPromo && (
                            <div className="col-span-5 relative group overflow-hidden rounded-sm bg-vats-charcoal border border-vats-border flex flex-col justify-end p-4 min-h-[200px]">
                              <img
                                src={nav.featuredPromo.image}
                                alt=""
                                width={300}
                                height={250}
                                className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 group-hover:opacity-60 transition-all duration-500"
                                loading="lazy"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-vats-black via-vats-black/50 to-transparent" />
                              <div className="relative z-10 space-y-1">
                                <span className="text-[10px] uppercase font-mono text-vats-lime tracking-widest font-semibold">
                                  Featured Drop
                                </span>
                                <h5 className="font-display text-lg leading-tight text-white">
                                  {nav.featuredPromo.title}
                                </h5>
                                <p className="text-[11px] text-vats-muted line-clamp-2">
                                  {nav.featuredPromo.subtitle}
                                </p>
                                <Link
                                  to={nav.featuredPromo.href}
                                  onClick={handleSubmenuLinkClick}
                                  className="inline-flex items-center gap-1 text-xs text-vats-lime font-bold tracking-wider uppercase pt-2 group-hover:underline focus-visible:ring-1 focus-visible:ring-vats-lime focus-visible:outline-none rounded-sm"
                                >
                                  {nav.featuredPromo.cta} <ArrowRight className="w-3 h-3" />
                                </Link>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right: Actions (Search, Wishlist, Cart) */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link
              to="/search"
              className="p-2 text-vats-offwhite hover:text-vats-lime transition-colors relative focus-visible:ring-2 focus-visible:ring-vats-lime focus-visible:outline-none rounded-sm"
              aria-label="Search store products"
              title="Search products"
            >
              <Search className="w-5 h-5" />
            </Link>

            <Link
              to="/wishlist"
              className="p-2 text-vats-offwhite hover:text-vats-lime transition-colors relative focus-visible:ring-2 focus-visible:ring-vats-lime focus-visible:outline-none rounded-sm"
              aria-label={`Wishlist, ${wishlistCount} saved items`}
              title="Saved items"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-vats-lime text-vats-black font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-mono">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={openCartDrawer}
              className="p-2 text-vats-offwhite hover:text-vats-lime transition-colors relative group focus-visible:ring-2 focus-visible:ring-vats-lime focus-visible:outline-none rounded-sm"
              aria-label={`Shopping bag, ${totalCartCount} items`}
              title="View shopping bag"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-105 transition-transform" />
              {totalCartCount > 0 && (
                <span className="absolute top-1 right-1 bg-vats-lime text-vats-black font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-mono">
                  {totalCartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
