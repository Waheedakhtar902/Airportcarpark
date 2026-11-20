import type { CSSProperties } from 'react';
import { SectionHead } from '@/components/ui/SectionHead';
import type { Step } from '@/types/content';
import styles from './HowItWorks.module.css';

interface HowItWorksProps {
  steps: Step[];
  eyebrow?: string;
  title?: string;
  tone?: 'white' | 'surface';
}

export function HowItWorks({
  steps, eyebrow = 'How it works', title = 'Book in three easy steps', tone = 'white',
}: HowItWorksProps) {
  return (
    <section className={`${styles.section} ${tone === 'surface' ? styles.surface : ''}`}>
      <div className="container">
        <SectionHead eyebrow={eyebrow} title={title} align="center" />
        <ol className={`${styles.steps} ${steps.length === 4 ? styles.four : ''}`} style={{ '--cols': steps.length } as CSSProperties}>
          {steps.map((s, i) => (
            <li key={s.title} className={styles.step}>
              <span className={styles.num}>{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
