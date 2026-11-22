import Link from "next/link";
import { Hero } from "@/frontend/components/site/hero";
import { FeatureSection } from "@/frontend/components/site/feature-section";
import { ProductCard } from "@/frontend/components/site/product-card";
import { StatStrip } from "@/frontend/components/site/stat-strip";
import { Marquee } from "@/frontend/components/site/marquee";
import { ScrollReveal } from "@/frontend/components/site/scroll-reveal";
import { TrackCard, getTrackImages } from "@/frontend/components/site/track-card";
import { getCategories } from "@/shared/data/categories";
import { getProductsByCategory } from "@/shared/data/products";
import { HOW_IT_WORKS, TRACKS } from "@/shared/data/tracks";

export default async function Home() {
  const [carsProducts, digProducts, categories, trackImages] = await Promise.all([
    getProductsByCategory("high-speed-cars"),
    getProductsByCategory("engineering-vehicles").catch(() => []),
    getCategories(),
    getTrackImages(),
  ]);
  const featured = [...digProducts.slice(0, 2), ...carsProducts.slice(0, 2)];
  const categoryTitleBySlug = new Map(categories.map((c) => [c.slug, c.title]));
  const digImage = digProducts[0]?.image_url ?? trackImages["dig-site"];

  return (
    <>
      <Hero />

      <Marquee
        tone="ignition"
        items={[
          "Dirt Rally Circuit",
          "The Dig Site",
          "Rock Crawler Trail",
          "Drift Pad",
          "RC Excavators",
          "RC Bulldozers",
          "Monster Trucks",
          "Birthday Parties",
        ]}
      />

      {/* Tracks */}
      <section className="bg-background">
        <div className="mx-auto max-w-[1280px] px-4 py-24 sm:px-6 sm:py-32">
          <ScrollReveal className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[color:var(--brand-forest)]">
              The tracks
            </p>
            <h2 className="mx-auto mt-5 max-w-[16ch] font-display text-[40px] font-600 leading-[0.95] tracking-apple-mass text-balance sm:text-[64px] lg:text-[80px]">
              Four zones. Zero boring.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-balance text-base font-300 tracking-apple-tight text-muted-foreground">
              From high-speed dirt laps to slow-and-steady digging, every track is
              built for a different kind of machine — and a different kind of fun.
            </p>
          </ScrollReveal>
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {TRACKS.map((t, i) => (
              <ScrollReveal key={t.slug} delayMs={(i % 2) * 100}>
                <TrackCard track={t} imageUrl={trackImages[t.slug]} index={i} />
              </ScrollReveal>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/tracks" className="btn-apple-secondary">
              Track details &amp; sessions
            </Link>
          </div>
        </div>
      </section>

      <StatStrip />

      {digImage ? (
        <FeatureSection
          eyebrow="The Dig Site"
          title="Dig it. Push it. Haul it."
          subtitle="Take the controls of RC excavators, bulldozers and wheel loaders in a full construction-zone sandpit. Dig trenches, build ramps and load up the dump trucks — just like the real thing."
          imageUrl={digImage}
          imageAlt="RC excavator working in the Dig Site sandpit"
          primaryCta={{ label: "Book the Dig Site", href: "/contact" }}
          secondaryCta={{ label: "See all tracks", href: "/tracks" }}
          theme="dark"
          layout="split"
          scaleTag={{ scale: "CONSTRUCTION ZONE", label: "Excavators · Dozers · Loaders" }}
        />
      ) : null}

      <FeatureSection
        eyebrow="Dirt Rally Circuit"
        title="Full throttle. Full send."
        subtitle="Banked berms, tabletop jumps and a timed lap board. Grab a 4WD rally car or buggy and see who owns the fastest lap of the day."
        imageUrl="https://omo-oss-image1.thefastimg.com/portal-saas/pg2025030619402182217/cms/image/52b0e20e-a650-46e5-95fa-77e41a4ddbd9.jpg?vf=B7gH3s"
        imageAlt="RC rally car racing on the dirt circuit"
        primaryCta={{ label: "Book a race session", href: "/contact" }}
        secondaryCta={{ label: "Track details", href: "/tracks#dirt-rally-circuit" }}
        theme="light"
        layout="stack"
        scaleTag={{ scale: "4WD RALLY", label: "Jumps · Berms · Lap timing" }}
      />

      {/* How it works */}
      <section className="relative overflow-hidden bg-[color:var(--brand-graphite)] text-white">
        <div className="mx-auto max-w-[1280px] px-4 py-24 sm:px-6 sm:py-32">
          <ScrollReveal className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[color:var(--brand-gold)]">
              How it works
            </p>
            <h2 className="mx-auto mt-5 max-w-[18ch] font-display text-[40px] font-600 leading-[0.95] tracking-apple-mass text-balance sm:text-[64px]">
              Drive it. Race it. Own it.
            </h2>
          </ScrollReveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            {HOW_IT_WORKS.map((s, i) => (
              <ScrollReveal
                key={s.step}
                delayMs={i * 120}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-7"
              >
                <p className="font-display text-5xl font-700 text-[color:var(--brand-gold)]">{s.step}</p>
                <h3 className="mt-4 text-[20px] font-semibold tracking-apple-tight">{s.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-white/70">{s.body}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {featured.length > 0 ? (
        <section className="bg-background">
          <div className="mx-auto max-w-[1280px] px-4 py-24 sm:px-6 sm:py-32">
            <ScrollReveal className="text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[color:var(--brand-forest)]">
                Own it
              </p>
              <h2 className="mx-auto mt-5 max-w-[16ch] font-display text-[40px] font-600 leading-[0.95] tracking-apple-mass text-balance sm:text-[64px] lg:text-[80px]">
                Loved it? Take it home.
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-balance text-base font-300 tracking-apple-tight text-muted-foreground">
                The machines on our tracks are available in our shop — so the
                adventure doesn&apos;t have to end when your session does.
              </p>
            </ScrollReveal>
            <div className="mt-16 grid gap-y-16 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-4">
              {featured.map((p) => (
                <ProductCard
                  key={p.slug}
                  slug={p.slug}
                  name={p.name}
                  shortDescription={p.short_description}
                  priceRange={p.price_range}
                  imageUrl={p.image_url}
                  categoryTitle={categoryTitleBySlug.get(p.category_slug) ?? null}
                />
              ))}
            </div>
            <div className="mt-14 text-center">
              <Link href="/products" className="btn-apple-secondary">
                Shop all machines
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      <Marquee
        tone="graphite"
        items={[
          "Drive It",
          "Race It",
          "Own It",
          "The Ultimate RC Experience",
          "Birthday Parties",
          "Group Bookings",
          "Bring Your Own RC",
          "All Ages",
        ]}
      />

      <section className="relative overflow-hidden bg-[color:var(--brand-graphite)] text-white">
        <div aria-hidden className="particle-field">
          <span /><span /><span /><span /><span /><span /><span /><span />
        </div>
        <div aria-hidden className="light-sweep" />
        <div className="relative mx-auto max-w-[1280px] px-4 py-28 text-center sm:px-6 sm:py-36">
          <ScrollReveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[color:var(--brand-gold)]">
              Parties · Groups · Weekends
            </p>
            <h2 className="mx-auto mt-5 max-w-[14ch] font-display text-[40px] font-600 leading-[0.95] tracking-apple-mass text-balance sm:text-[64px] lg:text-[88px]">
              Ready to get dirty?
            </h2>
            <p className="mx-auto mt-7 max-w-xl text-balance text-base font-300 leading-relaxed text-white/75 sm:text-lg">
              Book a session for yourself, the kids, or the whole crew. Birthday
              parties and group bookings get the tracks to themselves.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Link
                href="/contact"
                className="inline-flex h-12 w-full items-center justify-center rounded-full bg-[color:var(--brand-gold)] px-8 text-[15px] font-bold uppercase tracking-[0.08em] text-[#0E0E10] transition-transform hover:scale-[1.03] sm:w-auto"
              >
                Book a session
              </Link>
              <Link
                href="/tracks"
                className="inline-flex h-12 w-full items-center justify-center rounded-full border border-white/40 px-8 text-[15px] font-semibold text-white transition-colors hover:border-[color:var(--brand-gold)] hover:text-[color:var(--brand-gold)] sm:w-auto"
              >
                Explore the tracks
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
