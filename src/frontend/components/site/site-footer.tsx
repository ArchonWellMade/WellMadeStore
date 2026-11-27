import Image from "next/image";
import Link from "next/link";

const footerCols = [
  {
    heading: "Shop",
    links: [
      { href: "/products", label: "All products" },
      { href: "/products?category=excavators", label: "Hydraulic Excavators" },
      { href: "/products?category=loaders-dozers", label: "Loaders & Dozers" },
      { href: "/products?category=dump-trucks", label: "Dump Trucks" },
      { href: "/products?category=crane-hooklift", label: "Crane & Hooklift Trucks" },
      { href: "/products?category=specialty", label: "Specialty Machines" },
      { href: "/parts", label: "Parts & Accessories" },
    ],
  },
  {
    heading: "Play",
    links: [
      { href: "/tracks", label: "All tracks" },
      { href: "/tracks#dirt-rally-circuit", label: "Dirt Rally Circuit" },
      { href: "/tracks#dig-site", label: "The Dig Site" },
      { href: "/tracks#rock-crawler-trail", label: "Rock Crawler Trail" },
      { href: "/tracks#drift-pad", label: "Drift Pad" },
      { href: "/contact", label: "Book a session" },
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
        <div className="grid grid-cols-2 gap-x-10 gap-y-12 sm:grid-cols-5">
          <div className="col-span-2 sm:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-foreground transition-opacity hover:opacity-80"
            >
              <Image
                src="/brand/rc-adventure-logo.png"
                alt="WellMade RC Adventure"
                width={2172}
                height={724}
                sizes="240px"
                className="h-20 w-auto"
              />
            </Link>
            <p className="mt-5 max-w-[28ch] text-[13px] leading-relaxed">
              The ultimate RC experience. Dirt tracks, a working dig site, and
              machines to drive, race and own.
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
          <p>Copyright &copy; {new Date().getFullYear()} WellMade RC Adventure.</p>
          <nav aria-label="Legal" className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <Link href="/about" className="hover:text-foreground">Privacy</Link>
            <Link href="/about" className="hover:text-foreground">Terms</Link>
            <Link href="/about" className="hover:text-foreground">Returns</Link>
          </nav>
          <p className="text-muted-foreground/70">Drive It. Race It. Own It.</p>
        </div>
      </div>
    </footer>
  );
}
