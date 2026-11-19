import React from 'react';

export const BrandedLoadingFallback: React.FC = () => {
  return (
    <div
      className="min-h-[60vh] flex flex-col items-center justify-center bg-vats-black text-vats-offwhite select-none"
      role="status"
      aria-label="Loading page content"
    >
      <div className="flex flex-col items-center gap-3">
        {/* Sleek VATS brand glyph with lime pulse */}
        <div className="w-10 h-10 bg-vats-charcoal border border-vats-border flex items-center justify-center font-display text-2xl text-vats-lime animate-pulse-lime rounded-sm">
          <span className="skew-x-[-12deg]">V</span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-mono tracking-widest text-vats-muted uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-vats-lime animate-ping" />
          <span>VATS // PERFORMANCE LAB</span>
        </div>
      </div>
    </div>
  );
};
