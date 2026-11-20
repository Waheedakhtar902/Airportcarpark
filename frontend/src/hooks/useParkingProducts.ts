import { useEffect, useState } from 'react';
import { ParkingApiError, searchParkingProducts, type ParkingProduct } from '@/api/parking';
import { validateSearch, type ParkingSearch } from '@/lib/search';

type State =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; products: ParkingProduct[] };

/** Fetches live products for a search. Cancels the previous request when the search changes. */
export function useParkingProducts(search: ParkingSearch, attempt = 0): State {
  const [state, setState] = useState<State>({ status: 'loading' });
  const { airport, from, to, promo } = search;

  useEffect(() => {
    const query = { airport, from, to, promo };
    const problem = validateSearch(query);
    if (problem) {
      setState({ status: 'error', message: problem });
      return;
    }

    const controller = new AbortController();
    setState({ status: 'loading' });
    searchParkingProducts(query, controller.signal)
      .then((products) => setState({ status: 'success', products }))
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        setState({
          status: 'error',
          message: err instanceof ParkingApiError ? err.message : 'Something went wrong fetching prices. Please try again.',
        });
      });
    return () => controller.abort();
  }, [airport, from, to, promo, attempt]);

  return state;
}
