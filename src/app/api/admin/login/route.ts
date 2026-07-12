import { NextResponse, type NextRequest } from "next/server";
import { getSessionCookie, isValidPassword } from "@/shared/lib/admin-auth";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const password = String(formData.get("password") ?? "");
  const from = String(formData.get("from") ?? "/admin/products");

  if (!isValidPassword(password)) {
    const url = new URL("/admin/login", request.url);
    url.searchParams.set("error", "1");
    url.searchParams.set("from", from);
    return NextResponse.redirect(url, { status: 303 });
  }

  const cookie = getSessionCookie();
  const response = NextResponse.redirect(new URL(from, request.url), { status: 303 });
  response.cookies.set(cookie.name, cookie.value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return response;
}
