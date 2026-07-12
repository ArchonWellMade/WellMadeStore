import Link from "next/link";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/60">
        <div className="mx-auto flex max-w-[1100px] items-center justify-between px-5 py-4">
          <Link href="/admin/products" className="flex items-center gap-2">
            <span className="text-[11px] font-extrabold uppercase tracking-[0.28em]">
              <span className="text-[color:var(--brand-forest,#1F5E4B)]">Well</span>{" "}
              <span className="text-[color:var(--brand-gold,#E9A820)]">Made</span>{" "}
              <span className="text-foreground/60">Admin</span>
            </span>
          </Link>
          <nav className="flex items-center gap-6 text-[13px]">
            <Link href="/admin/products" className="text-foreground/80 hover:text-foreground">
              Products
            </Link>
            <Link href="/" className="text-foreground/80 hover:text-foreground">
              View store
            </Link>
            <form action="/api/admin/logout" method="POST">
              <button type="submit" className="text-foreground/60 hover:text-foreground">
                Sign out
              </button>
            </form>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-[1100px] px-5 py-10">{children}</main>
    </div>
  );
}
