import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/frontend/components/site/scroll-reveal";
import { MouseParallax } from "@/frontend/components/site/mouse-parallax";
import { HeroScrollDriver } from "@/frontend/components/site/hero-scroll-driver";
import { TRACKS } from "@/shared/data/tracks";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1675301586777-2c56ee8aa5ef?w=2400&q=85&auto=format&fit=crop";

export function Hero() {
  return (
    <section
      data-hero
      data-mouse-parallax-root
      className="hero-section relative isolate overflow-hidden bg-[#0a0a0c] text-white"
    >
      {/* Background photo, pushed right and faded into the dark on the left */}
      <div aria-hidden className="absolute inset-0">
        <div data-depth="0.12" className="hero-bg-layer absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element -- full-bleed parallax background */}
          <img
            className="hero-bg-image absolute inset-0 h-full w-full object-cover object-[70%_center] opacity-60"
            src={HERO_IMAGE}
            alt=""
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#0a0a0c_0%,rgba(10,10,12,0.92)_35%,rgba(10,10,12,0.55)_70%,rgba(10,10,12,0.75)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,#0a0a0c_100%)]" />
        <div className="absolute -left-40 top-1/3 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(233,168,32,0.14),transparent_65%)] blur-2xl" />
        <div className="absolute -right-20 bottom-0 h-[480px] w-[640px] rounded-full bg-[radial-gradient(circle,rgba(42,122,99,0.22),transparent_65%)] blur-2xl" />
      </div>

      <div className="relative mx-auto grid max-w-[1280px] items-center gap-12 px-4 pb-16 pt-16 sm:px-6 lg:min-h-[clamp(560px,calc(100svh-4rem-148px),780px)] lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:pb-20 lg:pt-20">
        {/* Logo emblem — first on mobile, right on desktop */}
        <div data-depth="0.3" className="hero-content-layer order-first lg:order-last">
          <Image
            src="/brand/rc-adventure-logo.png"
            alt="WellMade RC Adventure — The Ultimate RC Experience. Drive It. Race It. Own It."
            width={2172}
            height={724}
            priority
            sizes="(min-width: 1024px) 620px, 92vw"
            className="mx-auto h-auto w-full max-w-[620px] drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
          />
        </div>

        <div className="max-w-[600px]">
          <ScrollReveal>
            <p className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-white/60">
              <span className="h-px w-8 bg-[color:var(--brand-gold)]" />
              Now open · Cars, crawlers, dozers &amp; diggers
            </p>
          </ScrollReveal>
          <h1 className="mt-6 font-display text-[48px] font-500 leading-[0.98] tracking-apple-mass text-balance sm:text-[68px] lg:text-[80px]">
            The ultimate{" "}
            <em className="font-400 italic text-[color:var(--brand-gold)]">RC</em>{" "}
            experience.
          </h1>
          <ScrollReveal delayMs={150}>
            <p className="mt-6 max-w-[34rem] text-[17px] font-300 leading-relaxed text-white/70 sm:text-[18px]">
              Race rally cars over jumps, crawl a boulder trail, and dig a real
              sandpit with RC excavators and bulldozers. Four purpose-built tracks,
              one unforgettable session.
            </p>
          </ScrollReveal>
          <ScrollReveal delayMs={280} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-[color:var(--brand-gold)] px-8 py-4 text-[15px] font-semibold text-[#0E0E10] shadow-[0_10px_40px_-8px_rgba(233,168,32,0.55)] transition-colors hover:bg-[color:var(--brand-gold-light)]"
            >
              Book a session
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="/tracks"
              className="inline-flex h-13 items-center justify-center rounded-full border border-white/20 bg-white/[0.04] px-8 py-4 text-[15px] font-semibold text-white backdrop-blur transition-colors hover:border-white/40 hover:bg-white/[0.08]"
            >
              Explore the tracks
            </Link>
          </ScrollReveal>
        </div>
      </div>

      {/* Track index strip */}
      <div className="relative border-t border-white/[0.08] bg-black/30 backdrop-blur-md">
        <div className="mx-auto grid max-w-[1280px] grid-cols-2 lg:grid-cols-4">
          {TRACKS.map((t, i) => (
            <Link
              key={t.slug}
              href={`/tracks#${t.slug}`}
              className="group flex flex-col gap-1.5 border-white/[0.08] px-4 py-6 transition-colors hover:bg-white/[0.03] sm:px-6 [&:not(:nth-child(2n))]:border-r lg:[&:not(:last-child)]:border-r"
            >
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[color:var(--brand-gold)]">
                Track {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex items-center justify-between font-display text-[19px] font-500 text-white">
                {t.name}
                <span aria-hidden className="text-white/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[color:var(--brand-gold)]">→</span>
              </span>
              <span className="hidden text-[12px] text-white/45 sm:block">{t.machines.join(" · ")}</span>
            </Link>
          ))}
        </div>
      </div>

      <MouseParallax />
      <HeroScrollDriver />
    </section>
  );
}
