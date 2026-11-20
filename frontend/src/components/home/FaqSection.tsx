import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import type { Faq } from '@/types/content';
import styles from './FaqSection.module.css';

interface FaqSectionProps {
  faqs: Faq[];
  title?: string;
  intro?: string;
}

export function FaqSection({
  faqs,
  title = "Questions? We've got answers.",
  intro = 'Everything you need to know about booking airport parking with us.',
}: FaqSectionProps) {
  // One item open at a time; the first is open by default, as in the design.
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faqs" className={styles.section}>
      <div className={`container ${styles.layout}`}>
        <div>
          <p className={styles.eyebrow}>FAQs</p>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.intro}>{intro}</p>
          <div className={styles.help}>
            <h3>Still need help?</h3>
            <p>Our UK-based team is here 7 days a week.</p>
            <ButtonLink to="/contact" variant="navy">Contact support</ButtonLink>
          </div>
        </div>

        <div className={styles.list}>
          {faqs.map((f, i) => {
            const open = openIndex === i;
            const id = `faq-${i}`;
            return (
              <div key={f.question} className={styles.item}>
                <h3>
                  <button
                    type="button"
                    className={styles.question}
                    aria-expanded={open}
                    aria-controls={id}
                    onClick={() => setOpenIndex(open ? null : i)}
                  >
                    {f.question}
                    {open ? <Minus size={20} aria-hidden="true" /> : <Plus size={20} aria-hidden="true" />}
                  </button>
                </h3>
                <div id={id} role="region" hidden={!open} className={styles.answer}>
                  <p>{f.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
