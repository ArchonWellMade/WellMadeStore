import type { Metadata } from "next";
import Link from "next/link";
import { ScrollReveal } from "@/frontend/components/site/scroll-reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "WellMadeStore is a hobbyist-run shop for serious RC builders. Cars, drones, planes, boats, helicopters, and the parts that keep them flying.",
};

export default function AboutPage() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[860px] px-6 py-24 sm:py-32">
        <ScrollReveal>
          <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[color:var(--brand-forest)]">
            About
          </p>
          <h1 className="mt-4 font-display text-4xl font-500 tracking-apple-display sm:text-6xl">
            Built by hobbyists, stocked for hobbyists.
          </h1>
          <p className="mt-8 text-[18px] font-300 leading-relaxed text-muted-foreground">
            WellMadeStore started in a two-bay garage with a soldering iron, a stack of
            broken ESCs, and the unshakeable belief that an RC shop should be run by
            people who actually fly, drift, and crawl. Every product on the shelf has
            been built, bench-tested, and then bashed by us first.
          </p>
          <p className="mt-6 text-[18px] font-300 leading-relaxed text-muted-foreground">
            We carry the full spread — 1:8 buggies, FPV racing quads, gyro-stabilized
            road bikes, scale warbirds, brushless catamarans, collective-pitch helis,
            and our novelty signature: flying RC swords. If it has a battery, a
            transmitter, and the potential to teach you a lesson at full throttle, we
            probably stock it.
          </p>
          <p className="mt-6 text-[18px] font-300 leading-relaxed text-muted-foreground">
            Real hobbyist support, no chatbots. Authorized parts, no grey-market
            knock-offs. 30-day no-questions returns. Free shipping on orders over $99.
          </p>
          <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link href="/products" className="btn-apple-primary">
              Shop the lineup
            </Link>
            <Link href="/contact" className="btn-apple-secondary">
              Talk to a builder
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
