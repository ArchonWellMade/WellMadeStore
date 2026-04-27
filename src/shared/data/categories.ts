export type Category = {
  slug: string;
  title: string;
  description: string;
  image_url: string;
  display_order: number;
  is_active: boolean;
};

// Curated Unsplash imagery — aspirational real-vehicle photography. The brief
// is "scale-down precision performance machines," so the photo set leans on
// supercars, cinematic drones, MotoGP cornering, warbirds, etc., not toy shots.
const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=85&auto=format&fit=crop`;

export const categories: Category[] = [
  {
    slug: "rc-cars",
    title: "RC Cars",
    description: "1:8 scale buggies, crawlers, and touring cars. Brushless and bash-proof.",
    image_url: u("1675301586777-2c56ee8aa5ef"),
    display_order: 1,
    is_active: true,
  },
  {
    slug: "drones",
    title: "Drones",
    description: "FPV racing quads and cinematic camera platforms — hobby grade, ready to fly.",
    image_url: u("1556537902-16b47f40c55c"),
    display_order: 2,
    is_active: true,
  },
  {
    slug: "rc-motorcycles",
    title: "RC Motorcycles",
    description: "1:5 scale superbikes with live lean angle and carbon swingarms.",
    image_url: u("1609160089140-8da843632872"),
    display_order: 3,
    is_active: true,
  },
  {
    slug: "rc-planes",
    title: "RC Planes",
    description: "Foam trainers, warbird scale models, and 3D aerobatic flyers.",
    image_url: u("1606370744289-16795bbded58"),
    display_order: 4,
    is_active: true,
  },
  {
    slug: "rc-boats",
    title: "RC Boats",
    description: "Brushless catamarans and self-righting hydroplanes for pond or pool.",
    image_url: u("1508109261185-dd0146900a71"),
    display_order: 5,
    is_active: true,
  },
  {
    slug: "rc-helicopters",
    title: "RC Helicopters",
    description: "Collective-pitch and coaxial RC heli kits — flybarless, 3D-capable.",
    image_url: u("1745390397272-fd398a888a43"),
    display_order: 6,
    is_active: true,
  },
  {
    slug: "flying-rc-swords",
    title: "Flying RC Swords",
    description: "Our signature: blade-shaped airframes with RGB optics and gyro hover.",
    image_url: u("1671015522549-e7aa41ded44f"),
    display_order: 7,
    is_active: true,
  },
  {
    slug: "parts-batteries",
    title: "Parts & Batteries",
    description: "100C LiPos, sensored stators, and the spares we'd run ourselves.",
    image_url: u("1622319491968-62c2f54ba5d6"),
    display_order: 8,
    is_active: true,
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
