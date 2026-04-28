"use client";

import { useEffect, useState } from "react";
import { Sun, Moon, SunMoon } from "lucide-react";

type ThemeMode = "light" | "dark" | "auto";

const STORAGE_KEY = "theme";

function applyMode(mode: ThemeMode) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  if (mode === "auto") {
    const sysDark =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    const hour = new Date().getHours();
    const nightDark = hour < 6 || hour >= 19;
    root.classList.toggle("dark", Boolean(sysDark || nightDark));
  } else {
    root.classList.toggle("dark", mode === "dark");
  }
}

export function ThemeToggle() {
  // Render-deterministic default until mount; avoids hydration mismatch
  const [mode, setMode] = useState<ThemeMode>("auto");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    let saved: ThemeMode = "auto";
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      if (v === "light" || v === "dark" || v === "auto") saved = v;
    } catch {
      // ignore
    }
    setMode(saved);
    setMounted(true);
    applyMode(saved);

    // Keep auto in sync with system preference changes
    const mq = window.matchMedia?.("(prefers-color-scheme: dark)");
    const onChange = () => {
      try {
        const cur =
          (localStorage.getItem(STORAGE_KEY) as ThemeMode | null) ?? "auto";
        if (cur === "auto") applyMode("auto");
      } catch {
        // ignore
      }
    };
    mq?.addEventListener?.("change", onChange);
    return () => mq?.removeEventListener?.("change", onChange);
  }, []);

  const cycle = () => {
    const next: ThemeMode =
      mode === "light" ? "dark" : mode === "dark" ? "auto" : "light";
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
    setMode(next);
    applyMode(next);
  };

  const next = mode === "light" ? "Dark" : mode === "dark" ? "Auto" : "Light";
  const label = `Theme: ${mode}. Switch to ${next}.`;
  const Icon = mode === "light" ? Sun : mode === "dark" ? Moon : SunMoon;

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={label}
      title={label}
      // Suppress hydration mismatch warning since the icon depends on
      // localStorage / system preference which the server can't know.
      suppressHydrationWarning
      className="inline-flex h-11 w-9 items-center justify-center text-[#f5f5f7]/75 transition-colors hover:text-[#f5f5f7]"
    >
      {mounted ? (
        <Icon className="h-4 w-4" aria-hidden />
      ) : (
        <SunMoon className="h-4 w-4" aria-hidden />
      )}
    </button>
  );
}
