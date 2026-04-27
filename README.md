# WellMadeStore

Next.js storefront for RC cars, motorcycles, drones, planes, boats, helicopters, novelty flying RC swords, and parts/accessories.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Stack

- Next.js 16 · React 19 · TypeScript
- Tailwind v4 (`@tailwindcss/postcss`) with `@theme` tokens in `src/app/globals.css`
- Geist + Fraunces fonts
- Static seed data in `src/shared/data/` — schema-shaped to swap to Supabase later

## Layout

```
src/
├── app/                 # Routes, layout, globals.css
├── frontend/components/ # site/ + ui/
└── shared/              # utils, format, data/
```

## Scripts

- `npm run dev` — dev server (Turbopack)
- `npm run build` — production build
- `npm run start` — serve built output
- `npm run lint` — ESLint
