import { CountUp } from "@/frontend/components/site/count-up";
import { ScrollReveal } from "@/frontend/components/site/scroll-reveal";

type Stat = {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

const stats: Stat[] = [
  { to: 60, suffix: "+ mph", label: "Top speed, stock" },
  { to: 8, suffix: " min", label: "Charge to full" },
  { to: 1.2, decimals: 1, suffix: " km", label: "Control range" },
  { to: 100, suffix: "C", label: "LiPo discharge" },
];

export function StatStrip() {
  return (
    <section className="relative overflow-hidden border-y border-border/60 bg-background">
      {/* Animated scan line across the section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--brand-ignition)] to-transparent opacity-60"
        style={{ animation: "lightSweep 6s ease-in-out infinite" }}
      />
      <div className="mx-auto max-w-[1280px] px-6 py-20 sm:py-24">
        <ScrollReveal className="text-center">
          <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-[color:var(--brand-ignition)]">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--brand-ignition)] [animation:glowPulse_1.6s_ease-in-out_infinite]" />
            Spec at a glance
          </p>
        </ScrollReveal>
        <div className="mt-12 grid grid-cols-2 divide-x divide-border/60 lg:grid-cols-4">
          {stats.map((s, i) => (
            <ScrollReveal
              key={s.label}
              delayMs={i * 100}
              className="px-6 text-center first:border-l-0"
            >
              <p className="font-display text-5xl font-500 tracking-apple-mass tabular-nums sm:text-6xl lg:text-7xl">
                <CountUp
                  to={s.to}
                  decimals={s.decimals ?? 0}
                  prefix={s.prefix ?? ""}
                  suffix={s.suffix ?? ""}
                />
              </p>
              <p className="mt-3 text-[12px] uppercase tracking-[0.22em] text-muted-foreground">
                {s.label}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
