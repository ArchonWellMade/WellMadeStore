/**
 * Hero cinematic treatment — minimal overlays that enhance the looping video
 * rather than competing with it. Letterbox bars, soft vignette, film grain,
 * one quiet ambient light. No HUD, no track grid, no speed lines.
 */
export function HeroScene() {
  return (
    <div aria-hidden className="hero-scene">
      {/* Cinematic letterbox bars — top + bottom thin gradient frames */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/55 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/65 to-transparent" />

      {/* Soft vignette — edges fade to graphite, focus on center */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(14,14,16,0.55)_85%,_rgba(14,14,16,0.85)_100%)]" />

      {/* One ambient gold light, low opacity, very slow pulse */}
      <div
        className="pointer-events-none absolute left-1/2 top-[58%] h-[44vh] w-[80vw] -translate-x-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse, rgba(233,168,32,0.10) 0%, transparent 70%)",
          animation: "glowPulse 6.4s ease-in-out infinite",
        }}
      />

      {/* Film grain — fine SVG noise, multiply blend for filmic texture */}
      <div className="hero-grain pointer-events-none absolute inset-0 opacity-[0.16] mix-blend-overlay" />
    </div>
  );
}
