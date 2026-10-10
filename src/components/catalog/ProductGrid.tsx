import type { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";

export function ProductGrid({ products, onOpen }: { products: Product[]; onOpen: (p: Product) => void }) {
  return (
    <div className="grid">
      {products.map((p, i) => (
        <ProductCard key={p.id} product={p} priority={i < 4} onOpen={onOpen} />
      ))}
    </div>
  );
}
