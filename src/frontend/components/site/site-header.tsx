import Link from "next/link";
import { ShoppingBag, Search } from "lucide-react";
import { getCategories } from "@/shared/data/categories";
import { ScrollProgress } from "@/frontend/components/site/scroll-progress";
import { ThemeToggle } from "@/frontend/components/site/theme-toggle";

/** Shorter labels than the full category title, so the single-row nav doesn't wrap. */
const NAV_LABELS: Record<string, string> = {
  "high-speed-cars": "RC Cars",
  aeroplanes: "Planes",
  "power-boats": "Boats",
  "engineering-vehicles": "Engineering",
  "model-trains": "Trains",
  "tech-essentials": "Tech",
};

export async function SiteHeader() {
  const PRIMARY_NAV = await getCategories();
  return (
    <header className="sticky top-0 z-40 bg-[rgba(14,14,16,0.78)] backdrop-blur-xl supports-[backdrop-filter]:bg-[rgba(14,14,16,0.68)]">
      <ScrollProgress />
      <div className="mx-auto flex h-11 max-w-[1024px] items-center justify-between px-5 text-[#f5f5f7]">
        <Link
          href="/"
          aria-label="WellMade — home"
          className="inline-flex h-11 items-center gap-2 text-[#f5f5f7] transition-opacity hover:opacity-90"
        >
          <svg viewBox="0 0 305 188" fill="none" aria-hidden className="h-5 w-auto">
            <polygon
              fill="var(--brand-forest, #1F5E4B)"
              points="151.9,141 140.83,124 126.52,102 116.75,87 60.13,0 0,0 56.62,87 66.38,102 80.71,124 91.78,141 122.21,187.77 147.7,148.58 152.27,141.57"
            />
            <polygon
              fill="var(--brand-forest, #1F5E4B)"
              points="238.63,87 217.95,55.24 213.2,47.94 182.01,0 121.3,0 177.92,87 182.85,94.57 187.61,101.87 187.69,102 187.53,102 173.2,124 162.14,141 157.02,148.87 152.45,155.88 173.2,187.77 177.77,180.75 203.64,141 208.35,133.75 214.7,124 219.38,116.81 229.03,102 238.7,87.12"
            />
            <polygon
              fill="var(--brand-gold, #E9A820)"
              points="248.29,87 243.45,94.42 238.53,102 224.2,124 224.13,124.11 235.12,141 265.7,188 304.45,188 304.45,0.69"
            />
          </svg>
          <span className="text-[10.5px] font-extrabold uppercase tracking-[0.28em]">
            <span className="text-[color:var(--brand-forest,#1F5E4B)]">Well</span>
            <span>&nbsp;</span>
            <span className="text-[color:var(--brand-gold,#E9A820)]">Made</span>
            <span className="text-[#f5f5f7]/65">&nbsp;Store</span>
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden flex-1 items-center justify-center gap-0.5 lg:flex"
        >
          {PRIMARY_NAV.map((nav) => (
            <Link
              key={nav.slug}
              href={`/products?category=${nav.slug}`}
              className="flex h-11 items-center whitespace-nowrap px-2.5 text-[12px] font-normal text-[#f5f5f7]/75 transition-colors hover:text-[#f5f5f7]"
            >
              {NAV_LABELS[nav.slug] ?? nav.title}
            </Link>
          ))}
        </nav>

        <div className="flex h-11 items-center gap-0.5">
          <ThemeToggle />
          <Link
            href="/products"
            aria-label="Search"
            className="inline-flex h-11 w-9 items-center justify-center text-[#f5f5f7]/75 transition-colors hover:text-[#f5f5f7]"
          >
            <Search className="h-4 w-4" aria-hidden />
          </Link>
          <Link
            href="/products"
            aria-label="Cart"
            className="inline-flex h-11 w-9 items-center justify-center text-[#f5f5f7]/75 transition-colors hover:text-[#f5f5f7]"
          >
            <ShoppingBag className="h-4 w-4" aria-hidden />
          </Link>
          <details className="relative lg:hidden">
            <summary
              aria-label="Open menu"
              className="flex h-11 w-9 cursor-pointer list-none items-center justify-center text-[#f5f5f7]/75 transition-colors hover:text-[#f5f5f7] [&::-webkit-details-marker]:hidden"
            >
              <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4" aria-hidden>
                <path d="M2 4 H14 M2 8 H14 M2 12 H14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </summary>
            <div className="fixed inset-x-0 top-11 z-50 bg-[rgba(14,14,16,0.98)] backdrop-blur-xl">
              <nav className="mx-auto flex max-w-[1024px] flex-col gap-1 px-5 py-8">
                {PRIMARY_NAV.map((nav) => (
                  <Link
                    key={nav.slug}
                    href={`/products?category=${nav.slug}`}
                    className="font-display text-2xl font-500 tracking-apple-tight text-[#f5f5f7] transition-colors hover:text-[color:var(--brand-gold)]"
                  >
                    {nav.title}
                  </Link>
                ))}
                <div className="mt-6 border-t border-white/[0.08] pt-6">
                  <Link
                    href="/about"
                    className="block py-1 text-[14px] text-[#f5f5f7]/80 hover:text-[#f5f5f7]"
                  >
                    About
                  </Link>
                  <Link
                    href="/contact"
                    className="block py-1 text-[14px] text-[#f5f5f7]/80 hover:text-[#f5f5f7]"
                  >
                    Contact
                  </Link>
                </div>
              </nav>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
