"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FadeInOut } from "@/frontend/components/site/scroll-motion";
import type { ProductTile } from "@/shared/data/products";

/** The catalogue page rebuilt for the web: hero photo on the left, feature panels on the right. */
export function CatalogueSpread({
  name,
  sku,
  scale,
  heroUrl,
  tiles,
}: {
  name: string;
  sku: string;
  scale: string;
  heroUrl: string;
  tiles: ProductTile[];
}) {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const [p, setP] = useState(0);

  // Slow zoom-out of the hero photo as the spread scrolls past
  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = heroRef.current?.parentElement;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const total = r.height + window.innerHeight;
        setP(Math.min(1, Math.max(0, (window.innerHeight - r.top) / total)));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section className="stay-dark relative overflow-clip border-t border-white/[0.06] bg-[#07080a]">
      <div className="mx-auto max-w-[1440px] px-4 py-20 sm:px-6 lg:py-28">
        <FadeInOut from="up" className="mb-12 max-w-3xl lg:mb-16">
          <p className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-[color:var(--brand-gold)]">
            <span className="h-px w-8 bg-current opacity-70" />
            {scale ? `${scale} scale` : "Catalogue"}
            {sku ? ` · ${sku}` : ""}
          </p>
          <h2 className="mt-5 font-display text-[36px] font-500 leading-[1.02] tracking-apple-mass text-white text-balance sm:text-[52px]">
            Inside the {name.replace(/^AOUE\s*/i, "")}
          </h2>
        </FadeInOut>

        <div className="grid items-start gap-6 lg:grid-cols-[1.55fr_1fr] lg:gap-8">
          {/* Hero photo, pinned while the panels scroll past */}
          <div className="lg:sticky lg:top-28">
            <FadeInOut from="left">
              <div
                ref={heroRef}
                className="relative overflow-hidden rounded-[28px] border border-white/10 shadow-[0_60px_120px_-50px_rgba(0,0,0,0.9)]"
              >
                <Image
                  src={heroUrl}
                  alt={name}
                  width={1400}
                  height={1460}
                  priority
                  className="h-auto w-full"
                  style={{
                    transform: `scale(${1.1 - p * 0.1}) translate3d(0, ${(p - 0.5) * -24}px, 0)`,
                    transformOrigin: "50% 40%",
                    transition: "transform 120ms linear",
                  }}
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_70%,rgba(0,0,0,0.35)_100%)]"
                />
              </div>
            </FadeInOut>
          </div>

          {/* Feature panels, exactly as in the catalogue */}
          <ol className="flex flex-col gap-4 sm:gap-5">
            {tiles.map((t, i) => (
              <li key={t.image}>
                <FadeInOut from="right" delayMs={i * 90}>
                  <figure className="group overflow-hidden rounded-[18px] border border-white/10 bg-[#1f2328] shadow-[0_30px_60px_-35px_rgba(0,0,0,0.9)] transition-transform duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_40px_70px_-30px_rgba(233,168,32,0.35)]">
                    <Image
                      src={t.image}
                      alt={t.title ? `${t.title}: ${t.body}` : name}
                      width={805}
                      height={330}
                      className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                    <figcaption className="sr-only">
                      {t.title}. {t.body}
                    </figcaption>
                  </figure>
                </FadeInOut>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
