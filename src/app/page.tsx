import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/frontend/components/site/hero";
import { ProductCard } from "@/frontend/components/site/product-card";
import { ScrollReveal } from "@/frontend/components/site/scroll-reveal";
import { CountUp } from "@/frontend/components/site/count-up";
import { LogoArt } from "@/frontend/components/site/logo-art";
import { TrackCard } from "@/frontend/components/site/track-card";
import { getCategories } from "@/shared/data/categories";
import { getProductsByCategory } from "@/shared/data/products";
import { HOW_IT_WORKS, TRACKS } from "@/shared/data/tracks";
import { PHOTOS } from "@/shared/data/photos";

const STATS = [
  { to: 4, suffix: "", label: "Purpose-built tracks" },
  { to: 30, suffix: "+", label: "Machines in the fleet" },
  { to: 5, suffix: "+", label: "Ages welcome" },
];

const PACKAGES = [
  {
    name: "Drive Session",
    blurb: "Walk in, pick a machine, run every track.",
    points: ["All four tracks", "Swap machines as you go", "Crew on hand to help"],
  },
  {
    name: "Birthday Party",
    blurb: "The tracks to yourselves, with a crew running the show.",
    points: ["Private track time", "Race-day lap timing", "Party area for cake"],
    featured: true,
  },
  {
    name: "Groups & Teams",
    blurb: "School groups, team days and RC clubs.",
    points: ["Dig Site challenges", "Head-to-head racing", "Flexible group sizes"],
  },
];

function Eyebrow({ children, tone = "gold" }: { children: React.ReactNode; tone?: "gold" | "forest" }) {
  return (
    <p
      className={`inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] ${
        tone === "gold" ? "text-[color:var(--brand-gold)]" : "text-[color:var(--brand-forest)]"
      }`}
    >
      <span className="h-px w-8 bg-current opacity-70" />
      {children}
    </p>
  );
}

function PhotoFrame({ src, alt, tag }: { src: string; alt: string; tag: string }) {
  return (
    <figure className="relative aspect-[4/3] overflow-hidden rounded-[28px] border border-white/10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)]">
      <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 620px, 100vw" className="object-cover" />
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(10,10,12,0.75)_100%)]" />
      <figcaption className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full bg-black/50 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white backdrop-blur-md">
        <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--brand-gold)]" />
        {tag}
      </figcaption>
    </figure>
  );
}

const GALLERY = [
  { src: PHOTOS.crawlerDirtHill, alt: "RC crawler cresting a dirt hill", cls: "col-span-2 row-span-2" },
  { src: PHOTOS.crawlerCreek, alt: "Scale truck splashing through a creek", cls: "" },
  { src: PHOTOS.truckNightLights, alt: "RC truck with light bar at night", cls: "" },
  { src: PHOTOS.crawlerForestLog, alt: "Crawler climbing a log in the forest", cls: "" },
  { src: PHOTOS.crawlerRockFace, alt: "Crawler on a steep rock face", cls: "" },
];

