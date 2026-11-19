import { useState, useRef, useEffect, useCallback } from 'react';

export type MenuOpenMode = 'hover' | 'click' | null;

export interface UseMegaMenuOptions {
  hoverCloseDelayMs?: number;
}

export function useMegaMenu({ hoverCloseDelayMs = 3000 }: UseMegaMenuOptions = {}) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [openMode, setOpenMode] = useState<MenuOpenMode>(null);

  const activeMenuRef = useRef<string | null>(null);
  activeMenuRef.current = activeMenu;

  const openModeRef = useRef<MenuOpenMode>(null);
  openModeRef.current = openMode;

  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggerRefs = useRef<Map<string, HTMLElement>>(new Map());
  const navRef = useRef<HTMLElement | null>(null);

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current !== null) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const openMenu = useCallback((key: string, mode: 'hover' | 'click') => {
    clearCloseTimer();
    setActiveMenu(key);
    setOpenMode(mode);
  }, [clearCloseTimer]);

  const closeMenu = useCallback((restoreFocusTo?: string) => {
    clearCloseTimer();
    const menuToRestore = restoreFocusTo || activeMenuRef.current;
    setActiveMenu(null);
    setOpenMode(null);

    if (menuToRestore) {
      const triggerEl = triggerRefs.current.get(menuToRestore);
      if (triggerEl) {
        triggerEl.focus();
      }
    }
  }, [clearCloseTimer]);

  const handleTriggerClick = useCallback((key: string) => {
    clearCloseTimer();
    if (activeMenuRef.current === key) {
      if (openModeRef.current === 'click') {
        // Clicking same menu again closes it
        closeMenu();
      } else {
        // Upgrade from hover to click pinned (keeps open indefinitely)
        setOpenMode('click');
      }
    } else {
      // Switching to another menu in click mode
      openMenu(key, 'click');
    }
  }, [clearCloseTimer, closeMenu, openMenu]);

  const handleItemPointerEnter = useCallback((key: string) => {
    clearCloseTimer();
    // If a menu was opened via click, hovering neighboring items does not hijack it
    if (openModeRef.current === 'click') {
      return;
    }
    openMenu(key, 'hover');
  }, [clearCloseTimer, openMenu]);

  const handleItemPointerLeave = useCallback(() => {
    // Click-opened menus must not be closed by hover-leave
    if (openModeRef.current === 'click') {
      return;
    }
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => {
      setActiveMenu(null);
      setOpenMode(null);
      closeTimerRef.current = null;
    }, hoverCloseDelayMs);
  }, [clearCloseTimer, hoverCloseDelayMs]);

  const handleTriggerKeyDown = useCallback((e: React.KeyboardEvent, key: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleTriggerClick(key);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      closeMenu(key);
    }
  }, [handleTriggerClick, closeMenu]);

  const handleSubmenuLinkClick = useCallback(() => {
    closeMenu();
  }, [closeMenu]);

  const registerTriggerRef = useCallback((key: string) => (el: HTMLElement | null) => {
    if (el) {
      triggerRefs.current.set(key, el);
    } else {
      triggerRefs.current.delete(key);
    }
  }, []);

  // Global click outside listener
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (!activeMenuRef.current) return;
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [closeMenu]);

  // Global Escape key listener
  useEffect(() => {
    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && activeMenuRef.current) {
        event.preventDefault();
        closeMenu(activeMenuRef.current);
      }
    };

    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => {
      document.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, [closeMenu]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearCloseTimer();
    };
  }, [clearCloseTimer]);

  return {
    activeMenu,
    openMode,
    navRef,
    registerTriggerRef,
    openMenu,
    closeMenu,
    handleTriggerClick,
    handleItemPointerEnter,
    handleItemPointerLeave,
    handleTriggerKeyDown,
    handleSubmenuLinkClick,
  };
}
