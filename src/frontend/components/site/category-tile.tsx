import Link from "next/link";

export function CategoryTile({
  title,
  description,
  href,
  imageUrl,
}: {
  title: string;
  description: string | null;
  href: string;
  imageUrl: string | null;
}) {
  return (
    <Link
      href={href}
      className="group relative flex aspect-[4/5] flex-col items-center overflow-hidden rounded-[20px] bg-[color:var(--brand-cool-gray)] pt-12 text-center shadow-[0_1px_3px_rgba(0,0,0,0.08)] transition-editorial hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.18)] sm:aspect-[3/4] sm:pt-14 lg:pt-16"
    >
      {imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageUrl}
          alt=""
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/55" />
      <div className="relative px-6 text-white drop-shadow-md">
        <h3 className="font-display text-balance text-3xl font-500 tracking-apple-display sm:text-4xl lg:text-5xl">
          {title}
        </h3>
        {description ? (
          <p className="mt-3 text-balance text-[15px] font-300 tracking-apple-tight text-white/90">
            {description}
          </p>
        ) : null}
        <div className="mt-6 flex items-center justify-center gap-6">
          <span className="inline-flex items-center gap-1 text-[14px] font-medium underline decoration-white/50 decoration-2 underline-offset-[6px] transition-colors hover:decoration-white">
            Explore
            <span aria-hidden className="transition-transform group-hover:translate-x-1">
              ›
            </span>
          </span>
          <span className="inline-flex items-center gap-1 text-[14px] font-medium underline decoration-white/50 decoration-2 underline-offset-[6px] transition-colors hover:decoration-[color:var(--brand-gold)]">
            Shop
            <span aria-hidden className="transition-transform group-hover:translate-x-1">
              ›
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}
