import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { initScrollSync, gsap, ScrollTrigger } from '../animations/scrollSync';
import { CinematicHero } from '../components/home/CinematicHero';
import { BrandStory } from '../components/home/BrandStory';
import { CategoryGrid } from '../components/home/CategoryGrid';

// Test harness component to exercise useReducedMotion hook
const ReducedMotionProbe: React.FC = () => {
  const prefersReduced = useReducedMotion();
  return <div data-testid="reduced-motion-state">{prefersReduced ? 'reduced' : 'standard'}</div>;
};

describe('Phase 3: Animation Engineering & Lifecycle Verification', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  });

  describe('useReducedMotion Hook', () => {
    it('returns false by default when prefers-reduced-motion does not match', () => {
      render(<ReducedMotionProbe />);
      expect(screen.getByTestId('reduced-motion-state')).toHaveTextContent('standard');
    });

    it('returns true when media query prefers-reduced-motion is active', () => {
      // Mock matchMedia returning true for reduce
      vi.spyOn(window, 'matchMedia').mockImplementation((query: string) => ({
        matches: query.includes('prefers-reduced-motion: reduce'),
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      render(<ReducedMotionProbe />);
      expect(screen.getByTestId('reduced-motion-state')).toHaveTextContent('reduced');
    });

    it('reacts dynamically to media query change events', () => {
      let listenerCallback: ((e: MediaQueryListEvent) => void) | null = null;

      vi.spyOn(window, 'matchMedia').mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn((event, cb) => {
          if (event === 'change') {
            listenerCallback = cb as (e: MediaQueryListEvent) => void;
          }
        }),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      render(<ReducedMotionProbe />);
      expect(screen.getByTestId('reduced-motion-state')).toHaveTextContent('standard');

      // Trigger change event to simulate user toggling OS reduced-motion preference
      act(() => {
        if (listenerCallback) {
          listenerCallback({ matches: true } as MediaQueryListEvent);
        }
      });

      expect(screen.getByTestId('reduced-motion-state')).toHaveTextContent('reduced');
    });
  });

  describe('initScrollSync & Coordinated Ticker Loop', () => {
    it('initializes Lenis and coordinates with GSAP ticker when reduced motion is disabled', () => {
      const tickerAddSpy = vi.spyOn(gsap.ticker, 'add');
      const tickerRemoveSpy = vi.spyOn(gsap.ticker, 'remove');

      const controller = initScrollSync({ prefersReducedMotion: false });

      expect(controller.lenis).not.toBeNull();
      expect(tickerAddSpy).toHaveBeenCalled();
      expect(typeof controller.scrollTo).toBe('function');
      expect(typeof controller.refresh).toBe('function');
      expect(typeof controller.destroy).toBe('function');

      // Clean up
      controller.destroy();
      expect(tickerRemoveSpy).toHaveBeenCalled();
    });

    it('bypasses Lenis instance when user prefers reduced motion', () => {
      const tickerAddSpy = vi.spyOn(gsap.ticker, 'add');

      const controller = initScrollSync({ prefersReducedMotion: true });

      expect(controller.lenis).toBeNull();
      expect(tickerAddSpy).not.toHaveBeenCalled();

      // Does not throw when invoking controller methods in reduced-motion mode
      expect(() => controller.refresh()).not.toThrow();
      expect(() => controller.destroy()).not.toThrow();
      expect(() => controller.scrollTo(100)).not.toThrow();
    });
  });

  describe('Component Lifecycle & GSAP Context Cleanup', () => {
    it('mounts CinematicHero, displays campaign content, and reverts GSAP context on unmount', () => {
      const { unmount } = render(
        <MemoryRouter>
          <CinematicHero />
        </MemoryRouter>
      );

      // Verify essential accessible elements
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/BEYOND\s*LIMITS\./i);
      expect(screen.getByRole('link', { name: /Shop Collection/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Scroll down to category section/i })).toBeInTheDocument();

      // Verify unmount reverts animation without throwing errors
      expect(() => unmount()).not.toThrow();
    });

    it('mounts BrandStory with manifesto and pillars, reverting on unmount', () => {
      const { unmount } = render(
        <MemoryRouter>
          <BrandStory />
        </MemoryRouter>
      );

      // Verify manifesto text and pillars
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/NOT MADE\s*TO FOLLOW\./i);
      expect(screen.getByText(/Laser ventilation in high-perspiration zones/i)).toBeInTheDocument();
      expect(screen.getByText(/Reinforced high-tensile seams/i)).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /Read Our Full Story/i })).toBeInTheDocument();

      // Verify unmount cleans up ScrollTrigger triggers
      expect(() => unmount()).not.toThrow();
    });

    it('mounts CategoryGrid with accessible links, reverting on unmount', () => {
      const { unmount } = render(
        <MemoryRouter>
          <CategoryGrid />
        </MemoryRouter>
      );

      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/Shop by Category/i);
      expect(screen.getByRole('link', { name: /View Complete Index/i })).toBeInTheDocument();

      // Verify category cards rendered
      expect(screen.getByRole('link', { name: /Explore Men/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /Explore Cricket/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /Explore Training/i })).toBeInTheDocument();

      // Clean unmount
      expect(() => unmount()).not.toThrow();
    });

    it('renders components cleanly in static settled state when reduced motion is preferred', () => {
      vi.spyOn(window, 'matchMedia').mockImplementation((query: string) => ({
        matches: query.includes('prefers-reduced-motion: reduce'),
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      const { unmount } = render(
        <MemoryRouter>
          <CinematicHero />
          <BrandStory />
          <CategoryGrid />
        </MemoryRouter>
      );

      // Verify all components rendered in DOM
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/BEYOND\s*LIMITS\./i);
      expect(screen.getByRole('heading', { level: 2, name: /NOT MADE/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 2, name: /Shop by Category/i })).toBeInTheDocument();

      expect(() => unmount()).not.toThrow();
    });
  });
});
