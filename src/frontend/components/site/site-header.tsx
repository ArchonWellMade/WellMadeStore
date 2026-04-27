import Link from "next/link";
import { ShoppingBag, Search } from "lucide-react";
import { categories } from "@/shared/data/categories";

const PRIMARY_NAV = categories
  .filter((c) => c.is_active)
  .sort((a, b) => a.display_order - b.display_order)
  .slice(0, 7);

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-[rgba(14,14,16,0.78)] backdrop-blur-xl supports-[backdrop-filter]:bg-[rgba(14,14,16,0.68)]">
      <div className="mx-auto flex h-11 max-w-[1024px] items-center justify-between px-5 text-[#f5f5f7]">
        <Link
          href="/"
          aria-label="WellMadeStore — home"
          className="inline-flex h-11 items-center gap-2 text-[#f5f5f7] transition-opacity hover:opacity-90"
        >
          <svg viewBox="0 0 56 56" fill="none" aria-hidden className="h-4 w-4">
            <path
              d="M6 38 L22 18 L30 28 L40 14 L50 14 L36 32 L28 22 L18 36 Z"
              fill="currentColor"
            />
            <circle cx="46" cy="42" r="4" fill="var(--brand-ignition, #FF5A1F)" />
          </svg>
          <span className="text-[10.5px] font-extrabold uppercase tracking-[0.28em]">
            WellMade<span className="text-[color:var(--brand-ignition,#FF5A1F)]">Store</span>
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
              className="flex h-11 items-center px-3 text-[12px] font-normal text-[#f5f5f7]/75 transition-colors hover:text-[#f5f5f7]"
            >
              {nav.title}
            </Link>
          ))}
        </nav>

        <div className="flex h-11 items-center gap-0.5">
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
                    className="font-display text-2xl font-500 tracking-apple-tight text-[#f5f5f7] transition-colors hover:text-[color:var(--brand-ignition)]"
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
