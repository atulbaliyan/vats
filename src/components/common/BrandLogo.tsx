import React from 'react';
import logoMaster from '../../assets/branding/vats-logo.svg';
import logoLight from '../../assets/branding/vats-logo-light.svg';
import logoDark from '../../assets/branding/vats-logo-dark.svg';
import symbol from '../../assets/branding/vats-symbol.svg';

export type BrandLogoVariant = 'full' | 'symbol';
export type BrandLogoTheme = 'dark' | 'light' | 'auto';

export interface BrandLogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /**
   * 'full': Complete lockup with official shield symbol + VATS wordmark.
   * 'symbol': Standalone official shield emblem (suitable for badges, loaders, favicons).
   */
  variant?: BrandLogoVariant;
  /**
   * 'dark': Optimized for dark backgrounds (white text, high-contrast shield outline).
   * 'light': Optimized for light backgrounds (navy text, authentic crest).
   * 'auto': Default authentic branding palette.
   */
  theme?: BrandLogoTheme;
  /** Additional CSS class names (e.g., height, aspect ratio, hover transitions) */
  className?: string;
  /** Priority loading for critical above-the-fold assets (e.g. Header logo) */
  priority?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'full',
  theme = 'auto',
  className = '',
  priority = false,
  alt = 'VATS SPORTS Official Brand Logo',
  ...rest
}) => {
  let src = logoMaster;

  if (variant === 'symbol') {
    src = symbol;
  } else if (theme === 'dark') {
    src = logoDark;
  } else if (theme === 'light') {
    src = logoLight;
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      className={`inline-block object-contain select-none ${className}`}
      {...rest}
    />
  );
};
