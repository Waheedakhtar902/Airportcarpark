# AirportCarPark — Frontend

React 19 + TypeScript + Vite. Styling with CSS Modules, icons from Lucide.

## Setup

The frontend has no secrets and needs no `.env`. Parking prices come from the API in `backend/`,
so run the backend too (see `backend/README.md`).

## Parking prices

- The browser calls `GET /api/parking/products?…` on the same origin.
- In development, Vite forwards `/api` to the backend at `http://127.0.0.1:4000`
  (override with the `API_PROXY_TARGET` environment variable).
- In production, serve `dist/` and route `/api` to the backend from the same domain (e.g. with a reverse proxy).
- Product HTML from the API (features, overview, procedures, terms) is sanitised with DOMPurify before display.

## Commands

```bash
npm install      # first time only
npm run dev      # http://127.0.0.1:5173
npm run build    # type-check + production build into dist/
npm run preview  # serve the production build on http://127.0.0.1:4173
```

## Structure

```
src/
├── app/router.tsx          routes (each page lazy-loaded as its own chunk)
├── pages/                  one file per page (HomePage, NotFoundPage)
├── components/
│   ├── layout/             SiteLayout, TopBar, Navbar, Footer
│   ├── home/               home page sections
│   └── ui/                 shared pieces: Logo, Button, SectionHead
├── data/                   page content (to be replaced by backend API calls)
├── types/                  shared TypeScript types
├── hooks/                  shared hooks
└── styles/                 tokens.css (brand palette), global.css, fonts
```

## Assets and performance

- Logo and favicon are inline SVG (~1 KB) instead of the 219 KB JPEG.
- Hero and phone illustrations are pure CSS/SVG — no image downloads.
- Fonts (Inter, Inter Tight) are self-hosted: Latin subset, only the weights used, WOFF2.
- Icons are tree-shaken, so only the icons used are bundled.
- `vite-plugin-image-optimizer` compresses every image placed in `public/` or imported from `src/` at build time.
- New photos: add them under `src/assets/`, import them, and use `loading="lazy"` with explicit `width`/`height`.
