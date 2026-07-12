import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseAdmin } from "@/shared/lib/supabase";

type Params = { slug: string };

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<Params> }
) {
  const { slug } = await params;
  const body = await request.json();

  const { data, error } = await getSupabaseAdmin()
    .from("site_products")
    .update({
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
      updated_at: new Date().toISOString(),
    })
    .eq("slug", slug)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json({ product: data });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<Params> }
) {
  const { slug } = await params;
  const { error } = await getSupabaseAdmin().from("site_products").delete().eq("slug", slug);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}
