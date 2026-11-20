import { Check, Plane } from 'lucide-react';
import { formatPrice } from '@/data/format';
import type { HeroIllustrationContent } from '@/types/content';
import styles from './HeroIllustration.module.css';

/** Car park illustration — built from CSS/SVG, so it costs no image download. */
export function HeroIllustration({ confirmLabel, priceLabel, price, saving }: HeroIllustrationContent) {
  return (
    <div className={styles.art} aria-hidden="true">
      <svg className={styles.trail} viewBox="0 0 600 400" preserveAspectRatio="none">
        <path
          d="M20 330 C 180 250, 380 150, 580 40"
          stroke="#FFBC00" strokeWidth="2.5" strokeDasharray="10 12" fill="none" opacity=".75"
        />
      </svg>
      <Plane className={styles.plane} fill="currentColor" strokeWidth={1} />

      <div className={styles.lot}>
        <div className={styles.row}>
          <span className={`${styles.car} ${styles.blue}`} /><i />
          <span className={`${styles.car} ${styles.white}`} /><i />
          <span className={styles.car} /><i />
          <span className={`${styles.car} ${styles.red}`} />
        </div>
        <div className={styles.row}>
          <span className={`${styles.car} ${styles.grey}`} /><i />
          <span className={`${styles.car} ${styles.amber}`} /><i />
          <span className={styles.car} /><i />
          <span className={`${styles.car} ${styles.green}`} /><i />
        </div>
        <div className={`${styles.row} ${styles.empty}`} />
      </div>

      <div className={styles.sign}><span>P</span></div>

      <div className={`${styles.float} ${styles.confirm}`}>
        <span className={styles.check}><Check size={20} strokeWidth={3} /></span>
        <div>
          <strong>Booking confirmed</strong>
          <small>{confirmLabel}</small>
        </div>
      </div>

      <div className={`${styles.float} ${styles.price}`}>
        <div>
          <small>{priceLabel}</small>
          <strong>{formatPrice(price)}</strong>
        </div>
        <span className={styles.save}>{saving}</span>
      </div>
    </div>
  );
}
