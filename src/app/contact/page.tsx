import type { Metadata } from "next";
import { ScrollReveal } from "@/frontend/components/site/scroll-reveal";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the WellMadeStore pit crew.",
};

export default function ContactPage() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[860px] px-6 py-24 sm:py-32">
        <ScrollReveal>
          <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[color:var(--brand-forest)]">
            Contact
          </p>
          <h1 className="mt-4 font-display text-4xl font-500 tracking-apple-display sm:text-6xl">
            Talk to the pit crew.
          </h1>
          <p className="mt-8 text-[18px] font-300 leading-relaxed text-muted-foreground">
            Build advice, parts compatibility, warranty questions — we read every
            message and answer fast. No tickets, no scripts.
          </p>
        </ScrollReveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          <ScrollReveal className="bezel-outer">
            <div className="bezel-inner flex flex-col gap-3">
              <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[color:var(--brand-forest)]">
                Email
              </p>
              <a
                href="mailto:hello@wellmadestore.com"
                className="font-display text-2xl font-500 tracking-apple-tight text-foreground hover:text-[color:var(--brand-gold)] transition-colors"
              >
                hello@wellmadestore.com
              </a>
              <p className="text-[14px] text-muted-foreground">
                Replies within one business day.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delayMs={120} className="bezel-outer">
            <div className="bezel-inner flex flex-col gap-3">
              <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[color:var(--brand-forest)]">
                Phone
              </p>
              <a
                href="tel:+15555550199"
                className="font-display text-2xl font-500 tracking-apple-tight text-foreground hover:text-[color:var(--brand-gold)] transition-colors"
              >
                +1 (555) 555-0199
              </a>
              <p className="text-[14px] text-muted-foreground">
                Mon–Fri, 9am–6pm PT.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
