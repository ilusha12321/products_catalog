export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid" role="status" aria-label="Loading products">
      {Array.from({ length: count }, (_, i) => (
        <div className="card" key={i}>
          <div className="skeleton skeleton-img" />
          <div className="skeleton skeleton-line" />
          <div className="skeleton skeleton-line short" />
          <div className="skeleton skeleton-btn" />
        </div>
      ))}
    </div>
  );
}
