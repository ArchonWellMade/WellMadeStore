"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

/** ← / → arrow keys step to the previous / next product. */
export function ProductKeyNav({ prevHref, nextHref }: { prevHref?: string; nextHref?: string }) {
  const router = useRouter();

  useEffect(() => {
    if (prevHref) router.prefetch(prevHref);
    if (nextHref) router.prefetch(nextHref);
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(t.tagName))) return;
      if (e.key === "ArrowLeft" && prevHref) router.push(prevHref, { transitionTypes: ["nav-back"] });
      if (e.key === "ArrowRight" && nextHref) router.push(nextHref, { transitionTypes: ["nav-forward"] });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router, prevHref, nextHref]);

  return null;
}
