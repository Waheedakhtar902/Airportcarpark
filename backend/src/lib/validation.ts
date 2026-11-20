/** Input checks for parking searches. Everything is validated before any call to the provider. */

export const ALLOWED_AIRPORTS = new Set(['MAN']);

/** dd-mm-YYYY hh:mm — the format the provider expects (UK time). */
const DATE_RE = /^(\d{2})-(\d{2})-(\d{4}) (\d{2}):(\d{2})$/;
const CODE_RE = /^[A-Za-z0-9_-]{0,40}$/;
const MAX_STAY_DAYS = 365;

export interface ParkingQuery {
  airport: string;
  departure: string;
  arrival: string;
  discountCode: string;
  sku: string;
}

export class ValidationError extends Error {}

function parseDate(value: string): number | null {
  const m = DATE_RE.exec(value);
  if (!m) return null;
  const [, d, mo, y, h, mi] = m.map(Number) as [number, number, number, number, number, number];
  if (mo < 1 || mo > 12 || d < 1 || d > 31 || h > 23 || mi > 59) return null;
  const date = new Date(Date.UTC(y, mo - 1, d, h, mi));
  return date.getUTCDate() === d ? date.getTime() : null; // rejects e.g. 31-02
}

/** Express 5 query values can be strings, arrays or objects; only accept a single string. */
const single = (value: unknown): string => (typeof value === 'string' ? value.trim() : '');

export function parseParkingQuery(query: Record<string, unknown>): ParkingQuery {
  const airport = single(query.airport).toUpperCase();
  const departure = single(query.departure);
  const arrival = single(query.arrival);
  const discountCode = single(query.discount_code);
  const sku = single(query.sku);

  if (!ALLOWED_AIRPORTS.has(airport)) throw new ValidationError('Only Manchester Airport (MAN) is available at the moment');

  const from = parseDate(departure);
  const to = parseDate(arrival);
  if (from === null || to === null) throw new ValidationError('departure and arrival must be in dd-mm-YYYY hh:mm format');
  if (to <= from) throw new ValidationError('Pick-up must be after drop-off');
  if (to - from > MAX_STAY_DAYS * 86_400_000) throw new ValidationError(`Stays can be at most ${MAX_STAY_DAYS} days`);

  if (!CODE_RE.test(discountCode)) throw new ValidationError('Invalid promo code');
  if (!CODE_RE.test(sku)) throw new ValidationError('Invalid product reference');

  return { airport, departure, arrival, discountCode, sku };
}
