# AirportCarPark — Backend API

Node + TypeScript + Express. Serves the API used by `frontend/` and, later, `admin/`.

## Setup

```bash
npm install
cp .env.example .env   # then put the Quick Access Parking key in QAP_API_KEY
npm run dev            # http://127.0.0.1:4000, restarts on file changes
```

Production:

```bash
npm run build          # compiles to dist/
npm start              # runs dist/server.js
```

The server will not start without `QAP_API_KEY`. `.env` is git-ignored — never commit it.

## Endpoints

| Method | Path | Description |
|---|---|---|
| GET | `/api/health` | Liveness check: `{ "ok": true }` |
| GET | `/api/parking/products` | Live parking products and prices from Quick Access Parking |

`/api/parking/products` query parameters:

| Name | Required | Example | Notes |
|---|---|---|---|
| `airport` | yes | `MAN` | Only Manchester is enabled |
| `departure` | yes | `12-12-2026 06:30` | `dd-mm-YYYY hh:mm`, UK time |
| `arrival` | yes | `20-12-2026 18:00` | Must be after departure |
| `discount_code` | no | `NEWYEAR2026` | Letters, numbers, `-`, `_` |
| `sku` | no | `ACP002` | Returns just that product (live price check) |

Responses use the provider's shape: `{ success, response_code, message, data[] }`. Errors use the same shape.

## Security

- **API key** lives only in `backend/.env` and is added to requests in `src/services/qapClient.ts`.
  Upstream URLs (which contain the key) are never logged or returned.
- **Input validation** before any upstream call: airport allow-list, strict date format, max 365-day stay,
  safe characters only in promo codes and SKUs.
- **Per-visitor rate limit**: `RATE_LIMIT_PER_MINUTE` searches per IP per minute (default 30).
- **Upstream budget**: at most `QAP_BUDGET_PER_MINUTE` calls to the provider per minute across all visitors
  (default 100; the provider allows 120). Identical searches are cached for `QAP_CACHE_TTL_MS` and
  concurrent identical searches share one call.
- **Helmet** security headers. **CORS is off** unless `CORS_ORIGINS` lists allowed origins.
- **Errors** are logged server-side; visitors get a generic message, never stack traces or provider details.
- Listens on `127.0.0.1` by default. Behind a reverse proxy in production, set `HOST=0.0.0.0` only if needed
  and `TRUST_PROXY` to the number of proxies so rate limits see real client IPs.

## Structure

```
src/
├── server.ts             starts the server, graceful shutdown
├── app.ts                middleware (helmet, CORS, logging, rate limit), routes, error handling
├── config.ts             settings from environment / .env, validated at startup
├── routes/parking.ts     GET /api/parking/products
├── services/qapClient.ts Quick Access Parking client (key, cache, budget, timeouts)
└── lib/                  validation, cache, response helpers
```
