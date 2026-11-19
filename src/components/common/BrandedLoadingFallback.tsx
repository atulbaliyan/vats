import React from 'react';
import { BrandLogo } from './BrandLogo';

export const BrandedLoadingFallback: React.FC = () => {
  return (
    <div
      className="min-h-[60vh] flex flex-col items-center justify-center bg-vats-black text-vats-offwhite select-none"
      role="status"
      aria-label="Loading page content"
    >
      <div className="flex flex-col items-center gap-4">
        {/* Official VATS brand shield symbol with subtle pulse glow */}
        <div className="w-14 h-16 flex items-center justify-center p-2 rounded-xl bg-vats-charcoal/60 border border-vats-border shadow-2xl">
          <BrandLogo
            variant="symbol"
            className="w-full h-full object-contain animate-pulse"
            alt="Loading..."
          />
        </div>
        <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest text-vats-muted uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-vats-lime animate-ping" />
          <span>VATS // PERFORMANCE LAB</span>
        </div>
      </div>
    </div>
  );
};
