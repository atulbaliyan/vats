import { create } from 'zustand';

interface WishlistStore {
  wishlistIds: string[];
  toggleWishlist: (productId: string) => boolean; // returns true if added, false if removed
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

const STORAGE_KEY = 'vats_sports_wishlist_v1';

const getInitialWishlist = (): string[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const persistWishlist = (ids: string[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // Ignore storage errors
  }
};

export const useWishlistStore = create<WishlistStore>((set, get) => ({
  wishlistIds: getInitialWishlist(),

  toggleWishlist: (productId: string) => {
    const current = get().wishlistIds;
    const exists = current.includes(productId);
    let updated: string[];

    if (exists) {
      updated = current.filter((id) => id !== productId);
    } else {
      updated = [...current, productId];
    }

    persistWishlist(updated);
    set({ wishlistIds: updated });
    return !exists;
  },

  isInWishlist: (productId: string) => {
    return get().wishlistIds.includes(productId);
  },

  clearWishlist: () => {
    persistWishlist([]);
    set({ wishlistIds: [] });
  },
}));
