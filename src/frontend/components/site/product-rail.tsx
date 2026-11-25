"use client";

import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from "react";

/** Horizontal snap carousel with arrow buttons and a progress bar. */
export function ProductRail({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 1);
    setAtStart(el.scrollLeft < 8);
    setAtEnd(el.scrollLeft > max - 8);
  }, []);

  useEffect(() => {
    const raf = requestAnimationFrame(update);
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const step = (dir: 1 | -1) => {
    const el = ref.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  const btn =
    "flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-[18px] text-white transition-all hover:border-[color:var(--brand-gold)] hover:bg-[color:var(--brand-gold)] hover:text-[#0E0E10] disabled:pointer-events-none disabled:opacity-30";

  return (
    <div>
      <div
        ref={ref}
        onScroll={update}
        className="-ml-4 mr-[calc(50%-50vw)] flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-4 py-8 pl-4 pr-6 sm:-ml-6 sm:scroll-px-6 sm:pl-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {Children.map(children, (child) => (
          <div className="w-[270px] shrink-0 snap-start sm:w-[300px] lg:w-[310px]">{child}</div>
        ))}
      </div>
      <div className="mt-2 flex items-center gap-6">
        <div className="relative h-[2px] flex-1 overflow-hidden rounded-full bg-white/10">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-[color:var(--brand-gold)] transition-[width] duration-200"
            style={{ width: `${Math.max(8, progress * 100)}%` }}
          />
        </div>
        <div className="flex gap-2">
          <button type="button" aria-label="Previous products" className={btn} disabled={atStart} onClick={() => step(-1)}>
            ←
          </button>
          <button type="button" aria-label="Next products" className={btn} disabled={atEnd} onClick={() => step(1)}>
            →
          </button>
        </div>
      </div>
    </div>
  );
}
