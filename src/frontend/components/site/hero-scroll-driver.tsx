"use client";

import { useEffect } from "react";

/**
 * Behavior-only client component. Sets `--hero-scroll` (0..1) on the element
 * matching `selector` based on how far the user has scrolled into it.
 * 0 = hero top at viewport top (page top); 1 = hero bottom at viewport top.
 * rAF-throttled. prefers-reduced-motion is a no-op (var stays at 0).
 */
export function HeroScrollDriver({
  selector = "[data-hero]",
}: {
  selector?: string;
}) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = document.querySelector(selector) as HTMLElement | null;
    if (!el) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--hero-scroll", "0");
      return;
    }

    let raf = 0;
    let pending = false;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const total = rect.height;
      const scrolled = -rect.top;
      const pct =
        total > 0 ? Math.min(1, Math.max(0, scrolled / total)) : 0;
      el.style.setProperty("--hero-scroll", pct.toFixed(4));
      pending = false;
    };

    const onScroll = () => {
      if (pending) return;
      pending = true;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [selector]);

  return null;
}
