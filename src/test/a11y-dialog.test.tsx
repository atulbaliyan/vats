import { useState } from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AccessibleModal, AccessibleDrawer } from '../components/ui/Dialog';
import { QuickViewModal } from '../components/common/QuickViewModal';
import { MobileNav } from '../components/common/MobileNav';
import { ProductCard } from '../components/products/ProductCard';
import { PRODUCTS } from '../data/products';
import { useUIStore } from '../store/useUIStore';

describe('Phase 4: Accessibility & Dialog Ergonomics', () => {
  beforeEach(() => {
    useUIStore.setState({
      quickViewProduct: null,
      isMobileMenuOpen: false,
      isSearchOpen: false,
      toasts: [],
    });
  });

  describe('AccessibleModal Primitive', () => {
    const ModalTestComponent = () => {
      const [isOpen, setIsOpen] = useState(false);
      return (
        <div>
          <button type="button" onClick={() => setIsOpen(true)}>
            Open Dialog Trigger
          </button>
          <AccessibleModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            title="Test Athlete Dialog"
            description="Detailed test dialog description for screen readers"
          >
            <div className="p-4">
              <p>Modal Body Content</p>
              <button type="button" onClick={() => setIsOpen(false)}>
                Confirm Action
              </button>
            </div>
          </AccessibleModal>
        </div>
      );
    };

    it('renders with appropriate ARIA roles and labels when open', async () => {
      render(<ModalTestComponent />);

      const triggerBtn = screen.getByRole('button', { name: /Open Dialog Trigger/i });
      fireEvent.click(triggerBtn);

      const dialog = await screen.findByRole('dialog');
      expect(dialog).toBeInTheDocument();
      expect(screen.getByText('Test Athlete Dialog')).toBeInTheDocument();
      expect(screen.getByText('Detailed test dialog description for screen readers')).toBeInTheDocument();
    });

    it('dismisses modal on Escape key press', async () => {
      render(<ModalTestComponent />);

      const triggerBtn = screen.getByRole('button', { name: /Open Dialog Trigger/i });
      fireEvent.click(triggerBtn);

      const dialog = await screen.findByRole('dialog');
      expect(dialog).toBeInTheDocument();

      // Press Escape key
      fireEvent.keyDown(dialog, { key: 'Escape', code: 'Escape', keyCode: 27 });

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('closes when close button is clicked', async () => {
      render(<ModalTestComponent />);

      fireEvent.click(screen.getByRole('button', { name: /Open Dialog Trigger/i }));
      expect(await screen.findByRole('dialog')).toBeInTheDocument();

      const closeBtn = screen.getByRole('button', { name: /Close Test Athlete Dialog/i });
      fireEvent.click(closeBtn);

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  describe('AccessibleDrawer Primitive', () => {
    it('renders as dialog and dismisses on Escape', async () => {
      const onClose = vi.fn();

      render(
        <AccessibleDrawer
          isOpen={true}
          onClose={onClose}
          title="Cart Drawer Title"
          side="right"
        >
          <div>Drawer Content</div>
        </AccessibleDrawer>
      );

      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();

      fireEvent.keyDown(dialog, { key: 'Escape', code: 'Escape', keyCode: 27 });
      expect(onClose).toHaveBeenCalled();
    });
  });

  describe('QuickViewModal Component', () => {
    it('presents accessible color and size radiogroups with selectable options', async () => {
      const product = PRODUCTS[0];
      useUIStore.getState().openQuickView(product);

      render(
        <MemoryRouter>
          <QuickViewModal />
        </MemoryRouter>
      );

      expect(await screen.findByRole('dialog')).toBeInTheDocument();

      // Color radiogroup
      const colorRadios = screen.getAllByRole('radio', { name: /Color option:/i });
      expect(colorRadios.length).toBe(product.colors.length);

      // Size radiogroup
      const sizeRadios = screen.getAllByRole('radio', { name: /Size /i });
      expect(sizeRadios.length).toBe(product.sizes.length);

      // Click a different size
      const sizeBtn = sizeRadios[1];
      fireEvent.click(sizeBtn);
      expect(sizeBtn).toHaveAttribute('aria-checked', 'true');
    });
  });

  describe('MobileNav Interaction & Accessibility', () => {
    it('supports keyboard expanding of subcategories and Escape dismissal', async () => {
      useUIStore.getState().openMobileMenu();

      render(
        <MemoryRouter>
          <MobileNav />
        </MemoryRouter>
      );

      const dialog = await screen.findByRole('dialog');
      expect(dialog).toBeInTheDocument();

      // Find toggle subcategory button for MEN
      const expandBtn = screen.getByRole('button', { name: /Toggle MEN subcategories/i });
      expect(expandBtn).toHaveAttribute('aria-expanded', 'false');

      fireEvent.click(expandBtn);
      expect(expandBtn).toHaveAttribute('aria-expanded', 'true');

      // Dismiss on escape
      fireEvent.keyDown(dialog, { key: 'Escape', code: 'Escape', keyCode: 27 });
      expect(useUIStore.getState().isMobileMenuOpen).toBe(false);
    });
  });

  describe('ProductCard Component Semantics', () => {
    it('has explicit accessible names for action buttons and color swatches', () => {
      const product = PRODUCTS[0];
      render(
        <MemoryRouter>
          <ProductCard product={product} />
        </MemoryRouter>
      );

      // Wishlist button has descriptive name
      expect(
        screen.getByRole('button', { name: new RegExp(`Add ${product.name} to wishlist`, 'i') })
      ).toBeInTheDocument();

      // Quick add button has descriptive name
      expect(
        screen.getAllByRole('button', { name: new RegExp(`Quick add ${product.name}`, 'i') })[0]
      ).toBeInTheDocument();

      // Quick view button has descriptive name
      expect(
        screen.getByRole('button', { name: new RegExp(`Quick view details for ${product.name}`, 'i') })
      ).toBeInTheDocument();
    });
  });
});
