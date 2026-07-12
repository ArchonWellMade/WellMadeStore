export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string; error?: string }>;
}) {
  const { from, error } = await searchParams;

  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-background px-5">
      <div className="w-full max-w-sm">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[color:var(--brand-forest)]">
          Well Made
        </p>
        <h1 className="mt-3 font-display text-[32px] font-500 tracking-apple-tight">
          Admin sign in
        </h1>
        {error ? (
          <p className="mt-4 rounded-md bg-red-50 px-3 py-2 text-[13px] text-red-700">
            Incorrect password.
          </p>
        ) : null}
        <form action="/api/admin/login" method="POST" className="mt-8 space-y-4">
          <input type="hidden" name="from" value={from ?? "/admin/products"} />
          <div>
            <label htmlFor="password" className="text-[13px] font-medium text-foreground">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoFocus
              className="mt-2 w-full rounded-md border border-border bg-transparent px-3 py-2.5 text-[14px] outline-none focus:border-foreground/40"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-foreground px-4 py-2.5 text-[14px] font-medium text-background transition-opacity hover:opacity-90"
          >
            Sign in
          </button>
        </form>
      </div>
    </section>
  );
}
