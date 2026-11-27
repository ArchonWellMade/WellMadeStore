import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { getCategories } from "@/shared/data/categories";
import { ScrollProgress } from "@/frontend/components/site/scroll-progress";
import { ThemeToggle } from "@/frontend/components/site/theme-toggle";
import { HeaderShell } from "@/frontend/components/site/header-shell";

const PRIMARY = [
  { href: "/tracks", label: "Tracks" },
  { href: "/tracks#dig-site", label: "Dig Site" },
  { href: "/products", label: "Shop" },
  { href: "/parts", label: "Parts" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export async function SiteHeader() {
  const categories = await getCategories();
  return (
    <HeaderShell>
      <ScrollProgress />
      <div className="mx-auto grid h-20 max-w-[1400px] grid-cols-[auto_1fr_auto] items-center gap-8 px-4 text-[#f5f5f7] sm:px-6 lg:h-28">
        <Link
          href="/"
          aria-label="RC Adventure — home"
          className="inline-flex items-center transition-opacity hover:opacity-90"
        >
          <Image
            src="/brand/rc-adventure-logo.png"
            alt=""
            width={2172}
            height={724}
            priority
            sizes="(min-width: 1024px) 300px, 200px"
            className="h-14 w-auto lg:h-[92px]"
          />
        </Link>

        <nav aria-label="Primary" className="hidden items-center justify-start gap-2 lg:flex xl:gap-4">
          {PRIMARY.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative px-3 py-2 text-[15px] font-extrabold uppercase italic tracking-[0.02em] text-white transition-colors after:absolute after:inset-x-3 after:-bottom-0.5 after:h-[3px] after:origin-left after:scale-x-0 after:bg-[color:var(--brand-gold)] after:transition-transform after:duration-300 hover:text-[color:var(--brand-gold)] hover:after:scale-x-100 xl:text-[16px]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="col-start-3 flex items-center gap-1">
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>
          <Link
            href="/products"
            aria-label="Shop"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/[0.06] hover:text-white"
          >
            <ShoppingBag className="h-[22px] w-[22px]" strokeWidth={1.7} aria-hidden />
          </Link>
          <Link
            href="/contact"
            className="ml-2 hidden h-11 -skew-x-12 items-center bg-[color:var(--brand-gold)] px-6 text-[14px] font-extrabold uppercase italic text-[#0E0E10] transition-colors hover:bg-[color:var(--brand-gold-light)] sm:inline-flex"
          >
            <span className="skew-x-12">Book now</span>
          </Link>

          <details className="relative lg:hidden">
            <summary
              aria-label="Open menu"
              className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/[0.06] [&::-webkit-details-marker]:hidden"
            >
              <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4" aria-hidden>
                <path d="M2 5 H14 M2 11 H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </summary>
            <div className="fixed inset-x-0 top-20 z-50 h-[calc(100dvh-5rem)] overflow-y-auto bg-[rgba(10,10,12,0.98)] backdrop-blur-xl">
              <nav className="mx-auto flex max-w-[1280px] flex-col px-6 py-8">
                {PRIMARY.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="border-b border-white/[0.06] py-4 text-[26px] font-extrabold uppercase italic text-white transition-colors hover:text-[color:var(--brand-gold)]"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/contact"
                  className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-[color:var(--brand-gold)] text-[15px] font-semibold text-[#0E0E10]"
                >
                  Book a session
                </Link>
                <p className="mt-10 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/40">
                  Shop by category
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {categories.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/products?category=${c.slug}`}
                      className="rounded-full border border-white/15 px-3.5 py-1.5 text-[13px] text-white/75 hover:border-[color:var(--brand-gold)] hover:text-white"
                    >
                      {c.title}
                    </Link>
                  ))}
                </div>
                <div className="mt-8 sm:hidden">
                  <ThemeToggle />
                </div>
              </nav>
            </div>
          </details>
        </div>
      </div>
    </HeaderShell>
  );
}
