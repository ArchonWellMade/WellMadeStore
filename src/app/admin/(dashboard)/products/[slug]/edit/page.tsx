import { notFound } from "next/navigation";
import { listAdminCategories, getAdminProductBySlug } from "@/shared/lib/admin-data";
import { ProductForm } from "@/frontend/components/admin/product-form";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [categories, product] = await Promise.all([
    listAdminCategories(),
    getAdminProductBySlug(slug),
  ]);

  if (!product) notFound();

  return (
    <div>
      <h1 className="font-display text-[28px] font-500 tracking-apple-tight">
        Edit {product.name}
      </h1>
      <div className="mt-8">
        <ProductForm categories={categories} product={product} />
      </div>
    </div>
  );
}
