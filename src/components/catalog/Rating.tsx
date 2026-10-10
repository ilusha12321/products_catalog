import { Star } from "lucide-react";

export function Rating({ rating, count }: { rating: number | null; count: number | null }) {
  if (rating === null) return null;
  return (
    <span className="rating" aria-label={`Rated ${rating.toFixed(1)} out of 5`}>
      <Star size={14} fill="currentColor" aria-hidden /> {rating.toFixed(1)}
      {count ? <span className="muted"> ({count})</span> : null}
    </span>
  );
}
