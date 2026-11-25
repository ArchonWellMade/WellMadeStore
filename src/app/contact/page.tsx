import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Mail, Phone } from "lucide-react";
import { ScrollReveal } from "@/frontend/components/site/scroll-reveal";
import { OfferBanner, PRICING } from "@/frontend/components/site/offer-banner";
import { PHOTOS } from "@/shared/data/photos";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a session or get in touch with the RC Adventure team. Pre-book 10 minutes for $10.",
};

const EMAIL = "admin@wellmadeblinds.com.au";
const PHONE_DISPLAY = "+61 415 381 093";
const PHONE_HREF = "tel:+61415381093";

const BOOKING_STEPS = [
  {
    step: "01",
    title: "Call or email us",
    body: "Tell us how many drivers, which day and roughly what time.",
  },
  {
    step: "02",
    title: "We lock in your slot",
    body: `We confirm your booking — and your $${PRICING.preBooked} pre-book rate.`,
  },
  {
    step: "03",
    title: "Turn up and drive",
    body: "Grab a machine, hit the tracks, and swap as often as you like.",
  },
];

const SHOP_INFO = [
  { title: "Returns", body: "30-day no-questions returns on every order, anywhere in Australia." },
  { title: "Warranty", body: "12-month manufacturer warranty on every product we ship." },
  { title: "Compliance", body: "RCM certified. English-only labelling. Australian standards." },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-[color:var(--brand-gold)]">
      <span className="h-px w-8 bg-current opacity-70" />
      {children}
    </p>
  );
}

