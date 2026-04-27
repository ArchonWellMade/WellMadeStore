export type Product = {
  slug: string;
  name: string;
  category_slug: string;
  short_description: string;
  price_range: string;
  image_url: string;
  is_featured: boolean;
  display_order: number;
  is_active: boolean;
};

// Curated Unsplash CDN URLs — real-vehicle photography that elevates RC into
// performance-machine territory. Reused across category + matching product
// where the shot fits both contexts.
const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=85&auto=format&fit=crop`;

export const products: Product[] = [
  {
    slug: "apex-1-8-buggy",
    name: "Apex 1:8 Brushless Buggy",
    category_slug: "rc-cars",
    short_description: "GT3-derived chassis. Carbon-Kevlar tub. 0–60 in 2.4 seconds at scale.",
    price_range: "$549",
    image_url: u("1675301586777-2c56ee8aa5ef"),
    is_featured: true,
    display_order: 1,
    is_active: true,
  },
  {
    slug: "stormrunner-fpv-5",
    name: "StormRunner FPV 5\"",
    category_slug: "drones",
    short_description: "Freestyle 5-inch quad. 6S sustained punch, 110 mph through a punchout.",
    price_range: "$429",
    image_url: u("1774553988123-4a2be11e0bc6"),
    is_featured: true,
    display_order: 2,
    is_active: true,
  },
  {
    slug: "ronin-1-5-roadbike",
    name: "Ronin 1:5 Self-Balancing Roadbike",
    category_slug: "rc-motorcycles",
    short_description: "Live lean angle, carbon swingarm, dual-clutch slipper. 2025-grid geometry.",
    price_range: "$799",
    image_url: u("1623502074686-e8edd3054f3e"),
    is_featured: true,
    display_order: 3,
    is_active: true,
  },
  {
    slug: "longsword-mk2",
    name: "Longsword Mk II — Flying RC Sword",
    category_slug: "flying-rc-swords",
    short_description: "Blade-shaped airframe. Six-axis gyro. RGB edge optics that throw real spill.",
    price_range: "$249",
    image_url: u("1671015522549-e7aa41ded44f"),
    is_featured: true,
    display_order: 4,
    is_active: true,
  },
  {
    slug: "trailblazer-crawler",
    name: "Trailblazer 1:10 Rock Crawler",
    category_slug: "rc-cars",
    short_description: "Portal axles, dual two-speed, scale tube frame. Built to find dirt.",
    price_range: "$389",
    image_url: u("1629840963351-f5e2e6578f38"),
    is_featured: false,
    display_order: 5,
    is_active: true,
  },
  {
    slug: "cinescout-pro",
    name: "CineScout Pro Camera Drone",
    category_slug: "drones",
    short_description: "1-inch sensor. 38-min flight. Occusync 4 transmission at 15 km.",
    price_range: "$1,249",
    image_url: u("1556537902-16b47f40c55c"),
    is_featured: false,
    display_order: 6,
    is_active: true,
  },
  {
    slug: "horizon-trainer-1500",
    name: "Horizon Trainer 1500",
    category_slug: "rc-planes",
    short_description: "1.5m foam high-wing. SAFE-assist gyro. The right first plane.",
    price_range: "$229",
    image_url: u("1570728282025-2c04d3ea01b8"),
    is_featured: false,
    display_order: 7,
    is_active: true,
  },
  {
    slug: "thunderhawk-warbird",
    name: "Thunderhawk P-51 Warbird",
    category_slug: "rc-planes",
    short_description: "Scale ducted prop, retractable gear, hand-applied panel-line decals.",
    price_range: "$549",
    image_url: u("1774901091172-a97e0e4a2c2e"),
    is_featured: false,
    display_order: 8,
    is_active: true,
  },
  {
    slug: "wave-rider-cat",
    name: "WaveRider Brushless Cat",
    category_slug: "rc-boats",
    short_description: "50+ mph hydroplane hull. Self-righting, saltwater-rated, IP67 sealed.",
    price_range: "$469",
    image_url: u("1508109261185-dd0146900a71"),
    is_featured: false,
    display_order: 9,
    is_active: true,
  },
  {
    slug: "stratus-450-heli",
    name: "Stratus 450 Collective-Pitch Heli",
    category_slug: "rc-helicopters",
    short_description: "Belt-driven tail, flybarless head, 3D-capable for the intermediate stick.",
    price_range: "$649",
    image_url: u("1745390397272-fd398a888a43"),
    is_featured: false,
    display_order: 10,
    is_active: true,
  },
  {
    slug: "katana-flyer-mini",
    name: "Katana Flyer Mini",
    category_slug: "flying-rc-swords",
    short_description: "Pocket-size novelty: 18cm blade, indoor-friendly, USB-C charge.",
    price_range: "$89",
    image_url: u("1689493720779-f762ab7bb5ae"),
    is_featured: false,
    display_order: 11,
    is_active: true,
  },
  {
    slug: "stallion-supermoto",
    name: "Stallion Supermoto 1:8",
    category_slug: "rc-motorcycles",
    short_description: "Brushless dirt-track build. Knobby + slick tire set in the box.",
    price_range: "$579",
    image_url: u("1771402382328-2d6dd3695c2d"),
    is_featured: false,
    display_order: 12,
    is_active: true,
  },
  {
    slug: "voltline-6s-5200",
    name: "VoltLine 6S 5200mAh LiPo",
    category_slug: "parts-batteries",
    short_description: "100C continuous. IR-tested cell-by-cell. XT90 leads, balance-charged.",
    price_range: "$89",
    image_url: u("1675574697371-93409a25257c"),
    is_featured: false,
    display_order: 13,
    is_active: true,
  },
  {
    slug: "torque-2200kv-motor",
    name: "Torque 2200KV Brushless Motor",
    category_slug: "parts-batteries",
    short_description: "Sensored stator wound to 0.05Ω. 5mm shaft. Fits most 1:8 buggy mounts.",
    price_range: "$119",
    image_url: u("1629280878139-038999084e23"),
    is_featured: false,
    display_order: 14,
    is_active: true,
  },
];

export function getProductsByCategory(slug: string): Product[] {
  return products.filter((p) => p.category_slug === slug && p.is_active);
}

export function getFeaturedProducts(limit = 4): Product[] {
  return products
    .filter((p) => p.is_active && p.is_featured)
    .sort((a, b) => a.display_order - b.display_order)
    .slice(0, limit);
}
