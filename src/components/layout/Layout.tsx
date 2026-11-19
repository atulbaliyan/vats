import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { AnnouncementBar } from '../common/AnnouncementBar';
import { Navbar } from '../common/Navbar';
import { MobileNav } from '../common/MobileNav';
import { CartDrawer } from '../common/CartDrawer';
import { QuickViewModal } from '../common/QuickViewModal';
import { CustomCursor } from '../common/CustomCursor';
import { ToastNotification } from '../common/ToastNotification';
import { DisclaimerBanner } from '../common/DisclaimerBanner';
import { Footer } from '../common/Footer';

export const Layout: React.FC = () => {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-vats-black text-vats-offwhite selection:bg-vats-lime selection:text-vats-black">
      <CustomCursor />
      <AnnouncementBar />
      <Navbar />
      <MobileNav />
      <CartDrawer />
      <QuickViewModal />
      <ToastNotification />
      <DisclaimerBanner />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
