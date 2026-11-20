/**
 * Quick Access Parking (QAP) Product API client.
 * The API key is added here and nowhere else. Upstream URLs (which contain the key) are never logged
 * or returned to callers.
 */
import { config } from '../config.js';
import { MinuteBudget, TtlCache } from '../lib/cache.js';
import type { ParkingQuery } from '../lib/validation.js';

export interface UpstreamResult {
  status: number;
  /** Parsed JSON body from QAP, passed back to the browser unchanged. */
  body: unknown;
}

export class UpstreamError extends Error {
  constructor(message: string, readonly status: number) {
    super(message);
  }
}

const cache = new TtlCache<UpstreamResult>(config.qap.cacheTtlMs);
const budget = new MinuteBudget(config.qap.upstreamBudgetPerMinute);
/** Identical searches arriving at the same moment share one upstream call. */
const inFlight = new Map<string, Promise<UpstreamResult>>();

function buildUrl(q: ParkingQuery): URL {
  // QAP: /products/ returns every product; /product/ returns one by SKU.
  const url = new URL(`${config.qap.apiBase}${q.sku ? '/product/' : '/products/'}`);
  url.searchParams.set('key', config.qap.apiKey);
  url.searchParams.set('airport', q.airport);
  url.searchParams.set('departure', q.departure);
  url.searchParams.set('arrival', q.arrival);
  url.searchParams.set('return_response', 'full');
  if (q.discountCode) url.searchParams.set('discount_code', q.discountCode);
  if (q.sku) url.searchParams.set('sku', q.sku);
  return url;
}

async function callUpstream(q: ParkingQuery): Promise<UpstreamResult> {
  if (!budget.take()) {
    throw new UpstreamError('Lots of people are searching right now. Please try again in a minute.', 503);
  }

  let response: Response;
  try {
    response = await fetch(buildUrl(q), {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(config.qap.timeoutMs),
    });
  } catch (err) {
    const timedOut = err instanceof Error && err.name === 'TimeoutError';
    throw new UpstreamError(
      timedOut ? 'The parking provider took too long to respond' : 'Could not reach the parking provider',
      timedOut ? 504 : 502,
    );
  }

  let body: unknown;
  try {
    body = await response.json();
  } catch {
    // Never pass upstream HTML error pages through.
    throw new UpstreamError('The parking provider returned an unexpected response', 502);
  }

  if (response.status === 401) {
    // Our key was rejected. Log it for us; tell the visitor something generic.
    console.error('[qap] API key rejected (401). Check QAP_API_KEY.');
    throw new UpstreamError('Parking prices are temporarily unavailable', 502);
  }

  return { status: response.status, body };
}

export async function getParkingProducts(q: ParkingQuery): Promise<UpstreamResult> {
  const key = [q.airport, q.departure, q.arrival, q.discountCode, q.sku].join('|');

  const cached = cache.get(key);
  if (cached) return cached;

  const pending = inFlight.get(key);
  if (pending) return pending;

  const request = callUpstream(q)
    .then((result) => {
      if (result.status === 200) cache.set(key, result);
      return result;
    })
    .finally(() => inFlight.delete(key));
  inFlight.set(key, request);
  return request;
}
