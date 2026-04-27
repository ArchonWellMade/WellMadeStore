import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/frontend/components/site/product-card";
import { ScrollReveal } from "@/frontend/components/site/scroll-reveal";
import { categories, getCategoryBySlug } from "@/shared/data/categories";
import { products, getProductsByCategory } from "@/shared/data/products";

export const metadata: Metadata = {
  title: "Shop",
  description: "Browse the full WellMadeStore lineup of RC vehicles, drones, and parts.",
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
      <div className="mx-auto max-w-[1200px] px-6 py-20 sm:py-28">
        <ScrollReveal className="text-center">
          <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[color:var(--brand-forest)]">
            {activeCategory ? activeCategory.title : "All products"}
          </p>
          <h1 className="mt-4 font-display text-4xl font-500 tracking-apple-display sm:text-6xl">
            {activeCategory ? activeCategory.title : "The full lineup."}
          </h1>
          {activeCategory ? (
            <p className="mx-auto mt-5 max-w-2xl text-balance text-base font-300 tracking-apple-tight text-muted-foreground">
              {activeCategory.description}
            </p>
          ) : (
            <p className="mx-auto mt-5 max-w-2xl text-balance text-base font-300 tracking-apple-tight text-muted-foreground">
              Cars, drones, motorcycles, planes, boats, helicopters, novelty flyers, and
              the parts that keep them moving.
            </p>
          )}
        </ScrollReveal>

        <nav
          aria-label="Categories"
          className="mt-12 flex flex-wrap items-center justify-center gap-2"
        >
          <Link
            href="/products"
            className={`rounded-full border px-4 py-2 text-[13px] font-medium transition-colors ${
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
                className={`rounded-full border px-4 py-2 text-[13px] font-medium transition-colors ${
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
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {list.map((p) => (
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
        ) : (
          <p className="mt-20 text-center text-muted-foreground">
            Nothing in stock here yet — check back soon.
          </p>
        )}
      </div>
    </section>
  );
}
