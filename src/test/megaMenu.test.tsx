import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar';
import { MobileNav } from '../components/common/MobileNav';
import { useUIStore } from '../store/useUIStore';

// Location test probe component
const LocationProbe = () => {
  const location = useLocation();
  return <div data-testid="location-path">{location.pathname}{location.search}</div>;
};

describe('Desktop Navigation Hover & Route Interaction', () => {
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

  const renderNavbar = (initialRoute = '/') => {
    return render(
      <MemoryRouter initialEntries={[initialRoute]}>
        <Navbar />
        <LocationProbe />
      </MemoryRouter>
    );
  };

  it('1. Hover MEN opens MEN dropdown', () => {
    renderNavbar();

    const menLink = screen.getByRole('link', { name: /^men/i });
    expect(screen.queryByRole('region', { name: /^men subcategories navigation/i })).not.toBeInTheDocument();

    act(() => {
      fireEvent.mouseEnter(menLink.parentElement!);
    });

    const megaMenu = screen.getByRole('region', { name: /^men subcategories navigation/i });
    expect(megaMenu).toBeInTheDocument();
    expect(menLink).toHaveAttribute('aria-expanded', 'true');
  });

  it('2. Clicking MEN navigates to /men', () => {
    renderNavbar();

    const menLink = screen.getByRole('link', { name: /^men/i });
    act(() => {
      fireEvent.click(menLink);
    });

    expect(screen.getByTestId('location-path')).toHaveTextContent('/men');
    expect(screen.queryByRole('region', { name: /^men subcategories navigation/i })).not.toBeInTheDocument();
  });

  it('3. Clicking WOMEN navigates to /women', () => {
    renderNavbar();

    const womenLink = screen.getByRole('link', { name: /^women/i });
    act(() => {
      fireEvent.click(womenLink);
    });

    expect(screen.getByTestId('location-path')).toHaveTextContent('/women');
    expect(screen.queryByRole('region', { name: /^women subcategories navigation/i })).not.toBeInTheDocument();
  });

  it('4. Clicking SPORTS navigates to /sports', () => {
    renderNavbar();

    const sportsLink = screen.getByRole('link', { name: /^sports/i });
    act(() => {
      fireEvent.click(sportsLink);
    });

    expect(screen.getByTestId('location-path')).toHaveTextContent('/sports');
    expect(screen.queryByRole('region', { name: /^sports subcategories navigation/i })).not.toBeInTheDocument();
  });

  it('5. Hovering between categories switches menus', () => {
    renderNavbar();

    const menLink = screen.getByRole('link', { name: /^men/i });
    const womenLink = screen.getByRole('link', { name: /^women/i });
    const sportsLink = screen.getByRole('link', { name: /^sports/i });

    // Open MEN
    act(() => {
      fireEvent.mouseEnter(menLink.parentElement!);
    });
    expect(screen.getByRole('region', { name: /^men subcategories navigation/i })).toBeInTheDocument();
    expect(screen.queryByRole('region', { name: /^women subcategories navigation/i })).not.toBeInTheDocument();

    // Hover WOMEN -> switches immediately
    act(() => {
      fireEvent.mouseEnter(womenLink.parentElement!);
    });
    expect(screen.queryByRole('region', { name: /^men subcategories navigation/i })).not.toBeInTheDocument();
    expect(screen.getByRole('region', { name: /^women subcategories navigation/i })).toBeInTheDocument();

    // Hover SPORTS -> switches immediately
    act(() => {
      fireEvent.mouseEnter(sportsLink.parentElement!);
    });
    expect(screen.queryByRole('region', { name: /^women subcategories navigation/i })).not.toBeInTheDocument();
    expect(screen.getByRole('region', { name: /^sports subcategories navigation/i })).toBeInTheDocument();
  });

  it('6. Moving into a dropdown keeps it visible', () => {
    renderNavbar();

    const menLink = screen.getByRole('link', { name: /^men/i });
    act(() => {
      fireEvent.mouseEnter(menLink.parentElement!);
    });

    const megaMenu = screen.getByRole('region', { name: /^men subcategories navigation/i });
    expect(megaMenu).toBeInTheDocument();

    // Moving mouse into dropdown panel
    act(() => {
      fireEvent.mouseEnter(megaMenu);
    });

    expect(screen.getByRole('region', { name: /^men subcategories navigation/i })).toBeInTheDocument();
  });

  it('7. Clicking a submenu navigates correctly', () => {
    renderNavbar();

    const menLink = screen.getByRole('link', { name: /^men/i });
    act(() => {
      fireEvent.mouseEnter(menLink.parentElement!);
    });

    const submenuLink = screen.getByRole('link', { name: /performance t-shirts/i });
    expect(submenuLink).toBeInTheDocument();

    act(() => {
      fireEvent.click(submenuLink);
    });

    expect(screen.getByTestId('location-path')).toHaveTextContent('/men?sub=T-Shirts');
    expect(screen.queryByRole('region', { name: /^men subcategories navigation/i })).not.toBeInTheDocument();
  });

  it('8. Clicking outside closes the dropdown and performs the intended action', () => {
    let outsideClicked = false;
    render(
      <MemoryRouter initialEntries={['/']}>
        <div>
          <Navbar />
          <button type="button" onClick={() => { outsideClicked = true; }}>
            Outside Interactive Element
          </button>
        </div>
      </MemoryRouter>
    );

    const menLink = screen.getByRole('link', { name: /^men/i });
    act(() => {
      fireEvent.mouseEnter(menLink.parentElement!);
    });

    expect(screen.getByRole('region', { name: /^men subcategories navigation/i })).toBeInTheDocument();

    // Click outside element
    const outsideBtn = screen.getByRole('button', { name: /outside interactive element/i });
    act(() => {
      fireEvent.mouseDown(outsideBtn);
      fireEvent.click(outsideBtn);
    });

    // Dropdown closes immediately and outside click executed
    expect(screen.queryByRole('region', { name: /^men subcategories navigation/i })).not.toBeInTheDocument();
    expect(outsideClicked).toBe(true);
  });

  it('9. Mouse leave closes after 3000ms', () => {
    renderNavbar();

    const menLink = screen.getByRole('link', { name: /^men/i });
    act(() => {
      fireEvent.mouseEnter(menLink.parentElement!);
    });

    expect(screen.getByRole('region', { name: /^men subcategories navigation/i })).toBeInTheDocument();

    // Mouse leaves
    act(() => {
      fireEvent.mouseLeave(menLink.parentElement!);
    });

    // Less than 3000ms -> still open
    act(() => {
      vi.advanceTimersByTime(1500);
    });
    expect(screen.getByRole('region', { name: /^men subcategories navigation/i })).toBeInTheDocument();

    // Reach 3000ms -> closes
    act(() => {
      vi.advanceTimersByTime(1500);
    });
    expect(screen.queryByRole('region', { name: /^men subcategories navigation/i })).not.toBeInTheDocument();
  });

  it('10. Pointer re-entry cancels the timer', () => {
    renderNavbar();

    const menLink = screen.getByRole('link', { name: /^men/i });
    act(() => {
      fireEvent.mouseEnter(menLink.parentElement!);
    });

    // Leave
    act(() => {
      fireEvent.mouseLeave(menLink.parentElement!);
    });

    // 2 seconds elapsed
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    // Re-enter
    act(() => {
      fireEvent.mouseEnter(menLink.parentElement!);
    });

    // Advance another 2 seconds (4s total)
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    // Still open because timer was canceled upon re-entry
    expect(screen.getByRole('region', { name: /^men subcategories navigation/i })).toBeInTheDocument();
  });

  it('11. Escape closes the dropdown', () => {
    renderNavbar();

    const menLink = screen.getByRole('link', { name: /^men/i });
    act(() => {
      fireEvent.mouseEnter(menLink.parentElement!);
    });

    expect(screen.getByRole('region', { name: /^men subcategories navigation/i })).toBeInTheDocument();

    // Press Escape
    act(() => {
      fireEvent.keyDown(document, { key: 'Escape' });
    });

    expect(screen.queryByRole('region', { name: /^men subcategories navigation/i })).not.toBeInTheDocument();
  });

  it('12. Keyboard navigation remains functional', () => {
    renderNavbar();

    const menLink = screen.getByRole('link', { name: /^men/i });

    // Focus opens dropdown
    act(() => {
      fireEvent.focus(menLink.parentElement!);
    });

    expect(screen.getByRole('region', { name: /^men subcategories navigation/i })).toBeInTheDocument();

    // Blur outside container closes dropdown
    act(() => {
      fireEvent.blur(menLink.parentElement!, { relatedTarget: document.body });
    });

    expect(screen.queryByRole('region', { name: /^men subcategories navigation/i })).not.toBeInTheDocument();
  });

  it('13. Mobile navigation remains unchanged', () => {
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

    // Tap collapse
    act(() => {
      fireEvent.click(toggleMenBtn);
    });

    expect(toggleMenBtn).toHaveAttribute('aria-expanded', 'false');
  });
});
