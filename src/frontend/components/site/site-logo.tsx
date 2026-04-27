import Link from "next/link";

/**
 * WellMade brand monogram — WM in forest green with the right M block in gold.
 * Source: wellmade-rebuild (Illustrator-traced from brand-logo.png).
 */
export function SiteLogo({
  size = "default",
  href = "/",
}: {
  size?: "compact" | "default" | "large";
  href?: string;
}) {
  const markClass =
    size === "large" ? "h-16" : size === "compact" ? "h-8" : "h-10";
  const wordClass =
    size === "large"
      ? "text-[18px] tracking-[0.25em]"
      : size === "compact"
      ? "text-[11px] tracking-[0.22em]"
      : "text-[13px] tracking-[0.24em]";

  return (
    <Link
      href={href}
      aria-label="WellMade — home"
      className="group inline-flex select-none flex-col items-center gap-1 leading-none"
    >
      <svg
        viewBox="0 0 305 188"
        fill="none"
        aria-hidden
        className={`${markClass} w-auto`}
      >
        {/* W left leg — forest green */}
        <polygon
          fill="var(--brand-forest, #1F5E4B)"
          points="151.9,141 140.83,124 126.52,102 116.75,87 60.13,0 0,0 56.62,87 66.38,102 80.71,124 91.78,141 122.21,187.77 147.7,148.58 152.27,141.57"
        />
        {/* W right leg + M left chevron — forest green */}
        <polygon
          fill="var(--brand-forest, #1F5E4B)"
          points="238.63,87 217.95,55.24 213.2,47.94 182.01,0 121.3,0 177.92,87 182.85,94.57 187.61,101.87 187.69,102 187.53,102 173.2,124 162.14,141 157.02,148.87 152.45,155.88 173.2,187.77 177.77,180.75 203.64,141 208.35,133.75 214.7,124 219.38,116.81 229.03,102 238.7,87.12"
        />
        {/* M right block — gold */}
        <polygon
          fill="var(--brand-gold, #E9A820)"
          points="248.29,87 243.45,94.42 238.53,102 224.2,124 224.13,124.11 235.12,141 265.7,188 304.45,188 304.45,0.69"
        />
      </svg>
      <span className={`font-extrabold ${wordClass}`}>
        <span className="text-[color:var(--brand-forest)]">WELL</span>
        <span>&nbsp;</span>
        <span className="text-[color:var(--brand-gold)]">MADE</span>
      </span>
      <span className="sr-only">WellMade Store</span>
    </Link>
  );
}
