import { listAdminCategories } from "@/shared/lib/admin-data";
import { ProductForm } from "@/frontend/components/admin/product-form";

export default async function NewProductPage() {
  const categories = await listAdminCategories();

  return (
    <div>
      <h1 className="font-display text-[28px] font-500 tracking-apple-tight">New product</h1>
      <div className="mt-8">
        <ProductForm categories={categories} />
      </div>
    </div>
  );
}
