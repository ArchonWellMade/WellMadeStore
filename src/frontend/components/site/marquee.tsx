type Props = {
  items: string[];
  /** "ignition" = orange band, "graphite" = dark band, "ghost" = subtle on bg */
  tone?: "ignition" | "graphite" | "ghost";
};

export function Marquee({ items, tone = "ignition" }: Props) {
  const palette =
    tone === "ignition"
      ? "bg-[color:var(--brand-ignition)] text-white"
      : tone === "graphite"
      ? "bg-[color:var(--brand-graphite)] text-white"
      : "bg-transparent text-foreground/60";
  // Duplicate the list so the -50% translate loop is seamless
  const doubled = [...items, ...items];

  return (
    <div
      aria-hidden
      className={`relative overflow-hidden border-y border-white/[0.06] ${palette}`}
    >
      <div className="marquee-track flex w-max items-center gap-12 py-4 whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="inline-flex items-center gap-12 text-[12px] font-semibold uppercase tracking-[0.28em]"
          >
            {item}
            <span aria-hidden className="text-current/60">
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
