import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/frontend/components/site/product-card";
import { ScrollReveal } from "@/frontend/components/site/scroll-reveal";
import { categories, getCategoryBySlug } from "@/shared/data/categories";
import { products, getProductsByCategory } from "@/shared/data/products";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "The full Well Made collection — premium metal RC cars, foldable camera drones, sleek speed boats, smart gesture robots, minimalist motorcycles, modern gliders & planes.",
};

type SearchParams = { category?: string };

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { category } = await searchParams;
  const activeCategory = category ? getCategoryBySlug(category) : undefined;
  const list = activeCategory
    ? getProductsByCategory(activeCategory.slug)
    : products.filter((p) => p.is_active);

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-6 sm:py-24 lg:py-28">
        <ScrollReveal className="text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[color:var(--brand-forest)]">
            {activeCategory ? activeCategory.title : "Shop"}
          </p>
          <h1 className="mt-4 font-display text-[40px] font-500 leading-[1.05] tracking-apple-mass text-balance sm:text-[56px] lg:text-[72px]">
            {activeCategory ? activeCategory.title : "The full collection."}
          </h1>
          {activeCategory?.longDescription ? (
            <p className="mx-auto mt-6 max-w-2xl text-balance text-[15px] font-300 leading-relaxed tracking-apple-tight text-muted-foreground sm:text-base">
              {activeCategory.longDescription}
            </p>
          ) : (
            <p className="mx-auto mt-6 max-w-2xl text-balance text-[15px] font-300 leading-relaxed tracking-apple-tight text-muted-foreground sm:text-base">
              Premium metal cars, foldable drones, speed boats, gesture robots,
              minimalist bikes, and modern gliders. RCM certified for Australia.
            </p>
          )}
        </ScrollReveal>

        {/* Category pills — horizontal scroll on mobile, wrapped on desktop */}
        <nav
          aria-label="Categories"
          className="mt-10 -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:items-center sm:justify-center sm:overflow-visible sm:px-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <Link
            href="/products"
            className={`shrink-0 rounded-full border px-4 py-2 text-[13px] font-medium transition-colors ${
              activeCategory
                ? "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                : "border-foreground bg-foreground text-background"
            }`}
          >
            All
          </Link>
          {categories.map((c) => {
            const isActive = activeCategory?.slug === c.slug;
            return (
              <Link
                key={c.slug}
                href={`/products?category=${c.slug}`}
                className={`shrink-0 rounded-full border px-4 py-2 text-[13px] font-medium transition-colors ${
                  isActive
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                }`}
              >
                {c.title}
              </Link>
            );
          })}
        </nav>

        {list.length > 0 ? (
          <div className="mt-14 grid gap-y-12 sm:mt-16 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-16 lg:grid-cols-4 lg:gap-x-10">
            {list.map((p) => (
              <ProductCard
                key={p.slug}
                slug={p.slug}
                name={p.name}
                shortDescription={p.short_description}
                priceRange={p.price_range}
                features={p.features}
                imageUrl={p.image_url}
                categoryTitle={getCategoryBySlug(p.category_slug)?.title ?? null}
              />
            ))}
          </div>
        ) : (
          <p className="mt-20 text-center text-muted-foreground">
            Nothing in stock here yet — check back soon.
          </p>
        )}
      </div>
    </section>
  );
}
