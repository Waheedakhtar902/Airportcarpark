/**
 * Parking search state, shared by the search form and the results page.
 * It lives in the URL (/parking/results?…) so results can be bookmarked, shared and refreshed.
 */

/** Airports bookable right now. Only Manchester is connected to the parking API. */
export const searchAirports = [{ code: 'MAN', name: 'Manchester Airport', label: 'Manchester (MAN)' }] as const;
export const DEFAULT_AIRPORT = 'MAN';

export interface ParkingSearch {
  airport: string;
  /** Local (UK) date-time in the <input type="datetime-local"> format: YYYY-MM-DDTHH:mm */
  from: string;
  to: string;
  promo: string;
  /** Optional product-type filter for the results page, e.g. park_and_ride. */
  type?: string;
}

const pad = (n: number) => String(n).padStart(2, '0');

/** Date → YYYY-MM-DDTHH:mm in the visitor's local time. */
export const toLocalInput = (d: Date): string =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;

/** YYYY-MM-DDTHH:mm → dd-mm-YYYY hh:mm (the API's format, UK time). */
export function toApiDate(local: string): string {
  const [date = '', time = ''] = local.split('T');
  const [y, m, d] = date.split('-');
  return `${d}-${m}-${y} ${time.slice(0, 5)}`;
}

/** Parses YYYY-MM-DDTHH:mm as a local Date (null if invalid). */
export function parseLocal(local: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(local);
  if (!match) return null;
  const [, y, mo, d, h, mi] = match.map(Number);
  const date = new Date(y, mo - 1, d, h, mi);
  return date.getMonth() === mo - 1 ? date : null;
}

/** Default stay length in charged days, counting both the drop-off and pick-up days (1st → 8th = 8 days). */
export const DEFAULT_STAY_DAYS = 8;

/**
 * Pick-up for a given drop-off: the same stay length later (day 8 by default), keeping `keepTime` (HH:mm)
 * if given, otherwise the drop-off time. Returns '' if the drop-off is invalid.
 */
export function pickupFor(fromLocal: string, keepTime?: string, stayDays = DEFAULT_STAY_DAYS): string {
  const from = parseLocal(fromLocal);
  if (!from) return '';
  const to = new Date(from);
  to.setDate(to.getDate() + stayDays - 1);
  const time = /^\d{2}:\d{2}$/.test(keepTime ?? '') ? keepTime! : fromLocal.slice(11, 16);
  return `${toLocalInput(to).slice(0, 10)}T${time}`;
}

/** Default search: drop off today at the next half-hour slot at least 30 minutes away; pick up on day 8. */
export function defaultSearch(now = new Date()): ParkingSearch {
  const from = new Date(now.getTime() + 30 * 60_000);
  const roundUp = from.getMinutes() % 30 === 0 && from.getSeconds() === 0 ? 0 : 30 - (from.getMinutes() % 30);
  from.setMinutes(from.getMinutes() + roundUp, 0, 0);
  const fromLocal = toLocalInput(from);
  return { airport: DEFAULT_AIRPORT, from: fromLocal, to: pickupFor(fromLocal), promo: '' };
}

export function searchFromParams(params: URLSearchParams): ParkingSearch {
  const fallback = defaultSearch();
  return {
    airport: params.get('airport')?.toUpperCase() || fallback.airport,
    from: params.get('from') || fallback.from,
    to: params.get('to') || fallback.to,
    promo: params.get('promo') ?? '',
    type: params.get('type') || undefined,
  };
}

export function searchToParams(search: ParkingSearch): URLSearchParams {
  const params = new URLSearchParams({ airport: search.airport, from: search.from, to: search.to });
  if (search.promo.trim()) params.set('promo', search.promo.trim());
  if (search.type) params.set('type', search.type);
  return params;
}

/** Returns an error message, or null if the search is valid. */
export function validateSearch(search: ParkingSearch, now = new Date()): string | null {
  if (!searchAirports.some((a) => a.code === search.airport)) return 'Please choose an airport.';
  const from = parseLocal(search.from);
  const to = parseLocal(search.to);
  if (!from) return 'Please choose a drop-off date and time.';
  if (!to) return 'Please choose a pick-up date and time.';
  if (from.getTime() < now.getTime()) return 'Drop-off must be in the future.';
  if (to.getTime() <= from.getTime()) return 'Pick-up must be after drop-off.';
  if (search.promo.length > 40 || !/^[\w-]*$/.test(search.promo.trim())) return 'Promo codes can only contain letters, numbers and dashes.';
  return null;
}

/** Days charged by the provider: every calendar day, counting both drop-off and pick-up days. */
export function chargedDays(search: ParkingSearch): number {
  const from = parseLocal(search.from);
  const to = parseLocal(search.to);
  if (!from || !to) return 0;
  const start = Date.UTC(from.getFullYear(), from.getMonth(), from.getDate());
  const end = Date.UTC(to.getFullYear(), to.getMonth(), to.getDate());
  return Math.round((end - start) / 86_400_000) + 1;
}

const displayFormat = new Intl.DateTimeFormat('en-GB', {
  weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',
});

/** YYYY-MM-DDTHH:mm → "Fri 12 Dec, 06:30" */
export function formatLocal(local: string): string {
  const d = parseLocal(local);
  return d ? displayFormat.format(d) : '';
}

/** Maps a parking-type page slug to the API product type used to pre-filter results. */
export const slugToProductType: Record<string, string> = {
  'park-and-ride': 'park_and_ride',
  'meet-and-greet': 'meet_and_greet',
};
