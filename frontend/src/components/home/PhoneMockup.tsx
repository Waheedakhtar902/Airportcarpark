import { Check } from 'lucide-react';
import styles from './PhoneMockup.module.css';

/** Decorative QR pattern: [row, col, rowSpan, colSpan] on a 6×6 grid. */
const qrBlocks: [number, number, number, number][] = [
  [1, 1, 2, 2], [1, 4, 1, 1], [1, 5, 2, 2], [3, 4, 1, 1], [3, 3, 1, 2],
  [3, 5, 2, 1], [5, 1, 2, 2], [5, 4, 1, 1], [6, 5, 1, 1], [5, 6, 1, 1],
];

/** Booking app mock-up — pure CSS, no image download. */
export function PhoneMockup() {
  return (
    <div className={styles.art} aria-hidden="true">
      <div className={styles.phone}>
        <div className={styles.notch} />
        <h4>Your booking</h4>
        <div className={styles.ticket}>
          <small>HEATHROW · T5</small>
          <strong>Meet &amp; Greet</strong>
          <span>12 Dec → 20 Dec</span>
          <i />
        </div>
        <small className={styles.label}>Booking ref</small>
        <strong className={styles.ref}>ACP-48201</strong>
        <div className={styles.qr}>
          {qrBlocks.map(([r, c, rs, cs]) => (
            <span key={`${r}-${c}`} style={{ gridArea: `${r} / ${c} / span ${rs} / span ${cs}` }} />
          ))}
        </div>
        <div className={styles.bar} />
      </div>

      <div className={`${styles.tag} ${styles.flight}`}>
        <small>Flight tracked</small>
        <strong>BA 2491 · Landed <Check size={15} strokeWidth={3} /></strong>
      </div>
      <div className={`${styles.tag} ${styles.ready}`}>
        <small>Your car is</small>
        <strong>Ready at Bay 14</strong>
      </div>
    </div>
  );
}
