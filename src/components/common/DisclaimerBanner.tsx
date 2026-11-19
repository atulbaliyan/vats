import React, { useState } from 'react';
import { Info, X } from 'lucide-react';

export const DisclaimerBanner: React.FC = () => {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  return (
    <aside
      aria-label="Demo Disclaimer"
      className="fixed bottom-3 right-3 z-30 max-w-sm bg-vats-charcoal/95 border border-vats-border/80 backdrop-blur-md p-3 rounded-sm shadow-2xl text-[11px] text-vats-muted flex items-start gap-2.5 animate-in slide-in-from-bottom duration-300"
    >
      <Info className="w-4 h-4 text-vats-lime flex-shrink-0 mt-0.5" />
      <div className="flex-1 leading-snug">
        <strong className="text-vats-offwhite block mb-0.5">DEMONSTRATION CONCEPT</strong>
        Independent website concept for Vats Sports. Not an official website. Product listings and prices are illustrative.
      </div>
      <button
        type="button"
        onClick={() => setIsDismissed(true)}
        className="text-vats-muted hover:text-white p-0.5 transition-colors"
        aria-label="Dismiss demo disclaimer"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </aside>
  );
};
