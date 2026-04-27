/**
 * Hero atmospheric scene — pure-CSS layered effects (no centerpiece illustration).
 * Provides the perspective track grid, scan-line sweep, light flares, speed
 * lines, and a tachometer HUD. The hero photograph and headline live in hero.tsx.
 */
export function HeroScene() {
  return (
    <div aria-hidden className="hero-scene">
      {/* Perspective track with scrolling stripes */}
      <div className="hero-track" />

      {/* Soft scan-line sweep over the whole stage */}
      <div className="hero-scan" />

      {/* Ambient light flares */}
      <div
        className="absolute left-[18%] top-[28%] h-72 w-72 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(233,168,32,0.45) 0%, transparent 70%)",
          animation: "glowPulse 3.2s ease-in-out infinite",
        }}
      />
      <div
        className="absolute right-[14%] top-[36%] h-80 w-80 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(120,180,255,0.35) 0%, transparent 70%)",
          animation: "glowPulse 4.8s ease-in-out infinite",
        }}
      />

      {/* Speed lines streaking across */}
      <div className="hero-speedlines">
        <span /><span /><span /><span /><span /><span />
      </div>

      {/* Tachometer HUD bottom-right — data-depth makes it parallax with cursor */}
      <div
        data-depth="0.7"
        className="absolute bottom-6 right-6 hidden flex-col items-end gap-1 sm:flex"
        style={{
          transform: "translate3d(var(--mp-x, 0px), var(--mp-y, 0px), 0)",
          willChange: "transform",
        }}
      >
        <svg viewBox="0 0 132 132" className="hero-tach">
          <circle cx="66" cy="66" r="58" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
          <path
            d="M 22 92 A 56 56 0 1 1 110 92"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            className="arc-glow"
            d="M 80 22 A 56 56 0 0 1 110 92"
            fill="none"
            stroke="#E9A820"
            strokeWidth="6"
            strokeLinecap="round"
          />
          {Array.from({ length: 11 }).map((_, i) => {
            const angle = -210 + i * 24;
            const a = (angle * Math.PI) / 180;
            const x1 = 66 + Math.cos(a) * 50;
            const y1 = 66 + Math.sin(a) * 50;
            const x2 = 66 + Math.cos(a) * 56;
            const y2 = 66 + Math.sin(a) * 56;
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="rgba(255,255,255,0.6)"
                strokeWidth={i >= 8 ? 2.5 : 1.5}
              />
            );
          })}
          <g className="needle">
            <rect x="64.5" y="22" width="3" height="46" rx="1.5" fill="#E9A820" />
            <circle cx="66" cy="68" r="6" fill="#0a0a0c" stroke="#E9A820" strokeWidth="2" />
          </g>
          <circle cx="66" cy="68" r="2.5" fill="#E9A820" />
          <text
            x="66"
            y="106"
            textAnchor="middle"
            fontFamily="ui-sans-serif"
            fontSize="9"
            fontWeight="700"
            letterSpacing="2"
            fill="rgba(255,255,255,0.65)"
          >
            RPM × 1000
          </text>
        </svg>
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/55">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--brand-gold)] [animation:glowPulse_1.4s_ease-in-out_infinite]" />
          Live telemetry
        </div>
      </div>
    </div>
  );
}
