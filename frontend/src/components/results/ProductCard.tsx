import { useId, useMemo, useState } from 'react';
import { Check, ChevronDown, CircleAlert, Info, Loader2, ShieldCheck, SquareParking } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { getParkingProduct, labelForType, ParkingApiError, type ParkingProduct } from '@/api/parking';
import { formatPrice } from '@/data/format';
import { hasText, htmlListToItems, sanitizeHtml } from '@/lib/html';
import type { ParkingSearch } from '@/lib/search';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: ParkingProduct;
  search: ParkingSearch;
  days: number;
  cheapest?: boolean;
  /** Load the image immediately (cards visible on first paint). */
  eager?: boolean;
}

type Confirm =
  | { status: 'idle' }
  | { status: 'checking' }
  | { status: 'confirmed'; price: number; changed: boolean }
  | { status: 'unavailable' }
  | { status: 'error'; message: string };

const detailTabs = [
  { key: 'overview', label: 'Overview' },
  { key: 'drop_procedure', label: 'Drop-off' },
  { key: 'return_procedure', label: 'Collection' },
  { key: 'terms_conditions', label: 'Terms' },
] as const;

export function ProductCard({ product, search, days, cheapest, eager }: ProductCardProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [tab, setTab] = useState<(typeof detailTabs)[number]['key']>('overview');
  const [confirm, setConfirm] = useState<Confirm>({ status: 'idle' });
  const detailsId = useId();

  const features = useMemo(() => htmlListToItems(product.features), [product.features]);
  const hasDiscount = product.price_before_discount > product.price;
  const perDay = days > 0 ? product.price / days : 0;

  // Sanitise third-party HTML only when the visitor opens the details.
  const sections = useMemo(() => {
    if (!detailsOpen) return [];
    return detailTabs
      .map((t) => ({ ...t, html: sanitizeHtml(product[t.key]) }))
      .filter((t) => hasText(t.html));
  }, [detailsOpen, product]);
  const activeSection = sections.find((s) => s.key === tab) ?? sections[0];

  const handleSelect = async () => {
    setConfirm({ status: 'checking' });
    try {
      const live = await getParkingProduct(product.sku, search);
      if (!live) setConfirm({ status: 'unavailable' });
      else setConfirm({ status: 'confirmed', price: live.price, changed: Math.abs(live.price - product.price) > 0.001 });
    } catch (err) {
      setConfirm({
        status: 'error',
        message: err instanceof ParkingApiError ? err.message : 'We couldn’t confirm the price. Please try again.',
      });
    }
  };

  return (
    <article className={`${styles.card} ${cheapest ? styles.cheapest : ''}`} aria-labelledby={`${detailsId}-name`}>
      <div className={styles.media}>
        {product.image && !imageFailed ? (
          <img
            src={product.image}
            alt=""
            width={256}
            height={212}
            loading={eager ? 'eager' : 'lazy'}
            decoding="async"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <span className={styles.placeholder} aria-hidden="true"><SquareParking size={44} /></span>
        )}
        {cheapest && <span className={styles.flag}>Best price</span>}
      </div>

      <div className={styles.body}>
        <div className={styles.tags}>
          <span className={styles.type}>{labelForType(product.type)}</span>
          <span className={styles.airport}>{product.airport_name || product.airport_code}</span>
          {product.terminals.length > 0 && <span className={styles.airport}>{product.terminals.join(', ')}</span>}
        </div>
        <h3 id={`${detailsId}-name`} className={styles.name}>{product.name}</h3>

        {features.length > 0 && (
          <ul className={styles.features}>
            {features.slice(0, 6).map((f) => (
              <li key={f}><Check size={15} strokeWidth={3} aria-hidden="true" />{f}</li>
            ))}
          </ul>
        )}

        <button
          type="button"
          className={styles.moreBtn}
          aria-expanded={detailsOpen}
          aria-controls={detailsId}
          onClick={() => setDetailsOpen((v) => !v)}
        >
          <Info size={16} aria-hidden="true" /> {detailsOpen ? 'Hide details' : 'Car park details & terms'}
          <ChevronDown size={16} className={detailsOpen ? styles.rotated : ''} aria-hidden="true" />
        </button>
      </div>

      <div className={styles.pricing}>
        <div>
          <small className={styles.forDays}>{days} {days === 1 ? 'day' : 'days'} total</small>
          {hasDiscount && <s className={styles.was}>{formatPrice(product.price_before_discount)}</s>}
          <strong className={styles.price}>{formatPrice(product.price)}</strong>
          <small className={styles.perDay}>≈ {formatPrice(perDay)} per day</small>
          {hasDiscount && <span className={styles.saved}>Promo saves {formatPrice(product.discount)}</span>}
        </div>
        {product.cancellation && (
          <p className={styles.cancel}>
            <ShieldCheck size={15} aria-hidden="true" /> Cancellation cover {formatPrice(product.cancellation_charges)}
          </p>
        )}
        <Button onClick={handleSelect} disabled={confirm.status === 'checking'} className={styles.select}>
          {confirm.status === 'checking' ? <><Loader2 size={18} className={styles.spin} aria-hidden="true" /> Checking…</> : 'Select'}
        </Button>
      </div>

      {confirm.status !== 'idle' && confirm.status !== 'checking' && (
        <div className={`${styles.confirm} ${confirm.status === 'confirmed' ? styles.ok : styles.warn}`} role="status">
          {confirm.status === 'confirmed' && (
            <>
              <Check size={18} strokeWidth={3} aria-hidden="true" />
              <span>
                {confirm.changed ? 'Price updated: ' : 'Live price confirmed: '}
                <strong>{formatPrice(confirm.price)}</strong> for {days} {days === 1 ? 'day' : 'days'}.
                {' '}Online checkout is coming next.
              </span>
            </>
          )}
          {confirm.status === 'unavailable' && (
            <><CircleAlert size={18} aria-hidden="true" /><span>Sorry — this car park is no longer available for your dates.</span></>
          )}
          {confirm.status === 'error' && (
            <><CircleAlert size={18} aria-hidden="true" /><span>{confirm.message}</span></>
          )}
        </div>
      )}

      <div id={detailsId} hidden={!detailsOpen} className={styles.details}>
        {detailsOpen && (sections.length === 0 ? (
          <p className={styles.noDetails}>No further details provided for this car park.</p>
        ) : (
          <>
            <div className={styles.detailTabs} role="tablist" aria-label="Car park information">
              {sections.map((s) => (
                <button
                  key={s.key}
                  type="button"
                  role="tab"
                  aria-selected={activeSection?.key === s.key}
                  className={activeSection?.key === s.key ? styles.detailTabActive : undefined}
                  onClick={() => setTab(s.key)}
                >
                  {s.label}
                </button>
              ))}
            </div>
            {activeSection && (
              // Sanitised with DOMPurify in sanitizeHtml().
              <div role="tabpanel" className={styles.richText} dangerouslySetInnerHTML={{ __html: activeSection.html }} />
            )}
          </>
        ))}
      </div>
    </article>
  );
}
