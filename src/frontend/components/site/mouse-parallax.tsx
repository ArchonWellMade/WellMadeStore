"use client";

import { useEffect } from "react";

type Props = {
  /** CSS selector for the root element. Children with [data-depth] within it
   * will be parallaxed relative to its bounding box. */
  rootSelector?: string;
  /** Max translate in px when cursor is at a corner of the root */
  maxShift?: number;
};

/**
 * Behavior-only client component (renders nothing).
 * Tracks cursor position and translates `[data-depth]` elements within the
 * root proportionally. Higher data-depth → larger shift. rAF-throttled.
 * Touch/coarse-pointer devices and prefers-reduced-motion: no-op.
 */
export function MouseParallax({
  rootSelector = "[data-mouse-parallax-root]",
  maxShift = 28,
}: Props) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia?.("(pointer: coarse)").matches) return;

    const root = document.querySelector(rootSelector) as HTMLElement | null;
    if (!root) return;

    const layers = Array.from(
      root.querySelectorAll<HTMLElement>("[data-depth]"),
    );
    if (layers.length === 0) return;

    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;
    let active = false;

    const tick = () => {
      curX += (targetX - curX) * 0.08;
      curY += (targetY - curY) * 0.08;
      for (const layer of layers) {
        const depth = parseFloat(layer.dataset.depth || "0");
        const tx = -curX * depth * maxShift;
        const ty = -curY * depth * maxShift;
        layer.style.setProperty("--mp-x", `${tx.toFixed(2)}px`);
        layer.style.setProperty("--mp-y", `${ty.toFixed(2)}px`);
      }
      if (
        Math.abs(curX - targetX) > 0.001 ||
        Math.abs(curY - targetY) > 0.001
      ) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    };

    const onMove = (e: MouseEvent) => {
      const rect = root.getBoundingClientRect();
      // If cursor is outside the root's vertical span, don't update
      if (e.clientY < rect.top - 50 || e.clientY > rect.bottom + 50) return;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      targetX = (e.clientX - cx) / (rect.width / 2);
      targetY = (e.clientY - cy) / (rect.height / 2);
      // Clamp to [-1, 1]
      if (targetX < -1) targetX = -1;
      if (targetX > 1) targetX = 1;
      if (targetY < -1) targetY = -1;
      if (targetY > 1) targetY = 1;
      active = true;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onLeave = () => {
      if (!active) return;
      targetX = 0;
      targetY = 0;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    // Initialize layers with neutral values
    for (const layer of layers) {
      layer.style.setProperty("--mp-x", "0px");
      layer.style.setProperty("--mp-y", "0px");
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
      for (const layer of layers) {
        layer.style.removeProperty("--mp-x");
        layer.style.removeProperty("--mp-y");
      }
    };
  }, [rootSelector, maxShift]);

  return null;
}
