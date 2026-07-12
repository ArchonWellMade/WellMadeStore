import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ScrollReveal } from "@/frontend/components/site/scroll-reveal";
import { ProductCard } from "@/frontend/components/site/product-card";
import { getCategoryBySlug } from "@/shared/data/categories";
import { getAllProducts, getProductBySlug, getProductsByCategory } from "@/shared/data/products";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const products = await getAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description: product.short_description,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const [category, relatedRaw] = await Promise.all([
    getCategoryBySlug(product.category_slug),
    getProductsByCategory(product.category_slug),
  ]);
  const related = relatedRaw.filter((p) => p.slug !== product.slug).slice(0, 4);

  return (
    <>
      <section className="bg-background">
        <div className="mx-auto max-w-[1200px] px-5 pt-10 sm:px-6 sm:pt-14">
          <Link
            href={category ? `/products?category=${category.slug}` : "/products"}
            className="inline-flex items-center gap-1 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <span aria-hidden>‹</span>
            {category ? `Back to ${category.title}` : "Back to Shop"}
          </Link>
        </div>

        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-12 px-5 py-10 sm:px-6 sm:py-14 lg:grid-cols-2 lg:gap-16 lg:py-20">
          <ScrollReveal className="relative aspect-[4/5] w-full overflow-hidden rounded-[28px] bg-[color:var(--brand-cool-gray)]">
            {product.image_url ? (
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            ) : null}
          </ScrollReveal>

          <ScrollReveal delayMs={120}>
            {category ? (
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[color:var(--brand-forest)]">
                {category.title}
              </p>
            ) : null}
            <h1 className="mt-4 font-display text-[40px] font-500 leading-[1.05] tracking-apple-mass text-balance sm:text-[52px]">
              {product.name}
            </h1>
            <p className="mt-4 text-[15px] font-300 leading-relaxed tracking-apple-tight text-muted-foreground sm:text-base">
              {product.short_description}
            </p>
            <p className="mt-6 text-lg font-medium tracking-apple-tight text-foreground">
              From {product.price_range}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 text-[15px] font-medium text-foreground"
              >
                <span className="border-b border-foreground/30 pb-1 transition-colors group-hover:border-[color:var(--brand-gold)]">
                  Enquire to buy
                </span>
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">›</span>
              </Link>
              <Link
                href="/products"
                className="group inline-flex items-center gap-2 text-[15px] font-medium text-foreground"
              >
                <span className="border-b border-foreground/30 pb-1 transition-colors group-hover:border-[color:var(--brand-gold)]">
                  Browse everything
                </span>
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">›</span>
              </Link>
            </div>

            {product.features.length > 0 ? (
              <ul className="mt-10 space-y-3 border-t border-border/60 pt-8">
                {product.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-[14px] leading-relaxed text-foreground/85"
                  >
                    <span
                      aria-hidden
                      className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--brand-gold)]"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            ) : null}
          </ScrollReveal>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="bg-background">
          <div className="mx-auto max-w-[1200px] px-5 pb-20 sm:px-6 sm:pb-28">
            <ScrollReveal>
              <h2 className="font-display text-[28px] font-500 tracking-apple-tight sm:text-[34px]">
                More from {category?.title ?? "this collection"}
              </h2>
            </ScrollReveal>
            <div className="mt-10 grid gap-y-12 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-14 lg:grid-cols-4 lg:gap-x-10">
              {related.map((p) => (
                <ProductCard
                  key={p.slug}
                  slug={p.slug}
                  name={p.name}
                  shortDescription={p.short_description}
                  priceRange={p.price_range}
                  imageUrl={p.image_url}
                  categoryTitle={category?.title ?? null}
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
