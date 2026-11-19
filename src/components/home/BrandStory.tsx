import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Zap, Activity } from 'lucide-react';

export const BrandStory: React.FC = () => {
  return (
    <section className="py-24 bg-vats-black border-t border-vats-border overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Asymmetrical Editorial Image Composition (6 cols) */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-vats-charcoal border border-vats-border">
              <img
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80"
                alt="Athlete training with discipline"
                className="w-full h-full object-cover filter contrast-125 hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-vats-black/80 via-transparent to-transparent" />
            </div>

            {/* Overlapping Float Accent Badge */}
            <div className="absolute -bottom-6 -right-4 sm:-right-8 bg-vats-charcoal/95 border border-vats-lime/40 backdrop-blur-md p-4 sm:p-6 rounded-sm shadow-2xl max-w-[220px] sm:max-w-[260px] space-y-2">
              <div className="flex items-center gap-2 text-vats-lime text-xs font-mono font-bold uppercase tracking-widest">
                <Zap className="w-4 h-4 fill-current" />
                <span>TECHNICAL LAB</span>
              </div>
              <p className="text-xs text-vats-offwhite/90 leading-relaxed">
                4-way flex matrix with zero thermal drag. Tested under high load.
              </p>
            </div>
          </div>

          {/* Right Column: Editorial Copy & Manifesto (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-vats-border">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-vats-offwhite font-bold text-sm">
                  <Activity className="w-4 h-4 text-vats-lime" />
                  <span>Sweat Mapping</span>
                </div>
                <p className="text-xs text-vats-muted">
                  Laser ventilation in high-perspiration zones to accelerate dry time.
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-vats-offwhite font-bold text-sm">
                  <ShieldCheck className="w-4 h-4 text-vats-lime" />
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
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-vats-charcoal hover:bg-vats-surface border border-vats-border hover:border-vats-lime text-vats-offwhite text-xs font-bold uppercase tracking-widest transition-all rounded-sm"
              >
                Read Our Full Story <ArrowRight className="w-4 h-4 text-vats-lime" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
