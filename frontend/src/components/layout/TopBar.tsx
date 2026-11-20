import { PartyPopper } from 'lucide-react';
import styles from './TopBar.module.css';

export function TopBar() {
  return (
    <div className={styles.bar}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.offer}>
          <PartyPopper size={15} className={styles.icon} aria-hidden="true" />
          <span>
            Launch offer: <strong>15% off</strong> your first booking with code <strong>FLYAWAY15</strong>
          </span>
        </p>
        <p className={styles.right}>Free cancellation up to 24h before · 7-day UK support</p>
      </div>
    </div>
  );
}
