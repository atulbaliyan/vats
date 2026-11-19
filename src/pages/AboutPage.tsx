import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Zap, Activity, Flame } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="py-12 sm:py-20 bg-vats-black min-h-screen text-vats-offwhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Editorial Brand Header */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-mono text-vats-lime uppercase tracking-widest font-bold">
            ABOUT VATS SPORTS // PHILOSOPHY
          </span>
          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-[0.88] uppercase">
            WE ARE NOT MADE <br />
            <span className="text-vats-lime italic">TO FOLLOW.</span>
          </h1>
          <p className="text-base sm:text-xl text-vats-muted leading-relaxed font-light pt-2">
            VATS SPORTS was conceived out of an obsession with athletic discipline. We design performance sportswear that merges aerodynamic functionality with modern streetwear silhouettes.
          </p>
        </div>

        {/* Hero Visual Imagery */}
        <div className="relative aspect-[21/9] w-full rounded-sm overflow-hidden border border-vats-border">
          <img
            src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=2000&q=85"
            alt="Athletes training at sunrise"
            className="w-full h-full object-cover filter brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-vats-black via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 max-w-md">
            <span className="text-xs font-mono text-vats-lime uppercase tracking-widest font-bold">
              PERFORMANCE LAB
            </span>
            <p className="text-sm font-bold text-white mt-1">
              Tested on turf, tracks, and iron platforms across India.
            </p>
          </div>
        </div>

        {/* 3 Core Tenets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-vats-surface border border-vats-border rounded-sm space-y-4">
            <div className="w-12 h-12 bg-vats-charcoal border border-vats-border flex items-center justify-center text-vats-lime">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-display text-3xl tracking-wider text-vats-offwhite">
              AERODYNAMIC MOVEMENT
            </h3>
            <p className="text-xs text-vats-muted leading-relaxed">
              Every seam is strategically offset from high-friction zones to eliminate irritation. Lightweight, four-way stretch synthetic textiles allow explosive physical expression without restriction.
            </p>
          </div>

          <div className="p-8 bg-vats-surface border border-vats-border rounded-sm space-y-4">
            <div className="w-12 h-12 bg-vats-charcoal border border-vats-border flex items-center justify-center text-vats-lime">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="font-display text-3xl tracking-wider text-vats-offwhite">
              MICRO-PERFORATED COOLING
            </h3>
            <p className="text-xs text-vats-muted leading-relaxed">
              Our AeroDry micro-mesh weaves accelerate moisture evaporation, pulling heat and sweat away from the body during demanding summer cricket sessions and intense gym conditioning.
            </p>
          </div>

          <div className="p-8 bg-vats-surface border border-vats-border rounded-sm space-y-4">
            <div className="w-12 h-12 bg-vats-charcoal border border-vats-border flex items-center justify-center text-vats-lime">
              <Flame className="w-6 h-6" />
            </div>
            <h3 className="font-display text-3xl tracking-wider text-vats-offwhite">
              ELEVATED STREET LUXURY
            </h3>
            <p className="text-xs text-vats-muted leading-relaxed">
              We bridge the gap between technical athletic durability and oversized streetwear culture. From 280 GSM combed cottons to bonded tech fleece, our drops are worn with pride on and off the court.
            </p>
          </div>
        </div>

        {/* Brand Transparency Note */}
        <div className="p-8 bg-vats-charcoal/50 border border-vats-border rounded-sm text-xs text-vats-muted space-y-3">
          <div className="flex items-center gap-2 text-vats-lime font-mono font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>DESIGN PROPOSAL & TRANSPARENCY NOTICE</span>
          </div>
          <p className="leading-relaxed">
            This digital platform represents an independent frontend architecture and design concept developed for VATS SPORTS. Brand copy, mission statements, and product narratives are proposals created to demonstrate creative direction and commercial brand positioning.
          </p>
        </div>

        {/* CTA to Shop */}
        <div className="text-center pt-8 border-t border-vats-border">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 bg-vats-lime hover:bg-vats-limeHover text-vats-black font-extrabold uppercase text-xs tracking-widest transition-all rounded-sm shadow-xl shadow-vats-lime/20"
          >
            Explore Performance Collection <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
