import React, { useState } from 'react';
import { ArrowRight, Check, Mail } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubmitted(true);
  };

  return (
    <section className="py-20 bg-vats-black border-t border-vats-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="w-12 h-12 rounded-full bg-vats-charcoal border border-vats-border mx-auto flex items-center justify-center text-vats-lime">
          <Mail className="w-5 h-5" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono text-vats-lime uppercase tracking-widest font-bold">
            VATS ATHLETE INSIDER
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-vats-offwhite tracking-tight leading-none uppercase">
            STAY IN THE GAME.
          </h2>
          <p className="text-xs sm:text-sm text-vats-muted max-w-md mx-auto">
            Get priority access to restricted heavyweight drops, performance lab research, and private member promotions.
          </p>
        </div>

        {submitted ? (
          <div className="p-4 bg-vats-charcoal border border-vats-lime/50 rounded-sm text-vats-lime text-xs font-semibold max-w-md mx-auto flex items-center justify-center gap-2">
            <Check className="w-4 h-4" /> You're registered for the next exclusive release drop.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 px-4 py-3.5 bg-vats-surface border border-vats-border text-xs text-vats-offwhite placeholder:text-vats-muted focus:border-vats-lime focus:outline-none rounded-sm"
            />
            <button
              type="submit"
              className="px-6 py-3.5 bg-vats-lime hover:bg-vats-limeHover text-vats-black font-extrabold text-xs uppercase tracking-widest transition-all rounded-sm flex items-center justify-center gap-1.5 shadow-lg shadow-vats-lime/10"
            >
              Subscribe <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

        <div className="text-[11px] text-vats-muted/60">
          Demo newsletter simulation. No unsolicited third-party spam.
        </div>
      </div>
    </section>
  );
};
