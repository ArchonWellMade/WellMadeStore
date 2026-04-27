/**
 * Pure-CSS animated hero scene: drifting RC buggy with spinning wheels,
 * smoke plume, headlight beam, scrolling track, speed lines, and a
 * tachometer HUD. No JS, all keyframes in globals.css.
 */
export function HeroScene() {
  return (
    <div aria-hidden className="hero-scene">
      {/* Perspective track with scrolling stripes */}
      <div className="hero-track" />

      {/* Soft scan-line sweep over the whole stage */}
      <div className="hero-scan" />

      {/* Ambient light flares */}
      <div className="absolute left-[18%] top-[28%] h-72 w-72 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(255,90,31,0.45) 0%, transparent 70%)",
          animation: "glowPulse 3.2s ease-in-out infinite",
        }}
      />
      <div className="absolute right-[14%] top-[36%] h-80 w-80 rounded-full blur-3xl"
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

      {/* Headlight beam pool on the ground */}
      <div className="hero-headlight-beam" />

      {/* Smoke plume trailing from the rear */}
      <div className="hero-smoke">
        <span /><span /><span /><span /><span /><span />
      </div>

      {/* The buggy itself */}
      <div className="hero-buggy-wrap">
        <svg viewBox="0 0 600 240" className="hero-buggy w-full">
          {/* Ground shadow */}
          <ellipse cx="300" cy="218" rx="230" ry="11" fill="rgba(0,0,0,0.55)" />

          {/* Chassis bottom plate */}
          <path
            d="M 70 158 Q 110 138 170 138 L 460 138 Q 520 138 540 158 L 540 184 L 50 184 Z"
            fill="#16161a"
          />

          {/* Suspension arms */}
          <line x1="170" y1="170" x2="220" y2="170" stroke="#3a3a3d" strokeWidth="3" />
          <line x1="430" y1="170" x2="490" y2="170" stroke="#3a3a3d" strokeWidth="3" />

          {/* Main body — ignition orange */}
          <path
            d="M 130 116 Q 175 72 270 66 L 410 66 Q 480 70 510 138 L 130 138 Z"
            fill="#FF5A1F"
          />
          {/* Body highlight */}
          <path
            d="M 145 110 Q 190 80 270 76 L 410 76 Q 470 82 495 124"
            fill="none"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Cockpit / canopy */}
          <path
            d="M 220 66 Q 250 28 320 24 L 380 24 Q 410 28 420 66 Z"
            fill="#0a0a0c"
          />
          {/* Cockpit reflection */}
          <path
            d="M 240 56 Q 270 32 320 30"
            fill="none"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Side intake / livery accent */}
          <path
            d="M 310 100 L 370 100 L 360 122 L 300 122 Z"
            fill="#0a0a0c"
          />
          <text
            x="335"
            y="116"
            fontFamily="ui-sans-serif"
            fontSize="10"
            fontWeight="800"
            letterSpacing="2"
            textAnchor="middle"
            fill="#FF5A1F"
          >
            APEX
          </text>

          {/* Rear wing */}
          <rect x="478" y="46" width="62" height="6" rx="2" fill="#FF5A1F" />
          <rect x="500" y="52" width="4" height="44" fill="#1a1a1d" />
          <rect x="528" y="52" width="4" height="44" fill="#1a1a1d" />

          {/* Antenna */}
          <line x1="450" y1="32" x2="458" y2="-12" stroke="#FF5A1F" strokeWidth="2" />
          <circle cx="458" cy="-12" r="3" fill="#FF5A1F" />

          {/* Wheel wells (so wheels look recessed) */}
          <circle cx="180" cy="178" r="58" fill="#050506" />
          <circle cx="440" cy="178" r="58" fill="#050506" />

          {/* Front wheel — animated */}
          <g className="wheel" style={{ transformOrigin: "180px 178px" }}>
            <circle cx="180" cy="178" r="50" fill="#0a0a0c" stroke="#3a3a3d" strokeWidth="3" />
            <circle cx="180" cy="178" r="22" fill="#FF5A1F" />
            <circle cx="180" cy="178" r="6"  fill="#16161a" />
            {/* Spokes */}
            <line x1="180" y1="156" x2="180" y2="200" stroke="#1a1a1d" strokeWidth="3" />
            <line x1="158" y1="178" x2="202" y2="178" stroke="#1a1a1d" strokeWidth="3" />
            <line x1="164" y1="162" x2="196" y2="194" stroke="#1a1a1d" strokeWidth="3" />
            <line x1="196" y1="162" x2="164" y2="194" stroke="#1a1a1d" strokeWidth="3" />
            {/* Tread highlights */}
            <path d="M 180 130 A 48 48 0 0 1 224 162" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="2" />
          </g>

          {/* Rear wheel — animated */}
          <g className="wheel" style={{ transformOrigin: "440px 178px" }}>
            <circle cx="440" cy="178" r="50" fill="#0a0a0c" stroke="#3a3a3d" strokeWidth="3" />
            <circle cx="440" cy="178" r="22" fill="#FF5A1F" />
            <circle cx="440" cy="178" r="6"  fill="#16161a" />
            <line x1="440" y1="156" x2="440" y2="200" stroke="#1a1a1d" strokeWidth="3" />
            <line x1="418" y1="178" x2="462" y2="178" stroke="#1a1a1d" strokeWidth="3" />
            <line x1="424" y1="162" x2="456" y2="194" stroke="#1a1a1d" strokeWidth="3" />
            <line x1="456" y1="162" x2="424" y2="194" stroke="#1a1a1d" strokeWidth="3" />
            <path d="M 440 130 A 48 48 0 0 1 484 162" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="2" />
          </g>

          {/* Headlights */}
          <ellipse cx="118" cy="108" rx="11" ry="7" fill="#fff7c0" />
          <ellipse cx="118" cy="108" rx="5" ry="3" fill="#ffffff" />
          {/* Brake light glow */}
          <rect x="498" y="108" width="14" height="6" rx="1" fill="#ff2820" opacity="0.85" />
        </svg>
      </div>

      {/* Tachometer HUD bottom-right */}
      <div className="absolute bottom-6 right-6 hidden flex-col items-end gap-1 sm:flex">
        <svg viewBox="0 0 132 132" className="hero-tach">
          {/* Outer ring */}
          <circle cx="66" cy="66" r="58" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
          {/* Tick arc background */}
          <path
            d="M 22 92 A 56 56 0 1 1 110 92"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="6"
            strokeLinecap="round"
          />
          {/* Redline glow arc */}
          <path
            className="arc-glow"
            d="M 80 22 A 56 56 0 0 1 110 92"
            fill="none"
            stroke="#FF5A1F"
            strokeWidth="6"
            strokeLinecap="round"
          />
          {/* Tick marks */}
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
          {/* Needle (pivots from bottom of its bbox) */}
          <g className="needle">
            <rect x="64.5" y="22" width="3" height="46" rx="1.5" fill="#FF5A1F" />
            <circle cx="66" cy="68" r="6" fill="#0a0a0c" stroke="#FF5A1F" strokeWidth="2" />
          </g>
          {/* Center cap */}
          <circle cx="66" cy="68" r="2.5" fill="#FF5A1F" />
          {/* Label */}
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
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--brand-ignition)] [animation:glowPulse_1.4s_ease-in-out_infinite]" />
          Live telemetry
        </div>
      </div>
    </div>
  );
}
