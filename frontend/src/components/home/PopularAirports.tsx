import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SectionHead } from '@/components/ui/SectionHead';
import { popularAirports } from '@/data/airports';
import { formatPrice } from '@/data/format';
import styles from './PopularAirports.module.css';

interface PopularAirportsProps {
  eyebrow?: string;
  title?: string;
  intro?: string;
  /** Multiplies each airport's base price, e.g. for a specific parking type. */
  priceFactor?: number;
}

/** Rounds to a retail-style price ending in 9 (e.g. 7.43 → 7.49). */
const retailPrice = (value: number) => Math.ceil(value * 10) / 10 - 0.01;

export function PopularAirports({
  eyebrow = 'Popular airports',
  title = 'Where are you flying from?',
  intro = "Live prices from trusted operators at the UK's busiest airports. Tap an airport to see every option side by side.",
  priceFactor = 1,
}: PopularAirportsProps) {
  return (
    <section id="airports" className={styles.section}>
      <div className="container">
        <SectionHead eyebrow={eyebrow} title={title} intro={intro} />
        <ul className={styles.grid}>
          {popularAirports.map((a) => (
            <li key={a.code}>
              <Link
                to={`/airports/${a.slug}`}
                className={styles.card}
                style={{ '--g1': a.gradient[0], '--g2': a.gradient[1] } as CSSProperties}
              >
                <div className={styles.top}>
                  <span className={styles.code}>{a.code}</span>
                  <h3>{a.name}</h3>
                </div>
                <div className={styles.bottom}>
                  <div>
                    <small>From per day</small>
                    <strong>{formatPrice(priceFactor === 1 ? a.fromPrice : retailPrice(a.fromPrice * priceFactor))}</strong>
                  </div>
                  <span className={styles.arrow}><ArrowRight size={18} aria-hidden="true" /></span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
