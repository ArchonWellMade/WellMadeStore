import { Truck, Headphones, RotateCcw, ShieldCheck, type LucideIcon } from "lucide-react";
import { ScrollReveal } from "@/frontend/components/site/scroll-reveal";

type Item = {
  icon: LucideIcon;
  title: string;
  blurb: string;
};

const items: Item[] = [
  { icon: Truck, title: "Free shipping over $99", blurb: "U.S. & Canada" },
  { icon: Headphones, title: "Real hobbyist support", blurb: "No chatbots" },
  { icon: RotateCcw, title: "30-day returns", blurb: "No questions asked" },
  { icon: ShieldCheck, title: "Authorized parts", blurb: "Lab-tested, warrantied" },
];

export function TrustBar() {
  return (
    <section
      aria-label="Service promises"
      className="border-y border-border/60 bg-background"
    >
      <div className="mx-auto max-w-[1280px] px-6 py-14 sm:py-16">
        <div className="grid grid-cols-2 gap-x-10 gap-y-12 sm:grid-cols-4">
          {items.map(({ icon: Icon, title, blurb }, i) => (
            <ScrollReveal
              key={title}
              delayMs={i * 70}
              className="flex flex-col items-start gap-3"
            >
              <Icon
                className="h-5 w-5 text-foreground/85"
                strokeWidth={1.5}
                aria-hidden
              />
              <p className="text-[14px] font-semibold tracking-apple-tight text-foreground">
                {title}
              </p>
              <p className="-mt-1 text-[12px] text-muted-foreground">{blurb}</p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
