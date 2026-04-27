import Link from "next/link";
import { Hero } from "@/frontend/components/site/hero";
import { FeatureSection } from "@/frontend/components/site/feature-section";
import { ProductCard } from "@/frontend/components/site/product-card";
import { TrustBar } from "@/frontend/components/site/trust-bar";
import { StatStrip } from "@/frontend/components/site/stat-strip";
import { Marquee } from "@/frontend/components/site/marquee";
import { ScrollReveal } from "@/frontend/components/site/scroll-reveal";
import { getCategoryBySlug } from "@/shared/data/categories";
import { getFeaturedProducts } from "@/shared/data/products";

export default function Home() {
  const featured = getFeaturedProducts(4);

  const drones = getCategoryBySlug("drones")!;
  const cars = getCategoryBySlug("rc-cars")!;
  const swords = getCategoryBySlug("flying-rc-swords")!;
  const motos = getCategoryBySlug("rc-motorcycles")!;
  const parts = getCategoryBySlug("parts-batteries")!;

  return (
    <>
      <Hero />

      <Marquee
        tone="ignition"
        items={[
          "RC Cars",
          "Drones",
          "Motorcycles",
          "Planes",
          "Boats",
          "Helicopters",
          "Flying RC Swords",
          "Parts & Batteries",
        ]}
      />

      <StatStrip />

      <FeatureSection
        eyebrow="Drones"
        title="Open the sky."
        subtitle="1-inch sensor. 38-minute flight. Occusync 4 transmission at 15 km. Or strap on the freestyle 5-inch and pull 110 mph through a punchout."
        imageUrl="https://images.unsplash.com/photo-1556537902-16b47f40c55c?w=2400&q=85&auto=format&fit=crop"
        imageAlt="Hobby-grade RC drone"
        primaryCta={{ label: "Shop drones", href: `/products?category=${drones.slug}` }}
        secondaryCta={{ label: "Compare models", href: "/products" }}
        theme="light"
        layout="stack"
        scaleTag={{ scale: "5\" RACE QUAD", label: "FPV · Hobby grade RC" }}
      />

      <FeatureSection
        eyebrow="RC Cars"
        title="Pavement, optional."
        subtitle="GT3-derived chassis geometry. Carbon-Kevlar tub. Sensored 6-pole brushless motor pulling 0–60 in 2.4 seconds. Scale weight, full-size violence."
        imageUrl="https://images.unsplash.com/photo-1758621514034-8940de958212?w=2400&q=85&auto=format&fit=crop"
        imageAlt="Race car at speed with motion blur"
        primaryCta={{ label: "Shop RC cars", href: `/products?category=${cars.slug}` }}
        secondaryCta={{ label: "See the Apex 1:8", href: "/products" }}
        theme="dark"
        layout="stack"
        scaleTag={{ scale: "1:8 SCALE", label: "Brushless RC · Bash-proof" }}
      />

      <FeatureSection
        eyebrow="New · Limited drop"
        title="A blade. With wings."
        subtitle="Blade-shaped airframe. Six-axis gyro. RGB edge optics that throw real spill. 12 minutes hover, indoor or out — and yes, it does carve."
        imageUrl="https://images.unsplash.com/photo-1671015522549-e7aa41ded44f?w=2000&q=85&auto=format&fit=crop"
        imageAlt="Katana blade with dramatic lighting"
        primaryCta={{ label: "Shop flying swords", href: `/products?category=${swords.slug}` }}
        secondaryCta={{ label: "How it flies", href: "/about" }}
        theme="light"
        layout="split"
        scaleTag={{ scale: "NOVELTY FLYER", label: "Six-axis gyro RC" }}
      />

      <FeatureSection
        eyebrow="Motorcycles"
        title="Lean into it."
        subtitle="1:5 scale. Live MotoGP lean angle. Carbon swingarm, working headlights, dual-clutch slipper. Geometry pulled from the 2025 superbike grid."
        imageUrl="https://images.unsplash.com/photo-1761813163091-7d14e60a0722?w=2400&q=85&auto=format&fit=crop"
        imageAlt="Sportbike leaning into a track corner"
        primaryCta={{ label: "Shop motorcycles", href: `/products?category=${motos.slug}` }}
        secondaryCta={{ label: "Watch the lean test", href: "/about" }}
        theme="dark"
        layout="stack"
        scaleTag={{ scale: "1:5 SCALE", label: "Self-balancing RC" }}
      />

      <FeatureSection
        eyebrow="Parts & Batteries"
        title="Built to be rebuilt."
        subtitle="100C continuous LiPos, IR-tested cell-by-cell. Sensored stators wound to 0.05Ω tolerance. Every part on the bench is one we'd run ourselves."
        imageUrl="https://images.unsplash.com/photo-1622319491968-62c2f54ba5d6?w=2000&q=85&auto=format&fit=crop"
        imageAlt="Precision-machined engine detail close-up"
        primaryCta={{ label: "Shop parts", href: `/products?category=${parts.slug}` }}
        secondaryCta={{ label: "Build guides", href: "/about" }}
        theme="light"
        layout="split"
        scaleTag={{ scale: "HOBBY GRADE", label: "Parts · LiPo · Brushless" }}
      />

      <Marquee
        tone="graphite"
        items={[
          "Brushless",
          "Carbon",
          "Sensored",
          "100C LiPo",
          "FPV",
          "1:8 Scale",
          "Gyro-stabilized",
          "Lab-tested",
        ]}
      />

      {featured.length > 0 ? (
        <section className="bg-background">
          <div className="mx-auto max-w-[1280px] px-6 py-28 sm:py-36">
            <ScrollReveal className="text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[color:var(--brand-forest)]">
                Featured this season
              </p>
              <h2 className="mx-auto mt-5 max-w-[16ch] font-display text-[44px] font-500 leading-[0.95] tracking-apple-mass text-balance sm:text-[64px] lg:text-[80px]">
                Hand-picked by the pit crew.
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-balance text-base font-300 tracking-apple-tight text-muted-foreground">
                Tested, tuned, and signed off before they hit the shelf.
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
                  categoryTitle={getCategoryBySlug(p.category_slug)?.title ?? null}
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <TrustBar />

      <section className="relative overflow-hidden bg-[color:var(--brand-graphite)] text-white">
        <div aria-hidden className="particle-field">
          <span /><span /><span /><span /><span /><span /><span /><span />
        </div>
        <div aria-hidden className="light-sweep" />
        <div className="relative mx-auto max-w-[1280px] px-6 py-32 text-center sm:py-40">
          <ScrollReveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[color:var(--brand-forest)]">
              The pit crew
            </p>
            <h2 className="mx-auto mt-5 max-w-[14ch] font-display text-[44px] font-500 leading-[0.95] tracking-apple-mass text-balance sm:text-[64px] lg:text-[88px]">
              Build logs. Restock alerts. Tuning notes.
            </h2>
            <p className="mx-auto mt-7 max-w-xl text-balance text-base font-300 leading-relaxed text-white/75 sm:text-lg">
              Members-only drops and hard-won tuning advice from people who run these
              builds harder than you will.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
              <Link href="/about" className="group inline-flex items-center gap-2 text-[15px] font-medium text-white">
                <span className="border-b border-white/45 pb-1 transition-colors group-hover:border-[color:var(--brand-gold)]">
                  Our story
                </span>
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">›</span>
              </Link>
              <Link href="/contact" className="group inline-flex items-center gap-2 text-[15px] font-medium text-white">
                <span className="border-b border-white/45 pb-1 transition-colors group-hover:border-[color:var(--brand-gold)]">
                  Get in touch
                </span>
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">›</span>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
