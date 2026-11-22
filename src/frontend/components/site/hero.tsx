import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/frontend/components/site/scroll-reveal";
import { HeroScene } from "@/frontend/components/site/hero-scene";
import { MouseParallax } from "@/frontend/components/site/mouse-parallax";
import { HeroScrollDriver } from "@/frontend/components/site/hero-scroll-driver";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1675301586777-2c56ee8aa5ef?w=2400&q=85&auto=format&fit=crop";

export function Hero() {
  return (
    <section
      data-hero
      data-mouse-parallax-root
      className="hero-section relative isolate overflow-hidden bg-[color:var(--brand-graphite)] text-white"
    >
      {/* Background — dirt track photo, scroll-zoom + mouse parallax */}
      <div aria-hidden className="absolute inset-0">
        <div data-depth="0.18" className="hero-bg-layer absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element -- full-bleed parallax background, not a standard content image */}
          <img
            className="hero-bg-image absolute inset-0 h-full w-full object-cover"
            src={HERO_IMAGE}
            alt=""
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,_rgba(14,14,16,0.55)_0%,_rgba(14,14,16,0.6)_55%,_rgba(14,14,16,0.92)_100%)]" />
      </div>

      <HeroScene />

      {/* Top eyebrow rail */}
      <div className="relative border-b border-white/[0.06]">
        <div className="mx-auto flex max-w-[1200px] items-center justify-center gap-3 px-6 py-3 text-[11px] uppercase tracking-[0.28em] text-white/70">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--brand-gold)] [animation:glowPulse_2.4s_ease-in-out_infinite]" />
          Now open · 4 tracks · Cars, crawlers, dozers &amp; diggers
          <span aria-hidden className="hidden text-white/30 sm:inline">·</span>
          <Link
            href="/tracks"
            className="hidden text-white/90 transition-colors hover:text-[color:var(--brand-gold)] sm:inline"
          >
            See the tracks ›
          </Link>
        </div>
      </div>

      <div className="relative mx-auto flex min-h-[760px] max-w-[1280px] flex-col items-center justify-center px-4 pb-40 pt-16 text-center sm:px-6 sm:pt-20 lg:min-h-[880px]">
        <div data-depth="0.45" className="hero-content-layer flex w-full flex-col items-center">
          <h1 className="sr-only">RC Adventure — The Ultimate RC Experience</h1>

          <Image
            src="/brand/rc-adventure-logo.png"
            alt="WellMade RC Adventure — The Ultimate RC Experience. Drive It. Race It. Own It."
            width={2172}
            height={724}
            priority
            sizes="(min-width: 1100px) 1040px, 96vw"
            className="h-auto w-full max-w-[1040px] drop-shadow-[0_12px_40px_rgba(0,0,0,0.65)]"
          />

          <ScrollReveal delayMs={300} className="mt-8 max-w-2xl">
            <p className="text-balance text-lg font-400 tracking-apple-tight text-white/90 sm:text-xl">
              Get behind the controls of RC rally cars, rock crawlers, bulldozers
              and excavators. Real dirt tracks, a working dig site, and a crew to
              get you started.
            </p>
          </ScrollReveal>

          <ScrollReveal
            delayMs={480}
            className="mt-10 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:gap-4"
          >
            <Link
              href="/contact"
              className="inline-flex h-12 w-full items-center justify-center rounded-full bg-[color:var(--brand-gold)] px-8 text-[15px] font-bold uppercase tracking-[0.08em] text-[#0E0E10] shadow-[0_8px_30px_rgba(233,168,32,0.35)] transition-transform hover:scale-[1.03] sm:w-auto"
            >
              Book a session
            </Link>
            <Link
              href="/tracks"
              className="inline-flex h-12 w-full items-center justify-center rounded-full border border-white/40 bg-white/5 px-8 text-[15px] font-semibold text-white backdrop-blur transition-colors hover:border-[color:var(--brand-gold)] hover:text-[color:var(--brand-gold)] sm:w-auto"
            >
              Explore the tracks
            </Link>
          </ScrollReveal>
        </div>

        <div
          aria-hidden
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-white/40"
        >
          Scroll
        </div>
      </div>

      <MouseParallax />
      <HeroScrollDriver />
    </section>
  );
}
