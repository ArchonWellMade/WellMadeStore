import Link from "next/link";
import Image from "next/image";
import { listAdminProducts } from "@/shared/lib/admin-data";
import { DeleteProductButton } from "@/frontend/components/admin/delete-product-button";

export default async function AdminProductsPage() {
  const products = await listAdminProducts();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-[28px] font-500 tracking-apple-tight">Products</h1>
        <Link
          href="/admin/products/new"
          className="rounded-md bg-foreground px-4 py-2 text-[13px] font-medium text-background hover:opacity-90"
        >
          New product
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto rounded-lg border border-border/60">
        <table className="w-full min-w-[720px] text-left text-[13px]">
          <thead className="border-b border-border/60 bg-[color:var(--brand-cool-gray)]/40 text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-medium">Image</th>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-border/40 last:border-0">
                <td className="px-4 py-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded-md bg-[color:var(--brand-cool-gray)]">
                    {p.image_url ? (
                      <Image src={p.image_url} alt="" fill sizes="48px" className="object-cover" />
                    ) : null}
                  </div>
                </td>
                <td className="px-4 py-3 font-medium text-foreground">{p.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{p.category_slug}</td>
                <td className="px-4 py-3 text-muted-foreground">{p.price_range}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] ${
                      p.is_active
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {p.is_active ? "Active" : "Hidden"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-4">
                    <Link
                      href={`/admin/products/${p.slug}/edit`}
                      className="text-foreground/80 hover:text-foreground"
                    >
                      Edit
                    </Link>
                    <DeleteProductButton slug={p.slug} name={p.name} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
