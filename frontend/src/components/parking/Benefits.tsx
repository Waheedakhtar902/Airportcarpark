import { SectionHead } from '@/components/ui/SectionHead';
import type { Feature } from '@/types/content';
import styles from './Benefits.module.css';

interface BenefitsProps {
  title: string;
  items: Feature[];
  eyebrow?: string;
  intro?: string;
}

export function Benefits({
  title,
  items,
  eyebrow = 'Why choose it',
  intro = 'Every car park we list is vetted for security, insurance and service — so the only decision left is which suits your trip.',
}: BenefitsProps) {
  return (
    <section className={styles.section}>
      <div className="container">
        <SectionHead eyebrow={eyebrow} title={title} intro={intro} />
        <div className={styles.grid}>
          {items.map(({ title: name, description, icon: Icon }) => (
            <article key={name} className={styles.card}>
              <span className={styles.icon}><Icon size={24} aria-hidden="true" /></span>
              <h3>{name}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
