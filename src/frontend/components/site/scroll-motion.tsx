"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

const reduced = () =>
  typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/** Fades + slides in when scrolled into view, and back out when scrolled away. */
export function FadeInOut({
  children,
  delayMs = 0,
  from = "up",
  className = "",
}: {
  children: ReactNode;
  delayMs?: number;
  from?: "right" | "left" | "up";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced()) {
      queueMicrotask(() => setShown(true));
      return;
    }
    const io = new IntersectionObserver(([e]) => setShown(e.isIntersecting), {
      threshold: 0.15,
      rootMargin: "-4% 0px -4% 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const hidden =
    from === "right" ? "translate3d(70px,0,0)" : from === "left" ? "translate3d(-70px,0,0)" : "translate3d(0,46px,0)";

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translate3d(0,0,0) scale(1)" : `${hidden} scale(0.97)`,
        filter: shown ? "blur(0)" : "blur(6px)",
        transition:
          "opacity 800ms cubic-bezier(0.22,1,0.36,1), transform 900ms cubic-bezier(0.22,1,0.36,1), filter 800ms ease",
        transitionDelay: shown ? `${delayMs}ms` : "0ms",
        willChange: "opacity, transform, filter",
      }}
    >
      {children}
    </div>
  );
}

/** Scroll-linked depth: the element drifts, tilts and fades as the page scrolls past it. */
export function ScrollFloat({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [p, setP] = useState(0); // 0 = centred in view, 1 = scrolled a screen past

  useEffect(() => {
    if (reduced()) return;
    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const centre = r.top + r.height / 2 - window.innerHeight / 2;
        setP(Math.max(-1, Math.min(1, -centre / window.innerHeight)));
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const out = Math.max(0, p); // only fade/tilt once it starts leaving upwards
  return (
    <div ref={ref} className={`[perspective:1400px] ${className}`}>
      <div
        style={{
          transform: `translate3d(0, ${p * 60}px, 0) rotateX(${out * 8}deg) scale(${1 - out * 0.06})`,
          opacity: 1 - out * 0.55,
          transformOrigin: "50% 100%",
          willChange: "transform, opacity",
        }}
      >
        {children}
      </div>
    </div>
  );
}
