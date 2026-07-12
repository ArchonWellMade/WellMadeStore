"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import type { AdminCategory, AdminProduct } from "@/shared/lib/admin-data";

type Props = {
  categories: AdminCategory[];
  product?: AdminProduct;
};

export function ProductForm({ categories, product }: Props) {
  const router = useRouter();
  const isEdit = Boolean(product);

  const [slug, setSlug] = useState(product?.slug ?? "");
  const [name, setName] = useState(product?.name ?? "");
  const [categorySlug, setCategorySlug] = useState(
    product?.category_slug ?? categories[0]?.slug ?? ""
  );
  const [shortDescription, setShortDescription] = useState(product?.short_description ?? "");
  const [features, setFeatures] = useState((product?.features ?? []).join("\n"));
  const [priceRange, setPriceRange] = useState(product?.price_range ?? "");
  const [imageUrl, setImageUrl] = useState(product?.image_url ?? "");
  const [isFeatured, setIsFeatured] = useState(product?.is_featured ?? false);
  const [displayOrder, setDisplayOrder] = useState(product?.display_order ?? 0);
  const [isActive, setIsActive] = useState(product?.is_active ?? true);

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error ?? "Upload failed");
      setImageUrl(body.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      slug,
      name,
      category_slug: categorySlug,
      short_description: shortDescription,
      features: features
        .split("\n")
        .map((f) => f.trim())
        .filter(Boolean),
      price_range: priceRange,
      image_url: imageUrl,
      is_featured: isFeatured,
      display_order: displayOrder,
      is_active: isActive,
    };

    const res = await fetch(
      isEdit ? `/api/admin/products/${product!.slug}` : "/api/admin/products",
      {
        method: isEdit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    setSaving(false);

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(body.error ?? "Failed to save product");
      return;
    }

    router.push("/admin/products");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      {error ? (
        <p className="rounded-md bg-red-50 px-3 py-2 text-[13px] text-red-700">{error}</p>
      ) : null}

      <div>
        <label className="text-[13px] font-medium">Photo</label>
        <div className="mt-2 flex items-center gap-4">
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-[color:var(--brand-cool-gray)]">
            {imageUrl ? (
              <Image src={imageUrl} alt="" fill sizes="96px" className="object-cover" />
            ) : null}
          </div>
          <div className="flex-1 space-y-2">
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full rounded-md border border-border bg-transparent px-3 py-2 text-[13px] outline-none focus:border-foreground/40"
            />
            <div className="flex items-center gap-2">
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif"
                onChange={handleFileChange}
                disabled={uploading}
                className="text-[12px]"
              />
              {uploading ? <span className="text-[12px] text-muted-foreground">Uploading…</span> : null}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="text-[13px] font-medium">Name</label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-2 w-full rounded-md border border-border bg-transparent px-3 py-2 text-[13px] outline-none focus:border-foreground/40"
          />
        </div>
        <div>
          <label htmlFor="slug" className="text-[13px] font-medium">Slug</label>
          <input
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
            pattern="[a-z0-9\-]+"
            title="lowercase letters, numbers and hyphens only"
            className="mt-2 w-full rounded-md border border-border bg-transparent px-3 py-2 text-[13px] outline-none focus:border-foreground/40"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="category" className="text-[13px] font-medium">Category</label>
          <select
            id="category"
            value={categorySlug}
            onChange={(e) => setCategorySlug(e.target.value)}
            className="mt-2 w-full rounded-md border border-border bg-transparent px-3 py-2 text-[13px] outline-none focus:border-foreground/40"
          >
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="price" className="text-[13px] font-medium">Price</label>
          <input
            id="price"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            placeholder="$XXX.00"
            className="mt-2 w-full rounded-md border border-border bg-transparent px-3 py-2 text-[13px] outline-none focus:border-foreground/40"
          />
        </div>
      </div>

      <div>
        <label htmlFor="short_description" className="text-[13px] font-medium">
          Short description
        </label>
        <textarea
          id="short_description"
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
          rows={2}
          className="mt-2 w-full rounded-md border border-border bg-transparent px-3 py-2 text-[13px] outline-none focus:border-foreground/40"
        />
      </div>

      <div>
        <label htmlFor="features" className="text-[13px] font-medium">
          Features <span className="text-muted-foreground">(one per line)</span>
        </label>
        <textarea
          id="features"
          value={features}
          onChange={(e) => setFeatures(e.target.value)}
          rows={5}
          className="mt-2 w-full rounded-md border border-border bg-transparent px-3 py-2 text-[13px] outline-none focus:border-foreground/40"
        />
      </div>

      <div className="grid grid-cols-3 gap-4 items-end">
        <div>
          <label htmlFor="display_order" className="text-[13px] font-medium">Display order</label>
          <input
            id="display_order"
            type="number"
            value={displayOrder}
            onChange={(e) => setDisplayOrder(Number(e.target.value))}
            className="mt-2 w-full rounded-md border border-border bg-transparent px-3 py-2 text-[13px] outline-none focus:border-foreground/40"
          />
        </div>
        <label className="flex items-center gap-2 text-[13px]">
          <input
            type="checkbox"
            checked={isFeatured}
            onChange={(e) => setIsFeatured(e.target.checked)}
          />
          Featured
        </label>
        <label className="flex items-center gap-2 text-[13px]">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
          Active (visible on storefront)
        </label>
      </div>

      <div className="flex items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={saving || uploading}
          className="rounded-md bg-foreground px-5 py-2.5 text-[13px] font-medium text-background hover:opacity-90 disabled:opacity-50"
        >
          {saving ? "Saving…" : isEdit ? "Save changes" : "Create product"}
        </button>
      </div>
    </form>
  );
}
