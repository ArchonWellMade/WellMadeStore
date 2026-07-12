import "server-only";
import { createHmac, timingSafeEqual } from "crypto";

const COOKIE_NAME = "admin_session";

function expectedToken(): string {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) throw new Error("ADMIN_PASSWORD is not set");
  return createHmac("sha256", password).update("well-made-admin").digest("hex");
}

export function isValidPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD ?? "";
  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  return a.length === b.length && expected.length > 0 && timingSafeEqual(a, b);
}

export function getSessionCookie() {
  return { name: COOKIE_NAME, value: expectedToken() };
}

export function isValidSessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const expected = expectedToken();
  const a = Buffer.from(token);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}
