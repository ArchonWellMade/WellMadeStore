import type { Metadata } from "next";
import Link from "next/link";
import { ScrollReveal } from "@/frontend/components/site/scroll-reveal";
import { TrackCard, getTrackImages } from "@/frontend/components/site/track-card";
import { HOW_IT_WORKS, TRACKS } from "@/shared/data/tracks";

export const metadata: Metadata = {
  title: "Tracks",
  description:
    "Explore the RC Adventure tracks — Dirt Rally Circuit, The Dig Site with RC excavators and bulldozers, Rock Crawler Trail and Drift Pad.",
};

const GOOD_TO_KNOW = [
  {
    title: "All ages",
    body: "Kids 5+ can drive with a grown-up nearby. Our crew helps first-timers get rolling.",
  },
  {
    title: "Bring your own",
    body: "Got your own RC? Bring it along and run it on any track that suits it.",
  },
  {
    title: "Parties & groups",
    body: "Birthday parties, team days and school groups — book the tracks for your crew.",
  },
  {
    title: "Wear old shoes",
    body: "It's a dirt park. Things get dusty, especially around the Dig Site.",
  },
];

export default async function TracksPage() {
  const trackImages = await getTrackImages();

  return (
    <>
      <section className="bg-[color:var(--brand-graphite)] text-white">
        <div className="mx-auto max-w-[1280px] px-4 py-20 text-center sm:px-6 sm:py-28">
          <ScrollReveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[color:var(--brand-gold)]">
              RC Adventure · Tracks
            </p>
            <h1 className="mx-auto mt-5 max-w-[14ch] font-display text-[44px] font-600 leading-[0.95] tracking-apple-mass text-balance sm:text-[72px] lg:text-[96px]">
              Pick your terrain.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-balance text-base font-300 text-white/75 sm:text-lg">
              Four purpose-built zones for racing, crawling, drifting and digging.
              One session gets you access to all of them.
            </p>
            <nav aria-label="Tracks" className="mt-10 flex flex-wrap justify-center gap-2">
              {TRACKS.map((t) => (
                <a
                  key={t.slug}
                  href={`#${t.slug}`}
                  className="rounded-full border border-white/20 px-4 py-2 text-[13px] font-medium text-white/85 transition-colors hover:border-[color:var(--brand-gold)] hover:text-[color:var(--brand-gold)]"
                >
                  {t.name}
                </a>
              ))}
            </nav>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto grid max-w-[1280px] gap-6 px-4 py-20 sm:px-6 sm:py-28 md:grid-cols-2">
          {TRACKS.map((t, i) => (
            <ScrollReveal key={t.slug} delayMs={(i % 2) * 100}>
              <TrackCard track={t} imageUrl={trackImages[t.slug]} index={i} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="border-y border-border/60 bg-[color:var(--brand-cool-gray)]">
        <div className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 sm:py-24">
          <ScrollReveal className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[color:var(--brand-forest)]">
              How a session works
            </p>
          </ScrollReveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {HOW_IT_WORKS.map((s, i) => (
              <ScrollReveal key={s.step} delayMs={i * 100} className="bezel-outer">
                <div className="bezel-inner">
                  <p className="font-display text-4xl font-700 text-[color:var(--brand-gold)]">{s.step}</p>
                  <h3 className="mt-3 text-[18px] font-semibold text-foreground">{s.title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">{s.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 sm:py-24">
          <ScrollReveal>
            <h2 className="font-display text-[32px] font-600 tracking-apple-tight sm:text-[44px]">
              Good to know
            </h2>
          </ScrollReveal>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {GOOD_TO_KNOW.map((g, i) => (
              <ScrollReveal key={g.title} delayMs={i * 80}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:var(--brand-forest)]">
                  {g.title}
                </p>
                <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">{g.body}</p>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal className="mt-14 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link href="/contact" className="btn-apple-primary">
              Book a session
            </Link>
            <Link href="/products" className="btn-apple-secondary">
              Shop the machines
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
