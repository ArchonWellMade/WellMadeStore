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

  const cars = getCategoryBySlug("premium-metal-rc-cars")!;
  const drones = getCategoryBySlug("foldable-camera-drones")!;
  const boats = getCategoryBySlug("sleek-speed-boats")!;
  const robots = getCategoryBySlug("smart-gesture-robots")!;
  const motos = getCategoryBySlug("minimalist-rc-motorcycles")!;
  const planes = getCategoryBySlug("modern-gliders-planes")!;

  return (
    <>
      <Hero />

      <Marquee
        tone="ignition"
        items={[
          "Premium Metal RC Cars",
          "Foldable Camera Drones",
          "Sleek Speed Boats",
          "Smart Gesture Robots",
          "Minimalist RC Motorcycles",
          "Modern Gliders & Planes",
        ]}
      />

      <StatStrip />

      <FeatureSection
        eyebrow="Premium Metal RC Cars"
        title="Solid metal. Smooth lines."
        subtitle="Authentic licensed replicas — Tesla, Porsche, Audi, classic sports cars — crafted with solid metal bodies and refined finishes. Designed for both display and play."
        imageUrl="https://images.unsplash.com/photo-1675301586777-2c56ee8aa5ef?w=2400&q=85&auto=format&fit=crop"
        imageAlt="Premium die-cast RC car on dirt road"
        primaryCta={{ label: "Shop metal cars", href: `/products?category=${cars.slug}` }}
        secondaryCta={{ label: "See licensed models", href: "/products" }}
        theme="light"
        layout="stack"
        scaleTag={{ scale: "1:64 / 1:43 SCALE", label: "Die-cast metal · Gyro RC" }}
      />

      <FeatureSection
        eyebrow="Foldable Camera Drones"
        title="Folds away. Flies anywhere."
        subtitle="Compact innovation. Pocket-friendly frames in neutral colorways, one-key takeoff, stable hover, integrated HD optics. Built to capture, built to last."
        imageUrl="https://images.unsplash.com/photo-1556537902-16b47f40c55c?w=2400&q=85&auto=format&fit=crop"
        imageAlt="Foldable hobby drone"
        primaryCta={{ label: "Shop drones", href: `/products?category=${drones.slug}` }}
        secondaryCta={{ label: "Compare models", href: "/products" }}
        theme="dark"
        layout="stack"
        scaleTag={{ scale: "FOLDABLE", label: "HD optics · One-key launch" }}
      />

      <FeatureSection
        eyebrow="Smart Gesture Robots"
        title="Wave. It listens."
        subtitle="Intuitive technology, simply made. Soft round shapes, smooth finishes, and gestures that just work. Smart enough to surprise you, simple enough to live with."
        imageUrl="https://images.unsplash.com/photo-1535378620166-273708d44e4c?w=2000&q=85&auto=format&fit=crop"
        imageAlt="Minimalist white smart robot"
        primaryCta={{ label: "Shop robots", href: `/products?category=${robots.slug}` }}
        secondaryCta={{ label: "How they work", href: "/about" }}
        theme="light"
        layout="split"
        scaleTag={{ scale: "GESTURE CONTROL", label: "Voice + Vision · Obstacle aware" }}
      />

      <FeatureSection
        eyebrow="Minimalist RC Motorcycles"
        title="Authentic. In miniature."
        subtitle="Real bike geometry, reimagined at scale. Self-balancing technology, realistic proportions, solid construction. The look of a real bike, in the hand."
        imageUrl="https://images.unsplash.com/photo-1609160089140-8da843632872?w=2400&q=85&auto=format&fit=crop"
        imageAlt="Scale-model motorcycle on white surface"
        primaryCta={{ label: "Shop motorcycles", href: `/products?category=${motos.slug}` }}
        secondaryCta={{ label: "See the lean test", href: "/about" }}
        theme="dark"
        layout="stack"
        scaleTag={{ scale: "1:5 SCALE", label: "Self-balancing · Authentic" }}
      />

      <FeatureSection
        eyebrow="Modern Gliders & Planes"
        title="Light. Long. Lasting."
        subtitle="Designed by the principles of flight. Sleek delta wings, durable EPP foam, easy launch, stable cruise. Form follows function — and lasts."
        imageUrl="https://images.unsplash.com/photo-1606370744289-16795bbded58?w=2000&q=85&auto=format&fit=crop"
        imageAlt="Modern scale-model airplane on grass"
        primaryCta={{ label: "Shop planes", href: `/products?category=${planes.slug}` }}
        secondaryCta={{ label: "Browse boats", href: `/products?category=${boats.slug}` }}
        theme="light"
        layout="split"
        scaleTag={{ scale: "DELTA WING", label: "EPP Foam · Wind-resistant" }}
      />

      <Marquee
        tone="graphite"
        items={[
          "Solid Metal",
          "Hand-finished",
          "Premium Materials",
          "Designed to Last",
          "RCM Certified · AU",
          "Minimal · Intentional",
          "Quality over Noise",
          "Built to Endure",
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
                Made well. Quietly.
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-balance text-base font-300 tracking-apple-tight text-muted-foreground">
                Hand-picked, built to endure, finished with care. The pieces we think
                deserve a spot on your shelf.
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
              The Well Made promise
            </p>
            <h2 className="mx-auto mt-5 max-w-[14ch] font-display text-[44px] font-500 leading-[0.95] tracking-apple-mass text-balance sm:text-[64px] lg:text-[88px]">
              Quality you can feel.
            </h2>
            <p className="mx-auto mt-7 max-w-xl text-balance text-base font-300 leading-relaxed text-white/75 sm:text-lg">
              Solid materials. Considered design. RCM certified for Australia.
              30-day no-questions returns. Built so they last past the season.
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
