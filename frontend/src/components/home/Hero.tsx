import type { ReactNode } from 'react';
import { Check } from 'lucide-react';
import type { HeroContent } from '@/types/content';
import { HeroIllustration } from './HeroIllustration';
import styles from './Hero.module.css';

interface HeroProps extends HeroContent {
  /** Replaces the default car-park illustration. */
  art?: ReactNode;
  /** "soon" shows the pill as a pulsing Coming soon badge. */
  pillTone?: 'default' | 'soon';
}

/** Shared hero used by the home page, parking-type pages and coming-soon pages. */
export function Hero({ pill, title, lead, ticks, illustration, art, pillTone = 'default' }: HeroProps) {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.grid} aria-hidden="true" />
      <div className={`container ${styles.body}`}>
        <div>
          <span className={`${styles.pill} ${pillTone === 'soon' ? styles.soon : ''}`}>
            {pillTone === 'soon' && <span className={styles.dot} aria-hidden="true" />}
            {pill}
          </span>
          <h1 id="hero-title" className={styles.title}>
            {title.before} <span className="text-amber">{title.highlight}</span> {title.after}
          </h1>
          <p className={styles.lead}>{lead}</p>
          <ul className={styles.ticks}>
            {ticks.map((t) => (
              <li key={t}>
                <span className={styles.tick}><Check size={12} strokeWidth={3.5} aria-hidden="true" /></span>
                {t}
              </li>
            ))}
          </ul>
        </div>
        {art ?? (illustration && <HeroIllustration {...illustration} />)}
      </div>
    </section>
  );
}
