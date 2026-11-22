import Image from "next/image";
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
          aria-label="RC Adventure — home"
          className="inline-flex h-11 shrink-0 items-center gap-2 text-[#f5f5f7] transition-opacity hover:opacity-90"
        >
          <Image
            src="/brand/rc-adventure-logo.png"
            alt=""
            width={2172}
            height={724}
            priority
            sizes="120px"
            className="h-9 w-auto"
          />
          <span className="hidden text-[11px] font-extrabold uppercase tracking-[0.22em] sm:inline">
            <span className="text-[color:var(--brand-forest-light,#2A7A63)]">RC</span>
            <span>&nbsp;</span>
            <span className="text-[color:var(--brand-gold,#E9A820)]">Adventure</span>
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden flex-1 items-center justify-center gap-0.5 lg:flex"
        >
          <Link
            href="/tracks"
            className="flex h-11 items-center whitespace-nowrap px-2.5 text-[12px] font-semibold text-[color:var(--brand-gold)] transition-colors hover:text-[#f5f5f7]"
          >
            Tracks
          </Link>
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
          <Link
            href="/contact"
            className="mr-1 hidden h-7 items-center rounded-full bg-[color:var(--brand-gold)] px-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#0E0E10] transition-transform hover:scale-[1.04] sm:inline-flex"
          >
            Book
          </Link>
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
            <div className="fixed inset-x-0 top-11 z-50 h-[calc(100dvh-2.75rem)] overflow-y-auto bg-[rgba(14,14,16,0.98)] backdrop-blur-xl">
              <nav className="mx-auto flex max-w-[1024px] flex-col gap-1 px-5 py-8">
                <Link
                  href="/tracks"
                  className="font-display text-2xl font-600 tracking-apple-tight text-[color:var(--brand-gold)]"
                >
                  Tracks
                </Link>
                <Link
                  href="/contact"
                  className="mb-4 font-display text-2xl font-600 tracking-apple-tight text-[color:var(--brand-gold)]"
                >
                  Book a session
                </Link>
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
