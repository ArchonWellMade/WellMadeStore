import Link from "next/link";
import { ScrollReveal } from "@/frontend/components/site/scroll-reveal";
import { MouseParallax } from "@/frontend/components/site/mouse-parallax";
import { HeroScrollDriver } from "@/frontend/components/site/hero-scroll-driver";
import { TRACKS } from "@/shared/data/tracks";
import { PHOTOS } from "@/shared/data/photos";
import { HeroProductCarousel, type HeroProduct } from "@/frontend/components/site/hero-product-carousel";



export function Hero({ products = [] }: { products?: HeroProduct[] }) {
  return (
    <section
      data-hero
      data-mouse-parallax-root
      className="stay-dark hero-section relative isolate overflow-hidden bg-[#0a0a0c] text-white"
    >
      {/* Background photo, pushed right and faded into the dark on the left */}
      <div aria-hidden className="absolute inset-0">
        <div data-depth="0.12" className="hero-bg-layer absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element -- full-bleed parallax background */}
          <img
            className="hero-bg-image absolute inset-0 h-full w-full object-cover object-[70%_center] opacity-75"
            src={PHOTOS.heroCrawler}
            alt=""
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#0a0a0c_0%,rgba(10,10,12,0.88)_35%,rgba(10,10,12,0.35)_75%,rgba(10,10,12,0.5)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,#0a0a0c_100%)]" />
        <div className="absolute -left-40 top-1/3 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(233,168,32,0.14),transparent_65%)] blur-2xl" />
        <div className="absolute -right-20 bottom-0 h-[480px] w-[640px] rounded-full bg-[radial-gradient(circle,rgba(42,122,99,0.22),transparent_65%)] blur-2xl" />
      </div>

      <div className="relative mx-auto grid max-w-[1360px] items-center gap-10 px-4 pb-16 pt-40 sm:px-6 lg:min-h-[clamp(680px,calc(100svh-148px),900px)] lg:grid-cols-[1.05fr_1fr] lg:gap-6 lg:pb-20 lg:pt-44">
        <div className="max-w-[720px]">
          <ScrollReveal>
            <p className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-white/60">
              <span className="h-px w-8 bg-[color:var(--brand-gold)]" />
              Now open · Cars, crawlers, dozers &amp; diggers
            </p>
          </ScrollReveal>
          <h1 className="mt-6 font-display text-[52px] font-500 leading-[0.96] tracking-apple-mass text-balance sm:text-[76px] lg:text-[84px] xl:text-[96px]">
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

        {products.length > 0 ? (
          <ScrollReveal delayMs={200} className="relative">
            <p className="mb-2 text-center text-[11px] font-semibold uppercase tracking-[0.32em] text-white/50">
              <span className="text-[color:var(--brand-gold)]">New</span> · Fully hydraulic 1/14 machines
            </p>
            <HeroProductCarousel items={products} />
          </ScrollReveal>
        ) : null}
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
