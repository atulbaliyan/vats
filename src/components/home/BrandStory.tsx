import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Zap, Activity } from 'lucide-react';
import { gsap } from '../../animations/scrollSync';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const BrandStory: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const isDesktop = window.matchMedia('(min-width: 1024px)').matches;

      if (isDesktop) {
        // Desktop ScrollTrigger: clip-path image reveal & parallax
        if (imageRef.current && imageWrapperRef.current) {
          gsap.fromTo(
            imageRef.current,
            { scale: 1.15 },
            {
              scale: 1,
              duration: 1.4,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: imageWrapperRef.current,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
            }
          );

          // Subtle parallax scrub
          gsap.to(imageRef.current, {
            yPercent: -8,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          });
        }

        // Float badge entrance
        if (badgeRef.current) {
          gsap.fromTo(
            badgeRef.current,
            { opacity: 0, scale: 0.85, y: 20 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.8,
              ease: 'back.out(1.5)',
              scrollTrigger: {
                trigger: badgeRef.current,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }

        // Editorial Copy & Pillars stagger
        if (textColRef.current) {
          gsap.fromTo(
            textColRef.current.children,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.12,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: textColRef.current,
                start: 'top 75%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      } else {
        // Mobile / Tablet: Lightweight, single viewport trigger
        if (containerRef.current) {
          gsap.fromTo(
            containerRef.current,
            { opacity: 0.85 },
            {
              opacity: 1,
              duration: 0.6,
              scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 85%',
              },
            }
          );
        }
      }
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={containerRef}
      className="py-24 bg-vats-black border-t border-vats-border overflow-hidden relative select-none"
      aria-label="VATS Sports Brand Story and Manifesto"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Asymmetrical Editorial Image Composition (6 cols) */}
          <div className="lg:col-span-6 relative">
            <div
              ref={imageWrapperRef}
              className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-vats-charcoal border border-vats-border"
            >
              <img
                ref={imageRef}
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80"
                alt="Athlete training with discipline"
                width={600}
                height={750}
                className="w-full h-full object-cover filter contrast-125 will-change-transform"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-vats-black/80 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Overlapping Float Accent Badge */}
            <div
              ref={badgeRef}
              className="absolute -bottom-6 -right-4 sm:-right-8 bg-vats-charcoal/95 border border-vats-lime/40 backdrop-blur-md p-4 sm:p-6 rounded-sm shadow-2xl max-w-[220px] sm:max-w-[260px] space-y-2 will-change-transform"
            >
              <div className="flex items-center gap-2 text-vats-lime text-xs font-mono font-bold uppercase tracking-widest">
                <Zap className="w-4 h-4 fill-current" aria-hidden="true" />
                <span>TECHNICAL LAB</span>
              </div>
              <p className="text-xs text-vats-offwhite/90 leading-relaxed">
                4-way flex matrix with zero thermal drag. Tested under high compound load.
              </p>
            </div>
          </div>

          {/* Right Column: Editorial Copy & Manifesto (6 cols) */}
          <div ref={textColRef} className="lg:col-span-6 space-y-6">
            <div className="text-xs font-mono text-vats-lime font-bold uppercase tracking-widest">
              BRAND MANIFESTO
            </div>

            <h2 className="font-display text-5xl sm:text-6xl md:text-7xl text-vats-offwhite tracking-tight leading-[0.92] uppercase">
              NOT MADE <br />
              <span className="text-vats-lime italic">TO FOLLOW.</span>
            </h2>

            <p className="text-base sm:text-lg text-vats-offwhite/90 leading-relaxed font-light">
              We reject mediocrity and generic standards. At VATS SPORTS, every stitch, laser perforation, and ergonomic cut is calculated for the relentless athlete. From the cricket ground at dawn to late-night iron sessions, our apparel is an extension of your willpower.
            </p>

            {/* 3 Core Pillars */}
            <div
              ref={pillarsRef}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-vats-border"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-vats-offwhite font-bold text-sm">
                  <Activity className="w-4 h-4 text-vats-lime" aria-hidden="true" />
                  <span>Sweat Mapping</span>
                </div>
                <p className="text-xs text-vats-muted">
                  Laser ventilation in high-perspiration zones to accelerate dry time.
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-vats-offwhite font-bold text-sm">
                  <ShieldCheck className="w-4 h-4 text-vats-lime" aria-hidden="true" />
                  <span>Squat & Burst Tested</span>
                </div>
                <p className="text-xs text-vats-muted">
                  Reinforced high-tensile seams built to survive intense compound torque.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-vats-charcoal hover:bg-vats-surface border border-vats-border hover:border-vats-lime text-vats-offwhite text-xs font-bold uppercase tracking-widest transition-all rounded-sm focus-visible:ring-2 focus-visible:ring-vats-lime focus-visible:outline-none"
              >
                Read Our Full Story <ArrowRight className="w-4 h-4 text-vats-lime" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
