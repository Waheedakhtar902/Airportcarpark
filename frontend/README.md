# AirportCarPark — Frontend

React 19 + TypeScript + Vite. Styling with CSS Modules, icons from Lucide.

## Setup

Copy `.env.example` to `.env` and add the Quick Access Parking API key. `.env` is git-ignored.
The key is read only by the server-side proxy and never reaches the browser.

## Parking prices (Quick Access Parking API)

- The browser calls our own `GET /api/parking/products?airport=MAN&departure=dd-mm-YYYY hh:mm&arrival=…[&discount_code=…][&sku=…]`.
- `server/parkingApi.ts` adds the API key and forwards to QAP (`/products/` for all, `/product/` for one SKU).
  It validates input, allows Manchester (MAN) only, times out after 15 s and caches identical searches for 60 s
  (QAP allows 120 requests a minute).
- The proxy currently runs inside `vite` (dev) and `vite preview`. **For production, `backend/` must serve the same
  route**; the frontend does not need to change.
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
