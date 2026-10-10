"use client";

import { useMemo, useState } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { useStore } from "@/components/store/StoreProvider";
import type { Product, SortKey } from "@/types/product";
import { CartDrawer } from "./CartDrawer";
import { CatalogError } from "./CatalogError";
import { CatalogToolbar } from "./CatalogToolbar";
import { CategoryFilter } from "./CategoryFilter";
import { EmptyState } from "./EmptyState";
import { ProductGrid } from "./ProductGrid";
import { ProductModal } from "./ProductModal";

function sortProducts(list: Product[], sort: SortKey): Product[] {
  const copy = [...list];
  const price = (p: Product) => p.price ?? Number.POSITIVE_INFINITY;
  switch (sort) {
    case "price-asc":
      return copy.sort((a, b) => price(a) - price(b));
    case "price-desc":
      return copy.sort((a, b) => (b.price ?? -1) - (a.price ?? -1));
    case "title":
      return copy.sort((a, b) => a.title.localeCompare(b.title));
    case "rating":
      return copy.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    default:
      return copy;
  }
}

export function CatalogApp({ products, failed }: { products: Product[]; failed: boolean }) {
  const { favorites } = useStore();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [sort, setSort] = useState<SortKey>("featured");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [selected, setSelected] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);

  const categories = useMemo(() => {
    const map = new Map<string, { slug: string; label: string; count: number }>();
    for (const p of products) {
      const entry = map.get(p.category) ?? { slug: p.category, label: p.categoryLabel, count: 0 };
      entry.count += 1;
      map.set(p.category, entry);
    }
    return [...map.values()];
  }, [products]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = products.filter(
      (p) =>
        (!category || p.category === category) &&
        (!favoritesOnly || favorites.includes(p.id)) &&
        (!q || p.title.toLowerCase().includes(q) || (p.brand?.toLowerCase().includes(q) ?? false)),
    );
    return sortProducts(filtered, sort);
  }, [products, query, category, sort, favoritesOnly, favorites]);

  const canReset = query !== "" || category !== null || sort !== "featured" || favoritesOnly;
  const reset = () => {
    setQuery("");
    setCategory(null);
    setSort("featured");
    setFavoritesOnly(false);
  };

  return (
    <>
      <Header
        query={query}
        onQuery={setQuery}
        favoritesOnly={favoritesOnly}
        onToggleFavorites={() => setFavoritesOnly((v) => !v)}
        onOpenCart={() => setCartOpen(true)}
        onNavigate={setCategory}
        navItems={categories.slice(0, 4).map(({ slug, label }) => ({ slug, label }))}
      />
      <main className="container">
        <div className="intro">
          <p className="crumbs">Home / Catalog</p>
          <h1>Outdoor gear catalog</h1>
          <p className="muted">
            {failed ? "Live product data is unavailable right now." : `${products.length} products loaded live from the DummyJSON API.`}
          </p>
        </div>

        {failed ? (
          <CatalogError />
        ) : (
          <>
            <CategoryFilter categories={categories} active={category} onChange={setCategory} />
            <CatalogToolbar
              shown={visible.length}
              total={products.length}
              sort={sort}
              onSort={setSort}
              canReset={canReset}
              onReset={reset}
            />
            {visible.length === 0 ? <EmptyState onReset={reset} /> : <ProductGrid products={visible} onOpen={setSelected} />}
          </>
        )}
      </main>
      <Footer />
      {selected && <ProductModal product={selected} onClose={() => setSelected(null)} />}
      {cartOpen && <CartDrawer products={products} onClose={() => setCartOpen(false)} />}
    </>
  );
}
