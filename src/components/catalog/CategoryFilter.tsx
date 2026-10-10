interface Props {
  categories: { slug: string; label: string; count: number }[];
  active: string | null;
  onChange: (slug: string | null) => void;
}

export function CategoryFilter({ categories, active, onChange }: Props) {
  return (
    <nav className="cats" aria-label="Categories">
      <button className={active === null ? "cat active" : "cat"} aria-pressed={active === null} onClick={() => onChange(null)}>
        All
      </button>
      {categories.map((c) => (
        <button
          key={c.slug}
          className={active === c.slug ? "cat active" : "cat"}
          aria-pressed={active === c.slug}
          onClick={() => onChange(c.slug)}
        >
          {c.label} <span className="count">{c.count}</span>
        </button>
      ))}
    </nav>
  );
}
