import { getSupabase } from "@/shared/lib/supabase";

export type Category = {
  slug: string;
  title: string;
  description: string;
  /** Long-form intro for category pages; preserves the brand brief copy. */
  longDescription: string;
  image_url: string;
  display_order: number;
  is_active: boolean;
};

function mapRow(row: {
  slug: string;
  title: string;
  description: string;
  long_description: string;
  image_url: string | null;
  display_order: number;
  is_active: boolean;
}): Category {
  return {
    slug: row.slug,
    title: row.title,
    description: row.description,
    longDescription: row.long_description,
    image_url: row.image_url ?? "",
    display_order: row.display_order,
    is_active: row.is_active,
  };
}

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await getSupabase()
    .from("site_categories")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true });
  if (error) throw error;
  return (data ?? []).map(mapRow);
}

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  const { data, error } = await getSupabase()
    .from("site_categories")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return data ? mapRow(data) : undefined;
}
