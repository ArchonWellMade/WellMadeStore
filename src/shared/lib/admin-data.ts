import "server-only";
import { getSupabaseAdmin } from "@/shared/lib/supabase";

export type AdminCategory = {
  id: string;
  slug: string;
  title: string;
  display_order: number;
  is_active: boolean;
};

export type AdminProduct = {
  id: string;
  slug: string;
  name: string;
  category_slug: string;
  short_description: string;
  features: string[];
  price_range: string;
  image_url: string;
  is_featured: boolean;
  display_order: number;
  is_active: boolean;
};

export async function listAdminCategories(): Promise<AdminCategory[]> {
  const { data, error } = await getSupabaseAdmin()
    .from("site_categories")
    .select("id, slug, title, display_order, is_active")
    .order("display_order", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function listAdminProducts(): Promise<AdminProduct[]> {
  const { data, error } = await getSupabaseAdmin()
    .from("site_products")
    .select("*")
    .order("display_order", { ascending: true });
  if (error) throw error;
  return (data ?? []) as AdminProduct[];
}

export async function getAdminProductBySlug(slug: string): Promise<AdminProduct | null> {
  const { data, error } = await getSupabaseAdmin()
    .from("site_products")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return data as AdminProduct | null;
}
