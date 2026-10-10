import type { ApiProduct, Product } from "@/types/product";

export function categoryLabel(slug: string): string {
  const text = slug.replace(/-/g, " ").trim();
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/** Maps a raw API product to the UI model. Returns null for unusable records. */
export function normalizeProduct(raw: ApiProduct): Product | null {
  if (typeof raw.id !== "number" || typeof raw.title !== "string" || !raw.title.trim()) {
    return null;
  }
  const category = raw.category?.trim() || "other";
  return {
    id: raw.id,
    title: raw.title.trim(),
    description: raw.description?.trim() || null,
    category,
    categoryLabel: categoryLabel(category),
    price: typeof raw.price === "number" && Number.isFinite(raw.price) ? raw.price : null,
    rating: typeof raw.rating === "number" && raw.rating > 0 ? raw.rating : null,
    reviewCount: Array.isArray(raw.reviews) ? raw.reviews.length : null,
    brand: raw.brand?.trim() || null,
    image: raw.thumbnail?.trim() || null,
    stock: typeof raw.stock === "number" ? raw.stock : null,
  };
}
