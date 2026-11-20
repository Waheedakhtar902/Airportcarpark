import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { SectionHead } from '@/components/ui/SectionHead';
import { parkingTypes } from '@/data/parkingTypes';
import { formatPrice } from '@/data/format';
import styles from './ParkingOptions.module.css';

interface ParkingOptionsProps {
  eyebrow?: string;
  title?: string;
  intro?: string;
  /** Leave out one type, e.g. the page the visitor is already on. */
  exclude?: string;
}

export function ParkingOptions({
  eyebrow = 'Parking options',
  title = 'The right parking for every trip',
  intro = 'From the cheapest long-stay to door-to-terminal valet — choose what suits your budget, timings and luggage.',
  exclude,
}: ParkingOptionsProps) {
  const items = parkingTypes.filter((t) => t.slug !== exclude);

  return (
    <section id="parking" className={styles.section}>
      <div className="container">
        <SectionHead eyebrow={eyebrow} title={title} intro={intro} />
        <div className={styles.grid} style={{ '--cols': items.length } as CSSProperties}>
          {items.map(({ slug, title: name, cardDescription, cardFeatures, fromPrice, icon: Icon, featured }) => (
            <Link key={slug} to={`/parking/${slug}`} className={`${styles.card} ${featured ? styles.featured : ''}`}>
              {featured && <span className={styles.badge}>Most popular</span>}
              <span className={styles.icon}><Icon size={30} aria-hidden="true" /></span>
              <h3>{name}</h3>
              <p className={styles.desc}>{cardDescription}</p>
              <ul className={styles.checks}>
                {cardFeatures.map((f) => (
                  <li key={f}><Check size={16} strokeWidth={3} aria-hidden="true" />{f}</li>
                ))}
              </ul>
              <div className={styles.price}>
                <span>From</span>
                <strong>{formatPrice(fromPrice)}/day</strong>
              </div>
              <span className={styles.more}>View details <ArrowRight size={16} aria-hidden="true" /></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
