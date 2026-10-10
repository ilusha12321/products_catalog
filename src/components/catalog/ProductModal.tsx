"use client";

import { ShoppingCart, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { formatPrice } from "@/lib/utils/format-price";
import { useStore } from "@/components/store/StoreProvider";
import type { Product } from "@/types/product";
import { ProductImage } from "./ProductImage";
import { Rating } from "./Rating";

export function ProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const { addToCart } = useStore();
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dlg = ref.current;
    if (dlg && !dlg.open) dlg.showModal();
  }, []);

  return (
    <dialog
      ref={ref}
      className="modal"
      aria-labelledby="modal-title"
      onClose={onClose}
      onClick={(e) => e.target === ref.current && ref.current?.close()}
    >
      <button className="icon-btn modal-close" aria-label="Close" onClick={() => ref.current?.close()}>
        <X size={20} aria-hidden />
      </button>
      <div className="modal-body">
        <ProductImage src={product.image} alt={product.title} />
        <div>
          <p className="card-cat">{product.brand ?? product.categoryLabel}</p>
          <h2 id="modal-title">{product.title}</h2>
          <Rating rating={product.rating} count={product.reviewCount} />
          <p className="price big">{formatPrice(product.price)}</p>
          <p>{product.description ?? "No description available."}</p>
          {product.stock !== null && (
            <p className="muted">{product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}</p>
          )}
          <button className="btn btn-primary" disabled={product.stock === 0} onClick={() => addToCart(product.id)}>
            <ShoppingCart size={16} aria-hidden /> Add to cart
          </button>
        </div>
      </div>
    </dialog>
  );
}
