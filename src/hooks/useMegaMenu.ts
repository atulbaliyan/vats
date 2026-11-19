import { useState, useRef, useEffect, useCallback } from 'react';

export interface UseMegaMenuOptions {
  hoverCloseDelayMs?: number;
}

export function useMegaMenu({ hoverCloseDelayMs = 3000 }: UseMegaMenuOptions = {}) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const activeMenuRef = useRef<string | null>(null);
  activeMenuRef.current = activeMenu;

  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggerRefs = useRef<Map<string, HTMLElement>>(new Map());
  const navRef = useRef<HTMLElement | null>(null);
  const preventFocusOpenRef = useRef(false);

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current !== null) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const openMenu = useCallback((key: string) => {
    clearCloseTimer();
    setActiveMenu(key);
  }, [clearCloseTimer]);

  const closeMenu = useCallback((restoreFocusToKey?: string) => {
    clearCloseTimer();
    setActiveMenu(null);

    if (restoreFocusToKey) {
      const triggerEl = triggerRefs.current.get(restoreFocusToKey);
      if (triggerEl) {
        preventFocusOpenRef.current = true;
        triggerEl.focus();
      }
    }
  }, [clearCloseTimer]);

  const handleItemPointerEnter = useCallback((key: string) => {
    openMenu(key);
  }, [openMenu]);

  const handleItemPointerLeave = useCallback(() => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => {
      setActiveMenu(null);
      closeTimerRef.current = null;
    }, hoverCloseDelayMs);
  }, [clearCloseTimer, hoverCloseDelayMs]);

  const handleItemFocus = useCallback((key: string) => {
    if (preventFocusOpenRef.current) {
      preventFocusOpenRef.current = false;
      return;
    }
    openMenu(key);
  }, [openMenu]);

  const handleItemBlur = useCallback((e: React.FocusEvent<HTMLDivElement>) => {
    // If focus moves to an element outside this item container, close dropdown
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      closeMenu();
    }
  }, [closeMenu]);

  const handleTriggerKeyDown = useCallback((e: React.KeyboardEvent, key: string) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      closeMenu(key);
    }
  }, [closeMenu]);

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

  // Global click outside listener: closes dropdown without preventing or stopping event propagation
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
    navRef,
    registerTriggerRef,
    openMenu,
    closeMenu,
    handleItemPointerEnter,
    handleItemPointerLeave,
    handleItemFocus,
    handleItemBlur,
    handleTriggerKeyDown,
    handleSubmenuLinkClick,
  };
}
