import { Star } from 'lucide-react';
import { SectionHead } from '@/components/ui/SectionHead';
import { reviews } from '@/data/home';
import styles from './Reviews.module.css';

export function Reviews() {
  return (
    <section className={styles.section}>
      <div className="container">
        <SectionHead
          tone="dark"
          eyebrow="Traveller reviews"
          title="Loved by holidaymakers & business flyers"
          intro="Reviews from verified customers will appear here, pulled live from your review platform."
        />
        <div className={styles.grid}>
          {reviews.map((r, i) => (
            <figure key={i} className={styles.card}>
              <div className={styles.stars} role="img" aria-label={`${r.rating} out of 5 stars`}>
                {Array.from({ length: r.rating }, (_, s) => (
                  <Star key={s} size={20} fill="currentColor" strokeWidth={0} aria-hidden="true" />
                ))}
              </div>
              <blockquote>“{r.quote}”</blockquote>
              <figcaption>
                <span className={styles.avatar} style={{ background: r.avatarColor }}>{r.initial}</span>
                <div>
                  <strong>{r.name}</strong>
                  <small>{r.meta}</small>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className={styles.note}>Placeholder layout — replace with genuine verified reviews (e.g. Trustpilot widget)</p>
      </div>
    </section>
  );
}
