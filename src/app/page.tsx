import Link from "next/link";
import { Hero } from "@/frontend/components/site/hero";
import { FeatureSection } from "@/frontend/components/site/feature-section";
import { ProductCard } from "@/frontend/components/site/product-card";
import { TrustBar } from "@/frontend/components/site/trust-bar";
import { StatStrip } from "@/frontend/components/site/stat-strip";
import { Marquee } from "@/frontend/components/site/marquee";
import { ScrollReveal } from "@/frontend/components/site/scroll-reveal";
import { getCategories, getCategoryBySlug } from "@/shared/data/categories";
import { getProductsByCategory } from "@/shared/data/products";

export default async function Home() {
  const [toysProducts, toys, categories] = await Promise.all([
    getProductsByCategory("toys"),
    getCategoryBySlug("toys"),
    getCategories(),
  ]);
  const featured = toysProducts.slice(0, 4);

  if (!toys) return null;
  const categoryTitleBySlug = new Map(categories.map((c) => [c.slug, c.title]));

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
        eyebrow="WL-284019-A · Rally Car"
        title="Solid build. Smooth lines."
        subtitle="1:28 scale electric four-wheel-drive rally car with realistic simulated driving, independent suspension, and all-terrain rubber tires. Built for both display and play."
        imageUrl="https://omo-oss-image1.thefastimg.com/portal-saas/pg2025030619402182217/cms/image/52b0e20e-a650-46e5-95fa-77e41a4ddbd9.jpg?vf=B7gH3s"
        imageAlt="WL-284019-A 1:28 scale RC rally car"
        primaryCta={{ label: "Shop RC cars", href: `/products?category=${toys.slug}` }}
        secondaryCta={{ label: "See all models", href: "/products" }}
        theme="light"
        layout="stack"
        scaleTag={{ scale: "1:28 SCALE", label: "4WD · Top speed 30 km/h" }}
      />

      <FeatureSection
        eyebrow="K270 · Black Hawk UH-60L"
        title="Takes off. Holds steady."
        subtitle="Scale quadcopter helicopter with optical flow positioning and 6-axis gyroscope altitude hold. Brushless motor, stable hover, built to capture every flight."
        imageUrl="https://omo-oss-image1.thefastimg.com/portal-saas/pg2025030619402182217/cms/image/358631b7-d97c-45d2-8fc4-c89ef00c419f.jpg?vf=B7gH3s"
        imageAlt="K270 Black Hawk UH-60L scale RC helicopter"
        primaryCta={{ label: "Shop helicopters", href: `/products?category=${toys.slug}` }}
        secondaryCta={{ label: "Compare models", href: "/products" }}
        theme="dark"
        layout="stack"
        scaleTag={{ scale: "OPTICAL FLOW", label: "Altitude hold · ~7 min flight" }}
      />

      <FeatureSection
        eyebrow="WL-F13 · AI Robot"
        title="Talk. It listens."
        subtitle="Intuitive technology, simply made. AI-powered voice chat, touch-based interruption, and dance moves that just work. Smart enough to surprise you, simple enough to live with."
        imageUrl="https://omo-oss-image1.thefastimg.com/portal-saas/pg2025030619402182217/cms/image/af8f52d2-ceee-405c-a562-ac6e9525f0a8.jpg?vf=B7gH3s"
        imageAlt="WL-F13 AI intelligent robot"
        primaryCta={{ label: "Shop robots", href: `/products?category=${toys.slug}` }}
        secondaryCta={{ label: "How it works", href: "/about" }}
        theme="light"
        layout="split"
        scaleTag={{ scale: "AI VOICE CHAT", label: "Touch interrupt · Dance moves" }}
      />

      <FeatureSection
        eyebrow="WL918 · High-Speed Boat"
        title="Fast. Steady. Built to last."
        subtitle="Cruising speed of approximately 35 km/h with one-button capsize recovery and a low-voltage alarm. Real hull geometry, solid construction, cool night-time LED lighting."
        imageUrl="https://omo-oss-image1.thefastimg.com/portal-saas/pg2025030619402182217/cms/image/8e23e381-5d2c-478a-b4de-4364b7f2b834.jpg?vf=B7gH3s"
        imageAlt="WL918 high-speed RC boat"
        primaryCta={{ label: "Shop boats", href: `/products?category=${toys.slug}` }}
        secondaryCta={{ label: "See the specs", href: "/about" }}
        theme="dark"
        layout="stack"
        scaleTag={{ scale: "35 KM/H", label: "Auto-righting · 200m range" }}
      />

      <FeatureSection
        eyebrow="A310 · Biplane"
        title="Light. Long. Lasting."
        subtitle="EPP foam 3D/6G replica of the WWII Beech D17S biplane. Brushless motor, 6-axis gyroscope, easy launch, stable glide. Form follows function — and lasts."
        imageUrl="https://omo-oss-image1.thefastimg.com/portal-saas/pg2025030619402182217/cms/image/3f547d14-c9bb-49e3-ad58-a7b80061a8da.jpg?vf=B7gH3s"
        imageAlt="A310 EPP foam RC biplane"
        primaryCta={{ label: "Shop planes", href: `/products?category=${toys.slug}` }}
        secondaryCta={{ label: "Browse everything", href: "/products" }}
        theme="light"
        layout="split"
        scaleTag={{ scale: "3D / 6G MODE", label: "EPP foam · Wind-resistant" }}
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
                  categoryTitle={categoryTitleBySlug.get(p.category_slug) ?? null}
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
