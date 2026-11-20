import { Link } from 'react-router-dom';
import { SectionHead } from '@/components/ui/SectionHead';
import { comparisonRows, parkingTypes } from '@/data/parkingTypes';
import { formatPrice } from '@/data/format';
import styles from './ComparisonTable.module.css';

/** Side-by-side comparison of all parking types, with the current one highlighted. */
export function ComparisonTable({ current }: { current: string }) {
  return (
    <section id="compare" className={styles.section} aria-labelledby="compare-title">
      <div className="container">
        <SectionHead
          id="compare-title"
          eyebrow="Compare"
          title="How the parking types compare"
          intro="Every option is secure and fully insured. The difference is how close you park, how you reach the terminal and what it costs."
        />
        <div className={styles.scroller} tabIndex={0} role="region" aria-label="Parking type comparison (scrolls sideways on small screens)">
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col" className={styles.corner}><span className="sr-only">Feature</span></th>
                {parkingTypes.map(({ slug, title, icon: Icon }) => (
                  <th key={slug} scope="col" className={slug === current ? styles.currentHead : undefined}>
                    <Link to={`/parking/${slug}`} className={styles.headLink}>
                      <span className={styles.headIcon}><Icon size={20} aria-hidden="true" /></span>
                      {title}
                    </Link>
                    {slug === current && <span className={styles.here}>You’re here</span>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map(({ key, label }) => (
                <tr key={key}>
                  <th scope="row">{label}</th>
                  {parkingTypes.map((t) => (
                    <td key={t.slug} className={t.slug === current ? styles.currentCell : undefined}>
                      {key === 'price' ? <strong>{formatPrice(t.fromPrice)}/day</strong> : t.compare[key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