export default async function Home() {
  const [carsProducts, digProducts, categories] = await Promise.all([
    getProductsByCategory("high-speed-cars"),
    getProductsByCategory("engineering-vehicles").catch(() => []),
    getCategories(),
  ]);
  const featured = [...digProducts.slice(0, 2), ...carsProducts.slice(0, 2)];
  const categoryTitleBySlug = new Map(categories.map((c) => [c.slug, c.title]));

  return (
    <div className="bg-[#0a0a0c] text-white">
      <Hero />

      {/* ── Tracks ─────────────────────────────────────────── */}
      <section className="relative">
        <div className="mx-auto max-w-[1280px] px-4 py-24 sm:px-6 sm:py-32">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <ScrollReveal className="max-w-2xl">
              <Eyebrow>The tracks</Eyebrow>
              <h2 className="mt-6 font-display text-[44px] font-500 leading-[1] tracking-apple-mass text-balance sm:text-[64px]">
                Four zones. <span className="text-white/40">One session.</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal delayMs={120} className="max-w-sm">
              <p className="text-[16px] font-300 leading-relaxed text-white/60">
                Every track is built for a different machine and a different
                kind of fun — and your session covers all of them.
              </p>
            </ScrollReveal>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {TRACKS.map((t, i) => (
              <ScrollReveal key={t.slug} delayMs={(i % 2) * 100} className="h-full">
                <TrackCard track={t} index={i} href={`/tracks#${t.slug}`} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Dig Site spotlight ─────────────────────────────── */}
      <section className="relative overflow-hidden border-y border-white/[0.06] bg-[linear-gradient(180deg,#0f1012_0%,#0a0a0c_100%)]">
        <div aria-hidden className="absolute right-0 top-1/2 h-[600px] w-[800px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(233,168,32,0.12),transparent_60%)] blur-2xl" />
        <div className="relative mx-auto grid max-w-[1280px] items-center gap-14 px-4 py-24 sm:px-6 sm:py-32 lg:grid-cols-2">
          <ScrollReveal>
            <Eyebrow>Track 02 · The Dig Site</Eyebrow>
            <h2 className="mt-6 font-display text-[44px] font-500 leading-[1] tracking-apple-mass text-balance sm:text-[60px]">
              Real dirt. <br className="hidden sm:block" />
              <span className="italic text-[color:var(--brand-gold)]">Your</span> controls.
            </h2>
            <p className="mt-6 max-w-lg text-[17px] font-300 leading-relaxed text-white/65">
              Take the levers of an RC excavator, push a pile with a bulldozer and
              load up the dump trucks in a full construction-zone sandpit. It&apos;s
              the closest thing to running a real worksite.
            </p>
            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-6 border-t border-white/[0.08] pt-8">
              {[
                ["Excavators", "Dig & load"],
                ["Bulldozers", "Push & level"],
                ["Dump trucks", "Haul it away"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="font-display text-[19px] font-500">{k}</dt>
                  <dd className="mt-1 text-[13px] text-white/50">{v}</dd>
                </div>
              ))}
            </dl>
            <Link
              href="/contact"
              className="mt-10 inline-flex h-12 items-center gap-2 rounded-full bg-white px-7 text-[14px] font-semibold text-[#0E0E10] transition-colors hover:bg-[color:var(--brand-gold)]"
            >
              Book the Dig Site <span aria-hidden>→</span>
            </Link>
          </ScrollReveal>
          <ScrollReveal delayMs={150}>
            <PhotoFrame
              src={PHOTOS.excavatorSandpit}
              alt="RC excavator digging in the sandpit"
              tag="The Dig Site"
            />
          </ScrollReveal>
        </div>
      </section>

      {/* ── Stats ──────────────────────────────────────────── */}
      <section>
        <div className="mx-auto grid max-w-[1280px] grid-cols-3 divide-x divide-white/[0.08] px-4 py-20 sm:px-6">
          {STATS.map((s, i) => (
            <ScrollReveal key={s.label} delayMs={i * 100} className="px-2 text-center sm:px-6">
              <p className="font-display text-[44px] font-500 tabular-nums tracking-apple-mass sm:text-[72px]">
                <CountUp to={s.to} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-white/50 sm:text-[12px]">
                {s.label}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── Rally spotlight ────────────────────────────────── */}
      <section className="relative overflow-hidden border-y border-white/[0.06] bg-[linear-gradient(180deg,#0a0a0c_0%,#0d1210_100%)]">
        <div aria-hidden className="absolute left-0 top-1/2 h-[600px] w-[800px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(42,122,99,0.25),transparent_60%)] blur-2xl" />
        <div className="relative mx-auto grid max-w-[1280px] items-center gap-14 px-4 py-24 sm:px-6 sm:py-32 lg:grid-cols-2">
          <ScrollReveal delayMs={150} className="order-last lg:order-first">
            <PhotoFrame
              src={PHOTOS.driverWithBuggy}
              alt="Driver racing an RC buggy across the gravel"
              tag="Dirt Rally Circuit"
            />
          </ScrollReveal>
          <ScrollReveal>
            <Eyebrow>Track 01 · Dirt Rally Circuit</Eyebrow>
            <h2 className="mt-6 font-display text-[44px] font-500 leading-[1] tracking-apple-mass text-balance sm:text-[60px]">
              Full throttle. <br className="hidden sm:block" />
              <span className="italic text-[color:var(--brand-gold)]">Full</span> send.
            </h2>
            <p className="mt-6 max-w-lg text-[17px] font-300 leading-relaxed text-white/65">
              Banked berms, tabletop jumps and a timed lap board. Grab a 4WD rally
              car or buggy and find out who owns the fastest lap of the day.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-7 text-[14px] font-semibold text-[#0E0E10] transition-colors hover:bg-[color:var(--brand-gold)]"
              >
                Book a race <span aria-hidden>→</span>
              </Link>
              <Link
                href="/tracks#dirt-rally-circuit"
                className="inline-flex h-12 items-center rounded-full border border-white/20 px-7 text-[14px] font-semibold text-white transition-colors hover:border-white/50"
              >
                Track details
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── How it works ───────────────────────────────────── */}
      <section>
        <div className="mx-auto max-w-[1280px] px-4 py-24 sm:px-6 sm:py-32">
          <ScrollReveal className="text-center">
            <Eyebrow>How it works</Eyebrow>
            <h2 className="mx-auto mt-6 max-w-[18ch] font-display text-[44px] font-500 leading-[1] tracking-apple-mass text-balance sm:text-[64px]">
              Drive it. Race it. <span className="italic text-[color:var(--brand-gold)]">Own it.</span>
            </h2>
          </ScrollReveal>
          <ol className="relative mt-16 grid gap-10 sm:grid-cols-3 sm:gap-8">
            <div aria-hidden className="absolute left-0 right-0 top-[27px] hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent sm:block" />
            {HOW_IT_WORKS.map((s, i) => (
              <ScrollReveal key={s.step} delayMs={i * 120} className="relative text-center">
                <li className="list-none">
                  <span className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[color:var(--brand-gold)]/50 bg-[#0a0a0c] font-display text-[18px] text-[color:var(--brand-gold)]">
                    {s.step}
                  </span>
                  <h3 className="mt-6 font-display text-[24px] font-500">{s.title}</h3>
                  <p className="mx-auto mt-3 max-w-[30ch] text-[15px] leading-relaxed text-white/55">{s.body}</p>
                </li>
              </ScrollReveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Packages ───────────────────────────────────────── */}
      <section className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-[1280px] px-4 py-24 sm:px-6 sm:py-32">
          <ScrollReveal className="max-w-2xl">
            <Eyebrow>Sessions &amp; parties</Eyebrow>
            <h2 className="mt-6 font-display text-[44px] font-500 leading-[1] tracking-apple-mass text-balance sm:text-[64px]">
              Bring the crew.
            </h2>
          </ScrollReveal>
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {PACKAGES.map((p, i) => (
              <ScrollReveal key={p.name} delayMs={i * 100} className="h-full">
                <div
                  className={`flex h-full flex-col rounded-[28px] border p-8 ${
                    p.featured
                      ? "border-[color:var(--brand-gold)]/50 bg-[linear-gradient(160deg,rgba(233,168,32,0.14),rgba(233,168,32,0.02)_60%)]"
                      : "border-white/[0.08] bg-white/[0.02]"
                  }`}
                >
                  {p.featured ? (
                    <span className="mb-5 w-fit rounded-full bg-[color:var(--brand-gold)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#0E0E10]">
                      Most popular
                    </span>
                  ) : null}
                  <h3 className="font-display text-[28px] font-500">{p.name}</h3>
                  <p className="mt-2 text-[15px] text-white/60">{p.blurb}</p>
                  <ul className="mt-8 space-y-3 border-t border-white/[0.08] pt-8 text-[14px] text-white/80">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex items-center gap-3">
                        <span aria-hidden className="text-[color:var(--brand-gold)]">✓</span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-10">
                    <Link
                      href="/contact"
                      className={`inline-flex h-12 w-full items-center justify-center rounded-full text-[14px] font-semibold transition-colors ${
                        p.featured
                          ? "bg-[color:var(--brand-gold)] text-[#0E0E10] hover:bg-[color:var(--brand-gold-light)]"
                          : "border border-white/20 text-white hover:border-white/50"
                      }`}
                    >
                      Enquire
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery ─────────────────────────────────────────── */}
      <section className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-[1280px] px-4 py-24 sm:px-6 sm:py-32">
          <ScrollReveal className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <Eyebrow>Out on the tracks</Eyebrow>
              <h2 className="mt-6 font-display text-[44px] font-500 leading-[1] tracking-apple-mass sm:text-[64px]">
                Mud, rocks &amp; <span className="italic text-[color:var(--brand-gold)]">horsepower.</span>
              </h2>
            </div>
            <Link
              href="/tracks"
              className="inline-flex h-12 w-fit items-center gap-2 rounded-full border border-white/20 px-7 text-[14px] font-semibold text-white transition-colors hover:border-white/50"
            >
              See every track <span aria-hidden>→</span>
            </Link>
          </ScrollReveal>
          <div className="mt-14 grid auto-rows-[160px] grid-cols-2 gap-3 sm:auto-rows-[220px] lg:grid-cols-4 lg:gap-4">
            {GALLERY.map((g, i) => (
              <ScrollReveal key={g.src} delayMs={i * 80} className={`relative overflow-hidden rounded-2xl ${g.cls}`}>
                <Image
                  src={g.src}
                  alt={g.alt}
                  fill
                  sizes={g.cls ? "(min-width: 1024px) 640px, 100vw" : "(min-width: 1024px) 320px, 50vw"}
                  className="object-cover transition-transform duration-[900ms] ease-out hover:scale-[1.05]"
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Shop ───────────────────────────────────────────── */}
      {featured.length > 0 ? (
        <section className="bg-background text-foreground">
          <div className="mx-auto max-w-[1280px] px-4 py-24 sm:px-6 sm:py-32">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <ScrollReveal>
                <Eyebrow tone="forest">Own it</Eyebrow>
                <h2 className="mt-6 font-display text-[44px] font-500 leading-[1] tracking-apple-mass sm:text-[64px]">
                  Take one home.
                </h2>
                <p className="mt-4 max-w-md text-[16px] font-300 text-muted-foreground">
                  Every machine on our tracks is available in the shop.
                </p>
              </ScrollReveal>
              <Link
                href="/products"
                className="inline-flex h-12 w-fit items-center gap-2 rounded-full border border-border px-7 text-[14px] font-semibold transition-colors hover:border-foreground"
              >
                Shop all machines <span aria-hidden>→</span>
              </Link>
            </div>
            <div className="mt-14 grid gap-y-14 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-4">
              {featured.map((p) => (
                <ProductCard
                  key={`${p.category_slug}-${p.slug}`}
                  slug={p.slug}
                  name={p.name}
                  shortDescription={p.short_description}
                  priceRange={p.price_range}
                  imageUrl={p.image_url}
                  categoryTitle={categoryTitleBySlug.get(p.category_slug) ?? null}
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* ── Final CTA ──────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <LogoArt
          crop="mountains"
          soft={false}
          className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto w-full max-w-[1400px] opacity-25 [mask-image:linear-gradient(to_top,black_30%,transparent)]"
        />
        <div aria-hidden className="absolute left-1/2 top-0 h-[400px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(233,168,32,0.16),transparent_60%)] blur-2xl" />
        <div className="relative mx-auto max-w-[1280px] px-4 py-32 text-center sm:px-6 sm:py-44">
          <ScrollReveal>
            <Eyebrow>Ready when you are</Eyebrow>
            <h2 className="mx-auto mt-6 max-w-[14ch] font-display text-[48px] font-500 leading-[0.98] tracking-apple-mass text-balance sm:text-[80px]">
              Ready to get <span className="italic text-[color:var(--brand-gold)]">dirty?</span>
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-[17px] font-300 leading-relaxed text-white/65">
              Book a session for yourself, the kids or the whole crew.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-[color:var(--brand-gold)] px-8 py-4 text-[15px] font-semibold text-[#0E0E10] shadow-[0_10px_40px_-8px_rgba(233,168,32,0.55)] transition-colors hover:bg-[color:var(--brand-gold-light)]"
              >
                Book a session <span aria-hidden>→</span>
              </Link>
              <Link
                href="/tracks"
                className="inline-flex h-13 items-center justify-center rounded-full border border-white/20 px-8 py-4 text-[15px] font-semibold text-white transition-colors hover:border-white/50"
              >
                Explore the tracks
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
