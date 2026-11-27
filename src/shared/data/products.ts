import { getSupabase } from "@/shared/lib/supabase";

// Set to true to hide every product from the shop (e.g. while a new range is loaded).
const SHOP_HIDDEN = false;

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
  /** Supplier item code, e.g. "BA-B0042". */
  sku: string;
  /** Model scale, e.g. "1/14". */
  scale: string;
  /** Full catalogue photo (with the model's title), shown in the catalogue spread. */
  hero_url: string;
  /** Catalogue feature panels: each image already carries its title and text. */
  tiles: ProductTile[];
};

export type ProductTile = { title: string; body: string; image: string };

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
  sku?: string | null;
  scale?: string | null;
  hero_url?: string | null;
  tiles?: ProductTile[] | null;
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
    sku: row.sku ?? "",
    scale: row.scale ?? "",
    hero_url: row.hero_url ?? "",
    tiles: Array.isArray(row.tiles) ? row.tiles : [],
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
