"use client";

import { RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export function CatalogError() {
  const router = useRouter();
  const [pending, start] = useTransition();
  return (
    <div className="state" role="alert">
      <h2>Products could not be loaded</h2>
      <p>The product service did not respond. Check your connection and try again.</p>
      <button className="btn btn-primary" disabled={pending} onClick={() => start(() => router.refresh())}>
        <RefreshCw size={16} aria-hidden /> {pending ? "Retrying…" : "Try again"}
      </button>
    </div>
  );
}
