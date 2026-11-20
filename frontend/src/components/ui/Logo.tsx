import { Link } from 'react-router-dom';
import styles from './Logo.module.css';

interface LogoProps {
  className?: string;
}

/** Brand logo (from Airportcarpark-logo.jpeg) redrawn as a ~1KB inline SVG. */
export function Logo({ className }: LogoProps) {
  return (
    <Link to="/" className={`${styles.logo} ${className ?? ''}`} aria-label="AirportCarPark.co.uk home">
      <LogoMark className={styles.mark} />
      <span className={styles.text}>
        <span className={styles.word}>
          airport<span className={styles.accent}>carpark</span>
        </span>
        <span className={styles.tld}>.co.uk</span>
      </span>
    </Link>
  );
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
      <rect width="64" height="64" rx="15" fill="#0B1F4B" />
      <path
        d="M19 50V15h11a10.5 10.5 0 0 1 0 21H19"
        stroke="#fff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none"
      />
      <path
        d="M28 50c9-1.5 16-6 19-15"
        stroke="#FFBC00" strokeWidth="2.4" strokeLinecap="round" strokeDasharray="3.5 3.5" fill="none"
      />
      <path
        transform="translate(49 22) rotate(30) scale(.42)"
        fill="#FFBC00"
        d="M-2-20c0-2.5 4-2.5 4 0v12l14 8v4L2 0v9l4 3v3l-6-2-6 2v-3l4-3V0l-14 4V0l14-8z"
      />
    </svg>
  );
}
