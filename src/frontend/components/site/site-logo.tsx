import Link from "next/link";

export function SiteLogo({
  size = "default",
  href = "/",
}: {
  size?: "compact" | "default" | "large";
  href?: string;
}) {
  const markClass =
    size === "large" ? "h-12" : size === "compact" ? "h-6" : "h-8";
  const wordClass =
    size === "large"
      ? "text-[15px] tracking-[0.28em]"
      : size === "compact"
      ? "text-[10px] tracking-[0.24em]"
      : "text-[11px] tracking-[0.26em]";

  return (
    <Link
      href={href}
      aria-label="WellMadeStore — home"
      className="group inline-flex select-none items-center gap-2 leading-none"
    >
      {/* Throttle / chevron mark — abstract RC speed glyph */}
      <svg
        viewBox="0 0 56 56"
        fill="none"
        aria-hidden
        className={`${markClass} w-auto`}
      >
        <path
          d="M6 38 L22 18 L30 28 L40 14 L50 14 L36 32 L28 22 L18 36 Z"
          fill="currentColor"
        />
        <circle cx="46" cy="42" r="4" fill="var(--brand-ignition, #FF5A1F)" />
      </svg>
      <span className={`font-extrabold uppercase ${wordClass}`}>
        WellMade<span className="text-[color:var(--brand-ignition,#FF5A1F)]">Store</span>
      </span>
    </Link>
  );
}
