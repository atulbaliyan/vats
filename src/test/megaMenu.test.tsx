import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar';
import { MobileNav } from '../components/common/MobileNav';
import { useUIStore } from '../store/useUIStore';

describe('Mega-Menu Interaction Engineering & UX Stabilization', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    useUIStore.setState({
      isMobileMenuOpen: false,
    });
  });

  afterEach(() => {
    act(() => {
      vi.runOnlyPendingTimers();
    });
    vi.useRealTimers();
  });

  const renderNavbar = () => {
    return render(
      <MemoryRouter initialEntries={['/']}>
        <Navbar />
      </MemoryRouter>
    );
  };

  it('1. Hover opens the menu', () => {
    renderNavbar();

    const menTrigger = screen.getByRole('button', { name: /^men/i });
    expect(screen.queryByRole('region', { name: /^men subcategories navigation/i })).not.toBeInTheDocument();

    act(() => {
      fireEvent.mouseEnter(menTrigger.parentElement!);
    });

    const megaMenu = screen.getByRole('region', { name: /^men subcategories navigation/i });
    expect(megaMenu).toBeInTheDocument();
    expect(menTrigger).toHaveAttribute('aria-expanded', 'true');
  });

  it('2. Moving from trigger to dropdown preserves the open state', () => {
    renderNavbar();

    const menTrigger = screen.getByRole('button', { name: /^men/i });
    act(() => {
      fireEvent.mouseEnter(menTrigger.parentElement!);
    });

    const megaMenu = screen.getByRole('region', { name: /^men subcategories navigation/i });
    expect(megaMenu).toBeInTheDocument();

    // Mouse enters the dropdown region (which is inside the same item container)
    act(() => {
      fireEvent.mouseEnter(megaMenu);
    });

    expect(screen.getByRole('region', { name: /^men subcategories navigation/i })).toBeInTheDocument();
  });

  it('3. Mouse leaving starts the 3-second timer', () => {
    renderNavbar();

    const menTrigger = screen.getByRole('button', { name: /^men/i });
    act(() => {
      fireEvent.mouseEnter(menTrigger.parentElement!);
    });

    expect(screen.getByRole('region', { name: /^men subcategories navigation/i })).toBeInTheDocument();

    // Mouse leaves the complete interaction container
    act(() => {
      fireEvent.mouseLeave(menTrigger.parentElement!);
    });

    // Advance 1.5 seconds (less than 3000ms delay)
    act(() => {
      vi.advanceTimersByTime(1500);
    });

    // Menu must still be open
    expect(screen.getByRole('region', { name: /^men subcategories navigation/i })).toBeInTheDocument();
  });

  it('4. Returning before timeout cancels closure', () => {
    renderNavbar();

    const menTrigger = screen.getByRole('button', { name: /^men/i });
    act(() => {
      fireEvent.mouseEnter(menTrigger.parentElement!);
    });

    // Mouse leaves container
    act(() => {
      fireEvent.mouseLeave(menTrigger.parentElement!);
    });

    // Advance 2 seconds (timer pending)
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    // Mouse returns to interaction region
    act(() => {
      fireEvent.mouseEnter(menTrigger.parentElement!);
    });

    // Advance past original 3000ms mark
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    // Menu must still be open because timer was canceled upon return
    expect(screen.getByRole('region', { name: /^men subcategories navigation/i })).toBeInTheDocument();
  });

  it('5. Menu closes after timeout', () => {
    renderNavbar();

    const menTrigger = screen.getByRole('button', { name: /^men/i });
    act(() => {
      fireEvent.mouseEnter(menTrigger.parentElement!);
    });

    expect(screen.getByRole('region', { name: /^men subcategories navigation/i })).toBeInTheDocument();

    // Mouse leaves container
    act(() => {
      fireEvent.mouseLeave(menTrigger.parentElement!);
    });

    // Advance by full 3000ms
    act(() => {
      vi.advanceTimersByTime(3000);
    });

    // Menu closes
    expect(screen.queryByRole('region', { name: /^men subcategories navigation/i })).not.toBeInTheDocument();
    expect(menTrigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('6. Clicking keeps the menu open', () => {
    renderNavbar();

    const menTrigger = screen.getByRole('button', { name: /^men/i });
    act(() => {
      fireEvent.click(menTrigger);
    });

    expect(screen.getByRole('region', { name: /^men subcategories navigation/i })).toBeInTheDocument();

    // Mouse leaves container
    act(() => {
      fireEvent.mouseLeave(menTrigger.parentElement!);
    });

    // Advance 5 seconds - click opened menu should NOT close on hover leave
    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(screen.getByRole('region', { name: /^men subcategories navigation/i })).toBeInTheDocument();
  });

  it('7. Clicking outside closes it', () => {
    renderNavbar();

    const menTrigger = screen.getByRole('button', { name: /^men/i });
    act(() => {
      fireEvent.click(menTrigger);
    });

    expect(screen.getByRole('region', { name: /^men subcategories navigation/i })).toBeInTheDocument();

    // Click outside on document body
    act(() => {
      fireEvent.mouseDown(document.body);
    });

    expect(screen.queryByRole('region', { name: /^men subcategories navigation/i })).not.toBeInTheDocument();
  });

  it('8. Escape closes it', () => {
    renderNavbar();

    const menTrigger = screen.getByRole('button', { name: /^men/i });
    act(() => {
      fireEvent.click(menTrigger);
    });

    expect(screen.getByRole('region', { name: /^men subcategories navigation/i })).toBeInTheDocument();

    // Press Escape
    act(() => {
      fireEvent.keyDown(document, { key: 'Escape' });
    });

    expect(screen.queryByRole('region', { name: /^men subcategories navigation/i })).not.toBeInTheDocument();
    expect(menTrigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('9. Switching MEN → WOMEN → SPORTS works', () => {
    renderNavbar();

    const menTrigger = screen.getByRole('button', { name: /^men/i });
    const womenTrigger = screen.getByRole('button', { name: /^women/i });
    const sportsTrigger = screen.getByRole('button', { name: /^sports/i });

    // Open MEN
    act(() => {
      fireEvent.mouseEnter(menTrigger.parentElement!);
    });
    expect(screen.getByRole('region', { name: /^men subcategories navigation/i })).toBeInTheDocument();
    expect(screen.queryByRole('region', { name: /^women subcategories navigation/i })).not.toBeInTheDocument();

    // Switch to WOMEN
    act(() => {
      fireEvent.mouseEnter(womenTrigger.parentElement!);
    });
    expect(screen.queryByRole('region', { name: /^men subcategories navigation/i })).not.toBeInTheDocument();
    expect(screen.getByRole('region', { name: /^women subcategories navigation/i })).toBeInTheDocument();

    // Switch to SPORTS
    act(() => {
      fireEvent.mouseEnter(sportsTrigger.parentElement!);
    });
    expect(screen.queryByRole('region', { name: /^women subcategories navigation/i })).not.toBeInTheDocument();
    expect(screen.getByRole('region', { name: /^sports subcategories navigation/i })).toBeInTheDocument();
  });

  it('10. Submenu navigation works', () => {
    renderNavbar();

    const menTrigger = screen.getByRole('button', { name: /^men/i });
    act(() => {
      fireEvent.click(menTrigger);
    });

    const submenuLink = screen.getByRole('link', { name: /performance t-shirts/i });
    expect(submenuLink).toBeInTheDocument();

    // Clicking submenu link closes mega-menu
    act(() => {
      fireEvent.click(submenuLink);
    });

    expect(screen.queryByRole('region', { name: /^men subcategories navigation/i })).not.toBeInTheDocument();
  });

  it('11. Keyboard focus and ARIA attributes remain correct', () => {
    renderNavbar();

    const menTrigger = screen.getByRole('button', { name: /^men/i });
    expect(menTrigger).toHaveAttribute('aria-expanded', 'false');
    expect(menTrigger).toHaveAttribute('aria-haspopup', 'true');

    // Space activates menu
    act(() => {
      fireEvent.keyDown(menTrigger, { key: ' ' });
    });

    expect(menTrigger).toHaveAttribute('aria-expanded', 'true');
    expect(menTrigger).toHaveAttribute('aria-controls', 'mega-menu-men');
    expect(screen.getByRole('region', { name: /^men subcategories navigation/i })).toBeInTheDocument();

    // Escape closes menu
    act(() => {
      fireEvent.keyDown(menTrigger, { key: 'Escape' });
    });

    expect(menTrigger).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('region', { name: /^men subcategories navigation/i })).not.toBeInTheDocument();
  });

  it('12. Touch/mobile navigation remains functional', () => {
    useUIStore.setState({ isMobileMenuOpen: true });

    render(
      <MemoryRouter initialEntries={['/']}>
        <MobileNav />
      </MemoryRouter>
    );

    const mobileDialog = screen.getByRole('dialog', { name: /mobile navigation menu/i });
    expect(mobileDialog).toBeInTheDocument();

    // Tap expand on MEN
    const toggleMenBtn = screen.getByRole('button', { name: /toggle men subcategories/i });
    expect(toggleMenBtn).toHaveAttribute('aria-expanded', 'false');

    act(() => {
      fireEvent.click(toggleMenBtn);
    });

    expect(toggleMenBtn).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('link', { name: /performance t-shirts/i })).toBeInTheDocument();

    // Tap toggle again to collapse
    act(() => {
      fireEvent.click(toggleMenBtn);
    });

    expect(toggleMenBtn).toHaveAttribute('aria-expanded', 'false');
  });
});
