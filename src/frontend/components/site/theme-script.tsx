import Script from "next/script";

/**
 * Inline pre-paint script. Mounts in <head> and runs synchronously before
 * first paint to apply the user's theme (or auto-detected default), avoiding
 * FOUC. Auto = system prefers-color-scheme OR nighttime hours (<6am or ≥7pm).
 */
const SCRIPT = `(function(){try{var d=document.documentElement;var m=null;try{m=localStorage.getItem('theme')}catch(e){};if(m==='dark'){d.classList.add('dark');return}if(m==='light'){return}var sysDark=false;try{sysDark=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches}catch(e){};var h=new Date().getHours();var nightDark=h<6||h>=19;if(sysDark||nightDark){d.classList.add('dark')}}catch(e){}})();`;

export function ThemeScript() {
  return (
    <Script id="theme-script" strategy="beforeInteractive">
      {SCRIPT}
    </Script>
  );
}
