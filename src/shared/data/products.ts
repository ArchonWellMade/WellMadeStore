export type Product = {
  slug: string;
  name: string;
  category_slug: string;
  short_description: string;
  /** Bullet-style key features for product detail / listing rows. */
  features: string[];
  price_range: string;
  image_url: string;
  is_featured: boolean;
  display_order: number;
  is_active: boolean;
};

const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=85&auto=format&fit=crop`;

export const products: Product[] = [
  // ── Premium Metal RC Cars ───────────────────────────────────────────
  {
    slug: "premium-mini-drift-cars",
    name: "Premium Mini Drift Cars",
    category_slug: "premium-metal-rc-cars",
    short_description:
      "Licensed 1:64 / 1:43 scale replicas. Solid alloy chassis, gyro-stabilized control, satisfying weight in the hand.",
    features: [
      "Licensed Tesla, Porsche, Audi & classic sports models",
      "1:64 and 1:43 die-cast scale options",
      "2.4G wireless remote with gyro stabilization",
      "Alloy chassis · matte and glossy finishes",
    ],
    price_range: "$XXX.00",
    image_url: u("1675301586777-2c56ee8aa5ef"),
    is_featured: true,
    display_order: 1,
    is_active: true,
  },
  {
    slug: "high-speed-on-road-cars",
    name: "High-Speed On-Road Cars",
    category_slug: "premium-metal-rc-cars",
    short_description:
      "Aerodynamic profiles, refined finishes. Quick off the line and steady through the corners.",
    features: [
      "Sleek aerodynamic shell — matte or glossy finish",
      "Fast acceleration with smooth handling",
      "Durable composite frame, reinforced contact points",
      "RCM certified for Australia",
    ],
    price_range: "$XXX.00",
    image_url: u("1694433573764-577e19a8ddaa"),
    is_featured: false,
    display_order: 2,
    is_active: true,
  },
  {
    slug: "all-terrain-suvs",
    name: "All-Terrain SUVs",
    category_slug: "premium-metal-rc-cars",
    short_description:
      "Robust yet minimalist. Four-wheel drive and tuned suspension across pavement, dirt, and gravel.",
    features: [
      "True 4WD drivetrain with sealed gearbox",
      "Tuned independent suspension front + rear",
      "Suitable for asphalt, dirt, gravel and grass",
      "Solid metal undertray · weatherproof seals",
    ],
    price_range: "$XXX.00",
    image_url: u("1629840963351-f5e2e6578f38"),
    is_featured: false,
    display_order: 3,
    is_active: true,
  },

  // ── Foldable Camera Drones ──────────────────────────────────────────
  {
    slug: "pocket-size-foldable-drones",
    name: "Pocket-Size Foldable Drones",
    category_slug: "foldable-camera-drones",
    short_description:
      "Slim folded body, neutral colorways. Designed to slip into a jacket pocket.",
    features: [
      "Folded profile fits a jacket pocket",
      "One-key takeoff, landing, and auto-return",
      "Altitude-hold for stable hover",
      "Neutral matte colorways · clean lines",
    ],
    price_range: "$XXX.00",
    image_url: u("1556537902-16b47f40c55c"),
    is_featured: true,
    display_order: 4,
    is_active: true,
  },
  {
    slug: "hd-camera-drones",
    name: "HD Camera Drones",
    category_slug: "foldable-camera-drones",
    short_description:
      "Integrated HD camera, refined body. Clear video and a long, quiet hover.",
    features: [
      "Integrated HD camera with stabilized capture",
      "Long-life battery for extended flight time",
      "Stable hovering and gentle, quiet operation",
      "Sleek, sealed body · designed to last",
    ],
    price_range: "$XXX.00",
    image_url: u("1774553988123-4a2be11e0bc6"),
    is_featured: false,
    display_order: 5,
    is_active: true,
  },

  // ── Sleek Speed Boats ───────────────────────────────────────────────
  {
    slug: "high-performance-speed-boats",
    name: "High-Performance Speed Boats",
    category_slug: "sleek-speed-boats",
    short_description:
      "Streamlined hull, smooth surfaces. Built to recover itself and run a long way out.",
    features: [
      "Streamlined hydroplane hull · smooth surfaces",
      "Self-righting system if it tips",
      "Long control distance · stable line at speed",
      "Waterproof construction · saltwater rated",
    ],
    price_range: "$XXX.00",
    image_url: u("1508109261185-dd0146900a71"),
    is_featured: true,
    display_order: 6,
    is_active: true,
  },
  {
    slug: "elegant-leisure-boats",
    name: "Elegant Leisure Boats",
    category_slug: "sleek-speed-boats",
    short_description:
      "Quiet, refined cruising. The kind of boat you can leave running while you watch.",
    features: [
      "Stable, low-noise cruising at all speeds",
      "Refined hull details · minimalist trim",
      "Durable build · easy to clean and store",
      "Designed for pond, pool, or calm water",
    ],
    price_range: "$XXX.00",
    image_url: u("1619382997249-4b126250d03e"),
    is_featured: false,
    display_order: 7,
    is_active: true,
  },

  // ── Smart Gesture Robots ────────────────────────────────────────────
  {
    slug: "gesture-control-robots",
    name: "Gesture Control Robots",
    category_slug: "smart-gesture-robots",
    short_description:
      "Round, soft, simple. Wave to control — no app, no friction.",
    features: [
      "Wave-to-control gestures · no app required",
      "Follow mode keeps it walking with you",
      "Built-in dance functions and idle moods",
      "Soft round form · neutral colorways",
    ],
    price_range: "$XXX.00",
    image_url: u("1535378620166-273708d44e4c"),
    is_featured: true,
    display_order: 8,
    is_active: true,
  },
  {
    slug: "interactive-smart-robots",
    name: "Interactive Smart Robots",
    category_slug: "smart-gesture-robots",
    short_description:
      "Minimalist face, smooth motion. Quietly responsive in any room.",
    features: [
      "Voice response with simple wake words",
      "Obstacle avoidance and edge detection",
      "Smooth motion · minimalist facial cues",
      "Durable matte body · USB-C charging",
    ],
    price_range: "$XXX.00",
    image_url: u("1546776310-eef45dd6d63c"),
    is_featured: false,
    display_order: 9,
    is_active: true,
  },

  // ── Minimalist RC Motorcycles ───────────────────────────────────────
  {
    slug: "self-balancing-rc-motorcycles",
    name: "Self-Balancing RC Motorcycles",
    category_slug: "minimalist-rc-motorcycles",
    short_description:
      "Slim frame, real lean. Gyro-balanced for an authentic ride.",
    features: [
      "Live lean angle on entry and exit of turns",
      "Smooth, progressive acceleration",
      "Gyro-stabilized — stays upright, rides true",
      "Slim frame · realistic scale proportions",
    ],
    price_range: "$XXX.00",
    image_url: u("1623502074686-e8edd3054f3e"),
    is_featured: true,
    display_order: 10,
    is_active: true,
  },
  {
    slug: "classic-sports-bike-replicas",
    name: "Classic & Sports Bike Replicas",
    category_slug: "minimalist-rc-motorcycles",
    short_description:
      "Timeless silhouettes, high-quality finishes. A bike for the bookshelf and the floor.",
    features: [
      "Timeless silhouettes — classic and modern",
      "High-quality matte and gloss finishes",
      "Durable wheels and rubber compound tyres",
      "Precise control · solid build",
    ],
    price_range: "$XXX.00",
    image_url: u("1771402382328-2d6dd3695c2d"),
    is_featured: false,
    display_order: 11,
    is_active: true,
  },

  // ── Modern Gliders & Planes ─────────────────────────────────────────
  {
    slug: "delta-wing-gliders",
    name: "Delta Wing Gliders",
    category_slug: "modern-gliders-planes",
    short_description:
      "Aerodynamic delta profile, EPP foam build. Easy launch, long, stable cruise.",
    features: [
      "Aerodynamic delta-wing profile",
      "Easy hand launch · stable in light wind",
      "Durable EPP foam construction",
      "Modern matte finish · minimal markings",
    ],
    price_range: "$XXX.00",
    image_url: u("1606370744289-16795bbded58"),
    is_featured: false,
    display_order: 12,
    is_active: true,
  },
  {
    slug: "sleek-fixed-wing-planes",
    name: "Sleek Fixed-Wing Planes",
    category_slug: "modern-gliders-planes",
    short_description:
      "Clean lines, long flight times. Wind-resistant and simple to fly.",
    features: [
      "Clean fixed-wing profile · minimalist lines",
      "Wind-resistant trim · long flight time",
      "Simple, intuitive control for beginners",
      "Reinforced leading edge · designed to last",
    ],
    price_range: "$XXX.00",
    image_url: u("1774901091172-a97e0e4a2c2e"),
    is_featured: false,
    display_order: 13,
    is_active: true,
  },

  // ── Handheld Gimbals ────────────────────────────────────────────────
  {
    slug: "three-axis-handheld-gimbal",
    name: "3-Axis Handheld Gimbal",
    category_slug: "handheld-gimbals",
    short_description:
      "Foldable 3-axis stabilizer for smooth, cinematic capture. Pocketable, balanced, intuitive.",
    features: [
      "3-axis brushless stabilization · cinematic motion",
      "Foldable design · slips into a jacket pocket",
      "Subject tracking, time-lapse and panorama modes",
      "All-day battery · USB-C fast charging",
    ],
    price_range: "$XXX.00",
    image_url: u("1606220588913-7e1d2e60a3df"),
    is_featured: true,
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
