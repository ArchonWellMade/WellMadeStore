import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { ScrollReveal } from "@/frontend/components/site/scroll-reveal";
import { getPartCategories, searchParts } from "@/shared/data/parts";

export const metadata: Metadata = {
  title: "Parts & Accessories",
  description:
    "Genuine LESU 1/14 scale RC parts and accessories — hydraulics, axles, wheels, cab and body parts, lights, decals and more. Ask us for price and availability in Australia.",
};

const PER_PAGE = 48;
type SearchParams = { category?: string; q?: string; page?: string };

export default async function PartsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const { category, q, page } = await searchParams;
  const cats = await getPartCategories();
  const active = cats.find((c) => c.slug === category);
  const activeCat = active?.title;
  const totalAll = cats.reduce((s, c) => s + c.count, 0);
  const current = Math.max(1, Number(page) || 1);
  const { parts: shown, total } = await searchParts({
    category: active?.slug,
    q,
    page: current,
    perPage: PER_PAGE,
  });
  const pages = Math.max(1, Math.ceil(total / PER_PAGE));

  const href = (o: { category?: string | null; page?: number }) => {
    const sp = new URLSearchParams();
    const cat = o.category === undefined ? (activeCat ? category : undefined) : o.category;
    if (cat) sp.set("category", cat);
    if (q) sp.set("q", q);
    if (o.page && o.page > 1) sp.set("page", String(o.page));
    const s = sp.toString();
    return `/parts${s ? `?${s}` : ""}`;
  };

  const pill = (active: boolean) =>
    `inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-semibold transition-all duration-300 ${
      active
        ? "border-[color:var(--brand-gold)] bg-[color:var(--brand-gold)] text-[#0E0E10] shadow-[0_8px_24px_-8px_rgba(233,168,32,0.6)]"
        : "border-white/12 text-white/65 hover:border-white/40 hover:text-white"
    }`;
  const count = (active: boolean) =>
    `rounded-full px-1.5 text-[11px] tabular-nums ${active ? "bg-black/15" : "bg-white/[0.08] text-white/50"}`;

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white">
      <section className="relative isolate overflow-hidden">
        <div aria-hidden className="absolute -left-40 top-10 -z-10 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(233,168,32,0.16),transparent_65%)] blur-2xl" />
        <div aria-hidden className="absolute -right-32 top-40 -z-10 h-[460px] w-[620px] rounded-full bg-[radial-gradient(circle,rgba(42,122,99,0.18),transparent_65%)] blur-2xl" />
        <div className="mx-auto max-w-[1280px] px-4 pb-12 pt-36 sm:px-6 lg:pb-14 lg:pt-48">
          <div className="max-w-3xl">
            <p className="product-rise inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-[color:var(--brand-gold)]">
              <span className="h-px w-8 bg-current opacity-70" />
              Parts &amp; accessories · {totalAll.toLocaleString()} items
            </p>
            <h1
              className="product-rise mt-6 font-display text-[44px] font-500 leading-[0.98] tracking-apple-mass text-balance sm:text-[68px] lg:text-[88px]"
              style={{ animationDelay: "80ms" }}
            >
              {activeCat ?? (
                <>
                  Every part. <em className="font-400 italic text-[color:var(--brand-gold)]">Built to fit.</em>
                </>
              )}
            </h1>
            <p
              className="product-rise mt-6 max-w-2xl text-[16px] font-300 leading-relaxed text-white/60 sm:text-[17px]"
              style={{ animationDelay: "160ms" }}
            >
              Genuine LESU 1/14 scale parts — hydraulics, axles, wheels, cab and body parts, lights and decals. Prices on
              request: tap <span className="text-white">Enquire</span> on any part and we&apos;ll come back with price and
              availability.
            </p>
            <form action="/parts" className="product-rise mt-8 flex max-w-xl items-center gap-2" style={{ animationDelay: "240ms" }}>
              {activeCat ? <input type="hidden" name="category" value={category} /> : null}
              <label className="relative flex-1">
                <span className="sr-only">Search parts</span>
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" aria-hidden />
                <input
                  type="search"
                  name="q"
                  defaultValue={q ?? ""}
                  placeholder="Search by name, part code or machine…"
                  className="h-12 w-full rounded-full border border-white/12 bg-white/[0.04] pl-11 pr-4 text-[15px] text-white placeholder:text-white/35 outline-none transition-colors focus:border-[color:var(--brand-gold)]"
                />
              </label>
              <button
                type="submit"
                className="h-12 -skew-x-12 bg-[color:var(--brand-gold)] px-6 text-[14px] font-extrabold uppercase italic text-[#0E0E10] transition-colors hover:bg-[color:var(--brand-gold-light)]"
              >
                <span className="inline-block skew-x-12">Search</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      <nav aria-label="Part categories" className="sticky top-20 z-30 border-y border-white/[0.06] bg-[#0a0a0c]/80 backdrop-blur-xl lg:top-28">
        <div className="mx-auto flex max-w-[1280px] items-center gap-2 overflow-x-auto px-4 py-3.5 sm:px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <Link href={href({ category: null })} scroll={false} className={pill(!activeCat)}>
            All <span className={count(!activeCat)}>{totalAll}</span>
          </Link>
          {cats.map((c) => {
            const isActive = c.slug === active?.slug;
            return (
              <Link key={c.slug} href={href({ category: c.slug })} scroll={false} className={pill(isActive)}>
                {c.title} <span className={count(isActive)}>{c.count}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      <section className="mx-auto max-w-[1280px] px-4 pb-28 pt-10 sm:px-6">
        <p className="mb-6 text-[13px] text-white/45">
          {total.toLocaleString()} {total === 1 ? "part" : "parts"}
          {q ? <> matching “{q}”</> : null}
          {pages > 1 ? <> · page {current} of {pages}</> : null}
        </p>
        {shown.length ? (
          <div key={`${category}-${q}-${current}`} className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
            {shown.map((p, i) => (
              <ScrollReveal key={p.slug} delayMs={(i % 4) * 70} offsetY={28} className="h-full">
                <Link
                  href={`/parts/${p.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-white/[0.08] bg-white/[0.03] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-[color:var(--brand-gold)]/45 hover:shadow-[0_30px_70px_-35px_rgba(233,168,32,0.5)]"
                >
                  <div className="relative aspect-square overflow-hidden bg-white">
                    {p.image_url ? (
                      <Image
                        src={p.image_url}
                        alt={p.name}
                        fill
                        sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                        className="object-contain p-[6%] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-[11px] uppercase tracking-[0.2em] text-black/35">No photo</div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-4 sm:p-5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--brand-gold)]">
                      {p.code}
                      {p.variant ? <span className="text-white/45"> · {p.variant}</span> : null}
                    </p>
                    <h2 className="line-clamp-3 text-[14px] font-semibold leading-snug text-white sm:text-[15px]">{p.name}</h2>
                    <span className="mt-auto pt-2 text-[12px] font-semibold text-white/55 transition-colors group-hover:text-[color:var(--brand-gold)]">
                      Price on request →
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <p className="py-24 text-center text-white/50">No parts found. Try a different search, or call us — we can source most LESU parts.</p>
        )}

        {pages > 1 ? (
          <nav aria-label="Pages" className="mt-12 flex flex-wrap items-center justify-center gap-2">
            {current > 1 ? (
              <Link href={href({ page: current - 1 })} className={pill(false)}>← Prev</Link>
            ) : null}
            {Array.from({ length: pages }, (_, i) => i + 1)
              .filter((n) => n === 1 || n === pages || Math.abs(n - current) <= 2)
              .map((n, i, arr) => (
                <span key={n} className="flex items-center gap-2">
                  {i > 0 && n - arr[i - 1] > 1 ? <span className="text-white/30">…</span> : null}
                  <Link href={href({ page: n })} className={pill(n === current)} aria-current={n === current ? "page" : undefined}>
                    {n}
                  </Link>
                </span>
              ))}
            {current < pages ? (
              <Link href={href({ page: current + 1 })} className={pill(false)}>Next →</Link>
            ) : null}
          </nav>
        ) : null}
      </section>
    </div>
  );
}
