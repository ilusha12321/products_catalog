import { RotateCcw } from "lucide-react";
import type { SortKey } from "@/types/product";

interface Props {
  shown: number;
  total: number;
  sort: SortKey;
  onSort: (s: SortKey) => void;
  canReset: boolean;
  onReset: () => void;
}

export function CatalogToolbar({ shown, total, sort, onSort, canReset, onReset }: Props) {
  return (
    <div className="toolbar">
      <p aria-live="polite">
        Showing <strong>{shown}</strong> of {total} products
      </p>
      <div className="toolbar-right">
        {canReset && (
          <button className="btn btn-ghost" onClick={onReset}>
            <RotateCcw size={14} aria-hidden /> Reset filters
          </button>
        )}
        <label className="sort">
          Sort by
          <select value={sort} onChange={(e) => onSort(e.target.value as SortKey)}>
            <option value="featured">Featured</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="title">Name: A to Z</option>
            <option value="rating">Rating</option>
          </select>
        </label>
      </div>
    </div>
  );
}
