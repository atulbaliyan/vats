import { create } from 'zustand';
import { CartItem, Product, ProductSize } from '../types';

interface CartStore {
  items: CartItem[];
  isDrawerOpen: boolean;
  couponCode: string;
  discountRate: number; // e.g. 0.10 for 10%

  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;

  addItem: (product: Product, selectedColor: string, selectedSize: ProductSize, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  // Computed helpers
  getTotalCount: () => number;
  getSubtotal: () => number;
  getDiscountAmount: () => number;
  getShippingFee: () => number;
  getFinalTotal: () => number;
}

const STORAGE_KEY = 'vats_sports_cart_v1';

const getInitialItems = (): CartItem[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const persistItems = (items: CartItem[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Ignore storage errors
  }
};

export const useCartStore = create<CartStore>((set, get) => ({
  items: getInitialItems(),
  isDrawerOpen: false,
  couponCode: '',
  discountRate: 0,

  openDrawer: () => set({ isDrawerOpen: true }),
  closeDrawer: () => set({ isDrawerOpen: false }),
  toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),

  addItem: (product, selectedColor, selectedSize, quantity = 1) => {
    const itemId = `${product.id}-${selectedColor}-${selectedSize}`;
    const currentItems = get().items;
    const existingIndex = currentItems.findIndex((i) => i.id === itemId);

    let updatedItems: CartItem[];
    if (existingIndex > -1) {
      updatedItems = currentItems.map((item, idx) =>
        idx === existingIndex ? { ...item, quantity: item.quantity + quantity } : item
      );
    } else {
      updatedItems = [
        ...currentItems,
        {
          id: itemId,
          product,
          selectedColor,
          selectedSize,
          quantity,
        },
      ];
    }

    persistItems(updatedItems);
    set({ items: updatedItems, isDrawerOpen: true });
  },

  removeItem: (itemId) => {
    const updated = get().items.filter((item) => item.id !== itemId);
    persistItems(updated);
    set({ items: updated });
  },

  updateQuantity: (itemId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(itemId);
      return;
    }
    const updated = get().items.map((item) =>
      item.id === itemId ? { ...item, quantity } : item
    );
    persistItems(updated);
    set({ items: updated });
  },

  clearCart: () => {
    persistItems([]);
    set({ items: [], couponCode: '', discountRate: 0 });
  },

  applyCoupon: (code) => {
    const normalized = code.trim().toUpperCase();
    if (normalized === 'BEYOND10' || normalized === 'VATS10') {
      set({ couponCode: normalized, discountRate: 0.1 });
      return { success: true, message: '10% discount applied successfully!' };
    }
    if (normalized === 'PRO20') {
      set({ couponCode: normalized, discountRate: 0.2 });
      return { success: true, message: '20% VIP athlete discount applied!' };
    }
    return { success: false, message: 'Invalid promotional code. Try "BEYOND10"' };
  },

  removeCoupon: () => set({ couponCode: '', discountRate: 0 }),

  getTotalCount: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },

  getSubtotal: () => {
    return get().items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  },

  getDiscountAmount: () => {
    const subtotal = get().getSubtotal();
    return Math.round(subtotal * get().discountRate);
  },

  getShippingFee: () => {
    const subtotal = get().getSubtotal();
    if (subtotal === 0) return 0;
    // Free shipping above ₹1,999
    return subtotal >= 1999 ? 0 : 149;
  },

  getFinalTotal: () => {
    const subtotal = get().getSubtotal();
    const discount = get().getDiscountAmount();
    const shipping = get().getShippingFee();
    return Math.max(0, subtotal - discount + shipping);
  },
}));
