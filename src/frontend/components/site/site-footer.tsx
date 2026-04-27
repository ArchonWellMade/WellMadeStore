import Link from "next/link";

const footerCols = [
  {
    heading: "Shop",
    links: [
      { href: "/products", label: "All products" },
      { href: "/products?category=premium-metal-rc-cars", label: "Premium Metal RC Cars" },
      { href: "/products?category=foldable-camera-drones", label: "Foldable Camera Drones" },
      { href: "/products?category=sleek-speed-boats", label: "Sleek Speed Boats" },
      { href: "/products?category=smart-gesture-robots", label: "Smart Gesture Robots" },
      { href: "/products?category=minimalist-rc-motorcycles", label: "Minimalist RC Motorcycles" },
      { href: "/products?category=modern-gliders-planes", label: "Modern Gliders & Planes" },
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
              <svg viewBox="0 0 305 188" fill="none" aria-hidden className="h-6 w-auto">
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
              <span className="text-[11px] font-extrabold uppercase tracking-[0.28em]">
                <span className="text-[color:var(--brand-forest,#1F5E4B)]">Well</span>
                <span>&nbsp;</span>
                <span className="text-[color:var(--brand-gold,#E9A820)]">Made</span>
                <span className="text-foreground/60">&nbsp;Store</span>
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
