import Image from "next/image";
import { getProductsByCategory } from "@/shared/data/products";
import { TRACKS, type Track } from "@/shared/data/tracks";

/** Resolve each track's photo from its product category (one query per category). */
export async function getTrackImages(): Promise<Record<string, string>> {
  const categories = [...new Set(TRACKS.map((t) => t.imageCategory))];
  const results = await Promise.all(
    categories.map(async (c) => [c, await getProductsByCategory(c).catch(() => [])] as const),
  );
  const byCategory = new Map(results);
  const images: Record<string, string> = {};
  for (const t of TRACKS) {
    const products = byCategory.get(t.imageCategory) ?? [];
    const pick = products[t.imageIndex] ?? products[0];
    if (pick?.image_url) images[t.slug] = pick.image_url;
  }
  return images;
}

export function TrackCard({
  track,
  imageUrl,
  index,
}: {
  track: Track;
  imageUrl?: string;
  index: number;
}) {
  return (
    <article
      id={track.slug}
      className="group flex scroll-mt-20 flex-col overflow-hidden rounded-2xl border border-border/60 bg-card"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[color:var(--brand-graphite)]">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={`${track.name} at RC Adventure`}
            fill
            sizes="(min-width: 1024px) 600px, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-[color:var(--brand-gold)] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#0E0E10]">
          Track {String(index + 1).padStart(2, "0")}
        </span>
        <p className="absolute bottom-4 left-4 right-4 text-[13px] font-medium text-white/90">
          {track.tagline}
        </p>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-[26px] font-600 tracking-apple-tight text-foreground">
          {track.name}
        </h3>
        <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
          {track.description}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {track.machines.map((m) => (
            <span
              key={m}
              className="rounded-full border border-[color:var(--brand-forest)]/40 px-3 py-1 text-[12px] font-medium text-[color:var(--brand-forest)]"
            >
              {m}
            </span>
          ))}
        </div>
        <ul className="mt-5 grid grid-cols-1 gap-1.5 border-t border-border/60 pt-5 text-[13px] text-foreground/80 sm:grid-cols-3">
          {track.features.map((f) => (
            <li key={f} className="flex items-center gap-2">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[color:var(--brand-gold)]" />
              {f}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
