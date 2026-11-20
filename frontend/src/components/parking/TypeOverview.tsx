import { Check, Info, ThumbsUp } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { formatPrice } from '@/data/format';
import type { ParkingType } from '@/types/content';
import styles from './TypeOverview.module.css';

type Props = Pick<ParkingType, 'title' | 'overview' | 'bestFor' | 'goodToKnow' | 'fromPrice'>;

export function TypeOverview({ title, overview, bestFor, goodToKnow, fromPrice }: Props) {
  return (
    <section className={styles.section} aria-labelledby="overview-title">
      <div className={`container ${styles.layout}`}>
        <div>
          <p className={styles.eyebrow}>{title} explained</p>
          <h2 id="overview-title" className={styles.title}>{overview.title}</h2>
          {overview.paragraphs.map((p) => <p key={p} className={styles.para}>{p}</p>)}

          <h3 className={styles.subhead}>What’s included</h3>
          <ul className={styles.included}>
            {overview.included.map((item) => (
              <li key={item}>
                <span className={styles.tick}><Check size={14} strokeWidth={3} aria-hidden="true" /></span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <aside className={styles.aside}>
          <div className={`${styles.card} ${styles.bestFor}`}>
            <h3><ThumbsUp size={20} aria-hidden="true" /> Best for</h3>
            <ul>
              {bestFor.map((b) => (
                <li key={b}><Check size={16} strokeWidth={3} aria-hidden="true" />{b}</li>
              ))}
            </ul>
            <div className={styles.cta}>
              <div>
                <small>{title} from</small>
                <strong>{formatPrice(fromPrice)}<span>/day</span></strong>
              </div>
              <ButtonLink to="#search" size="sm">Get prices</ButtonLink>
            </div>
          </div>

          <div className={`${styles.card} ${styles.goodToKnow}`}>
            <h3><Info size={20} aria-hidden="true" /> Good to know</h3>
            <ul>
              {goodToKnow.map((g) => <li key={g}>{g}</li>)}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}
