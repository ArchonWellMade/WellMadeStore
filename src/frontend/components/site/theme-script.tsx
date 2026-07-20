import Script from "next/script";

/**
 * Inline pre-paint script. Mounts in <head> and runs synchronously before
 * first paint to apply the user's theme (or auto-detected default), avoiding
 * FOUC. Auto = system prefers-color-scheme OR nighttime hours (<6am or ≥7pm).
 */
const SCRIPT = `(function(){try{var d=document.documentElement;var m=null;try{m=localStorage.getItem('theme')}catch(e){};if(m==='dark'){d.classList.add('dark');return}if(m==='light'){return}var sysDark=false;try{sysDark=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches}catch(e){};var h=new Date().getHours();var nightDark=h<6||h>=19;if(sysDark||nightDark){d.classList.add('dark')}}catch(e){}})();`;

export function ThemeScript() {
  // Next.js 16.2 + React 19 warn ("Encountered a script tag while rendering
  // React component") when an inline <script> is present in the render tree
  // on the client, even for beforeInteractive scripts that only need to
  // exist in the server-rendered HTML. Only render it during SSR; by the
  // time client-side React reconciles, the script has already run from the
  // initial HTML, so it's safe to return null on the client.
  if (typeof window !== "undefined") {
    return null;
  }

  return (
    <Script
      id="theme-script"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: SCRIPT }}
    />
  );
}
