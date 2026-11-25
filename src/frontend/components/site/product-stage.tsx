"use client";

import Image from "next/image";
import { ViewTransition, useRef, useState, type PointerEvent } from "react";

/** Large product image with an entrance animation and hover-to-zoom lens. */
export function ProductStage({
  name,
  src,
  alt,
  photo,
  studioClass,
}: {
  /** Shared view-transition name, matching the product card. */
  name: string;
  src: string;
  alt: string;
  photo: boolean;
  studioClass: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");

  function onMove(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setOrigin(`${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`);
    setZoom(true);
  }

  return (
    <ViewTransition name={name} share="morph" default="none">
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={() => setZoom(false)}
      className={`group/stage relative aspect-square w-full cursor-zoom-in overflow-hidden rounded-[32px] border border-white/10 shadow-[0_50px_100px_-40px_rgba(0,0,0,0.9)] ${
        photo ? "bg-[#1a1b1f]" : studioClass
      }`}
    >
      {/* The zoom layer carries its own backdrop: its transform makes a new
          stacking context, and the cut-out's white must multiply against it. */}
      <div
        className={`absolute inset-0 transition-transform duration-500 ease-out ${photo ? "" : studioClass}`}
        style={{ transformOrigin: origin, transform: zoom ? "scale(1.8)" : "scale(1)" }}
      >
        {!photo ? (
          <span
            aria-hidden
            className={`absolute bottom-[10%] left-1/2 h-[6%] w-[58%] -translate-x-1/2 rounded-[50%] bg-black/25 blur-lg transition-opacity duration-500 ${zoom ? "opacity-0" : ""}`}
          />
        ) : null}
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 640px"
          className={photo ? "object-cover" : `object-contain p-[8%] mix-blend-multiply ${zoom ? "" : "product-float"}`}
        />
      </div>
      <span
        className={`pointer-events-none absolute bottom-5 left-5 hidden items-center gap-2 rounded-full bg-[#0a0a0c]/75 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80 backdrop-blur-md transition-opacity duration-300 lg:inline-flex ${
          zoom ? "opacity-0" : ""
        }`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--brand-gold)]" />
        Hover to zoom
      </span>
    </div>
    </ViewTransition>
  );
}
