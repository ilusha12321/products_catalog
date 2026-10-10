import { ProductGridSkeleton } from "@/components/catalog/ProductGridSkeleton";

export default function Loading() {
  return (
    <main className="container" aria-busy="true">
      <div className="skeleton skeleton-title" />
      <ProductGridSkeleton />
    </main>
  );
}
