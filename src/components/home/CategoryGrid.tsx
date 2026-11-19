import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES } from '../../data/products';

export const CategoryGrid: React.FC = () => {
  return (
    <section id="shop-by-category" className="py-20 bg-vats-black border-t border-vats-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="text-xs font-mono text-vats-lime uppercase tracking-widest font-semibold mb-2">
              CURATED DISCIPLINES
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-vats-offwhite tracking-tight uppercase leading-none">
              Shop by Category
            </h2>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-vats-lime uppercase tracking-wider hover:underline"
          >
            View Complete Index <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Asymmetrical Editorial Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CATEGORIES.map((cat, idx) => (
            <Link
              key={cat.id}
              to={cat.link}
              className={`group relative overflow-hidden rounded-sm bg-vats-charcoal border border-vats-border flex flex-col justify-end p-6 min-h-[360px] sm:min-h-[420px] transition-all duration-500 hover:border-vats-lime/60 ${
                idx === 0 || idx === 3 ? 'lg:col-span-1' : ''
              }`}
            >
              {/* Image Background with Zoom */}
              <img
                src={cat.image}
                alt={cat.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-70 group-hover:opacity-85"
                loading="lazy"
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-vats-black via-vats-black/50 to-transparent transition-opacity group-hover:opacity-90" />

              {/* Floating Top Tag */}
              <div className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full bg-vats-black/60 backdrop-blur-md border border-vats-border/80 flex items-center justify-center text-vats-offwhite group-hover:bg-vats-lime group-hover:text-vats-black group-hover:border-vats-lime transition-all duration-300">
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>

              {/* Bottom Card Content */}
              <div className="relative z-10 space-y-1.5">
                <span className="text-[11px] font-mono text-vats-lime font-bold uppercase tracking-widest block">
                  {cat.count}
                </span>
                <h3 className="font-display text-3xl sm:text-4xl text-white tracking-wider leading-none">
                  {cat.title}
                </h3>
                <p className="text-xs text-vats-offwhite/80 max-w-xs transition-colors group-hover:text-vats-offwhite">
                  {cat.subtitle}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
