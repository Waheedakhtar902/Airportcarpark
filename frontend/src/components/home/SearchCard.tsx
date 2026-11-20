import { useMemo, useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CalendarDays, Car, CarTaxiFront, CircleAlert, Hotel, Lock, Plane, Sofa, type LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import {
  chargedDays, defaultSearch, parseLocal, pickupFor, searchAirports, searchToParams, slugToProductType,
  toLocalInput, validateSearch, type ParkingSearch,
} from '@/lib/search';
import styles from './SearchCard.module.css';

type Product = 'parking' | 'hotel' | 'lounges' | 'transfers';

const tabs: { id: Product; label: string; icon: LucideIcon; page?: string }[] = [
  { id: 'parking', label: 'Parking', icon: Car },
  { id: 'hotel', label: 'Hotel + Parking', icon: Hotel, page: '/hotels-parking' },
  { id: 'lounges', label: 'Lounges', icon: Sofa, page: '/lounges' },
  { id: 'transfers', label: 'Transfers', icon: CarTaxiFront },
];

interface SearchCardProps {
  /** Pre-fills the form, e.g. from the results page URL. */
  initial?: ParkingSearch;
  /** Parking-type page slug; pre-filters the results to that type when one exists. */
  parkingType?: string;
}

export function SearchCard({ initial, parkingType }: SearchCardProps) {
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product>('parking');
  const [search, setSearch] = useState<ParkingSearch>(() => initial ?? defaultSearch());
  const [error, setError] = useState<string | null>(null);

  const minFrom = useMemo(() => toLocalInput(new Date()), []);
  const update = (patch: Partial<ParkingSearch>) => {
    setSearch((s) => ({ ...s, ...patch }));
    setError(null);
  };

  const isParking = product === 'parking';
  const activeTab = tabs.find((t) => t.id === product);

  // Choosing a drop-off moves pick-up to day 8 (drop-off day counts as day 1), keeping the pick-up time.
  const handleFromChange = (from: string) => {
    if (!parseLocal(from)) return update({ from });
    update({ from, to: pickupFor(from, search.to.slice(11, 16)) });
  };

  const fromDate = parseLocal(search.from);
  const toDate = parseLocal(search.to);
  const days = fromDate && toDate && toDate > fromDate ? chargedDays(search) : 0;

  // Open the native date-time picker when anywhere in the field is clicked.
  const openPicker = (input: HTMLInputElement) => {
    try {
      input.showPicker?.();
    } catch {
      /* Not supported, or not allowed (e.g. no user gesture) — the field still works by typing. */
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isParking) return;
    const problem = validateSearch(search);
    if (problem) {
      setError(problem);
      return;
    }
    const type = parkingType ? slugToProductType[parkingType] : search.type;
    navigate(`/parking/results?${searchToParams({ ...search, type })}`);
  };

  return (
    <section id="search" className={`container ${styles.wrap}`} aria-label="Search airport parking">
      <form className={styles.card} onSubmit={handleSubmit} noValidate>
        <div className={styles.tabs} role="tablist" aria-label="Product">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={product === id}
              className={`${styles.tab} ${product === id ? styles.active : ''}`}
              onClick={() => { setProduct(id); setError(null); }}
            >
              <Icon size={17} aria-hidden="true" /> {label}
            </button>
          ))}
        </div>

        <fieldset className={styles.fields} disabled={!isParking}>
          <label className={`${styles.field} ${styles.airport}`}>
            <span className={styles.label}>Airport</span>
            <span className={styles.control}>
              <Plane size={17} className={styles.iconBlue} aria-hidden="true" />
              <select name="airport" value={search.airport} onChange={(e) => update({ airport: e.target.value })}>
                {searchAirports.map((a) => <option key={a.code} value={a.code}>{a.label}</option>)}
              </select>
            </span>
          </label>
          <label className={styles.field}>
            <span className={styles.label}>Drop-off</span>
            <span className={styles.control}>
              <CalendarDays size={17} className={styles.icon} aria-hidden="true" />
              <input
                type="datetime-local"
                name="from"
                required
                onClick={(e) => openPicker(e.currentTarget)}
                min={minFrom}
                value={search.from}
                onChange={(e) => handleFromChange(e.target.value)}
              />
            </span>
          </label>
          <label className={styles.field}>
            <span className={styles.label}>
              Pick-up{days > 0 && <span className={styles.days}> · {days} {days === 1 ? 'day' : 'days'}</span>}
            </span>
            <span className={styles.control}>
              <CalendarDays size={17} className={styles.icon} aria-hidden="true" />
              <input
                type="datetime-local"
                name="to"
                required
                onClick={(e) => openPicker(e.currentTarget)}
                min={search.from || minFrom}
                value={search.to}
                onChange={(e) => update({ to: e.target.value })}
              />
            </span>
          </label>
          <label className={styles.field}>
            <span className={styles.label}>Promo code</span>
            <span className={styles.control}>
              <input
                type="text"
                name="promo"
                placeholder="Optional"
                autoComplete="off"
                maxLength={40}
                value={search.promo}
                onChange={(e) => update({ promo: e.target.value.toUpperCase() })}
              />
            </span>
          </label>
          <Button type="submit" className={styles.submit}>Get prices →</Button>
        </fieldset>

        {error && (
          <p className={styles.error} role="alert">
            <CircleAlert size={16} aria-hidden="true" /> {error}
          </p>
        )}
        {!isParking && (
          <p className={styles.notice} role="status">
            {activeTab?.label} is coming soon. Parking search is available now.
            {activeTab?.page && <Link to={activeTab.page} className={styles.noticeLink}>Find out more →</Link>}
          </p>
        )}

        <div className={styles.foot}>
          <span className={styles.secure}>
            <Lock size={15} aria-hidden="true" /> Secure booking · No booking fees · Instant e-mail confirmation
          </span>
          <span>Rated <strong>4.8/5</strong> by UK travellers</span>
        </div>
      </form>
    </section>
  );
}
