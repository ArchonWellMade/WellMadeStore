/**
 * Thin animated divider between sections — light streak sweeps left-to-right
 * over an ignition-orange hairline.
 */
type Props = {
  tone?: "ignition" | "graphite";
};

export function DividerStreak({ tone = "ignition" }: Props) {
  const bg =
    tone === "ignition"
      ? "bg-[color:var(--brand-cool-gray)]"
      : "bg-[color:var(--brand-graphite)]";
  const lineColor =
    tone === "ignition"
      ? "rgba(255,90,31,0.85)"
      : "rgba(255,255,255,0.55)";

  return (
    <div className={`relative h-12 overflow-hidden ${bg}`} aria-hidden>
      <div
        className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2"
        style={{
          background: `linear-gradient(to right, transparent, ${lineColor} 50%, transparent)`,
        }}
      />
      <div
        className="absolute top-1/2 h-px w-1/3 -translate-y-1/2"
        style={{
          background: `linear-gradient(to right, transparent, #ffffff 50%, transparent)`,
          animation: "lightSweep 5.2s ease-in-out infinite",
          filter: "blur(1px)",
        }}
      />
    </div>
  );
}
