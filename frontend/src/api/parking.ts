/**
 * Client for our own /api/parking/products endpoint, served by backend/ (see backend/src/routes/parking.ts),
 * which calls the Quick Access Parking API server-side. The frontend holds no API keys.
 */
import { toApiDate, type ParkingSearch } from '@/lib/search';

export type ParkingProductType = 'meet_and_greet' | 'park_and_ride' | 'covered_self_park' | 'self_parking';

/** One product as returned by the API (fields we use; the rest are ignored). */
export interface ParkingProduct {
  id: number;
  sku: string;
  name: string;
  image: string | null;
  /** Whole-stay price in GBP, after any discount. */
  price: number;
  price_before_discount: number;
  discount: number;
  cancellation: boolean;
  cancellation_charges: number;
  airport_code: string;
  airport_name: string;
  terminals: string[];
  /** HTML list of features. */
  features: string;
  type: ParkingProductType | string;
  /** HTML. Present because we request return_response=full. */
  overview?: string;
  drop_procedure?: string;
  return_procedure?: string;
  terms_conditions?: string;
}

interface ApiResponse {
  success: boolean;
  response_code: number;
  message: string;
  data: ParkingProduct[];
}

export class ParkingApiError extends Error {
  constructor(message: string, readonly status: number) {
    super(message);
    this.name = 'ParkingApiError';
  }
}

export const productTypeLabels: Record<string, string> = {
  meet_and_greet: 'Meet & Greet',
  park_and_ride: 'Park & Ride',
  covered_self_park: 'Covered Self Park',
  self_parking: 'Self Park',
};

export const labelForType = (type: string): string =>
  productTypeLabels[type] ?? type.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

/** Friendlier wording for the API's error codes. */
function messageFor(status: number, apiMessage: string): string {
  switch (status) {
    case 400: return apiMessage || 'Please check your dates and try again.';
    case 401: return 'Parking prices are temporarily unavailable. Please try again later.';
    case 404: return 'We couldn’t find parking for that airport.';
    case 429: return 'Lots of people are searching right now. Please wait a moment and try again.';
    default: return apiMessage || 'Something went wrong fetching prices. Please try again.';
  }
}

async function request(params: Record<string, string>, signal?: AbortSignal): Promise<ApiResponse> {
  const query = new URLSearchParams(Object.entries(params).filter(([, v]) => v !== ''));
  let response: Response;
  try {
    response = await fetch(`/api/parking/products?${query}`, { signal, headers: { Accept: 'application/json' } });
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') throw err;
    throw new ParkingApiError('We couldn’t connect. Check your internet connection and try again.', 0);
  }

  let body: ApiResponse;
  try {
    body = (await response.json()) as ApiResponse;
  } catch {
    throw new ParkingApiError(messageFor(response.status, ''), response.status);
  }
  if (!response.ok || !body.success) {
    const status = body.response_code || response.status;
    throw new ParkingApiError(messageFor(status, body.message), status);
  }
  return body;
}

const baseParams = (search: ParkingSearch) => ({
  airport: search.airport,
  departure: toApiDate(search.from),
  arrival: toApiDate(search.to),
  discount_code: search.promo,
});

/** All products with live prices for the search. Products with no price for the dates are omitted by the API. */
export async function searchParkingProducts(search: ParkingSearch, signal?: AbortSignal): Promise<ParkingProduct[]> {
  const body = await request(baseParams(search), signal);
  return body.data ?? [];
}

/** Re-checks one product's live price before booking. Returns null if no longer available for the dates. */
export async function getParkingProduct(
  sku: string, search: ParkingSearch, signal?: AbortSignal,
): Promise<ParkingProduct | null> {
  const body = await request({ ...baseParams(search), sku }, signal);
  return body.data?.[0] ?? null;
}
