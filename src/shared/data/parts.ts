import "server-only";
import data from "./parts.json";

export type Part = {
  slug: string;
  code: string;
  variant: string;
  name: string;
  category: string;
  details: string;
  note: string;
  fits: string[];
  image: string | null;
};

export const PARTS = data as Part[];

export const PART_CATEGORIES = [
  "Machine Parts & Attachments",
  "Hydraulics",
  "Axles & Drivetrain",
  "Wheels & Tyres",
  "Chassis & Suspension",
  "Cab & Body",
  "Tanks, Exhaust & Boxes",
  "Lights, Sound & Decals",
  "Trailers & Truck Kits",
  "Tools, Hardware & Scenery",
] as const;

export function partCategorySlug(c: string) {
  return c.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function getPart(slug: string) {
  return PARTS.find((p) => p.slug === slug);
}

export function searchParts({ category, q }: { category?: string; q?: string }) {
  let list = PARTS;
  if (category) list = list.filter((p) => partCategorySlug(p.category) === category);
  const terms = (q ?? "").toLowerCase().split(/\s+/).filter(Boolean);
  if (terms.length) {
    list = list.filter((p) => {
      const hay = `${p.name} ${p.code} ${p.variant} ${p.details} ${p.fits.join(" ")}`.toLowerCase();
      return terms.every((t) => hay.includes(t));
    });
  }
  return list;
}

export const PARTS_EMAIL = "admin@wellmadeblinds.com.au";
export const PARTS_PHONE_HREF = "tel:+61415381093";

export function enquireHref(p: Part) {
  const subject = `Parts enquiry: ${p.code}${p.variant ? ` (${p.variant})` : ""} — ${p.name}`;
  const body = `Hi, I'd like a price and availability for:\n\n${p.name}\nPart code: ${p.code}${p.variant ? ` (${p.variant})` : ""}\nQuantity: \n\nThanks`;
  return `mailto:${PARTS_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
