import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export const FeaturedCampaign: React.FC = () => {
  return (
    <section className="relative py-28 sm:py-36 overflow-hidden bg-vats-black border-t border-vats-border select-none">
      {/* Background Campaign Imagery */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40 hover:scale-105 transition-transform duration-1000"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=2000&q=85")',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-vats-black via-vats-black/80 to-vats-black/50" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-vats-lime/10 border border-vats-lime/30 text-vats-lime text-xs font-mono font-bold uppercase tracking-widest rounded-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>EXCLUSIVE DROP CAPSULE</span>
          </div>

          <h2 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-tight leading-[0.9] uppercase">
            THE EVERYDAY <br />
            <span className="text-vats-lime italic">ATHLETE.</span>
          </h2>

          <p className="text-sm sm:text-base text-vats-offwhite/90 leading-relaxed font-light max-w-lg">
            Heavyweight 280 GSM cotton paired with bonded technical fleece. Designed to transition seamlessly from powerlifting platforms to urban concrete.
          </p>

          <div className="pt-2">
            <Link
              to="/collections"
              className="inline-flex items-center gap-2 px-8 py-4 bg-vats-lime hover:bg-vats-limeHover text-vats-black font-extrabold text-xs uppercase tracking-widest transition-all rounded-sm shadow-xl shadow-vats-lime/20"
            >
              Shop The Campaign <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
