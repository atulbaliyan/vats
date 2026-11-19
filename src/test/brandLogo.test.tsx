import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrandLogo } from '../components/common/BrandLogo';

describe('BrandLogo Component', () => {
  it('renders default full logo with accessible alt text', () => {
    render(<BrandLogo />);
    const img = screen.getByRole('img', { name: /VATS SPORTS Official Brand Logo/i });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('loading', 'lazy');
    expect(img).toHaveAttribute('decoding', 'async');
  });

  it('renders symbol variant when variant="symbol"', () => {
    render(<BrandLogo variant="symbol" alt="VATS Crest" />);
    const img = screen.getByRole('img', { name: /VATS Crest/i });
    expect(img).toBeInTheDocument();
    expect(img.getAttribute('src')).toMatch(/vats-symbol/);
  });

  it('renders dark theme variant for dark storefront surfaces', () => {
    render(<BrandLogo variant="full" theme="dark" alt="VATS Dark Logo" />);
    const img = screen.getByRole('img', { name: /VATS Dark Logo/i });
    expect(img).toBeInTheDocument();
    expect(img.getAttribute('src')).toMatch(/vats-logo-dark/);
  });

  it('renders light theme variant for light surfaces', () => {
    render(<BrandLogo variant="full" theme="light" alt="VATS Light Logo" />);
    const img = screen.getByRole('img', { name: /VATS Light Logo/i });
    expect(img).toBeInTheDocument();
    expect(img.getAttribute('src')).toMatch(/vats-logo-light/);
  });

  it('supports priority loading for above-the-fold header usage', () => {
    render(<BrandLogo priority />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('loading', 'eager');
  });

  it('passes custom classNames and HTML image attributes', () => {
    render(<BrandLogo className="h-9 w-auto custom-class" data-testid="test-brand-logo" />);
    const img = screen.getByTestId('test-brand-logo');
    expect(img).toHaveClass('h-9', 'w-auto', 'custom-class');
  });
});
