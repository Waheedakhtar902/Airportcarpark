/**
 * Server-side proxy for the Quick Access Parking (QAP) Product API.
 *
 * The browser calls  GET /api/parking/products?airport=MAN&departure=…&arrival=…[&discount_code=…][&sku=…]
 * and this handler adds the secret API key before calling QAP. The key never reaches the browser.
 *
 * It runs inside the Vite dev/preview servers for now. When backend/ is built, it should serve the
 * same route with the same behaviour, and the frontend will not need to change.
 */
import type { IncomingMessage, ServerResponse } from 'node:http';
import type { Plugin } from 'vite';

const ROUTE = '/api/parking/products';
const ALLOWED_AIRPORTS = new Set(['MAN']);
const DATE_RE = /^\d{2}-\d{2}-\d{4} \d{2}:\d{2}$/; // dd-mm-YYYY hh:mm, as QAP expects
const CACHE_TTL_MS = 60_000; // QAP allows 120 requests a minute; identical searches reuse the result
const UPSTREAM_TIMEOUT_MS = 15_000;

interface ProxyConfig {
  apiBase: string;
  apiKey: string;
}

interface CachedResponse {
  status: number;
  body: string;
  expires: number;
}

const cache = new Map<string, CachedResponse>();

function send(res: ServerResponse, status: number, body: string) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(body);
}

function sendError(res: ServerResponse, status: number, message: string) {
  send(res, status, JSON.stringify({ success: false, response_code: status, message, data: [] }));
}

async function handle(req: IncomingMessage, res: ServerResponse, config: ProxyConfig) {
  if (req.method !== 'GET') return sendError(res, 405, 'Method not allowed');
  if (!config.apiKey) return sendError(res, 500, 'Parking API is not configured (QAP_API_KEY missing)');

  const url = new URL(req.url ?? '', 'http://localhost');
  const airport = (url.searchParams.get('airport') ?? '').toUpperCase();
  const departure = url.searchParams.get('departure') ?? '';
  const arrival = url.searchParams.get('arrival') ?? '';
  const discountCode = (url.searchParams.get('discount_code') ?? '').trim();
  const sku = (url.searchParams.get('sku') ?? '').trim();

  // Validate before spending an upstream request.
  if (!ALLOWED_AIRPORTS.has(airport)) return sendError(res, 400, 'Only Manchester Airport (MAN) is available at the moment');
  if (!DATE_RE.test(departure) || !DATE_RE.test(arrival)) {
    return sendError(res, 400, 'departure and arrival must be in dd-mm-YYYY hh:mm format');
  }
  if (discountCode.length > 40 || !/^[\w-]*$/.test(discountCode)) return sendError(res, 400, 'Invalid promo code');
  if (sku.length > 40 || !/^[\w-]*$/.test(sku)) return sendError(res, 400, 'Invalid product reference');

  // QAP: /products/ lists everything; /product/ returns one product by SKU.
  const upstream = new URL(`${config.apiBase.replace(/\/$/, '')}${sku ? '/product/' : '/products/'}`);
  upstream.searchParams.set('key', config.apiKey);
  upstream.searchParams.set('airport', airport);
  upstream.searchParams.set('departure', departure);
  upstream.searchParams.set('arrival', arrival);
  upstream.searchParams.set('return_response', 'full');
  if (discountCode) upstream.searchParams.set('discount_code', discountCode);
  if (sku) upstream.searchParams.set('sku', sku);

  // Cache key excludes the API key.
  const cacheKey = [airport, departure, arrival, discountCode, sku].join('|');
  const hit = cache.get(cacheKey);
  if (hit && hit.expires > Date.now()) return send(res, hit.status, hit.body);

  try {
    const response = await fetch(upstream, {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    });
    const body = await response.text();

    // Only pass through well-formed JSON; never echo upstream HTML error pages.
    try {
      JSON.parse(body);
    } catch {
      return sendError(res, 502, 'The parking provider returned an unexpected response');
    }

    if (response.ok) cache.set(cacheKey, { status: response.status, body, expires: Date.now() + CACHE_TTL_MS });
    return send(res, response.status, body);
  } catch (err) {
    const timedOut = err instanceof Error && err.name === 'TimeoutError';
    return sendError(res, timedOut ? 504 : 502, timedOut ? 'The parking provider took too long to respond' : 'Could not reach the parking provider');
  }
}

/** Vite plugin that mounts the proxy on both `vite` (dev) and `vite preview`. */
export function parkingApiPlugin(config: ProxyConfig): Plugin {
  const middleware = (req: IncomingMessage, res: ServerResponse, next: () => void) => {
    if (!req.url?.startsWith(ROUTE)) return next();
    void handle(req, res, config);
  };

  return {
    name: 'parking-api-proxy',
    configureServer(server) {
      server.middlewares.use(middleware);
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware);
    },
  };
}
