"use client";

import React, { useEffect, useRef, useState, type HTMLAttributes, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  delayMs?: number;
  offsetY?: number;
  as?: "div" | "section" | "article" | "header" | "footer";
} & HTMLAttributes<HTMLDivElement>;

export function ScrollReveal({
  children,
  delayMs = 0,
  offsetY = 24,
  as = "div",
  className = "",
  style,
  ...rest
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      queueMicrotask(() => setVisible(true));
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return React.createElement(
    as,
    {
      ref,
      className,
      style: {
        transitionProperty: "opacity, transform",
        transitionDuration: "700ms",
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        transitionDelay: `${delayMs}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : `translateY(${offsetY}px)`,
        willChange: "opacity, transform",
        ...style,
      },
      ...rest,
    },
    children,
  );
}
