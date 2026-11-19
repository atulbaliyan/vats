import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { gsap, ScrollTrigger } from '../../animations/scrollSync';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const CinematicHero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const titleLine1Ref = useRef<HTMLSpanElement>(null);
  const titleLine2Ref = useRef<HTMLSpanElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLButtonElement>(null);

  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // If user prefers reduced motion, leave elements in settled static state immediately
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // 1. Tag & Background entrance
      tl.fromTo(
        tagRef.current,
        { opacity: 0, y: -15 },
        { opacity: 1, y: 0, duration: 0.6 }
      )
        .fromTo(
          bgRef.current,
          { scale: 1.08, opacity: 0.7 },
          { scale: 1, opacity: 1, duration: 1.2, ease: 'power2.out' },
          '-=0.4'
        )
        // 2. Headline line-by-line reveal
        .fromTo(
          [titleLine1Ref.current, titleLine2Ref.current],
          { y: 50, opacity: 0, skewY: 3 },
          { y: 0, opacity: 1, skewY: 0, duration: 0.8, stagger: 0.12 },
          '-=0.7'
        )
        // 3. Subtitle fade up
        .fromTo(
          subRef.current,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          '-=0.4'
        )
        // 4. CTA buttons stagger
        .fromTo(
          ctaRef.current?.children ? Array.from(ctaRef.current.children) : [],
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
          '-=0.3'
        )
        // 5. Scroll down indicator
        .fromTo(
          scrollIndicatorRef.current,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.5 },
          '-=0.2'
        );

      // Subtle scroll parallax on background (desktop/fine pointer)
      if (window.matchMedia('(min-width: 768px)').matches && bgRef.current) {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          animation: gsap.to(bgRef.current, {
            yPercent: 12,
            ease: 'none',
          }),
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const scrollToNext = () => {
    const el = document.getElementById('shop-by-category');
    if (el) {
      el.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-vats-black select-none"
      aria-label="VATS Sports Hero Campaign"
    >
      {/* Background Cinematic Image with Gradients */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full bg-cover bg-center will-change-transform"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=2000&q=85")',
        }}
      >
        {/* Layered cinema masks */}
        <div className="absolute inset-0 bg-gradient-to-t from-vats-black via-vats-black/60 to-vats-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-vats-black/90 via-vats-black/40 to-transparent" />
      </div>

      {/* Decorative Brand Watermark */}
      <div
        className="absolute right-4 bottom-12 font-display text-[15vw] text-white/[0.03] select-none pointer-events-none leading-none tracking-tighter"
        aria-hidden="true"
      >
        VATS
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 w-full flex flex-col justify-center min-h-[75vh]">
        <div className="max-w-3xl space-y-6">
          {/* Campaign Tag */}
          <div
            ref={tagRef}
            className="inline-flex items-center gap-2 px-3 py-1 bg-vats-charcoal/80 border border-vats-border backdrop-blur-md text-[11px] font-mono text-vats-lime uppercase tracking-widest rounded-sm"
          >
            <span className="w-2 h-2 rounded-full bg-vats-lime animate-pulse" aria-hidden="true" />
            <span>SEASON 26 // TECHNICAL APPAREL</span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-white leading-[0.88] uppercase">
            <span ref={titleLine1Ref} className="block">
              BEYOND
            </span>
            <span ref={titleLine2Ref} className="block text-vats-lime italic">
              LIMITS.
            </span>
          </h1>

          {/* Editorial Subheading */}
          <p
            ref={subRef}
            className="text-base sm:text-xl text-vats-offwhite/90 max-w-xl font-light tracking-wide leading-relaxed"
          >
            Engineered for movement. Designed for ambition. High-performance activewear crafted to withstand the demands of elite athletes and everyday champions.
          </p>

          {/* Action CTAs */}
          <div
            ref={ctaRef}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4"
          >
            <Link
              to="/shop"
              className="px-8 py-4 bg-vats-lime hover:bg-vats-limeHover text-vats-black font-extrabold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all rounded-sm shadow-xl shadow-vats-lime/20 group focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
            >
              Shop Collection{' '}
              <ArrowRight
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                aria-hidden="true"
              />
            </Link>

            <Link
              to="/collections"
              className="px-8 py-4 bg-vats-charcoal/80 hover:bg-vats-surface text-vats-offwhite border border-vats-border hover:border-vats-muted font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all rounded-sm backdrop-blur-md focus-visible:ring-2 focus-visible:ring-vats-lime focus-visible:outline-none"
            >
              Explore VATS Sports
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <button
        ref={scrollIndicatorRef}
        type="button"
        onClick={scrollToNext}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-[10px] uppercase font-mono tracking-widest text-vats-muted hover:text-vats-lime transition-colors focus-visible:ring-2 focus-visible:ring-vats-lime focus-visible:outline-none rounded-sm"
        aria-label="Scroll down to category section"
      >
        <span>Scroll to Explore</span>
        <ChevronDown className="w-4 h-4 animate-bounce text-vats-lime" aria-hidden="true" />
      </button>
    </section>
  );
};
