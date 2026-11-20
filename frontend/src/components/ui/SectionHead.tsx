import type { ReactNode } from 'react';
import styles from './SectionHead.module.css';

interface SectionHeadProps {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  /** split: title left, intro right · center: centred · stack: intro under title, left-aligned */
  align?: 'split' | 'center' | 'stack';
  tone?: 'light' | 'dark';
  id?: string;
}

export function SectionHead({ eyebrow, title, intro, align = 'split', tone = 'light', id }: SectionHeadProps) {
  return (
    <div className={`${styles.head} ${styles[align]} ${tone === 'dark' ? styles.dark : ''}`}>
      <div>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h2 id={id} className={styles.title}>{title}</h2>
      </div>
      {intro && <p className={styles.intro}>{intro}</p>}
    </div>
  );
}
