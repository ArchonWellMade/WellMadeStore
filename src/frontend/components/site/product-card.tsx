import Link from "next/link";
import Image from "next/image";
import { ViewTransition } from "react";
import { ProductTilt } from "@/frontend/components/site/product-tilt";

export type ProductCardProps = {
  slug: string;
  name: string;
  shortDescription: string | null;
  priceRange: string | null;
  imageUrl?: string | null;
  categoryTitle?: string | null;
  features?: string[] | null;
};

/** Real price, or null for empty / placeholder values like "$XXX.00". */
export function displayPrice(price: string | null | undefined): string | null {
  return price && !/x/i.test(price) ? price : null;
}

/** Studio cut-outs (white background) vs full-bleed lifestyle photos. */
export function isPhoto(url: string | null | undefined): boolean {
  return !!url && (url.includes("images.unsplash.com") || url.includes("/products/lesu/"));
}

/** Light "studio" backdrop that product cut-outs blend into. */
export const STUDIO_BG =
  "bg-[radial-gradient(120%_90%_at_50%_28%,#fdfcf9_0%,#efede7_55%,#dedbd2_100%)]";

export function ProductCard({
  slug,
  name,
  shortDescription,
  priceRange,
  imageUrl,
  categoryTitle,
}: ProductCardProps) {
  const href = `/products/${slug}`;
  const price = displayPrice(priceRange);
  const photo = isPhoto(imageUrl);

  return (
    <ProductTilt className="group h-full [perspective:1000px]">
      <Link
        href={href}
        aria-label={name}
        className="relative flex h-full flex-col overflow-hidden rounded-[26px] border border-white/[0.08] bg-[#131417] text-white transition-[transform,border-color,box-shadow] duration-300 ease-out [transform:rotateX(var(--rx))_rotateY(var(--ry))] [transform-style:preserve-3d] hover:border-[color:var(--brand-gold)]/45 hover:shadow-[0_40px_90px_-35px_rgba(233,168,32,0.5)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--brand-gold)]"
      >
        {/* Stage — morphs into the product page image */}
        <ViewTransition name={`product-${slug}`} share="morph" default="none">
        <div className={`relative aspect-square overflow-hidden ${photo ? "bg-[#1a1b1f]" : STUDIO_BG}`}>
          {imageUrl ? (
            <>
              {!photo ? (
                <span
                  aria-hidden
                  className="absolute bottom-[9%] left-1/2 h-[7%] w-[62%] -translate-x-1/2 rounded-[50%] bg-black/25 blur-md transition-all duration-700 ease-out group-hover:w-[48%] group-hover:bg-black/15"
                />
              ) : null}
              <Image
                src={imageUrl}
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className={
                  photo
                    ? "object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
                    : "object-contain p-[8%] mix-blend-multiply transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-[5%] group-hover:-rotate-[3deg] group-hover:scale-[1.1]"
                }
              />
            </>
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs uppercase tracking-[0.2em] text-black/40">
              {categoryTitle ?? "Product"}
            </div>
          )}

          {/* Mouse-follow spotlight */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(320px_circle_at_var(--mx)_var(--my),rgba(233,168,32,0.22),transparent_60%)]"
          />

          {categoryTitle ? (
            <span className="absolute left-4 top-4 rounded-full bg-[#0a0a0c]/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--brand-gold)] backdrop-blur-md">
              {categoryTitle}
            </span>
          ) : null}

          <span
            aria-hidden
            className="absolute bottom-4 right-4 flex h-11 w-11 translate-y-3 items-center justify-center rounded-full bg-[color:var(--brand-gold)] text-[18px] text-[#0E0E10] opacity-0 shadow-[0_10px_30px_-8px_rgba(233,168,32,0.7)] transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100"
          >
            →
          </span>
        </div>
        </ViewTransition>

        {/* Copy */}
        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-display text-[22px] font-500 leading-tight tracking-apple-tight transition-colors duration-300 group-hover:text-[color:var(--brand-gold)]">
            {name}
          </h3>
          {shortDescription ? (
            <p className="mt-2 line-clamp-2 text-[13.5px] leading-relaxed text-white/55">{shortDescription}</p>
          ) : null}
          <div className="mt-auto flex items-center justify-between gap-3 pt-5">
            <span className="text-[14px] font-semibold text-white">
              {price ? `From ${price}` : <span className="text-white/60">Ask for price</span>}
            </span>
            <span className="relative text-[12px] font-semibold uppercase tracking-[0.18em] text-white/50 transition-colors group-hover:text-white">
              View
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-[color:var(--brand-gold)] transition-all duration-500 group-hover:w-full" />
            </span>
          </div>
        </div>
      </Link>
    </ProductTilt>
  );
}
