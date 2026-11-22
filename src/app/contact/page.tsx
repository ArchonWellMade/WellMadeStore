import type { Metadata } from "next";
import { ScrollReveal } from "@/frontend/components/site/scroll-reveal";

export const metadata: Metadata = {
  title: "Contact",
  description: "Book a session or get in touch with the RC Adventure team.",
};

export default function ContactPage() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[820px] px-6 py-20 sm:py-32">
        <ScrollReveal>
          <p className="text-[12px] font-semibold uppercase tracking-[0.28em] text-[color:var(--brand-forest)]">
            Contact
          </p>
          <h1 className="mt-4 font-display text-[40px] font-500 leading-[1.05] tracking-apple-mass text-balance sm:text-[56px] lg:text-[72px]">
            Book a session.
          </h1>
          <p className="mt-8 text-[17px] font-300 leading-relaxed text-muted-foreground sm:text-[18px]">
            Track sessions, birthday parties, group bookings, or questions about
            the machines in our shop — tell us how many drivers and when, and a
            real person will get back to you within a business day.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid gap-5 sm:mt-16 sm:grid-cols-2 sm:gap-6">
          <ScrollReveal className="bezel-outer">
            <div className="bezel-inner flex flex-col gap-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[color:var(--brand-forest)]">
                Email
              </p>
              <a
                href="mailto:hello@wellmadestore.com.au"
                className="font-display text-[22px] font-500 tracking-apple-tight text-foreground transition-colors hover:text-[color:var(--brand-gold)] sm:text-2xl"
              >
                hello@wellmadestore.com.au
              </a>
              <p className="text-[14px] text-muted-foreground">
                Replies within one business day.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delayMs={120} className="bezel-outer">
            <div className="bezel-inner flex flex-col gap-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[color:var(--brand-forest)]">
                Phone
              </p>
              <a
                href="tel:+61000000000"
                className="font-display text-[22px] font-500 tracking-apple-tight text-foreground transition-colors hover:text-[color:var(--brand-gold)] sm:text-2xl"
              >
                +61 (0) 000 000 000
              </a>
              <p className="text-[14px] text-muted-foreground">
                Mon–Fri, 9am–6pm AEDT.
              </p>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delayMs={240} className="mt-12 grid gap-3 text-[14px] text-muted-foreground sm:mt-16 sm:grid-cols-3 sm:gap-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground">
              Returns
            </p>
            <p className="mt-2 leading-relaxed">
              30-day no-questions returns on every order, anywhere in Australia.
            </p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground">
              Warranty
            </p>
            <p className="mt-2 leading-relaxed">
              12-month manufacturer warranty on every product we ship.
            </p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground">
              Compliance
            </p>
            <p className="mt-2 leading-relaxed">
              RCM certified. English-only labelling. Australian standards.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
