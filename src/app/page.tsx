import { CatalogApp } from "@/components/catalog/CatalogApp";
import { fetchProducts } from "@/lib/api/products";
import type { Product } from "@/types/product";

export default async function HomePage() {
  let products: Product[] = [];
  let failed = false;
  try {
    products = await fetchProducts();
  } catch {
    failed = true;
  }
  return <CatalogApp products={products} failed={failed} />;
}
