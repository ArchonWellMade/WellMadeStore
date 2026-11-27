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
      <div className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 sm:py-28">
        <ScrollReveal className="sd-zoom">
          {/* Hairline gold frame with a slow light sweep */}
          <div className="offer-frame relative rounded-[36px] p-px">
            <div className="stay-dark relative overflow-clip rounded-[35px] bg-[linear-gradient(160deg,#141518_0%,#0c0d0f_55%,#0a0a0c_100%)] px-7 py-12 sm:px-12 sm:py-16 lg:px-16">
              <div aria-hidden className="absolute -left-32 -top-40 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(233,168,32,0.14),transparent_65%)] blur-2xl" />
              <span
                aria-hidden
                className="pointer-events-none absolute -bottom-16 right-[-2%] select-none font-display text-[260px] font-500 leading-none tracking-tight text-transparent [-webkit-text-stroke:1px_rgba(233,168,32,0.14)] sm:text-[340px]"
              >
                {savePct}%
              </span>

              <div className="relative grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
                <div>
                  <p className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em] text-[color:var(--brand-gold)]">
                    <span className="h-px w-10 bg-current opacity-70" />
                    Pre-book rate · {savePct}% off
                  </p>
                  <h2 className="mt-7 font-display text-[46px] font-500 leading-[0.98] tracking-apple-mass text-balance sm:text-[72px]">
                    Book ahead.
                    <br />
                    <span className="italic font-400 text-[color:var(--brand-gold)]">Pay half.</span>
                  </h2>
                  <p className="mt-6 max-w-[30rem] text-[16px] font-300 leading-relaxed text-white/60 sm:text-[17px]">
                    Any machine, any track. Reserve your {minutes}-minute session before you
                    arrive and it&apos;s ${preBooked} instead of ${walkIn} at the door.
                  </p>
                  <div className="mt-9 flex flex-wrap items-center gap-5">
                    <Link
                      href={ctaHref}
                      className="group inline-flex h-14 items-center justify-center gap-3 rounded-full bg-[color:var(--brand-gold)] pl-8 pr-2 text-[15px] font-semibold text-[#0E0E10] shadow-[0_14px_44px_-12px_rgba(233,168,32,0.6)] transition-colors hover:bg-[color:var(--brand-gold-light)]"
                    >
                      {ctaLabel ?? `Pre-book for $${preBooked}`}
                      <span aria-hidden className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#0E0E10] text-[color:var(--brand-gold)] transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                    <span className="text-[13px] text-white/40">Limited daily slots</span>
                  </div>
                </div>

                {/* Price ticket */}
                <div className="sd-right sd-r2 relative mx-auto w-full max-w-[380px]">
                  <div className="relative rounded-[28px] border border-white/[0.08] bg-white/[0.025] p-8 backdrop-blur-md sm:p-10">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/45">Per session</span>
                      <span className="rounded-full border border-[color:var(--brand-gold)]/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--brand-gold)]">
                        Pre-booked
                      </span>
                    </div>
                    <div className="mt-8 flex items-end gap-4">
                      <span className="bg-[linear-gradient(180deg,#FFE7A8_0%,#E9A820_60%,#B67A0E_100%)] bg-clip-text font-display text-[96px] font-500 leading-[0.8] tracking-tight text-transparent sm:text-[112px]">
                        ${preBooked}
                      </span>
                      <span className="pb-2 text-[14px] leading-tight text-white/45">
                        <span className="block line-through decoration-white/40">${walkIn} walk-in</span>
                        <span className="block">{minutes} minutes</span>
                      </span>
                    </div>
                    <div className="my-8 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                    <ul className="space-y-3 text-[14px] text-white/70">
                      {["Any machine, any track", "Your slot is held for you", "Crew on hand to help"].map((t) => (
                        <li key={t} className="flex items-center gap-3">
                          <span aria-hidden className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[color:var(--brand-gold)]/15 text-[11px] text-[color:var(--brand-gold)]">✓</span>
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
