import type { ApiProductsResponse, Product } from "@/types/product";
import { normalizeProduct } from "./product-adapter";

const API_URL =
  "https://dummyjson.com/products?limit=0&select=title,description,category,price,rating,stock,brand,thumbnail,reviews";

/**
 * DummyJSON has no fishing-specific data, so the catalog is limited to its
 * outdoor / sporting-goods categories. This filters real API records by
 * category; it does not contain any product data.
 */
const OUTDOOR_CATEGORIES = new Set([
  "sports-accessories",
  "sunglasses",
  "mens-shoes",
  "mens-watches",
]);

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(API_URL, { next: { revalidate: 3600 } });
  if (!res.ok) {
    throw new Error(`Product API responded with ${res.status}`);
  }
  const data = (await res.json()) as Partial<ApiProductsResponse>;
  if (!data || !Array.isArray(data.products)) {
    throw new Error("Unexpected response from the product API");
  }

  const all = data.products
    .map(normalizeProduct)
    .filter((p): p is Product => p !== null);
  const outdoor = all.filter((p) => OUTDOOR_CATEGORIES.has(p.category));
  return outdoor.length > 0 ? outdoor : all;
}
