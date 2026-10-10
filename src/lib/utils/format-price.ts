const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

/** The API prices are in USD; they are shown as USD and never relabelled. */
export function formatPrice(value: number | null): string {
  return value === null ? "Price on request" : formatter.format(value);
}
