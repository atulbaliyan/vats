import { create } from 'zustand';
import { Product } from '../types';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: 'success' | 'info' | 'warning';
}

interface UIStore {
  quickViewProduct: Product | null;
  isSearchOpen: boolean;
  isMobileMenuOpen: boolean;
  toasts: ToastMessage[];

  openQuickView: (product: Product) => void;
  closeQuickView: () => void;

  openSearch: () => void;
  closeSearch: () => void;
  toggleSearch: () => void;

  openMobileMenu: () => void;
  closeMobileMenu: () => void;
  toggleMobileMenu: () => void;

  addToast: (title: string, description?: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
}

export const useUIStore = create<UIStore>((set, get) => ({
  quickViewProduct: null,
  isSearchOpen: false,
  isMobileMenuOpen: false,
  toasts: [],

  openQuickView: (product) => set({ quickViewProduct: product }),
  closeQuickView: () => set({ quickViewProduct: null }),

  openSearch: () => set({ isSearchOpen: true }),
  closeSearch: () => set({ isSearchOpen: false }),
  toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen })),

  openMobileMenu: () => set({ isMobileMenuOpen: true }),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),

  addToast: (title, description, type = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastMessage = { id, title, description, type };
    set((state) => ({ toasts: [...state.toasts, newToast] }));

    setTimeout(() => {
      get().removeToast(id);
    }, 4000);
  },

  removeToast: (id) => {
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
  },
}));
