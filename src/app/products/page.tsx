import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/frontend/components/site/product-card";
import { ScrollReveal } from "@/frontend/components/site/scroll-reveal";
import { getCategories } from "@/shared/data/categories";
import { getAllProducts } from "@/shared/data/products";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "The full RC Adventure shop — RC cars, helicopters, aeroplanes, power boats, engineering vehicles, robots, handheld gimbals, and tech essentials (power banks, cables). RCM certified for Australia.",
};

type SearchParams = { category?: string };

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { category } = await searchParams;
  const [categories, all] = await Promise.all([getCategories(), getAllProducts()]);
  const activeCategory = category ? categories.find((c) => c.slug === category) : undefined;
  const list = activeCategory ? all.filter((p) => p.category_slug === activeCategory.slug) : all;
  const categoryTitleBySlug = new Map(categories.map((c) => [c.slug, c.title]));
  const countBySlug = new Map<string, number>();
  for (const p of all) countBySlug.set(p.category_slug, (countBySlug.get(p.category_slug) ?? 0) + 1);

  const pill = (active: boolean) =>
    `group/pill inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-semibold transition-all duration-300 ${
      active
        ? "border-[color:var(--brand-gold)] bg-[color:var(--brand-gold)] text-[#0E0E10] shadow-[0_8px_24px_-8px_rgba(233,168,32,0.6)]"
        : "border-white/12 text-white/65 hover:border-white/40 hover:text-white"
    }`;
  const count = (active: boolean) =>
    `rounded-full px-1.5 text-[11px] tabular-nums ${active ? "bg-black/15" : "bg-white/[0.08] text-white/50"}`;

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white">
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden">
        <div aria-hidden className="absolute -left-40 top-10 -z-10 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(233,168,32,0.16),transparent_65%)] blur-2xl" />
        <div aria-hidden className="absolute -right-32 top-40 -z-10 h-[460px] w-[620px] rounded-full bg-[radial-gradient(circle,rgba(42,122,99,0.18),transparent_65%)] blur-2xl" />
        <div className="mx-auto max-w-[1280px] px-4 pb-14 pt-36 sm:px-6 lg:pb-16 lg:pt-48">
          <div key={activeCategory?.slug ?? "all"} className="max-w-3xl">
            <p className="product-rise inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-[color:var(--brand-gold)]">
              <span className="h-px w-8 bg-current opacity-70" />
              {activeCategory ? "The shop" : "The shop · Own it"}
            </p>
            <h1
              className="product-rise mt-6 font-display text-[48px] font-500 leading-[0.98] tracking-apple-mass text-balance sm:text-[72px] lg:text-[92px]"
              style={{ animationDelay: "80ms" }}
            >
              {activeCategory ? (
                activeCategory.title
              ) : (
                <>
                  Machines to <em className="font-400 italic text-[color:var(--brand-gold)]">own.</em>
                </>
              )}
            </h1>
            <p
              className="product-rise mt-6 max-w-2xl text-[16px] font-300 leading-relaxed text-white/60 sm:text-[17px]"
              style={{ animationDelay: "160ms" }}
            >
              {activeCategory?.longDescription ||
                "RC cars, helicopters, aeroplanes, power boats, engineering vehicles and robots — plus handheld gimbals and tech essentials. RCM certified for Australia."}
            </p>
          </div>
        </div>
      </section>

      {/* ── Sticky category bar ───────────────────────────── */}
      <nav
        aria-label="Categories"
        className="sticky top-20 z-30 border-y border-white/[0.06] bg-[#0a0a0c]/80 backdrop-blur-xl lg:top-28"
      >
        <div className="mx-auto flex max-w-[1280px] items-center gap-2 overflow-x-auto px-4 py-3.5 sm:px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <Link href="/products" scroll={false} className={pill(!activeCategory)}>
            All <span className={count(!activeCategory)}>{all.length}</span>
          </Link>
          {categories.map((c) => {
            const isActive = activeCategory?.slug === c.slug;
            return (
              <Link key={c.slug} href={`/products?category=${c.slug}`} scroll={false} className={pill(isActive)}>
                {c.title} <span className={count(isActive)}>{countBySlug.get(c.slug) ?? 0}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* ── Grid ──────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1280px] px-4 pb-28 pt-12 sm:px-6 sm:pt-14">
        {list.length > 0 ? (
          <div key={activeCategory?.slug ?? "all"} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {list.map((p, i) => (
              <ScrollReveal key={p.slug} delayMs={(i % 4) * 90} offsetY={36} className="h-full">
                <ProductCard
                  slug={p.slug}
                  name={p.name}
                  shortDescription={p.short_description}
                  priceRange={p.price_range}
                  imageUrl={p.image_url}
                  categoryTitle={activeCategory ? null : categoryTitleBySlug.get(p.category_slug) ?? null}
                />
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <p className="py-24 text-center text-white/50">Nothing in stock here yet — check back soon.</p>
        )}
      </section>
    </div>
  );
}
