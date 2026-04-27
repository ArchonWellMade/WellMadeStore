import Link from "next/link";
import Image from "next/image";

export type ProductCardProps = {
  slug: string;
  name: string;
  shortDescription: string | null;
  priceRange: string | null;
  imageUrl?: string | null;
  categoryTitle?: string | null;
};

export function ProductCard({
  slug,
  name,
  shortDescription,
  priceRange,
  imageUrl,
  categoryTitle,
}: ProductCardProps) {
  const href = `/products/${slug}`;
  return (
    <article className="group relative flex flex-col">
      <Link href={href} aria-label={name} className="flex flex-col">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[24px] bg-[color:var(--brand-cool-gray)]">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt=""
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {categoryTitle ?? "Product"}
            </div>
          )}
        </div>
        <div className="mt-6 text-center">
          {categoryTitle ? (
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[color:var(--brand-forest)]">
              {categoryTitle}
            </p>
          ) : null}
          <h3 className="mt-3 font-display text-[26px] font-500 leading-tight tracking-apple-tight text-foreground">
            {name}
          </h3>
          {shortDescription ? (
            <p className="mx-auto mt-2 max-w-[28ch] text-[14px] leading-relaxed text-muted-foreground">
              {shortDescription}
            </p>
          ) : null}
          <p className="mt-3 text-[13px] font-medium tracking-apple-tight text-foreground/70">
            {priceRange ? `From ${priceRange}` : "Contact for pricing"}
          </p>
        </div>
      </Link>
      <div className="mt-5 flex items-center justify-center gap-8">
        <Link href={href} className="group/cta inline-flex items-center gap-1 text-[14px] font-medium text-foreground">
          <span className="border-b border-foreground/30 pb-0.5 transition-colors group-hover/cta:border-[color:var(--brand-gold)]">
            Learn more
          </span>
          <span aria-hidden className="transition-transform duration-300 group-hover/cta:translate-x-1">›</span>
        </Link>
        <Link href={href} className="group/cta inline-flex items-center gap-1 text-[14px] font-medium text-[color:var(--brand-forest)]">
          <span className="border-b border-[color:var(--brand-gold)]/40 pb-0.5 transition-colors group-hover/cta:border-[color:var(--brand-gold)]">
            Buy
          </span>
          <span aria-hidden className="transition-transform duration-300 group-hover/cta:translate-x-1">›</span>
        </Link>
      </div>
    </article>
  );
}
