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

const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=85&auto=format&fit=crop`;

export const categories: Category[] = [
  {
    slug: "premium-metal-rc-cars",
    title: "Premium Metal RC Cars",
    description:
      "Authentic licensed replicas in solid metal. Built for display and play.",
    longDescription:
      "Timeless design meets precision engineering. Our collection of remote-controlled cars features authentic replicas of iconic vehicles, crafted with solid metal bodies and smooth finishes. Designed for both display and play, they offer precise control, stable performance, and a satisfying weight that speaks to their quality. Simple, elegant, and built to endure.",
    image_url: u("1675301586777-2c56ee8aa5ef"),
    display_order: 1,
    is_active: true,
  },
  {
    slug: "foldable-camera-drones",
    title: "Foldable Camera Drones",
    description:
      "Pocket-size frames, modern aesthetics. Stable flight, quality made.",
    longDescription:
      "Compact innovation designed for exploration. These drones combine portability with performance, featuring foldable frames that fit easily in your pocket or bag. With clean lines and modern aesthetics, they are as much a piece of design as they are a tool for capturing moments. Easy to control, stable in flight, and built with quality materials that stand the test of time.",
    image_url: u("1556537902-16b47f40c55c"),
    display_order: 2,
    is_active: true,
  },
  {
    slug: "sleek-speed-boats",
    title: "Sleek Speed Boats",
    description:
      "Aerodynamic hulls, refined details. Functional beauty on the water.",
    longDescription:
      "Designed to cut through water with style and efficiency. Our RC boats feature sharp, aerodynamic hulls and clean color schemes that reflect modern design principles. Waterproof construction and reliable performance ensure they are ready for action whenever you are. Functional beauty that looks as good on display as it does on the water.",
    image_url: u("1508109261185-dd0146900a71"),
    display_order: 3,
    is_active: true,
  },
  {
    slug: "smart-gesture-robots",
    title: "Smart Gesture Robots",
    description:
      "Soft shapes, intuitive control. Smart enough to surprise you.",
    longDescription:
      "Intuitive technology in a simple form. These robots are designed to be easy and fun to use, controlled with simple hand gestures. With soft edges, clean shapes, and smooth finishes, they fit perfectly into any modern space. Smart, reliable, and crafted with the same attention to detail that defines all Well Made products.",
    image_url: u("1535378620166-273708d44e4c"),
    display_order: 4,
    is_active: true,
  },
  {
    slug: "minimalist-rc-motorcycles",
    title: "Minimalist RC Motorcycles",
    description:
      "Self-balancing scale bikes. Authentic in every detail.",
    longDescription:
      "Authentic design reimagined for quality and style. Our RC motorcycles capture the essence of real bikes with clean lines and realistic proportions. Featuring self-balancing technology and solid construction, they offer a unique and satisfying control experience. A perfect blend of form and function, designed to last.",
    image_url: u("1609160089140-8da843632872"),
    display_order: 5,
    is_active: true,
  },
  {
    slug: "modern-gliders-planes",
    title: "Modern Gliders & Planes",
    description:
      "Sleek wings, durable foam. Form follows function — and lasts.",
    longDescription:
      "Inspired by the beauty of flight, these aircraft feature sleek, futuristic designs and durable materials. Light yet strong, they are easy to fly and stable in the air. With clean shapes and matte finishes, they represent the perfect balance of performance and design — true to the Well Made promise.",
    image_url: u("1606370744289-16795bbded58"),
    display_order: 6,
    is_active: true,
  },
  {
    slug: "handheld-gimbals",
    title: "Handheld Gimbals",
    description:
      "Smooth, stabilized capture. Pocketable design, intuitive control.",
    longDescription:
      "Steady footage, effortlessly. Our handheld gimbals are engineered for smooth, professional-grade stabilization in a compact, considered form. Foldable frames, balanced weight, and intuitive controls make them as comfortable to carry as they are to use. Clean lines, matte finishes, and the same quiet attention to detail that defines every Well Made product.",
    image_url: u("1606220588913-7e1d2e60a3df"),
    display_order: 7,
    is_active: true,
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
