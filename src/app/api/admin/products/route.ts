import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseAdmin } from "@/shared/lib/supabase";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { data, error } = await getSupabaseAdmin()
    .from("site_products")
    .insert({
      slug: body.slug,
      name: body.name,
      category_slug: body.category_slug,
      short_description: body.short_description ?? "",
      features: body.features ?? [],
      price_range: body.price_range ?? "",
      image_url: body.image_url ?? "",
      is_featured: Boolean(body.is_featured),
      display_order: Number(body.display_order) || 0,
      is_active: Boolean(body.is_active),
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json({ product: data });
}
