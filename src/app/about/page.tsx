import type { Metadata } from "next";
import Link from "next/link";
import { ScrollReveal } from "@/frontend/components/site/scroll-reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Well Made — premium RC vehicles, drones, and robots. Simple, intentional, timeless design. Solid materials. Designed to last.",
};

export default function AboutPage() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[820px] px-6 py-20 sm:py-32">
        <ScrollReveal>
          <p className="text-[12px] font-semibold uppercase tracking-[0.28em] text-[color:var(--brand-forest)]">
            About
          </p>
          <h1 className="mt-4 font-display text-[40px] font-500 leading-[1.05] tracking-apple-mass text-balance sm:text-[56px] lg:text-[72px]">
            Quietly made. Made to last.
          </h1>
          <p className="mt-8 text-[17px] font-300 leading-relaxed text-muted-foreground sm:text-[18px]">
            Well Made was built on a simple idea: there are too many cheap things
            in the world. We wanted to make products you&apos;d actually be glad
            to own — RC cars, drones, robots, planes — finished with the same care
            you&apos;d put into a watch or a piece of furniture.
          </p>
          <p className="mt-6 text-[17px] font-300 leading-relaxed text-muted-foreground sm:text-[18px]">
            Every piece in our collection follows the same five rules:{" "}
            <span className="text-foreground">solid weight</span> in the hand,{" "}
            <span className="text-foreground">clean lines</span> with no loud
            graphics,{" "}
            <span className="text-foreground">premium materials</span> — metal
            alloys, dense plastics, real rubber —{" "}
            <span className="text-foreground">reliable performance</span> out of
            the box, and{" "}
            <span className="text-foreground">considered packaging</span> in
            black, white, gold, and green. Always English only. Always RCM
            certified for Australia.
          </p>
          <p className="mt-6 text-[17px] font-300 leading-relaxed text-muted-foreground sm:text-[18px]">
            We design for the people who notice the difference. Collectors who
            display as much as they play. Gift-givers who want something that
            says they cared. Adults who haven&apos;t lost the appetite for a
            machine that does one thing well.
          </p>
        </ScrollReveal>

        {/* Brand pillars */}
        <ScrollReveal delayMs={140} className="mt-16 grid gap-8 sm:mt-20 sm:grid-cols-3 sm:gap-6">
          {[
            {
              eyebrow: "01",
              title: "Solid weight",
              body: "Metal alloys, dense plastics, real rubber. Nothing hollow.",
            },
            {
              eyebrow: "02",
              title: "Clean lines",
              body: "No loud graphics, no neon, no clutter. Black, white, grey, gold.",
            },
            {
              eyebrow: "03",
              title: "Reliable",
              body: "Works out of the box. RCM certified. 30-day no-questions returns.",
            },
          ].map((pillar) => (
            <div key={pillar.title} className="bezel-outer">
              <div className="bezel-inner">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[color:var(--brand-forest)]">
                  {pillar.eyebrow}
                </p>
                <h3 className="mt-3 font-display text-[22px] font-500 tracking-apple-tight text-foreground">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
                  {pillar.body}
                </p>
              </div>
            </div>
          ))}
        </ScrollReveal>

        <ScrollReveal delayMs={260} className="mt-16 flex flex-col gap-3 sm:mt-20 sm:flex-row sm:gap-4">
          <Link href="/products" className="btn-apple-primary">
            Shop the collection
          </Link>
          <Link href="/contact" className="btn-apple-secondary">
            Talk to us
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
