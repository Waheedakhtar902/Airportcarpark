import { Link } from 'react-router-dom';
import { Logo } from '@/components/ui/Logo';
import { footerColumns, paymentMethods } from '@/data/navigation';
import styles from './Footer.module.css';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.brand}>
            <Logo />
            <p>Compare and book secure, great-value airport parking across the UK. Fast, simple and fully protected.</p>
            <ul className={styles.payments} aria-label="Accepted payment methods">
              {paymentMethods.map((m) => <li key={m}>{m}</li>)}
            </ul>
          </div>

          {footerColumns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h4 className={styles.heading}>{col.title}</h4>
              <ul className={styles.list}>
                {col.links.map((link) => (
                  <li key={link.label}><Link to={link.to}>{link.label}</Link></li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className={styles.bottom}>
          <span>© {year} AirportCarPark.co.uk · All rights reserved.</span>
          <span>Prices shown are illustrative. Registered in England &amp; Wales.</span>
        </div>
      </div>
    </footer>
  );
}