export default function ContactPage() {
  return (
    <div className="bg-[#0a0a0c] text-white">
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="stay-dark relative isolate overflow-hidden">
        <div aria-hidden className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element -- full-bleed background */}
          <img
            src={PHOTOS.driverWithBuggy}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-[65%_center] opacity-60"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#0a0a0c_0%,rgba(10,10,12,0.9)_40%,rgba(10,10,12,0.4)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,#0a0a0c_100%)]" />
          <div className="absolute -left-40 top-1/3 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(233,168,32,0.14),transparent_65%)] blur-2xl" />
        </div>

        <div className="relative mx-auto max-w-[1280px] px-4 pb-16 pt-40 sm:px-6 sm:pb-24 lg:pt-52">
          <div className="max-w-[720px]">
            <ScrollReveal>
              <Eyebrow>Contact &amp; bookings</Eyebrow>
            </ScrollReveal>
            <h1 className="mt-6 font-display text-[52px] font-500 leading-[0.96] tracking-apple-mass text-balance sm:text-[76px] lg:text-[96px]">
              Book a <em className="font-400 italic text-[color:var(--brand-gold)]">session.</em>
            </h1>
            <ScrollReveal delayMs={120}>
              <p className="mt-6 max-w-[34rem] text-[17px] font-300 leading-relaxed text-white/70 sm:text-[18px]">
                Track sessions, birthday parties, group bookings, or questions about
                the machines in our shop — tell us how many drivers and when, and a
                real person will get back to you within a business day.
              </p>
            </ScrollReveal>
            <ScrollReveal delayMs={220}>
              <a
                href={PHONE_HREF}
                className="group mt-8 inline-flex items-center gap-3 rounded-full border border-[color:var(--brand-gold)]/50 bg-[color:var(--brand-gold)]/10 py-1.5 pl-1.5 pr-4 text-[13px] text-white backdrop-blur transition-colors hover:bg-[color:var(--brand-gold)]/20"
              >
                <span className="rounded-full bg-[color:var(--brand-gold)] px-2.5 py-1 text-[11px] font-extrabold uppercase italic tracking-[0.12em] text-[#0E0E10]">
                  Offer
                </span>
                <span>
                  {PRICING.minutes} mins{" "}
                  <span className="text-white/45 line-through">${PRICING.walkIn}</span>{" "}
                  <strong className="font-semibold text-[color:var(--brand-gold)]">${PRICING.preBooked}</strong>{" "}
                  when you pre-book
                </span>
                <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
              </a>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Contact cards ─────────────────────────────────── */}
      <section id="book" className="scroll-mt-28">
        <div className="mx-auto grid max-w-[1280px] gap-4 px-4 pb-8 sm:px-6 lg:grid-cols-[1.25fr_1fr_0.85fr] lg:gap-5">
          {/* Phone — primary */}
          <ScrollReveal className="h-full">
            <a
              href={PHONE_HREF}
              className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border-2 border-[color:var(--brand-gold)] bg-[linear-gradient(150deg,rgba(233,168,32,0.2),rgba(233,168,32,0.04)_60%)] p-8 shadow-[0_30px_80px_-30px_rgba(233,168,32,0.6)] sm:p-10"
            >
              <div aria-hidden className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(233,168,32,0.35),transparent_65%)] blur-2xl" />
              <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-[color:var(--brand-gold)] text-[#0E0E10]">
                <Phone className="h-6 w-6" strokeWidth={2.25} />
              </span>
              <p className="relative mt-8 text-[11px] font-semibold uppercase tracking-[0.28em] text-[color:var(--brand-gold)]">
                Call or text to book
              </p>
              <p className="relative mt-3 font-display text-[34px] font-500 leading-none tracking-apple-tight sm:text-[44px]">
                {PHONE_DISPLAY}
              </p>
              <span className="relative mt-auto inline-flex items-center gap-2 pt-8 text-[14px] font-semibold text-white">
                Tap to call
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </a>
          </ScrollReveal>

          {/* Email */}
          <ScrollReveal delayMs={100} className="h-full">
            <a
              href={`mailto:${EMAIL}`}
              className="group flex h-full flex-col rounded-[28px] border border-white/[0.1] bg-white/[0.03] p-8 transition-colors hover:border-white/25 hover:bg-white/[0.05] sm:p-10"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.04] text-[color:var(--brand-gold)]">
                <Mail className="h-6 w-6" strokeWidth={2} />
              </span>
              <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/50">Email</p>
              <p className="mt-3 font-display text-[22px] font-500 leading-tight tracking-apple-tight sm:text-[24px]">
                {EMAIL.split("@")[0]}
                <wbr />@{EMAIL.split("@")[1]}
              </p>
              <span className="mt-auto inline-flex items-center gap-2 pt-8 text-[14px] text-white/60">
                Replies within one business day
              </span>
            </a>
          </ScrollReveal>

          {/* Hours */}
          <ScrollReveal delayMs={200} className="h-full">
            <div className="flex h-full flex-col rounded-[28px] border border-white/[0.1] bg-white/[0.03] p-8 sm:p-10">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.04] text-[color:var(--brand-gold)]">
                <Clock className="h-6 w-6" strokeWidth={2} />
              </span>
              <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/50">Phone hours</p>
              <p className="mt-3 font-display text-[22px] font-500 leading-tight sm:text-[24px]">Mon–Fri</p>
              <p className="mt-1 text-[16px] text-white/70">9am – 6pm AEDT</p>
              <span className="mt-auto pt-8 text-[14px] text-white/60">Email us any time.</span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Offer ─────────────────────────────────────────── */}
      <OfferBanner ctaHref={PHONE_HREF} ctaLabel={`Call to pre-book for $${PRICING.preBooked}`} />

      {/* ── How booking works ─────────────────────────────── */}
      <section className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 sm:py-28">
          <ScrollReveal className="max-w-2xl">
            <Eyebrow>How booking works</Eyebrow>
            <h2 className="mt-6 font-display text-[40px] font-500 leading-[1] tracking-apple-mass sm:text-[56px]">
              Three steps to <span className="italic text-[color:var(--brand-gold)]">the dirt.</span>
            </h2>
          </ScrollReveal>
          <ol className="mt-12 grid gap-4 sm:grid-cols-3 sm:gap-5">
            {BOOKING_STEPS.map((s, i) => (
              <ScrollReveal key={s.step} delayMs={i * 100} className="h-full">
                <li className="flex h-full list-none flex-col rounded-[24px] border border-white/[0.08] bg-white/[0.02] p-7">
                  <span className="font-display text-[40px] font-500 leading-none text-[color:var(--brand-gold)]/80">{s.step}</span>
                  <h3 className="mt-6 font-display text-[22px] font-500">{s.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-white/55">{s.body}</p>
                </li>
              </ScrollReveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Shop info ─────────────────────────────────────── */}
      <section className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6">
          <div className="flex flex-col justify-between gap-10 lg:flex-row">
            <div className="max-w-xs">
              <Eyebrow>Buying from the shop</Eyebrow>
              <p className="mt-4 text-[15px] leading-relaxed text-white/55">
                Want a machine of your own? Our shop stocks RC cars, crawlers and construction vehicles.
              </p>
              <Link href="/products" className="mt-5 inline-flex items-center gap-2 text-[14px] font-semibold text-white hover:text-[color:var(--brand-gold)]">
                Browse the shop <span aria-hidden>→</span>
              </Link>
            </div>
            <div className="grid flex-1 gap-8 sm:grid-cols-3 lg:max-w-3xl">
              {SHOP_INFO.map((x) => (
                <div key={x.title} className="border-t border-white/[0.1] pt-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white">{x.title}</p>
                  <p className="mt-2 text-[14px] leading-relaxed text-white/55">{x.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
