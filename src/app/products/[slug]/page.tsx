import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { ShieldCheck, RotateCcw, BadgeCheck } from "lucide-react";
import { ScrollReveal } from "@/frontend/components/site/scroll-reveal";
import { ProductCard, STUDIO_BG, displayPrice, isPhoto } from "@/frontend/components/site/product-card";
import { ProductStage } from "@/frontend/components/site/product-stage";
import { ProductKeyNav } from "@/frontend/components/site/product-key-nav";
import { ProductRail } from "@/frontend/components/site/product-rail";
import { getCategoryBySlug } from "@/shared/data/categories";
import { getProductBySlug, getProductsByCategory, type Product } from "@/shared/data/products";

type Params = { slug: string };

const PHONE_HREF = "tel:+61415381093";

const TRUST = [
  { icon: BadgeCheck, label: "RCM certified" },
  { icon: RotateCcw, label: "30-day returns" },
  { icon: ShieldCheck, label: "12-month warranty" },
];

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

function StepLink({ product, dir }: { product?: Product; dir: "prev" | "next" }) {
  if (!product) return <div className="hidden flex-1 sm:block" />;
  const next = dir === "next";
  return (
    <Link
      href={`/products/${product.slug}`}
      transitionTypes={[next ? "nav-forward" : "nav-back"]}
      className={`group flex flex-1 items-center gap-4 rounded-[22px] border border-white/[0.08] bg-white/[0.02] py-3 pl-5 pr-3 transition-all duration-300 hover:border-[color:var(--brand-gold)]/50 hover:bg-white/[0.04] ${
        next ? "flex-row-reverse text-right" : ""
      }`}
    >
      <span
        aria-hidden
        className={`text-[20px] text-white/40 transition-all duration-300 group-hover:text-[color:var(--brand-gold)] ${
          next ? "group-hover:translate-x-1" : "group-hover:-translate-x-1"
        }`}
      >
        {next ? "→" : "←"}
      </span>
      <span className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl ${isPhoto(product.image_url) ? "bg-[#1a1b1f]" : STUDIO_BG}`}>
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt=""
            fill
            sizes="64px"
            className={`transition-transform duration-500 group-hover:scale-110 ${
              isPhoto(product.image_url) ? "object-cover" : "object-contain p-1.5 mix-blend-multiply"
            }`}
          />
        ) : null}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[10px] font-semibold uppercase tracking-[0.24em] text-white/45">
          {next ? "Next" : "Previous"}
        </span>
        <span className="mt-1 block truncate font-display text-[18px] font-500 text-white transition-colors group-hover:text-[color:var(--brand-gold)]">
          {product.name}
        </span>
      </span>
    </Link>
  );
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const [category, siblings] = await Promise.all([
    getCategoryBySlug(product.category_slug),
    getProductsByCategory(product.category_slug),
  ]);
  const idx = siblings.findIndex((p) => p.slug === product.slug);
  const prev = idx > 0 ? siblings[idx - 1] : undefined;
  const next = idx >= 0 && idx < siblings.length - 1 ? siblings[idx + 1] : undefined;
  // prev/next already have their own links; keeping them out avoids duplicate morph targets
  const related = siblings
    .filter((p) => p.slug !== product.slug && p.slug !== prev?.slug && p.slug !== next?.slug)
    .slice(0, 10);
  const price = displayPrice(product.price_range);
  const categoryHref = category ? `/products?category=${category.slug}` : "/products";
  const rise = (ms: number) => ({ animationDelay: `${ms}ms` });

  return (
    <div className="bg-[#0a0a0c] text-white">
      <ProductKeyNav
        prevHref={prev ? `/products/${prev.slug}` : undefined}
        nextHref={next ? `/products/${next.slug}` : undefined}
      />

      <ViewTransition
        key={product.slug}
        enter={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
        exit={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
        default="none"
      >
      <section className="relative isolate overflow-hidden">
        <div aria-hidden className="absolute -left-40 top-24 -z-10 h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle,rgba(233,168,32,0.13),transparent_65%)] blur-2xl" />
        <div aria-hidden className="absolute -right-40 bottom-0 -z-10 h-[520px] w-[620px] rounded-full bg-[radial-gradient(circle,rgba(42,122,99,0.16),transparent_65%)] blur-2xl" />

        <div className="mx-auto max-w-[1280px] px-4 pt-28 sm:px-6 lg:pt-40">
          {/* Breadcrumb + position */}
          <div className="product-rise flex flex-wrap items-center justify-between gap-4 text-[13px]">
            <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-2 text-white/45">
              <Link href="/products" className="transition-colors hover:text-white">Shop</Link>
              <span aria-hidden>/</span>
              <Link href={categoryHref} className="truncate transition-colors hover:text-white">
                {category?.title ?? "Products"}
              </Link>
              <span aria-hidden>/</span>
              <span className="truncate text-white/80">{product.name}</span>
            </nav>
            {idx >= 0 && siblings.length > 1 ? (
              <span className="font-display text-[15px] tabular-nums text-white/50">
                <span className="text-[color:var(--brand-gold)]">{String(idx + 1).padStart(2, "0")}</span>
                {" / "}
                {String(siblings.length).padStart(2, "0")}
              </span>
            ) : null}
          </div>

          <div className="grid gap-10 py-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:py-14">
            {product.image_url ? (
              <ProductStage
                name={`product-${product.slug}`}
                src={product.image_url}
                alt={product.name}
                photo={isPhoto(product.image_url)}
                studioClass={STUDIO_BG}
              />
            ) : (
              <div className={`aspect-square rounded-[32px] ${STUDIO_BG}`} />
            )}

            <div className="flex flex-col lg:py-6">
              {category ? (
                <p className="product-rise inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-[color:var(--brand-gold)]" style={rise(120)}>
                  <span className="h-px w-8 bg-current opacity-70" />
                  {category.title}
                </p>
              ) : null}
              <h1 className="product-rise mt-5 font-display text-[44px] font-500 leading-[1] tracking-apple-mass text-balance sm:text-[60px]" style={rise(200)}>
                {product.name}
              </h1>
              {product.short_description ? (
                <p className="product-rise mt-5 max-w-[34rem] text-[16px] font-300 leading-relaxed text-white/65 sm:text-[17px]" style={rise(280)}>
                  {product.short_description}
                </p>
              ) : null}

              <div className="product-rise mt-8 flex items-baseline gap-3 border-t border-white/[0.08] pt-8" style={rise(360)}>
                {price ? (
                  <>
                    <span className="text-[12px] uppercase tracking-[0.2em] text-white/45">From</span>
                    <span className="font-display text-[40px] font-500 leading-none text-[color:var(--brand-gold)]">{price}</span>
                  </>
                ) : (
                  <span className="font-display text-[28px] font-500 leading-none">
                    Price on request
                    <span className="mt-2 block font-sans text-[14px] font-300 text-white/50">
                      Call or message us for today&apos;s price and stock.
                    </span>
                  </span>
                )}
              </div>

              <div className="product-rise mt-8 flex flex-col gap-3 sm:flex-row" style={rise(440)}>
                <Link
                  href="/contact"
                  className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-[color:var(--brand-gold)] px-8 py-4 text-[15px] font-semibold text-[#0E0E10] shadow-[0_10px_40px_-8px_rgba(233,168,32,0.55)] transition-colors hover:bg-[color:var(--brand-gold-light)]"
                >
                  Enquire to buy <span aria-hidden>→</span>
                </Link>
                <a
                  href={PHONE_HREF}
                  className="inline-flex h-13 items-center justify-center rounded-full border border-white/20 bg-white/[0.04] px-8 py-4 text-[15px] font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/[0.08]"
                >
                  Call +61 415 381 093
                </a>
              </div>

              {product.features.length > 0 ? (
                <ul className="mt-10 grid gap-2.5 sm:grid-cols-2">
                  {product.features.map((feature, i) => (
                    <li
                      key={feature}
                      className="product-rise flex items-start gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.02] px-4 py-3 text-[14px] leading-snug text-white/80"
                      style={rise(520 + i * 70)}
                    >
                      <span aria-hidden className="mt-0.5 text-[color:var(--brand-gold)]">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              ) : null}

              <div className="product-rise mt-auto flex flex-wrap gap-x-6 gap-y-3 pt-10 text-[13px] text-white/55" style={rise(600)}>
                {TRUST.map(({ icon: Icon, label }) => (
                  <span key={label} className="inline-flex items-center gap-2">
                    <Icon className="h-4 w-4 text-[color:var(--brand-gold)]" strokeWidth={2} />
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* One by one: previous / next */}
          {prev || next ? (
            <div className="product-rise border-t border-white/[0.06] py-8" style={rise(500)}>
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                <StepLink product={prev} dir="prev" />
                <StepLink product={next} dir="next" />
              </div>
              <p className="mt-4 hidden text-center text-[12px] text-white/35 lg:block">
                Tip: use the <kbd className="rounded border border-white/15 px-1.5 py-0.5 font-sans">←</kbd>{" "}
                <kbd className="rounded border border-white/15 px-1.5 py-0.5 font-sans">→</kbd> keys to flick through products.
              </p>
            </div>
          ) : null}
        </div>
      </section>
      </ViewTransition>

      {related.length > 0 ? (
        <section className="overflow-clip border-t border-white/[0.06]">
          <div className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 sm:py-24">
            <ScrollReveal className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <h2 className="font-display text-[36px] font-500 leading-[1] tracking-apple-mass sm:text-[48px]">
                More {category?.title ?? "from this collection"}
              </h2>
              <Link href={categoryHref} className="inline-flex items-center gap-2 text-[14px] font-semibold text-white/70 hover:text-white">
                See all <span aria-hidden>→</span>
              </Link>
            </ScrollReveal>
            <div className="mt-6">
              <ProductRail>
                {related.map((p) => (
                  <ProductCard
                    key={p.slug}
                    slug={p.slug}
                    name={p.name}
                    shortDescription={p.short_description}
                    priceRange={p.price_range}
                    imageUrl={p.image_url}
                  />
                ))}
              </ProductRail>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
