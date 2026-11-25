import { getSupabase } from "@/shared/lib/supabase";

// Old range hidden while the new LESU range is loaded. Set to false to show products again.
const SHOP_HIDDEN = true;

export type Product = {
  slug: string;
  name: string;
  category_slug: string;
  short_description: string;
  /** Bullet-style key features for product detail / listing rows. */
  features: string[];
  price_range: string;
  image_url: string;
  is_featured: boolean;
  display_order: number;
  is_active: boolean;
};

function mapRow(row: {
  slug: string;
  name: string;
  category_slug: string;
  short_description: string | null;
  features: string[] | null;
  price_range: string | null;
  image_url: string | null;
  is_featured: boolean;
  display_order: number;
  is_active: boolean;
}): Product {
  return {
    slug: row.slug,
    name: row.name,
    category_slug: row.category_slug,
    short_description: row.short_description ?? "",
    features: row.features ?? [],
    price_range: row.price_range ?? "",
    image_url: row.image_url ?? "",
    is_featured: row.is_featured,
    display_order: row.display_order,
    is_active: row.is_active,
  };
}

export async function getAllProducts(): Promise<Product[]> {
  if (SHOP_HIDDEN) return [];
  const { data, error } = await getSupabase()
    .from("site_products")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true });
  if (error) throw error;
  return (data ?? []).map(mapRow);
}

export async function getProductsByCategory(slug: string): Promise<Product[]> {
  if (SHOP_HIDDEN) return [];
  const { data, error } = await getSupabase()
    .from("site_products")
    .select("*")
    .eq("category_slug", slug)
    .eq("is_active", true)
    .order("display_order", { ascending: true });
  if (error) throw error;
  return (data ?? []).map(mapRow);
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  if (SHOP_HIDDEN) return undefined;
  const { data, error } = await getSupabase()
    .from("site_products")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();
  if (error) throw error;
  return data ? mapRow(data) : undefined;
}

export async function getFeaturedProducts(limit = 4): Promise<Product[]> {
  if (SHOP_HIDDEN) return [];
  const { data, error } = await getSupabase()
    .from("site_products")
    .select("*")
    .eq("is_active", true)
    .eq("is_featured", true)
    .order("display_order", { ascending: true })
    .limit(limit);
  if (error) throw error;
  return (data ?? []).map(mapRow);
}
