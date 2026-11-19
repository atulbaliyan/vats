import React, { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnnouncementBar } from '../common/AnnouncementBar';
import { Navbar } from '../common/Navbar';
import { MobileNav } from '../common/MobileNav';
import { CartDrawer } from '../common/CartDrawer';
import { QuickViewModal } from '../common/QuickViewModal';
import { CustomCursor } from '../common/CustomCursor';
import { ToastNotification } from '../common/ToastNotification';
import { DisclaimerBanner } from '../common/DisclaimerBanner';
import { Footer } from '../common/Footer';
import { initScrollSync, ScrollSyncController } from '../../animations/scrollSync';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const Layout: React.FC = () => {
  const { pathname } = useLocation();
  const prefersReducedMotion = useReducedMotion();
  const scrollControllerRef = useRef<ScrollSyncController | null>(null);

  // Initialize unified Lenis + ScrollTrigger loop
  useEffect(() => {
    const controller = initScrollSync({ prefersReducedMotion });
    scrollControllerRef.current = controller;

    return () => {
      controller.destroy();
      scrollControllerRef.current = null;
    };
  }, [prefersReducedMotion]);

  // Handle route changes: scroll to top and refresh ScrollTrigger
  useEffect(() => {
    if (scrollControllerRef.current) {
      scrollControllerRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }

    // Refresh triggers after page transition renders
    const timer = setTimeout(() => {
      scrollControllerRef.current?.refresh();
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

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

      <main className="flex-1" id="main-content">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
