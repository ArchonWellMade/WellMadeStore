import Link from "next/link";
import { ScrollReveal } from "@/frontend/components/site/scroll-reveal";

export const PRICING = {
  minutes: 10,
  walkIn: 20,
  preBooked: 10,
} as const;

/** Big "pre-book and save 50%" offer block. */
export function OfferBanner({
  ctaHref = "/contact",
  ctaLabel,
}: { ctaHref?: string; ctaLabel?: string } = {}) {
  const { minutes, walkIn, preBooked } = PRICING;
  const savePct = Math.round((1 - preBooked / walkIn) * 100);

  return (
    <section className="relative border-t border-white/[0.06]">
      <div className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 sm:py-24">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-[32px] border border-[color:var(--brand-gold)]/40 bg-[linear-gradient(135deg,rgba(233,168,32,0.18)_0%,rgba(233,168,32,0.04)_45%,rgba(10,10,12,0)_100%)] p-8 sm:p-12 lg:p-14">
            {/* glow + diagonal stripes */}
            <div aria-hidden className="absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(233,168,32,0.35),transparent_65%)] blur-2xl" />
            <div aria-hidden className="absolute inset-y-0 right-0 hidden w-1/2 opacity-[0.07] [background:repeating-linear-gradient(-55deg,#E9A820_0_14px,transparent_14px_34px)] lg:block" />

            <div className="relative grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
              <div>
                <span className="inline-flex -skew-x-12 items-center bg-[color:var(--brand-gold)] px-4 py-1.5 text-[12px] font-extrabold uppercase italic tracking-[0.18em] text-[#0E0E10]">
                  <span className="skew-x-12">Pre-book offer · Save {savePct}%</span>
                </span>
                <h2 className="mt-6 font-display text-[44px] font-500 leading-[1] tracking-apple-mass text-balance sm:text-[64px]">
                  Book ahead. <span className="italic text-[color:var(--brand-gold)]">Pay half.</span>
                </h2>
                <p className="mt-5 max-w-[32rem] text-[16px] font-300 leading-relaxed text-white/65 sm:text-[17px]">
                  Every {minutes}-minute session on any machine, any track. Walk in for
                  ${walkIn} — or lock in your spot before you arrive and drive for just ${preBooked}.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href={ctaHref}
                    className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-[color:var(--brand-gold)] px-8 py-4 text-[15px] font-semibold text-[#0E0E10] shadow-[0_10px_40px_-8px_rgba(233,168,32,0.55)] transition-colors hover:bg-[color:var(--brand-gold-light)]"
                  >
                    {ctaLabel ?? `Pre-book for $${preBooked}`}
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              </div>

              {/* Price comparison */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="flex flex-col rounded-[24px] border border-white/10 bg-black/30 p-6 backdrop-blur sm:p-8">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] sm:tracking-[0.28em] text-white/50">Walk-in</span>
                  <span className="relative mt-4 w-fit font-display text-[56px] font-500 leading-none text-white/45 sm:text-[72px]">
                    ${walkIn}
                    <span aria-hidden className="absolute left-[-6%] top-1/2 h-[3px] w-[112%] -rotate-12 bg-[#e5484d]" />
                  </span>
                  <span className="mt-3 text-[13px] text-white/45">per {minutes} minutes</span>
                </div>
                <div className="relative flex flex-col rounded-[24px] border-2 border-[color:var(--brand-gold)] bg-[color:var(--brand-gold)]/10 p-6 shadow-[0_20px_60px_-20px_rgba(233,168,32,0.6)] sm:p-8">
                  <span className="absolute -top-3 right-4 rounded-full bg-[color:var(--brand-gold)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#0E0E10]">
                    Best deal
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] sm:tracking-[0.28em] text-[color:var(--brand-gold)]">Pre-booked</span>
                  <span className="mt-4 font-display text-[56px] font-500 leading-none text-white sm:text-[72px]">
                    ${preBooked}
                  </span>
                  <span className="mt-3 text-[13px] text-white/70">per {minutes} minutes</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
