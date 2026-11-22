import Link from "next/link";
import type { Track } from "@/shared/data/tracks";

/** Line-art map of each track layout, drawn in a 400×220 box. */
function TrackArt({ slug }: { slug: string }) {
  const common = {
    fill: "none",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (slug) {
    case "dirt-rally-circuit":
      return (
        <>
          <path {...common} stroke="rgba(233,168,32,0.22)" strokeWidth="26"
            d="M70 160 C40 160 30 110 60 90 C100 62 140 120 190 96 C240 72 220 40 270 40 C330 40 370 70 360 120 C352 168 300 178 250 170 C190 160 130 160 70 160 Z" />
          <path {...common} stroke="var(--brand-gold)" strokeWidth="2" strokeDasharray="10 8"
            d="M70 160 C40 160 30 110 60 90 C100 62 140 120 190 96 C240 72 220 40 270 40 C330 40 370 70 360 120 C352 168 300 178 250 170 C190 160 130 160 70 160 Z" />
          <path {...common} stroke="#f5f5f7" strokeWidth="2" d="M150 152 l12 -14 l12 14" />
          <path {...common} stroke="#f5f5f7" strokeWidth="2" d="M300 52 l10 -12 l10 12" />
          {/* chequered start line */}
          {[0, 1, 2, 3].map((r) => (
            <rect key={r} x={r % 2 ? 98 : 92} y={148 + r * 6} width="6" height="6" fill="#f5f5f7" />
          ))}
        </>
      );
    case "dig-site":
      return (
        <>
          <path {...common} stroke="rgba(233,168,32,0.25)" strokeWidth="2" d="M20 185 H380" />
          <path {...common} stroke="var(--brand-gold)" strokeWidth="2"
            d="M20 185 C60 185 70 130 110 130 C150 130 155 185 190 185 L215 185 L225 205 L285 205 L295 185 C320 185 330 150 360 150 C372 150 380 160 380 170" />
          <path {...common} stroke="#f5f5f7" strokeWidth="2"
            d="M250 120 L250 90 L290 70 L330 110" />
          <path {...common} stroke="#f5f5f7" strokeWidth="2" d="M322 104 L340 126 L326 134 Z" />
          <rect x="228" y="120" width="44" height="22" rx="3" {...common} stroke="#f5f5f7" strokeWidth="2" />
          <path {...common} stroke="#f5f5f7" strokeWidth="2" d="M224 150 H276 M224 158 H276" />
          <circle cx="232" cy="154" r="4" {...common} stroke="#f5f5f7" strokeWidth="2" />
          <circle cx="268" cy="154" r="4" {...common} stroke="#f5f5f7" strokeWidth="2" />
          <path {...common} stroke="rgba(245,245,247,0.35)" strokeWidth="1.5" strokeDasharray="4 6" d="M60 175 C90 160 120 160 150 175" />
        </>
      );
    case "rock-crawler-trail":
      return (
        <>
          <path {...common} stroke="rgba(233,168,32,0.22)" strokeWidth="2"
            d="M10 190 L70 120 L110 150 L170 60 L230 140 L270 100 L330 160 L390 120" />
          <path {...common} stroke="var(--brand-gold)" strokeWidth="2"
            d="M20 200 C60 200 70 170 100 172 C130 174 130 150 160 150 C190 150 190 175 220 172 C250 169 255 140 290 140 C320 140 330 165 380 162" />
          <ellipse cx="100" cy="182" rx="18" ry="9" {...common} stroke="#f5f5f7" strokeWidth="2" />
          <ellipse cx="220" cy="182" rx="24" ry="11" {...common} stroke="#f5f5f7" strokeWidth="2" />
          <ellipse cx="330" cy="178" rx="14" ry="8" {...common} stroke="#f5f5f7" strokeWidth="2" />
          <path {...common} stroke="rgba(120,180,255,0.6)" strokeWidth="2" d="M150 205 C170 198 190 212 210 205 C230 198 250 212 270 205" />
        </>
      );
    default:
      return (
        <>
          <path {...common} stroke="rgba(233,168,32,0.22)" strokeWidth="26"
            d="M200 110 C240 60 330 60 330 110 C330 160 240 160 200 110 C160 60 70 60 70 110 C70 160 160 160 200 110 Z" />
          <path {...common} stroke="var(--brand-gold)" strokeWidth="2" strokeDasharray="10 8"
            d="M200 110 C240 60 330 60 330 110 C330 160 240 160 200 110 C160 60 70 60 70 110 C70 160 160 160 200 110 Z" />
          <circle cx="130" cy="110" r="5" fill="#f5f5f7" />
          <circle cx="270" cy="110" r="5" fill="#f5f5f7" />
          <path {...common} stroke="rgba(245,245,247,0.35)" strokeWidth="1.5" d="M110 72 c-10 4 -14 10 -16 18" />
          <path {...common} stroke="rgba(245,245,247,0.35)" strokeWidth="1.5" d="M290 148 c10 -4 14 -10 16 -18" />
        </>
      );
  }
}

export function TrackCard({
  track,
  index,
  href,
}: {
  track: Track;
  index: number;
  /** When set, the whole card links here. */
  href?: string;
}) {
  const body = (
    <article
      id={href ? undefined : track.slug}
      className="group relative flex h-full scroll-mt-24 flex-col overflow-hidden rounded-[28px] border border-white/[0.08] bg-[linear-gradient(160deg,#1a1b1f_0%,#111214_60%,#0c0d0e_100%)] text-white transition-colors duration-500 hover:border-[color:var(--brand-gold)]/40"
    >
      {/* Art panel */}
      <div className="relative aspect-[400/220] overflow-hidden border-b border-white/[0.06]">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 0%, rgba(233,168,32,0.18), transparent 55%), radial-gradient(circle at 100% 100%, rgba(42,122,99,0.35), transparent 60%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <svg
          viewBox="0 0 400 220"
          aria-hidden
          className="absolute inset-0 h-full w-full p-4 transition-transform duration-700 group-hover:scale-[1.04]"
        >
          <TrackArt slug={track.slug} />
        </svg>
        <span
          aria-hidden
          className="absolute right-5 top-3 font-display text-[64px] font-600 leading-none text-white/[0.07]"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="absolute left-5 top-5 text-[10px] font-semibold uppercase tracking-[0.3em] text-[color:var(--brand-gold)]">
          Track {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Copy */}
      <div className="flex flex-1 flex-col p-7">
        <h3 className="font-display text-[28px] font-500 leading-tight tracking-apple-tight">
          {track.name}
        </h3>
        <p className="mt-1.5 text-[14px] font-medium text-[color:var(--brand-gold)]">
          {track.tagline}
        </p>
        <p className="mt-4 text-[14px] leading-relaxed text-white/60">{track.description}</p>
        <div className="mt-auto flex flex-wrap gap-x-4 gap-y-1.5 pt-6 text-[12px] uppercase tracking-[0.14em] text-white/45">
          {track.machines.map((m) => (
            <span key={m}>{m}</span>
          ))}
        </div>
        {href ? (
          <span className="mt-6 inline-flex items-center gap-2 text-[13px] font-semibold text-white">
            Explore track
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </span>
        ) : (
          <ul className="mt-6 flex flex-wrap gap-2 border-t border-white/[0.08] pt-6">
            {track.features.map((f) => (
              <li
                key={f}
                className="rounded-full border border-white/15 px-3 py-1 text-[12px] text-white/80"
              >
                {f}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );

  return href ? (
    <Link href={href} className="block h-full rounded-[28px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--brand-gold)]">
      {body}
    </Link>
  ) : (
    body
  );
}
