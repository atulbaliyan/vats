import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

// Ensure ScrollTrigger is registered with GSAP
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ScrollSyncController {
  lenis: Lenis | null;
  scrollTo: (target: string | number | HTMLElement, options?: { immediate?: boolean; offset?: number }) => void;
  refresh: () => void;
  destroy: () => void;
}

/**
 * Initializes and synchronizes Lenis smooth scroll with GSAP ScrollTrigger.
 * Uses the GSAP ticker as the single coordinated animation loop to eliminate competing RAFs.
 */
export function initScrollSync(options: { prefersReducedMotion?: boolean } = {}): ScrollSyncController {
  if (typeof window === 'undefined') {
    return {
      lenis: null,
      scrollTo: () => {},
      refresh: () => {},
      destroy: () => {},
    };
  }

  // Bypass smooth scroll if user prefers reduced motion
  if (options.prefersReducedMotion) {
    return {
      lenis: null,
      scrollTo: (target) => {
        if (typeof target === 'number') {
          window.scrollTo({ top: target, behavior: 'auto' });
        } else if (typeof target === 'string') {
          const el = document.querySelector(target);
          el?.scrollIntoView({ behavior: 'auto' });
        } else if (target instanceof HTMLElement) {
          target.scrollIntoView({ behavior: 'auto' });
        }
      },
      refresh: () => ScrollTrigger.refresh(),
      destroy: () => {},
    };
  }

  // Instantiate Lenis smooth scroll
  const lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 0.9,
    touchMultiplier: 1.5,
  });

  // 1. Inform ScrollTrigger whenever Lenis scrolls
  const onScroll = () => {
    ScrollTrigger.update();
  };
  lenis.on('scroll', onScroll);

  // 2. Drive Lenis via GSAP's central ticker (time is in seconds; Lenis expects milliseconds)
  const onTicker = (time: number) => {
    lenis.raf(time * 1000);
  };
  gsap.ticker.add(onTicker);
  gsap.ticker.lagSmoothing(0);

  // Controller API
  const scrollTo = (
    target: string | number | HTMLElement,
    scrollOpts?: { immediate?: boolean; offset?: number }
  ) => {
    lenis.scrollTo(target, {
      immediate: scrollOpts?.immediate ?? false,
      offset: scrollOpts?.offset ?? 0,
    });
  };

  const refresh = () => {
    ScrollTrigger.refresh();
  };

  const destroy = () => {
    gsap.ticker.remove(onTicker);
    lenis.off('scroll', onScroll);
    lenis.destroy();
  };

  return {
    lenis,
    scrollTo,
    refresh,
    destroy,
  };
}

export { gsap, ScrollTrigger, Lenis };
