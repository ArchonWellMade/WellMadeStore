import Link from "next/link";

const footerCols = [
  {
    heading: "Shop",
    links: [
      { href: "/products", label: "All products" },
      { href: "/products?category=rc-cars", label: "RC Cars" },
      { href: "/products?category=drones", label: "Drones" },
      { href: "/products?category=flying-rc-swords", label: "Flying RC Swords" },
      { href: "/products?category=parts-batteries", label: "Parts & Batteries" },
    ],
  },
  {
    heading: "Support",
    links: [
      { href: "/contact", label: "Hobbyist support" },
      { href: "/contact", label: "Returns & warranty" },
      { href: "/contact", label: "Shipping" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border/60 bg-background text-[12px] text-muted-foreground">
      <div className="mx-auto max-w-[1280px] px-6 py-20 sm:py-24">
        <div className="grid grid-cols-2 gap-x-10 gap-y-12 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-foreground transition-opacity hover:opacity-80"
            >
              <svg viewBox="0 0 56 56" fill="none" aria-hidden className="h-5 w-5">
                <path
                  d="M6 38 L22 18 L30 28 L40 14 L50 14 L36 32 L28 22 L18 36 Z"
                  fill="currentColor"
                />
                <circle cx="46" cy="42" r="4" fill="var(--brand-ignition, #FF5A1F)" />
              </svg>
              <span className="text-[11px] font-extrabold uppercase tracking-[0.28em]">
                WellMade<span className="text-[color:var(--brand-ignition,#FF5A1F)]">Store</span>
              </span>
            </Link>
            <p className="mt-5 max-w-[28ch] text-[13px] leading-relaxed">
              Built by hobbyists, stocked for hobbyists. RC cars, drones, planes &
              more.
            </p>
          </div>

          {footerCols.map((col) => (
            <div key={col.heading}>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground">
                {col.heading}
              </h3>
              <ul className="mt-4 space-y-2.5 leading-snug">
                {col.links.map((link) => (
                  <li key={`${col.heading}-${link.label}`}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-border/60 pt-8 text-[11px] sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright &copy; {new Date().getFullYear()} WellMadeStore.</p>
          <nav aria-label="Legal" className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <Link href="/about" className="hover:text-foreground">Privacy</Link>
            <Link href="/about" className="hover:text-foreground">Terms</Link>
            <Link href="/about" className="hover:text-foreground">Returns</Link>
          </nav>
          <p className="text-muted-foreground/70">Engineered in the garage.</p>
        </div>
      </div>
    </footer>
  );
}
