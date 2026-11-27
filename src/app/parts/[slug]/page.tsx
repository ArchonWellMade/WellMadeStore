import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Mail, Phone } from "lucide-react";
import { FadeInOut } from "@/frontend/components/site/scroll-motion";
import { PARTS, PARTS_PHONE_HREF, enquireHref, getPart, partCategorySlug } from "@/shared/data/parts";

type Params = { slug: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const p = getPart((await params).slug);
  if (!p) return {};
  return {
    title: `${p.name} (${p.code})`,
    description: `${p.name} — part ${p.code}. Genuine LESU 1/14 RC part. Ask Well Made RC Adventure for price and availability.`,
    openGraph: p.image ? { images: [p.image] } : undefined,
  };
}

export default async function PartPage({ params }: { params: Promise<Params> }) {
  const p = getPart((await params).slug);
  if (!p) notFound();
  const catSlug = partCategorySlug(p.category);
  const related = PARTS.filter((x) => x.category === p.category && x.slug !== p.slug && x.image)
    .filter((x) => x.code.split("-")[0] === p.code.split("-")[0])
    .slice(0, 8);

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white">
      <div className="mx-auto max-w-[1200px] px-4 pb-24 pt-32 sm:px-6 lg:pt-44">
        <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-[13px] text-white/45">
          <Link href="/parts" className="hover:text-white">Parts</Link>
          <span>/</span>
          <Link href={`/parts?category=${catSlug}`} className="hover:text-white">{p.category}</Link>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <FadeInOut>
            <div className="product-shine relative aspect-square overflow-hidden rounded-[28px] border border-white/[0.08] bg-white">
              {p.image ? (
                <Image src={p.image} alt={p.name} fill priority sizes="(max-width: 1024px) 100vw, 600px" className="object-contain p-[6%]" />
              ) : (
                <div className="flex h-full items-center justify-center text-xs uppercase tracking-[0.2em] text-black/35">No photo</div>
              )}
            </div>
          </FadeInOut>

          <div className="flex flex-col">
            <FadeInOut>
              <p className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[color:var(--brand-gold)]">
                <span className="h-px w-8 bg-current opacity-70" />
                {p.category}
              </p>
            </FadeInOut>
            <FadeInOut>
              <h1 className="mt-5 font-display text-[34px] font-500 leading-[1.05] tracking-apple-mass text-balance sm:text-[46px]">
                {p.name}
              </h1>
            </FadeInOut>
            <FadeInOut>
              <dl className="mt-8 grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 border-y border-white/[0.08] py-6 text-[15px]">
                <dt className="text-white/45">Part code</dt>
                <dd className="font-semibold tabular-nums">{p.code}</dd>
                {p.variant ? (<><dt className="text-white/45">Version</dt><dd>{p.variant}</dd></>) : null}
                <dt className="text-white/45">Scale</dt>
                <dd>1/14</dd>
                {p.note ? (<><dt className="text-white/45">Pack</dt><dd>{p.note}</dd></>) : null}
                {p.details ? (<><dt className="text-white/45">Details</dt><dd className="text-white/80">{p.details}</dd></>) : null}
                {p.fits.length ? (<><dt className="text-white/45">Fits</dt><dd className="text-white/80">{p.fits.join(", ")}</dd></>) : null}
              </dl>
            </FadeInOut>
            <FadeInOut>
              <p className="mt-8 text-[22px] font-semibold">Price on request</p>
              <p className="mt-2 text-[15px] text-white/55">Send us the part code and we&apos;ll reply with price and availability.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={enquireHref(p)}
                  className="inline-flex h-12 -skew-x-12 items-center bg-[color:var(--brand-gold)] px-7 text-[14px] font-extrabold uppercase italic text-[#0E0E10] transition-colors hover:bg-[color:var(--brand-gold-light)]"
                >
                  <span className="inline-flex skew-x-12 items-center gap-2"><Mail className="h-4 w-4" aria-hidden /> Enquire</span>
                </a>
                <a
                  href={PARTS_PHONE_HREF}
                  className="inline-flex h-12 items-center gap-2 rounded-full border border-white/15 px-6 text-[14px] font-semibold text-white transition-colors hover:border-white/50"
                >
                  <Phone className="h-4 w-4" aria-hidden /> Call us
                </a>
              </div>
            </FadeInOut>
          </div>
        </div>

        {related.length ? (
          <section className="mt-24">
            <h2 className="font-display text-[28px] font-500 tracking-apple-mass">Related parts</h2>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-4">
              {related.map((r) => (
                <Link key={r.slug} href={`/parts/${r.slug}`} className="group overflow-hidden rounded-[20px] border border-white/[0.08] bg-white/[0.03] transition-colors hover:border-[color:var(--brand-gold)]/45">
                  <div className="relative aspect-square bg-white">
                    <Image src={r.image!} alt={r.name} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-contain p-[6%] transition-transform duration-700 group-hover:scale-[1.06]" />
                  </div>
                  <div className="p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--brand-gold)]">{r.code}</p>
                    <p className="mt-1 line-clamp-2 text-[14px] font-semibold leading-snug">{r.name}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
