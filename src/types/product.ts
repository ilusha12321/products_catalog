/** Raw shape returned by https://dummyjson.com/products (only the fields we use). */
export interface ApiProduct {
  id?: number;
  title?: string;
  description?: string;
  category?: string;
  price?: number;
  rating?: number;
  stock?: number;
  brand?: string;
  thumbnail?: string;
  reviews?: unknown[];
}

export interface ApiProductsResponse {
  products: ApiProduct[];
  total?: number;
}

/** Normalized product used by the UI. Optional data is explicitly nullable. */
export interface Product {
  id: number;
  title: string;
  description: string | null;
  category: string;
  categoryLabel: string;
  price: number | null;
  rating: number | null;
  reviewCount: number | null;
  brand: string | null;
  image: string | null;
  stock: number | null;
}

export type SortKey = "featured" | "price-asc" | "price-desc" | "title" | "rating";
