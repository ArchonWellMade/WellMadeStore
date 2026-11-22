/**
 * Crops of the RC Adventure logo artwork (2172×724 source), so feature
 * sections use on-brand illustration instead of white-background product shots.
 * Each crop is defined in source pixels; CSS background math scales it to fit.
 */
// Served through Next's image optimizer (WebP, ~10× smaller than the raw 2.4 MB PNG).
const SRC = {
  w: 2172,
  h: 724,
  url: "/_next/image?url=%2Fbrand%2Frc-adventure-logo.png&w=2048&q=75",
};

const CROPS = {
  /** Excavator + bulldozer, top-right of the logo. */
  machines: { x: 1330, y: 0, w: 842, h: 345 },
  /** Green buggy kicking up dirt, top-centre of the logo. */
  buggy: { x: 905, y: 100, w: 450, h: 255 },
  /** Mountain range behind everything. */
  mountains: { x: 560, y: 0, w: 1100, h: 230 },
} as const;

const FEATHER_MASK =
  "linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 12%, black 78%, transparent 100%)";
const FEATHER = {
  maskImage: FEATHER_MASK,
  WebkitMaskImage: FEATHER_MASK,
  maskComposite: "intersect",
  WebkitMaskComposite: "source-in",
} as const;

export type LogoArtCrop = keyof typeof CROPS;

export function LogoArt({
  crop,
  className = "",
  label,
  soft = true,
}: {
  crop: LogoArtCrop;
  className?: string;
  label?: string;
  /** Feather edges with a radial mask (default on). */
  soft?: boolean;
}) {
  const c = CROPS[crop];
  const size = `${(SRC.w / c.w) * 100}% auto`;
  const posX = c.w >= SRC.w ? 0 : (c.x / (SRC.w - c.w)) * 100;
  const posY = c.h >= SRC.h ? 0 : (c.y / (SRC.h - c.h)) * 100;
  return (
    <div
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={className}
      style={{
        aspectRatio: `${c.w} / ${c.h}`,
        backgroundImage: `url(${SRC.url})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: size,
        backgroundPosition: `${posX}% ${posY}%`,
        // Feather the edges so the crop melts into the page instead of reading as a pasted box.
        ...(soft ? FEATHER : {}),
      }}
    />
  );
}
