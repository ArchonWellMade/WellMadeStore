import Link from "next/link";
import { LetterReveal } from "@/frontend/components/site/letter-reveal";
import { ScrollReveal } from "@/frontend/components/site/scroll-reveal";

type Theme = "light" | "dark";

type Cta = { label: string; href: string };

type ScaleTag = {
  /** Big spec line, e.g. "1:8 SCALE" */
  scale: string;
  /** Small caption, e.g. "Brushless RC · Hobby grade" */
  label: string;
};

export type FeatureSectionProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  imageAlt?: string;
  primaryCta: Cta;
  secondaryCta?: Cta;
  theme?: Theme;
  /** "stack" places title above image; "split" places image right of copy */
  layout?: "stack" | "split";
  /** Magazine-style spec callout overlaid on the image */
  scaleTag?: ScaleTag;
};

export function FeatureSection({
  eyebrow,
  title,
  subtitle,
  imageUrl,
  imageAlt = "",
  primaryCta,
  secondaryCta,
  theme = "light",
  layout = "stack",
  scaleTag,
}: FeatureSectionProps) {
  const isDark = theme === "dark";
  const bg = isDark
    ? "bg-[color:var(--brand-graphite)] text-white"
    : "bg-background text-foreground";
  const subtleText = isDark ? "text-white/75" : "text-muted-foreground";
  const ctaUnderline = isDark ? "border-white/45" : "border-foreground/30";

  if (layout === "split") {
    return (
      <section className={`${bg} relative overflow-hidden`}>
        {isDark ? (
          <div aria-hidden className="particle-field">
            <span /><span /><span /><span /><span /><span /><span /><span />
          </div>
        ) : null}
        <div className="relative mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 px-6 py-28 lg:grid-cols-[1.05fr_1fr] lg:gap-20 lg:py-40">
          <ScrollReveal>
            {eyebrow ? (
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[color:var(--brand-forest)]">
                {eyebrow}
              </p>
            ) : null}
            <h2 className="mt-5 font-display text-[44px] font-500 leading-[0.95] tracking-apple-mass sm:text-[64px] lg:text-[80px]">
              <LetterReveal text={title} stepMs={24} />
            </h2>
            {subtitle ? (
              <p
                className={`mt-7 max-w-xl text-balance text-lg font-300 leading-relaxed tracking-apple-tight ${subtleText}`}
              >
                {subtitle}
              </p>
            ) : null}
            <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-4">
              <CtaLink {...primaryCta} underlineClass={ctaUnderline} />
              {secondaryCta ? <CtaLink {...secondaryCta} underlineClass={ctaUnderline} /> : null}
            </div>
          </ScrollReveal>

          <ScrollReveal delayMs={120} className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] shadow-[0_40px_120px_-40px_rgba(0,0,0,0.55)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl}
                alt={imageAlt}
                className="h-full w-full object-cover"
              />
              <div aria-hidden className="light-sweep" />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent"
              />
              {scaleTag ? <ScaleBadge {...scaleTag} /> : null}
            </div>
          </ScrollReveal>
        </div>
      </section>
    );
  }

  // stack layout — Apple Pro page rhythm: copy on top, hero image full-bleed below
  return (
    <section className={`${bg} relative overflow-hidden`}>
      {isDark ? (
        <div aria-hidden className="particle-field">
          <span /><span /><span /><span /><span /><span /><span /><span />
        </div>
      ) : null}
      <div className="relative mx-auto max-w-[1280px] px-6 pt-28 text-center sm:pt-36 lg:pt-44">
        <ScrollReveal>
          {eyebrow ? (
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[color:var(--brand-forest)]">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="mx-auto mt-5 max-w-[12ch] font-display text-[14vw] font-500 leading-[0.92] tracking-apple-mass text-balance sm:text-[80px] lg:text-[112px]">
            <LetterReveal text={title} stepMs={26} />
          </h2>
          {subtitle ? (
            <p
              className={`mx-auto mt-7 max-w-2xl text-balance text-lg font-300 leading-relaxed tracking-apple-tight ${subtleText}`}
            >
              {subtitle}
            </p>
          ) : null}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            <CtaLink {...primaryCta} underlineClass={ctaUnderline} />
            {secondaryCta ? <CtaLink {...secondaryCta} underlineClass={ctaUnderline} /> : null}
          </div>
        </ScrollReveal>
      </div>

      <ScrollReveal delayMs={140} className="relative mx-auto mt-16 max-w-[1280px] px-6 pb-28 sm:pb-32">
        <div className="relative aspect-[16/9] overflow-hidden rounded-[32px] shadow-[0_60px_140px_-50px_rgba(0,0,0,0.55)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={imageAlt}
            className="h-full w-full object-cover"
          />
          <div aria-hidden className="light-sweep" />
          {isDark ? (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
            />
          ) : null}
          {scaleTag ? <ScaleBadge {...scaleTag} /> : null}
          {/* HUD corner — animated stat badge */}
          <div
            className="absolute right-5 top-5 hidden items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3 py-1.5 text-[10px] uppercase tracking-[0.28em] text-white/85 backdrop-blur sm:flex"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--brand-gold)] [animation:glowPulse_1.4s_ease-in-out_infinite]" />
            Live
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

function CtaLink({
  label,
  href,
  underlineClass,
}: Cta & { underlineClass: string }) {
  return (
    <Link href={href} className="group inline-flex items-center gap-2 text-[15px] font-medium">
      <span className={`border-b ${underlineClass} pb-1 transition-colors group-hover:border-[color:var(--brand-gold)]`}>
        {label}
      </span>
      <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
        ›
      </span>
    </Link>
  );
}

function ScaleBadge({ scale, label }: ScaleTag) {
  return (
    <div className="pointer-events-none absolute bottom-5 left-5 flex flex-col gap-1 rounded-md border border-white/15 bg-black/55 px-3.5 py-2.5 backdrop-blur">
      <div className="flex items-center gap-2">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--brand-gold)] [animation:glowPulse_1.6s_ease-in-out_infinite]" />
        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-[color:var(--brand-forest)]">
          {scale}
        </span>
      </div>
      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/70">
        {label}
      </span>
    </div>
  );
}
