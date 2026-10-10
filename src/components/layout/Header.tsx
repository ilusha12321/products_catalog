"use client";

import { Heart, Search, ShoppingCart } from "lucide-react";
import { useStore } from "@/components/store/StoreProvider";
import Link from "next/link";

interface Props {
  query: string;
  onQuery: (q: string) => void;
  favoritesOnly: boolean;
  onToggleFavorites: () => void;
  onOpenCart: () => void;
  onNavigate: (slug: string | null) => void;
  navItems: { slug: string; label: string }[];
}

export function Header({
  query,
  onQuery,
  favoritesOnly,
  onToggleFavorites,
  onOpenCart,
  onNavigate,
  navItems,
}: Props) {
  const { favorites, cartCount } = useStore();
  return (
    <header className="header">
      <div className="container header-row">
        <Link href="/" className="brand" aria-label="Tackle Room home">
          <span className="brand-mark" aria-hidden />
          Tackle Room
        </Link>
        <nav className="main-nav" aria-label="Main">
          {navItems.map((n) => (
            <button key={n.slug} onClick={() => onNavigate(n.slug)}>
              {n.label}
            </button>
          ))}
        </nav>
        <form
          className="search"
          role="search"
          onSubmit={(e) => e.preventDefault()}
        >
          <Search size={16} aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            placeholder="Search products"
            aria-label="Search products"
          />
        </form>
        <button
          className={`icon-btn ${favoritesOnly ? "on" : ""}`}
          aria-pressed={favoritesOnly}
          aria-label={`Show favorites only (${favorites.length})`}
          onClick={onToggleFavorites}
        >
          <Heart
            size={20}
            fill={favoritesOnly ? "currentColor" : "none"}
            aria-hidden
          />
          {favorites.length > 0 && (
            <span className="badge">{favorites.length}</span>
          )}
        </button>
        <button
          className="icon-btn"
          aria-label={`Open cart (${cartCount} items)`}
          onClick={onOpenCart}
        >
          <ShoppingCart size={20} aria-hidden />
          {cartCount > 0 && <span className="badge">{cartCount}</span>}
        </button>
      </div>
    </header>
  );
}
