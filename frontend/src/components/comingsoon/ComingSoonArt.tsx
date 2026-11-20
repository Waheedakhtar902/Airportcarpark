import { Bell, Plane, type LucideIcon } from 'lucide-react';
import styles from './ComingSoonArt.module.css';

interface ComingSoonArtProps {
  icon: LucideIcon;
  title: string;
  cards: { title: string; detail: string }[];
}

/** Hero illustration for products that aren't bookable yet — CSS/SVG only, no image download. */
export function ComingSoonArt({ icon: Icon, title, cards }: ComingSoonArtProps) {
  const [first, second] = cards;
  return (
    <div className={styles.art} aria-hidden="true">
      <svg className={styles.trail} viewBox="0 0 600 400" preserveAspectRatio="none">
        <path d="M20 330 C 180 250, 380 150, 580 40" stroke="#FFBC00" strokeWidth="2.5" strokeDasharray="10 12" fill="none" opacity=".75" />
      </svg>
      <Plane className={styles.plane} fill="currentColor" strokeWidth={1} />

      <div className={styles.panel}>
        <span className={styles.stamp}>Coming soon</span>
        <div className={styles.head}>
          <span className={styles.icon}><Icon size={30} /></span>
          <div>
            <strong>{title}</strong>
            <small>Manchester Airport · launching first</small>
          </div>
        </div>
        <div className={styles.rows}>
          <span style={{ width: '82%' }} />
          <span style={{ width: '64%' }} />
          <span style={{ width: '74%' }} />
        </div>
        <div className={styles.progress}><i /></div>
      </div>

      {first && (
        <div className={`${styles.float} ${styles.one}`}>
          <span className={styles.floatIcon}><Icon size={18} /></span>
          <div><strong>{first.title}</strong><small>{first.detail}</small></div>
        </div>
      )}
      {second && (
        <div className={`${styles.float} ${styles.two}`}>
          <span className={`${styles.floatIcon} ${styles.bell}`}><Bell size={18} /></span>
          <div><strong>{second.title}</strong><small>{second.detail}</small></div>
        </div>
      )}
    </div>
  );
}
