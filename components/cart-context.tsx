"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const STORAGE_KEY = "boxa-cart";

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  imageUrl: string | null;
  localPrice: number;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  clear: () => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextValue>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  clear: () => {},
  isOpen: false,
  openCart: () => {},
  closeCart: () => {},
  toggleCart: () => {},
});

export function useCart() {
  return useContext(CartContext);
}

/**
 * Cart is deliberately browser-local and temporary — there's no login on
 * this site, so there's nowhere durable to keep it server-side per
 * customer. It only ever holds products that have a local_price, since
 * the whole point is batching several COD/local-pickup items into one
 * WhatsApp message instead of sending one message per item (see
 * CartDrawer for that message).
 *
 * Whether the drawer is open ALSO lives here (single source of truth,
 * one <CartDrawer> instance rendered once in the site layout) instead of
 * each trigger button keeping its own local state — that was the bug:
 * two separate "open" states (header button, bottom-nav button) that
 * never learned about client-side navigation, so the drawer stayed
 * visually stuck open over whatever page you navigated to underneath it.
 * The pathname watcher below closes it automatically on every route
 * change, and every trigger now shares the same isOpen/closeCart.
 */
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setItems(parsed);
      } catch {
        // ignore corrupt cart
      }
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, loaded]);

  // Close the drawer automatically whenever the route changes — including
  // navigating to the SAME cart-triggering link twice, product links
  // clicked from inside the drawer, and every nav item everywhere.
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  function addItem(item: CartItem) {
    setItems((prev) => (prev.some((i) => i.productId === item.productId) ? prev : [...prev, item]));
  }

  function removeItem(productId: string) {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }

  function clear() {
    setItems([]);
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clear,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        toggleCart: () => setIsOpen((v) => !v),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
