"use client";

import { Heart, ShoppingCart } from "lucide-react";
import { formatPrice } from "@/lib/utils/format-price";
import { useStore } from "@/components/store/StoreProvider";
import type { Product } from "@/types/product";
import { ProductImage } from "./ProductImage";
import { Rating } from "./Rating";

interface Props {
  product: Product;
  priority?: boolean;
  onOpen: (product: Product) => void;
}

export function ProductCard({ product, priority, onOpen }: Props) {
  const { favorites, toggleFavorite, addToCart } = useStore();
  const isFav = favorites.includes(product.id);
  const soldOut = product.stock === 0;

  return (
    <article className="card">
      <button
        className={`fav ${isFav ? "on" : ""}`}
        aria-pressed={isFav}
        aria-label={isFav ? `Remove ${product.title} from favorites` : `Add ${product.title} to favorites`}
        onClick={() => toggleFavorite(product.id)}
      >
        <Heart size={18} fill={isFav ? "currentColor" : "none"} aria-hidden />
      </button>
      <button className="card-main" onClick={() => onOpen(product)} aria-label={`View details: ${product.title}`}>
        <ProductImage src={product.image} alt="" priority={priority} />
        <span className="card-cat">{product.brand ?? product.categoryLabel}</span>
        <span className="card-title">{product.title}</span>
      </button>
      <div className="card-meta">
        <span className="price">{formatPrice(product.price)}</span>
        <Rating rating={product.rating} count={product.reviewCount} />
      </div>
      <button className="btn btn-primary" disabled={soldOut} onClick={() => addToCart(product.id)}>
        <ShoppingCart size={16} aria-hidden /> {soldOut ? "Out of stock" : "Add to cart"}
      </button>
    </article>
  );
}
