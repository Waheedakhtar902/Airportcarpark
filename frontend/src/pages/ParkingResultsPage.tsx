import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CalendarDays, CircleAlert, RefreshCw, SearchX } from 'lucide-react';
import { SearchCard } from '@/components/home/SearchCard';
import { ProductCard } from '@/components/results/ProductCard';
import { Button } from '@/components/ui/Button';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import { useParkingProducts } from '@/hooks/useParkingProducts';
import { labelForType } from '@/api/parking';
import { chargedDays, formatLocal, searchAirports, searchFromParams } from '@/lib/search';
import styles from './ParkingResultsPage.module.css';

type Sort = 'price-asc' | 'price-desc';

export default function ParkingResultsPage() {
  const [params, setParams] = useSearchParams();
  const search = useMemo(() => searchFromParams(params), [params]);
  const [attempt, setAttempt] = useState(0);
  const [sort, setSort] = useState<Sort>('price-asc');
  const state = useParkingProducts(search, attempt);

  const airportName = searchAirports.find((a) => a.code === search.airport)?.name ?? search.airport;
  const days = chargedDays(search);

  useDocumentMeta(
    `${airportName} parking prices | AirportCarPark.co.uk`,
    `Live parking prices at ${airportName} from trusted operators.`,
  );

  const products = state.status === 'success' ? state.products : [];
  const typeCounts = useMemo(() => {
    const counts = new Map<string, number>();
    products.forEach((p) => counts.set(p.type, (counts.get(p.type) ?? 0) + 1));
    return counts;
  }, [products]);

  // Only apply the type filter when that type is actually in the results.
  const activeType = search.type && typeCounts.has(search.type) ? search.type : undefined;
  const setType = (type?: string) => {
    const next = new URLSearchParams(params);
    if (type) next.set('type', type); else next.delete('type');
    setParams(next, { replace: true, preventScrollReset: true });
  };

  const visible = useMemo(() => {
    const list = activeType ? products.filter((p) => p.type === activeType) : [...products];
    return list.sort((a, b) => (sort === 'price-asc' ? a.price - b.price : b.price - a.price));
  }, [products, activeType, sort]);
  const cheapestPrice = products.length ? Math.min(...products.map((p) => p.price)) : undefined;

  return (
    <>
      <section className={styles.band}>
        <div className="container">
          <p className={styles.eyebrow}>Parking results</p>
          <h1 className={styles.title}>{airportName} parking</h1>
          <p className={styles.dates}>
            <CalendarDays size={18} aria-hidden="true" />
            {formatLocal(search.from)} → {formatLocal(search.to)}
            {days > 0 && <span className={styles.days}>{days} {days === 1 ? 'day' : 'days'}</span>}
          </p>
        </div>
      </section>

      {/* Re-mount the form when the URL search changes so it shows the current values. */}
      <SearchCard key={params.toString()} initial={search} />

      <section className={styles.results} aria-live="polite" aria-busy={state.status === 'loading'}>
        <div className="container">
          {state.status === 'loading' && (
            <>
              <p className={styles.count}>Finding the best prices…</p>
              <div className={styles.list}>
                {[0, 1, 2].map((i) => <div key={i} className={styles.skeleton} aria-hidden="true" />)}
              </div>
            </>
          )}

          {state.status === 'error' && (
            <div className={styles.message}>
              <CircleAlert size={36} className={styles.messageIconError} aria-hidden="true" />
              <h2>We couldn’t load prices</h2>
              <p>{state.message}</p>
              <Button variant="navy" onClick={() => setAttempt((n) => n + 1)}>
                <RefreshCw size={16} aria-hidden="true" /> Try again
              </Button>
            </div>
          )}

          {state.status === 'success' && products.length === 0 && (
            <div className={styles.message}>
              <SearchX size={36} className={styles.messageIcon} aria-hidden="true" />
              <h2>No parking available for these dates</h2>
              <p>Every car park is full or not taking bookings for those times. Try different dates or times above.</p>
            </div>
          )}

          {state.status === 'success' && products.length > 0 && (
            <>
              <div className={styles.toolbar}>
                <p className={styles.count}>
                  <strong>{visible.length}</strong> {visible.length === 1 ? 'car park' : 'car parks'} available
                  {search.promo && <span className={styles.promo}>Promo {search.promo} applied where valid</span>}
                </p>
                <div className={styles.controls}>
                  <div className={styles.chips} role="group" aria-label="Filter by parking type">
                    <button type="button" aria-pressed={!activeType} onClick={() => setType()}>
                      All ({products.length})
                    </button>
                    {[...typeCounts].map(([type, count]) => (
                      <button key={type} type="button" aria-pressed={activeType === type} onClick={() => setType(type)}>
                        {labelForType(type)} ({count})
                      </button>
                    ))}
                  </div>
                  <label className={styles.sort}>
                    <span>Sort</span>
                    <select value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
                      <option value="price-asc">Lowest price</option>
                      <option value="price-desc">Highest price</option>
                    </select>
                  </label>
                </div>
              </div>

              <div className={styles.list}>
                {visible.map((p, i) => (
                  <ProductCard
                    key={p.sku}
                    product={p}
                    search={search}
                    days={days}
                    eager={i < 2}
                    cheapest={products.length > 1 && p.price === cheapestPrice}
                  />
                ))}
              </div>
              <p className={styles.footnote}>
                Prices are live for your dates and include every calendar day from drop-off to pick-up.
              </p>
            </>
          )}
        </div>
      </section>
    </>
  );
}
