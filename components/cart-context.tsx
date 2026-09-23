"use client";

import { createContext, useContext, useEffect, useState } from "react";

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
}

const CartContext = createContext<CartContextValue>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  clear: () => {},
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
 */
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

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
    <CartContext.Provider value={{ items, addItem, removeItem, clear }}>
      {children}
    </CartContext.Provider>
  );
}
