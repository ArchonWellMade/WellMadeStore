"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

export type HeroProduct = { slug: string; name: string; sku: string; scale: string; image_url: string };

/** 3D cover-flow of machines from the range, auto-advancing, for the homepage hero. */
export function HeroProductCarousel({ items }: { items: HeroProduct[] }) {
  const n = items.length;
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);
  const go = useCallback((d: number) => setI((v) => (v + d + n) % n), [n]);

  useEffect(() => {
    if (paused || n < 2) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => go(1), 3800);
    return () => clearInterval(t);
  }, [paused, go, n]);

  if (!n) return null;
  const cur = items[i];

  return (
    <div
      className="relative w-full select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current == null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      {/* Stage */}
      <div className="relative mx-auto h-[400px] w-full [perspective:1600px] sm:h-[460px] lg:h-[520px]">
        {items.map((p, k) => {
          let d = k - i;
          if (d > n / 2) d -= n;
          if (d < -n / 2) d += n;
          const a = Math.abs(d);
          const hidden = a > 2;
          return (
            <Link
              key={p.slug}
              href={`/products/${p.slug}`}
              tabIndex={d === 0 ? 0 : -1}
              aria-hidden={d !== 0}
              onClick={(e) => {
                if (d !== 0) {
                  e.preventDefault();
                  go(d);
                }
              }}
              className="group absolute left-1/2 top-1/2 w-[230px] sm:w-[270px] lg:w-[300px]"
              style={{
                transform: `translate(-50%, -50%) translateX(${d * 62}%) translateZ(${-a * 160}px) rotateY(${-d * 30}deg) scale(${1 - a * 0.08})`,
                opacity: hidden ? 0 : 1 - a * 0.32,
                zIndex: 20 - a,
                pointerEvents: hidden ? "none" : "auto",
                transition: "transform 900ms cubic-bezier(0.22,1,0.36,1), opacity 700ms ease, filter 700ms ease",
                filter: d === 0 ? "none" : `brightness(${0.55 - a * 0.08}) saturate(0.8)`,
              }}
            >
              <div
                className={`relative overflow-hidden rounded-[26px] border bg-[#111214] shadow-[0_50px_90px_-40px_rgba(0,0,0,0.95)] transition-[border-color,box-shadow] duration-500 ${
                  d === 0
                    ? "border-[color:var(--brand-gold)]/60 shadow-[0_40px_100px_-30px_rgba(233,168,32,0.45)]"
                    : "border-white/10"
                }`}
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={p.image_url}
                    alt={p.name}
                    fill
                    sizes="300px"
                    priority={a <= 1}
                    className={`object-cover object-top transition-transform duration-[1200ms] ease-out ${d === 0 ? "scale-[1.04] group-hover:scale-[1.1]" : "scale-100"}`}
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.85))]" />
                  {d === 0 ? <span aria-hidden className="hero-card-shine absolute inset-0" key={p.slug} /> : null}
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <span className="inline-flex rounded-[4px] bg-[color:var(--brand-gold)] px-2 py-0.5 text-[11px] font-bold text-[#0E0E10]">
                      {p.scale} {p.sku}
                    </span>
                    <p className="mt-2 font-display text-[19px] font-500 leading-tight text-white">{p.name}</p>
                    <span className="mt-2 inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-[color:var(--brand-gold)] opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      View machine <span aria-hidden>→</span>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Controls */}
      <div className="relative z-30 mt-2 flex items-center justify-center gap-4">
        <button
          type="button"
          aria-label="Previous machine"
          onClick={() => go(-1)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.05] text-white backdrop-blur transition-colors hover:border-[color:var(--brand-gold)] hover:bg-[color:var(--brand-gold)] hover:text-[#0E0E10]"
        >
          ←
        </button>
        <div className="flex items-center gap-1.5" aria-hidden>
          {items.map((p, k) => (
            <span
              key={p.slug}
              className={`h-1.5 rounded-full transition-all duration-500 ${k === i ? "w-6 bg-[color:var(--brand-gold)]" : "w-1.5 bg-white/25"}`}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="Next machine"
          onClick={() => go(1)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.05] text-white backdrop-blur transition-colors hover:border-[color:var(--brand-gold)] hover:bg-[color:var(--brand-gold)] hover:text-[#0E0E10]"
        >
          →
        </button>
      </div>
      <p className="sr-only" aria-live="polite">
        {cur.name}
      </p>
    </div>
  );
}
