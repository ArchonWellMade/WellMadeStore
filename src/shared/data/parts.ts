import "server-only";
import { getSupabase } from "@/shared/lib/supabase";

export type Part = {
  slug: string;
  code: string;
  variant: string;
  name: string;
  category_slug: string;
  details: string;
  note: string;
  fits: string[];
  image_url: string | null;
};

export type PartCategory = { slug: string; title: string; count: number };

const COLS = "slug,code,variant,name,category_slug,details,note,fits,image_url";

export async function getPartCategories(): Promise<PartCategory[]> {
  const sb = getSupabase();
  const [cats, counts] = await Promise.all([
    sb.from("site_part_categories").select("slug,title").order("display_order"),
    sb.from("site_part_category_counts").select("category_slug,n"),
  ]);
  if (cats.error) throw cats.error;
  if (counts.error) throw counts.error;
  const n = new Map((counts.data ?? []).map((c) => [c.category_slug as string, c.n as number]));
  return (cats.data ?? []).map((c) => ({ slug: c.slug, title: c.title, count: n.get(c.slug) ?? 0 }));
}

export async function searchParts({
  category,
  q,
  page,
  perPage,
}: {
  category?: string;
  q?: string;
  page: number;
  perPage: number;
}): Promise<{ parts: Part[]; total: number }> {
  let query = getSupabase()
    .from("site_parts")
    .select(COLS, { count: "exact" })
    .order("display_order")
    .range((page - 1) * perPage, page * perPage - 1);
  if (category) query = query.eq("category_slug", category);
  const terms = (q ?? "")
    .toLowerCase()
    .replace(/[%_,()*\\]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 6);
  for (const t of terms) query = query.ilike("search_text", `%${t}%`);
  const { data, error, count } = await query;
  if (error) throw error;
  return { parts: (data ?? []) as Part[], total: count ?? 0 };
}

export async function getPart(slug: string): Promise<Part | null> {
  const { data, error } = await getSupabase().from("site_parts").select(COLS).eq("slug", slug).maybeSingle();
  if (error) throw error;
  return (data as Part) ?? null;
}

export async function getRelatedParts(p: Part, limit = 8): Promise<Part[]> {
  const prefix = p.code.split("-")[0];
  const { data, error } = await getSupabase()
    .from("site_parts")
    .select(COLS)
    .eq("category_slug", p.category_slug)
    .neq("slug", p.slug)
    .not("image_url", "is", null)
    .ilike("code", `${prefix}-%`)
    .order("display_order")
    .limit(limit);
  if (error) throw error;
  return (data ?? []) as Part[];
}

export const PARTS_EMAIL = "admin@wellmadeblinds.com.au";
export const PARTS_PHONE_HREF = "tel:+61415381093";

export function enquireHref(p: Part) {
  const subject = `Parts enquiry: ${p.code}${p.variant ? ` (${p.variant})` : ""} — ${p.name}`;
  const body = `Hi, I'd like a price and availability for:\n\n${p.name}\nPart code: ${p.code}${p.variant ? ` (${p.variant})` : ""}\nQuantity: \n\nThanks`;
  return `mailto:${PARTS_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
