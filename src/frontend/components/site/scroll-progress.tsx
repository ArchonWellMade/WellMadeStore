"use client";

import { useEffect, useRef } from "react";

/**
 * 1px gold line that fills horizontally as the user scrolls down the page.
 * Mounts as the bottom edge of the sticky header. rAF-throttled.
 */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    if (typeof window === "undefined") return;

    let raf = 0;
    let pending = false;

    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      bar.style.transform = `scaleX(${pct})`;
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
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 h-px overflow-hidden"
    >
      <div
        ref={barRef}
        className="h-full origin-left bg-gradient-to-r from-[color:var(--brand-forest)] via-[color:var(--brand-gold)] to-[color:var(--brand-gold)]"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
