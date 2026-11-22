/**
 * Free-licence photography from Unsplash (unsplash.com/license — free for
 * commercial use, no attribution required). Swap for real venue photos when
 * available: replace the URL, keep the key.
 */
const u = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=2000&q=80`;

export const PHOTOS = {
  heroCrawler: u("1706128456400-a9a87d5225d2"),
  rallyBuggyDust: u("1741271255053-ec4527d2a5cc"),
  excavatorRocks: u("1782946129296-461502ba8b44"),
  excavatorSandpit: u("1700514854603-677e50c553f3"),
  crawlerClimb: u("1627822607498-03d869bdf91f"),
  driftChassis: u("1659307232413-70107855857c"),
  driverWithBuggy: u("1579271723124-a758848c2753"),
  crawlerDirtHill: u("1706128456308-1aeba974a757"),
  crawlerCreek: u("1627822607476-d807c28ba78d"),
  truckNightLights: u("1640503935735-d82ac5d4e6d5"),
  crawlerForestLog: u("1650388137315-407dbe92c3d0"),
  crawlerRockFace: u("1627822607450-1289e181f30a"),
} as const;
