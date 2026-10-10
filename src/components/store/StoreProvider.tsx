"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type CartLines = Record<number, number>;

interface StoreValue {
  cart: CartLines;
  cartCount: number;
  favorites: number[];
  addToCart: (id: number) => void;
  setQuantity: (id: number, qty: number) => void;
  toggleFavorite: (id: number) => void;
}

const StoreContext = createContext<StoreValue | null>(null);
const CART_KEY = "tackle:cart";
const FAV_KEY = "tackle:favorites";

function read<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartLines>({});
  const [favorites, setFavorites] = useState<number[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // localStorage is only touched on the client, after mount.
  useEffect(() => {
    setCart(read<CartLines>(CART_KEY, {}));
    setFavorites(read<number[]>(FAV_KEY, []));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
      window.localStorage.setItem(FAV_KEY, JSON.stringify(favorites));
    } catch {
      /* storage unavailable: keep in-memory state */
    }
  }, [cart, favorites, hydrated]);

  const addToCart = useCallback((id: number) => {
    setCart((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 }));
  }, []);

  const setQuantity = useCallback((id: number, qty: number) => {
    setCart((c) => {
      const next = { ...c };
      if (qty <= 0) delete next[id];
      else next[id] = qty;
      return next;
    });
  }, []);

  const toggleFavorite = useCallback((id: number) => {
    setFavorites((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));
  }, []);

  const value = useMemo<StoreValue>(
    () => ({
      cart,
      cartCount: Object.values(cart).reduce((a, b) => a + b, 0),
      favorites,
      addToCart,
      setQuantity,
      toggleFavorite,
    }),
    [cart, favorites, addToCart, setQuantity, toggleFavorite],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
