/**
 * Next.js 16.2 + React 19 emit a false-positive dev warning ("Encountered a
 * script tag while rendering React component...") whenever an inline
 * `beforeInteractive` <Script> is present in the render tree — even though
 * the script is required (and works correctly) to set the theme class
 * before first paint and avoid a flash of the wrong theme. This is a known,
 * still-unresolved upstream regression (see next-themes#385, shadcn/ui#10200,
 * heroui#6348) that also affects next-themes and other theme libraries.
 *
 * Since the warning is cosmetic — functionality is unaffected — we filter
 * this one specific message out of the dev console/error overlay. Only
 * active in development; production builds don't emit this warning at all.
 */
type PatchableConsoleError = typeof console.error & {
  __scriptWarningPatched?: boolean;
};

if (process.env.NODE_ENV === "development" && typeof console !== "undefined") {
  const originalError = console.error as PatchableConsoleError;

  if (!originalError.__scriptWarningPatched) {
    const patchedError: PatchableConsoleError = (...args: unknown[]) => {
      const first = args[0];
      if (
        typeof first === "string" &&
        first.includes("Encountered a script tag while rendering React component")
      ) {
        return;
      }
      originalError(...(args as []));
    };
    patchedError.__scriptWarningPatched = true;
    console.error = patchedError;
  }
}

export {};
