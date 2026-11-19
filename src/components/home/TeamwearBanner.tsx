import React from 'react';
import { Link } from 'react-router-dom';
import { Users, ArrowRight, ShieldCheck, Palette, Award } from 'lucide-react';

export const TeamwearBanner: React.FC = () => {
  return (
    <section className="py-20 bg-vats-charcoal/50 border-t border-vats-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-vats-black border border-vats-border rounded-sm p-8 sm:p-12 relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-vats-lime/5 rounded-full blur-3xl pointer-events-none" />

          {/* Left content (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-vats-lime uppercase tracking-widest font-bold">
              <Users className="w-4 h-4" />
              <span>CUSTOM TEAMS & ACADEMIES</span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-vats-offwhite tracking-tight leading-none uppercase">
              Bespoke Teamwear. <br />
              <span className="text-vats-lime">Engineered For Champions.</span>
            </h2>

            <p className="text-xs sm:text-sm text-vats-muted leading-relaxed max-w-xl">
              Equip your school, university, cricket club, or professional football academy with match-ready custom sublimated kits, tournament warm-ups, and custom team travel gear.
            </p>

            {/* Feature Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs text-vats-offwhite/90">
                <Palette className="w-4 h-4 text-vats-lime flex-shrink-0" />
                <span>Unlimited Colors</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-vats-offwhite/90">
                <Award className="w-4 h-4 text-vats-lime flex-shrink-0" />
                <span>Custom Crests</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-vats-offwhite/90">
                <ShieldCheck className="w-4 h-4 text-vats-lime flex-shrink-0" />
                <span>Bulk Discounts</span>
              </div>
            </div>

            <div className="pt-4">
              <Link
                to="/teamwear"
                className="inline-flex items-center gap-2 px-8 py-4 bg-vats-lime hover:bg-vats-limeHover text-vats-black font-extrabold text-xs uppercase tracking-widest transition-all rounded-sm shadow-lg shadow-vats-lime/10"
              >
                Request Custom Team Quotation <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right image card (5 cols) */}
          <div className="lg:col-span-5 relative aspect-[4/3] rounded-sm overflow-hidden border border-vats-border">
            <img
              src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1000&q=80"
              alt="Custom sports kit on field"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-vats-black/90 via-transparent to-transparent flex items-end p-5">
              <span className="text-xs font-mono text-vats-lime uppercase tracking-widest font-bold">
                15+ Minimum Order Quantity
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
