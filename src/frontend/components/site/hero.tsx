import Link from "next/link";
import { LetterReveal } from "@/frontend/components/site/letter-reveal";
import { ScrollReveal } from "@/frontend/components/site/scroll-reveal";
import { HeroScene } from "@/frontend/components/site/hero-scene";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[color:var(--brand-graphite)] text-white">
      {/* Cinematic gradient base */}
      <div aria-hidden className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_55%_70%,_rgba(255,90,31,0.18)_0%,_transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(14,14,16,0.6)_60%,_rgba(14,14,16,0.92)_100%)]" />
      </div>

      {/* Animated drifting buggy scene */}
      <HeroScene />

      {/* Top eyebrow rail — Apple Pro page style */}
      <div className="relative border-b border-white/[0.06]">
        <div className="mx-auto flex max-w-[1200px] items-center justify-center gap-3 px-6 py-3 text-[11px] uppercase tracking-[0.28em] text-white/65">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--brand-ignition)] [animation:glowPulse_2.4s_ease-in-out_infinite]" />
          New: Apex 1:8 Brushless Buggy
          <span aria-hidden className="hidden text-white/30 sm:inline">·</span>
          <Link
            href="/products?category=rc-cars"
            className="hidden text-white/85 transition-colors hover:text-[color:var(--brand-ignition)] sm:inline"
          >
            Pre-order ›
          </Link>
        </div>
      </div>

      <div className="relative mx-auto flex min-h-[820px] max-w-[1280px] flex-col items-center justify-start px-6 pb-72 pt-28 text-center sm:pb-80 sm:pt-36 lg:min-h-[920px]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[color:var(--brand-ignition)]">
          Remote Control · Scale Precision · 110 MPH
        </p>

        <h1 className="mt-7 max-w-[1100px] font-display text-[14vw] font-500 leading-[0.92] tracking-apple-mass text-balance sm:text-[88px] lg:text-[136px]"
          style={{
            textShadow:
              "0 6px 30px rgba(0,0,0,0.6), 0 1px 0 rgba(255,90,31,0.18)",
          }}
        >
          <LetterReveal text="Built for the throttle." triggerOnMount stepMs={28} />
        </h1>

        <ScrollReveal delayMs={600} className="mt-8 max-w-2xl">
          <p className="text-balance text-lg font-300 tracking-apple-tight text-white/85 sm:text-xl">
            Scale-down precision performance machines. Cars, drones, bikes, planes,
            boats — engineered to the same tolerances we&apos;d accept on the
            full-size grid.
          </p>
        </ScrollReveal>

        <ScrollReveal delayMs={780} className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:gap-10">
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 text-[15px] font-medium text-white"
          >
            <span className="border-b border-white/45 pb-1 transition-colors group-hover:border-[color:var(--brand-ignition)]">
              Shop the lineup
            </span>
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
              ›
            </span>
          </Link>
          <Link
            href="/products?category=drones"
            className="group inline-flex items-center gap-2 text-[15px] font-medium text-white"
          >
            <span className="border-b border-white/45 pb-1 transition-colors group-hover:border-[color:var(--brand-ignition)]">
              Browse drones
            </span>
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
              ›
            </span>
          </Link>
        </ScrollReveal>

        {/* Tiny scroll cue */}
        <div
          aria-hidden
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-white/40"
        >
          Scroll
        </div>
      </div>
    </section>
  );
}
