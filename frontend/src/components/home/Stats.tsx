import type { Stat } from '@/types/content';
import styles from './Stats.module.css';

export function Stats({ items }: { items: Stat[] }) {
  return (
    <section className={`container ${styles.stats}`} aria-label="Key facts">
      {items.map(({ value, label, icon: Icon }) => (
        <div key={label} className={styles.stat}>
          <span className={styles.icon}><Icon size={26} aria-hidden="true" /></span>
          <div>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        </div>
      ))}
    </section>
  );
}
