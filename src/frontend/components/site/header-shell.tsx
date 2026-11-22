"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/** Pages whose top section is dark, so the header can sit transparently over it. */
const OVERLAY_PATHS = new Set(["/", "/tracks"]);

/**
 * Fixed header that is fully transparent over the hero on overlay pages and
 * turns solid once the page scrolls. Other pages get a solid header plus a
 * spacer so content isn't hidden underneath it.
 */
export function HeaderShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const overlay = OVERLAY_PATHS.has(pathname);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    const raf = requestAnimationFrame(onScroll); // sync with a page restored mid-scroll
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const transparent = overlay && !scrolled;

  return (
    <>
      <header
        data-transparent={transparent || undefined}
        className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-500 ${
          transparent
            ? "border-b border-transparent bg-gradient-to-b from-black/50 to-transparent"
            : "border-b border-white/[0.06] bg-[rgba(10,10,12,0.85)] backdrop-blur-xl"
        }`}
      >
        {children}
      </header>
      {overlay ? null : <div aria-hidden className="h-20 lg:h-28" />}
    </>
  );
}
