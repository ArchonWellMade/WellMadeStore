"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  text: string;
  className?: string;
  /** ms between each letter's animation start */
  stepMs?: number;
  /** delay before the first letter starts animating (ms) */
  delayMs?: number;
  /** start the reveal as soon as mounted, instead of on intersect */
  triggerOnMount?: boolean;
};

export function LetterReveal({
  text,
  className = "",
  stepMs = 40,
  delayMs = 0,
  triggerOnMount = false,
}: Props) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (triggerOnMount) {
      queueMicrotask(() => setRevealed(true));
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          io.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [triggerOnMount]);

  // Split into words first so word-breaks survive; each word holds its letters.
  const words = text.split(" ");
  let charIndex = 0;

  return (
    <span
      ref={ref}
      data-letters
      data-revealed={revealed ? "true" : "false"}
      className={className}
      aria-label={text}
    >
      {words.map((word, wi) => (
        <span
          key={`${word}-${wi}`}
          aria-hidden
          className="inline-block whitespace-nowrap"
        >
          {Array.from(word).map((ch, ci) => {
            const i = charIndex++;
            return (
              <span
                key={`${ch}-${ci}-${i}`}
                style={{ animationDelay: `${delayMs + i * stepMs}ms` }}
              >
                {ch}
              </span>
            );
          })}
          {wi < words.length - 1 ? (
            <span
              key={`space-${wi}`}
              style={{ animationDelay: `${delayMs + charIndex++ * stepMs}ms` }}
            >
              {" "}
            </span>
          ) : null}
        </span>
      ))}
    </span>
  );
}
