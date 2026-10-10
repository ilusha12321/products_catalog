export function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="state">
      <h2>No products match</h2>
      <p>Try a different search term or clear the filters.</p>
      <button className="btn btn-primary" onClick={onReset}>Clear filters</button>
    </div>
  );
}
