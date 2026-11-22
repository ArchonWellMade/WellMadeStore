import { PHOTOS } from "@/shared/data/photos";

/** RC Adventure play zones. */
export type Track = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  machines: string[];
  features: string[];
  photo: string;
};

export const TRACKS: Track[] = [
  {
    slug: "dirt-rally-circuit",
    name: "Dirt Rally Circuit",
    tagline: "Jumps, berms and full-send straights.",
    description:
      "A looping off-road circuit cut into packed dirt with banked corners, tabletop jumps and a timed lap board. Race your mates or chase your own best lap.",
    machines: ["Rally cars", "Buggies", "Monster trucks"],
    features: ["Tabletop jumps", "Banked berms", "Lap timing"],
    photo: PHOTOS.rallyBuggyDust,
  },
  {
    slug: "dig-site",
    name: "The Dig Site",
    tagline: "Real dirt. Real digging. Your controls.",
    description:
      "A construction zone sandpit where you run RC excavators, bulldozers, wheel loaders and dump trucks. Dig trenches, push piles, load up and haul it across the site.",
    machines: ["Excavators", "Bulldozers", "Wheel loaders", "Dump trucks"],
    features: ["Deep sandpit", "Loading ramps", "Haul road"],
    photo: PHOTOS.excavatorRocks,
  },
  {
    slug: "rock-crawler-trail",
    name: "Rock Crawler Trail",
    tagline: "Slow, technical, and seriously satisfying.",
    description:
      "A mountain-style trail of boulders, logs, steep climbs and a creek crossing. Pick your line, feather the throttle and see if you can clear it without a tow.",
    machines: ["Crawlers", "4x4 trucks"],
    features: ["Boulder field", "Log steps", "Creek crossing"],
    photo: PHOTOS.crawlerClimb,
  },
  {
    slug: "drift-pad",
    name: "Drift Pad",
    tagline: "Smooth surface. Sideways all day.",
    description:
      "A polished indoor pad with a figure-eight layout built for mini drift cars. Learn to hold a slide, link the corners and tandem with a friend.",
    machines: ["Mini drift cars"],
    features: ["Figure-eight layout", "Indoor surface", "Tandem lanes"],
    photo: PHOTOS.driftChassis,
  },
];

export const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Book a session",
    body: "Pick a time and how many drivers. Walk-ins welcome when there's room.",
  },
  {
    step: "02",
    title: "Grab your machine",
    body: "Choose from our fleet of RC cars, crawlers, dozers and excavators — or bring your own.",
  },
  {
    step: "03",
    title: "Hit the tracks",
    body: "Our crew shows you the controls, then the dirt is yours. Swap machines and tracks as you go.",
  },
];
