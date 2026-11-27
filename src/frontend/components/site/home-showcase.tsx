"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { CatalogueSpread } from "@/frontend/components/site/catalogue-spread";
import type { ProductTile } from "@/shared/data/products";

export type ShowcaseItem = {
  slug: string;
  name: string;
  sku: string;
  scale: string;
  hero_url: string;
  tiles: ProductTile[];
};

/** Homepage catalogue spread that flicks through machines with ← / → or the buttons. */
export function HomeShowcase({ items }: { items: ShowcaseItem[] }) {
  const [i, setI] = useState(0);
  const inView = useRef(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const n = items.length;
  const go = useCallback((d: number) => setI((v) => (v + d + n) % n), [n]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => (inView.current = e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    const onKey = (e: KeyboardEvent) => {
      if (!inView.current || e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(t.tagName))) return;
      if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
      if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      io.disconnect();
      window.removeEventListener("keydown", onKey);
    };
  }, [go]);

  if (!n) return null;
  const p = items[i];
  const btn =
    "inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-[20px] text-white transition-all duration-300 hover:border-[color:var(--brand-gold)] hover:bg-[color:var(--brand-gold)] hover:text-[#0E0E10]";

  return (
    <section ref={ref} className="stay-dark relative overflow-clip border-t border-white/[0.06] bg-[#07080a]">
      <div aria-hidden className="absolute -left-40 top-20 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(233,168,32,0.12),transparent_65%)] blur-2xl" />
      <div className="relative mx-auto max-w-[1440px] px-4 py-24 sm:px-6 sm:py-32">
        <CatalogueSpread
          key={p.slug}
          bare
          name={p.name}
          sku={p.sku}
          scale={p.scale}
          heroUrl={p.hero_url}
          tiles={p.tiles}
          eyebrow="The range · fully hydraulic"
          title={
            <>
              {p.name.replace(/^AOUE\s*/i, "")}
            </>
          }
          headerAside={
            <div className="flex shrink-0 items-center gap-3">
              <button type="button" aria-label="Previous machine" onClick={() => go(-1)} className={btn}>←</button>
              <span className="min-w-[64px] text-center font-display text-[16px] tabular-nums text-white/55">
                <span className="text-[color:var(--brand-gold)]">{String(i + 1).padStart(2, "0")}</span> / {String(n).padStart(2, "0")}
              </span>
              <button type="button" aria-label="Next machine" onClick={() => go(1)} className={btn}>→</button>
            </div>
          }
          footer={
            <div className="mt-10 flex flex-col items-center gap-4">
              <Link
                href={`/products/${p.slug}`}
                className="inline-flex items-center gap-2 rounded-full bg-[color:var(--brand-gold)] px-7 py-3.5 text-[15px] font-semibold text-[#0E0E10] shadow-[0_10px_40px_-8px_rgba(233,168,32,0.55)] transition-colors hover:bg-[color:var(--brand-gold-light)]"
              >
                View this machine <span aria-hidden>→</span>
              </Link>
              <p className="hidden text-center text-[12px] text-white/35 lg:block">
                Tip: use the <kbd className="rounded border border-white/15 px-1.5 py-0.5 font-sans">←</kbd>{" "}
                <kbd className="rounded border border-white/15 px-1.5 py-0.5 font-sans">→</kbd> keys to flick through products.
              </p>
            </div>
          }
        />
      </div>
    </section>
  );
}
