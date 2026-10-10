"use client";

import { Minus, Plus, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { formatPrice } from "@/lib/utils/format-price";
import { useStore } from "@/components/store/StoreProvider";
import type { Product } from "@/types/product";

export function CartDrawer({ products, onClose }: { products: Product[]; onClose: () => void }) {
  const { cart, setQuantity } = useStore();
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dlg = ref.current;
    if (dlg && !dlg.open) dlg.showModal();
  }, []);

  const lines = products.filter((p) => (cart[p.id] ?? 0) > 0);
  const total = lines.reduce((sum, p) => sum + (p.price ?? 0) * (cart[p.id] ?? 0), 0);

  return (
    <dialog
      ref={ref}
      className="drawer"
      aria-labelledby="cart-title"
      onClose={onClose}
      onClick={(e) => e.target === ref.current && ref.current?.close()}
    >
      <div className="drawer-head">
        <h2 id="cart-title">Cart</h2>
        <button className="icon-btn" aria-label="Close cart" onClick={() => ref.current?.close()}>
          <X size={20} aria-hidden />
        </button>
      </div>
      {lines.length === 0 ? (
        <p className="muted">Your cart is empty.</p>
      ) : (
        <>
          <ul className="lines">
            {lines.map((p) => (
              <li key={p.id}>
                <div>
                  <strong>{p.title}</strong>
                  <div className="muted">{formatPrice(p.price)}</div>
                </div>
                <div className="qty">
                  <button aria-label={`Decrease ${p.title}`} onClick={() => setQuantity(p.id, (cart[p.id] ?? 0) - 1)}>
                    <Minus size={14} aria-hidden />
                  </button>
                  <span>{cart[p.id]}</span>
                  <button aria-label={`Increase ${p.title}`} onClick={() => setQuantity(p.id, (cart[p.id] ?? 0) + 1)}>
                    <Plus size={14} aria-hidden />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <p className="total">
            <span>Total</span> <strong>{formatPrice(total)}</strong>
          </p>
        </>
      )}
    </dialog>
  );
}
